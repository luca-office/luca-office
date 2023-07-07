ALTER TABLE reference_book_chapter_scenario
    DROP CONSTRAINT reference_book_scenario_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE;

ALTER TABLE directory
    DROP CONSTRAINT directory_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_questionnaire
    DROP CONSTRAINT scenario_questionnaire_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE coding_model
    DROP CONSTRAINT coding_model_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_sample_company_file
    DROP CONSTRAINT scenario_sample_company_file_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_user_account
    DROP CONSTRAINT scenario_user_account_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE intervention
    DROP CONSTRAINT intervention_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_component
    DROP CONSTRAINT scenario_erp_component_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_component_erp_product
    DROP CONSTRAINT scenario_erp_component_erp_product_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_customer
    DROP CONSTRAINT scenario_erp_customer_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_employee
    DROP CONSTRAINT scenario_erp_employee_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_invoice
    DROP CONSTRAINT scenario_erp_invoice_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_order
    DROP CONSTRAINT scenario_erp_order_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_order_item
    DROP CONSTRAINT scenario_erp_order_item_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_product
    DROP CONSTRAINT scenario_erp_product_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;

ALTER TABLE scenario_erp_supplier
    DROP CONSTRAINT scenario_erp_supplier_scenario_id_fkey,
    ADD FOREIGN KEY (scenario_id) REFERENCES scenario ON DELETE CASCADE;
