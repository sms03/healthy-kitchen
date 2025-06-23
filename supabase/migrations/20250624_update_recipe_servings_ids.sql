-- Migration to update recipe_servings IDs to numerical order
-- This migration converts UUID primary keys to sequential integers for recipe_servings table

BEGIN;

-- Step 1: Add new integer ID column to recipe_servings
ALTER TABLE recipe_servings ADD COLUMN new_id SERIAL;

-- Step 2: Create a mapping table to track old UUID to new integer relationships
-- Order by recipe_id (which is now an integer) and then by created_at
CREATE TEMP TABLE recipe_servings_id_mapping AS
SELECT 
    id as old_id,
    ROW_NUMBER() OVER (ORDER BY recipe_id, created_at) as new_id
FROM recipe_servings;

-- Step 3: Update the new_id column with the mapped values
UPDATE recipe_servings 
SET new_id = mapping.new_id
FROM recipe_servings_id_mapping mapping
WHERE recipe_servings.id = mapping.old_id;

-- Step 4: Drop old primary key constraint
ALTER TABLE recipe_servings DROP CONSTRAINT IF EXISTS recipe_servings_pkey;

-- Step 5: Drop old UUID column
ALTER TABLE recipe_servings DROP COLUMN id;

-- Step 6: Rename new column to be the primary column
ALTER TABLE recipe_servings RENAME COLUMN new_id TO id;

-- Step 7: Add primary key constraint
ALTER TABLE recipe_servings ADD PRIMARY KEY (id);

COMMIT;
