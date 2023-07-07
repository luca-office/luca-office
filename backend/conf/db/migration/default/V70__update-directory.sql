ALTER TABLE directory
    DROP CONSTRAINT directory_sample_company_id_fkey,
    ADD FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE;
