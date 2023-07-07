ALTER TABLE directory
    ADD COLUMN sample_company_id UUID,
    ADD FOREIGN KEY (sample_company_id) REFERENCES sample_company (id);
