import { requirePage } from '@/lib/auth/server';
import { catalogOptions } from '@/lib/catalog/service';
import CatalogShell from '@/components/AdminCatalog/CatalogShell';
import ProductEditor from '@/components/AdminCatalog/ProductEditor';
export default async function NewProductPage() {
  const session = await requirePage(['ADMIN','STAFF']);
  return <CatalogShell title="Add product"><ProductEditor options={await catalogOptions()} admin={session.user.role === 'ADMIN'} /></CatalogShell>;
}
