import 'dotenv/config';
import assert from 'node:assert/strict';
import {randomBytes,randomUUID} from 'node:crypto';
import path from 'node:path';
import {getPrisma} from './admin-db.mjs';
import {digest,randomToken} from '../src/lib/auth/crypto.mjs';
const base=process.env.NEXT_PUBLIC_SITE_URL;
if(base!=='https://new.subzerowolf-sea.com'||path.basename(process.cwd())!=='new.subzerowolf-sea.com')throw Error('Staging only.');
const db=getPrisma(),marker='inventory-qa-'+randomBytes(6).toString('hex');let checks=0,product,users=[],extraProducts=[];const cookies={};
const ok=(v,n)=>{assert(v,n);checks++;console.log('PASS',n);};
async function call(route,{method='GET',body,cookie,origin=base}={}){const r=await fetch(base+route,{method,redirect:'manual',headers:{...(cookie?{cookie}:{}),...(origin?{origin}:{}),...(body?{'content-type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});let value;try{value=await r.json();}catch{value=null;}return {status:r.status,value};}
const snapshot=await db.$transaction(async tx=>({inventory:await tx.inventory.findMany({orderBy:{id:'asc'}}),movements:await tx.stockMovement.findMany({orderBy:{id:'asc'}}),owners:await tx.user.findMany({where:{role:'ADMIN'},select:{id:true,updatedAt:true},orderBy:{id:'asc'}})}),{isolationLevel:'RepeatableRead'});
try{
 for(const role of ['ADMIN','STAFF','ADMIN2']){const u=await db.user.create({data:{name:'Inventory integration QA '+role,email:marker+'-'+role+'@example.invalid',role:role==='ADMIN2'?'ADMIN':role,passwordHash:'disabled-integration-no-login'}});users.push(u.id);const token=randomToken();await db.adminSession.create({data:{tokenHash:digest(token),userId:u.id,expiresAt:new Date(Date.now()+900000)}});cookies[role]='__Host-sz-admin='+token;}
 const brand=await db.brand.create({data:{name:marker,slug:marker}}),category=await db.productCategory.create({data:{name:marker,slug:marker,brandId:brand.id}});
 product=await db.product.create({data:{name:'INTEGRATION QA — no physical stock',model:marker,slug:marker,brandId:brand.id,categoryId:category.id,status:'ARCHIVED'}});
 const route='/api/admin/inventory/'+product.id;
 const body=(operation,amount,key=randomUUID())=>({operation,amount,idempotencyKey:key,note:marker+' isolated integration exercise'});
 const move=(b,cookie=cookies.ADMIN,origin=base)=>call(route,{method:'POST',cookie,origin,body:b});
 ok((await call('/api/admin/inventory')).status===401,'list private');ok((await call(route)).status===401,'history private');ok((await call('/admin/inventory')).status===307,'page session gate');
 ok((await move(body('RECEIVED',1),cookies.STAFF)).status===403,'STAFF cannot mutate');ok((await call(route,{cookie:cookies.STAFF})).status===200,'STAFF can read');
 ok((await move(body('RECEIVED',1),cookies.ADMIN,null)).status===403,'Origin required');ok((await move(body('RECEIVED',1),cookies.ADMIN,'https://example.invalid')).status===403,'foreign Origin rejected');
 for(const n of [0,-1,1.5,'2',2147483648])ok((await move(body('RECEIVED',n))).status===422,'invalid amount '+n);
 ok((await move(body('SOLD',1))).status===422,'ambiguous sale rejected');ok((await move(body('RESERVED',1))).status===409,'insufficient available');
 const first=body('RECEIVED',20);const duplicates=await Promise.all(Array.from({length:8},()=>move(first)));ok(duplicates.every(r=>r.status===200),'concurrent duplicate retries succeed');
 ok(new Set(duplicates.map(r=>r.value.data.movement.id)).size===1,'one durable movement per key');ok((await db.inventory.findUnique({where:{productId:product.id}})).quantity===20,'duplicates changed stock once');
 ok((await move({...first,amount:19})).status===409,'same key different payload rejected');
 ok((await move(first,cookies.ADMIN2)).status===409,'same key cannot replay for a different actor');
 const reserves=await Promise.all(Array.from({length:10},(_,i)=>move(body('RESERVED',3),i%2?cookies.ADMIN2:cookies.ADMIN)));ok(reserves.filter(r=>r.status===200).length===6&&reserves.filter(r=>r.status===409).length===4,'concurrent reserve cannot oversubscribe');
 let balance=await db.inventory.findUnique({where:{productId:product.id}});ok(balance.quantity===20&&balance.reserved===18,'concurrent final invariant');
 ok((await move(body('SOLD_AVAILABLE',3))).status===409,'available sale cannot consume reservations');ok((await move(body('SOLD_RESERVED',19))).status===409,'reserved sale cannot consume available');
 ok((await move(body('SOLD_RESERVED',4))).status===200,'reserved sale');ok((await move(body('SOLD_AVAILABLE',2))).status===200,'available sale');
 balance=await db.inventory.findUnique({where:{productId:product.id}});ok(balance.quantity===14&&balance.reserved===14,'sale semantics persist');
 ok((await move(body('RELEASED',14))).status===200,'release');ok((await move(body('ADJUST_UP',2))).status===200,'adjust up');ok((await move(body('ADJUST_DOWN',2))).status===200,'adjust down');
 const more=await Promise.all(Array.from({length:23},(_,i)=>move(body('RECEIVED',1),i%2?cookies.ADMIN2:cookies.ADMIN)));ok(more.every(r=>r.status===200),'different actors concurrent receives');
 ok((await move(body('ADJUST_DOWN',23))).status===200,'balance additional concurrency exercise');
 const h1=await call(route+'?page=1',{cookie:cookies.STAFF}),h2=await call(route+'?page=2',{cookie:cookies.STAFF});ok(h1.value.data.history.length===20&&h2.value.data.history.length>0,'server history pagination');ok(!h1.value.data.history.some(a=>h2.value.data.history.some(b=>a.id===b.id)),'history pages have no duplicates');
 const correction={...body('ADJUST_DOWN',14),compensationForId:duplicates[0].value.data.movement.id};ok((await move(correction)).status===200,'compensating correction');
 const reload=await call(route,{cookie:cookies.ADMIN});ok(reload.value.data.product.inventory.quantity===0&&reload.value.data.product.inventory.reserved===0,'HTTP reload and actual DB persist zero balanced QA stock');
 const history=await db.stockMovement.findMany({where:{productId:product.id},orderBy:[{createdAt:'asc'},{id:'asc'}]});ok(history.every(m=>m.actorId&&m.actorName&&m.operation&&m.quantityBefore!==null&&m.reservedBefore!==null&&m.quantityAfter!==null&&m.reservedAfter!==null),'actor/time/type and before/after recorded');
 ok(await db.auditLog.count({where:{entity:'StockMovement',entityId:{in:history.map(m=>m.id)}}})===history.length,'one atomic audit per movement');
 const priorCount=history.length;const priorBalance=await db.inventory.findUnique({where:{productId:product.id}});
 ok((await move({...body('RECEIVED',1),compensationForId:'unknown'})).status===422,'invalid correction rejected');ok(await db.stockMovement.count({where:{productId:product.id}})===priorCount,'failed mutation has no movement');ok(JSON.stringify(await db.inventory.findUnique({where:{productId:product.id}}))===JSON.stringify(priorBalance),'failed transaction leaves balance unchanged');
 let denied=false;try{await db.stockMovement.update({where:{id:history[0].id},data:{note:'forbidden'}});}catch{denied=true;}ok(denied,'DB rejects history edit');denied=false;try{await db.stockMovement.delete({where:{id:history[0].id}});}catch{denied=true;}ok(denied,'DB rejects history deletion');
 for(const invalid of [{quantity:-1,reserved:0},{quantity:0,reserved:-1},{quantity:0,reserved:1}]){let rejected=false;try{await db.inventory.update({where:{productId:product.id},data:invalid});}catch{rejected=true;}ok(rejected,'database balance CHECK enforced');}
 for(const method of ['PATCH','DELETE'])ok((await call(route,{method,cookie:cookies.ADMIN,body:{}})).status===405,'no history mutation method '+method);
 await db.user.update({where:{id:users[0]},data:{role:'STAFF'}});ok((await move(body('RECEIVED',1))).status===403,'immediate role downgrade from DB');await db.user.update({where:{id:users[0]},data:{role:'ADMIN'}});
 const publicProducts=await call('/api/products');ok(publicProducts.status===200&&!JSON.stringify(publicProducts.value).match(/quantity|reserved|stockMovements|actorId/),'public products omit balances/history');
 // Force a late audit FK failure in the same real DB transaction; never commit test stock.
 const beforeFailed=await db.inventory.findUnique({where:{productId:product.id}}),beforeLedger=await db.stockMovement.count({where:{productId:product.id}});let auditFailed=false;
 try{await db.$transaction(async tx=>{await tx.inventory.update({where:{productId:product.id},data:{quantity:1}});await tx.stockMovement.create({data:{productId:product.id,type:'RECEIVED',operation:'RECEIVED',quantity:1,note:marker+' uncommitted rollback test',quantityBefore:0,reservedBefore:0,quantityAfter:1,reservedAfter:0,actorId:users[0],actorName:'QA',idempotencyKey:randomUUID()}});await tx.auditLog.create({data:{userId:'nonexistent-'+marker,action:'RECEIVED',entity:'StockMovement'}});},{isolationLevel:'ReadCommitted'});}catch{auditFailed=true;}
 ok(auditFailed,'late audit FK failure is rejected');ok(JSON.stringify(await db.inventory.findUnique({where:{productId:product.id}}))===JSON.stringify(beforeFailed),'audit failure rolls back balance');ok(await db.stockMovement.count({where:{productId:product.id}})===beforeLedger,'audit failure rolls back movement');
 for(let n=0;n<21;n++){const p=await db.product.create({data:{name:'INTEGRATION pagination QA - zero inventory',model:marker+'-page-'+String(n).padStart(2,'0'),slug:marker+'-page-'+n,brandId:product.brandId,categoryId:product.categoryId,status:'ARCHIVED'}});extraProducts.push(p.id);}
 const list=await call('/api/admin/inventory?q='+marker+'&deleted=yes',{cookie:cookies.STAFF});ok(list.value.data.total===22,'server search');
 const page2=await call('/api/admin/inventory?q='+marker+'&deleted=yes&page=2',{cookie:cookies.STAFF});ok(list.value.data.products.length===20&&page2.value.data.products.length===2,'inventory server pagination 20 plus 2');ok(!list.value.data.products.some(a=>page2.value.data.products.some(b=>a.id===b.id)),'inventory pages no duplicate products');
 const filtered=await call('/api/admin/inventory?q='+marker+'&status=DRAFT',{cookie:cookies.ADMIN});ok(filtered.value.data.total===0,'product status filtering');
 ok((await call('/api/admin/inventory?page=0',{cookie:cookies.ADMIN})).status===422,'invalid server list page rejected');

 ok(JSON.stringify(await db.inventory.findMany({where:{productId:{not:product.id}},orderBy:{id:'asc'}}))===JSON.stringify(snapshot.inventory),'existing stock preserved');ok(JSON.stringify(await db.stockMovement.findMany({where:{productId:{not:product.id}},orderBy:{id:'asc'}}))===JSON.stringify(snapshot.movements),'legacy history preserved');
 console.log('INVENTORY_INTEGRATION_OK',checks,'checks; append-only QA ledger retained, QA stock zero.');
}finally{
 // Never delete immutable ledger or audit. Hide labelled QA product and revoke test sessions.
 if(product){const b=await db.inventory.findUnique({where:{productId:product.id}});if(b&&(b.quantity||b.reserved)){
 try{await db.user.update({where:{id:users[0]},data:{role:'ADMIN'}});for(const [operation,amount] of [['RELEASED',b.reserved],['ADJUST_DOWN',b.quantity]])if(amount){const result=await call('/api/admin/inventory/'+product.id,{method:'POST',cookie:cookies.ADMIN,body:{operation,amount,note:marker+' compensating test cleanup',idempotencyKey:randomUUID()}});assert.equal(result.status,200,'compensating cleanup');}}catch{console.log('QA requires compensating cleanup; no ledger deletion.');process.exitCode=1;}}
await db.product.update({where:{id:product.id},data:{deletedAt:new Date(),status:'ARCHIVED'}});}
 if(extraProducts.length)await db.product.updateMany({where:{id:{in:extraProducts}},data:{deletedAt:new Date(),status:'ARCHIVED'}});
 await db.adminSession.updateMany({where:{userId:{in:users}},data:{revokedAt:new Date()}});
 const owners=await db.user.findMany({where:{id:{in:snapshot.owners.map(u=>u.id)}},select:{id:true,updatedAt:true},orderBy:{id:'asc'}});assert.deepEqual(owners,snapshot.owners,'owner unchanged');await db.$disconnect();
}
