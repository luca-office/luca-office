UPDATE directory d
SET sample_company_id = (SELECT id FROM sample_company s WHERE d.id = s.directory_id);

ALTER TABLE sample_company
    DROP COLUMN directory_id;
