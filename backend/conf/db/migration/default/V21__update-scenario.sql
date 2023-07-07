ALTER TABLE scenario
    ADD COLUMN tags VARCHAR[],
    ADD COLUMN completion_email_address VARCHAR;

UPDATE scenario
SET tags = '{}';

ALTER TABLE scenario
    ALTER COLUMN tags SET NOT NULL;
