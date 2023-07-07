ALTER TABLE scenario_coding_automated_criterion
    DROP CONSTRAINT scenario_coding_automated_cri_erp_component_erp_product_id_fkey,
    DROP CONSTRAINT scenario_coding_automated_cri_erp_component_id_sample_comp_fkey,
    DROP CONSTRAINT scenario_coding_automated_cri_erp_customer_id_sample_compa_fkey,
    DROP CONSTRAINT scenario_coding_automated_cri_erp_employee_id_sample_compa_fkey,
    DROP CONSTRAINT scenario_coding_automated_cri_erp_invoice_id_sample_compan_fkey,
    DROP CONSTRAINT scenario_coding_automated_cri_erp_order_id_sample_company__fkey,
    DROP CONSTRAINT scenario_coding_automated_cri_erp_order_item_id_sample_com_fkey,
    DROP CONSTRAINT scenario_coding_automated_cri_erp_product_id_sample_compan_fkey,
    DROP CONSTRAINT scenario_coding_automated_cri_erp_supplier_id_sample_compa_fkey,
    DROP CONSTRAINT scenario_coding_automated_criter_reference_book_article_id_fkey,
    DROP CONSTRAINT scenario_coding_automated_criterion_email_id_fkey,
    DROP CONSTRAINT scenario_coding_automated_criterion_file_id_fkey,
    DROP CONSTRAINT scenario_coding_automated_criterion_item_id_fkey,
    DROP CONSTRAINT scenario_coding_automated_criterion_r_script_id_fkey,
    DROP CONSTRAINT scenario_coding_automated_criterion_sample_company_id_fkey;

ALTER TABLE scenario_coding_automated_criterion
    ADD FOREIGN KEY (item_id) REFERENCES coding_item (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (email_id) REFERENCES email (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (file_id) REFERENCES file (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (reference_book_article_id) REFERENCES reference_book_article (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_component_id, sample_company_id) REFERENCES erp_component (id, sample_company_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_component_erp_product_id, sample_company_id) REFERENCES erp_component_erp_product (id, sample_company_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_customer_id, sample_company_id) REFERENCES erp_customer (id, sample_company_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_employee_id, sample_company_id) REFERENCES erp_employee (id, sample_company_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_invoice_id, sample_company_id) REFERENCES erp_invoice (id, sample_company_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_order_id, sample_company_id) REFERENCES erp_order (id, sample_company_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_order_item_id, sample_company_id) REFERENCES erp_order_item (id, sample_company_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_product_id, sample_company_id) REFERENCES erp_product (id, sample_company_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (erp_supplier_id, sample_company_id) REFERENCES erp_supplier (id, sample_company_id) ON DELETE CASCADE;
