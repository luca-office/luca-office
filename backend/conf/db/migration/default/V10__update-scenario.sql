ALTER TABLE scenario
    ALTER COLUMN date DROP NOT NULL,
    ALTER COLUMN introduction_email_id DROP NOT NULL,
    ALTER COLUMN max_duration_in_seconds DROP NOT NULL;

ALTER TABLE scenario
    ADD FOREIGN KEY (introduction_email_id) REFERENCES email (id);
