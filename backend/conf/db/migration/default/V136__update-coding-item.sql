ALTER TABLE scenario_rating
    DROP COLUMN no_criterion_fulfilled;

ALTER TABLE coding_item
    ADD COLUMN no_criterion_fulfilled BOOLEAN;

UPDATE coding_item
SET no_criterion_fulfilled = FALSE;

ALTER TABLE coding_item
    ALTER COLUMN no_criterion_fulfilled SET NOT NULL;
