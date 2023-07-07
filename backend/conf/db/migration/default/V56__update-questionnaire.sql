ALTER TABLE questionnaire
    DROP COLUMN image_binary_file_id,
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id),
    ADD COLUMN author_id UUID NOT NULL REFERENCES user_account (id);

ALTER TABLE questionnaire_question
    RENAME COLUMN is_additional_text_answer_allowed TO is_additional_free_text_answer_enabled;

ALTER TABLE questionnaire_question
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id);
