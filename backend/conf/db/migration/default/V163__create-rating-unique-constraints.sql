DELETE
FROM freetext_question_rating;

DELETE
FROM scenario_coding_item_rating;

ALTER TABLE freetext_question_rating
    ADD UNIQUE (rating_id, survey_invitation_id, question_id);

ALTER TABLE scenario_coding_item_rating
    ADD UNIQUE (rating_id, survey_invitation_id, coding_item_id);
