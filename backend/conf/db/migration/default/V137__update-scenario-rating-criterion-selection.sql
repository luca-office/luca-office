ALTER TABLE scenario_rating_criterion_selection
    DROP CONSTRAINT scenario_rating_criterion_selection_pkey,
    ALTER COLUMN criterion_id DROP NOT NULL,
    ADD COLUMN automated_criterion_id UUID REFERENCES scenario_coding_automated_criterion,
    ADD CHECK (criterion_id IS NOT NULL OR automated_criterion_id IS NOT NULL),
    ADD UNIQUE (scenario_rating_id, criterion_id, automated_criterion_id);

ALTER TABLE scenario_rating_criterion_selection
    RENAME COLUMN criterion_id TO manual_criterion_id;
