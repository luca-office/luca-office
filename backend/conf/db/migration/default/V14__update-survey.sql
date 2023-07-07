ALTER TABLE survey
    ADD COLUMN title VARCHAR,
    ADD COLUMN description VARCHAR,
    ADD COLUMN ends_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN is_participation_restricted BOOLEAN,
    ADD COLUMN is_anonymous_participation_allowed BOOLEAN,
    ADD COLUMN is_tutorial_skipping_allowed BOOLEAN,
    ALTER COLUMN starts_at DROP NOT NULL;

UPDATE survey
SET title = '',
    description = '',
    is_participation_restricted = FALSE,
    is_anonymous_participation_allowed = TRUE,
    is_tutorial_skipping_allowed = FALSE;

ALTER TABLE survey
    ALTER COLUMN title SET NOT NULL,
    ALTER COLUMN description SET NOT NULL,
    ALTER COLUMN is_participation_restricted SET NOT NULL,
    ALTER COLUMN is_anonymous_participation_allowed SET NOT NULL,
    ALTER COLUMN is_tutorial_skipping_allowed SET NOT NULL;
