-- Security Store V6 compatibility layer for the existing Vralarmes schema.
-- IMPORTANT: validate in staging before production.
create or replace function public.current_role_code() returns text language sql stable security definer set search_path=public as $$ select r.code from profiles p join roles r on r.id=p.role_id where p.id=auth.uid() $$;
-- Critical order, pricing and stock operations must remain server-authoritative.
-- The live project already contains products, product_prices, customers, orders, order_items, stock and stock_movements.
-- Do not run the older standalone schema over the existing database.