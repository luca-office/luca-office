ALTER TABLE freetext_question_rating_criterion_selection
    RENAME COLUMN rating_id TO freetext_question_rating_id;

ALTER TABLE scenario_rating_criterion_selection
    RENAME COLUMN rating_id TO scenario_rating_id;
