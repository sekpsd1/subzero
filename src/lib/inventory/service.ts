import 'server-only';
import { createHash } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { getPrisma } from '@/lib/prisma';
import { AuthError } from '@/lib/auth/server';
import { audit } from '@/lib/catalog/service';
import { CatalogError } from '@/lib/catalog/validation.mjs';
import { movementInput, nextBalance } from './rules.mjs';
export async function moveStock(tokenHash:string, productId:string, input:unknown) {
 const data=movementInput(input);
 const hash=createHash('sha256').update(JSON.stringify({productId,...data})).digest('hex');
 return getPrisma().$transaction(async tx=>{
  // Recheck and lock DB authorization at execution time, including queued requests.
  await tx.$queryRaw`SELECT id FROM User WHERE id = (SELECT userId FROM AdminSession WHERE tokenHash = ${tokenHash}) FOR UPDATE`;
  await tx.$queryRaw`SELECT tokenHash FROM AdminSession WHERE tokenHash = ${tokenHash} FOR UPDATE`;
  const session=await tx.adminSession.findUnique({where:{tokenHash},include:{user:true}});
  if (!session || session.revokedAt || session.expiresAt<=new Date()) throw new AuthError(401,'Authentication required.');
  if (session.user.role!=='ADMIN') throw new AuthError(403,'Inventory is read-only for STAFF.');
  await tx.$queryRaw`SELECT id FROM Product WHERE id = ${productId} FOR UPDATE`;
  const product=await tx.product.findUnique({where:{id:productId}});
  if (!product) throw new CatalogError(404,'Product not found.');
  const previous=await tx.stockMovement.findUnique({where:{idempotencyKey:data.idempotencyKey}});
  if (previous) {
   if(previous.requestHash!==hash || previous.actorId!==session.userId) throw new CatalogError(409,'Request key already used for another operation.');
   return {movement:previous,replayed:true};
  }
  if(product.deletedAt) throw new CatalogError(409,'Restore product before changing stock.');
  if(data.compensationForId && !await tx.stockMovement.findFirst({where:{id:data.compensationForId,productId}})) throw new CatalogError(422,'Correction must reference history for this product.');
  await tx.$queryRaw`SELECT id FROM Inventory WHERE productId = ${productId} FOR UPDATE`;
  const old=await tx.inventory.findUnique({where:{productId}});
  const before={quantity:old?.quantity??0,reserved:old?.reserved??0};
  const after=nextBalance(before.quantity,before.reserved,data.operation,data.amount);
  await tx.inventory.upsert({where:{productId},create:{productId,...after},update:after});
  const type=data.operation.startsWith('ADJUST')?'ADJUSTMENT':data.operation.startsWith('SOLD')?'SOLD':data.operation;
  const movement=await tx.stockMovement.create({data:{productId,type:type as 'ADJUSTMENT'|'RECEIVED'|'RESERVED'|'RELEASED'|'SOLD',quantity:data.amount,note:data.note,operation:data.operation,actorId:session.userId,actorName:session.user.name,quantityBefore:before.quantity,reservedBefore:before.reserved,quantityAfter:after.quantity,reservedAfter:after.reserved,idempotencyKey:data.idempotencyKey,requestHash:hash,compensationForId:data.compensationForId}});
  await audit(tx,session.userId,data.compensationForId?'COMPENSATE_'+data.operation:data.operation,'StockMovement',movement.id);
  return {movement,replayed:false};
 },{isolationLevel:Prisma.TransactionIsolationLevel.ReadCommitted,timeout:15000});
}
export async function listInventory(params:URLSearchParams) {
 const q=(params.get('q')||'').trim(); const status=params.get('status')||'';
 const pageText=params.get('page')||'1';
 if(q.length>191 || !/^\d{1,7}$/.test(pageText) || Number(pageText)<1 || !['','DRAFT','ACTIVE','ARCHIVED'].includes(status)) throw new CatalogError(422,'Invalid inventory filters.');
 const where:Prisma.ProductWhereInput={...(params.get('deleted')==='yes'?{}:{deletedAt:null}),...(status?{status:status as 'DRAFT'|'ACTIVE'|'ARCHIVED'}:{}),...(q?{OR:[{name:{contains:q}},{model:{contains:q}}]}:{})};
 return getPrisma().$transaction(async tx=>{
  const total=await tx.product.count({where}); const pages=Math.max(1,Math.ceil(total/20)); const page=Math.min(Number(pageText),pages);
  const products=await tx.product.findMany({where,take:20,skip:(page-1)*20,orderBy:[{model:'asc'},{id:'asc'}],select:{id:true,name:true,model:true,status:true,deletedAt:true,inventory:{select:{quantity:true,reserved:true}}}});
  // All persisted inventory, including deleted products, remains accounted for.
  const sums=await tx.inventory.aggregate({_sum:{quantity:true,reserved:true}});
  return {products,total,page,pages,sums:{quantity:sums._sum.quantity??0,reserved:sums._sum.reserved??0}};
 },{isolationLevel:Prisma.TransactionIsolationLevel.RepeatableRead});
}
export async function inventoryDetail(productId:string,page=1) {
 if(!Number.isSafeInteger(page)||page<1) throw new CatalogError(422,'Invalid history page.');
 return getPrisma().$transaction(async tx=>{
 const product=await tx.product.findUnique({where:{id:productId},select:{id:true,name:true,model:true,deletedAt:true,inventory:true}});
 if(!product) throw new CatalogError(404,'Product not found.');
 const total=await tx.stockMovement.count({where:{productId}}); const pages=Math.max(1,Math.ceil(total/20)); const current=Math.min(page,pages);
 const history=await tx.stockMovement.findMany({where:{productId},orderBy:[{createdAt:'desc'},{id:'desc'}],take:20,skip:(current-1)*20,select:{id:true,type:true,operation:true,quantity:true,note:true,actorName:true,actorId:true,createdAt:true,quantityBefore:true,reservedBefore:true,quantityAfter:true,reservedAfter:true,compensationForId:true}});
 return {product,history,total,page:current,pages};
 },{isolationLevel:Prisma.TransactionIsolationLevel.RepeatableRead});
}
