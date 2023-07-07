CREATE TYPE AUTHENTICATION_TYPE AS ENUM ('OnlyRegistered', 'OnlyAnonymous', 'RegisteredOrAnonymous');

ALTER TABLE survey
    DROP COLUMN is_participation_restricted,
    DROP COLUMN is_anonymous_participation_allowed,
    ADD COLUMN authentication_type AUTHENTICATION_TYPE;

UPDATE survey
SET authentication_type = 'OnlyRegistered';

ALTER TABLE survey
    ALTER COLUMN authentication_type SET NOT NULL;
