ALTER TABLE survey_event
    DROP CONSTRAINT survey_event_survey_id_index_key;

ALTER TABLE survey_event
    ADD UNIQUE (invitation_id, index);
