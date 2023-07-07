CREATE TYPE QUESTION_SCORING_TYPE AS ENUM ('Holistic', 'Analytical', 'None');

ALTER TABLE questionnaire_question
    ADD COLUMN scoring_type QUESTION_SCORING_TYPE;

UPDATE questionnaire_question
SET scoring_type = 'None';

ALTER TABLE questionnaire_question
    ALTER COLUMN scoring_type SET NOT NULL;
