ALTER TABLE rating
    DROP CONSTRAINT rating_survey_id_user_account_id_key,
    ADD UNIQUE (survey_id, user_account_id, is_final_score);
