ALTER TABLE scenario
    ADD COLUMN should_hide_chapters BOOLEAN;

UPDATE scenario
SET should_hide_chapters = TRUE;

ALTER TABLE scenario
    ALTER COLUMN should_hide_chapters SET NOT NULL;
