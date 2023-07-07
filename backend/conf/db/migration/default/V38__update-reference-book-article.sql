ALTER TABLE reference_book_article
    DROP CONSTRAINT reference_book_article_reference_book_id_fkey;

ALTER TABLE reference_book_article
    ADD FOREIGN KEY (reference_book_id) REFERENCES reference_book (id) ON DELETE CASCADE;

ALTER TABLE reference_book_content
    DROP CONSTRAINT reference_book_content_reference_book_article_id_fkey;

ALTER TABLE reference_book_content
    ADD FOREIGN KEY (reference_book_article_id) REFERENCES reference_book_article (id) ON DELETE CASCADE;
