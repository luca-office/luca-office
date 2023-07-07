ALTER TABLE reference_book_chapter
    RENAME COLUMN finalized_at TO published_at;

ALTER TABLE sample_company
    RENAME COLUMN finalized_at TO published_at;
