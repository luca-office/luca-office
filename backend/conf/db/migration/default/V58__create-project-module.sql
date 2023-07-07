CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE PROJECT_MODULE_TYPE AS ENUM ('Scenario', 'Questionnaire');

ALTER TABLE scenario_project
    RENAME TO project_module;

ALTER TABLE project_module
    DROP CONSTRAINT scenario_project_pkey;

ALTER TABLE project_module
    ADD COLUMN id UUID,
    ADD COLUMN module_type PROJECT_MODULE_TYPE,
    ADD COLUMN questionnaire_id UUID;

UPDATE project_module
SET id = uuid_generate_v4(),
    module_type = 'Scenario';

ALTER TABLE project_module
    ALTER COLUMN id SET NOT NULL,
    ALTER COLUMN module_type SET NOT NULL;

ALTER TABLE project_module
    ADD PRIMARY KEY (id),
    ADD FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id),
    ADD CHECK ((module_type != 'Scenario' OR scenario_id IS NOT NULL) AND
               (module_type != 'Questionnaire' OR questionnaire_id IS NOT NULL));
