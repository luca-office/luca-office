ALTER TABLE reference_book
    RENAME TO reference_book_chapter;

ALTER TABLE reference_book_scenario
    RENAME TO reference_book_chapter_scenario;

ALTER TABLE reference_book_article
    RENAME COLUMN reference_book_id TO reference_book_chapter_id;

ALTER TABLE reference_book_chapter_scenario
    RENAME COLUMN reference_book_id TO reference_book_chapter_id;
