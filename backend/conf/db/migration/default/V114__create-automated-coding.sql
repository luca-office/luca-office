CREATE TYPE AUTOMATED_CODING_ITEM_RULE AS ENUM ('FeatureUsage', 'ToolUsage', 'InputValue', 'DocumentView', 'RScript');

ALTER TABLE coding_item
    ADD COLUMN is_automated BOOLEAN,
    ADD COLUMN rule AUTOMATED_CODING_ITEM_RULE;

UPDATE coding_item
SET is_automated = FALSE;

ALTER TABLE coding_item
    ALTER COLUMN is_automated SET NOT NULL;

CREATE TYPE OFFICE_TOOL AS ENUM ('Calculator', 'EmailClient', 'Erp', 'FileBrowser', 'ImageViewer', 'Notes', 'PdfViewer', 'ReferenceBookViewer', 'SpreadsheetEditor', 'TextEditor', 'VideoPlayer');

CREATE TABLE scenario_coding_automated_criterion (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    score INT NOT NULL CHECK (score >= 0 AND score <= 99),

    office_tool OFFICE_TOOL,
    value VARCHAR,
    spreadsheet_row_index INT,
    spreadsheet_column_index INT,

    item_id UUID NOT NULL,
    email_id UUID,
    file_id UUID,
    reference_book_article_id UUID,
    sample_company_id UUID,
    erp_component_id INT,
    erp_component_erp_product_id INT,
    erp_customer_id INT,
    erp_employee_id INT,
    erp_invoice_id INT,
    erp_order_id INT,
    erp_order_item_id INT,
    erp_product_id INT,
    erp_supplier_id INT,

    PRIMARY KEY (id),

    FOREIGN KEY (item_id) REFERENCES coding_item (id),
    FOREIGN KEY (email_id) REFERENCES email (id),
    FOREIGN KEY (file_id) REFERENCES file (id),
    FOREIGN KEY (reference_book_article_id) REFERENCES reference_book_article (id),
    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id),
    FOREIGN KEY (erp_component_id, sample_company_id) REFERENCES erp_component (id, sample_company_id),
    FOREIGN KEY (erp_component_erp_product_id, sample_company_id) REFERENCES erp_component_erp_product (id, sample_company_id),
    FOREIGN KEY (erp_customer_id, sample_company_id) REFERENCES erp_customer (id, sample_company_id),
    FOREIGN KEY (erp_employee_id, sample_company_id) REFERENCES erp_employee (id, sample_company_id),
    FOREIGN KEY (erp_invoice_id, sample_company_id) REFERENCES erp_invoice (id, sample_company_id),
    FOREIGN KEY (erp_order_id, sample_company_id) REFERENCES erp_order (id, sample_company_id),
    FOREIGN KEY (erp_order_item_id, sample_company_id) REFERENCES erp_order_item (id, sample_company_id),
    FOREIGN KEY (erp_product_id, sample_company_id) REFERENCES erp_product (id, sample_company_id),
    FOREIGN KEY (erp_supplier_id, sample_company_id) REFERENCES erp_supplier (id, sample_company_id)
);
