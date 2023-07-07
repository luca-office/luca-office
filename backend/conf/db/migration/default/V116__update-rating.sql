ALTER TABLE rating
    ADD COLUMN is_final_score BOOLEAN;

UPDATE rating
SET is_final_score = FALSE;

ALTER TABLE rating
    ALTER COLUMN is_final_score SET NOT NULL;
