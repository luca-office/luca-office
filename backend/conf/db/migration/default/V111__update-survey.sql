ALTER TABLE survey
    ADD COLUMN is_test_survey BOOLEAN,
    ADD COLUMN is_open_participation_enabled BOOLEAN;

UPDATE survey
SET is_test_survey = FALSE,
    is_open_participation_enabled = FALSE;

ALTER TABLE survey
    ALTER COLUMN is_test_survey SET NOT NULL,
    ALTER COLUMN is_open_participation_enabled SET NOT NULL;

ALTER TABLE survey_invitation
    ALTER COLUMN email DROP NOT NULL,
    ADD COLUMN is_open_participation BOOLEAN;

UPDATE survey_invitation
SET is_open_participation = FALSE;

ALTER TABLE survey_invitation
    ALTER COLUMN is_open_participation SET NOT NULL;
