/* eslint-disable max-lines */
// Do not use nested keys to provide full type safety for
// translation keys!

// syntax: <module/area>__<function>__component, words separated by _

export const translations = {
  // General
  brand_name: "Luca",
  edit: "bearbeiten",
  confirm: "Bestätigen",
  confirmed: "Bestätigt",
  select: "Auswählen",
  table_of_contents: "Inhaltsverzeichnis",
  graphics: "Grafiken",
  display_graphics: "Grafiken anzeigen",

  // Fields / Labels
  password: "Passwort",
  email: "E-Mail-Adresse",
  email_short: "E-Mail",
  first_name: "Vorname",
  last_name: "Nachname",
  organization: "Organisation",
  description: "Beschreibung",
  edit_description: "Beschreibung bearbeiten",
  title: "Titel",
  add: "hinzufügen",
  category: "Kategorie",
  file: "Datei",
  files: "Dateien",
  video: "Video",
  logo: "Logo",
  name: "Name",
  salutation: "Anrede",
  selection: "Selektion",
  salutation_long: "Wie wollen Sie angesprochen werden?",
  question: "Frage",
  questions: "Fragen",
  create_date_title: "Erstelldatum",
  author_title: "Autor",
  question_description: "Fragestellung",
  type: "Typ",
  document: "Dokument",

  // Common
  common__no_data: "Keine Daten vorhanden...",

  // Edit
  edit__image: "Grafik bearbeiten",
  edit__video: "Video bearbeiten",

  // Preview
  preview__general: "Ansehen",
  preview__image: "Grafik ansehen",
  preview__video: "Video ansehen",

  // General fields or placeholders,
  select__placeholder: "Bitte wählen",
  select__empty: "Keine Einträge",
  element__unknown: "Unbekannt",

  // Not Found
  not_found__label: "Die von Ihnen angeforderte Seite wurde nicht gefunden",

  // Dialog
  dialog__delete_element_title: "Element löschen",
  dialog__archive_element_title: "Element archivieren",
  dialog__confirm_title: "Aktion bestätigen",
  dialog__delete_element_text:
    "Soll das Element wirklich gelöscht werden? Dieser Vorgang kann nicht rückgängig gemacht werden.",
  dialog__archive_element_text:
    "Soll das Element wirklich archiviert werden? Dieser Vorgang kann nicht rückgängig gemacht werden.",

  // Headlines
  overview: "Übersicht",
  preview: "Vorschau",
  information: "Information",

  // Auth
  login: "Anmeldung",
  login_hint:
    "Um alle Funktionen in Luca nutzen zu können, müssen Sie sich einloggen. Sollten Sie bisher keine Benutzerdaten haben, dann registrieren Sie sich bitte zuerst.",
  register: "Registrierung",
  register_hint:
    "Durch das Registrieren bei Luca wird für Sie ein Benutzerkonto angelegt. Mit diesem Benutzerkonto können Sie anschließend eigene Projekte erstellen oder selbst an Simulationen teilnehmen.",
  register_backoffice_terms_and_conditions_hint_text_1: "Ich habe die",
  register_backoffice_terms_and_conditions_hint_link_1: "Einwilligungserklärung",
  register_backoffice_terms_and_conditions_hint_text_2: ",",
  register_backoffice_terms_and_conditions_hint_link_2: "Datenschutzhinweise",
  register_backoffice_terms_and_conditions_hint_text_3: "und",
  register_backoffice_terms_and_conditions_hint_link_3: "Nutzungsbedingungen",
  register_backoffice_terms_and_conditions_hint_text_4: "gelesen, verstanden und stimme diesen hiermit zu.",
  privacy_policy_confirmation_required__heading: "Änderungen der Nutzungsbedingungen",
  privacy_policy_confirmation_required__text: "Bitte bestätigen Sie die geänderten Nutzungsbedingungen.",
  privacy_policy_confirmation_required__confirm_button: "Zustimmen",
  to_login: "Zur Anmeldung",
  to_register: "Zur Registrierung",
  welcome_headline: "Willkommen!",
  welcome_text:
    "Luca ist eine Lernplattform zur Simulation realistischer Bürosituationen. Eingesetzt wird Luca in der Ausbildung kaufmännischer Berufe, um Auszubildende mit dem künftigen Arbeitsplatz vertraut zu machen und den Ausbildern eine Möglichkeit der direkten Unterstützung zu bieten.",
  auth__request_password_reset:
    "Falls Ihr Passwort verloren gegangen sein sollte, können Sie es über einen Bestätigungslink zurücksetzen. Der Link wird an Ihr Postfach versandt, um sicherzustellen, dass Sie zugriffsberechtigt sind.",
  auth__reset_password:
    "Bitte setzen Sie ihr neues Passwort. Sie müssen das gewünschte Passwort wiederholen, um mögliche Tippfehler zu vermeiden.",

  // Langs
  lang_de: "Deutsch",
  lang_en: "English",
  lang_es: "Spanisch",

  //Error
  error_general: "Ein Fehler ist aufgetreten",

  //Units
  unit__just_now: "Sofort",
  unit__seconds_singular: "Sekunde",
  unit__seconds_plural: "Sekunden",
  unit__minutes_short: "min",
  unit__minutes_plural: "Minuten",
  unit__hours_singular: "Stunde",
  unit__hours_plural: "Stunden",
  unit__days_singular: "Tag",
  unit__days_plural: "Tage",
  unit__weeks_singular: "Woche",
  unit__weeks_plural: "Wochen",
  unit__months_singular: "Monat",
  unit__months_plural: "Monate",
  unit__years_singular: "Jahr",
  unit__years_plural: "Jahre",

  //Dates
  distance_past_plural: "Vor {{distance}}n",
  distance_past: "Vor {{distance}}",
  distance_future_plural: "In {{distance}}n",
  distance_future: "Noch {{distance}}",
  distance_today: "Heute",

  // Placeholder
  placeholder__tags: "Keine Tags angelegt",
  placeholder__indicate_more_tags: "...",
  placeholder__no_entry: "keine Angabe",
  placeholder__add_to_selection: "Zur Auswahl hinzufügen",
  placeholder__remove_from_selection: "Aus Auswahl entfernen",
  placeholder__already_assigned: "Bereits zugewiesen",
  placeholder__disabled_cause_of_single_selection: "Nur ein Modul auswählbar",
  placeholder__data_present: "Vorhanden",
  placeholder__data_unavailable: "Nicht vorhanden",

  // Notification
  notification__error: "Achtung",
  notification__warning: "Wichtiger Hinweis",
  notification__success: "Aktion erfolgreich",
  notification__message_graphql_error: "Bei der Backend-Kommunikation ist ein Fehler aufgetreten.",
  notification__message_network_error: "Es ist ein Netzwerkfehler aufgetreten.",
  notification__message_unauthorized: "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.",
  notification__message_email_folder_delay:
    "In dem eingestellten Ablageort sind zukünftige E-Mails nicht verfügbar. Bitte überprüfen Sie die Einstellung des Zeitpunkts der E-Mail.",
  notification__title_successful_registration: "Registrierung erfolgreich",
  notification__message_successful_registration:
    "Ihre Registrierung war erfolgreich. Bitte melden Sie sich an, um fortzufahren. ",
  notification__title_successful_chat_message_send: "Nachricht erfolgreich gesendet",
  notification__message_successful_chat_message_send: "Die Nachricht wurde an alle ausgewählten Teilnehmer gesendet.",

  //Header
  header__label_editor: "Luca - Editor",
  header__label_manager: "Luca - Manager",
  header__label_rating: "Luca - Rating",
  header__label_user_management: "Luca - Benutzerverwaltung",
  header__user_logout: "Abmelden",
  header__user_my_account: "Mein Konto",

  //Content (general)
  content__not_found: "Das gesuchte Element ist nicht verfügbar",
  content__not_found_headline: "Details nicht verfügbar",

  //Sub-Header
  subheader__typ: "Typ",
  subheader__sort: "Sortierung",
  subheader__state: "Status",
  subheader__search: "Suche",
  subheader__search_placeholder: "Nach Titel, Beschreibung oder Autor suchen...",
  subheader__filter_by_all_entities: "Alle {{entity}}",
  subheader__filter_by_owned_entities: "Meine {{entity}}",
  subheader__filter_by_selected_entities: "Ausgewählt ({{count}})",
  subheader__filter_by_published: "Veröffentlicht",
  subheader__filter_by_unpublished: "Unveröffentlicht",
  subheader__filter_by_show_all: "Alle",
  subheader__filter_by_in_progress: "In Bearbeitung",
  subheader__filter_by_done: "Versiegelt",
  subheader__sort_by_author: "Nach Autor",
  subheader__sort_by_name: "Nach Name",
  subheader__sort_by_creation_date: "Nach Erstellungsdatum",
  subheader__sort_by_duration: "Nach Dauer",
  subheader__sort_by_title: "Nach Titel",
  subheader__filter_default_title: "Elemente",
  subheader__filter_by_rating_done: "abgeschlossen",
  subheader__sort_by_date: "Nach Datum",

  //Navigation
  navigation__scenarios: "Szenarien",
  navigation__sample_companies: "Modellunternehmen",
  navigation__questionnaires: "Fragebögen",
  navigation__reference_books: "Nachschlagewerke",
  navigation__my_account: "Mein Konto",
  navigation__projects: "Projekte",
  navigation__events: "Ereignisse",
  navigation__r_scripts: "R-Skripte",

  // Detail Card (projects, scenarios)
  detail_card__title_createdAt: "Erstelldatum",
  detail_card__title_author: "Autor",
  detail_card__label_status: "Status",
  detail_card__status_editable: "In Bearbeitung",
  detail_card__status_finalized: "Versiegelt",
  detail_card__status_completed: "Beendet",
  detail_card__status_running: "Laufend",

  // Reference Books
  reference_books__filter_title: "Kapitel",
  reference_books__edit_description: "Beschreibung bearbeiten",
  reference_books__card_article: "Artikel",
  reference_books__card_articles: "Artikel",
  reference_books__create_reference_book: "Neues Kapitel anlegen",
  reference_books__create_reference_book_title_placeholder: "Kapiteltitel eingeben...",
  reference_books__create_reference_book_description_label: "Kapitelbeschreibung",
  reference_books__create_reference_book_description_placeholder: "Beschreibungstext zum Kapitel hier eingeben...",
  reference_books__create_reference_book_delete_dialog: "Soll das Kapitel endgültig gelöscht werden?",
  reference_books__create_reference_book_article_delete_dialog: "Soll der Artikel endgültig gelöscht werden?",
  reference_books__sub_header_title: "Kapitel",
  reference_books__sub_header_overview: "Kapitelauswahl",
  reference_books__create_reference_book_article_title: "Neuen Artikel erstellen",
  reference_books__create_reference_book_article_title_placeholder: "Artikeltitel eingeben...",
  reference_books__table_of_contents: "Inhaltsverzeichnis",
  reference_books__table_of_contents_count: "Inhaltsverzeichnis ({{count}})",
  reference_books__table_of_contents_placeholder: "Keine Artikel vorhanden",
  reference_books__add_new_article: "Weiteren Artikel hinzufügen",
  reference_books__add_new_article_dialog_title: "Artikelbaustein hinzufügen",
  reference_books__creation_bar_title: "Weiteres Element hinzufügen",
  reference_books__create_text_content_title: "Textblock erstellen",
  reference_books__create_image_content_title: "Bildelement erstellen",
  reference_books__edit_text_content_title: "Textblock bearbeiten",
  reference_books__create_text_content_confirm: "Erstellen",
  reference_books__article_content_type_text: "Textblock",
  reference_books__article_content_type_text_description: "Ergänzen Sie Ihren Artikel um weitere Textabschnitte.",
  reference_books__article_content_type_graphic: "Grafik",
  reference_books__article_content_type_graphic_description: "Ergänzen Sie Ihren Artikel um weitere Grafiken.",
  reference_books__article_content_type_video: "Videos",
  reference_books__article_content_type_video_description: "Ergänzen Sie Ihren Artikel um weitere Videos.",
  reference_books__article_content_type_pdf: "PDF",
  reference_books__article_content_type_pdf_description: "Ergänzen Sie Ihren Artikel um weitere PDF-Dateien.",
  reference_books__article_content_view_pdf: "Im PDF-Viewer ansehen",
  reference_books__article_table_header_article: "Artikel",
  reference_books__duplicate_button: "Kapitel duplizieren",
  reference_books__publish_button: "Kapitel veröffentlichen",
  reference_books__header_button_publish_tooltip:
    "Das Kapitel wird veröffentlicht und kann nicht weiter editiert werden",
  reference_books__header_orly_publish_title: "Veröffentlichen des Kapitels",
  reference_books__header_orly_publish_button: "Veröffentlichen",
  reference_books__header_orly_publish_text:
    "Möchten Sie das Kapitel wirklich Veröffentlichen? Danach sind keine Änderungen am Kapitel mehr möglich.",
  reference_books__duplicate_success: "Das Kapitel wurde erfolgreich dupliziert.",
  reference_books__duplicate_error: "Das Kapitel konnte nicht dupliziert werden.",
  reference_books__sort_article_content_title: "Artikelbausteine sortieren",
  reference_books__sort_article_content_table_of_contents_label: "Artikelbausteine ({{count}})",
  reference_books__sort_article_content_text_bock_label: "Textbaustein",
  reference_books__sort_article_content_image_bock_label: "Grafikbaustein",
  reference_books__sort_article_content_video_bock_label: "Videobaustein",
  reference_books__sort_article_content_pdf_bock_label: "PDF-Baustein",
  reference_books__delete_dialog_title_text: "Textblock löschen",
  reference_books__delete_dialog_text_text:
    "Möchten Sie diesen Textblock wirklich unwiderruflich aus diesem Artikel löschen?",
  reference_books__delete_dialog_title_image: "Grafik löschen",
  reference_books__delete_dialog_text_image:
    "Möchten Sie diese Grafik wirklich unwiderruflich aus diesem Artikel löschen?",
  reference_books__delete_dialog_title_video: "Video löschen",
  reference_books__delete_dialog_text_video:
    "Möchten Sie dieses Video wirklich unwiderruflich aus diesem Artikel löschen?",
  reference_books__delete_dialog_title_pdf: "PDF löschen",
  reference_books__delete_dialog_text_pdf: "Möchten Sie dieses PDF wirklich unwiderruflich aus diesem Artikel löschen?",
  reference_books__article_content_type_label_text: "Textblock",
  reference_books__article_content_type_label_graphic: "Grafikblock",
  reference_books__article_content_type_label_video: "Videoblock",
  reference_books__article_content_type_label_pdf: "PDF-Block",
  reference_books__sort_chapters_title: "Kapitel sortieren",
  reference_books__sort_chapters_table_of_contents_label: "Kapitel ({{count}})",

  // Reorder
  reorder__table_column_title: "Titel",
  reorder__table_show_preview: "Vorschau anzeigen",

  // Scenario reference books
  reference_books__header_label: "Nachschlagewerk",
  reference_books__scenario_chapter_setting_title: "Kapitel bündeln",
  reference_books__scenario_add_chapter: "Kapitel hinzufügen",
  reference_books__scenario_no_chapters_added: "Keine Kapitel hinzugefügt",
  reference_books__scenario_chapter_placeholder: "Kein Kapitel oder Artikel ausgewählt",
  reference_books__scenario_chapter_content_placeholder: "Bitte wählen Sie ein Kapitel auf der linken Seite aus.",
  reference_books__scenario_please_add_chapters: "Bitte fügen Sie zunächst ein Kapitel hinzu",
  reference_books__scenario_chapter_setting_hint:
    "Wenn die Kapitel gebündelt werden, kann der Teilnehmende nur eine Liste der Artikel, aber nicht die kapitelweise Trennung sehen.",
  reference_books__scenario_amount_selected_chapters_label: "{{count}} Kapitel ausgewählt",
  reference_books__scenario_add_selected_label: "Ausgewählte hinzufügen ({{count}})",
  reference_books__chapters_bundled_header_info: "Kapitelbündelung verbirgt diese Seite für Teilnehmende",

  // Sample Companies
  sample_companies__header_details_label: "Modellunternehmendetails",
  sample_companies__header_label_selection: "Modellunternehmen hinzufügen",
  sample_companies__header_finalize_label: "Modellunternehmen versiegeln",
  sample_companies__header_publish_label: "Modellunternehmen veröffentlichen",
  sample_companies__header_button_finalize_tooltip:
    "Das Modellunternehmen wird versiegelt und kann nicht weiter editiert werden",
  sample_companies__header_button_finalize_tooltip_missing_profile: "Unternehmensintro nicht vorhanden",
  sample_companies__header_button_finalize_tooltip_missing_logo: "Unternehmenslogo nicht vorhanden",
  sample_companies__header_button_finalize_tooltip_missing_description: "Unternehmensbeschreibung nicht vorhanden",
  sample_companies__header_orly_finalize_title: "Versiegeln des Modellunternehmens",
  sample_companies__header_orly_finalize_button: "Versiegeln",
  sample_companies__header_orly_finalize_text:
    "Möchten Sie das Modellunternehmen wirklich versiegeln? Danach sind keine Änderungen am Modellunternehmen mehr möglich.",
  sample_companies__header_button_publish_tooltip:
    "Das Modellunternehmen wird veröffentlicht und kann nicht weiter editiert werden",
  sample_companies__header_orly_publish_title: "Veröffentlichen des Modellunternehmens",
  sample_companies__header_orly_publish_button: "Veröffentlichen",
  sample_companies__header_orly_publish_text:
    "Möchten Sie das Modellunternehmen wirklich veröffentlichen? Danach sind keine Änderungen am Modellunternehmen mehr möglich.",
  sample_companies__header_duplicate_label: "Modellunternehmen duplizieren",
  sample_companies__duplicate_success: "Das Modellunternehmen wurde erfolgreich dupliziert.",
  sample_companies__filter_title: "Modellunternehmen",
  sample_companies__create_sample_company: "Neues Modellunternehmen anlegen",
  sample_companies__create_sample_company_author_title: "Autor",
  sample_companies__create_sample_company_title_placeholder: "Titel des Modellunternehmens eingeben...",
  sample_companies__create_sample_company_description_placeholder:
    "Fügen Sie ihrem Modellunternehmen hier einen Beschreibungstext hinzu...",
  sample_companies__detail_button_create: "anlegen",
  sample_companies__detail_button_edit: "bearbeiten",
  sample_companies__detail_button_show: "anzeigen",
  sample_companies__detail_button_confirm: "anwenden",
  sample_companies__detail_clear_button_confirm: "Entfernen",
  sample_companies__detail_clear_modal_title: "Element entfernen",
  sample_companies__detail_clear_modal_text:
    "Soll das Element wirklich gelöscht werden? Dieser Vorgang kann nicht rückgängig gemacht werden.",
  sample_companies__detail_header_navigate_back_label: "Modellunternehmenauswahl",
  sample_companies__logo_label: "Unternehmenslogo",
  sample_companies__detail_general_information_label: "Allgemeine Informationen",
  sample_companies__detail_general_information_binary_placeholder: "Kein Logo angelegt",
  sample_companies__detail_general_information_binary_selection: "Logo auswählen",
  sample_companies__detail_general_information_company_intro: "Unternehmensintro",
  sample_companies__detail_general_information_company_intro_edit: "Unternehmensintro bearbeiten",
  sample_companies__detail_general_information_company_intro_delete: "Unternehmensintro löschen",
  sample_companies__detail_general_information_company_upload_intro: "Unternehmensintro hinzufügen",
  sample_companies__detail_general_information_company_upload_placeholder: "Kein Intro angelegt",
  sample_companies__detail_general_information_company_name: "Titel",
  sample_companies__detail_general_information_company_type: "Typ des Unternehmens",
  sample_companies__detail_general_information_company_type_placeholder: "Kein Typ gesetzt",
  sample_companies__detail_general_information_company_description: "Beschreibung",
  sample_companies__detail_general_information_company_description_edit: "Beschreibung bearbeiten",
  sample_companies__detail_general_information_company_tags: "Tags",
  sample_companies__detail_general_information_company_all_files: "Alle Dateien",
  sample_companies__detail_general_information_company_files: "Dateien",
  sample_companies__detail_settings_company_files: "Unternehmensdokumente",
  sample_companies__detail_settings_company_files_desc:
    "Legen Sie hier alle für das Unternehmen relevanten Dokumente an.Die szenariospezifischen Relevanzkriterien der Dokumente können im Szenario-Editor passend zur Aufgabenstellung vergeben werden.",
  sample_companies__detail_settings_files: "Dateien",
  sample_companies__detail_settings_erp: "Enterprise-Resource-Planning",
  sample_companies__detail_settings_erp_desc:
    "Definieren Sie hier das ERP-System dieses Modellunternehmens. Die szenariospezifischen Relevanzkriterien der Datensätze können im Szenario-Editor passend zur Aufgabenstellung vergeben werden.",
  sample_companies__detail_settings_rows_count: "Datensätze",
  sample_companies__detail_settings_email_signature: "E-Mail-Signatur und Domain",
  sample_companies__detail_settings_email_signature_title: "E-Mail-Signatur",
  sample_companies__detail_settings_email_signature_input: "E-Mail-Signatur des Modellunternehmens",
  sample_companies__detail_settings_email_signature_input_edit: "E-Mail-Signatur des Modellunternehmens bearbeiten",
  sample_companies__detail_settings_email_signature_input_placeholder: "Hier E-Mail-Signatur hinzufügen…",
  sample_companies__detail_settings_email_signature_input_placeholder_example: "z.B. modellunternehmen.de",
  sample_companies__detail_settings_email_signature_desc:
    "Legen Sie hier eine passende E-Mail-Signatur und eine Domain an, welche bei Verwendung dieses Modellunternehmens in einem Szenario unter „E-Mails definieren“ verwendet werden können.",
  sample_companies__detail_settings_email_signature_desc_detail:
    "Hier können Sie eine E-Mail-Signatur des Modellunternehmens anlegen, welche Sie in den E-Mails eines Szenarios wiederverwenden können. Die E-Mail-Signatur kann beim Bearbeiten des Inhalts einer E-Mail im Szenario-Editor eingefügt und nachträglich angepasst werden.",
  sample_companies__detail_settings_email_signature_available: "Signatur vorhanden",
  sample_companies__detail_settings_email_signature_unavailable: "Signatur nicht vorhanden",
  sample_companies__detail_settings_email_domain: "Domain",
  sample_companies__detail_settings_email_domain_title: "E-Mail-Domain des Modellunternehmens",
  sample_companies__detail_settings_email_domain_available: "Domain vorhanden",
  sample_companies__detail_settings_email_domain_unavailable: "Domain nicht vorhanden",
  sample_companies__detail_settings_email_domain_edit: "Domain bearbeiten",
  sample_companies__detail_settings_email_domain_generated: "Generierte E-Mail-Adresse der Teilnehmenden",
  sample_companies__detail_settings_email_domain_generated_filled: "z.B. max_mustermann@{{domain}}",
  sample_companies__detail_settings_email_domain_generated_example: "z.B. max_mustermann@modellunternehmen.de",
  sample_companies__detail_settings_email_domain_desc_detail:
    "Hier können Sie eine Domain des Modellunternehmens anlegen, welche genutzt wird, um die E-Mail-Adressen der Teilnehmenden zu generieren. Diese setzen sich aus Vor -und Nachname der Teilnehmenden und der hinterlegten Domain zusammen.",
  sample_companies__detail_settings_email_domain_modal_desc_detail:
    "Bitte geben Sie den Domainnamen ohne Leerzeichen (Modellunternehmen) und die Top-Level-Domain (de, com, shop, online, org) mit einem Punkt getrennt voneinander an.",
  sample_companies__detail_settings_label: "Unternehmenseinstellungen",
  sample_companies__detail_settings_scenario_label: "Szenariospezifische Einstellungen",
  sample_companies__selection_header: "Modellunternehmen auswählen",
  sample_companies__selection_back_button: "Modellunternehmen",
  sample_companies__selection_empty_selection: "Kein Modellunternehmen ausgewählt",
  sample_companies__selection_selected: "Ausgewähltes Modellunternehmen",
  sample_companies__selection_remove_tooltip: "Modellunternehmen von Szenario entfernen",

  // Sample Company Files
  sample_companies_files__title: "Unternehmensdokumente",
  sample_companies_files__navigate_back: "Modellunternehmen",
  sample_companies_files__disabled_tooltip: "Änderung nicht möglich",

  // PDF View
  pdf_view__placeholder: "Die PDF konnte nicht geladen werden.",
  pdf_view__loading_pdf: "Lade PDF...",
  pdf_view__loading_pdf_page: "Lade PDF-Seite...",

  // Spreadsheet Editor
  spreadsheet_editor_unsaved_changes_orly_message: "Möchten Sie wirklich Ihre ungespeicherten Änderungen verwerfen?",

  // Questionnaires
  questionnaires__filter_title: "Fragebögen",
  questionnaires__create_event: "Neuen Fragebogen anlegen",
  questionnaires__create_event_title_placeholder: "Titel des Fragebogens eingeben...",
  questionnaires__create_event_description_placeholder: "Beschreibungstext zum Fragebogen eingeben...",
  questionnaires__selection_header: "Ereignis auswählen",
  questionnaires__selection_back_button: "Szenario",
  questionnaires__selection_empty_selection: "Kein Ereignis ausgewählt",
  questionnaires__selection_selected: "Ausgewähltes Ereignis",
  questionnaires__selection_remove_tooltip: "Ereignis von Szenario entfernen",
  questionnaires__selection_details_label: "Ereignisse",
  questionnaires__selection_header_navigate_back_label: "Szenario",
  questionnaires__selection_add_questionnaire: "Ereignis hinzufügen",
  questionnaires__selection_nothing_selected: "Kein Ereignis ausgewählt",
  questionnaires__selection_nothing_selected_hint: "Bitte wählen Sie ein Ereignis auf der linken Seite aus.",
  questionnaires__selection_nothing_assigned: "Keine Ereignisse hinzugefügt",
  questionnaires__selection_nothing_assigned_hint: "Bitte fügen Sie zunächst ein Ereignis hinzu.",
  questionnaires__selection_questions_count: "{{count}} Fragen",

  // Questionnaire Detail
  questionnaire__title: "Fragebogen",
  questionnaires__header_details_label: "Fragebogen",
  questionnaires__detail_header_navigate_back_label: "Fragebogenauswahl",
  questionnaires__detail_header_event: "Ereignis",
  questionnaires__detail_header_questionnaire: "Fragebogen",
  questionnaires__detail_header_duplicate_button: "Fragebogen duplizieren",
  questionnaires__detail_header_delete_button: "Fragebogen löschen",
  questionnaires__detail_header_publish_button: "Fragebogen veröffentlichen",
  questionnaires__detail_header_finalize_button: "Fragebogen versiegeln",
  questionnaires__detail_header_finalize_orly_title: "Versiegeln des Fragebogens",
  questionnaires__detail_header_finalize_tooltip:
    "Der Fragebogen wird versiegelt und kann nicht weiter editiert werden",
  questionnaires__detail_header_finalize_orly_text:
    "Möchten Sie den Fragebogen wirklich versiegeln? Danach sind keine Änderungen am Fragebogen mehr möglich.",
  questionnaires__header_orly_publish_button: "Veröffentlichen",
  questionnaires__header_button_publish_tooltip:
    "Der Fragebogen wird veröffentlicht und kann nicht weiter editiert werden",
  questionnaires__header_button_publish_tooltip_no_questions: "Keine Fragen vorhanden",
  questionnaires__header_button_publish_tooltip_empty_questions:
    "Enthält leere Fragestellungen, Antwortmöglichkeiten oder Bewertungskritierien.",
  questionnaires__header_button_publish_tooltip_no_time: "Keine Bearbeitungsdauer festgelegt",
  questionnaires__header_button_publish_tooltip_disabled_empty_questions_or_answers:
    "Ein Fragebogen mit leeren Fragestellungen, Antwortmöglichkeiten oder Bewertungskriterien kann nicht veröffentlicht werden",
  questionnaires__header_button_publish_tooltip_unset_correct_answer:
    "Eine Single Choice oder Multiple Choice Frage mit Bewertung enthält keine als korrekt markierte Antwortmöglichkeit",
  questionnaires__header_orly_publish_title: "Veröffentlichen des Fragebogens",
  questionnaires__header_orly_publish_text:
    "Möchten Sie den Fragebogen wirklich veröffentlichen? Danach sind keine Änderungen am Fragebogen mehr möglich.",
  questionnaires__detail_no_project: "Der gewählte Fragebogen existiert nicht",
  questionnaires__detail_title: "Übersicht",
  questionnaires__detail_binary: "Grafik / Video",
  questionnaires__detail_binary_placeholder: "Keine Grafik oder Video angelegt",
  questionnaires__detail_questions_title: "Fragen ({{count}})",
  questionnaires__detail_questions_answers_title: "Antwortmöglichkeiten ({{count}})",
  questionnaires__detail_questions_scoring_count_title: "Bewertungskriterien ({{count}})",
  questionnaires__detail_questions_scoring_title: "Bewertung",
  questionnaires__detail_questions_question: "Fragestellung",
  questionnaires__detail_questions_no_question_given: "Keine Fragestellung vorhanden",
  questionnaires__detail_questions_answer: "Antwortmöglichkeiten",
  questionnaires__detail_questions_answer_has_interventions: "Interventionen vorhanden",
  questionnaires__detail_questions_interventions_placeholder_title: "Keine Antwortmöglichkeit ausgewählt",
  questionnaires__detail_questions_interventions_placeholder_hint:
    "Bitte wählen Sie eine Antwortmöglichkeit aus, um szenariospezifische Einstellungen vorzunehmen.",
  questionnaires__detail_questions_answer_singular: "Antwortmöglichkeit",
  questionnaires__detail_questions_scoring_list_title: "Bewertungskriterien",
  questionnaires__detail_questions_scoring: "max. Punktzahl",
  questionnaires__detail_overlay_update_description: "Beschreibung des Fragebogens",
  questionnaires__detail_edit_time_modal_description:
    "Die Bearbeitungszeit gibt an, wie lange die Teilnehmenden für diesen Fragebogen maximal benötigen dürfen.",
  questionnaires__detail_edit_time_modal_label: "Bearbeitungszeit dieses Fragebogens",
  questionnaires__add_question: "Weitere Frage hinzufügen",
  questionnaires__disabled_tooltip: "Fragebogen bereits versiegelt",
  questionnaires__scenario_disabled_tooltip: "Szenario bereits versiegelt",
  questionnaires_event__disabled_tooltip: "Ereignis bereits versiegelt",
  questionnaires__sort_questions_title: "Fragen sortieren",
  questionnaires__edit_questions_title: "Frage bearbeiten",
  questionnaires__sort_answers_title: "Antworten sortieren",
  questionnaires__title_preview: "Fragebogen (Vorschau)",

  // Event Detail
  events__header_details_label: "Ereignis",
  events__detail_header_navigate_back_label: "Ereignisauswahl",
  events__detail_no_project: "Das gewählte Ereignis existiert nicht",
  events__detail_header_duplicate_button: "Ereignis duplizieren",
  events__detail_header_publish_button: "Ereignis veröffentlichen",
  events__detail_overlay_update_description: "Beschreibung des Ereignisses",
  events__header_button_publish_tooltip: "Das Ereignis wird veröffentlicht und kann nicht weiter editiert werden",
  events__header_button_publish_tooltip_disabled_empty_questions_or_answers:
    "Ein Ereignis mit leeren Fragestellungen oder Antwortmöglichkeiten kann nicht veröffentlicht werden",
  events__header_button_publish_tooltip_disabled_no_questions:
    "Ein Ereignis ohne Fragestellungen kann nicht veröffentlicht werden",
  events__header_button_publish_tooltip_unset_correct_answer:
    "Ein Ereignis mit einer Single Choice oder Multiple Choice Frage mit Bewertung und ohne als korrekt markierte Antwortmöglichkeit kann nicht veröffentlicht werden",
  events__header_orly_publish_title: "Veröffentlichen des Ereignisses",
  events__header_orly_publish_text:
    "Möchten Sie das Ereignis wirklich veröffentlichen? Danach sind keine Änderungen am Ereignis mehr möglich.",
  events__intervention_delay_title: "nach {{delay}} min",
  events__preview_title: "Ereignis (Vorschau)",
  events__end_preview: "Vorschau beenden",

  // Questionnaire Question
  questionnaire_question__creation_title: "Fragentyp auswählen",
  questionnaire_question__multiple_choice_label: "Multiple Choice",
  questionnaire_question__single_choice_label: "Single Choice",
  questionnaire_question__free_text_label: "Freitext",
  questionnaire_question__multiple_choice_description:
    "Teilnehmende können aus den Antwortmöglichkeiten mehrere Antworten auswählen.",
  questionnaire_question__single_choice_description:
    "Teilnehmende müssen aus den Antwortmöglichkeiten genau eine Antwort auswählen.",
  questionnaire_question__free_text_description:
    "Teilnehmende antworten hier mit einem Text ohne strukturelle Vorgaben.",
  questionnaire_question__question_description_placeholder: "Bitte hier die Fragestellung angeben...",
  questionnaire_question__answer_description_placeholder: "Bitte hier die Antwortmöglichkeit angeben...",
  questionnaire_question__answer_criteria_placeholder: "Bitte hier Bewertungskriterium angeben...",
  questionnaire_question__title: "Fragentyp",
  questionnaire_question__update_to_free_text_question_waning:
    "Achtung! Die angelegten Antwortmöglichkeiten werden bei ausgewählter Änderung des Fragentyps gelöscht.",
  questionnaire_question__update_from_free_text_question_waning:
    "Achtung! Die angelegten Bewertungskriterien werden bei ausgewählter Änderung des Fragentyps gelöscht.",
  questionnaire_question__answer_freetext: "Freitextantwort",
  questionnaire_question__freetext_placeholder: "Hier Antworttext eingeben",
  questionnaire_question__freetext_hint: "Antwort wird vom Benutzer ausgefüllt",
  questionnaire_question__scoring_none_title: "Ohne Bewertung",
  questionnaire_question__scoring_none_text: "Die Beantwortung dieser Frage ist von der Bewertung ausgeschlossen.",
  questionnaire_question__scoring_holistic_title: "Holistische Bewertung",
  questionnaire_question__answer_holistic_text:
    "Bitte markieren Sie die Antwortmöglichkeit, welche für die richtige Beantwortung dieser Frage nötig ist und legen Sie eine Punktzahl fest.",
  questionnaire_question__scoring_holistic_text:
    "Der Bewertende muss sich für eine der angegebenen Bewertungskriterien entscheiden.",
  questionnaire_question__scoring_analytic_title: "Analytische Bewertung",
  questionnaire_question__scoring_analytic_text:
    "Der Bewertende kann mehrere Bewertungskriterien auswählen. Die Punktzahlen werden summiert und ergeben die Gesamtsumme.",
  questionnaire_question__answer_analytic_text:
    "Bitte markieren Sie die Antwortmöglichkeiten, welche für die richtige Beantwortung dieser Frage nötig sind und legen Sie eine Punktzahl fest.",
  questionnaire_question__scoring_unit: "Punkte",
  questionnaire_question__scoring_unit_singular: "Punkt",
  questionnaire_question__scoring_footer: "Zu erreichende Punktzahl bei dieser Frage:",
  questionnaire_question__scoring_footer_score: "{{scoreMin}} bis {{scoreMax}} Punkte",
  questionnaire_question__scoring_footer_no_score: "Ohne Bewertung",
  questionnaires_question__scoring_freetext_analytic_title: "Kein Bewertungskriterium erfüllt?",
  questionnaires_question__scoring_freetext_analytic_text:
    "Sollte der Teilnehmende keines der Bewertungskriterien erfüllt haben, trifft der Bewertende hier die Auswahl zum Vergeben von 0 Punkten.",
  questionnaires_question__scoring_freetext_analytic_button: "0 Punkte vergeben",
  questionnaires_question__scoring_multiple_analytic_text: "Punktzahl bei richtiger Antwort (keine Teilpunktzahl)",
  questionnaires_question__scoring_single_holistic_text: "Punktzahl bei richtiger Antwort",
  questionnaires_question__free_text_answer: "Freitextantwort",
  questionnaires_question__free_text_answer_placeholder: "Sonstiges (Freies Textfeld)",
  questionnaires_question__not_deletable: "Löschen nicht möglich",
  questionnaires_question__score_variable_value_hint: "Wert zwischen {{minScore}} und {{maxScore}} eingeben",
  questionnaires_question__holistic_score_null_value_hint: "Punktevergabe nicht möglich",

  // Events
  events__filter_title: "Ereignisse",
  events__create_event: "Neues Ereignis anlegen",
  events__create_event_title_placeholder: "Titel des Ereignisses eingeben...",
  events__create_event_description_placeholder: "Beschreibungstext zum Ereignis eingeben...",
  events__delay_settings_title: "Zeitpunkt",
  events__delay_modal_title: "Zeitpunkt des Ereignisses",
  events__delay_modal_text:
    "Wählen Sie den Zeitpunkt innerhalb des Bearbeitungszeitraumes dieses Szenarios ({{duration}} min) für dieses Ereignis aus. (Angabe bitte als ganze Zahl)",
  events__delay_modal_text_no_max_duration:
    "Wählen Sie den Zeitpunkt innerhalb des Bearbeitungszeitraumes dieses Szenarios (noch nicht festgelegt) für dieses Ereignis aus. (Angabe bitte als ganze Zahl)",
  events__delay_modal_delay_section_title: "Ereignis tritt ein nach:",
  events__delay_modal_delay_unit: "Einheit",
  events__delay_modal_tooltip: "Für diese Option keine Auswahl möglich",
  events__delay_modal_tooltip_temporal_stage_disabled: "Für ausgewählten Ablageort ({{directory}}) nicht möglich.",
  events__delay_modal_delay_title_future: "Zeitangabe (max. {{duration}} min)",
  events__delay_modal_delay_title: "Zeitangabe",

  // Scenario Event
  scenario_events__header_orly_delete_title: "Löschen des Ereignisses",
  scenario_events__header_orly_delete_text: "Möchten Sie das Ereignis wirklich löschen?",

  // Coding Models
  coding_models__title: "Kodieranweisungen",
  coding_models__filter_title: "Szenarien",
  coding_models__overview_subheader_title: "Kodieranweisung übernehmen",
  coding_models__overview_description_placeholder:
    "Fügen Sie der Kodieranweisung hier einen Beschreibungstext hinzu...",
  coding_models__overview_duplicate_success: "Die Kodieranweisung wurde erfolgreich übernommen.",
  coding_models__overview_duplicate_error: "Beim Übernehmen der Kodieranweisung ist ein Fehler aufgetreten.",
  coding_models__detail_header: "Kodierungsanweisung",
  coding_models__detail_header_delete_tooltip: "Kodierunganweisung von Szenario entfernen",
  coding_models__detail_header_delete_orly_title: "Kodierunganweisung entfernen",
  coding_models__detail_header_delete_orly_text:
    "Soll die Kodierunganweisung vom Szenario entfernt werden? Dieser Vorgang kann nicht rückgängig gemacht werden.",
  coding_models__create: "Neue Kodierunganweisung",
  coding_models__create_modal_title: "Neue Kodierunganweisung",
  coding_models__create_modal_description_placeholder: "Beschreibung der Kodieranweisung hier eingeben...",
  coding_models__detail_main_dimension_label: "Hauptdimensionen",
  coding_models__detail_main_dimension_label_singular: "Hauptdimension",
  coding_models__detail_main_dimension_sort_modal_title: "Hauptdimensionen sortieren",
  coding_models__detail_main_dimension_sort_modal_description:
    "Sie können hier die Reihenfolge der Hauptdimensionen dieser Kodieranweisung verändern.",
  coding_models__detail_main_dimension_table_placeholder_title: "Keine Subdimensionen oder Items vorhanden.",
  coding_models__detail_main_dimension_edit_description_modal: "Beschreibung der Hauptdimension bearbeiten",
  coding_models__detail_main_dimension_table_placeholder_sub_title:
    "Welche Inhalte wollen Sie in dieser Hauptdimension anlegen?",
  coding_models__detail_sub_dimension_label: "Subdimensionen",
  coding_models__detail_sub_dimension_label_singular: "Subdimension",
  coding_models__detail_sub_dimension_sort_modal_title: "Subdimensionen sortieren",
  coding_models__detail_sub_dimension_sort_modal_description:
    "Sie können hier die Reihenfolge der Subdimensionen dieser Hauptdimension verändern.",
  coding_models__detail_sub_dimension_edit_description_modal: "Beschreibung der Subdimension bearbeiten",
  coding_models__detail_items_label: "Items",
  coding_models__detail_items_label_singular: "Item",
  coding_models__detail_item_sort_modal_title: "Items sortieren",
  coding_models__detail_item_sort_modal_description:
    "Sie können hier die Reihenfolge der Items dieser Dimension verändern.",
  coding_models__detail_items_table_placeholder_button: "Item anlegen",
  coding_models__detail_items_table_placeholder_title: "Kein Item vorhanden",
  coding_models__detail_items_scoring_type: "Bewertungstyp",
  coding_models__detail_items_scoring_type_holistic: "Holistisch",
  coding_models__detail_items_scoring_type_analytic: "Analytisch",
  coding_models__detail_item_edit_description_modal: "Beschreibung des Items bearbeiten",
  coding_models__detail_item_edit_description_description_placeholder:
    "Fügen Sie diesem Item hier einen Beschreibungstext hinzu...",
  coding_models__detail_item_view_scoring_method: "Bewertungsmethode",
  coding_models__detail_item_view_scoring_type: "Bewertungstyp",
  coding_models__detail_item_criteria: "Kriterien",
  coding_models__detail_item_criteria_placeholder: "Keine Kriterien angelegt",
  coding_models__detail_item_missing_description: "Keine Beschreibung angegeben",
  coding_models__detail_maximum_score: "max. Punktzahl",
  coding_models__detail_score: "Punkte",
  coding_models__detail_score_singular: "Punkt",
  coding_models__detail_maximum_score_long: "Maximal zu erreichende Punktzahl:",
  coding_models__detail_table_placeholder: "Keine Dimensionen angelegt",
  coding_models__detail_table_item_criteria_placeholder: "Keine Bewertungskriterien angelegt",
  coding_models__create_main_dimension_title: "Hauptdimension anlegen",
  coding_models__create_main_dimension_hint: "Bitte vergeben Sie einen Titel für die neue Hauptdimension.",
  coding_models__create_main_dimension_description_placeholder:
    "Fügen Sie dieser Hauptdimension hier einen Beschreibungstext hinzu...",
  coding_models__create_sub_dimension_title: "Subdimension anlegen",
  coding_models__create_sub_dimension_description_placeholder:
    "Fügen Sie dieser Subdimension hier einen Beschreibungstext hinzu...",
  coding_models__create_sub_dimension_hint: "Bitte vergeben Sie einen Titel für die neue Subdimension.",
  coding_models__create_sub_dimension_label_parent: "Anlegen in Hauptdimension",
  coding_models__create_item_title: "Item anlegen",
  coding_models__create_item_hint: "Bitte vergeben Sie einen Titel für das neue Item.",
  coding_models__create_automated_item_hint: "Bitte wählen Sie eine automatisierte Regel für dieses Item aus.",
  coding_models__create_item_label_parent: "Anlegen in Dimension",
  coding_models__create_item_label_rating_method: "Bewertungsmethode auswählen",
  coding_models__create_item_label_rating_method_manual_title: "Manuell",
  coding_models__create_item_label_rating_method_automated_title: "Automatisiert",
  coding_models__create_item_label_rating_method_automated_title_tooltip_title: "Automatisierte Bewertungsmethode",
  coding_models__create_item_label_rating_method_automated_title_tooltip_text:
    "Die Bewertung dieses Items erfolgt automatisiert. Für alle Bewertungskriterien muss eine automatisierte Regel des zu bewertenden Inhalts angelegt werden.",
  coding_models__create_item_label_rating_method_manual_text:
    "Die Bewertung dieses Items wird von den Ratern durchgeführt. Für alle Bewertungskriterien muss eine klare Beschreibung des zu bewertenden Inhalts angelegt werden.",
  coding_models__create_item_label_rating_method_automatic_text:
    "Die Bewertung dieses Items erfolgt automatisiert. Für alle Bewertungskriterien muss eine automatisierte Regel des zu bewertenden Inhalts angelegt werden.",
  coding_models__create_item_label_rating_method_automatic_title: "Automatisiert",
  coding_models__create_item_label_rating_type: "Bewertungstyp auswählen",
  coding_models__create_item_label_rating_type_holistic_title: "Holistische Bewertung",
  coding_models__create_item_label_rating_type_holistic_text:
    "Der Bewertende entscheidet sich für genau ein Bewertungskriterium. Das ausgewählte Kriterium ergibt die Gesamtpunktzahl dieses Items.",
  coding_models__create_item_label_rating_type_analytic_text:
    "Der Bewertende oder die automatisierte Regel kann sich für mehrere Bewertungskriterien entscheiden. Alle Kriterien werden summiert und ergeben die Gesamtpunktzahl dieses Items.",
  coding_models__create_item_label_rating_type_analytic_title: "Analytische Bewertung",
  coding_models__create_item_label_rating_type_automated_title: "Automatisierte Regel",
  coding_models__create_item_label_rating_type_automated_document_view: "Dokumentenaufruf",
  coding_models__create_item_label_rating_type_automated_document_view_hint:
    "Prüfen Sie automatisiert, ob ein bestimmtes Dokument geöffnet wurde oder nicht.",
  coding_models__create_item_label_rating_type_automated_feature_usage: "Funktionsnutzung",
  coding_models__create_item_label_rating_type_automated_feature_usage_hint:
    "Prüfen Sie automatisiert, ob eine bestimmte Funktion eines Tools verwendet wurde.",
  coding_models__create_item_label_rating_type_automated_tool_usage: "Toolnutzung",
  coding_models__create_item_label_rating_type_automated_tool_usage_hint:
    "Automatisierte Prüfung nach Verwendung eines Tools.",
  coding_models__create_item_label_rating_type_automated_input_value: "Eingabewert",
  coding_models__create_item_label_rating_type_automated_input_value_hint: "Prüfung nach einem bestimmten Eingabewert.",
  coding_models__create_item_label_rating_type_automated_r_script: "R-Skript",
  coding_models__create_item_label_rating_type_automated_r_script_hint:
    "Nutzen Sie R-Skripte, um verschiedenste Daten zu prüfen.",
  coding_models__table_of_contents_item_manual: "manuell",
  coding_models__table_of_contents_item_automated: "automatisiert",
  coding_models__automated_item_input_value_position: "Ort",
  coding_models__automated_item_input_value_value: "Inhalt vorhanden",
  coding_models__automated_item_input_value_position_mail: "Ausgangsmails",
  coding_models__automated_item_input_value_position_all_mails: "E-Mails",
  coding_models__automated_item_input_value_position_notes: "Notizen Tool",
  coding_models__automated_item_input_value_choose_document_modal_title: "Dokument auswählen",
  coding_models__automated_item_input_value_choose_document_modal_mails_text:
    "Überprüfen Sie alle Ausgangsmails des Teilnehmenden nach festgelegten Inhalten.",
  coding_models__automated_item_input_value_choose_document_modal_files_and_directories_text:
    "Überprüfen Sie bestimmte Dokumente des Teilnehmenden nach festgelegten Inhalten.",
  coding_models__automated_item_input_value_choose_document_modal_notes_text:
    "Überprüfen Sie das Notizen Tool des Teilnehmenden nach festgelegten Inhalten.",
  coding_models__automated_item_input_value_choose_document_modal_notes_text_placeholder: "wert1;wert2",
  coding_models__automated_item_input_value_preview_spreadsheet_title: "Dokument (Tabellenkalkulation)",
  coding_models__automated_item_input_value_preview_spreadsheet_title_check_file: "nach Inhalten prüfen",
  coding_models__automated_item_input_value_preview_spreadsheet_title_check_file_input: "nach Eingabewerten prüfen",
  coding_models__automated_item_input_value_preview_spreadsheet_text:
    "Überprüfen Sie dieses Dokument des Teilnehmenden automatisiert nach bestimmten Inhalten.",
  coding_models__automated_item_input_value_preview_spreadsheet_text_table:
    "Überprüfen Sie automatisiert diese Tabelle des Teilnehmenden nach bestimmten Eingabewerten. Sie können die gesamte Tabelle oder eine bestimmte Zelle nach Inhalten prüfen.",
  coding_models__automated_item_input_value_preview_spreadsheet_specific_cell: "Bestimmte Zelle {{cellName}}",
  coding_models__automated_item_input_value_preview_spreadsheet_whole_table: "Gesamte Tabelle",
  coding_models__automated_item_input_value_preview_spreadsheet_specific_cell_placeholder: "Noch nicht bestimmt",
  coding_models__automated_item_input_value_preview_spreadsheet_range: "Zellbereich",
  coding_models__automated_item_document_view_column_header: "Dokument geöffnet",
  coding_models__automated_item_document_view_email_action_field: "E-Mail geöffnet",
  coding_models__automated_item_document_view_file_action_field: "Datei geöffnet",
  coding_models__automated_item_document_view_dataset_action_field: "Datensatz geöffnet",
  coding_models__automated_item_document_view_article_action_field: "Artikel geöffnet",
  coding_models__automated_item_document_view_choose_document_modal_mails:
    "Überprüfen Sie, ob bestimmte E-Mails vom Teilnehmenden geöffnet worden sind.",
  coding_models__automated_item_document_view_choose_document_modal_files_and_directories:
    "Überprüfen Sie, ob bestimmte Dateien vom Teilnehmenden geöffnet worden sind.",
  coding_models__automated_item_document_view_choose_document_modal_reference_books:
    "Überprüfen Sie, ob bestimmte Artikel vom Teilnehmenden geöffnet worden sind.",
  coding_models__automated_item_document_view_choose_document_modal_erp:
    "Überprüfen Sie, ob bestimmte Datensätze vom Teilnehmenden geöffnet worden sind.",
  coding_models__automated_item_document_view_choose_document_modal_notes:
    "Überprüfen Sie, ob bestimmte Datensätze vom Teilnehmenden geöffnet worden sind.",
  coding_models__automated_item_document_view_email_preview_selection_footer:
    "Überprüfen Sie, ob diese E-Mail vom Teilnehmenden geöffnet worden ist.",
  coding_models__automated_item_document_view_files_and_directories_selection_footer:
    "Überprüfen Sie, ob diese Datei vom Teilnehmenden geöffnet worden ist.",
  coding_models__automated_item_document_view_reference_books_selection_footer:
    "Überprüfen Sie, ob dieser Artikel vom Teilnehmenden geöffnet worden ist.",
  coding_models__automated_item_document_view_erp_selection_footer:
    "Überprüfen Sie, ob dieser Datensatz vom Teilnehmenden geöffnet worden ist.",
  coding_models__automated_item_feature_usage_table_header: "Funktion verwendet",
  coding_models__automated_item_feature_usage_feature_type_answer_mail: "E-Mail beantworten",
  coding_models__automated_item_feature_usage_feature_type_search_mails: "E-Mails durchsuchen",
  coding_models__automated_item_feature_usage_feature_type_search_reference_books: "Nachschlagewerk durchsuchen",
  coding_models__automated_item_feature_usage_feature_type_search_erp: "Tabelle durchsuchen",
  coding_models__automated_item_feature_usage_feature_type_copy: "Kopieren in die Zwischenablage",
  coding_models__automated_item_feature_usage_feature_type_paste: "Einsetzen aus der Zwischenablage",
  coding_models__automated_item_feature_usage_feature_type_formula_usage: "Formelnutzung",
  coding_models__automated_item_feature_usage_feature_type_combination_error:
    "Kombination von Tool und Funktion ungültig",
  coding_models__automated_item_r_scripts_choose_modal_title: "R-Skript zu Bewertungskriterium hinzufügen",
  coding_models__automated_item_r_scripts_choose_modal_description:
    "Nutzen Sie R-Skripte, um verschiedenste Daten zu prüfen.",
  coding_models__automated_item_r_scripts_choose_modal_search_placeholder: "R-Skripte filtern",
  coding_models__automated_item_r_scripts_choose_modal_search_empty: "Keine R-Skripte zum Hinzufügen vorhanden",
  coding_models__automated_item_r_scripts_choose_modal_search_empty_text:
    "Erstellen Sie ein R-Skript oder passen Sie den Filter an.",
  coding_models__automated_item_r_scripts_column_header: "R-Skript",
  coding_models__automated_item_r_scripts_edit_content_description:
    "Nutzen Sie R-Skripte, um verschiedenste Daten zu prüfen.",
  coding_models__automated_item_r_scripts_edit_content_selected_script_label: "Ausgewähltes R-Skript",

  // Coding Item Update
  coding_item_update__title_type: "Bewertungstyp bearbeiten",
  coding_item_update__title_method: "Bewertungsmethode bearbeiten",
  coding_item_update__description_type: "Der Bewertungstyp gibt an, wie die Bewertungskriterien ausgewertet werden.",
  coding_item_update__description_method:
    "Die Bewertungsmethode gibt an, ob dieses Item manuell von einem Rater oder automatisiert über festgelegte Regeln bewertet werden soll.",
  coding_item_update__selection_label_type: "Bewertungstyp auswählen",
  coding_item_update__selection_label_method: "Bewertungsmethode auswählen",
  coding_item_update__selection_card_type_holistic_label: "Holistische Bewertung",
  coding_item_update__selection_card_type_analytical_label: "Analytische Bewertung",
  coding_item_update__selection_card_type_holistic_description:
    "Der Bewertende entscheidet sich für genau ein Bewertungskriterium. Das ausgewählte Kriterium ergibt die Gesamtpunktzahl dieses Items.",
  coding_item_update__selection_card_type_analytical_description:
    "Der Bewertende oder die automatisierte Regel kann sich für mehrere Bewertungskriterien entscheiden. Alle Kriterien werden summiert und ergeben die Gesamtpunktzahl dieses Items.",
  coding_item_update__selection_card_method_manual_label: "Manuell",
  coding_item_update__selection_card_method_automatic_label: "Automatisiert",
  coding_item_update__selection_card_method_manual_description:
    "Die Bewertung dieses Items wird von den Ratern durchgeführt. Für alle Bewertungskriterien muss eine klare Beschreibung des zu bewertenden Inhalts angelegt werden.",
  coding_item_update__selection_card_method_automatic_description:
    "Die Bewertung dieses Items erfolgt automatisiert. Für alle Bewertungskriterien muss eine automatisierte Regel des zu bewertenden Inhalts angelegt werden.",

  // Coding Criteria
  coding_criteria__edit_title: "Bewertungskriterien bearbeiten",
  coding_criteria__item_meta_data_label: "Item",
  coding_criteria__item_meta_data_title: "Titel",
  coding_criteria__item_meta_data_method: "Bewertungsmethode",
  coding_criteria__item_meta_data_method_manual: "Manuell",
  coding_criteria__item_meta_data_method_automatic: "Automatisch",
  coding_criteria__item_meta_data_type: "Bewertungstyp",
  coding_criteria__item_meta_data_type_holistic: "Holistische Bewertung",
  coding_criteria__item_meta_data_type_analytical: "Analytische Bewertung",
  coding_criteria__item_meta_data_automated_rule: "Automatisierte Regel",
  coding_criteria__item_meta_data_description: "Beschreibung",
  coding_criteria__criterion_list_label: "Bewertungskriterien ({{count}})",
  coding_criteria__criterion_create_button: "Bewertungskriterium anlegen",
  coding_criteria__criterion_list_description_placeholder: "Keine Beschreibung angegeben",
  coding_criteria__criterion_list_score: "{{score}} Punkte",
  coding_criteria__criterion_list_score_singular: "{{score}} Punkt",
  coding_criteria__criterion_list_placeholder: "Keine Bewertungskriterien vorhanden",
  coding_criteria__criterion_edit_title: "Bewertungskriterium",
  coding_criteria__criterion_edit_placeholder_label_main: "Kein Bewertungskriterium ausgewählt",
  coding_criteria__criterion_edit_placeholder_label_sub:
    "Bitte wählen Sie ein Bewertungskriterium auf der linken Seite aus.",
  coding_criteria__criterion_scoring_label: "Punktzahl für dieses Bewertungskriterium",
  coding_criteria__criterion_scoring_label_default: "Punktzahl",
  coding_criteria__criterion_scoring_label_holistic: "Punktzahl (Holistische Bewertung)",
  coding_criteria__criterion_scoring_label_analytical: "Punktzahl (Analytische Bewertung)",
  coding_criteria__criterion_scoring_description:
    "Der Bewertende oder die automatisierte Regel entscheidet sich für genau ein Bewertungskriterium. Das ausgewählte Kriterium ergibt die Gesamtpunktzahl dieses Items.",
  coding_criteria__criterion_scoring_description_holistic:
    "Der Bewertende entscheidet sich für genau ein Bewertungskriterium. Das ausgewählte Kriterium ergibt die Gesamtpunktzahl dieses Items.",
  coding_criteria__criterion_scoring_input_label: "Punkte",
  coding_criteria__criterion_description_label: "Beschreibung",
  coding_criteria__automated_criterion_tool_usage_column: "Tool verwendet",

  // Scenario
  scenario_title: "Szenario",
  scenario_create_scenario: "Neues Szenario anlegen",
  scenario__filter_title: "Szenarien",
  scenario__overlay_update_description: "Beschreibung des Szenarios",
  scenario_create_scenario_category_placeholder: "Kategorie hinzufügen",
  scenario_create_scenario_title_placeholder: "Titel hinzufügen",
  scenario_create_scenario_description_placeholder: "Szenariobeschreibenden Text hier eingeben...",
  scenario_create_scenario_description_label: "Szenariobeschreibung",

  // Scenario Detail
  scenario_details__button_create: "Anlegen",
  scenario_details__button_show: "Anzeigen",
  scenario_details__button_invite: "Einladen",
  scenario_details__available: "Vorhanden",
  scenario_details__unavailable: "Nicht vorhanden",
  scenario_details__header_label: "Szenario",
  scenario_details__header_navigate_back_label: "Szenarioauswahl",
  scenario_details__header_button_finalize: "Szenario versiegeln",

  scenario_details__header_button_is_finalized: "Szenario bereits versiegelt",
  scenario_details__header_button_finalize_tooltip:
    "Das Szenario wird versiegelt und kann nicht weiter editiert werden",
  scenario_details__header_button_duplicate: "Szenario duplizieren",
  scenario_details__header_orly_finalize_title: "Versiegeln des Szenarios",
  scenario_details__header_orly_finalize_button: "Versiegeln",
  scenario_details__header_orly_finalize_text:
    "Möchten Sie das Szenario wirklich versiegeln? Danach sind keine Änderungen am Szenario mehr möglich.",
  scenario_details__header_button_publish_tooltip:
    "Das Szenario wird veröffentlicht und kann nicht weiter editiert werden",
  scenario_details__header_orly_publish_title: "Veröffentlichen des Szenarios",
  scenario_details__header_orly_publish_button: "Veröffentlichen",
  scenario_details__header_orly_publish_text:
    "Möchten Sie das Szenario wirklich veröffentlichen? Danach sind keine Änderungen am Szenario mehr möglich.",
  scenario_details__header_button_publish: "Szenario veröffentlichen",
  scenario_details__header_tooltip_missing_mail: "Eröffnungsmail nicht vorhanden",
  scenario_details__header_tooltip_missing_time: "Bearbeitungszeit nicht angegeben",
  scenario_details__header_tooltip_missing_dimension: "Fehlerhafte Kodieranweisung: Keine Dimension vorhanden",
  scenario_details__header_tooltip_missing_item:
    "Fehlerhafte Kodieranweisung: Jede Dimension muss mindestens ein Item beinhalten",
  scenario_details__header_tooltip_missing_criteria:
    "Fehlerhafte Kodieranweisung: Jedes Item muss mindestens ein Kriterium beinhalten",
  scenario_details__header_tooltip_missing_criteria_holistic:
    "Fehlerhafte Kodieranweisung: Jedes holistisch bewertete Item muss mindestens zwei Kritierien beinhalten",
  scenario_details__header_button_copy: "Szenario kopieren",
  scenario_details__placeholder_not_found: "Es konnte kein Szenario gefunden werden",
  scenario_details__general_information_label: "Allgemeine Szenarioinformationen",
  scenario_details__general_information_scenario_description_edit: "Beschreibung bearbeiten",
  scenario_details__general_tags: "Tags",
  scenario_details__general_tags_edit: "Tags bearbeiten",
  scenario_details__general_tags_description: "Bitte geben Sie alle gewünschten Tags getrennt mit einem Semikolon an.",
  scenario_details__general_tags_placeholder_example: "Beispiel: Tag1; Tag2;...",
  scenario_details__general_email: "Eröffnungsmail",
  scenario_details__general_all_files: "Alle Dateien",
  scenario_details__general_contributors: "Mitwirkende",
  scenario_details__settings_label: "Szenarioeinstellungen",
  scenario_details__settings_label_sample_company: "Modellunternehmen",
  scenario_details__settings_sample_company_description:
    "Fügen Sie dem Szenario ein Modellunternehmen hinzu, welches das Unternehmen dieses Szenarios beschreibt.",
  scenario_details__settings_label_emails: "E-Mails definieren",
  scenario_details__settings_label_emails_finalized: "E-Mails",
  scenario_details__settings_emails_description:
    "E-Mails übermitteln die Aufgabe und werden im Verlauf der Aufgabe zugestellt. Erstellen und bearbeiten Sie die E-Mails für Ihr Szenario.",
  scenario_details__settings_label_files_and_directories: "Ordner und Dateien",
  scenario_details__settings_label_files_and_directories_only_spreadsheet: "Tabellenkalkulationen",
  scenario_details__settings_files_and_directories_description:
    "Alle direkt zugänglichen Ordner und Dokumente können hier angelegt und verwaltet werden.",
  scenario_details__settings_label_reference_books: "Nachschlagewerke",
  scenario_details__settings_reference_books_description:
    "Fügen Sie dem Szenario Nachschlagewerke hinzu, welche während der Durchführung des Szenarios zur Hilfe genommen werden können.",
  scenario_details__settings_label_interventions: "Interventionen",
  scenario_details__settings_interventions_description:
    "Automatisiertes Versenden von Hilfestellungen bei nicht Öffnen vordefinierter Dokumente.",
  scenario_details__settings_label_instructions: "Kodieranweisung",
  scenario_details__settings_instructions_description:
    "Legen Sie hier alle Bewertungskriterien und die zugehörigen Punktzahlen für die Bewertung fest.",
  scenario_details__settings_label_events: "Ereignisse",
  scenario_details__settings_events_description:
    "Fügen Sie dem Szenario Ereignisse hinzu, welche während der Durchführung des Szenarios zu einem bestimmten Zeitpunkt erscheinen.",
  scenario_details__settings_card_footer_label_files: "{{filesCount}} Dateien",
  scenario_details__settings_card_footer_label_mails: "Mails",
  scenario_details__settings_card_footer_label_directories: "Ordner",
  scenario_details__settings_card_footer_label_reference_books: "Nachschlagewerke",
  scenario_details__settings_card_footer_label_interventions: "Interventionen",
  scenario_details__settings_card_footer_label_dimensions: "Dimensionen",
  scenario_details__settings_card_footer_label_criteria: "Kriterien",
  scenario_details__settings_card_footer_label_events: "Ereignisse",
  scenario_details__settings_footer_label_preview: "Vorschau",
  scenario_details__duplicate_success: "Das Szenario wurde erfolgreich dupliziert.",
  scenario_details__edit_duration_modal_label: "Bearbeitungszeit dieses Szenarios",
  scenario_details__edit_duration_modal_title: "Bearbeitungszeit bearbeiten",
  scenario_details__edit_duration_modal_error_text:
    "{{entity}} liegt außerhalb dieser Zeitangabe ({{durationInMinutes}} min)",
  scenario_details__edit_duration_modal_error_text_maximum_duration: "Angabe außerhalb des gültigen Zeitraumes",
  scenario_details__edit_duration_modal_text:
    "Die Bearbeitungszeit gibt an, wie lange die Teilnehmenden für dieses Szenario maximal benötigen dürfen. Bitte beachten Sie, dass alle Elemente dieses Szenarios, wie E-Mails oder Ereignisse mit Zeitangaben sich innerhalb dieser Bearbeitungszeit befinden müssen.",
  scenario_details__users_invite: "Mitwirkende einladen",
  scenario_details__users_invite_help_text:
    "Sie können alle Mitwirkenden gebündelt einladen. Bitte geben Sie hierzu alle gewünschten E-Mail-Adressen getrennt mit einem Semikolon an.",
  scenario_details__actual_date: "reales Datum",
  scenario_details__fictive_date: "fiktives Datum",
  scenario_details__date: "Durchführungsdatum",
  scenario_details__date_edit: "Durchführungsdatum bearbeiten",
  scenario_details__date_edit_modal_text:
    "Die Zeitangaben des Szenarios können sich auf dem Tag der Durchführung oder auf einen fiktiven Tag beziehen.",
  scenario_details__date_edit_modal_actual_date:
    "Alle Zeitpunkte der angelegten E-Mails und die Datumsanzeige für den Teilnehmenden beziehen sich auf das tatsächliche Datum der Durchführung des Szenarios.",
  scenario_details__date_edit_modal_fictive_date:
    "Das Szenario wird an einem fiktiven Datum durchgeführt. Alle Zeitpunkte der angelegten E-Mails und die Datumsanzeige beziehen sich auf den ausgewählten Tag.",

  // Scenario Preview
  scenario_preview__header_label: "Szenariovorschau: {{name}}",
  scenario_preview__back_button_label: "Vorschau abbrechen",

  // Scenario Snapshot Overlay
  scenario_snapshot_overlay__header_label: "Szenario: {{name}}",

  // Scenario Sample Companies
  scenario_sample_companies__settings_relevance_label: "Relevanz",
  scenario_sample_companies__settings_relevance_description:
    "Relevanzkriterien erleichtern die Überprüfung der Teilnehmenden während der Bearbeitung des Szenarios. Legen Sie fest, wie wichtig dieses Dokument zur Lösung der Aufgabe ist.",
  scenario_sample_companies__settings_intervention_label: "Intervention",
  scenario_sample_companies__settings_intervention_description:
    "Eine Intervention ist eine automatische Hilfestellung. Wählen Sie die Art der Hilfestellung, wenn dieses Dokument nicht vom Teilnehmenden betrachtet wird.",
  scenario_sample_companies__settings_intervention_placeholder: "keine",
  scenario_sample_companies__none_added: "Kein Modellunternehmen hinzugefügt",
  scenario_sample_companies__no_signature: "Modellunternehmen besitzt keine E-Mail-Signatur",
  scenario_sample_companies__add_signature: "E-Mail-Signatur einfügen",
  scenario_sample_companies__add_signature_text:
    "Fügen Sie die im Modellunternehmen angelegte E-Mail-Signatur zum Inhalt dieser E-Mail hinzu.",
  scenario_sample_companies__add_signature_company_placeholder: "Kein Modellunternehmen hinzugefügt",

  // Relevance
  relevance__irrelevant: "Irrelevant",
  relevance__required: "Erforderlich",
  relevance__potentially_helpful: "Potentiell hilfreich",
  relevance__dropdown_placeholder: "Filtern nach",
  relevance__all_documents: "Alle Dokumente",

  // Email
  email__header_label: "E-Mails definieren",
  email__create_email: "Neue E-Mail anlegen",
  email__directory: "Ablageort",
  email__directory_sender: "Absender",
  email__directory_recipient: "Empfänger",
  email__directory_sender_edit: "Absender bearbeiten",
  email__directory_recipient_edit: "Empfänger bearbeiten",
  email__directory_inbox: "Eingang",
  email__directory_draft: "Entwürfe",
  email__directory_sent: "Ausgang",
  email__directory_trash: "Papierkorb",
  email__cc_label: "CC",
  email__cc_label_edit: "CC bearbeiten",
  email__cc_edit_description: "Bitte geben Sie alle gewünschten E-Mail-Adressen getrennt mit einem Semikolon an.",
  email__cc_placeholder_example: "Beispiel: max-mustermann@mail.de; marianne-mustermann@mail.de;...",
  email__create: "E-Mail anlegen",
  email__create_placeholder: "max-mustermann@mail.de",
  email__create_hint:
    "Zum Anlegen einer neuen E-Mail füllen Sie bitte die gewünschten Pflichtinformationen aus. Diese können Sie nachträglich jederzeit bearbeiten:",
  email__status_read: "gelesen",
  email__status_unread: "ungelesen",
  email__introduction_email_label: "Eröffnungsmail",
  email__introduction_email_label_defined: "Eröffnungsmail (vorhanden)",
  email__introduction_email_label_not_defined: "Eröffnungsmail (nicht vorhanden)",
  email__introduction_email_info:
    "Geben Sie hier eine ausführliche Aufgabenstellung des Szenarios und die Empfängeradresse der Abschlussmail an.",
  email__intervention_email_label: "Interventions-E-Mail",
  email__intervention_email_delete_tooltip: "Löschen nur in Interventionsübersicht möglich",
  email__intervention_email_delete_tooltip_email_has_intervention_error: "Löschen nur ohne Interventionen möglich",
  email__intervention_email_position_label: "Position dieser Interventions-E-Mail",
  email__intervention_email_position_description:
    "Diese E-Mail wird nur versendet, wenn die Auslösebedingung, welche an folgender Position als Intervention angelegt wurde, zutrifft.",
  email__intervention_email_button_label: "Interventionsübersicht",
  email__intervention_email_no_subject_placeholder: "Kein Betreff angegeben",
  email__placeholder: "Keine E-Mails vorhanden",
  email__placeholder_not_found_title: "Keine E-Mail ausgewählt",
  email__placeholder_not_found: "Bitte wählen Sie eine E-Mail aus.",
  email__placeholder_loading: "Lade E-Mail...",
  email__title_delete_introduction: "Die Eröffnungsmail kann nicht gelöscht werden",
  email__additional_settings: "Zusätzliche Einstellungen",
  email__completion_email_setting: "Empfängeradresse der Abschlussmail",
  email__completion_email_text:
    "Geben Sie hier die gewünschte Empfängeradresse für die Beantwortung der Aufgabenstellung an. Mit dem Versenden einer E-Mail an diese Adresse schließen Teilnehmende das Szenario ab. Achten Sie darauf, dass diese Adresse in der Aufgabenstellung vermerkt wurde.",
  email__relevance_label: "Relevanz",
  email__relevance_text:
    "Relevanzkriterien erleichtern die Überprüfung der Teilnehmenden während der Bearbeitung des Szenarios. Legen Sie fest, wie wichtig dieses Dokument zur Lösung der Aufgabe ist.",
  email__intervention_label: "Interventionen",
  email__intervention_text:
    "Eine Intervention ist eine automatische Hilfestellung. Wählen Sie die Art der Hilfestellung, wenn dieses Dokument nicht vom Teilnehmenden betrachtet wird.",
  email__intervention_placeholder: "Keine Intervention vorhanden",
  email__intervention_button_create: "Anlegen",
  email__reception_delay_label_inbox: "Verfügbar nach:",
  email__reception_delay_label_sent: "Versendet vor:",
  email__reception_delay_button_edit: "Bearbeiten",
  email__reception_delay_edit_label: "Versendezeitpunkt der E-Mail bearbeiten",
  email__reception_delay_choose_time_label: "Zeitform auswählen",
  email__reception_delay_choose_time_past: "Vergangenheit",
  email__reception_delay_choose_time_past_hint:
    "Die E-Mail wurde vor der Bearbeitung des Szenarios versendet/empfangen.",
  email__reception_delay_choose_time_present: "Gegenwart (sofort)",
  email__reception_delay_choose_time_present_hint:
    "Die E-Mail wird unmittelbar nach Start des Szenarios empfangen/versendet.",
  email__reception_delay_choose_time_future: "Zukunft",
  email__reception_delay_choose_time_future_hint:
    "Die E-Mail wird während der Bearbeitung (innerhalb der Szenario Bearbeitungszeit {{durationInMinutes}} min) versendet.",
  email__marker_label: "Markierung",
  email__cc_recipients_placeholder: "Nicht angelegt",
  email__subject_label: "Betreff",
  email__subject_placeholder: "Bitte hier einen Betreff eingeben...",
  email__message_label: "Inhalt der E-Mail",
  email__message_placeholder: "Bitte hier den Inhalt der E-Mail eingeben...",
  email__message_dialog_title: "Inhalt der E-Mail bearbeiten",
  email__message_dialog_sample_company: "E-Mail-Signatur des Modellunternehmens einfügen",
  email__message_insert_user_information_label: "Nutzerinformationen einfügen",
  email__message_insert_user_information_description:
    "Um die Teilnehmenden individuell anzusprechen, können Sie hier die gewünschten Nutzerinformationen einfügen.",
  email__files_placeholder: "Keine Dateien vorhanden",
  email__files_placeholder_error: "Datei nicht gefunden",
  email__files_label: "Anhänge",
  email__files_tooltip:
    "Fügen Sie den E-Mails verschiedenste Dateien als Anhänge hinzu. Diese finden Teilnehmende nach dem Herunterladen im Download-Ordner des Ordner- und Dateien-Tools.",
  email__files_table_column_file: "Datei",
  email__files_table_column_relevance: "Relevanz",
  email__files_table_column_classification: "Klassifikation",
  email__delay_instruction:
    "Bestimmen Sie, ob diese E-Mail in der Vergangenheit, Gegenwart oder Zukunft versendet wurde und geben Sie den gewünschten Versendezeitpunkt an.",
  email__delay_instruction_past_only:
    "Sie können den Empfangszeitpunkt dieser E-Mail in der Vergangenheit (vor Szenariobeginn) einstellen. Nur E-Mails im Posteingang können als zukünftige E-Mail festgelegt werden",
  email__past_email: "Vergangene E-Mail",
  email__future_email: "Zukünftige E-Mail",
  email__past_label: "Versendet vor (vergangene E-Mail):",
  email__future_label: "Versendet nach (zukünftige E-Mail):",
  email__present_label: "Versendet nach (sofortige E-Mail):",
  email__past_email_instruction: "Angabe bitte als ganze Zahl.",
  email__future_email_instruction:
    "Angabe als ganze Zahl. Bearbeitungszeitraum ({{timeMin}} min) darf nicht überschritten werden.",
  email__future_email_error: "Zeitpunkt liegt außerhalb des Bearbeitungszeitraums",
  email__future_email_error_before_email_available: "Zeitpunkt liegt vor der Verfügbarkeit der E-Mail",
  email__unavailable: "nicht vorhanden",
  email__completion_receiver_edit: "Empfängeradresse der Abschlussmail bearbeiten",
  email__completion_delay_label: "direkt verfügbar (Eröffnungsmail)",

  // Validation
  validation__required: "Pflichtfeld",
  validation__email_format: "Ungültiges E-Mail-Format",
  validation__email_delay: "Zeitpunkt liegt außerhalb des Bearbeitungszeitraums",
  validation__email_delay_max_error: "Maximaler Bearbeitungszeitraum überschritten",
  validation__email_delay_intervention_email:
    "Zeitpunkt darf den Prüfungszeitpunkt der zugehörigen Intervention nicht überschreiten",
  validation__event_delay: "Bereits verwendet oder außerhalb des Bearbeitungszeitraums",

  // Creation Status
  creation_status: "Status",
  creation_status__not_created: "noch nicht angelegt",
  creation_status__created: "angelegt",
  creation_status__unpublished: "nicht veröffentlicht",
  creation_status__published: "veröffentlicht",

  // Sample Company Detail View
  sample_company_details__placeholder_not_found: "Es konnte kein Modellunternehmen gefunden werden",
  sample_company_details__create_directory_modal_title: "Neuen Hauptordner hinzufügen",
  sample_company_details__create_sub_directory_modal_title: "Neuen Unterordner hinzufügen",
  sample_company_details__directory_label: "{{name}} (Hauptordner)",
  sample_company_details__intro_suffix: "Intro",
  sample_company_details__intro_hint: "Diese Datei ist als Unternehmensintro angelegt.",
  sample_company_details__logo_suffix: "Logo",
  sample_company_details__logo_hint: "Diese Datei ist als Unternehmenslogo angelegt.",

  // My Account / Edit Profile
  account__headline: "Mein Konto",
  account__language: "Sprache",
  account__hint: "Hier können Sie die persönlichen Daten ihres Benutzerkontos einsehen und bearbeiten.",
  account__field_name: "Name",
  account__field_firstname: "Vorname",
  account__field_surname: "Nachname",
  account__field_email: "E-Mail",
  account__field_password: "Passwort",
  account__field_roles: "Rechte",
  account__field_organization: "Organisation",
  account__field_salutation: "Wie möchten Sie angesprochen werden?",
  account__placeholder_organization: "<Name der Organisation>",
  account__dialog_name: "Name bearbeiten",
  account__dialog_organization: "Organisation bearbeiten",

  // Password Reset Modal
  password_reset__title: "Passwort vergessen?",
  password_reset__confirm_button: "Bestätigungslink anfordern",
  password_reset__new_password: "Neues Passwort",
  password_reset__new_password_title: "Neues Passwort festlegen",
  password_reset__new_password_repeat: "Neues Passwort erneut eingeben",
  password_reset__reset_confirm_button: "Jetzt neues Passwort anlegen",
  password_reset__mail_success:
    "Eine E-Mail mit Anweisungen zum Zurücksetzen des Passworts wurde an die gewählte Adresse versendet.",
  password_reset__success: "Das Passwort wurde erfolgreich geändert",

  // Projects
  projects__create_project: "Projekt erstellen",
  project__filter_title: "Projekte",
  project_create_project: "Projekt erstellen",
  project_create_project_name_placeholder: "Name des Projekts",
  project_create_project_description_label: "Projektbeschreibung",
  project_create_project_description_placeholder: "Beschreibungstext zum Projekt hier eingeben...",
  project_title_surveys: "Erhebungen",
  project_title_survey: "Erhebung",
  project_title_test_surveys: "Probeerhebungen",
  project_title_test_survey: "Probeerhebung",

  // Project Detail
  projects__header_details_label: "Projekt",
  projects__detail_header_navigate_back_label: "Projektauswahl",
  projects__detail_header_general_info: "Allgemeine Projektinformationen",
  projects__detail_no_project: "Das gewählte Projekt existiert nicht",
  projects__detail_time_label: "Bearbeitungszeit",
  projects__detail_status_label: "Status",
  projects__overlay_update_description: "Beschreibung des Projekts",
  projects__overlay_label_target: "Zielgruppe",
  projects__overlay_label_welcome_field: "Willkommenstext",
  projects__overlay_label_welcome_field_content: "Inhalt des Willkommenstexts",
  projects__overlay_label_welcome_field_placeholder:
    "Bitte hier den Inhalt des Willkommenstext für dieses Projekt eingeben.",
  projects__overlay_label_welcome_headline: "Willkommenstext bearbeiten",
  projects__overlay_label_welcome_headline_finalized: "Willkommenstext",
  projects__overlay_label_welcome_description:
    "Der Willkommenstext dient als Einleitung für ein Projekt und wird unmittelbar vor dem ersten Projektmodul angezeigt. Nutzen Sie den Willkommenstext, um den Teilnehmenden eine kurze Einleitung zu dem gesamten Projekt zu übermitteln.",
  projects__overlay_label_usage_field: "Einsatzbereich",
  projects__overlay_placeholder_target: "Zielgruppen durch Komma getrennt",
  projects__overlay_target: "Zielgruppe bearbeiten",
  projects__overlay_usage_field: "Einsatzbereich auswählen",
  projects__usage_field_Other: "Andere",
  projects__usage_field_Company: "Unternehmen",
  projects__usage_field_Research: "Forschung",
  projects__usage_field_School: "Schule",
  projects__usage_field_Demonstration: "Demonstration",

  // Project Detail lists
  projects__scenarios_title: "Projektmodule ({{count}})",
  projects__scenarios_card_title: "Gesamtzeit des Projekts",
  projects__scenarios_add: "Neues Projektmodul hinzufügen",
  projects__scenarios_actions_disabled_tooltip: "Änderungen nur ohne Erhebung möglich",
  projects__scenarios_add_scenario_text:
    "Mithilfe von Szenarien können die Teilnehmenden anhand einer Bürosimulation getestet werden.",
  projects__scenarios_add_questionnaire_text:
    "Mithilfe von Fragebögen können die Teilnehmenden anhand einer Fragenfolge getestet werden.",
  projects__scenarios_placeholder_title: "Kein Projektmodul vorhanden.",
  projects__scenarios_placeholder_text:
    "Fügen Sie hier die gewünschten Projektmodule, die für die Bearbeitung dieses Projekts notwendig sind, hinzu.",
  projects__scenarios_placeholder_button: "Zu den Projektmodulen",
  projects__scenarios_module_placeholder_button: "Projektmodul hinzufügen",
  projects__surveys_card_title: "Erhebungen ({{count}})",
  projects__test_surveys_card_title: "Probeerhebungen ({{count}})",
  projects__surveys_placeholder_text:
    "Um Erhebungen zu erstellen, muss mindestens ein Projektmodul und der Willkommenstext vorhanden sein. Außerdem darf sich kein Projektmodul in Bearbeitung befinden.",
  projects__test_surveys_placeholder_text:
    "Um Probeerhebungen zu erstellen, muss mindestens ein Projektmodul und der Willkommenstext vorhanden sein.",
  projects__test_surveys_placeholder_text_enabled: "Erstellen Sie jetzt eine Probeerhebung.",
  projects__surveys_placeholder_text_enabled: "Erstellen Sie jetzt eine Erhebung.",
  projects__surveys_placeholder_title: "Keine Erhebung vorhanden.",
  projects__test_surveys_placeholder_title: "Keine Probeerhebung vorhanden.",
  projects__surveys_add: "Erhebung erstellen",
  projects__surveys_add_test_survey: "Probeerhebung erstellen",
  projects__surveys_modules: "Zu den Projektmodulen",
  projects__surveys_table_title: "Titel",
  projects__surveys_table_condition: "Teilnahmebedingung",
  projects__surveys_table_open_participation: "Offene Teilnahme",
  projects__surveys_table_open_participation_text:
    "Die Teilnahme ist über einen Link für alle zugänglich. Ein Zugangscode ist nicht erforderlich.",
  projects__surveys_table_closed_participation: "Geschlossene Teilnahme",
  projects__surveys_table_closed_participation_text:
    "Die Teilnahme ist nur per Einladung möglich. Eingeladene Nutzer erhalten einen Zugangscode per E-Mail.",
  projects__surveys_table_condition_auto: "automatisch",
  projects__surveys_table_condition_manual: "manuell (synchron)",
  projects__surveys_table_participants: "Teilnehmende",
  projects__surveys_table_participants_count: "Teilnehmende ({{count}})",
  projects__surveys_table_participants_column: "{{participants}} von {{invites}}",
  projects__surveys_table_participants_column_tooltip: "{{participants}} abgeschlossen, {{invites}} eingeladen",
  projects__surveys_table_status: "Status",
  projects__surveys_table_status_complete: "Abgeschlossen",
  projects__surveys_table_status_incomplete: "Zukünftig",
  projects__surveys_delete: "Erhebung löschen",
  projects__modules_sort_title: "Projektmodule sortieren",
  projects__modules_delete: "Projektmodul löschen",
  projects__users_invite: "Mitwirkende einladen",

  // Project scenario selection
  projects__scenario_label_already_assigned: "Bereits in Szenarioliste",
  projects__scenario_label_selected: "Ausgewählt",
  projects__scenario_header_label: "Projektmodule hinzufügen",
  projects__scenario_header_action_label: "Szenarien hinzufügen",
  projects__scenario_header_action_label_count: "Szenarien hinzufügen ({{count}})",
  projects__scenario_detail_header_label: "Szenarioübersicht",
  projects__scenario_detail_navigate_back_label: "Szenarioauswahl",

  // Project questionnaire selection
  projects__questionnaire_label_already_assigned: "Bereits in Fragebogenliste",
  projects__questionnaire_label_selected: "Ausgewählt",
  projects__questionnaire_header_label: "Projektmodule hinzufügen",
  projects__questionnaire_header_action_label: "Fragebögen hinzufügen",
  projects__questionnaire_header_action_label_count: "Fragebögen hinzufügen ({{count}})",
  projects__questionnaire_detail_header_label: "Fragebogenübersicht",
  projects__questionnaire_detail_navigate_back_label: "Fragebogenauswahl",
  projects__questionnaire_detail_header_action_label: "Auf die Merkliste setzen",

  // Project surveys
  projects__surveys_creation_orly_title: "Erhebungen erstellen",
  projects__surveys_creation_orly_text:
    "Sobald ein Projekt Erhebungen enthält, können keine Änderungen in dem Projekt mehr vorgenommen werden. Sind Sie sicher, dass Sie eine Erhebung erstellen möchten?",
  projects__surveys_creation_orly_confirm: "Erstellen",
  projects__surveys_creation_form_title: "Neue Erhebung anlegen",
  projects__surveys_test_creation_form_title: "Neue Probeerhebung anlegen",
  projects__surveys_creation_form_hint:
    "Zum Anlegen einer neuen Erhebung füllen Sie bitte die gewünschten Pflichtinformationen aus. Diese können Sie nachträglich jederzeit bearbeiten:",
  projects__surveys_title_label: "Titel",
  projects__surveys_description_label: "Beschreibung",
  projects__surveys_start_label: "Start",
  projects__surveys_end_label: "Ende",
  projects__surveys_progress_section_label: "Erhebungsablauf",
  projects__surveys_progress_manual_label: "manueller Start der Erhebung",
  projects__surveys_progress_manual_hint:
    "Die Erhebung kann nach Erstellung vom Versuchsleiter zu einem freien Zeitpunkt gestartet werden. Bitte wählen Sie aus, ob die Teilnehmer die Erhebung synchronisiert oder asynchron durchführen sollen:",
  projects__surveys_progress_automatic_label: "automatischer Start der Erhebung",
  projects__surveys_progress_automatic_hint:
    "Die Erhebung wird nach Erstellung in Ihrem gewünschten Zeitraum durchgeführt.",
  projects__surveys_trigger_asynchronous_label: "Asynchroner Ablauf (Teilnehmer steuert Ablauf selbst)",
  projects__surveys_trigger_asynchronous_hint:
    "Alle Teilnehmer können den Projektablauf selbst steuern und Szenarien oder andere Projektelemente vorzeitig (innerhalb der Bearbeitungszeit) beenden. Folgeszenarien oder Fragebögen können demnach direkt gestartet werden.",
  projects__surveys_progress_manual_asynchronous_label: "Asynchroner Ablauf (Teilnehmender steuert Ablauf selbst)",
  projects__surveys_progress_manual_asynchronous_hint:
    "Alle Teilnehmer können den Projektablauf selbst steuern und Szenarien oder andere Projektelemente vorzeitig (innerhalb der Bearbeitungszeit) beenden. Folgeszenarien oder Fragebögen können demnach direkt gestartet werden.",
  projects__surveys_progress_manual_synchronous_label: "Synchroner Ablauf (Versuchsleiter steuert Ablauf)",
  projects__surveys_progress_manual_synchronous_hint:
    "Der Projektablauf wird vom Versuchsleiter vorgegeben. Teilnehmende können Projektelemente vorzeitig (innerhalb der Bearbeitungszeit) beenden. Folgeszenarien oder Fragebögen können jedoch erst gestartet werden, wenn der Versuchsleiter diese für alle Teilnehmer freigibt.",

  // Project Module
  project_module__create_module_title: "Weiteres Modul hinzufügen",
  project_module__create_scenario_label: "Szenario",
  project_module__create_questionnaire_label: "Fragebogen",

  // Survey Detail
  projects__survey_details_header_label: "Erhebung",
  projects__survey_details_header_navigate_back_label: "Projekt",
  projects__survey_details_header_general_info: "Allgemeine Erhebungsinformationen",
  projects__survey_details_no_survey: "Die gewählte Erhebung existiert nicht",
  projects__survey_details_settings_label: "Durchführungseinstellungen",
  projects__survey_details_data: "Downloads",
  projects__survey_details_media: "Medien",
  projects__survey_details_media_tooltip: "Alle externen Dateien, die in diesem Projekt verwendet werden.",
  projects__survey_details_survey_data: "Erhebungsdaten",
  projects__survey_details_survey_data_tooltip:
    "Die Erhebungsdaten aller Teilnehmenden, bereitgestellt im JSON-Format.",
  projects__survey_details_data_description: "Laden Sie sich hier alle Daten dieser Erhebung herunter.",
  projects__survey_details_data_button: "Download aller Datensätze",
  projects__survey_details_data_tooltip_title: "Hinweis zu Datensätzen aus Probeerhebungen",
  projects__survey_details_data_tooltip_text:
    "Referenzen in den Daten können möglicherweise nicht aufgelöst werden, falls die Projektmodule und deren Abhängigkeiten nach der Probeerhebung verändert worden sind.",
  projects__survey_details_data_download_modal_title: "Hinweis zum Download der Datensätze",
  projects__survey_details_data_download_modal_button: "Daten herunterladen",
  projects__surveys_details_participation_label: "Teilnahmeberechtigung",
  projects__surveys_details_progress_label: "Erhebungsablauf",
  projects__survey_overlay_anon_participation_auth: "Berechtigung",
  projects__survey_overlay_anon_participation_auth_tooltip:
    "Eine anonyme Teilnahme erlaubt es, ohne Registrierung mit frei wählbaren Nutzerdaten an der Erhebung teilzunehmen.",
  projects__survey_overlay_anon_participation_label: "Anonymes Teilnehmen erlauben",
  projects__survey_overlay_open_participation: "Offene Teilnahme",
  projects__survey_overlay_closed_participation: "Geschlossene Teilnahme",
  projects__survey_overlay_anonym_participation: "Anonym erlaubt",
  projects__survey_overlay_timerange_label: "Bearbeitungszeitraum",
  projects__surveys_details_participation_registered: "Nur registrierte Benutzer erlauben",
  projects__surveys_details_participants_label: "Einladungsliste",
  projects__surveys_details_participants_value: "{{count}} Teilnehmende",
  projects__surveys_details_participants_link: "Einladungslink",
  projects__surveys_details_accounts_label: "Mitwirkende",
  projects__surveys_details_accounts_value: "{{count}} Mitwirkende",
  projects__surveys_details_project_label: "Projekt",
  projects__surveys_details_progress_automatic: "Automatisch ({{start}} - {{end}})",
  projects__surveys_details_progress_manual_synchron: "Manuell (synchron)",
  projects__surveys_details_progress_manual_asynchron: "Manuell (asynchron)",
  projects__surveys_details_progress_no_date: "unbestimmt",
  projects__surveys_details_dashboard_participants: "{{count}} von {{invited}} Teilnehmende",
  projects__surveys_details_dashboard_participants_completed: "{{completed}} von {{invited}} abgeschlossen",
  projects__surveys_details_dashboard_next_module_modal_title: "Nächstes Projektmodul jetzt starten",
  projects__surveys_details_dashboard_next_module_modal_confirm_button: "Starten",
  projects__surveys_details_dashboard_next_module_modal_text_1:
    "Die Bearbeitung der Teilnehmenden, welche das derzeitige Projektmodul noch nicht abgeschlossen haben, wird mit dem Starten des nächsten Moduls abgebrochen. ",
  projects__surveys_details_dashboard_next_module_modal_text_2: "Möchten Sie das nächste Projektmodul jetzt starten?",
  projects__surveys_details_dashboard_end_survey_modal_title: "Erhebung beenden",
  projects__surveys_details_dashboard_end_survey_modal_confirm_button: "Beenden",
  projects__surveys_details_dashboard_end_survey_modal_text_1:
    "Die Bearbeitung der Teilnehmenden, welche das derzeitige Projektmodul noch nicht abgeschlossen haben, wird mit dem Beenden der Erhebung abgebrochen.",
  projects__surveys_details_dashboard_end_survey_modal_text_2: "Möchten Sie die Projektdurchführung jetzt beenden?",
  projects__surveys_details_navigate_label: "Zur Erhebungsübersicht",
  projects__surveys_details_test_survey_info: "Dies ist eine Probeerhebung.",
  projects__survey_overlay_update_description: "Beschreibung der Erhebung",

  // Survey Invite Attendees
  projects__survey_details_invite_title: "Teilnehmende einladen",
  projects__survey_details_invite_emails_heading: "Eingabe der E-Mail-Adressen",
  projects__survey_details_invite_emails_grid_heading: "Teilnahmeeinladungen an folgende E-Mail-Adressen versenden:",
  projects__survey_details_invite_emails_placeholder:
    "Beispiel: max-mustermann@mail.de ; marianne-mustermann@mail.de ; …",
  projects__survey_details_invite_emails_invalid: "Eingabe enthält unvollständige E-Mail-Adressen oder ist fehlerhaft",
  projects__survey_details_invite_emails_duplications: "Eingabe enthält doppelte E-Mail-Adressen.",
  projects__survey_details_invite_emails_already_invited: "Eingabe enthält bereits hinzugefügte Adressen.",
  projects__survey_details_invite_emails_empty: "keine E-Mail-Adressen angegeben",
  projects__survey_details_invite_emails_help_text:
    "Sie können alle Teilnehmenden gebündelt einladen. Bitte geben Sie hierzu alle gewünschten E-Mail-Adressen getrennt mit einem Semikolon an.",
  projects__survey_details_tooltip_invite_already_sent: "Einladung bereits versendet",
  projects__survey_details_tooltip_invite_duplicate: "E-Mail-Adresse mehrfach angegeben",
  projects__survey_details_tooltip_remove_from_list: "aus Liste entfernen",
  projects__survey_details_invite_emails_number_of_valid_addresses: "{{number}} vollständige E-Mail-Adressen",
  // Survey edit
  projects__surveys_update_form_title: "Durchführungseinstellungen bearbeiten",

  // Project Module Selection
  project_module_selection__empty_selection_scenario: "Kein Szenario ausgewählt",
  project_module_selection__selected_scenario: "Szenarios",
  project_module_selection__empty_selection_questionnaire: "Kein Fragebogen ausgewählt",
  project_module_selection__selected_questionnaire: "Fragebögen",

  // Survey Rating
  rating_overview__rating_ended: "Beendet am {{date}}",
  rating_overview__rating_end: "Endet am {{date}}",
  rating_overview__ended_today: "heute",
  rating_overview__rater_count: "Bewertende ({{count}})",
  rating_overview__no_raters: "keine Bewertenden hinzugefügt",
  rating_overview__invite_raters_button_label: "Jetzt Bewertende einladen",
  rating_overview__rating_progress: "Bewertungsfortschritt",
  rating_overview__attendees_list_label: "Teilnehmendenliste ({{count}})",
  rating_overview_title: "Rating",
  rating_participant_list_placeholder_title: "Keine Bewertung vorhanden.",
  rating_participant_list_placeholder_description:
    "Bitte führen Sie zuerst die Bewertung im Rating durch, bevor Sie mit dem Scoring fortfahren.",
  rating_participant_list_placeholder_button: "Zum Rating",
  rating_participant_list_no_data_placeholder_description: "Es stehen noch keine Teilnehmenden zum Bewerten bereit.",

  // Survey Dashboard
  dashboard__header_navigate_back_label: "Erhebungsübersicht",
  dashboard__details_label: "Allgemeine Erhebungsinformationen",
  dashboard__details_time_future: "zukünftig ({{date}})",
  dashboard__details_time_future_manual: "noch nicht gestartet",
  dashboard__details_time_running: "Projektdurchführung (läuft...)",
  dashboard__details_time_ended: "abgeschlossen",
  dashboard__details_time_undefined: "kein Datum angegeben",
  dashboard__title_time_future: "Start am {{date}} ({{remainingTime}})",
  dashboard__title_time_future_manual_survey: "Erhebung noch nicht gestartet",
  dashboard__title_time_running: "Projektdurchführung läuft ({{remainingTime}})",
  dashboard__title_time_running_without_time: "Projektdurchführung läuft",
  dashboard__title_time_ended: "Projektdurchführung beendet ({{endDate}})",
  dashboard__title_time_undefined: "kein Datum angegeben",
  dashboard__title_days_to: "in {{days}} Tagen",
  dashboard__title_days_today: "heute",
  dashboard__title_day_to: "in einem Tag",
  dashboard__title_days_remaining: "noch {{days}} Tage",
  dashboard__title_day_remaining: "noch ein Tag",
  dashboard__title_remaining_today: "noch heute",
  dashboard__title_today: "heute",
  dashboard__progress_project_title: "Monitoring",
  dashboard__progress_scoring_title: "Scoring",
  dashboard__progress_monitoring_title: "Monitoring",
  dashboard__progress_results_title: "Ergebnisübersicht",
  dashboard__progress_reports_title: "Reporting",
  dashboard__progress_reports_finished_modules: "Projektmodule abgeschlossen",
  dashboard__progress_reports_finalized_attendees: "Teilnehmende vollständig bewertet",
  dashboard__progress_reports_fully_rate_abbr: "Teilnehmende vst. bewertet",
  dashboard__progress_reports_maximum_score: "Maximale Punktzahl",
  dashboard__progress_reports_attendee_score: "Punktzahl dieses Teilnehmenden",
  dashboard__progress_reports_all_reports_done: "Ergebnisse vollständig",
  dashboard__progress_reports_no_reports: "Keine Daten vorhanden",
  dashboard__progress_reports_missing_reports: "Ergebnisse unvollständig",
  dashboard__progress_reports_survey_average: "Erhebungsdurchschnitt:",
  dashboard__progress_scoring_placeholder: "Hier folgt eine Bewertungsanzeige",
  dashboard__progress_results_placeholder: "Hier folgt eine Übersicht über die Ergebnisse der Teilnehmenden.",
  dashboard__progress_chart_legend: "Teilnehmende eingeladen",
  dashboard__progress_chart_legend_open: "Teilnehmende",
  dashboard__progress_chart_legend_abbr: "Teilnehmende eing.",
  dashboard__scoring_chart_legend: "Datensätze vorhanden",
  dashboard__progress_chart_invited: "eingeladen",
  dashboard__progress_chart_active: "aktiv",
  dashboard__progress_chart_offline: "offline",
  dashboard__progress_chart_online: "online",
  dashboard__progress_chart_not_joined: "nicht beigetreten",
  dashboard__progress_chart_completed: "abgeschlossen",
  dashboard__progress_chart_rating_ongoing: "in Bearbeitung",
  dashboard__progress_chart_rating_finished: "abgeschlossen",
  dashboard__rating_attendees_finalized: "Teilnehmende vollständig bewertet",
  dashboard__progress_chart_finalized: "finalisiert",
  dashboard__progress_future: "Teilnehmende einladen...",
  dashboard__progress_running: "Projektdurchführung läuft",
  dashboard__progress_ended: "Projektdurchführung abgeschlossen",
  dashboard__scoring_future: "Bewertende einladen...",
  dashboard__scoring_ongoing: "Scoring läuft...",
  dashboard__scoring_finished: "Scoring abgeschlossen",
  dashboard__result_future: "Keine Daten vorhanden",

  // Dashboard Project progress
  dashboard__project_header_label: "Monitoring",
  dashboard__project_header_navigate_back_label: "Erhebung",
  dashboard__project_project_title: "Projekt",
  dashboard__project_project_module_title: "Projektmodul ({{index}}/{{count}})",
  dashboard__project_project_navigation: "Gesamtes Projekt",
  dashboard__project_project_events_placeholder: "Keine Ereignisse vorhanden",
  dashboard__project_chart_title: "Projektfortschritt",
  dashboard__project_chart_title_module_selected: "Modulfortschritt",
  dashboard__project_table_title: "Teilnehmendenliste",
  dashboard__project_table_placeholder_title: "Keine Teilnehmenden eingeladen",
  dashboard__project_table_placeholder_title_manual_synchron: "Keine Teilnehmenden online",
  dashboard__project_table_placeholder_hint_manual_synchron:
    "Bitte leiten Sie den Einladungslink weiter, um Personen zu dieser Erhebung einzuladen ",
  dashboard__project_table_placeholder_button: "Jetzt Teilnehmende einladen",
  dashboard__project_table_participant_header: "Teilnehmende ({{count}})",
  dashboard__project_table_element_header: "Derzeitiges Projektmodul",
  dashboard__project_table_progress_header: "Projektmodule ({{count}})",
  dashboard__project_table_progress_tooltip: "Nach Projektmodulfortschritt sortieren",
  dashboard__project_table_progress_none: "noch nicht gestartet",
  dashboard__project_table_progress_done: "Erhebung abgeschlossen",
  dashboard__project_table_progress_module_is_starting: "Modul wird gestartet",
  dashboard__project_table_progress_questionnaire_header: "Fragen ({{count}})",
  dashboard__project_table_progress_questionnaire_tooltip: "Nach Anzahl der beantworteten Fragen sortieren",
  dashboard__project_table_progress_documents_header: "Geöffnete relevante Dokumente ({{count}})",
  dashboard__project_table_progress_documents_tooltip: "Nach Anzahl der geöffneten relevanten Dokumente sortieren",
  dashboard__project_table_progress_words_in_mails_title: "Wörter in Ausgangsmail",
  dashboard__project_table_progress_words_in_mails_title_no_words: "Keine Ausgangsmail vorhanden",
  project__remaining_time_placeholder: "Verbleibende Zeit lädt...",
  project__name_and_duration: "{{name}} ({{duration}} {{unit}})",
  dashboard__scenario_none: "Kein Szenario",
  dashboard__scenario_count: "1 Szenario",
  dashboard__scenarios_count: "{{count}} Szenarien",
  dashboard__questionnaire_none: "Kein Fragebogen",
  dashboard__questionnaire_count: "1 Fragebogen",
  dashboard__questionnaires_count: "{{count}} Fragebögen",

  // Dashboard attendee progress
  dashboard__participant_header_label: "Teilnehmender",
  dashboard__participant_header_navigate_back_label: "Monitoring",
  dashboard__attendee_action_title: "Zum Dashboard",
  dashboard__attendee_information_title: "Teilnehmendeninformation",
  dashboard__attendee_progress_title: "Erhebungsfortschritt ({{count}}/{{total}})",
  dashboard__attendee__scoring_progress_title: "Scoringfortschritt ({{count}}/{{total}})",
  dashboard__attendee_salutation_label: "Anrede",
  dashboard__attendee_attendee_label: "Name",
  dashboard__attendee_attendee_index: "Kennziffer",
  dashboard__attendee_attendee_token: "Zugangscode",
  dashboard__attendee_elements_header: "Projektelemente ({{count}})",
  dashboard__attendee_type_header: "Typ",
  dashboard__attendee_type_scenario: "Szenario",
  dashboard__attendee_type_questionnaire: "Fragebogen",
  dashboard__attendee_status_header: "Status",
  dashboard__attendee_final_score_header: "Finalscore",
  dashboard__attendee_status_completed: "abgeschlossen",
  dashboard__attendee_status_progressing: "in Bearbeitung",
  dashboard__attendee_status_not_completed: "nicht abgeschlossen",
  dashboard__attendee_status_open: "noch nicht begonnen",
  dashboard__attendee_questionnaire_back_to_overview: "Übersicht ({{participantName}})",
  dashboard__attendee_questionnaires_status_in_progress: "Durchführung läuft",
  dashboard__attendee_questionnaires_status_finished: "abgeschlossen",
  dashboard__attendee_questionnaires_results: "Ergebnisse",
  dashboard__attendee_questionnaires_progress: "Fragebogenfortschritt",
  dashboard__attendee_questionnaires_answered_questions: "Beantwortete Fragen",
  dashboard__attendee_questionnaires_title: "{{index}}. {{questionnaireName}}",

  // Dashboard Footer
  dashboard__footer_timing_future: "Start am {{date}} ({{remainingTime}})",
  dashboard__footer_timing_present: "Ende am {{date}} ({{remainingTime}})",
  dashboard__footer_timing_past: "Beendet am {{end}}",
  dashboard__footer_timing_past_today: "Beendet heute",
  dashboard__footer_timing_undefined: "Zeitraum unvollständig",
  dashboard__footer_invited: "{{invitationsCount}} Teilnehmende eingeladen",
  dashboard__footer_completed: "{{completedCount}} von {{invitationsCount}} abgeschlossen",
  dashboard__footer_project_future: "zukünftig",
  dashboard__footer_project_present: "Erhebung läuft",
  dashboard__footer_project_past: "Erhebung abgeschlossen",
  dashboard__footer_navigate_scoring: "Zum Scoring",
  dashboard__footer_navigate_dashboard: "Zum Monitoring",
  dashboard__footer_manual_synchron: "Manueller Start (Synchron)",
  dashboard__footer_manual_asynchron: "Manueller Start (Asynchron)",
  dashboard__footer_manual_synchron_start_project: "Erhebung starten",
  dashboard__footer_manual_synchron_stop_project: "Erhebung beenden",
  dashboard__footer_manual_synchron_start_next_module: "Nächstes Projektmodul starten",
  dashboard__footer_manual_synchron_chat_footer_tooltip: "Nachricht an ausgewählte Teilnehmende versenden ({{count}})",
  dashboard__footer_manual_synchron_chat_footer_tooltip_disabled: "Keine Teilnehmenden selektiert",

  // File Explorer
  file_explorer__title: "Verzeichnisstruktur",
  file_explorer__create_new_main_directories: "Hauptordner hinzufügen",
  file_explorer__no_directories_title: "Kein Ordner erstellt",
  file_explorer__no_directories_message: "Bitte fügen Sie zunächst einen Ordner hinzu",

  // Module Selection
  module_selection__single_entity_selected: "„{{name}}“ ausgewählt",
  module_selection__multi_entity_selected: "ausgewählt",
  module_selection__placeholder_title: "Kein {{entity}} ausgewählt",
  module_selection__placeholder_hint: "Kein {{entity}} hinzugefügt",
  module_selection__placeholder_button: "{{entity}} hinzufügen",

  // Files and Directories
  files_and_directories__title: "Ordner und Dateien",
  files_and_directories__files: "Dateien",
  files_and_directories__upload_modal_title_singular: "Datei hinzufügen",
  files_and_directories__upload_modal_title_plural: "Dateien hinzufügen",
  files_and_directories__upload_modal_choose_file: "Datei wählen",
  files_and_directories__upload_modal_choose_file_disabled: "Datei bereits ausgewählt",
  files_and_directories__upload_modal_create_text_document: "Textdokument erstellen",
  files_and_directories__upload_modal_show_preview: "Vorschau anzeigen",
  files_and_directories__upload_modal_file_typ: "Dateityp",
  files_and_directories__upload_modal_file_typ_text_plural:
    "Fügen Sie hier Ihre gewünschten Dateien in folgenden Formaten hinzu: ",
  files_and_directories__upload_modal_file_typ_text_singular:
    "Fügen Sie hier Ihre gewünschte Datei in folgenden Formaten hinzu: ",
  files_and_directories__upload_modal_file_size_hint_plural:
    "Die maximale Dateigröße für einzelne Dateien beträgt {{fileSizeInMB}} MB. Bitte beschränken Sie Ihre Auswahl auf Dateien entsprechender Größe.",
  files_and_directories__upload_modal_file_size_hint_singular:
    "Die maximale Dateigröße beträgt {{fileSizeInMB}} MB. Bitte beschränken Sie Ihre Auswahl auf eine Datei entsprechender Größe.",
  files_and_directories__upload_modal_added_file_no_amount: "Hinzugefügte Datei",
  files_and_directories__upload_modal_added_file: "Hinzugefügte Datei ({{amount}})",
  files_and_directories__upload_modal_added_files: "Hinzugefügte Dateien ({{amount}})",
  files_and_directories__upload_modal_failed_upload: "Beim Upload der gewählten Datei ist ein Fehler aufgetreten.",
  files_and_directories__upload_modal_file_too_large: "Die gewählte Datei überschreitet die maximale Dateigröße",
  files_and_directories__upload_modal_file_type_invalid: "Der gewählte Dateityp wird nicht unterstützt.",
  files_and_directories__upload_modal_no_single_file: "Es kann maximal eine Datei ausgewählt werden.",
  files_and_directories__upload_modal_is_uploading: "Hochladen...",
  files_and_directories__upload_modal_is_uploading_plural: "Dateien werden hochgeladen...",
  files_and_directories__upload_modal_no_files_selected: "Keine Dateien hinzugefügt",
  files_and_directories__upload_modal_no_files_selected_hint:
    "Bitte fügen Sie die gewünschten Dateien oben im Uploadfenster hinzu.",
  files_and_directories__upload_modal_no_file_selected: "Keine Datei hinzugefügt",
  files_and_directories__upload_modal_no_file_selected_hint:
    "Bitte fügen Sie die gewünschte Datei oben im Uploadfenster hinzu.",
  files_and_directories__upload_modal_upload_title: "Upload",
  files_and_directories__file_type_table_calculation: "Tabellenkalkulation",
  files_and_directories__file_type_pdf: "PDF",
  files_and_directories__file_type_image: "Grafik",
  files_and_directories__file_type_video: "Video",
  files_and_directories__file_type_text: "Text",
  files_and_directories__file_detail_name: "Dateiname",
  files_and_directories__file_detail_name_edit: "Dateiname bearbeiten",
  files_and_directories__file_detail_settings: "Szenariospezifische Einstellungen",
  files_and_directories__directory_detail_name_edit: "Ordner bearbeiten",
  files_and_directories__directory_detail_name: "Ordner",
  files_and_directories__directory_detail_sub_directory: "Unterordner",
  files_and_directories__directory_detail__column_header_title: "Titel",
  files_and_directories__directory_detail__column_header_relevance: "Relevanz",
  files_and_directories__create_main_directory_modal_title: "Neuen Hauptordner hinzufügen",
  files_and_directories__create_sub_directory_modal_title: "Neuen Unterordner hinzufügen",
  files_and_directories__create_main_directory_modal_name_title: "Ordnername",
  files_and_directories__create_main_directory_modal_name_placeholder: "Name des Ordners",
  files_and_directories__directory_content_list_heading: "Ordner und Dateien",
  files_and_directories__directory_content_list_placeholder: "Keine Ordner oder Dateien vorhanden",
  files_and_directories__create_subdirectory_tooltip: "Unterordner hinzufügen",
  files_and_directories__create_file_tooltip: "Datei hinzufügen",
  files_and_directories__rename_directory_label: "Ordnername",
  files_and_directories__move_directory_label: "Ordner",
  files_and_directories__open_in_viewer: "{{preposition}} {{viewerTool}} öffnen",
  files_and_directories__viewer_not_found: "Kein passendes Tool für den gewählten Dateityp vorhanden",
  files_and_directories__move_directory: "Verschieben",
  files_and_directories__move_directory_main_directory: "Ordner und Dateien (Hauptordner)",
  files_and_directories__move_modal_title: "{{entity}} verschieben",
  files_and_directories__move_modal_entity_file: "Datei",
  files_and_directories__move_modal_entity_directory: "Ordner",
  files_and_directories__move_modal_info_text_file:
    "Wählen Sie bitte einen Ordner aus, um die ausgewählte Datei zu verschieben.",
  files_and_directories__move_modal_info_text_directory:
    "Wählen Sie bitte einen Ordner aus, um den ausgewählten Ordner zu verschieben.",
  files_and_directories__move_modal_file_name_label: "Zu verschiebende Datei",
  files_and_directories__move_modal_directory_name_label: "Zu verschiebender Ordner",
  files_and_directories__move_modal_select_directory: "Ordner auswählen",
  files_and_directories__move_modal_current_position: "derzeitige Position",
  files_and_directories__move_modal_target_directory: "in diesen Ordner verschieben",
  files_and_directories__move_modal_no_subfolders: "Keine Unterordner vorhanden",
  files_and_directories__move_modal_tooltip_revert_selection: "Auswahl rückgängig machen",
  files_and_directories__move_modal_define_as_root_directory: "Ordner und Dateien (als Hauptordner definieren)",
  files_and_directories__move_modal_tooltip_move_not_possible: "Verschieben in eigenen Unterordner nicht möglich",
  files_and_directories__disabled_tooltip: "Szenario bereits veröffentlicht",
  files_and_directories__readonly_tooltip: "nicht bearbeitbar",
  files_and_directories__intervention_singular: "Intervention vorhanden",
  files_and_directories__intervention_plural: "Interventionen vorhanden",
  files_and_directories__intervention_spreadsheet_info:
    "Eine Intervention ist eine automatische Hilfestellung. Diese tritt ein, wenn dieses Dokument nicht vom Teilnehmenden betrachtet wird. Im Tabellenkalkulationstool können Sie außerdem Zellen-Interventionen anlegen.",
  files_and_directories__intervention_spreadsheet_title: "Zellen-Intervention",
  files_and_directories__intervention_spreadsheet_is_included: "Inhalt ist gleich",
  files_and_directories__intervention_spreadsheet_is_not_included: "Inhalt ist ungleich",
  files_and_directories__intervention_spreadsheet_description:
    "Eine Zellen-Intervention ist eine automatische Hilfestellung. Diese tritt ein, wenn die ausgewählte Zelle nach einem bestimmten Zeitpunkt definierte Inhalte enthält oder nicht enthält. Bitte geben Sie alle zu prüfenden Inhalte getrennt mit einem Semikolon an.",
  files_and_directories__sample_company_file_hint:
    "Diese Datei wurde im verwendeten Modellunternehmen angelegt. Szenariospezifische Einstellungen bitte dort vornehmen.",
  files_and_directories__sample_company_directory_hint:
    "Die Dateien dieses Ordners wurden im verwendeten Modellunternehmen angelegt.",
  files_and_directories__sample_company_label: "Modellunternehmen",
  files_and_directories__sample_company_button: "Zum Modellunternehmen",
  files_and_directories__downloads_label: "Downloads",
  files_and_directories__downloads_mail: "E-Mail",
  files_and_directories__downloads_mail_files: "Dateien",
  files_and_directories__downloads_mail_navigate: "Zur E-Mail",
  files_and_directories__downloads_mail_defaultRecipient: "{vorname}.{nachname}@lucaoffice.de",
  files_and_directories__downloads_hint:
    "Die Dateien dieses Ordners sind verfügbar, sobald der Teilnehmende diese in den entsprechenden E-Mails heruntergeladen hat.",
  files_and_directories__downloads_mail_dispatch_time: "Versendezeitpunkt",
  files_and_directories__downloads_mail_detail_hint:
    "Diese Datei ist verfügbar, sobald der Teilnehmende diese in der entsprechenden E-Mail heruntergeladen hat.",

  // Files
  file__edit_title_file_type_image: "Grafik bearbeiten",
  file__edit_title_file_type_video: "Video bearbeiten",
  file__edit_title_file_type_pdf: "PDF bearbeiten",
  file__delete_button_file_type_image: "Grafik löschen",
  file__delete_button_file_type_video: "Video löschen",
  file__delete_button_file_type_pdf: "PDF löschen",
  file__preview__label: "Dateivorschau",
  file__swap__label: "Datei austauschen",
  file__delete_file_type_image_failed: "Beim Löschen der Grafik ist ein Fehler aufgetreten.",
  file__swap_file_type_image_failed: "Beim Upload der Grafik ist ein Fehler aufgetreten.",
  file__swap_file_type_video_failed: "Beim Upload des Videos ist ein Fehler aufgetreten.",

  // Interventions
  interventions__detail_view_header_label: "Interventionen",
  interventions__detail_view_header_label_singular: "Intervention",
  interventions__detail_view_table_of_contents_title_all: "Alle Positionen",
  interventions__detail_view_table_of_contents_title_files: "Dateien",
  interventions__detail_view_table_of_contents_title_erp: "ERP-Datensätze",
  interventions__detail_view_table_of_contents_title_mail: "E-Mail",
  interventions__detail_view_table_of_contents_title_notes: "Notizen",
  interventions__detail_view_table_of_contents_title_erp_short: "ERP",
  interventions__detail_view_table_of_contents_title_event: "Ereignis",
  interventions__detail_view_table_of_contents_placeholder_title: "Keine Interventionen vorhanden",
  interventions__detail_view_table_of_contents_placeholder_hint:
    "Sie können Interventionen in den zusätzlichen Einstellungen der E-Mails, Datensätze (ERP), Dateien und Ereignissen anlegen.",
  interventions__detail_view_overview_empty_placeholder: "Keine Auswahl",
  interventions__detail_view_overview_no_position_or_intervention_placeholder:
    "Bitte wählen Sie eine Position oder Intervention auf der linken Seite aus. ",
  interventions__group_type_header: "Position ({{groupType}})",
  interventions__group_type_label: "Position",
  interventions__group_type_to_file: "Zur Datei",
  interventions__group_type_erp_table: "Tabelle",
  interventions__interventions_table_time_offset: "Zeitpunkt",
  interventions__interventions_table_time_placeholder: "Keine Interventionen angelegt",
  interventions__interventions_table_time_offset_after_event: "Nach Ereignis",
  interventions__interventions_table_trigger_condition: "Auslösebedingung",
  interventions__interventions_detail_title_label: "Titel der Intervention",
  interventions__interventions_detail_email_label: "Interventions-E-Mail (Eingang)",
  interventions__interventions_detail_email_hint:
    "Die Interventions-E-Mail erscheint als ungelesene E-Mail im E-Mail-Postfach, sobald die Auslösebedingung zum gewählten Zeitpunkt eintrifft.",
  interventions__interventions_detail_email_delay: "(+ {{delayInMinutes}} Minuten)",
  interventions__interventions_detail_email_button: "Zur E-Mail",
  interventions__interventions_detail_edit_tim_modal_title: "Zeitpunkt der Intervention",
  interventions__interventions_detail_edit_tim_modal_description:
    "Wählen Sie den Zeitpunkt innerhalb des Bearbeitungszeitraums dieses Szenarios ({{durationInMinutes}} min) für diese Intervention aus. (Angabe bitte als ganze Zahl)",
  interventions__interventions_detail_edit_tim_modal_label: "Intervention tritt ein nach:",
  interventions__interventions_detail_delete_modal_title: "Intervention löschen",
  interventions__interventions_detail_delete_modal_erp_dataset_title: "Interventionen der Auftragsnummer löschen",
  interventions__interventions_detail_delete_modal_description:
    "Möchten Sie diese Intervention und die dazugehörige Ausgangsmail wirklich unwiderruflich löschen?",
  interventions__interventions_detail_delete_position_modal_title: "Position löschen",
  interventions__interventions_detail_delete_position_modal_description:
    "Möchten Sie diese Position mit allen angelegten Interventionen und den dazugehörigen Ausgangsmails wirklich unwiderruflich löschen?",
  interventions__interventions_trigger_conditions_opening_indicator: "Öffnungsindikator",
  interventions__interventions_trigger_conditions_opening_indicator_open: "Geöffnet",
  interventions__interventions_trigger_conditions_opening_indicator_not_opened: "Ungeöffnet",
  interventions__interventions_check_file: "Datei nicht geöffnet",
  interventions__interventions_check_mail: "E-Mail nicht geöffnet",
  interventions__interventions_check_runtime_survey: "Antwortmöglichkeit ausgewählt",
  interventions__interventions_check_answer_runtime_survey: "Antwortmöglichkeit ausgewählt",
  interventions__interventions_check_answer_runtime_survey_negated: "Antwortmöglichkeit nicht ausgewählt",
  interventions__interventions_check_answer_runtime_survey_description:
    "Die Markierung der Antwortmöglichkeit wird nach dem Schließen des Ereignisses überprüft. Sollte diese Antwortmöglichkeit selektiert worden sein, wird die Interventions-E-Mail versendet und ist im E-Mail Postfach des Teilnehmenden zu finden.",
  interventions__interventions_check_erp: "Datensatz nicht geöffnet",
  interventions__interventions_check_spreadsheet: "Zelleninhalt in Zelle ({{cellName}}) vorhanden",
  interventions__interventions_check_spreadsheet_edit_overlay_title: "Zelle nach folgenden Inhalten prüfen:",
  interventions__interventions_check_spreadsheet_negated: "Zelleninhalt in Zelle ({{cellName}}) nicht vorhanden",
  interventions__interventions_check_erp_row: "Datensatz nicht geöffnet",
  interventions__interventions_check_erp_row_runtime_survey: "Datensatz geöffnet",
  interventions__interventions_check_notes_value: "Eingabewert in Notizen nicht vorhanden",
  interventions__interventions_check_notes_value_label: "Zu prüfender Inhalt",
  interventions__interventions_check_notes_value_label_update_title: "Notizen nach folgenden Inhalten prüfen:",
  interventions__interventions_check_text_document_value_label_update_title:
    "Textdokument nach folgenden Inhalten prüfen:",
  interventions__interventions_check_notes_value_label_update_description:
    "Bitte geben Sie alle zu prüfenden Inhalte getrennt mit einem Semikolon an. (Oder-Verknüpfung)",
  interventions__interventions_check_notes_value_label_tooltip:
    "Bitte geben Sie alle zu prüfenden Inhalte getrennt mit einem Semikolon an. (Oder-Verknüpfung)",
  interventions__interventions_check_text_document_value: "Eingabewert in Textdokument nicht vorhanden",
  interventions__interventions_check_text_document_value_description:
    "Die Inhalte des Textdokumentes werden zum ausgewählten Zeitpunkt überprüft. Sollte keiner der angegebenen Inhalte des Textdokumentes zum ausgewählten Zeitpunkt vorhanden sein, wird die Interventions-E-Mail versendet und ist im E-Mail-Postfach des Teilnehmenden zu finden.",
  interventions__interventions_check_notes_value_description:
    "Die Inhalte des Notizen-Tools werden zum ausgewählten Zeitpunkt überprüft. Sollte keiner der angegebenen Inhalte des Notizen-Tools zum ausgewählten Zeitpunkt vorhanden sein, wird die Interventions-E-Mail versendet und ist im E-Mail-Postfach des Teilnehmenden zu finden.",
  interventions__interventions_check_spreadsheet_cell_content_description:
    "Der Inhalt der Zelle dieser Tabellenkalkulation wird zum ausgewählten Zeitpunkt überprüft. Sollte diese Auslösebedingung eintreffen, wird die Interventions-E-Mail versendet und ist im E-Mail Postfach des Teilnehmenden zu finden.",
  interventions__interventions_check_spreadsheet_cell_content_title:
    "Zelleninhalt in Zelle ({{cellName}}) nicht vorhanden",
  interventions__interventions_check_spreadsheet_cell_content_short_text:
    "Eine Zellen-Intervention ist eine automatische Hilfestellung. Diese tritt ein, wenn die ausgewählte Zelle nach einem bestimmten Zeitpunkt definierte Inhalte nicht enthält.",
  interventions__interventions_check_file_description:
    "Der Öffnungsindikator der Datei wird zum ausgewählten Zeitpunkt überprüft. Sollte diese Datei zum ausgewählten Zeitpunkt nicht geöffnet worden sein, wird die Interventions-E-Mail versendet und ist im E-Mail-Postfach des Teilnehmenden zu finden.",
  interventions__interventions_check_erp_row_description:
    "Der Öffnungsindikator des Datensatzes wird zum ausgewählten Zeitpunkt überprüft. Sollte dieser Datensatz zum ausgewählten Zeitpunkt nicht geöffnet worden sein, wird die Interventions-E-Mail versendet und ist im E-Mail-Postfach des Teilnehmenden zu finden.",
  interventions__interventions_check_mail_description:
    "Der Öffnungsindikator der E-Mail wird zum ausgewählten Zeitpunkt überprüft. Sollte diese E-Mail nicht geöffnet worden sein, wird die Interventions-E-Mail versendet und ist im E-Mail-Postfach des Teilnehmenden zu finden.",
  interventions__interventions_check_runtime_survey_description:
    "Die Markierung der Antwortmöglichkeit wird nach dem Schließen des Ereignisses überprüft. Sollte die definierte Selektion der Antwortmöglichkeit zutreffen, wird die Interventions-E-Mail versendet und ist im E-Mail-Postfach des Teilnehmenden zu finden.",
  interventions__interventions_create_modal_description:
    "Geben Sie einen Titel, den Zeitpunkt und die Auslösebedingung für die neue Intervention an. Nach dem Anlegen können Sie die Interventions-E-Mail für diese Intervention bearbeiten.",
  interventions__interventions_create_modal_description_event:
    "Geben Sie einen Titel für die neue Intervention an. Nach dem Anlegen können Sie die Interventions-E-Mail für diese Intervention bearbeiten.",
  interventions__interventions_create_modal_title_file: "Datei-Intervention anlegen",
  interventions__interventions_create_modal_title_erp: "Datensatz-Intervention anlegen",
  interventions__interventions_create_modal_title_spreadsheet: "Zellen-Intervention Anlegen",
  interventions__interventions_create_modal_title_notes: "Notizen-Intervention anlegen",
  interventions__interventions_create_modal_title_text_document: "Textdokument-Intervention anlegen",
  interventions__interventions_create_modal_title_mail: "E-Mail-Intervention anlegen",
  interventions__interventions_create_modal_title_survey_event: "Ereignis-Intervention anlegen",
  interventions__interventions_create_modal_title_survey_event_selected_label: "Antwortmöglichkeit selektiert",
  interventions__interventions_create_modal_title_survey_event_not_selected_label:
    "Antwortmöglichkeit nicht selektiert",
  interventions__interventions_create_modal_title: "Titel der Intervention",
  interventions__interventions_create_modal_time_hint:
    "Wählen Sie den Zeitpunkt innerhalb des Bearbeitungszeitraums dieses Szenarios ({{durationInMinutes}} min) für diese Intervention aus. (Angabe bitte als ganze Zahl)",
  interventions__interventions_create_modal_time_hint_on_email_attachement:
    "Wählen Sie den Zeitpunkt zwischen der Verfügbarkeit der Datei ({{emailReceptionInSeconds}} sek) und des Bearbeitungszeitraums dieses Szenarios ({{durationInMinutes}} min) für diese Intervention aus. (Angabe bitte als ganze Zahl.)",
  interventions__interventions_create_modal_time_hint_on_email_attachement_error:
    "Zeitpunkt liegt vor Verfügbarkeit der Datei",
  interventions__interventions_create_modal_time_hint_email_future_mail:
    "Wählen Sie den Zeitpunkt zwischen der Verfügbarkeit der E-Mail ({{emailReceptionInMinutes}} min) und der Bearbeitungszeitraums dieses Szenarios ({{durationInMinutes}} min) für diese Intervention aus. (Angabe bitte als ganze Zahl)",
  interventions__interventions_create_modal_time_hint_email:
    "Wählen Sie den Zeitpunkt innerhalb des Bearbeitungszeitraums dieses Szenarios ({{durationInMinutes}} min) für diese Intervention aus. (Angabe bitte als ganze Zahl)",
  interventions__interventions_create_modal_confirm_button: "Anlegen und Interventions-E-Mail bearbeiten",
  interventions__interventions_create_modal_new_mail_label: "Neue Interventions-E-Mail anlegen",
  interventions__interventions_create_modal_new_mail_description:
    "Zum Anlegen einer neuen E-Mail füllen Sie bitte die gewünschten Pflichtinformationen aus. Diese können Sie nachträglich jederzeit bearbeiten:",
  interventions__interventions_erp_datasets_table_primary_key: "Auftragsnummer (Primärschlüssel)",
  interventions__interventions_erp_number_ac: "Nr.",
  interventions__interventions_choose_textdocument_intervention_type: "Interventionstyp auswählen",
  interventions__interventions_choose_textdocument_intervention_type_file_opening: "Textdokument öffnen",
  interventions__interventions_choose_textdocument_intervention_type_file_opening_description:
    "Wählen Sie die Art der Hilfestellung, wenn dieses Textdokument nicht vom Teilnehmenden betrachtet wird.",
  interventions__interventions_choose_textdocument_intervention_type_content: "Inhalt des Textdokumentes",
  interventions__interventions_choose_textdocument_intervention_type_content_description:
    "Wählen Sie die Art der Hilfestellung, wenn dieses Textdokument bestimmten nicht Inhalt enthält.",

  // Viewer Tools
  viewer_tool_image: "Image Viewer",
  viewer_tool_pdf: "PDF Viewer",
  viewer_tool_video: "Video Player",
  viewer_tool_spreadsheet: "Tabellenkalkulation",
  viewer_tool_text: "Textverarbeitung",

  //Viewer tools preposition
  viewer_tool_preposition_m: "Im",
  viewer_tool_preposition_n: "In",

  // User Management
  user_management__filter_label_management: "Benutzerverwaltung",
  user_management__filter_label_archive: "Archivieren",
  user_management__filter_label_finalize: "Versiegeln",
  user_management__filter_label_r_scripts_short: "R-Skripte",
  user_management__filter_label_r_scripts: "R-Skript-Verwaltung",
  user_management__filter_header: "Globale Rechte",
  user_management__filter_search_placeholder: "Nach Benutzer oder Organisation suchen...",
  user_management__table_header_username: "Benutzername",
  user_management__table_header_salutation: "Anrede",
  user_management__table_header_e_mail: "E-Mail-Adresse",
  user_management__table_header_organisation: "Organisation",
  user_management__table_header_rights: "Globale Rechte",
  user_management__missing_claims: "Fehlende Rechte für die angefragte Ressource",
  user_management__user_information_label: "Benutzerinformationen",
  user_management__edit_user_claims_manage: "Globale Rechte können von diesem Nutzer vergeben werden.",
  user_management__edit_user_claims_manage_tooltip:
    "Rechte zur Benutzerverwaltung können nur von anderen Nutzern entfernt werden",
  user_management__edit_user_claims_archive:
    "Projektmodule und Szenarioelemente können von diesem Nutzer archiviert werden.",
  user_management__edit_user_claims_finalize:
    "Projektmodule und Szenarioelemente können von diesem Nutzer versiegelt werden.",
  user_management__edit_user_claims_r_scripts: "R-Skripte können von diesem Nutzer angelegt und bearbeitet werden.",

  // Rating
  rating__rating__header_label: "Rating - {{title}}",
  rating__rating__header_back_button: "Bewertungsübersicht",
  rating__rating__placeholder_headline: "Keine Daten vorhanden...",
  rating__rating__placeholder_text:
    "Dieses Projektmodul wurde von ausgewählten Teilnehmenden noch nicht abgeschlossen. Eine Bewertung ist daher nicht möglich.",
  rating__rating__action_dropdown_label: "Aktion nach Bestätigung",
  rating__rating__action_dropdown_tooltip_text:
    "Wählen Sie aus, ob Sie nach Bestätigung zum nächsten Item oder nächsten Teilnehmenden springen möchten.",
  rating__rating__action_button_tooltip: "Keine Auswahl vorgenommen",
  rating__rating__action_no_label: "Keine",
  rating__rating__action_next_attendee_label: "Nächste Teilnehmende",
  rating__rating__action_next_item_label: "Nächstes Item",
  rating__rating__action_next_question_label: "Nächste Frage",
  rating__rating__rating_score: "Vergebene Punktzahl:",
  rating__rating__rating_global_score: "Vergebene Gesamtpunktzahl:",
  rating__rating__rating_global_score_automatic: "Automatisch vergebene Punktzahl:",
  rating__rating__rating_global_achieved_score: "Erreichte Gesamtpunktzahl:",
  rating__rating__manual_scoring_required: "manuelle Bewertung nötig",
  rating__rating__scoring: "{{score}} von {{maxScore}} Punkte",
  rating__rating__action_button_finish_scoring: "Scoring abschließen",
  rating__rating__action_button_finish_scoring_finalized: "Scoring abgeschlossen",
  rating__rating__action_button_finish_scoring_description:
    "Hiermit wird das endgültige Ergebnis dieser Erhebung festgelegt. Sie können keine Anpassungen an den Finalscores mehr vornehmen und das Rating wird für alle eingeladenen Rater beendet.",
  rating__rating__action_button_finish_scoring_question: "Möchten Sie das Scoring jetzt abschließen?",
  rating__rating__right_side_title_table_of_contents: "Bewertet in %",
  rating__rating__automatic_rating: "automatisiert",
  rating__rating__manual_rating: "manuell",
  rating__rating__trailing_percent: " %",

  // Rating Questionnaire Question
  rating_questionnaire_question__question_scoring_label: "Gesamtdurchschnitt",

  // Rating Questionnaire Answer
  rating_questionnaire_answer__automatic_rating_text_label: "Antwortmöglichkeit",

  // Rating Scenario
  rating_scenario__scoring_label: "Erreichte Punktzahl",
  rating_scenario__main_dimensions_label: "Hauptdimensionen",
  rating_scenario__dimensions_label: "Dimensionen",
  rating_scenario__items_label: "Items",
  rating_scenario__placeholder_headline: "Keine Daten vorhanden...",
  rating_scenario__placeholder_text: "Es wurde kein Szenario gefunden. Eine Bewertung ist daher nicht möglich.",
  rating_scenario__snapshot_placeholder_description:
    "Dieses Projektmodul wurde von ausgewählten Teilnehmenden noch nicht abgeschlossen. Eine Bewertung ist daher nicht möglich.",

  // Rating
  rating__finalize_dialog_text:
    "Möchten Sie das Scoring abschließen? Eine Bewertung ist anschließend nicht mehr möglich.",
  rating__subheader_search_placeholder: "Suchbegriff eingeben...",
  rating__filter_title: "Erhebungen",
  rating__criterion_label: "Bewertungskriterium",
  rating__scoring_analytic_title: "Analytische Bewertung",
  rating__scoring_holistic_title: "Holistische Bewertung",
  rating__scoring_none_title: "Ohne Bewertung",
  rating__scoring_title: "Bewertung",
  rating__freetext_answer_label: "Freitextantwort des Teilnehmenden",
  rating__automatic_rating_label: "Automatisierte Bewertung",
  rating__automatic_rating_description:
    "Die Bewertung dieses Items erfolgt automatisiert. Für alle Bewertungskriterien ist eine automatisierte Regel des zu bewertenden Inhalts angelegt.",
  rating__automatic_rating_description_questionnaire:
    "Die Bewertung dieser Frage erfolgt automatisiert. Für alle Antwortmöglichkeiten ist eine automatisierte Regel des zu bewertenden Inhalts angelegt.",
  rating__manual_rating_label: "Manuelle Bewertung",
  rating__manual_rating_description:
    "Die Bewertung dieses Items erfolgt manuell. Für alle Bewertungskriterien ist eine klare Beschreibung des zu bewertenden Inhalts angelegt.",
  rating__manual_rating_description_questionnaire:
    "Die Bewertung dieser Frage erfolgt manuell. Für alle Bewertungskriterien ist eine klare Beschreibung des zu bewertenden Inhalts angelegt.",
  rating__no_criterion_title: "Kein Bewertungskriterium erfüllt?",
  rating__no_criterion_title_readonly: "Kein Bewertungskriterium erfüllt",
  rating__no_criterion_description:
    "Sollte der Teilnehmende keines der Bewertungskriterien erfüllt haben, vergeben Sie bitte hier 0 Punkte.",
  rating__no_criterion_description_readonly: "Der Teilnehmende hat keines der Bewertungskriterien erfüllt.",
  rating__scoring_unit: "Punkte",
  rating__no_score_button: "0 Punkte vergeben",
  rating__computerrater_radio_label: "Computerrater",
  rating__invite_title: "Bewertende einladen",
  rating__invite_description:
    "Sie können alle Bewertenden gebündelt einladen. Bitte geben Sie hierzu alle gewünschten E-Mail-Adressen getrennt mit einem Semikolon an.",
  rating__invite_emails_title: "Bewertungseinladungen an folgende E-Mail Adressen versenden:",
  rating__chart_title: "Bewertende eingeladen",
  rating__participant: "Teilnehmender",
  rating__participant_index: "Kennziffer",
  rating__final_score_available: "Finalscore vorhanden",
  rating__final_score_project_modules_tooltip: "final bewertet / Anzahl bewertbarer Projektmodule",
  rating__final_score_set: "Finalscore setzen",
  rating__final_score_set_not_possible: "Finalscore kann aufgrund fehlender Daten nicht gesetzt werden",
  rating__final_score_set_alt: "Final bewerten",
  rating__final_score_disabled: "Ihre Ratingeinladung muss abgeschlossen sein, bevor Sie den Finalscore setzen können.",
  rating__completed_label: "{{count}} von {{totalCount}} Bewertungen abgeschlossen",
  rating__finalized_label: "{{count}} von {{totalCount}} Teilnehmende vollständig bewertet",
  rating__finalized_label_short: "{{count}} von {{totalCount}}",
  rating__evaluation_participation_title: "Bewertungsbeteiligung",
  rating__evaluation_participation_score_label: "({{finished}} von {{total}})",
  rating__raters_count: "{{count}} von {{totalCount}} Bewertende",
  rating__total_score_achieved: "Erreichte Gesamtpunktzahl",
  rating__average_score_achieved: "Gesamtdurchschnitt",
  rating__not_possible: "Keine Bewertung möglich",
  rating__partly_not_possible: "Bewertung nur teilweise möglich",
  rating__not_possible_tooltip: "Da für den Teilnehmenden keine Daten vorliegen, ist eine Bewertung nicht möglich",
  rating__partly_not_possible_tooltip:
    "Da für den Teilnehmenden unvollständige Daten vorliegen, ist eine Bewertung nicht für alle Projektmodule möglich",
  rating__action_button_not_possible: "Bewertung nicht möglich",
  rating__document_opened: "{{name}} wurde geöffnet",
  rating__document_reference_opened: "{{name}} wurde im Nachschlagewerk geöffnet",
  rating__document_erp_components_for_products:
    "Komponentenzuordnung (Komponente {{componentId}}, Produkt {{productId}})",
  rating__feature_usage: "{{featureName}} in {{toolName}} wurde verwendet",
  rating__tool_usage: "{{toolName}} wurde verwendet",
  rating__input_in_file: "{{input}} in {{fileName}} vorhanden",
  rating__input_in_spreadsheet: "'{{input}}' in {{fileName}} ({{size}}) vorhanden",
  rating__r_script_used: "{{rScriptName}} ausgelöst",
  rating__raters_label: "Bewertende",
  rating__ongoing_count: "Bewertung offen",
  rating__finished_count: "Bewertung abgeschl.",
  rating__holistic_description:
    "Der Bewertende entscheidet sich für genau ein Bewertungskriterium. Das ausgewählte Kriterium ergibt die Gesamtpunktzahl dieses Items.",
  rating__invite_raters_warning:
    "ACHTUNG! Bedenken Sie, dass Sie den Finalscore erst setzen und das Scoring abschließen können, wenn Sie die Bewertung im Rating abgeschlossen haben.",
  rating__table_column_completed: "Final bewertete Projektmodule",
  rating__labeled_count: "{{label}} ({{countFrom}}/{{countTo}})",
  rating__right_side_title_table_of_contents: "Erreichte Punktzahl in %",
  rating__average_score_label: "Gesamtdurchschnitt:",

  // Rater Rating
  rater_rating__placeholder_title: "Keine Erhebung zur Bewertung vorhanden",
  rater_rating__placeholder_description: "Sobald eine Erhebung für Sie zur Verfügung steht, erhalten Sie eine E-Mail.",
  rater_rating__status_survey_in_progress: "Projektdurchführung läuft...",
  rater_rating__status_rating_in_progress: "Rating läuft...",
  rater_rating__status_rating_completed: "abgeschlossen",
  rater_rating__status_rating_progress_tooltip: "Fortschritt ihrer Bewertung",
  rater_rating__info_box_title: "Erhebungsinformationen",
  rater_rating__survey_progress_manual: "Manuell (Synchron)",
  rater_rating__participant_table_column_full_rated: "Projektmodule vollständig bewertet ({{count}})",
  rater_rating__action_button_finish_rating: "Bewertung abschließen",
  rater_rating__action_button_finish_rating_tooltip: "Fortschritt der Bewertung",
  rater_rating__action_button_finish_rating_description:
    "Hiermit wird das endgültige Ergebnis Ihrer Bewertung dieser Erhebung festgelegt. Sie können keine Anpassungen an den Ratings der Teilnehmenden mehr vornehmen.",
  rater_rating__action_button_finish_rating_question: "Möchten Sie die Bewertung jetzt abschließen?",

  // Rater Rating Details
  rater_rating_details__header_label: "Bewertungsübersicht",
  rater_rating_details__header_navigation_label: "Erhebungsauswahl",
  rater_rating_details__title: "Titel",
  rater_rating_details__description: "Beschreibung",
  rater_rating_details__settings: "Durchführungseinstellungen",
  rater_rating_details__settings_conditions_of_participation: "Teilnahmebedingung",
  rater_rating_details__settings_survey_procedure: "Erhebungsablauf",
  rater_rating_details__rating_list: "Bewertung",
  rater_rating_details__survey_in_progress: "Projektdurchführung läuft",
  rater_rating_details__survey_finished: "Projektdurchführung beendet",
  rater_rating_details__survey_authentication_anonymous_only: "Nur anonym",
  rater_rating_details__survey_authentication_registered_only: "Nur registriert",
  rater_rating_details__survey_authentication_anonymous_allowed: "Anonym erlaubt",
  rater_rating_details__project_modules: "Projektmodule",
  rater_rating_details__project_module: "Projektmodul",
  rater_rating_details__project_module_max_points: "maximale Punktzahl",
  rater_rating_details__project_module_rated_participants: "Teilnehmende vollständig bewertet ({{count}})",
  rater_rating_details__project_module_no_rating: "ohne Bewertung",

  // Reporting
  reporting_overview_subheader_title: "Reporting",
  reporting_overview_project_modules: "Projektmodule ({{count}})",
  reporting_overview_detail_view_results: "Ergebnisse",
  reporting_overview_detail_view_results_button: "Ergebnisse anzeigen",
  reporting_overview_detail_view_activity_and_toolusage: "Aktivität und Toolnutzung",
  reporting_overview_detail_view_activity_and_toolusage_description:
    "Grafische Darstellung zur Aktivität oder Toolnutzung, während Durchführung dieses Szenarios.",
  reporting_overview_detail_view_final_score: "Finalscore",
  reporting_overview_detail_view_final_score_description:
    "Der Finalscore wird anhand der verfügbaren Bewertungen der Szenarien oder Fragebögen eines Projekts gesetzt und legt die entgültige Bewertung fest.",
  reporting_overview_detail_view_participants_list: "Teilnehmendenliste ({{count}})",
  reporting_overview_maximum_points: "Maximal zu erreichende Punktzahl",
  reporting_overview_average_points: "Durchschnittlich erreichte Punktzahl",
  reporting_overview_reached_points: "Erreichte Punktzahl",
  reporting_overview_final_score_not_set: "Finalscore nicht gesetzt",
  reporting_participant_overview_header_messages: "Nachrichten ({{count}})",
  reporting_participant_overview_total_points_label: "Gesamtpunktzahl:",
  reporting_participant_overview_total_points: "{{points}} von {{maxPoints}} Punkten erreicht",
  reporting_participant_overview_final_score_count: "{{count}} von {{total}} Finalscores gesetzt",
  reporting_participant_overview_final_score_tooltip: "Finalscore vorhanden",
  reporting_result__show_results_for_all_participants: "Ereignisse anzeigen - Alle Teilnehmer ({{count}})",
  reporting_result__events_count: "Ereignisse ({{count}})",
  reporting_result__breadcrumb_project_label: "Projekt:",
  reporting_result__breadcrumb_survey_label: "Erhebung:",
  reporting_result__breadcrumb_module_label: "Projektmodul:",
  reporting_participant_document_overview_table_filter: "{{filterBy}} ({{count}})",
  reporting_result__chat_messages_count: "Nachrichten ({{count}})",
  reporting_result__open_last_scenario_state: "Letzten Stand aufrufen",
  reporting_result__finalscore_label: "Finalscore",
  reporting_result__finalscore_description:
    "Der Finalscore wird anhand der verfügbaren Bewertungen der Szenarien oder Fragebögen eines Projekts gesetzt und legt die endgültige Bewertung fest.",
  reporting_result__max_finalscore_label: "Maximal zu erreichende Punktzahl",
  reporting_result__average_finalscore_label: "Erhebungsdurchschnitt",
  reporting_result__participant_finalscore_label: "Punktzahl dieses Teilnehmenden",
  reporting_result__scenario_progress_label: "Szenariofortschritt",
  reporting_result__opened_relevant_documents_label: "geöffnete relevante Dokumente ({{count}})",
  reporting_result__words_in_completion_mail_label: "Wörter in Abschlussmail",
  reporting_result__words_in_completion_mail_total: "{{count}} Wörter in Abschlussmail",
  reporting_result__result_label: "Ergebnisse",
  reporting_result__documents_overview_label: "Dokumentenübersicht",
  reporting_result__documents_overview_description:
    "Übersicht über die vom Teilnehmenden geöffneten und ungeöffneten Dokumente dieses Szenarios.",
  reporting_result__view_button_label: "Anzeigen",
  reporting_result__activity_and_tool_usage_label: "Aktivität und Toolnutzung",
  reporting_result__activity_and_tool_usage_description:
    "Grafische Darstellung zur Aktivität oder Toolnutzung, während Durchführung dieses Szenarios.",
  reporting_result__finalscore_count_label: "Erreichte Punktzahl",
  reporting_result__finalscore_count: "{{finalScore}} von {{finalScoreMax}} Punkten erreicht",
  reporting_result__finalscore_not_set: "Finalscore nicht gesetzt",
  reporting_result__finalscore_edit_tooltip: "Finalscore bearbeiten",
  reporting_result__events_count_label: "Ereignisse ({{count}})",
  reporting_result__participant_overview_back_label: "Übersicht ({{name}})",
  reporting_result__scenario_state_in_progress_label: "in Bearbeitung...",
  reporting_result__scenario_state_completed_label: "abgeschlossen",
  reporting_result__scenario_state_scoring_completed_label: "Finalscore vorhanden",

  // R Scripts
  r_scripts__header_label: "R-Skripte",
  r_scripts__list_title: "Vorhandene R-Skripte",
  r_scripts__list_placeholder_title: "Kein R-Skript angelegt",
  r_scripts__list_placeholder_text: "Bitte erstellen Sie zunächst ein R-Skript.",
  r_scripts__button_create: "R-Skript anlegen",
  r_scripts__title_placeholder: "Unbenanntes R-Skript",
  r_scripts__description_placeholder: "Bitte geben Sie hier eine Beschreibung ein",
  r_scripts__details_script_label: "Skript",
  r_scripts__details_version_label: "Version",
  r_scripts__details_hash_label: "Git-Commit-Hash",
  r_scripts__details_hash_label_placeholder: "Bitte hier einfügen...",
  r_scripts__details_empty_header_label: "Kein R-Skript ausgewählt",
  r_scripts__details_empty_heading: "Kein R-Skript ausgewählt",
  r_scripts__details_empty_text: "Bitte wählen Sie ein R-Skript auf der linken Seite aus.",
  r_scripts__details_empty_script_placeholder: "Bitte hier den Inhalt des R-Skripts hineinkopieren...",

  // Reporting
  reporting__header_label: "Reporting",
  reporting__carousel_header_scenario: "{{name}} (Szenario)",
  reporting__carousel_header_questionnaire: "{{name}} (Befragung)",
  reporting__survey_average_score: "Erhebungsdurchschnitt: {{score}} Punkte",

  // Reporting - Scoring
  reporting_scoring__overlay_title_default: "Finalscore anzeigen",
  reporting_scoring__overlay_title_participant: "Finalscore anzeigen - {{name}}",
  reporting_scoring__overlay_title_all: "Finalscore anzeigen - Alle Teilnehmenden ({{count}})",
  reporting_scoring__overlay_metadata_project: "Projekt:",
  reporting_scoring__overlay_metadata_survey: "Erhebung:",
  reporting_scoring__overlay_metadata_project_module: "Projektmodul:",
  reporting_scoring__overlay_mean_tooltip: "Gesamtdurchschnitt: {{mean}} Punkte",
  reporting_scoring__scenario_details_header: "Alle Teilnehmenden ({{count}})",
  reporting_scoring__scenario_details_overview_title: "Gesamtdurchschnitt",

  // Chat
  chat__scenario_snapshot_title: "Chatverlauf",

  // Activity and ToolUsage
  activity_tool_usage__header: "Aktivität und Toolnutzung - {{participantName}}",
  activity_tool_usage__header_all: "Aktivität und Toolnutzung - Alle Teilnehmenden ({{participantCount}})",
  activity_tool_usage__subheader_tool_usage: "Toolnutzung",
  activity_tool_usage__subheader_activity: "Aktivität",
  activity_tool_usage__required_documents: "erforderliche Dokumente",
  activity_tool_usage__irrelevant_documents: "irrelevante Dokumente",
  activity_tool_usage__inactivity: "Inaktivität",
  activity_tool_usage__diagram_title_total_time: "Gesamtdauer (Balkendiagram)",
  activity_tool_usage__diagram_title_impulse: "Zeitlicher Verlauf (Impulsdiagramm)",
  activity_tool_usage__diagram_title_line: "Zeitlicher Verlauf (Liniendiagramm)",
  activity_tool_usage__diagram_title_total_time_tooltip:
    "Überblick anhand eines Balkendiagramms des Teilnehmenden Zeitpunkten.",
  activity_tool_usage__diagram_title_total_time_all_participants_tooltip:
    "Überblick anhand eines Balkendiagramms der Teilnehmenden.",
  activity_tool_usage__diagram_title_impulse_tooltip:
    "Überblick anhand eines Impulsdiagramms des Teilnehmenden zu bestimmten Zeitpunkten.",
  activity_tool_usage__diagram_title_line_tooltip: "Überblick anhand eines Liniendiagramms der Teilnehmenden.",
  activity_tool_usage__diagram_footer_resumption_notice:
    "Das Szenario wurde zu folgenden Zeitpunkten vom Teilnehmenden wiederaufgenommen: ",
  activity_tool_usage__tooltip_participants: "Anzahl Teilnehmende: {{participantCount}}",

  //Document overview
  document_overview__erp_row: "(Datensatz)",
  document_overview__title: "Dokumentenübersicht - {{participantName}}",
  document_overview__opened_table_title: "Bereits geöffnet",
  document_overview__not_opened_table_title: "Ungeöffnet",
  document_overview__opened_at: "Öffnungszeitpunkt"
}
// eslint:disable-next-line:max-file-line-count
