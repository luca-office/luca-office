ALTER TABLE coding_model
    DROP CONSTRAINT coding_model_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE;

ALTER TABLE coding_dimension
    DROP CONSTRAINT coding_dimension_coding_model_id_fkey,
    DROP CONSTRAINT coding_dimension_parent_dimension_id_fkey,
    ADD FOREIGN KEY (coding_model_id) REFERENCES coding_model (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (parent_dimension_id) REFERENCES coding_dimension (id) ON DELETE CASCADE;

ALTER TABLE coding_item
    DROP CONSTRAINT coding_item_dimension_id_fkey,
    ADD FOREIGN KEY (dimension_id) REFERENCES coding_dimension (id) ON DELETE CASCADE;

ALTER TABLE coding_criterion
    DROP CONSTRAINT coding_criterion_item_id_fkey,
    ADD FOREIGN KEY (item_id) REFERENCES coding_item (id) ON DELETE CASCADE;
