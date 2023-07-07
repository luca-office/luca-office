ALTER TABLE erp_order_item
    ADD COLUMN total_net_in_cents INT;

UPDATE erp_order_item
SET total_net_in_cents = 0;

ALTER TABLE erp_order_item
    ALTER COLUMN total_net_in_cents SET NOT NULL;
