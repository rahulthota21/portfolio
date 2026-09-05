-- ─────────────────────────────────────────────────────────────────────────
--  rahulthota.dev — Supabase schema
--  Run this once: Supabase → SQL Editor → New query → paste → Run.
--
--  Security model: no service-role key anywhere.
--  Reads are public. Writes are allowed ONLY for a logged-in session whose
--  JWT email is the owner address below, enforced by Postgres itself.
-- ─────────────────────────────────────────────────────────────────────────

-- Change this if your admin address ever changes.
create or replace function public.is_site_owner()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'rahulthota21@gmail.com'
$$;

-- ── 1. Content: one row per top-level section of the site ────────────────
create table if not exists public.content (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.content enable row level security;

drop policy if exists "content is publicly readable" on public.content;
create policy "content is publicly readable"
  on public.content for select
  using (true);

drop policy if exists "no client writes" on public.content;
drop policy if exists "owner can insert content" on public.content;
create policy "owner can insert content"
  on public.content for insert
  to authenticated
  with check (public.is_site_owner());

drop policy if exists "owner can update content" on public.content;
create policy "owner can update content"
  on public.content for update
  to authenticated
  using (public.is_site_owner())
  with check (public.is_site_owner());

drop policy if exists "owner can delete content" on public.content;
create policy "owner can delete content"
  on public.content for delete
  to authenticated
  using (public.is_site_owner());

-- ── 2. Storage bucket for posters, portraits, diagrams, PDFs, resume ─────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media is publicly readable" on storage.objects;
create policy "media is publicly readable"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "no client uploads" on storage.objects;
drop policy if exists "owner can upload media" on storage.objects;
create policy "owner can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_site_owner());

drop policy if exists "owner can update media" on storage.objects;
create policy "owner can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_site_owner())
  with check (bucket_id = 'media' and public.is_site_owner());

drop policy if exists "owner can delete media" on storage.objects;
create policy "owner can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_site_owner());

-- ── 3. Keep updated_at honest ────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists content_touch on public.content;
create trigger content_touch
  before update on public.content
  for each row execute function public.touch_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
--  After running this:
--   1. Authentication → Users → Add user → rahulthota21@gmail.com + a long
--      password, tick "Auto Confirm User".
--   2. Authentication → Sign In / Providers → turn "Allow new users to sign up" OFF.
--   3. (Recommended) Authentication → enable MFA (TOTP) and enrol your
--      authenticator app — the login screen already handles the 6-digit code.
--   4. Go to /jackal, sign in, press "Load seed content" once.
--
--  Nobody else can write, even with the anon key, because Postgres checks the
--  email inside the JWT on every single write.
-- ─────────────────────────────────────────────────────────────────────────
