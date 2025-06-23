-- Migration to update remaining table IDs to numerical order
-- This migration handles profiles, addresses, orders, order_items, and contact_inquiries tables

BEGIN;

-- Update profiles table (if needed)
-- Note: profiles.id should remain as UUID since it references auth.users.id
-- No changes needed for profiles

-- Update addresses table
ALTER TABLE addresses ADD COLUMN new_id SERIAL;

CREATE TEMP TABLE addresses_id_mapping AS
SELECT 
    id as old_id,
    ROW_NUMBER() OVER (ORDER BY user_id, created_at) as new_id
FROM addresses;

UPDATE addresses 
SET new_id = mapping.new_id
FROM addresses_id_mapping mapping
WHERE addresses.id = mapping.old_id;

-- Update foreign key references in orders table
ALTER TABLE orders ADD COLUMN new_address_id INTEGER;
UPDATE orders 
SET new_address_id = addr_mapping.new_id
FROM addresses_id_mapping addr_mapping
WHERE orders.address_id = addr_mapping.old_id;

-- Drop constraints and old columns for addresses
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_address_id_fkey;
ALTER TABLE addresses DROP CONSTRAINT IF EXISTS addresses_pkey;
ALTER TABLE addresses DROP COLUMN id;
ALTER TABLE orders DROP COLUMN address_id;

-- Rename new columns
ALTER TABLE addresses RENAME COLUMN new_id TO id;
ALTER TABLE orders RENAME COLUMN new_address_id TO address_id;

-- Add new constraints for addresses
ALTER TABLE addresses ADD PRIMARY KEY (id);
ALTER TABLE orders ADD CONSTRAINT orders_address_id_fkey 
    FOREIGN KEY (address_id) REFERENCES addresses(id);

-- Update orders table
ALTER TABLE orders ADD COLUMN new_id SERIAL;

CREATE TEMP TABLE orders_id_mapping AS
SELECT 
    id as old_id,
    ROW_NUMBER() OVER (ORDER BY created_at) as new_id
FROM orders;

UPDATE orders 
SET new_id = mapping.new_id
FROM orders_id_mapping mapping
WHERE orders.id = mapping.old_id;

-- Update foreign key references in order_items table
ALTER TABLE order_items ADD COLUMN new_order_id INTEGER;
UPDATE order_items 
SET new_order_id = order_mapping.new_id
FROM orders_id_mapping order_mapping
WHERE order_items.order_id = order_mapping.old_id;

-- Drop constraints and old columns for orders
ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE orders DROP COLUMN id;
ALTER TABLE order_items DROP COLUMN order_id;

-- Rename new columns
ALTER TABLE orders RENAME COLUMN new_id TO id;
ALTER TABLE order_items RENAME COLUMN new_order_id TO order_id;

-- Add new constraints for orders
ALTER TABLE orders ADD PRIMARY KEY (id);
ALTER TABLE order_items ADD CONSTRAINT order_items_order_id_fkey 
    FOREIGN KEY (order_id) REFERENCES orders(id);

-- Update order_items table
ALTER TABLE order_items ADD COLUMN new_id SERIAL;

CREATE TEMP TABLE order_items_id_mapping AS
SELECT 
    id as old_id,
    ROW_NUMBER() OVER (ORDER BY order_id, created_at) as new_id
FROM order_items;

UPDATE order_items 
SET new_id = mapping.new_id
FROM order_items_id_mapping mapping
WHERE order_items.id = mapping.old_id;

-- Drop old primary key and column for order_items
ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE order_items DROP COLUMN id;

-- Rename new column
ALTER TABLE order_items RENAME COLUMN new_id TO id;

-- Add new constraint for order_items
ALTER TABLE order_items ADD PRIMARY KEY (id);

-- Update contact_inquiries table
ALTER TABLE contact_inquiries ADD COLUMN new_id SERIAL;

CREATE TEMP TABLE contact_inquiries_id_mapping AS
SELECT 
    id as old_id,
    ROW_NUMBER() OVER (ORDER BY created_at) as new_id
FROM contact_inquiries;

UPDATE contact_inquiries 
SET new_id = mapping.new_id
FROM contact_inquiries_id_mapping mapping
WHERE contact_inquiries.id = mapping.old_id;

-- Drop old primary key and column for contact_inquiries
ALTER TABLE contact_inquiries DROP CONSTRAINT IF EXISTS contact_inquiries_pkey;
ALTER TABLE contact_inquiries DROP COLUMN id;

-- Rename new column
ALTER TABLE contact_inquiries RENAME COLUMN new_id TO id;

-- Add new constraint for contact_inquiries
ALTER TABLE contact_inquiries ADD PRIMARY KEY (id);

COMMIT;
