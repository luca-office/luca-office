ALTER TABLE survey_event
    DROP COLUMN user_account_id;

ALTER TABLE survey_event
    ALTER COLUMN invitation_id SET NOT NULL;
