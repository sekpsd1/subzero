'use client';
/* eslint-disable @next/next/no-img-element -- private authenticated images must bypass Next image proxy. */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
type Options = { brands: { id: string; name: string }[]; categories: { id: string; name: string; parentId: string | null; brandId: string | null }[] };
type Image = { id: string; url: string; alt: string | null; sortOrder: number };
type Product = { id: string; model: string; name: string; slug: string; brandId: string; categoryId: string; series: string | null; type: string | null; width: string | null; finish: string | null; description: string | null; status: string; featuresJson: unknown; specsJson: unknown; deletedAt: string | null; updatedAt: string; images: Image[] };
export default function ProductEditor({ initial, options, admin }: { initial?: Product; options: Options; admin: boolean }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const [brandId, setBrandId] = useState(initial?.brandId || ''); const [images, setImages] = useState(initial?.images || []);
  const [features, setFeatures] = useState(Array.isArray(initial?.featuresJson) ? initial.featuresJson.join('\n') : '');
  const [specs, setSpecs] = useState(JSON.stringify(initial?.specsJson || {}, null, 2));
  const control = 'mt-1 w-full min-w-0 rounded border border-white/20 bg-[#202020] p-2 text-sm';
  async function mutate(url: string, method: string, body: unknown) {
    setBusy(true); setError(''); setNotice('');
    try {
      const multipart = body instanceof FormData;
      const response = await fetch(url, { method, headers: multipart ? undefined : { 'Content-Type': 'application/json' }, body: multipart ? body : JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Request failed.');
      setNotice('Saved to database.');
      return result.data;
    } catch (e) { setError(e instanceof Error ? e.message : 'Request failed.'); return null; }
    finally { setBusy(false); }
  }
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let parsedSpecs; try { parsedSpecs = JSON.parse(specs); } catch { setError('Specs: enter a valid JSON object with text values.'); return; }
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const saved = await mutate(initial ? `/api/admin/products/${initial.id}` : '/api/admin/products', initial ? 'PATCH' : 'POST', { ...data, features: features.split('\n').map(s => s.trim()).filter(Boolean), specs: parsedSpecs, updatedAt: initial?.updatedAt });
    if (saved) { if (!initial) router.push(`/admin/products/${saved.id}`); router.refresh(); }
  }
  async function lifecycle() {
    if (!initial || !window.confirm(initial.deletedAt ? 'Restore this product as Draft?' : 'Move this product to deleted items?')) return;
    const saved = await mutate(`/api/admin/products/${initial.id}${initial.deletedAt ? '/restore' : ''}`, initial.deletedAt ? 'POST' : 'DELETE', { updatedAt: initial.updatedAt });
    if (saved) router.refresh();
  }
  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!initial) return;
    const form = event.currentTarget; const body = new FormData(form); body.set('updatedAt', initial.updatedAt);
    if (await mutate(`/api/admin/products/${initial.id}/images`, 'POST', body)) { form.reset(); router.refresh(); }
  }
  async function saveImages(deleteId?: string) {
    if (!initial) return;
    if (deleteId && !window.confirm('Remove this image from the product?')) return;
    if (await mutate(`/api/admin/products/${initial.id}/images`, 'PATCH', { updatedAt: initial.updatedAt, ...(deleteId ? { deleteId } : { images: images.map(({ id, alt }) => ({ id, alt })) }) })) router.refresh();
  }
  function move(index: number, delta: number) { const next = [...images]; [next[index], next[index + delta]] = [next[index + delta], next[index]]; setImages(next); }
  return <div className="space-y-6">{error && <p role="alert" className="border border-red-400/40 p-3 text-red-300">{error}</p>}{notice && <p role="status" className="text-green-300">{notice}</p>}{initial?.deletedAt && <p className="text-amber-300">Deleted product. Restore as Draft to edit.</p>}<form onSubmit={save} className="space-y-4"><fieldset disabled={busy || Boolean(initial?.deletedAt)} className="grid min-w-0 gap-4 md:grid-cols-2">{['model','name','slug','series','type','width','finish'].map(key => <label key={key} className="capitalize">{key}<input className={control} name={key} maxLength={191} required={['model','name','slug'].includes(key)} defaultValue={initial?.[key as keyof Product] as string || ''}/></label>)}<label>Brand<select className={control} name="brandId" required value={brandId} onChange={e => setBrandId(e.target.value)}><option value="">Choose brand</option>{options.brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></label><label>Category<select className={control} name="categoryId" required defaultValue={initial?.categoryId || ''}><option value="">Choose category</option>{options.categories.filter(c => !c.brandId || c.brandId === brandId).map(c => <option key={c.id} value={c.id}>{c.parentId ? `${options.categories.find(p => p.id === c.parentId)?.name} / ` : ''}{c.name}</option>)}</select></label><label>Status<select className={control} name="status" defaultValue={initial?.status || 'DRAFT'}>{['DRAFT','ACTIVE','ARCHIVED'].map(s => <option key={s}>{s}</option>)}</select></label><label className="md:col-span-2">Description<textarea className={control} name="description" rows={5} maxLength={16000} defaultValue={initial?.description || ''}/></label><label>Features (one per line)<textarea className={control} rows={6} value={features} onChange={e => setFeatures(e.target.value)}/></label><label>Specifications (JSON text key/value pairs)<textarea className={`${control} font-mono`} rows={6} value={specs} onChange={e => setSpecs(e.target.value)}/></label><button className="border border-white/30 px-4 py-2 md:col-span-2">{busy ? 'Saving…' : 'Save product'}</button></fieldset></form>{initial && admin && <button disabled={busy} onClick={lifecycle} className="border border-amber-500/40 px-4 py-2 text-amber-300">{initial.deletedAt ? 'Restore as Draft' : 'Soft delete product'}</button>}{initial && !initial.deletedAt && <section className="space-y-4 border-t border-white/10 pt-5"><h2 className="text-lg">Product images</h2><p className="text-stone-400">JPEG, PNG or WebP · 5 MiB each · 24 megapixels · 20 images maximum</p><form onSubmit={upload} className="flex flex-wrap items-end gap-3"><label>Image<input className={control} name="file" type="file" accept="image/jpeg,image/png,image/webp" required disabled={busy}/></label><label>Alt text<input className={control} name="alt" maxLength={500} disabled={busy}/></label><button disabled={busy} className="border border-white/25 p-2">Upload</button></form><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map((image, index) => <div key={image.id} className="min-w-0 border border-white/10 p-3"><img src={image.url} alt={image.alt || ''} className="h-36 w-full object-contain"/><label>Alt text<input className={control} maxLength={500} disabled={busy} value={image.alt || ''} onChange={e => setImages(images.map(i => i.id === image.id ? { ...i, alt: e.target.value } : i))}/></label><div className="mt-3 flex gap-4"><button disabled={busy || index === 0} onClick={() => move(index, -1)}>↑ Earlier</button><button disabled={busy || index === images.length - 1} onClick={() => move(index, 1)}>↓ Later</button><button disabled={busy} onClick={() => saveImages(image.id)}>Remove</button></div></div>)}</div>{images.length > 0 && <button disabled={busy} onClick={() => saveImages()} className="border border-white/25 p-2">Save image order & alt text</button>}</section>}{!initial && <p className="text-stone-400">Save the product before uploading images. Manage brands and categories from the navigation above.</p>}</div>;
}
