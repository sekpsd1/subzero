import { CatalogError, object, text } from '../catalog/validation.mjs';
export const operations = ['RECEIVED','ADJUST_UP','ADJUST_DOWN','RESERVED','RELEASED','SOLD_RESERVED','SOLD_AVAILABLE'];
export function movementInput(input) {
 const b=object(input);
 if (!operations.includes(b.operation)) throw new CatalogError(422,'Choose a specific stock operation.');
 if (!Number.isInteger(b.amount) || b.amount < 1 || b.amount > 2147483647) throw new CatalogError(422,'Amount must be a positive whole number.');
 if (typeof b.idempotencyKey !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(b.idempotencyKey)) throw new CatalogError(422,'A valid request key is required.');
 return {operation:b.operation, amount:b.amount, note:text(b.note,'note',1000,true), idempotencyKey:b.idempotencyKey, compensationForId:text(b.compensationForId,'compensationForId')};
}
export function nextBalance(quantity,reserved,operation,amount) {
 if (![quantity,reserved].every(Number.isInteger) || quantity<0 || reserved<0 || reserved>quantity) throw new CatalogError(409,'Existing stock is invalid; review it before changing.');
 if (!operations.includes(operation) || !Number.isInteger(amount) || amount<1 || amount>2147483647) throw new CatalogError(422,'Invalid stock change.');
 let q=quantity,r=reserved;
 if (['RECEIVED','ADJUST_UP'].includes(operation)) q+=amount;
 if (['ADJUST_DOWN','SOLD_AVAILABLE','SOLD_RESERVED'].includes(operation)) q-=amount;
 if (operation==='RESERVED') r+=amount;
 if (['RELEASED','SOLD_RESERVED'].includes(operation)) r-=amount;
 if (q<0 || r<0 || r>q || q>2147483647) throw new CatalogError(409,'Insufficient stock, reservation or quantity limit exceeded.');
 return {quantity:q,reserved:r};
}
