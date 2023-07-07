ALTER TABLE questionnaire_question
    ADD COLUMN score INT CHECK (score >= 0 AND score <= 99);

UPDATE questionnaire_question
SET score = 0;

ALTER TABLE questionnaire_question
    ALTER COLUMN score SET NOT NULL;

ALTER TABLE questionnaire_answer
    DROP COLUMN score;
