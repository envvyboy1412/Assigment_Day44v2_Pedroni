-- Run this in the Supabase SQL Editor after creating a project.

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  category text not null,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_created_at_idx on public.products (created_at desc);

alter table public.products enable row level security;

-- Anyone can read products (public catalog)
create policy "Allow public read products"
  on public.products for select
  using (true);

-- Authenticated users can manage products (admin via Supabase Auth)
create policy "Allow authenticated insert products"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Allow authenticated update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated delete products"
  on public.products for delete
  to authenticated
  using (true);
