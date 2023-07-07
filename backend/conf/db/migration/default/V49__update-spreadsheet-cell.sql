ALTER TABLE spreadsheet_cell
    DROP CONSTRAINT spreadsheet_cell_spreadsheet_id_fkey,
    DROP CONSTRAINT spreadsheet_cell_row_index_column_index_key;

ALTER TABLE spreadsheet_cell
    ADD FOREIGN KEY (spreadsheet_id) REFERENCES spreadsheet (id) ON DELETE CASCADE,
    ADD UNIQUE (spreadsheet_id, row_index, column_index);
