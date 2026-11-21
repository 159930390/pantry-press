create table if not exists public.folios (
 id uuid primary key default gen_random_uuid(), owner uuid not null default auth.uid() references auth.users on delete cascade,
 title text not null, sheet jsonb not null, created_at timestamptz not null default now()
);
alter table public.folios enable row level security;
revoke all on public.folios from anon;
grant select,insert,delete on public.folios to authenticated;
create policy own_read on public.folios for select to authenticated using(owner=auth.uid());
create policy own_insert on public.folios for insert to authenticated with check(owner=auth.uid());
create policy own_delete on public.folios for delete to authenticated using(owner=auth.uid());