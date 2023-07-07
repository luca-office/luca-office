ALTER TABLE questionnaire_question
    ADD COLUMN position NUMERIC;

UPDATE questionnaire_question question
SET position = position.position
FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY questionnaire_id) AS position
      FROM questionnaire_question) position
WHERE question.id = position.id;

ALTER TABLE questionnaire_question
    ALTER COLUMN position SET NOT NULL;


ALTER TABLE questionnaire_answer
    ADD COLUMN position NUMERIC;

UPDATE questionnaire_answer answer
SET position = position.position
FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY question_id) AS position
      FROM questionnaire_answer) position
WHERE answer.id = position.id;

ALTER TABLE questionnaire_answer
    ALTER COLUMN position SET NOT NULL;


ALTER TABLE coding_dimension
    ADD COLUMN position NUMERIC;

UPDATE coding_dimension dimension
SET position = position.position
FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY coding_model_id, parent_dimension_id) AS position
      FROM coding_dimension) position
WHERE dimension.id = position.id;

ALTER TABLE coding_dimension
    ALTER COLUMN position SET NOT NULL;


ALTER TABLE coding_item
    ADD COLUMN position NUMERIC;

UPDATE coding_item item
SET position = position.position
FROM (SELECT id, ROW_NUMBER() OVER (PARTITION BY dimension_id) AS position
      FROM coding_item) position
WHERE item.id = position.id;

ALTER TABLE coding_item
    ALTER COLUMN position SET NOT NULL;
