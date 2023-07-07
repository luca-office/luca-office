ALTER TABLE directory
    DROP CONSTRAINT directory_parent_directory_id_fkey,
    ADD FOREIGN KEY (parent_directory_id) REFERENCES directory (id) DEFERRABLE INITIALLY DEFERRED;
