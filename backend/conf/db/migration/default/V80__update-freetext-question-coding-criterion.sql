ALTER TABLE freetext_question_coding_criterion
    DROP CONSTRAINT freetext_question_coding_criterion_question_id_fkey,
    ADD FOREIGN KEY (question_id) REFERENCES questionnaire_question (id) ON DELETE CASCADE;
