-- ============================================================================
--  Migration: add a `price` column to products (EGP).
-- ============================================================================
--  Run this ONCE in the Supabase SQL editor if your products table was created
--  before the price field existed. Safe to re-run (IF NOT EXISTS).
--  Null price = the site shows "Price on request". Set prices via /admin.
-- ============================================================================

alter table public.products
  add column if not exists price numeric;
