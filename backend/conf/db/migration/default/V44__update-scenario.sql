ALTER TABLE scenario
    ADD COLUMN sample_company_id UUID;

ALTER TABLE scenario
    ADD FOREIGN KEY (sample_company_id) REFERENCES sample_company (id);
