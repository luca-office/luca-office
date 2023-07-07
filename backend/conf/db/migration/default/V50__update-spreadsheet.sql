ALTER TABLE spreadsheet
    ADD COLUMN filename VARCHAR,
    ADD COLUMN file_size BIGINT;

UPDATE spreadsheet
SET filename = '',
    file_size = 0;

ALTER TABLE spreadsheet
    ALTER COLUMN filename SET NOT NULL,
    ALTER COLUMN file_size SET NOT NULL;
