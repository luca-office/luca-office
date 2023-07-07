ALTER TABLE survey_user_account
    DROP CONSTRAINT survey_user_account_survey_id_fkey;

ALTER TABLE survey_user_account
    ADD FOREIGN KEY (survey_id) REFERENCES survey (id) ON DELETE CASCADE;


ALTER TABLE survey_invitation
    DROP CONSTRAINT survey_invitation_survey_id_fkey;

ALTER TABLE survey_invitation
    ADD FOREIGN KEY (survey_id) REFERENCES survey (id) ON DELETE CASCADE;


ALTER TABLE rating
    DROP CONSTRAINT rating_survey_id_fkey;

ALTER TABLE rating
    ADD FOREIGN KEY (survey_id) REFERENCES survey (id) ON DELETE CASCADE;


ALTER TABLE scenario_rating
    DROP CONSTRAINT scenario_rating_rating_id_fkey;

ALTER TABLE scenario_rating
    ADD FOREIGN KEY (rating_id) REFERENCES rating (id) ON DELETE CASCADE;


ALTER TABLE scenario_rating_criterion_selection
    DROP CONSTRAINT scenario_rating_criterion_selection_rating_id_fkey;

ALTER TABLE scenario_rating_criterion_selection
    ADD FOREIGN KEY (scenario_rating_id) REFERENCES scenario_rating (id) ON DELETE CASCADE;


ALTER TABLE freetext_question_rating
    DROP CONSTRAINT freetext_question_rating_rating_id_fkey;

ALTER TABLE freetext_question_rating
    ADD FOREIGN KEY (rating_id) REFERENCES rating (id) ON DELETE CASCADE;


ALTER TABLE freetext_question_rating_criterion_selection
    DROP CONSTRAINT freetext_question_rating_criterion_selection_rating_id_fkey;

ALTER TABLE freetext_question_rating_criterion_selection
    ADD FOREIGN KEY (freetext_question_rating_id) REFERENCES freetext_question_rating (id) ON DELETE CASCADE;
