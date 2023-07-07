ALTER TABLE erp_product
    ADD COLUMN pack_size INT,
    ADD COLUMN available_stock INT,
    ADD COLUMN stock_cost_per_unit_in_cents INT,
    ADD COLUMN stock_cost_total_in_cents INT;

UPDATE erp_product
SET pack_size = 0,
    available_stock = 0,
    stock_cost_per_unit_in_cents = 0,
    stock_cost_total_in_cents = 0;

ALTER TABLE erp_product
    ALTER COLUMN pack_size SET NOT NULL,
    ALTER COLUMN available_stock SET NOT NULL,
    ALTER COLUMN stock_cost_per_unit_in_cents SET NOT NULL,
    ALTER COLUMN stock_cost_total_in_cents SET NOT NULL;
