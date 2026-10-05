import { inventoryError } from '@/lib/inventory/http';
import { requireApi } from '@/lib/auth/server';
import { catalogResponse } from '@/lib/catalog/http';
import { listInventory } from '@/lib/inventory/service';
export async function GET(request:Request) { try {await requireApi(request);return catalogResponse(await listInventory(new URL(request.url).searchParams));} catch(e){return inventoryError(e);} }
