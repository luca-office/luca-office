ALTER TABLE directory
    ADD COLUMN scenario_id UUID;

ALTER TABLE directory
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario (id);
