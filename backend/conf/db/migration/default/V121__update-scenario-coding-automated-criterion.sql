CREATE TYPE FEATURE_TYPE AS ENUM ('AnswerEmail', 'CopyToClipboard', 'FormulaUsage', 'PasteFromClipboard', 'Search');

ALTER TABLE scenario_coding_automated_criterion
    ADD COLUMN feature_type FEATURE_TYPE;
