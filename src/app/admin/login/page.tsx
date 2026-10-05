import { currentSession } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PasswordField from './PasswordField';
export const metadata = { title: 'Admin sign in', robots: { index: false, follow: false } };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; loggedOut?: string }> }) {
  if (await currentSession()) redirect('/admin');
  const params = await searchParams;
  const message = params.error === 'limited' ? 'Too many attempts. Please wait 15 minutes before trying again.'
    : params.error ? 'Unable to sign in. Check your email and password.' : params.loggedOut ? 'You have been signed out.' : '';
  return (
    <main lang="en" className="min-h-screen bg-[#eeece4] px-5 pb-12 pt-16 text-[#30363c] sm:pt-20">
      <div className="mx-auto w-full max-w-[320px]">
        <div className="mb-7 flex justify-center">
          <Image src="/assets/subzero/sub-zero-logo.svg" width={180} height={38} alt="SUB-ZERO" unoptimized className="h-auto w-[180px]" />
        </div>
        <h1 className="sr-only">Sub-Zero Wolf SEA admin sign in</h1>
        {message && <p role="status" className="mb-4 border-l-4 border-[#3858e9] bg-white px-4 py-3 text-sm leading-6">{message}</p>}
        <section aria-label="Sign in" className="border border-[#c3c4c7] bg-white px-6 py-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <form action="/api/admin/login" method="post" className="space-y-5">
          <div><label htmlFor="email" className="mb-1 block text-sm">Email</label>
            <input id="email" name="email" type="email" required maxLength={191} autoComplete="username"
              className="min-h-11 w-full min-w-0 rounded-[2px] border border-[#8c8f94] bg-white px-2 py-2 text-base focus:outline-2 focus:outline-[#3858e9]" /></div>
          <PasswordField />
          <label className="flex min-h-11 items-center gap-2 text-sm"><input name="remember" type="checkbox" className="h-4 w-4 accent-[#3858e9]" />Remember me for 30 days</label>
          <div className="flex justify-end pt-1"><button type="submit" className="min-h-11 rounded-[2px] bg-[#3858e9] px-4 py-2 text-sm text-white hover:bg-[#2844cf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3858e9]">Sign in</button></div>
        </form>
        </section>
        <p className="mt-6 px-6 text-sm leading-6 text-[#30363c]">Forgot your password? Contact the site owner.</p>
        <Link href="/" className="mt-4 block px-6 text-sm text-[#30363c] underline underline-offset-2 hover:text-[#3858e9]">← Back to Sub-Zero Wolf SEA</Link>
        <p className="mt-8 px-6 text-xs leading-6 text-[#646970]">For authorized administrators and staff.<br />Sessions expire after 8 hours, or 30 days with Remember me.</p>
      </div>
    </main>
  );
}
