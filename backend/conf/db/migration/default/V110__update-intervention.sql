ALTER TYPE INTERVENTION_TYPE ADD VALUE 'ErpRowOpening';

ALTER TABLE intervention
    ADD COLUMN sample_company_id UUID,

    ADD COLUMN erp_component_id INT,
    ADD COLUMN erp_component_erp_product_id INT,
    ADD COLUMN erp_customer_id INT,
    ADD COLUMN erp_employee_id INT,
    ADD COLUMN erp_invoice_id INT,
    ADD COLUMN erp_order_id INT,
    ADD COLUMN erp_order_item_id INT,
    ADD COLUMN erp_product_id INT,
    ADD COLUMN erp_supplier_id INT,

    ADD FOREIGN KEY (erp_component_id, sample_company_id) REFERENCES erp_component (id, sample_company_id),
    ADD FOREIGN KEY (erp_component_erp_product_id, sample_company_id) REFERENCES erp_component_erp_product (id, sample_company_id),
    ADD FOREIGN KEY (erp_customer_id, sample_company_id) REFERENCES erp_customer (id, sample_company_id),
    ADD FOREIGN KEY (erp_employee_id, sample_company_id) REFERENCES erp_employee (id, sample_company_id),
    ADD FOREIGN KEY (erp_invoice_id, sample_company_id) REFERENCES erp_invoice (id, sample_company_id),
    ADD FOREIGN KEY (erp_order_id, sample_company_id) REFERENCES erp_order (id, sample_company_id),
    ADD FOREIGN KEY (erp_order_item_id, sample_company_id) REFERENCES erp_order_item (id, sample_company_id),
    ADD FOREIGN KEY (erp_product_id, sample_company_id) REFERENCES erp_product (id, sample_company_id),
    ADD FOREIGN KEY (erp_supplier_id, sample_company_id) REFERENCES erp_supplier (id, sample_company_id);
