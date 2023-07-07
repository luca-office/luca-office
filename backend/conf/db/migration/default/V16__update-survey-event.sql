DELETE
FROM survey_event;

ALTER TABLE survey_event
    ALTER COLUMN user_account_id DROP NOT NULL;

ALTER TABLE survey_event
    RENAME created_at TO timestamp;

ALTER TABLE survey_event
    ADD COLUMN index INT NOT NULL,
    ADD COLUMN invitation_id UUID,
    ADD UNIQUE (survey_id, index);
