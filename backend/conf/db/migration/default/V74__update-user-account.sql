ALTER TABLE user_account
    ADD COLUMN may_administrate_user_accounts BOOLEAN,
    ADD COLUMN may_archive BOOLEAN,
    ADD COLUMN may_finalize_without_publishing BOOLEAN;

UPDATE user_account
SET may_administrate_user_accounts = FALSE,
    may_archive = FALSE,
    may_finalize_without_publishing = FALSE;

ALTER TABLE user_account
    ALTER COLUMN may_administrate_user_accounts SET NOT NULL,
    ALTER COLUMN may_archive SET NOT NULL,
    ALTER COLUMN may_finalize_without_publishing SET NOT NULL;
