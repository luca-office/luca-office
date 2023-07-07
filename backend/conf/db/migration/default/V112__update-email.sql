ALTER TABLE email
    DROP CONSTRAINT email_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE;
