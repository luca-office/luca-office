// Do not use nested keys to provide full type safety for
// translation keys!

// syntax: <module/area>__<function>__component, words separated by _

export const translations = {
  // General
  brand_name: "Luca",
  ok: "Ok",
  cancel: "Abbrechen",
  back: "Zurück",
  password: "Passwort",
  password_repeat: "Passwort wiederholen",
  email: "E-Mail-Adresse",
  first_name: "Vorname",
  last_name: "Nachname",
  organization: "Organisation",
  project: "Projekt",
  title: "Titel",
  accept_button: "Verstanden",
  close_button: "Schließen",
  continue_button: "Weiter",
  cancel_button: "Abbrechen",
  login_button: "Anmelden",
  edit_button: "Ändern",
  signup_button: "Registrieren",
  logout_button: "Abmelden",
  overview: "Übersicht",
  preview: "Vorschau",
  confirm_button: "Anwenden",
  minutes: "Minuten",
  finish: "Abschließen",
  used: "verwendet",

  // Langs
  lang_de: "Deutsch",
  lang_en: "English",
  lang_es: "Spanisch",

  // General fields or placeholders,
  select__placeholder: "Bitte wählen",
  select__empty: "Keine Einträge",
  loading: "Lädt...",
  saving: "Speichert...",
  salutation_female: "Frau",
  salutation_male: "Herr",

  // Before unload page
  event_before_unload_prompt: "Möchten Sie die Seite wirklich verlassen?",

  // Error
  error_general: "Ein Fehler ist aufgetreten",
  error_login: "Bei der Anmeldung ist ein Fehler aufgetreten",
  error_login_message: "Sie konnten nicht angemeldet werden. Bitte prüfen Sie Ihre Zugangsdaten.",
  error_sign_up: "Bei der Registrierung ist ein Fehler aufgetreten",
  error_sign_up_email_already_registered_message:
    "Die gewählte E-Mail-Adresse wird schon für ein anderes Konto verwendet.",
  error_login_already_participated: "Sie haben bereits an der Erhebung teilgenommen.",
  error_login_survey_already_ended: "Die Erhebung ist bereits abgeschlossen.",

  // Header
  header__app_title: "Luca - Office",

  // Calculator
  calculator__label: "Taschenrechner",
  calculator__invalid_input: "Ungültige Eingabe",
  calculator__copy_to_clipboard: "Ergebnis in die Zwischenablage kopieren",

  //Notes
  notes__label: "Notizen",

  // E-Mail Client
  email__create_new_email: "Neue E-Mail verfassen",
  email__search_emails: "E-Mails durchsuchen...",
  email__reply: "Antworten",
  email__incoming: "Eingang",
  email__sent: "Ausgang",
  email__drafts: "Entwürfe",
  email__draft: "Entwurf",
  email__trash: "Papierkorb",
  email__in_process: "in Bearbeitung",
  email__no_email_selected: "Keine E-Mail ausgewählt",
  email__no_emails: "Keine E-Mails vorhanden",
  email__yesterday: "gestern",
  email__today: "heute",
  email__title: "E-Mails",
  email__recipient: "Empfänger",
  email__sender: "Absender",
  email__cc: "CC",
  email__subject: "Betreff",
  email__send_email: "E-Mail versenden",
  email__to: "An",
  email__intro_can_not_delete: "Die Eröffnungsmail kann nicht gelöscht werden",
  email__trash_can_not_delete: "E-Mails im Papierkorb können nicht gelöscht werden",
  email__move_to_trash: "in den Papierkorb verschieben",
  email__move_to_trash_confirm_title: "E-Mail in den Papierkorb verschieben",
  email__move_to_trash_confirm_text: "Möchten Sie diese E-Mail wirklich in den Papierkorb verschieben?",
  email__delete_label: "Entwurf löschen",
  email__delete_draft_tooltip: "Entwurf unwiderruflich löschen",
  email__delete_draft_confirm_text: "Möchten Sie diesen Entwurf wirklich unwiderruflich löschen?",
  email__files_label: "Anhänge",
  email__files_download_tooltip: "Datei sichern in „Downloads“",
  email__files_download_disabled_tooltip: "Datei bereits in „Downloads“ vorhanden",
  email__subject_answer_mail: "Re: {{subject}}",

  // Viewer Tools
  viewer_tools__minimize_tool_label: "Tool minimieren",
  viewer_tools__close_tool_label: "Tool schließen",
  viewer_tools__text_type_label: "Text Editor",
  viewer_tools__pdf_type_label: "PDF Viewer",
  viewer_tools__image_type_label: "Image Viewer",
  viewer_tools__video_type_label: "Video Player",
  viewer_tools__calc_type_label: "Tabellenkalkulation",
  viewer_tools__general_type_label: "File Viewer",

  // Auth
  welcome_office: "Willkommen im Luca-Office!",
  welcome_office_text:
    "Als TeilnehmerIn können Sie sich im Rahmen einer vordefinierten Aufgabe mit verschiedenen Werkzeugen des Büroalltags vertraut machen. Eine durch den Projektverantwortlichen angelegte Aufgabe muss von Ihnen bearbeitet und gelöst werden.",

  auth__open_participation_error_not_found: "Erhebung nicht gefunden.",
  auth__open_participation_error_not_qualified: "Erhebung ist nicht für offene Teilnahme vorgesehen.",
  auth__open_participation_error_not_ongoing: "Erhebung läuft nicht mehr.",
  auth__entry_code: "Zugangscode",
  auth__entry_code_verify: "Zugangscode prüfen",
  auth__entry_code_placeholder: "000000",
  auth__entry_code_mandatory: "Zugangscode ist ein Pflichtfeld",
  auth__entry_code_length_of_six: "Zugangscode muss aus 6 Zeichen bestehen",
  auth__entry_code_invalid: "Kein gültiger Token gefunden",
  auth__enter_code_help_text:
    "Bitte geben Sie den Zugangscode für die Erhebung ein. Sie finden diesen in der entsprechenden Einladungsmail.",
  auth__enter_code_error_no_project:
    "Es konnte kein Projekt mit dem von Ihnen eingegebenen Zugangscode gefunden werden",
  auth__enter_code_error_survey_not_started:
    "Das Projekt mit dem von Ihnen eingegebenen Zugangscode wurde noch nicht gestartet.",
  auth__enter_code_error_survey_already_completed:
    "Das Projekt mit dem von Ihnen eingegebenen Zugangscode wurde bereits abgeschlossen.",
  auth__enter_code_error_survey_ended:
    "Der Erhebungszeitraum des Projektes mit dem von Ihnen eingegebenen Zugangscode wurde bereits überschritten.",
  auth__project_metadata_period: "Zeitraum",
  auth__project_metadata_processing_time: "Bearbeitungszeit",
  auth__project_resumption: "Projekt fortsetzen",
  auth__project_resumption_navigate_to: "Zur Wiederaufnahme",
  auth__project_project_start_navigate_to: "Zum Projektstart",
  auth__project_start_description: "Bitte bestätigen Sie, dass Sie das Projekt starten möchten",
  auth__project_resumption_description:
    "Wenn Sie das Projekt bereits gestartet haben und die Durchführung unterbrochen wurde, können Sie es mit Hilfe ihres Zugangscodes weiterführen.",
  auth__project_resumption_header: "Token zur Wiederaufnahme",
  auth__project_resumption_button: "Projekt jetzt fortsetzen",
  auth__project_resumption_text:
    "Bitte stellen Sie sicher, dass Ihre Internetverbindung stabil ist, bevor Sie die Fortsetzung dieses Projekts starten. Möchten Sie das Projekt jetzt fortsetzen?",
  auth__project_resumption_token_error: "Projekt wurde noch nicht gestartet oder ist bereits beendet",
  auth__project_resumption_token_error_survey_ended: "Projekt ist bereits beendet",
  auth__project_resumption_token_error_no_project: "Es konnte kein Projekt gefunden werden",
  auth__salutation_label: "Wie wollen Sie angesprochen werden?",
  auth__salutation: "Ansprache",
  auth__user_information_registered: "Nutzerinformationen (registrierter Nutzer)",
  auth__user_information: "Nutzerinformationen",
  auth__user_signup_data: "Registrierungsdaten",
  auth__as_registered_user: "Als registrierter Nutzer",
  auth__as_registered_user_help_text:
    "Sollten Sie bereits einen Account haben, melden Sie sich zur Teilnahme am bestem mit diesem an oder registrieren Sie sich, um Nutzerinformationen zu übernehmen.",
  auth__as_anon_user: "Anonyme Teilnahme",
  auth__as_anon_user_help_text:
    "Nehmen Sie mit selbst gewählten Nutzerinformationen (auch fiktiven zur weiteren Anonymisierung) an diesem Projekt teil.",
  auth__as_anon_user_text_error: "Geben Sie bitte mindestens 1 Zeichen ein.",
  auth__as_anon_user_participate: "Jetzt teilnehmen",
  auth__user_information_help_text:
    "Bitte geben Sie zur korrekten Veranschaulichung der Aufgabenstellungen hier die gewünschten Nutzerinformationen an:",
  auth__no_account_existing: "Noch kein Account vorhanden?",
  auth__sign_up_now: "Jetzt hier registrieren",
  auth__sign_up_now_alt: "Jetzt registrieren",
  auth__successful_sign_up: "Erfolgreiche Registrierung! Bitte melden Sie sich an, um fortzufahren",

  // Project
  project__start_dialog_title: "'{{title}}' jetzt starten",
  project__start_dialog_text_1:
    "Dieses Projekt nimmt in etwa {{durationInMinutes}} Minuten in Anspruch. Bitte stellen Sie sicher, dass Ihre Internetverbindung stabil ist. Sie können das Projekt kein zweites Mal wiederaufnehmen.",
  project__start_dialog_text_2: "Möchten Sie das Projekt jetzt starten?",
  project__start_privacy_policy_hint_text_1: "Ich habe die",
  project__start_privacy_policy_hint_link_1: "Einwilligungserklärung",
  project__start_privacy_policy_hint_text_2: ",",
  project__start_privacy_policy_hint_link_2: "Datenschutzhinweise",
  project__start_privacy_policy_hint_text_3: "und",
  project__start_privacy_policy_hint_link_3: "Nutzungsbedingungen",
  project__start_privacy_policy_hint_text_4:
    "gelesen, verstanden und stimme diesen hiermit zu. (Im Falle der Minderjährigkeit liegt eine Einwilligungserklärung der Erziehungsberechtigten vor.)",
  project__start_dialog_text_confirm_modal:
    "Dieses Projekt nimmt in etwa {{durationInMinutes}} Minuten in Anspruch. Bitte stellen Sie sicher, dass Ihre Internetverbindung stabil ist. Bitte notieren sie sich den Zugangscode, um die Bearbeitung bei einer instabilen Internetverbindung wiederaufnehmen zu können:",
  project__start_dialog_text_confirm_modal_code: "Ihr Zugangscode: ",
  project__start_confirm: "Projekt starten",
  project__start_now: "Projekt jetzt starten",
  project__start_loading: "Projekt startet...",
  project__end_successful_title: "Projekt erfolgreich beendet!",
  project__end_successful_header: "Projektende",
  project__end_successful_text:
    "Vielen Dank für Ihre Teilnahme. Nachdem Sie sich Ihren Zugangscode notiert haben, können Sie diese Seite schließen. Wenn Sie sich erneut mit Ihrem Zugangscode anmelden, können Sie die erhobenen Daten einsehen. Sobald die Auswertung abgeschlossen ist, wird außerdem eine Bewertung Ihrer Aufgabenlösung verfügbar gemacht. Bitte bedenken Sie, dass eine Auswertung der Daten projektspezifisch einige Wochen in Anspruch nehmen kann.",
  project__end_back_button_confirmation: "Das Projekt ist beendet. Mit Bestätigung gelangen Sie zum Login.",
  project__welcome_dialog_success_wishes: "Viel Erfolg!",
  project__finish_title: '"{{title}}" jetzt abschließen',
  project__remaining_time: "{{time}} verbleibend",
  project__additional_time: "+ {{time}} zusätzliche Zeit",
  project__display_remaining_time: "Verbleibende Zeit anzeigen",
  project__display_clock: "Uhrzeit anzeigen ",
  project__back_button_confirmation:
    "Hierdurch brechen Sie das Projekt ab. Eventuell können Sie es nur mit einem neuen Zugangscode erneut starten.",
  project__wait_for_next_module: "Warten auf Freigabe...",
  project__wait_for_next_module_text: "Bitte warten bis nächstes Projektmodul gestartet wird...",
  project__wait_project_start_text: "Bitte warten bis das Projekt gestartet wird...",

  // Scenario
  scenario__no_scenario_found: "Für das gewählte Projekt konnten keine Szenarien gefunden werden.",
  scenario__no_scenario_error: "Es ist ein Fehler beim Suchen von Szenarien eingetreten.",
  scenario__next_scenario_could_not_be_found: "Das nächste Szenario konnte nicht gefunden werden.",
  scenario_time_up_title: "„{{title}}“ Bearbeitungszeit abgelaufen",
  scenario_time_up_text: "Die Bearbeitungszeit ({{duration}} Minuten) für dieses Szenario ist abgelaufen.",
  scenario__finish_scenario_text: "Nach dem Abschließen können Sie keine Änderungen mehr an diesem Szenario vornehmen.",
  scenario__finish_scenario_question: "Möchten Sie dieses Szenario jetzt abschließen?",
  scenario__finish_scenario_button: "Szenario abschließen",
  scenario__start_button_label: "Szenario starten",

  // Reference Books
  reference_book__title: "Nachschlagewerk",
  reference_book__title_article: "Nachschlagewerk (Artikel)",
  reference_book__contents: "Inhaltsverzeichnis",
  reference_book__placeholder_title: "Keine Nachschlagewerke",
  reference_book__placeholder: "Es stehen keine Inhalte für dieses Szenario zur Verfügung",
  reference_book__chapter_placeholder: "Kein Kapitel ausgewählt",
  reference_book__chapter_contents_count: "Inhaltsverzeichnis ({{count}})",
  reference_book__chapter_contents_column: "Artikel",
  reference_book__search: "Nachschlagewerk durchsuchen...",

  // Directories and files
  directories_and_files__file_preview_label: "Dateivorschau",
  directories_and_files__title: "Ordner und Dateien",
  directories_and_files__directory_detail__heading: "Ordner und Dateien",
  directories_and_files__directory_detail__placeholder: "Keine Ordner oder Dateien vorhanden",
  directories_and_files__directory_detail__column_header_title: "Titel",
  directories_and_files__directory_detail__column_header_type: "Typ",
  directories_and_files__type_directory: "Ordner",
  directories_and_files__type_file_image: "Grafik",
  directories_and_files__type_file_pdf: "PDF",
  directories_and_files__type_file_video: "Video",
  directories_and_files__type_file_spreadsheet: "Tabellenkalkulation",
  directories_and_files__type_file_text_document: "Textdokument",

  // Questionnaire
  questionnaire__finish_event: "Ereignis abschließen",
  questionnaire__finish_questionnaire: "Fragebogen abschließen",
  questionnaire__time_up_modal: "Die Bearbeitungszeit ({{duration}} Minuten) für diesen Fragebogen ist abgelaufen.",
  questionnaire__start_button_label: "Fragebogen starten",
  questionnaire__finish_button_label: "Abschließen",
  questionnaire__title: "Fragebogen",
  questionnaire__finish_questionnaire_text:
    "Nach dem Abschließen können Sie keine Änderungen mehr an diesem Fragebogen vornehmen.",
  questionnaire__finish_questionnaire_button: "Fragebogen abschließen",
  questionnaire__finish_questionnaire_question: "Möchten Sie den Fragebogen jetzt abschließen?",
  questionnaire__question_number: "{{questionNumber}}. Frage",

  // Websocket
  websocket_connection_error_invalid_url: "Fehler bei der Websocketverbindung: Invalide Verbindungsurl",
  websocket_connection_error_common: "Fehler bei der Websocketverbindung: {{error}}",
  // Text Editor
  text_editor__label: "Textverarbeitung",
  text_editor__title_placeholder: "Titel eingeben",
  text_editor__dropdown_title: "Titel",
  text_editor__dropdown_text: "Text",
  text_editor__dropdown_headline: "Überschrift",
  text_editor__create_message:
    "Textdokumente können Sie hier direkt in Luca erstellen. Diese sind nachträglich bearbeitbar.",
  text_editor__create_button: "Textdokument erstellen",

  // Reporting
  reporting__error_no_participant_found:
    "Es konnte kein Teilnehmender zu dieser Erhebung mit dem von Ihnen eingegebenen Zugangscode gefunden werden.",
  reporting__error_rating_in_progress:
    "Es sind noch keine Ergebnisse verfügbar. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.",
  reporting__show_reporting: "Ergebnisse einsehen",
  reporting__show_description_available_token: "Sie haben bereits an diesem Projekt teilgenommen.",
  reporting__show_sub_description_available_token:
    "Sobald die Bewertung verfügbar ist, können Sie diese hier einsehen.",
  reporting__show_description_unavailable_token:
    "Das Projekt wurde beendet. Sollten Sie an der Erhebung teilgenommen haben, können Sie hier Ihren Zugangscode eingeben, um Ihre Ergebnisse einzusehen.",
  reporting__overview_header_label: "Projekt Übersicht",
  reporting__overview_no_data_placeholder: "Es konnten keine Daten gefunden werden.",
  reporting__overview_ratings_title: "Bewertungen",
  reporting__overview_participant_score: "Ihre Punktzahl"
}
// tslint:disable-next-line:max-file-line-count
