ALTER TABLE reference_book_article
    ADD COLUMN position NUMERIC;

UPDATE reference_book_article article
SET position = position.position
FROM (SELECT id, row_number() OVER (PARTITION BY reference_book_id ORDER BY created_at) AS position
      FROM reference_book_article) position
WHERE article.id = position.id;

ALTER TABLE reference_book_article
    ALTER COLUMN position SET NOT NULL;
