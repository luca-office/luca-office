CREATE TYPE SURVEY_EXECUTION_TYPE AS ENUM ('AutomaticAsynchronous', 'ManualAsynchronous', 'ManualSynchronous');

ALTER TABLE survey
    ADD COLUMN execution_type SURVEY_EXECUTION_TYPE;

UPDATE survey
SET execution_type = 'AutomaticAsynchronous';

ALTER TABLE survey
    ALTER COLUMN execution_type SET NOT NULL;
