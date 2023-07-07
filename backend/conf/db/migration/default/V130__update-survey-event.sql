ALTER TABLE survey_event
    ADD FOREIGN KEY (invitation_id) REFERENCES survey_invitation (id);
