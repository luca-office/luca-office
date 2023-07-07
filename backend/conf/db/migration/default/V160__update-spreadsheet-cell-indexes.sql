ALTER TABLE spreadsheet_cell
    DROP CONSTRAINT spreadsheet_cell_spreadsheet_id_row_index_column_index_key;

UPDATE spreadsheet_cell
SET row_index = row_index - 1,
    column_index = column_index - 1;

ALTER TABLE spreadsheet_cell
    ADD UNIQUE (spreadsheet_id, row_index, column_index);

UPDATE scenario_coding_automated_criterion
SET spreadsheet_row_index = spreadsheet_row_index - 1,
    spreadsheet_column_index = spreadsheet_column_index - 1;

UPDATE intervention
SET spreadsheet_row_index = spreadsheet_row_index - 1,
    spreadsheet_column_index = spreadsheet_column_index - 1;
