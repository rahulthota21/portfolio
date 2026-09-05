import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
// Optional. Either the legacy service_role JWT or a new sb_secret_… key.
// Everything works without it - writes then run through the owner's session.
const SERVICE_ROLE =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '';

/** True once the URL + anon key are set. Until then the site runs from seed data. */
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON);
export const supabaseAdminConfigured = Boolean(SUPABASE_URL && SERVICE_ROLE);

/** The only address permitted to sign in at /jackal. */
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? 'rahulthota21@gmail.com').toLowerCase();

/** Cookie-bound client for Server Components, Route Handlers and Server Actions. */
export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
      set: (name: string, value: string, options: CookieOptions) => {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          /* called from a Server Component render - middleware refreshes instead */
        }
      },
      remove: (name: string, options: CookieOptions) => {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          /* no-op */
        }
      },
    },
  });
}

/**
 * Service-role client. Bypasses RLS, so it is ONLY ever created inside
 * server actions that have already verified the signed-in admin.
 */
export function createSupabaseAdminClient() {
  if (!supabaseAdminConfigured) return null;
  return createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Read-only anon client for public page data. */
export function createSupabasePublicClient() {
  if (!supabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
