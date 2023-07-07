ALTER TABLE r_script_evaluation_result
    DROP COLUMN score;

ALTER TABLE r_script_evaluation_result
    DROP COLUMN result_category;

ALTER TABLE r_script_evaluation_result
    RENAME COLUMN confidence TO probability;

ALTER TABLE r_script_evaluation_result
    ADD COLUMN threshold NUMERIC;

ALTER TABLE r_script_evaluation_result
    ADD COLUMN function_name VARCHAR;

ALTER TABLE r_script_evaluation_result
    ADD COLUMN criterion_no INT;

ALTER TABLE r_script_evaluation_result
    ADD COLUMN result_data VARCHAR;