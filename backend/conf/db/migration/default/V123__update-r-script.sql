ALTER TABLE r_script
    ADD COLUMN script VARCHAR,
    ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE;

UPDATE r_script
SET script = '';

ALTER TABLE r_script
    ALTER COLUMN script SET NOT NULL;
