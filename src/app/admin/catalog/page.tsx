import { requirePage } from '@/lib/auth/server';
import { catalogOptions } from '@/lib/catalog/service';
import CatalogShell from '@/components/AdminCatalog/CatalogShell';
import TaxonomyEditor from '@/components/AdminCatalog/TaxonomyEditor';
export default async function CatalogPage() { const session = await requirePage(['ADMIN','STAFF']); return <CatalogShell title="Brands & categories"><TaxonomyEditor options={await catalogOptions()} admin={session.user.role === 'ADMIN'} /></CatalogShell>; }
