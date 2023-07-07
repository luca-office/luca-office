ALTER TABLE coding_dimension
    DROP CONSTRAINT coding_dimension_parent_dimension_id_fkey,
    ADD FOREIGN KEY (parent_dimension_id) REFERENCES coding_dimension (id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
