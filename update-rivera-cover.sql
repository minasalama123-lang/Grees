-- ============================================================================
--  Set the primary (cover) image for products whose front view should lead.
-- ============================================================================
--  Run once in the Supabase SQL editor. The first image in the array is the
--  cover. (Re-running reseed-products.sql also applies these — they're in sync.)
-- ============================================================================

-- Rivera U-Sectional → full front view first.
update public.products
set images = $$[
  {"src":"/images/sectionals/rivera-3.webp","alt":"Rivera beige U-shaped modular sectional, front view","width":1200,"height":800},
  {"src":"/images/sectionals/rivera-1.webp","alt":"Rivera U-sectional, top view","width":1200,"height":800},
  {"src":"/images/sectionals/rivera-2.jpg","alt":"Rivera U-sectional, corner view","width":1200,"height":800}
]$$::jsonb
where slug = 'rivera-u-sectional';

-- Marlow Lounge Sectional → full front view first.
update public.products
set images = $$[
  {"src":"/images/sectionals/marlow-3.webp","alt":"Marlow slipcover lounge sectional in cream, front view","width":1600,"height":1600},
  {"src":"/images/sectionals/marlow-1.webp","alt":"Marlow lounge sectional, corner detail","width":1600,"height":1600},
  {"src":"/images/sectionals/marlow-2.webp","alt":"Marlow lounge sectional, wide view","width":1600,"height":1600}
]$$::jsonb
where slug = 'marlow-sectional';
