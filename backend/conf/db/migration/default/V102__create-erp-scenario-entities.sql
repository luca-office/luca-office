CREATE TABLE scenario_erp_component (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    component_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, component_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (component_id, sample_company_id) REFERENCES erp_component (id, sample_company_id)
);

CREATE TABLE scenario_erp_component_erp_product (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    component_id INT NOT NULL,
    product_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, component_id, product_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (component_id, product_id, sample_company_id) REFERENCES erp_component_erp_product (component_id, product_id, sample_company_id)
);

CREATE TABLE scenario_erp_customer (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    customer_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, customer_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (customer_id, sample_company_id) REFERENCES erp_customer (id, sample_company_id)
);

CREATE TABLE scenario_erp_employee (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    employee_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, employee_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (employee_id, sample_company_id) REFERENCES erp_employee (id, sample_company_id)
);

CREATE TABLE scenario_erp_invoice (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    invoice_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, invoice_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (invoice_id, sample_company_id) REFERENCES erp_invoice (id, sample_company_id)
);

CREATE TABLE scenario_erp_order (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    order_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, order_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (order_id, sample_company_id) REFERENCES erp_order (id, sample_company_id)
);

CREATE TABLE scenario_erp_order_item (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    order_item_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, order_item_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (order_item_id, sample_company_id) REFERENCES erp_order_item (id, sample_company_id)
);

CREATE TABLE scenario_erp_product (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    product_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, product_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (product_id, sample_company_id) REFERENCES erp_product (id, sample_company_id)
);

CREATE TABLE scenario_erp_supplier (
    scenario_id UUID NOT NULL,
    sample_company_id UUID NOT NULL,
    supplier_id INT NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, supplier_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (supplier_id, sample_company_id) REFERENCES erp_supplier (id, sample_company_id)
);
