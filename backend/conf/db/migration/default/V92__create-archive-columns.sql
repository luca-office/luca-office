ALTER TABLE scenario
    ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE questionnaire
    ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE reference_book_chapter
    ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE sample_company
    ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE;
