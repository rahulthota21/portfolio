import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { SectionEditor } from '@/components/admin/SectionEditor';
import type { SiteContent } from '@/data/types';
import { getContentFresh } from '@/lib/content';
import { SECTION_META } from '@/lib/sections';
import { createSupabaseServerClient, supabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function EditSectionPage({ params }: { params: { key: string } }) {
  const meta = SECTION_META.find((s) => s.key === params.key);
  if (!meta) notFound();

  const content = await getContentFresh();
  const value = content[meta.key as keyof SiteContent];

  let email: string | null = null;
  if (supabaseConfigured) {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email ?? null;
  }

  return (
    <AdminShell email={email}>
      <SectionEditor
        sectionKey={meta.key}
        label={meta.label}
        initial={value as never}
        live={supabaseConfigured}
      />
    </AdminShell>
  );
}
