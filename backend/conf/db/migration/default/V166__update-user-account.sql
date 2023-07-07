ALTER TABLE user_account
    ADD COLUMN is_global_super_admin BOOLEAN;

UPDATE user_account
SET is_global_super_admin = FALSE;

ALTER TABLE user_account
    ALTER COLUMN is_global_super_admin SET NOT NULL;
