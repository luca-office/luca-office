ALTER TABLE freetext_question_rating
    DROP CONSTRAINT freetext_question_rating_survey_invitation_id_fkey,
    ADD FOREIGN KEY (survey_invitation_id) REFERENCES survey_invitation (id) ON DELETE CASCADE;

ALTER TABLE scenario_rating
    DROP CONSTRAINT scenario_rating_survey_invitation_id_fkey,
    ADD FOREIGN KEY (survey_invitation_id) REFERENCES survey_invitation (id) ON DELETE CASCADE;
