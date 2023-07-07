ALTER TABLE questionnaire_answer
    ADD COLUMN is_correct BOOLEAN,
    ADD COLUMN score INT CHECK (score >= 0 AND score <= 99);

UPDATE questionnaire_answer
SET is_correct = FALSE,
    score = 0;

ALTER TABLE questionnaire_answer
    ALTER COLUMN is_correct SET NOT NULL,
    ALTER COLUMN score SET NOT NULL;
