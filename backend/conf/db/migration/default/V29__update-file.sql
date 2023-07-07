ALTER TABLE file
    DROP CONSTRAINT file_directory_id_fkey;

ALTER TABLE file
    DROP CONSTRAINT file_email_id_fkey;

ALTER TABLE file
    ADD FOREIGN KEY (directory_id) REFERENCES directory (id) ON DELETE CASCADE;

ALTER TABLE file
    ADD FOREIGN KEY (email_id) REFERENCES email (id) ON DELETE CASCADE;
