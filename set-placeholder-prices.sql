-- ============================================================================
--  Placeholder prices (EGP) — just to preview how price looks in the design.
-- ============================================================================
--  Run once in the Supabase SQL editor (after add-price-column.sql).
--  These are NOT real prices — edit each product's price later from
--  /admin → Products → Edit, or change the numbers here and re-run.
--  Only the `price` column is touched; nothing else is affected.
-- ============================================================================

update public.products set price = 55000  where slug = 'cloud-sofa';
update public.products set price = 48000  where slug = 'oslo-sofa';
update public.products set price = 62000  where slug = 'palermo-sofa';
update public.products set price = 52000  where slug = 'skyline-sofa';
update public.products set price = 120000 where slug = 'rivera-u-sectional';
update public.products set price = 98000  where slug = 'cosmo-modular-sectional';
update public.products set price = 90000  where slug = 'marlow-sectional';
update public.products set price = 110000 where slug = 'cascade-sectional';
update public.products set price = 42000  where slug = 'comfort-bed';
update public.products set price = 45000  where slug = 'haven-bed';
update public.products set price = 38000  where slug = 'lora-bed';
update public.products set price = 28000  where slug = 'day-tv-unit';
