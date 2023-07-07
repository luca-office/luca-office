/* eslint-disable max-lines */
// Do not use nested keys to provide full type safety for
// translation keys!

// syntax: <module/area>__<function>__component, words separated by _

export const translations = {
  // Buttons
  ok: "Ok",
  cancel: "Abbrechen",
  copy: "Kopieren",
  accept_button: "Verstanden",
  close_button: "Schließen",
  continue_button: "Weiter",
  create_button: "Anlegen",
  update_button: "Aktualisieren",
  publish_button: "Veröffentlichen",
  copy_button: "Kopie erstellen",
  cancel_button: "Abbrechen",
  login_button: "Anmelden",
  signup_button: "Registrieren",
  logout_button: "Abmelden",
  confirm_button: "Anwenden",
  edit_button: "Bearbeiten",
  invite_button: "Einladen",
  show_button: "Anzeigen",
  delete_button: "Löschen",
  archive_button: "Archivieren",
  back_button: "Zurück",
  add_button: "Hinzufügen",
  remove_button: "Entfernen",

  // Common
  common_to: "Zur",
  common_to_masculinum: "Zum",
  common_of: "von",
  common__x_of_y: "{{x}} von {{y}}",
  common_number: "{{number, number}}",
  common_number_en: "{{number, number_en}}",

  // Percentage
  percentage: "{{percentage, number}}%",

  // Password
  password__reset: "Passwort vergessen?",

  // Scenario Settings
  scenario_setting__header_label: "Szenariospezifische Einstellungen",
  scenario_setting__relevance_label: "Relevanz",
  scenario_setting__intervention_label: "Intervention",
  scenario_setting__intervention_placeholder: "Keine Intervention vorhanden",
  scenario_setting__intervention_count_single: "{{interventionsCount}} Intervention vorhanden",
  scenario_setting__intervention_count_multiple: "{{interventionsCount} Interventionen vorhanden",

  // Clipboard
  clipboard__copy: "in Zwischenablage kopieren",
  clipboard__copy_toast: "Text in die Zwischenablage kopiert.",
  clipboard__copy_all: "Alle Daten in die Zwischenablage kopieren",

  // Tests
  placeholder: "Placeholder",

  // WS
  ws__reconnect_error: "Es besteht ein Problem mit der Verbindung.",

  // PDF Viewer
  pdf_viewer__error: "Die PDF konnte nicht geladen werden",
  pdf_viewer__no_data: "Es wurde keine PDF gefunden",

  // Events
  events__title: "Ereignis",

  // Reference Books
  reference_book__title_placeholder: "Kein Kapitel oder Artikel ausgewählt",
  reference_book__content_placeholder: "Bitte wählen Sie ein Kapitel oder Artikel auf der linken Seite aus.",
  reference_books__placeholder: "Kein Inhalt",
  reference_books__text: "Textblock",
  reference_books__placeholder_text: "Textblock ohne Inhalt",

  // Files and Directories
  files_and_directories__tree__no_content: "Kein Inhalt vorhanden",
  files_and_directories__detail__empty__title: "Keine Auswahl getroffen",
  files_and_directories__detail__empty__heading: "Keine Auswahl getroffen",
  files_and_directories__detail__empty__text: "Bitte wählen Sie einen Ordner oder eine Datei auf der linken Seite aus.",
  files_and_directories__email__upload__title: "Anhang aus Ordner und Dateien wählen",
  files_and_directories__email__upload__text: "Diese Datei als Anhang hinzufügen",
  files_and_directories__email__upload__tooltip: "Fügen Sie den E-Mails verschiedenste Dateien als Anhänge hinzu.",

  // Salutation
  mr: "Herr",
  mrs: "Frau",
  non_binary: "Divers",

  // Spreadsheet
  spreadsheet_editor__save_button: "Speichern",
  spreadsheet_editor__error_alert_text:
    "Bitte bedenken Sie, Zahlen im englischen Format einzugeben (Punkt anstatt Komma, z. B. 1.75 anstatt 1,75).\n" +
    "Auch Formelnamen müssen auf Englisch eingegeben werden. Beispiele:\n",

  // Questionnaire
  questionnaire__single_choice: "Single Choice",
  questionnaire__multiple_choice: "Multiple Choice",
  questionnaire__free_text: "Freitextfrage",
  questionnaire__free_text_option: "Freitextantwort",
  questionnaire__score: "Punktzahl",
  questionnaire__single_choice_title: "Bitte nur eine Antwort angeben:",
  questionnaire__multiple_choice_title: "Bitte mindestens eine Antwort angeben:",
  questionnaire__free_text_title: "Freitextantwort",
  questionnaire__additional_free_text_answer: "Zusätzliche Freitextantwort",
  questionnaire__additional_free_text_answer_disabled: "Freitextoption nur ohne Bewertung verfügbar",
  questionnaire__additional_free_text_answer_already_present: "Freitextantwort bereits vorhanden",
  questionnaire__completed_answers: "{{finishedCount}} von {{totalCount}} Fragen beantwortet",

  // ERP
  erp__title: "ERP",
  erp__title_full: "Enterprise-Resource-Planning",
  erp__navigation_label_user_management: "Benutzerverwaltung",
  erp__navigation_label_office: "Büro",
  erp__navigation_label_phone_integration: "Telefonintegration",
  erp__navigation_label_appointment_calendar: "Terminkalender",
  erp__navigation_label_occupancy_of_space: "Raumbelegung",
  erp__navigation_label_application_spanning_components: "Anwendungsübergreifende Komponenten",
  erp__navigation_label_audit_management: "Auditmanagement",
  erp__navigation_label_e_document: "eDocument",
  erp__navigation_label_logistics: "Logistik",
  erp__navigation_label_materials_administration: "Materialwirtschaft",
  erp__navigation_label_suppliers: "Lieferanten",
  erp__navigation_label_stock_take: "Inventur",
  erp__navigation_label_stock: "Lager",
  erp__navigation_label_external_trade: "Außenhandel/Zoll",
  erp__navigation_label_sales: "Vertrieb",
  erp__navigation_label_core_data: "Stammdaten",
  erp__navigation_label_components: "Komponenten",
  erp__navigation_label_components_for_products: "Komponentenzuordnungen",
  erp__navigation_label_customers: "Kunden",
  erp__navigation_label_reseller: "Vertriebspartner",
  erp__navigation_label_products: "Produkte",
  erp__navigation_label_shipping: "Versand und Transport",
  erp__navigation_label_billing: "Fakturierung",
  erp__navigation_label_orders: "Aufträge",
  erp__navigation_label_order_items: "Auftragsposten",
  erp__navigation_label_invoices: "Rechnungen",
  erp__navigation_label_production: "Produktion",
  erp__navigation_label_sales_planning: "Absatzplanung",
  erp__navigation_label_production_planning: "Produktionsplanung",
  erp__navigation_label_requirements_planning: "Bedarfsplanung",
  erp__navigation_label_product_cost_planning: "Produktkostenplanung",
  erp__navigation_label_customer_service: "Kundenservice",
  erp__navigation_label_quality_management: "Qualitätsmanagement",
  erp__navigation_label_logistics_controlling: "Logistik-Controlling",
  erp__navigation_label_core_functions: "Zentrale Funktionen",
  erp__navigation_label_accounting: "Rechnungswesen",
  erp__navigation_label_finance: "Finanzwesen",
  erp__navigation_label_controlling: "Controlling",
  erp__navigation_label_strategic_enterprise_management: "Strategic Enterprise Management",
  erp__navigation_label_property_management: "Immobilienmanagement",
  erp__navigation_label_staff: "Personal",
  erp__navigation_label_staff_table: "Personal",
  erp__navigation_label_staff_time_management: "Personalzeitwirtschaft",
  erp__navigation_label_payroll: "Personalabrechnung",
  erp__navigation_label_training_needs_management: "Trainingsbedarfsverwaltung",
  erp__navigation_label_information_system: "Informationssystem",
  erp__navigation_label_info_systems: "Infosysteme",
  erp__navigation_label_financial_analytics: "Financial Analytics",
  erp__navigation_label_product_lifecycle_analytics: "Product Lifecycle Analytics",
  erp__navigation_label_tools: "Werkzeuge",
  erp__navigation_label_administration: "Administration",
  erp__navigation_label_web_client_ui_framework: "WebClient-UI-Framework",
  erp__navigation_label_enterprise_search: "Enterprise Search",
  erp__navigation_import_excel_file: "Daten importieren",
  erp__navigation_export_excel_file: "Daten exportieren (Download)",
  erp__table_search_placeholder: "Diese Tabelle durchsuchen...",

  // ERP-Table
  erp__employment_mode_label_assistance: "Hilfskraft",
  erp__employment_mode_label_full_time: "Vollzeit",
  erp__employment_mode_label_part_time: "Teilzeit",
  erp__employment_mode_label_student: "Student",
  erp__family_status_label_divorced: "Geschieden",
  erp__family_status_label_married: "Verheiratet",
  erp__family_status_label_single: "Alleinstehend",
  erp__payment_status_label_paid: "Bezahlt",
  erp__payment_status_label_unpaid: "Offen",
  erp__delivery_status_label_completed: "Abgeschlossen",
  erp__delivery_status_label_in_process: "In Bearbeitung",
  erp__salutation_label_mr: "Herr",
  erp__salutation_label_mrs: "Frau",
  erp__salutation_label_non_binary: "Divers",
  erp__no_table: "Keine Tabelle",
  erp__no_table_selected: "Keine Tabelle ausgewählt",
  erp__no_table_select_hint: "Bitte wählen Sie eine Tabelle aus",

  erp__table_label_id: "Id",
  erp__table_label_component_id: "Komponenten-Nr.",
  erp__table_label_sample_company_id: "Unternehmen-Nr.",
  erp__table_label_salutation: "Anrede",
  erp__table_label_first_name: "Vorname",
  erp__table_label_last_name: "Nachname",
  erp__table_label_address_line: "Anschrift",
  erp__table_label_postal_code: "PLZ",
  erp__table_label_city: "Ort",
  erp__table_label_country: "Land",
  erp__table_label_email: "E-Mail",
  erp__table_label_phone: "Telefonnummer",
  erp__table_label_note: "Notizen",
  erp__table_label_order_id: "Auftrags-Nr.",
  erp__table_label_order_item_id: "Auftragsposten-Nr.",
  erp__table_label_name: "Name",
  erp__table_label_company: "Unternehmen",
  erp__table_label_employee_id: "Personal-Nr.",
  erp__table_label_invoice_id: "Rechnungs-Nr.",
  erp__table_label_product_id: "Produkt-Nr.",
  erp__table_label_order_product_id: "Posten-Nr.",
  erp__table_label_supplier_id: "Lieferanten-Nr.",
  erp__table_label_total_net: "Gesamtpreis netto",
  erp__table_label_unit: "Einheit",
  erp__table_label_binary_file_id: "Anhang",
  erp__table_label_stock_cost_per_unit: "Lagerkosten je Gebinde",
  erp__table_label_stock_cost_total: "Lagerkosten",
  erp__table_label_pack_size: "Menge je Produkteinheit",
  erp__table_label_available_stock: "Bestand",
  erp__table_label_quantity: "Menge",
  erp__table_label_quantity_per_product: "Komponentenanzahl pro Produkteinheit",
  erp__table_label_value_string: "Text",
  erp__table_label_value_number: "Zahl",
  erp__table_label_value_currency: "Euro",
  erp__table_label_value_binary: "Datei",
  erp__table_label_value_email: "E-Mail",
  erp__table_label_value_salutation: "Anrede",
  erp__table_label_value_date: "Datum",
  erp__table_label_value_employment: "Angestelltenverhältnis",
  erp__table_label_value_family_status: "Familienstand",
  erp__table_label_value_payment_status: "Zahlungsstatus",
  erp__table_label_value_delivery_status: "Lieferstatus",
  erp__table_label_value_postal_code: "Postleitzahl",
  erp__table_label_value_phone: "Telefonnummer",
  erp__table_label_unknown: "Unbekannter Tabellenytp",

  erp__show_selected_only: "Nur Markierungen zeigen",
  erp__no_cell_selected: "Keine Zelle ausgewählt",
  erp__no_data: "Keine Daten vorhanden",
  erp__no_data_create_or_import: "Legen Sie Datensätze separat an oder importieren Sie die gewünschten Excel Tabellen",
  erp__table_placeholder: "Diese Tabelle dient lediglich als Platzhalter und kann nicht bearbeitet werden.",
  erp__table_locked: "Diese Datenbanktabelle ist gesperrt",

  erp__table_component_label_category: "Artikelgruppe",
  erp__table_component_label_purchasing_price: "Einkaufspreis",
  erp__table_component_label_margin: "Marge",

  erp__table_employee_label_department: "Abteilung",
  erp__table_employee_label_job_title: "Funktion",
  erp__table_employee_label_employment_mode: "Beschäftigungsart",
  erp__table_employee_label_employed_at: "Vertragsbeginn",
  erp__table_employee_label_employment_ends_at: "Vertragsende",
  erp__table_employee_label_site: "Betriebsstandort",
  erp__table_employee_label_graduation: "Abschluss",
  erp__table_employee_label_further_education: "Weiterbildungen",
  erp__table_employee_label_tax_class: "Steuerklasse",
  erp__table_employee_label_family_status: "Familienstand",
  erp__table_employee_label_child_count: "Anzahl Kinder",
  erp__table_employee_label_assessment: "Bemessung",

  erp__table_invoice_label_invoice_date: "Rechnungsdatum",
  erp__table_invoice_label_due_date: "Fälligkeitsdatum",
  erp__table_invoice_label_payment_terms: "Zahlungsbedingungen",
  erp__table_invoice_label_amount_paid: "Gezahlt",
  erp__table_invoice_label_payment_status: "Zahlstatus",
  erp__table_invoice_label_reminder_fee: "Mahngebühren",
  erp__table_invoice_label_default_charges: "Verzugszinsen",
  erp__table_invoice_label_total_gross: "Gesamtpreis brutto",
  erp__table_invoice_label_tax_amount: "Steuerbetrag",

  erp__table_order_label_cashback: "Skonto",
  erp__table_order_label_discount: "Rabatt",
  erp__table_order_label_delivery_charge: "Versandkosten",
  erp__table_order_label_delivery_status: "Lieferstatus",
  erp__table_order_label_delivery_date: "Lieferdatum",
  erp__table_order_label_customer_id: "Kunden-Nr.",

  erp__table_product_label_net_price: "Grundpreis netto",
  erp__table_product_label_tax_rate: "MwSt.-Satz",

  erp__table_cell_content: "Zelleninhalt",

  erp__table_select_all: "Alle markieren",
  erp__table_deselect_all: "Markierungen entfernen",

  erp__table_primary_key: "Primärschlüssel",
  erp__table_primary_key_tooltip_text:
    "Der Primärschlüssel dient zur eindeutigen Identifizierung eines Datensatzes. Dieser wird automatisch beim Anlegen eines Datensatzes erzeugt.",
  erp__table_foreign_key: "Fremdschlüssel",
  erp__table_foreign_key_tooltip_text:
    "Der Fremdschlüssel dient zur Verknüpfung eines Datensatzes einer anderen Tabelle.",
  erp__table_attachment_available: "Anhang vorhanden",
  erp__table_attachment_not_available: "Kein Anhang vorhanden",

  // ERP-Navigation
  erp__navigation_label_shipment: "Lieferungen",
  erp__navigation_label_company: "Unternehmen",

  erp__navigation_label_supplier: "Lieferanten",
  erp__navigation_label_component: "Komponenten",
  erp__navigation_label_employee: "Angestellte",
  erp__navigation_label_product: "Produkte",
  erp__navigation_label_order_item: "Artikel",
  erp__navigation_label_order: "Aufträge",
  erp__navigation_label_customer: "Kunden",
  erp__navigation_label_invoice: "Rechnungen",

  // ERP-Dataset
  erp_dataset__general: "Datensatz",
  erp_dataset__criterion_title: "ERP (Datensatz)",
  erp_dataset__open: "Datensatz öffnen",
  erp_dataset__edit: "Datensatz bearbeiten",
  erp_dataset__delete: "Datensatz löschen",
  erp_dataset__primary_key: "Primärschlüssel",
  erp_dataset__foreign_key: "Fremdschlüssel",
  erp_dataset__navigate_to_dataset: "zum Datensatz",
  erp_dataset__copy_all: "Stammdaten in die Zwischenablage kopieren",
  erp_dataset__file_upload_title: "Anhang hochladen",
  erp_dataset__primary_key_placeholder: "Wird automatisch erzeugt...",
  erp_dataset__create: "Neuen Datensatz anlegen",
  erp_dataset__required_info: "Pflichtangabe",

  // ERP
  erp__cell_header_Label: "Zelleninhalt",
  erp__cell_short: "Zelle(n)",
  erp__cell_add_button: "Zeile (Datensatz) anlegen",
  erp__navigation_hide_placeholders: "Platzhalter ausblenden",
  erp__navigation_label: "ERP",
  erp__cell_refresh_button: "Alle überprüfen",
  erp__dialog_delete_dataset_title: "Datensatz löschen",
  erp__dialog_delete_dataset_description:
    "Soll der Datensatz wirklich gelöscht werden? Dieser Vorgang kann nicht rückgängig gemacht werden.",

  // ERP Excel Import
  erp_excel_import__modal_title: "Excel Datei importieren",
  erp_excel_import__modal_description:
    "Sie können das ERP auch mithilfe von Excel erstellen und hier importieren. Laden Sie sich hierzu das Template herunter und nutzen Sie anschließend das Uploadfenster, um die Tabellen gebündelt zu importieren.",
  erp_excel_import__modal_warning:
    "ACHTUNG! Bedenken Sie, dass mit dem Importieren eines Excel Templates alle bisherigen Daten des ERP verloren gehen.",
  erp_excel_import__modal_download: "Excel Template herunterladen",
  erp_excel_import__modal_upload_title: "Upload",
  erp_excel_import__modal_upload_description: "Laden Sie hier das überarbeitete Excel Template hoch.",
  erp_excel_import__modal_upload_description_hint: "Diese kann nach einer Überprüfung hinzugefügt werden.",
  erp_excel_import__modal_upload_error: "Die hochgeladene Datei ist fehlerhaft",
  erp_excel_import__modal_upload_check: "Datei wird geprüft...",
  erp_excel_import__modal_file_chip_error: "Datei fehlerhaft",

  // ERP Accordion
  erp_accordion__component_label: "Komponenten-Nr.",
  erp_accordion__component_additional_label: "{{count}} Komponenten",
  erp_accordion__customer_label: "Kunde-Nr.",
  erp_accordion__customer_additional_label: "{{count}} Kunden",
  erp_accordion__employee_label: "Angestellter-Nr.",
  erp_accordion__employee_additional_label: "{{count}} Angestellte",
  erp_accordion__invoice_label: "Rechnung-Nr.",
  erp_accordion__invoice_additional_label: "{{count}} Rechnungen",
  erp_accordion__order_label: "Auftrags-Nr.",
  erp_accordion__order_additional_label: "{{count}} Aufträge",
  erp_accordion__order_item_label: "Artikel-Nr.",
  erp_accordion__order_item_additional_label: "{{count}} Artikel",
  erp_accordion__product_label: "Produkt-Nr.",
  erp_accordion__product_additional_label: "{{count}} Produkte",
  erp_accordion__supplier_label: "Lieferant-Nr.",
  erp_accordion__supplier_additional_label: "{{count}} Lieferanten",
  erp_accordion__copy_all: "Stammdaten und Fremdschlüssel in die Zwischenablage kopieren",
  erp_accordion__component_for_product_label_simple: "Komponente für Produkt",
  erp_accordion__component_for_product_label: "Komponente-Nr. {{componentId}} für Produkt-Nr. {{productId}}",
  erp_accordion__component_for_product_additional_label: "{{count}} Komponenten für Produkte",

  // Binary Input
  binary_input__placeholder_label: "nicht vorhanden",
  binary_input__upload_title: "Datei hochladen",

  // Coding Criterion
  coding_models__automated_item_input_value_preview_spreadsheet_title: "Dokument (Tabellenkalkulation)",
  coding_models__automated_item_input_value_preview_spreadsheet_title_check_file: "nach Inhalten prüfen",
  coding_models__coding_item_deletion_fk_error:
    "Das Item wird bereits in einem Rating verwendet und kann nicht gelöscht werden",
  coding_models__coding_dimension_deletion_fk_error:
    "Die Dimension wird bereits in einem Rating verwendet und kann nicht gelöscht werden",
  coding_models__coding_model_deletion_fk_error:
    "Die Kodieranweisung wird bereits in einem Rating verwendet und kann nicht gelöscht werden",

  // Chat
  chat__title: "Nachrichten",
  chat__unknown_title: "Unbekannt",
  chat__group_title: "Gruppennachricht ({{count}})",
  chat__supervisor_back: "Zur Teilnehmendenansicht",
  chat__supervisor: "Testleitung",
  chat__participant: "Teilnehmer",
  chat__instruction: "Nachricht versenden an ausgewählte Teilnehmende ({{count}}):",
  chat__instruction_reporting_attendee: "Nachricht versenden an {{name}}:",
  chat__supervisor_unapproachable:
    "Die Testleitung ist eventuell zurzeit nicht erreichbar, da die Erhebung asynchron durchgeführt wird.",
  chat__supervisor_unapproachable_text:
    "Bitte bedenken Sie, dass der Projektleitende Ihre Nachricht möglicherweise erst nach der Projektbearbeitung erhält und Ihnen nicht direkt antworten kann.",
  chat__error_notification: "Der Chat funktioniert aktuell nicht mehr, bitte versuchen Sie es später erneut",

  // E-Mail-Message Template
  email_message_template__template_label_salutation: "{Anrede}",
  email_message_template__template_label_first_name: "{Vorname}",
  email_message_template__template_label_last_name: "{Nachname}",
  email_message_template__template_label_formal_salutation: "{Formale Anrede}",
  email_message_template__tooltip_salutation: "„Herr/Frau/*“",
  email_message_template__tooltip_first_name: "„Vorname des Teilnehmenden“",
  email_message_template__tooltip_last_name: "„Nachname des Teilnehmenden“",
  email_message_template__tooltip_formal_salutation: "„Sehr geehrte/Sehr geehrter/Sehr geehrt*“",
  email_message_template__formal_greeting_mr: "Sehr geehrter",
  email_message_template__formal_greeting_mrs: "Sehr geehrte",
  email_message_template__formal_greeting_non_binary: "Sehr geehrt*",

  // Error
  error_entity_in_use: "Entität wird bereits verwendet und kann nicht gelöscht werden",
  error_entity_in_use_scenario_questionnaire_intervention:
    "Dem Ereignis sind Interventionen zugeordnet, daher konnte es nicht gelöscht werden",
  error_reset_password_token: "Der von Ihnen verwendete Link zum Zurücksetzen des Passworts ist nicht korrekt.",
  error_reset_password_token_title: "Fehler beim Zurücksetzen des Passworts"
}
