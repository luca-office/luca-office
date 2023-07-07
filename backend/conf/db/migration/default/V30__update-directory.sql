ALTER TABLE directory
    DROP CONSTRAINT directory_parent_directory_id_fkey;

ALTER TABLE directory
    ADD FOREIGN KEY (parent_directory_id) REFERENCES directory (id) ON DELETE CASCADE;
