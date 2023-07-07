ALTER TABLE intervention
    ADD COLUMN spreadsheet_id UUID REFERENCES spreadsheet (id);
