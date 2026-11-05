export default function CatalogShell({ title, children }: { title: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#101010] p-4 text-sm text-[#FBF9F5] md:p-8"><div className="mx-auto max-w-6xl"><div className="mb-4 flex justify-end"><form action="/api/admin/logout" method="post"><button>Sign out</button></form></div><h1 className="mb-6 text-2xl font-medium">{title}</h1>{children}</div></main>;
}
