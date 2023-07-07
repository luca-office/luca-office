ALTER TABLE scenario_project
    ADD COLUMN position NUMERIC;

UPDATE scenario_project sp
SET position = position.position
FROM (SELECT project_id, scenario_id, row_number() OVER (PARTITION BY project_id) AS position
      FROM scenario_project) position
WHERE sp.project_id = position.project_id
  AND sp.scenario_id = position.scenario_id;

ALTER TABLE scenario_project
    ALTER COLUMN position SET NOT NULL;
