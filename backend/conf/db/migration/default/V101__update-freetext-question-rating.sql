ALTER TABLE freetext_question_rating
    ADD FOREIGN KEY (question_id) REFERENCES questionnaire_question (id);
