ALTER TABLE reference_book_content
    DROP COLUMN position_x;

ALTER TABLE reference_book_content
    RENAME position_y TO position;
