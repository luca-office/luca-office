ALTER TABLE scenario_rating
    DROP CONSTRAINT scenario_rating_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario (id);
