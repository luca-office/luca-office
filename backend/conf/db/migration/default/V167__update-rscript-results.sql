ALTER TABLE r_script_evaluation_result
    ADD COLUMN criterion_fulfilled BOOLEAN;

ALTER TABLE r_script_evaluation_result
    ADD COLUMN result_category VARCHAR;

