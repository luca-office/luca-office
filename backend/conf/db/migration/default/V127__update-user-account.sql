ALTER TABLE user_account
    ADD COLUMN may_administrate_r_scripts BOOLEAN;

UPDATE user_account
SET may_administrate_r_scripts = FALSE;

ALTER TABLE user_account
    ALTER COLUMN may_administrate_r_scripts SET NOT NULL;
