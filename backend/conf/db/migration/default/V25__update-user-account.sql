ALTER TABLE user_account
    ADD COLUMN salutation SALUTATION;

UPDATE user_account
SET salutation = 'Mrs';

ALTER TABLE user_account
    ALTER COLUMN salutation SET NOT NULL;
