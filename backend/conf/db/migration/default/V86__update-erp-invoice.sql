ALTER TABLE erp_invoice
    ADD COLUMN total_net_in_cents INT,
    ADD COLUMN total_gross_in_cents INT,
    ADD COLUMN tax_amount_in_cents INT;

UPDATE erp_invoice
SET total_net_in_cents = 0,
    total_gross_in_cents = 0,
    tax_amount_in_cents = 0;

ALTER TABLE erp_invoice
    ALTER COLUMN total_net_in_cents SET NOT NULL,
    ALTER COLUMN total_gross_in_cents SET NOT NULL,
    ALTER COLUMN tax_amount_in_cents SET NOT NULL;
