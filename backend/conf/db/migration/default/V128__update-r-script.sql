ALTER TABLE r_script
    DROP COLUMN script;

ALTER TABLE r_script
    ADD COLUMN version VARCHAR,
    ADD COLUMN git_commit_hash VARCHAR;

UPDATE r_script
SET version = '',
    git_commit_hash = '';

ALTER TABLE r_script
    ALTER COLUMN version SET NOT NULL,
    ALTER COLUMN git_commit_hash SET NOT NULL;
