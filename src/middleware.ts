import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Guards /jackal. Three layers:
 *  1. Refreshes the Supabase session cookie on every request.
 *  2. Redirects anonymous visitors to /jackal/login.
 *  3. Signs out and rejects anyone whose email is not ADMIN_EMAIL.
 * Security headers are applied site-wide; /jackal is additionally noindex.
 */
/** Every /jackal response - including redirects - stays out of search engines. */
function noIndex(res: NextResponse) {
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return res;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } });

  // Site-wide hardening
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/jackal')) return res;

  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const adminEmail = (process.env.ADMIN_EMAIL ?? '').toLowerCase();

  // Supabase not configured yet → let the page render its setup notice.
  if (!url || !key) return res;

  const supabase = createServerClient(url, key, {
    cookies: {
      get: (name: string) => req.cookies.get(name)?.value,
      set: (name: string, value: string, options: CookieOptions) => {
        res.cookies.set({ name, value, ...options });
      },
      remove: (name: string, options: CookieOptions) => {
        res.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLogin = pathname === '/jackal/login';

  if (!user) {
    if (isLogin) return res;
    const to = req.nextUrl.clone();
    to.pathname = '/jackal/login';
    to.searchParams.set('next', pathname);
    return noIndex(NextResponse.redirect(to));
  }

  // Signed in, but not the owner.
  if (adminEmail && user.email?.toLowerCase() !== adminEmail) {
    await supabase.auth.signOut();
    const to = req.nextUrl.clone();
    to.pathname = '/jackal/login';
    to.searchParams.set('error', 'not-allowed');
    return noIndex(NextResponse.redirect(to));
  }

  if (isLogin) {
    const to = req.nextUrl.clone();
    to.pathname = '/jackal';
    to.search = '';
    return noIndex(NextResponse.redirect(to));
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|files|.*\\.(?:png|jpg|jpeg|svg|webp|pdf)$).*)'],
};
