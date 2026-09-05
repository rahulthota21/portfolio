'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { seed } from '@/data/seed';
import type { SiteContent } from '@/data/types';
import { CONTENT_TAG } from '@/lib/content';
import {
  ADMIN_EMAIL,
  createSupabaseAdminClient,
  createSupabaseServerClient,
  supabaseConfigured,
} from '@/lib/supabase/server';

export type ActionResult = { ok: boolean; message: string };

/**
 * Verifies the caller is the site owner and returns a writer client.
 *
 * Default path: the owner's own session. Row-level security in Postgres
 * checks the email inside the JWT on every write, so no all-powerful key
 * is needed. If a service-role/secret key happens to be configured it is
 * used instead (useful for scripted maintenance).
 */
async function getWriter() {
  if (!supabaseConfigured) throw new Error('Supabase is not configured yet.');

  const session = createSupabaseServerClient();
  const {
    data: { user },
  } = await session.auth.getUser();

  if (!user) throw new Error('Not signed in.');
  if (user.email?.toLowerCase() !== ADMIN_EMAIL) throw new Error('Not authorised.');

  return createSupabaseAdminClient() ?? session;
}

/** Push fresh content to every public surface. */
function revalidateSite() {
  revalidateTag(CONTENT_TAG);
  revalidatePath('/', 'layout');
  revalidatePath('/beyond-code');
  revalidatePath('/resume');
  revalidatePath('/work/[slug]', 'page');
}

/** Save one top-level content key (hero, projects, personal, …). */
export async function saveSection(key: keyof SiteContent, value: unknown): Promise<ActionResult> {
  try {
    const db = await getWriter();
    const { error } = await db
      .from('content')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

    if (error) return { ok: false, message: error.message };

    revalidateSite();
    return { ok: true, message: 'Saved and live.' };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/** First-run helper: copies the built-in seed content into Supabase. */
export async function seedDatabase(): Promise<ActionResult> {
  try {
    const db = await getWriter();
    const rows = Object.entries(seed).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await db.from('content').upsert(rows, { onConflict: 'key' });
    if (error) return { ok: false, message: error.message };

    revalidateSite();
    return { ok: true, message: `Seeded ${rows.length} sections into Supabase.` };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/** Restore one section back to its seed value. */
export async function resetSection(key: keyof SiteContent): Promise<ActionResult> {
  return saveSection(key, seed[key]);
}

export async function signOutAction() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/jackal/login');
}

/** Upload an image/PDF to the public `media` bucket and return its URL. */
export async function uploadMedia(formData: FormData): Promise<ActionResult & { url?: string }> {
  try {
    const db = await getWriter();

    const file = formData.get('file');
    const folder = (formData.get('folder') as string) || 'uploads';
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, message: 'No file selected.' };
    }
    if (file.size > 10 * 1024 * 1024) {
      return { ok: false, message: 'File is larger than 10 MB.' };
    }

    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
    const path = `${folder}/${Date.now()}-${safe}`;

    const { error } = await db.storage.from('media').upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type || undefined,
    });
    if (error) return { ok: false, message: error.message };

    const { data } = db.storage.from('media').getPublicUrl(path);
    revalidateSite();
    return { ok: true, message: 'Uploaded.', url: data.publicUrl };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Unknown error' };
  }
}
