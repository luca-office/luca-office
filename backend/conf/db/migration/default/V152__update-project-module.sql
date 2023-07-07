ALTER TABLE project_module
    DROP CONSTRAINT scenario_project_project_id_fkey,
    DROP CONSTRAINT scenario_project_scenario_id_fkey,
    DROP CONSTRAINT project_module_questionnaire_id_fkey,
    ADD FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id) ON DELETE CASCADE;
