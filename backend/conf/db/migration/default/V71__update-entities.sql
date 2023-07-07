ALTER TABLE reference_book_chapter
    RENAME published_at TO finalized_at;

ALTER TABLE questionnaire
    ADD COLUMN finalized_at TIMESTAMP WITH TIME ZONE;
