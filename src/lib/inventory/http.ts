import 'server-only';
import { NextResponse } from 'next/server';
import { AuthError } from '@/lib/auth/server';
import { CatalogError } from '@/lib/catalog/validation.mjs';
export function inventoryError(error:unknown){
 const known=error instanceof AuthError||error instanceof CatalogError;
 const code=(error as {code?:string})?.code;
 const status=known?error.status:['P2002','P2034'].includes(code||'')?409:503;
 const message=known?error.message:code==='P2002'?'Request key already used. Check the original movement.':code==='P2034'?'Concurrent change rejected. Retry with the same request key.':'Inventory service unavailable. Retry the same request after checking history.';
 return NextResponse.json({error:message},{status,headers:{'Cache-Control':'no-store'}});
}
