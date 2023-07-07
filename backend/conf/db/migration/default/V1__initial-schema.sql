CREATE TYPE USER_ROLE AS ENUM ('Administrator', 'User');

CREATE TYPE MIME_TYPE AS ENUM ('ImageJpeg', 'ImagePng', 'VideoMp4');

CREATE TYPE EMAIL_DIRECTORY AS ENUM ('Inbox', 'Sent', 'Draft', 'Trash');

CREATE TYPE RELEVANCE AS ENUM ('ObviouslyRelevant', 'ObviouslyIrrelevant', 'PossiblyRelevant');

CREATE TYPE FILE_USAGE_TYPE AS ENUM ('FileSystem', 'Email');

CREATE TYPE REFERENCE_BOOK_CONTENT_TYPE AS ENUM ('TextContent', 'ImageContent', 'VideoContent');

CREATE TYPE SCORING_TYPE AS ENUM ('Cumulative', 'Summative');

CREATE TYPE QUESTION_TYPE AS ENUM ('SingleChoice', 'MultipleChoice', 'FreeText');

CREATE TYPE SALUTATION AS ENUM ('Mr', 'Mrs');

CREATE TYPE EMPLOYMENT_MODE AS ENUM ('FullTime', 'PartTime', 'Assistance', 'Student');

CREATE TYPE FAMILY_STATUS AS ENUM ('Married', 'Single', 'Divorced');

CREATE TYPE PAYMENT_STATUS AS ENUM ('Paid', 'Unpaid');

CREATE TYPE DELIVERY_STATUS AS ENUM ('InProcess', 'Completed');

CREATE TYPE QUESTIONNAIRE_TYPE AS ENUM ('Global', 'RuntimeSurvey');

CREATE TABLE user_account (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    email VARCHAR NOT NULL,
    password_hash VARCHAR NOT NULL,
    user_role USER_ROLE NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    organization VARCHAR NOT NULL,

    PRIMARY KEY (id),

    UNIQUE (email)
);

CREATE TABLE binary_file (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    filename VARCHAR NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type MIME_TYPE NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE project (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    name VARCHAR NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE scenario (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    max_duration_in_seconds INT NOT NULL,
    introduction_email_id UUID NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE scenario_project (
    project_id UUID NOT NULL,
    scenario_id UUID NOT NULL,

    PRIMARY KEY (project_id, scenario_id),

    FOREIGN KEY (project_id) REFERENCES project (id),
    FOREIGN KEY (scenario_id) REFERENCES scenario (id)
);

CREATE TABLE email (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    sender VARCHAR NOT NULL,
    cc_recipients VARCHAR[] NOT NULL,
    subject VARCHAR NOT NULL,
    directory EMAIL_DIRECTORY NOT NULL,
    received_delay INT NOT NULL,
    initially_read BOOL NOT NULL,
    relevance RELEVANCE NOT NULL,
    message VARCHAR NOT NULL,

    scenario_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id)
);

CREATE TABLE directory (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    name VARCHAR NOT NULL,

    parent_directory_id UUID,

    PRIMARY KEY (id),

    FOREIGN KEY (parent_directory_id) REFERENCES directory (id)
);

CREATE TABLE file (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    usage_type FILE_USAGE_TYPE NOT NULL,
    name VARCHAR NOT NULL,
    relevance RELEVANCE NOT NULL,
    tags VARCHAR[] NOT NULL,

    directory_id UUID,
    email_id UUID,
    binary_file_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (directory_id) REFERENCES directory (id),
    FOREIGN KEY (email_id) REFERENCES email (id),
    FOREIGN KEY (binary_file_id) REFERENCES binary_file (id),

    CHECK ((usage_type = 'Email' AND email_id IS NOT NULL AND directory_id IS NULL) OR
           (usage_type = 'FileSystem' AND email_id IS NULL AND directory_id IS NOT NULL))
);

CREATE TABLE sample_company (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    author_id UUID NOT NULL,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    tags VARCHAR[] NOT NULL,
    email_signature VARCHAR NOT NULL,

    directory_id UUID NOT NULL,
    profile_file_id UUID NOT NULL,
    logo_file_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (author_id) REFERENCES user_account (id),
    FOREIGN KEY (profile_file_id) REFERENCES file (id),
    FOREIGN KEY (logo_file_id) REFERENCES file (id)
);

CREATE TABLE reference_book (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    author_id UUID NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,

    PRIMARY KEY (id)
);

CREATE TABLE reference_book_article (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR NOT NULL,

    reference_book_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (reference_book_id) REFERENCES reference_book (id)
);

CREATE TABLE reference_book_content (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    position_x NUMERIC NOT NULL,
    position_y NUMERIC NOT NULL,
    content_type REFERENCE_BOOK_CONTENT_TYPE NOT NULL,
    text VARCHAR,
    image_id UUID,
    video_id UUID,

    reference_book_article_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (reference_book_article_id) REFERENCES reference_book_article (id),

    CHECK ((content_type = 'TextContent' AND text IS NOT NULL AND image_id IS NULL AND video_id IS NULL) OR
           (content_type = 'ImageContent' AND text IS NULL AND image_id IS NOT NULL AND video_id IS NULL) OR
           (content_type = 'VideoContent' AND text IS NULL AND image_id IS NULL AND video_id IS NOT NULL))
);

CREATE TABLE reference_book_scenario (
    reference_book_id UUID NOT NULL,
    scenario_id UUID NOT NULL,

    PRIMARY KEY (reference_book_id, scenario_id),

    FOREIGN KEY (reference_book_id) REFERENCES reference_book (id),
    FOREIGN KEY (scenario_id) REFERENCES scenario (id)
);

CREATE TABLE coding_model (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,

    scenario_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id)
);

CREATE TABLE coding_dimension (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,

    coding_model_id UUID NOT NULL,
    parent_dimension_id UUID,

    PRIMARY KEY (id),

    FOREIGN KEY (coding_model_id) REFERENCES coding_model (id),
    FOREIGN KEY (parent_dimension_id) REFERENCES coding_dimension (id)
);

CREATE TABLE coding_item (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    scoring_type SCORING_TYPE NOT NULL,

    dimension_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (dimension_id) REFERENCES coding_dimension (id)
);

CREATE TABLE coding_criterion (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    description VARCHAR NOT NULL,
    score INT NOT NULL CHECK (score >= 0 AND score <= 99),
    can_be_evaluated_automatically BOOLEAN NOT NULL,

    item_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (item_id) REFERENCES coding_item (id)
);

CREATE TABLE questionnaire (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    questionnaire_type QUESTIONNAIRE_TYPE,
    published_at TIMESTAMP WITH TIME ZONE,

    image_binary_file_id UUID,

    PRIMARY KEY (id),

    FOREIGN KEY (image_binary_file_id) REFERENCES binary_file (id)
);

CREATE TABLE questionnaire_project (
    questionnaire_id UUID NOT NULL,
    project_id UUID NOT NULL,

    PRIMARY KEY (questionnaire_id, project_id),

    FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id),
    FOREIGN KEY (project_id) REFERENCES project (id)
);

