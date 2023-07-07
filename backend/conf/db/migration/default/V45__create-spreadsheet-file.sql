CREATE TYPE SPREADSHEET_CELL_TYPE AS ENUM ('General', 'Currency', 'Date', 'Number', 'Percent', 'Text');

CREATE TABLE spreadsheet (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE spreadsheet_cell (
    id UUID NOT NULL,
    row_index INT NOT NULL,
    column_index INT NOT NULL,
    cell_type SPREADSHEET_CELL_TYPE NOT NULL,
    value VARCHAR NOT NULL,

    spreadsheet_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (spreadsheet_id) REFERENCES spreadsheet (id),

    UNIQUE (row_index, column_index)
);

ALTER TABLE file
    ALTER COLUMN binary_file_id DROP NOT NULL,
    ADD COLUMN spreadsheet_id UUID REFERENCES spreadsheet (id);
