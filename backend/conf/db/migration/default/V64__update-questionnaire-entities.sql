ALTER TABLE questionnaire_question
    DROP CONSTRAINT questionnaire_question_questionnaire_id_fkey,
    ADD FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id) ON DELETE CASCADE;

ALTER TABLE questionnaire_answer
    DROP CONSTRAINT questionnaire_answer_question_id_fkey,
    ADD FOREIGN KEY (question_id) REFERENCES questionnaire_question ON DELETE CASCADE;
