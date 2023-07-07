ALTER TABLE erp_supplier
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id),
    ADD COLUMN salutation SALUTATION;

UPDATE erp_supplier
SET salutation = 'Mrs';

ALTER TABLE erp_supplier
    ALTER COLUMN salutation SET NOT NULL;


ALTER TABLE erp_component
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id),
    ADD COLUMN unit VARCHAR,
    ADD COLUMN note VARCHAR;

UPDATE erp_component
SET unit = '';

ALTER TABLE erp_component
    ALTER COLUMN unit SET NOT NULL;


ALTER TABLE erp_product
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id),
    ADD COLUMN unit VARCHAR,
    ADD COLUMN note VARCHAR;

UPDATE erp_product
SET unit = '';

ALTER TABLE erp_product
    ALTER COLUMN unit SET NOT NULL;


ALTER TABLE erp_component_erp_product
    ADD COLUMN quantity INT;

UPDATE erp_component_erp_product
SET quantity = 1;

ALTER TABLE erp_component_erp_product
    ALTER COLUMN quantity SET NOT NULL;


ALTER TABLE erp_customer
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id);


ALTER TABLE erp_order
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id);


ALTER TABLE erp_order_item
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id);


ALTER TABLE erp_invoice
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id);


ALTER TABLE erp_employee
    ADD COLUMN binary_file_id UUID REFERENCES binary_file (id),
    ADD COLUMN note VARCHAR,
    DROP COLUMN assessment;
