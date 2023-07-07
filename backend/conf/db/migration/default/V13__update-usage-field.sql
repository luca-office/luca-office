ALTER TABLE project
    DROP COLUMN usage_field;

DROP TYPE USAGE_FIELD;

CREATE TYPE USAGE_FIELD AS ENUM ('Company', 'School', 'Research', 'Demonstration', 'Other');

ALTER TABLE project
    ADD COLUMN usage_field USAGE_FIELD;

UPDATE project
SET usage_field = 'Company';

ALTER TABLE project
    ALTER COLUMN usage_field SET NOT NULL;
