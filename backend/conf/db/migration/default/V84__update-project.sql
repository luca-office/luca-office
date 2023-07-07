ALTER TABLE project
    ADD COLUMN welcome_text VARCHAR;

UPDATE project
SET welcome_text = '';

ALTER TABLE project
    ALTER COLUMN welcome_text SET NOT NULL;
