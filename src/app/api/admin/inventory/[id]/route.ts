import { inventoryError } from '@/lib/inventory/http';
import { requireApi } from '@/lib/auth/server';
import { catalogResponse, jsonBody } from '@/lib/catalog/http';
import { inventoryDetail,moveStock } from '@/lib/inventory/service';
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}) {try{await requireApi(request);return catalogResponse(await inventoryDetail((await params).id,Number(new URL(request.url).searchParams.get('page')||1)));}catch(e){return inventoryError(e);}}
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}) {try{const session=await requireApi(request,['ADMIN']);return catalogResponse(await moveStock(session.tokenHash,(await params).id,await jsonBody(request)));}catch(e){return inventoryError(e);}}