CREATE TABLE questionnaire_question (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR NOT NULL,
    text VARCHAR NOT NULL,
    question_type QUESTION_TYPE NOT NULL,
    is_answer_mandatory BOOL NOT NULL,
    is_additional_text_answer_allowed BOOL NOT NULL,

    questionnaire_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id)
);

CREATE TABLE questionnaire_answer (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    text VARCHAR NOT NULL,

    question_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (question_id) REFERENCES questionnaire_question (id)
);

CREATE TABLE survey (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,

    project_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (project_id) REFERENCES project (id)
);

CREATE TABLE erp_supplier (
    id INT NOT NULL,
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

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id)
);

CREATE TABLE erp_component (
    id INT NOT NULL,
    name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    purchasing_price_in_cents INT NOT NULL,
    margin NUMERIC NOT NULL,

    sample_company_id UUID NOT NULL,
    supplier_id INT NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id),
    FOREIGN KEY (supplier_id) REFERENCES erp_supplier (id)
);

CREATE TABLE erp_product (
    id INT NOT NULL,
    name VARCHAR NOT NULL,
    net_price_in_cents INT NOT NULL,
    tax_rate NUMERIC NOT NULL,

    sample_company_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id)
);

CREATE TABLE erp_component_erp_product (
    component_id INT NOT NULL,
    product_id INT NOT NULL,

    PRIMARY KEY (component_id, product_id),

    FOREIGN KEY (component_id) REFERENCES erp_component (id),
    FOREIGN KEY (product_id) REFERENCES erp_product (id)
);

CREATE TABLE erp_customer (
    id INT NOT NULL,
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

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id)
);

CREATE TABLE erp_employee (
    id INT NOT NULL,
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

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id)
);

CREATE TABLE erp_order (
    id INT NOT NULL,
    cashback_in_cents INT,
    discount_in_cents INT,
    delivery_charge_in_cents INT NOT NULL,
    delivery_status DELIVERY_STATUS NOT NULL,
    delivery_date TIMESTAMP WITH TIME ZONE NOT NULL,
    note VARCHAR,

    sample_company_id UUID NOT NULL,
    customer_id INT NOT NULL,
    employee_id INT NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id),
    FOREIGN KEY (customer_id) REFERENCES erp_customer (id),
    FOREIGN KEY (employee_id) REFERENCES erp_employee (id)
);

CREATE TABLE erp_order_item (
    id INT NOT NULL,
    quantity INT NOT NULL,

    sample_company_id UUID NOT NULL,
    order_id INT NOT NULL,
    product_id INT NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id),
    FOREIGN KEY (order_id) REFERENCES erp_order (id),
    FOREIGN KEY (product_id) REFERENCES erp_product (id)
);

CREATE TABLE erp_invoice (
    id INT NOT NULL,
    invoice_date TIMESTAMP WITH TIME ZONE NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    payment_terms VARCHAR NOT NULL,
    amount_paid_in_cents INT,
    payment_status PAYMENT_STATUS NOT NULL,
    reminder_fee_in_cents INT,
    default_charges_in_cents INT,
    note VARCHAR,

    sample_company_id UUID NOT NULL,
    order_id INT NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (sample_company_id) REFERENCES sample_company (id),
    FOREIGN KEY (order_id) REFERENCES erp_order (id)
);
