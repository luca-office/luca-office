DROP TABLE erp_component CASCADE;
DROP TABLE erp_component_erp_product CASCADE;
DROP TABLE erp_customer CASCADE;
DROP TABLE erp_employee CASCADE;
DROP TABLE erp_invoice CASCADE;
DROP TABLE erp_order CASCADE;
DROP TABLE erp_order_item CASCADE;
DROP TABLE erp_product CASCADE;
DROP TABLE erp_supplier CASCADE;

CREATE TABLE erp_supplier (
    id UUID NOT NULL,
    identifier VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    company VARCHAR NOT NULL,
    address_line VARCHAR NOT NULL,
    postal_code VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    note VARCHAR,

    sample_company_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE
);

CREATE TABLE erp_component (
    id UUID NOT NULL,
    identifier VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    purchasing_price_in_cents INT NOT NULL,
    margin NUMERIC NOT NULL,

    sample_company_id UUID NOT NULL,
    supplier_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES erp_supplier (id)
);

CREATE TABLE erp_product (
    id UUID NOT NULL,
    identifier VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    net_price_in_cents INT NOT NULL,
    tax_rate NUMERIC NOT NULL,

    sample_company_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE
);

CREATE TABLE erp_component_erp_product (
    component_id UUID NOT NULL,
    product_id UUID NOT NULL,

    PRIMARY KEY (component_id, product_id),

    FOREIGN KEY (component_id) REFERENCES erp_component (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES erp_product (id) ON DELETE CASCADE
);

CREATE TABLE erp_customer (
    id UUID NOT NULL,
    identifier VARCHAR NOT NULL,
    salutation SALUTATION NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    company VARCHAR,
    address_line VARCHAR NOT NULL,
    postal_code VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    email VARCHAR,
    phone VARCHAR,
    note VARCHAR,

    sample_company_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE
);

CREATE TABLE erp_employee (
    id UUID NOT NULL,
    identifier VARCHAR NOT NULL,
    salutation SALUTATION NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    address_line VARCHAR NOT NULL,
    postal_code VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    email VARCHAR,
    phone VARCHAR,
    department VARCHAR NOT NULL,
    job_title VARCHAR NOT NULL,
    employment_mode EMPLOYMENT_MODE NOT NULL,
    employed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    employment_ends_at TIMESTAMP WITH TIME ZONE,
    site VARCHAR NOT NULL,
    graduation VARCHAR,
    further_education VARCHAR[] NOT NULL,
    tax_class VARCHAR NOT NULL,
    family_status FAMILY_STATUS NOT NULL,
    child_count INT,
    assessment VARCHAR,

    sample_company_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE
);

CREATE TABLE erp_order (
    id UUID NOT NULL,
    identifier VARCHAR NOT NULL,
    cashback_in_cents INT,
    discount_in_cents INT,
    delivery_charge_in_cents INT NOT NULL,
    delivery_status DELIVERY_STATUS NOT NULL,
    delivery_date TIMESTAMP WITH TIME ZONE NOT NULL,
    note VARCHAR,

    sample_company_id UUID NOT NULL,
    customer_id UUID NOT NULL,
    employee_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES erp_customer (id),
    FOREIGN KEY (employee_id) REFERENCES erp_employee (id)
);

CREATE TABLE erp_order_item (
    id UUID NOT NULL,
    identifier VARCHAR NOT NULL,
    quantity INT NOT NULL,

    sample_company_id UUID NOT NULL,
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES erp_order (id),
    FOREIGN KEY (product_id) REFERENCES erp_product (id)
);

CREATE TABLE erp_invoice (
    id UUID NOT NULL,
    identifier VARCHAR NOT NULL,
    invoice_date TIMESTAMP WITH TIME ZONE NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    payment_terms VARCHAR NOT NULL,
    amount_paid_in_cents INT,
    payment_status PAYMENT_STATUS NOT NULL,
    reminder_fee_in_cents INT,
    default_charges_in_cents INT,
    note VARCHAR,

    sample_company_id UUID NOT NULL,
    order_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES erp_order (id)
);
