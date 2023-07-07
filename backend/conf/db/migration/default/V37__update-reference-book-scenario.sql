ALTER TABLE reference_book_scenario
    ADD COLUMN position NUMERIC;

UPDATE reference_book_scenario rbs
SET position = position.position
FROM (SELECT reference_book_id, scenario_id, row_number() OVER (PARTITION BY scenario_id) AS position
      FROM reference_book_scenario) position
WHERE rbs.scenario_id = position.scenario_id
  AND rbs.reference_book_id = position.reference_book_id;

ALTER TABLE reference_book_scenario
    ALTER COLUMN position SET NOT NULL;
