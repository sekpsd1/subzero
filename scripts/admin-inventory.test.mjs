import test from 'node:test';
import assert from 'node:assert/strict';
import { movementInput,nextBalance } from '../src/lib/inventory/rules.mjs';
const key='00000000-0000-4000-8000-000000000001';
test('seven explicit operations preserve total/reserved semantics',()=>{
 const cases=[['RECEIVED',12,4],['ADJUST_UP',12,4],['ADJUST_DOWN',8,4],['RESERVED',10,6],['RELEASED',10,2],['SOLD_RESERVED',8,2],['SOLD_AVAILABLE',8,4]];
 for(const [op,q,r] of cases)assert.deepEqual(nextBalance(10,4,op,2),{quantity:q,reserved:r});
});
test('insufficient available and reserved are rejected',()=>{
 for(const [op,n] of [['RESERVED',7],['ADJUST_DOWN',7],['SOLD_AVAILABLE',7],['RELEASED',5],['SOLD_RESERVED',5]])assert.throws(()=>nextBalance(10,4,op,n),{status:409});
});
test('invalid units, ambiguous sell, overflow and legacy invalid balances rejected',()=>{
 for(const n of [-1,0,1.5,NaN,Infinity,'2',2147483648])assert.throws(()=>movementInput({operation:'RECEIVED',amount:n,note:'reason',idempotencyKey:key}),{status:422});
 assert.throws(()=>nextBalance(2147483647,0,'RECEIVED',1),{status:409});
 assert.throws(()=>nextBalance(1,2,'RECEIVED',1),{status:409});
 assert.throws(()=>movementInput({operation:'SOLD',amount:1,note:'reason',idempotencyKey:key}),{status:422});
});
test('reason, persistent request key and correction reference validation',()=>{
 const b={operation:'RECEIVED',amount:1,note:'  reason  ',idempotencyKey:key};assert.equal(movementInput(b).note,'reason');
 for(const change of [{note:''},{note:'x'.repeat(1001)},{idempotencyKey:'invalid'},{compensationForId:3}])assert.throws(()=>movementInput({...b,...change}),{status:422});
});
test('valid operations always retain server invariants over bounded state space',()=>{
 for(let q=0;q<15;q++)for(let r=0;r<=q;r++)for(let n=1;n<17;n++)for(const op of ['RECEIVED','ADJUST_UP','ADJUST_DOWN','RESERVED','RELEASED','SOLD_RESERVED','SOLD_AVAILABLE']){try{const a=nextBalance(q,r,op,n);assert(a.quantity>=0&&a.reserved>=0&&a.reserved<=a.quantity);}catch(e){assert.equal(e.status,409);}}
});
