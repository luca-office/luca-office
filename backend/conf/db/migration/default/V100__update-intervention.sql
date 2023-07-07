CREATE TYPE INTERVENTION_CONDITION AS ENUM ('FileWasOpened', 'FileWasNotOpened');

ALTER TABLE intervention
    ADD COLUMN file_id UUID,
    ADD COLUMN intervention_condition INTERVENTION_CONDITION,
    ADD FOREIGN KEY (file_id) REFERENCES file (id);

UPDATE intervention
SET intervention_condition = 'FileWasNotOpened';

ALTER TABLE intervention
    ALTER COLUMN intervention_condition SET NOT NULL;
