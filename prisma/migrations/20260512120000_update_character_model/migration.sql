-- Update the character table to store both imported source JSON and the app's normalized working data.

-- Drop constraints and indexes that reference columns renamed or removed below.
ALTER TABLE "characters" DROP CONSTRAINT IF EXISTS "characters_owner_id_fkey";
ALTER TABLE "characters" DROP CONSTRAINT IF EXISTS "characters_avatar_asset_id_fkey";
DROP INDEX IF EXISTS "characters_owner_id_idx";
DROP INDEX IF EXISTS "characters_avatar_asset_id_idx";

-- Rename existing columns that map cleanly to the new Character model.
ALTER TABLE "characters" RENAME COLUMN "owner_id" TO "user_id";
ALTER TABLE "characters" RENAME COLUMN "race" TO "race_name";
ALTER TABLE "characters" RENAME COLUMN "abilities" TO "stats";
ALTER TABLE "characters" RENAME COLUMN "saving_throws" TO "saves";
ALTER TABLE "characters" RENAME COLUMN "equipment" TO "items";

-- Add new scalar and JSON fields.
ALTER TABLE "characters"
  ADD COLUMN "edition" TEXT NOT NULL DEFAULT 'dnd-5e',
  ADD COLUMN "subclass_name" TEXT,
  ADD COLUMN "background" TEXT,
  ADD COLUMN "alignment" TEXT,
  ADD COLUMN "vitality" JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN "avatar" TEXT,
  ADD COLUMN "raw_json" JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN "normalized_data" JSONB NOT NULL DEFAULT '{}';

-- Preserve existing hit-point and armor data in the new vitality JSON document.
UPDATE "characters"
SET "vitality" = jsonb_strip_nulls(jsonb_build_object(
  'armorClass', "armor_class",
  'initiative', "initiative",
  'speed', "speed",
  'maxHitPoints', "max_hit_points",
  'currentHitPoints', "current_hit_points",
  'temporaryHitPoints', "temporary_hit_points"
));

-- Preserve existing free-text notes as a structured notes document.
ALTER TABLE "characters"
  ALTER COLUMN "notes" DROP DEFAULT,
  ALTER COLUMN "notes" TYPE JSONB USING CASE
    WHEN "notes" IS NULL OR "notes" = '' THEN '{}'::jsonb
    ELSE jsonb_build_object('text', "notes")
  END,
  ALTER COLUMN "notes" SET DEFAULT '{}',
  ALTER COLUMN "notes" SET NOT NULL;

-- Preserve old avatar asset references as string values before removing the asset-specific column.
UPDATE "characters"
SET "avatar" = "avatar_asset_id"::text
WHERE "avatar_asset_id" IS NOT NULL;

-- Remove columns that are now represented by normalizedData, vitality, items, or avatar.
ALTER TABLE "characters"
  DROP COLUMN "armor_class",
  DROP COLUMN "initiative",
  DROP COLUMN "speed",
  DROP COLUMN "max_hit_points",
  DROP COLUMN "current_hit_points",
  DROP COLUMN "temporary_hit_points",
  DROP COLUMN "attacks",
  DROP COLUMN "avatar_asset_id";

-- Recreate indexes and the renamed user relation.
CREATE INDEX "characters_user_id_idx" ON "characters"("user_id");
ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
