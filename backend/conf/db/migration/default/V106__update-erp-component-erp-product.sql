DELETE
FROM scenario_erp_component_erp_product;

ALTER TABLE scenario_erp_component_erp_product
    DROP CONSTRAINT scenario_erp_component_erp_product_pkey,

    -- generated name for postgres >= 12
    DROP CONSTRAINT IF EXISTS scenario_erp_component_erp_pr_component_id_product_id_samp_fkey,
    -- generated name for postgres < 12
    DROP CONSTRAINT IF EXISTS scenario_erp_component_erp_product_component_id_fkey,

    DROP COLUMN component_id,
    DROP COLUMN product_id;

ALTER TABLE erp_component_erp_product
    DROP CONSTRAINT erp_component_erp_product_pkey,
    ADD COLUMN id SERIAL,
    ADD PRIMARY KEY (id, sample_company_id);

ALTER TABLE scenario_erp_component_erp_product
    ADD COLUMN component_product_id INT NOT NULL,
    ADD PRIMARY KEY (scenario_id, component_product_id),
    ADD FOREIGN KEY (component_product_id, sample_company_id) REFERENCES erp_component_erp_product (id, sample_company_id);
