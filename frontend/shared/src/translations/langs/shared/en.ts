/* eslint-disable max-lines */

import {LucaI18nLangShared} from "../../luca-i18n-lang"

// syntax: <module/area>__<function>__component, words separated by _

export const translations: LucaI18nLangShared = {
  // Buttons
  ok: "Ok",
  cancel: "Cancel",
  copy: "Copy",
  accept_button: "Accept",
  close_button: "Close",
  continue_button: "Continue",
  create_button: "Create",
  update_button: "Update",
  publish_button: "Publish",
  copy_button: "Create copy",
  cancel_button: "Cancel",
  login_button: "Login",
  signup_button: "Sign up",
  logout_button: "Logout",
  confirm_button: "Confirm",
  edit_button: "Edit",
  invite_button: "Invite",
  show_button: "Show",
  delete_button: "Delete",
  archive_button: "Archive",
  back_button: "Back",
  add_button: "Add",
  remove_button: "Remove",

  // Common
  common_to: "to",
  common_to_masculinum: "to",
  common_of: "of",
  common__x_of_y: "{{x}} of {{y}}",
  common_number: "{{number, number}}",
  common_number_en: "{{number, number_en}}",

  // Percentage
  percentage: "{{percentage, number}}%",

  // Password
  password__reset: "Forgot password?",

  // Scenario Settings
  scenario_setting__header_label: "Scenario-specific settings",
  scenario_setting__relevance_label: "Relevance",
  scenario_setting__intervention_label: "Intervention",
  scenario_setting__intervention_placeholder: "No intervention available",
  scenario_setting__intervention_count_single: "{{interventionsCount}} Intervention available",
  scenario_setting__intervention_count_multiple: "{{interventionsCount} Interventions available",

  // Clipboard
  clipboard__copy: "Copy to clipboard",
  clipboard__copy_toast: "Text copied to the clipboard.",
  clipboard__copy_all: "Copy all data to the clipboard.",

  // Tests
  placeholder: "Placeholder",

  // WS
  ws__reconnect_error: "There is a problem with the connection.",

  // PDF Viewer
  pdf_viewer__error: "The PDF could not be loaded",
  pdf_viewer__no_data: "No PDF has been found",

  // Events
  events__title: "Event",

  // Reference Books
  reference_book__title_placeholder: "No chapter or article selected",
  reference_book__content_placeholder: "Please select a chapter or article on the left side.",
  reference_books__placeholder: "No content",
  reference_books__text: "Text block",
  reference_books__placeholder_text: "Text block without content",

  // Files and Directories
  files_and_directories__tree__no_content: "No content available",
  files_and_directories__detail__empty__title: "No selection made",
  files_and_directories__detail__empty__heading: "No selection made",
  files_and_directories__detail__empty__text: "Please select a folder or file on the left side.",
  files_and_directories__email__upload__title: "Select attachment from folder and files",
  files_and_directories__email__upload__text: "Add this file as an attachment",
  files_and_directories__email__upload__tooltip: "Add a variety of files as attachments to the emails.",

  // Salutation
  mr: "Mr.",
  mrs: "Mrs.",
  non_binary: "Div.",

  // Spreadsheet
  spreadsheet_editor__save_button: "Save",
  spreadsheet_editor__error_alert_text:
    "Please remember to enter numbers in English format (e.g. 1.75.\n" +
    "Formula names must also be entered in English. Examples:\n",

  // Questionnaire
  questionnaire__single_choice: "Single choice",
  questionnaire__multiple_choice: "Multiple choice",
  questionnaire__free_text: "Free text question",
  questionnaire__free_text_option: "Free text answer",
  questionnaire__score: "Score",
  questionnaire__single_choice_title: "Please enter only one answer:",
  questionnaire__multiple_choice_title: "Please enter at least one answer:",
  questionnaire__free_text_title: "Free text answer",
  questionnaire__additional_free_text_answer: "Additional free text answer",
  questionnaire__additional_free_text_answer_disabled: "Free text option only available without rating",
  questionnaire__additional_free_text_answer_already_present: "Free text answer already exists",
  questionnaire__completed_answers: "{{finishedCount}} from {{totalCount}} questions answered",

  // ERP
  erp__title: "ERP",
  erp__title_full: "Enterprise-Resource-Planning",
  erp__navigation_label_user_management: "User management",
  erp__navigation_label_office: "Office",
  erp__navigation_label_phone_integration: "Phone integration",
  erp__navigation_label_appointment_calendar: "Appointment calendar",
  erp__navigation_label_occupancy_of_space: "Occupancy of space",
  erp__navigation_label_application_spanning_components: "Application spanning components",
  erp__navigation_label_audit_management: "Audit management",
  erp__navigation_label_e_document: "eDocument",
  erp__navigation_label_logistics: "Logistics",
  erp__navigation_label_materials_administration: "Materials administration",
  erp__navigation_label_suppliers: "Suppliers",
  erp__navigation_label_stock_take: "Stock take",
  erp__navigation_label_stock: "Stock",
  erp__navigation_label_external_trade: "Foreign trade/customs",
  erp__navigation_label_sales: "Sales",
  erp__navigation_label_core_data: "Core data",
  erp__navigation_label_components: "Components",
  erp__navigation_label_components_for_products: "Component assignments",
  erp__navigation_label_customers: "Customers",
  erp__navigation_label_reseller: "Reseller",
  erp__navigation_label_products: "Products",
  erp__navigation_label_shipping: "Shipping",
  erp__navigation_label_billing: "Billing",
  erp__navigation_label_orders: "Orders",
  erp__navigation_label_order_items: "Order items",
  erp__navigation_label_invoices: "Invoices",
  erp__navigation_label_production: "Production",
  erp__navigation_label_sales_planning: "Sales planning",
  erp__navigation_label_production_planning: "Production planning",
  erp__navigation_label_requirements_planning: "Requirements planning",
  erp__navigation_label_product_cost_planning: "Product cost planning",
  erp__navigation_label_customer_service: "Customer service",
  erp__navigation_label_quality_management: "Quality management",
  erp__navigation_label_logistics_controlling: "Logistics-controlling",
  erp__navigation_label_core_functions: "Core functions",
  erp__navigation_label_accounting: "Accounting",
  erp__navigation_label_finance: "Finance",
  erp__navigation_label_controlling: "Controlling",
  erp__navigation_label_strategic_enterprise_management: "Strategic Enterprise Management",
  erp__navigation_label_property_management: "Property management",
  erp__navigation_label_staff: "Staff",
  erp__navigation_label_staff_table: "Staff table",
  erp__navigation_label_staff_time_management: "Personnel time management",
  erp__navigation_label_payroll: "Payroll",
  erp__navigation_label_training_needs_management: "Trainings needs management",
  erp__navigation_label_information_system: "Information system",
  erp__navigation_label_info_systems: "Info systems",
  erp__navigation_label_financial_analytics: "Financial analytics",
  erp__navigation_label_product_lifecycle_analytics: "Product Lifecycle Analytics",
  erp__navigation_label_tools: "Tools",
  erp__navigation_label_administration: "Administration",
  erp__navigation_label_web_client_ui_framework: "WebClient-UI-Framework",
  erp__navigation_label_enterprise_search: "Enterprise Search",
  erp__navigation_import_excel_file: "Import Data",
  erp__navigation_export_excel_file: "Export Data (Download)",
  erp__table_search_placeholder: "Search this table...",

  // ERP-Table
  erp__employment_mode_label_assistance: "Assistance",
  erp__employment_mode_label_full_time: "Full time",
  erp__employment_mode_label_part_time: "Part time",
  erp__employment_mode_label_student: "Student",
  erp__family_status_label_divorced: "Divorced",
  erp__family_status_label_married: "Married",
  erp__family_status_label_single: "Single",
  erp__payment_status_label_paid: "Paid",
  erp__payment_status_label_unpaid: "Unpaid",
  erp__delivery_status_label_completed: "Completed",
  erp__delivery_status_label_in_process: "In process",
  erp__salutation_label_mr: "Mr",
  erp__salutation_label_mrs: "Mrs",
  erp__salutation_label_non_binary: "Div.",
  erp__no_table: "No table",
  erp__no_table_selected: "No table selected",
  erp__no_table_select_hint: "Please select a table",

  erp__table_label_id: "ID",
  erp__table_label_component_id: "Component-ID",
  erp__table_label_sample_company_id: "Company-ID",
  erp__table_label_salutation: "Salutation",
  erp__table_label_first_name: "First name",
  erp__table_label_last_name: "Last name",
  erp__table_label_address_line: "Address",
  erp__table_label_postal_code: "Postal code",
  erp__table_label_city: "City",
  erp__table_label_country: "Country",
  erp__table_label_email: "Email",
  erp__table_label_phone: "Phone",
  erp__table_label_note: "Notes",
  erp__table_label_order_id: "Order-ID.",
  erp__table_label_order_item_id: "Order-item-ID",
  erp__table_label_name: "Name",
  erp__table_label_company: "Company",
  erp__table_label_employee_id: "Employee-ID",
  erp__table_label_invoice_id: "Invoice-ID",
  erp__table_label_product_id: "Product-ID",
  erp__table_label_order_product_id: "Order-product-ID",
  erp__table_label_supplier_id: "Supplier-ID",
  erp__table_label_total_net: "Total net",
  erp__table_label_unit: "Unit",
  erp__table_label_binary_file_id: "File",
  erp__table_label_stock_cost_per_unit: "Cost per unit",
  erp__table_label_stock_cost_total: "Stock cost total",
  erp__table_label_pack_size: "Pack size",
  erp__table_label_available_stock: "Available stock",
  erp__table_label_quantity: "Quantity",
  erp__table_label_quantity_per_product: "Quantity per product",
  erp__table_label_value_string: "Text",
  erp__table_label_value_number: "Number",
  erp__table_label_value_currency: "Euro",
  erp__table_label_value_binary: "File",
  erp__table_label_value_email: "Email",
  erp__table_label_value_salutation: "Salutation",
  erp__table_label_value_date: "Date",
  erp__table_label_value_employment: "Employement",
  erp__table_label_value_family_status: "Family status",
  erp__table_label_value_payment_status: "Payment status",
  erp__table_label_value_delivery_status: "Delivery status",
  erp__table_label_value_postal_code: "Postal code",
  erp__table_label_value_phone: "Phone",
  erp__table_label_unknown: "Unknown type",

  erp__show_selected_only: "Show selected only",
  erp__no_cell_selected: "No cell selected",
  erp__no_data: "No data available",
  erp__no_data_create_or_import: "Create data sets separately or import the desired Excel tables",
  erp__table_placeholder: "This table is only a placeholder and cannot be edited.",
  erp__table_locked: "This database table is locked",

  erp__table_component_label_category: "Category",
  erp__table_component_label_purchasing_price: "Purchasing price",
  erp__table_component_label_margin: "Margin",

  erp__table_employee_label_department: "Department",
  erp__table_employee_label_job_title: "Job title",
  erp__table_employee_label_employment_mode: "Employment mode",
  erp__table_employee_label_employed_at: "Employed at",
  erp__table_employee_label_employment_ends_at: "Contract end date",
  erp__table_employee_label_site: "Operation site",
  erp__table_employee_label_graduation: "Graduation",
  erp__table_employee_label_further_education: "Further education",
  erp__table_employee_label_tax_class: "Tax class",
  erp__table_employee_label_family_status: "Family status",
  erp__table_employee_label_child_count: "Number of children",
  erp__table_employee_label_assessment: "Assessment",

  erp__table_invoice_label_invoice_date: "Invoice date",
  erp__table_invoice_label_due_date: "Due date",
  erp__table_invoice_label_payment_terms: "Payment terms",
  erp__table_invoice_label_amount_paid: "Paid",
  erp__table_invoice_label_payment_status: "Payment status",
  erp__table_invoice_label_reminder_fee: "Reminder fee",
  erp__table_invoice_label_default_charges: "default interest",
  erp__table_invoice_label_total_gross: "Total gross",
  erp__table_invoice_label_tax_amount: "Tax amount",

  erp__table_order_label_cashback: "Discount",
  erp__table_order_label_discount: "Rebate",
  erp__table_order_label_delivery_charge: "Delivery charge",
  erp__table_order_label_delivery_status: "Delivery status",
  erp__table_order_label_delivery_date: "Delivery date",
  erp__table_order_label_customer_id: "Customer ID:",

  erp__table_product_label_net_price: "Base price net",
  erp__table_product_label_tax_rate: "VAT rate",

  erp__table_cell_content: "Cell content",

  erp__table_select_all: "Select all",
  erp__table_deselect_all: "Deselect all",

  erp__table_primary_key: "Primary key",
  erp__table_primary_key_tooltip_text:
    "The primary key is used to uniquely identify a data set. This is generated automatically when a data record is created.",
  erp__table_foreign_key: "Foreign key",
  erp__table_foreign_key_tooltip_text: "The foreign key is used to link a data set of another table.",
  erp__table_attachment_available: "Attachment available",
  erp__table_attachment_not_available: "No attachment available",

  // ERP-Navigation
  erp__navigation_label_shipment: "Shipments",
  erp__navigation_label_company: "Companies",

  erp__navigation_label_supplier: "Suppliers",
  erp__navigation_label_component: "Components",
  erp__navigation_label_employee: "Employees",
  erp__navigation_label_product: "Products",
  erp__navigation_label_order_item: "Item",
  erp__navigation_label_order: "Orders",
  erp__navigation_label_customer: "Customers",
  erp__navigation_label_invoice: "Invoices",

  // ERP-Dataset
  erp_dataset__general: "Data set",
  erp_dataset__criterion_title: "ERP (Data set)",
  erp_dataset__open: "Open data set",
  erp_dataset__edit: "Edit data set",
  erp_dataset__delete: "Delete data set",
  erp_dataset__primary_key: "Primary key",
  erp_dataset__foreign_key: "Foreign key",
  erp_dataset__navigate_to_dataset: "to data set",
  erp_dataset__copy_all: "Copy master data to clipboard",
  erp_dataset__file_upload_title: "Upload attachment",
  erp_dataset__primary_key_placeholder: "Will be generated automatically...",
  erp_dataset__create: "Create new data set",
  erp_dataset__required_info: "Mandatory information",

  // ERP
  erp__cell_header_Label: "Cell content",
  erp__cell_short: "Cell(s)",
  erp__cell_add_button: "Create row (data set)",
  erp__navigation_hide_placeholders: "Hide placeholder",
  erp__navigation_label: "ERP",
  erp__cell_refresh_button: "Update all",
  erp__dialog_delete_dataset_title: "Delete data set",
  erp__dialog_delete_dataset_description: "Do you really want to delete the data set? This operation cannot be undone.",

  // ERP Excel Import
  erp_excel_import__modal_title: "Import Excel file",
  erp_excel_import__modal_description:
    "You can also create the ERP using Excel and import it here. To do this, download the template and then use the upload window to import the tables in bundles.",
  erp_excel_import__modal_warning:
    "ATTENTION! Keep in mind that when importing an Excel template, all previous data of the ERP will be lost.",
  erp_excel_import__modal_download: "Download Excel template",
  erp_excel_import__modal_upload_title: "Upload",
  erp_excel_import__modal_upload_description: "Upload the revised Excel template here.",
  erp_excel_import__modal_upload_description_hint: "This can be added after a review.",
  erp_excel_import__modal_upload_error: "The uploaded file is corrupted",
  erp_excel_import__modal_upload_check: "File is checked...",
  erp_excel_import__modal_file_chip_error: "File corrupted",

  // ERP Accordion
  erp_accordion__component_label: "Component-ID",
  erp_accordion__component_additional_label: "{{count}} Components",
  erp_accordion__customer_label: "Customer-ID",
  erp_accordion__customer_additional_label: "{{count}} Customer",
  erp_accordion__employee_label: "Employee-ID",
  erp_accordion__employee_additional_label: "{{count}} Employee",
  erp_accordion__invoice_label: "Invoice-ID",
  erp_accordion__invoice_additional_label: "{{count}} Invoices",
  erp_accordion__order_label: "Order-ID",
  erp_accordion__order_additional_label: "{{count}} Orders",
  erp_accordion__order_item_label: "Item-ID",
  erp_accordion__order_item_additional_label: "{{count}} Item",
  erp_accordion__product_label: "Product-ID",
  erp_accordion__product_additional_label: "{{count}} Products",
  erp_accordion__supplier_label: "Supplier-ID",
  erp_accordion__supplier_additional_label: "{{count}} Suppliers",
  erp_accordion__copy_all: "Copy master data and foreign keys to clipboard",
  erp_accordion__component_for_product_label_simple: "Component for product",
  erp_accordion__component_for_product_label: "Component-ID {{componentId}} for Product-ID. {{productId}}",
  erp_accordion__component_for_product_additional_label: "{{count}} Component for product",

  // Binary Input
  binary_input__placeholder_label: "not available",
  binary_input__upload_title: "Upload file",

  // Coding Criterion
  coding_models__automated_item_input_value_preview_spreadsheet_title: "Document (Spreadsheet)",
  coding_models__automated_item_input_value_preview_spreadsheet_title_check_file: "Check for content",
  coding_models__coding_item_deletion_fk_error: "The item is already used in a rating and cannot be deleted",
  coding_models__coding_dimension_deletion_fk_error: "The dimension is already used in a rating and cannot be deleted",
  coding_models__coding_model_deletion_fk_error:
    "The coding instruction is already used in a rating and cannot be deleted",

  // Chat
  chat__title: "Messages",
  chat__unknown_title: "Unknown",
  chat__group_title: "Group message ({{count}})",
  chat__supervisor_back: "To participant view",
  chat__supervisor: "Supervisor",
  chat__participant: "Participant",
  chat__instruction: "Send message to selected participants ({{count}}):",
  chat__instruction_reporting_attendee: "Send message to {{name}}",
  chat__supervisor_unapproachable:
    "The test administration may not be available at this time because the survey is being conducted asynchronously.",
  chat__supervisor_unapproachable_text:
    "Please keep in mind that the project manager may not receive your message until after the project has been processed and may not be able to respond to you directly.",
  chat__error_notification: "The chat is currently not working. Please try again later",

  // E-Mail-Message Template
  email_message_template__template_label_salutation: "{Salutation}",
  email_message_template__template_label_first_name: "{First name}",
  email_message_template__template_label_last_name: "{Last name}",
  email_message_template__template_label_formal_salutation: "{Formal salutation}",
  email_message_template__tooltip_salutation: "„Mr/Mrs/*“",
  email_message_template__tooltip_first_name: "„First name of participant“",
  email_message_template__tooltip_last_name: "„Last name of participant“",
  email_message_template__tooltip_formal_salutation: "„Dear“",
  email_message_template__formal_greeting_mr: "Dear",
  email_message_template__formal_greeting_mrs: "Dear",
  email_message_template__formal_greeting_non_binary: "Dear",

  // Error
  error_entity_in_use: "Entity is already used and cannot be deleted",
  error_entity_in_use_scenario_questionnaire_intervention:
    "Interventions are assigned to the event, therefore it could not be deleted",
  error_reset_password_token: "The password reset link you used is incorrect.",
  error_reset_password_token_title: "Error resetting password"
}