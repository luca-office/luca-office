CREATE TYPE USAGE_FIELD AS ENUM ('Unternehmen', 'Schule', 'Forschung', 'Demo', 'Sonstiges');

ALTER TABLE project
    ADD COLUMN author_id UUID,
    ADD COLUMN description VARCHAR,
    ADD COLUMN usage_field USAGE_FIELD,
    ADD COLUMN audience VARCHAR,
    ADD FOREIGN KEY (author_id) REFERENCES user_account (id);

UPDATE project
SET author_id = (SELECT id FROM user_account LIMIT 1),
    description = '',
    usage_field = 'Unternehmen',
    audience = '';

ALTER TABLE project
    ALTER COLUMN author_id SET NOT NULL,
    ALTER COLUMN description SET NOT NULL,
    ALTER COLUMN usage_field SET NOT NULL,
    ALTER COLUMN audience SET NOT NULL;
