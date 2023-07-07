// Do not use nested keys to provide full type safety for
// translation keys!

import {LucaI18nLangPlayer} from "../../luca-i18n-lang"

// syntax: <module/area>__<function>__component, words separated by _

export const translations: LucaI18nLangPlayer = {
  // General
  brand_name: "Luca",
  ok: "Ok",
  cancel: "Cancel",
  back: "Back",
  password: "Password",
  password_repeat: "Repeat password",
  email: "Email address",
  first_name: "First name",
  last_name: "Last name",
  organization: "Organization",
  project: "Project",
  title: "Title",
  accept_button: "Accept",
  close_button: "Close",
  continue_button: "Continue",
  cancel_button: "Cancel",
  login_button: "Login",
  edit_button: "Edit",
  signup_button: "Signup",
  logout_button: "Logout",
  overview: "Overview",
  preview: "Preview",
  confirm_button: "Confirm",
  minutes: "Minutes",
  finish: "Finish",
  used: "Used",

  // Langs
  lang_de: "German",
  lang_en: "English",
  lang_es: "Spanish",

  // General fields or placeholders,
  select__placeholder: "Please select",
  select__empty: "No entries",
  loading: "Loading...",
  saving: "Saving...",
  salutation_female: "Mrs",
  salutation_male: "Mr",

  // Before unload page
  event_before_unload_prompt: "Do you really want to leave?",

  // Error
  error_general: "An error has occurred",
  error_login: "An error occurred during login",
  error_login_message: "You could not be logged in. Please check your access data.",
  error_sign_up: "An error occurred during signup",
  error_sign_up_email_already_registered_message:
    "The selected email address is already being used for another account.",
  error_login_already_participated: "You have already participated in the survey.",
  error_login_survey_already_ended: "The survey has been completed.",

  // Header
  header__app_title: "Luca - Office",

  // Calculator
  calculator__label: "Calculator",
  calculator__invalid_input: "Invalid input",
  calculator__copy_to_clipboard: "Copy result to clipboard",

  //Notes
  notes__label: "Notes",

  // Email Client
  email__create_new_email: "Compose new email",
  email__search_emails: "Search emails...",
  email__reply: "Reply",
  email__incoming: "Incoming",
  email__sent: "Sent",
  email__drafts: "Drafts",
  email__draft: "Draft",
  email__trash: "Trash",
  email__in_process: "In process",
  email__no_email_selected: "No email selected",
  email__no_emails: "No emails present",
  email__yesterday: "Yesterday",
  email__today: "Today",
  email__title: "Emails",
  email__recipient: "Recipient",
  email__sender: "Sender",
  email__cc: "cc",
  email__subject: "Subject",
  email__send_email: "Send email",
  email__to: "To",
  email__intro_can_not_delete: "The opening email cannot be deleted",
  email__trash_can_not_delete: "Emails in the trash cannot be deleted",
  email__move_to_trash: "Move to trash",
  email__move_to_trash_confirm_title: "Move email to the trash",
  email__move_to_trash_confirm_text: "Do you really want to move this email to the trash?",
  email__delete_label: "Delete draft",
  email__delete_draft_tooltip: "Delete draft irrevocably",
  email__delete_draft_confirm_text: "Do you really want to delete this draft irrevocably?",
  email__files_label: "Files",
  email__files_download_tooltip: "Save file in 'Downloads'",
  email__files_download_disabled_tooltip: "File already available in 'Downloads'",
  email__subject_answer_mail: "Re: {{subject}}",

  // Viewer Tools
  viewer_tools__minimize_tool_label: "Minimize tool",
  viewer_tools__close_tool_label: "Close tool",
  viewer_tools__text_type_label: "Text editor",
  viewer_tools__pdf_type_label: "PDF viewer",
  viewer_tools__image_type_label: "Image viewer",
  viewer_tools__video_type_label: "Video player",
  viewer_tools__calc_type_label: "Spreadsheet",
  viewer_tools__general_type_label: "File viewer",

  // Auth
  welcome_office: "Welcome to Luca - Office!",
  welcome_office_text:
    "As a participant, you can familiarise yourself with various tools used in everyday office work within the framework of a predefined task. You have to work on and solve a task set up by the project manager.",

  auth__open_participation_error_not_found: "Survey not found.",
  auth__open_participation_error_not_qualified: "Survey is not intended for open participation.",
  auth__open_participation_error_not_ongoing: "Survey is no longer running.",
  auth__entry_code: "Entry code",
  auth__entry_code_verify: "Verify entry code",
  auth__entry_code_placeholder: "000000",
  auth__entry_code_mandatory: "Entry code is mandatory",
  auth__entry_code_length_of_six: "Access code must consist of 6 characters",
  auth__entry_code_invalid: "No valid token found",
  auth__enter_code_help_text:
    "Please enter the access code for the survey. You will find it in the corresponding invitation email.",
  auth__enter_code_error_no_project: "No project could be found with the access code you entered",
  auth__enter_code_error_survey_not_started: "The project with the access code you entered has not yet been started.",
  auth__enter_code_error_survey_already_completed:
    "The project with the access code you entered has already been completed.",
  auth__enter_code_error_survey_ended:
    "The survey period of the project that you entered with the access code has already been exceeded.",
  auth__project_metadata_period: "Period",
  auth__project_metadata_processing_time: "Processing time",
  auth__project_resumption: "Continue project",
  auth__project_resumption_navigate_to: "Resume project",
  auth__project_project_start_navigate_to: "Start project",
  auth__project_start_description: "Please confirm that you would like to start the project",
  auth__project_resumption_description:
    "If you have already started the project and the implementation was interrupted, you can continue it with the help of your access code.",
  auth__project_resumption_header: "Resumption token",
  auth__project_resumption_button: "Continue project now",
  auth__project_resumption_text:
    "Please make sure that your internet connection is stable before you start continuing this project. Would you like to continue the project now?",
  auth__project_resumption_token_error: "Project has not been started yet or has already ended",
  auth__project_resumption_token_error_survey_ended: "Project has already ended",
  auth__project_resumption_token_error_no_project: "No project could be found",
  auth__salutation_label: "How would you like to be addressed?",
  auth__salutation: "Adress",
  auth__user_information_registered: "User information (registered user)",
  auth__user_information: "User information",
  auth__user_signup_data: "Sign up data",
  auth__as_registered_user: "As a registered user",
  auth__as_registered_user_help_text:
    "If you already have an account, log in to participate or register to take over user information.",
  auth__as_anon_user: "Anonymous participation",
  auth__as_anon_user_help_text:
    "Participate in this project with user information of your own choice (also fictitious ones for further anonymization).",
  auth__as_anon_user_text_error: "Please enter at least 1 character.",
  auth__as_anon_user_participate: "Participate now",
  auth__user_information_help_text:
    "Please enter the desired user information here for a correct illustration of the tasks:",
  auth__no_account_existing: "No account available yet?",
  auth__sign_up_now: "Sign up here now",
  auth__sign_up_now_alt: "Sign up now",
  auth__successful_sign_up: "Registration successful! Please log in to continue",

  // Project
  project__start_dialog_title: "'{{title}}' start now",
  project__start_dialog_text_1:
    "This project takes about {{durationInMinutes}} minutes. Please make sure that your internet connection is stable. You will not be able to resume the project a second time.",
  project__start_dialog_text_2: "Would you like to start the project now?",
  project__start_privacy_policy_hint_text_1: "I have read and understood the",
  project__start_privacy_policy_hint_link_1: "Declaration of consent",
  project__start_privacy_policy_hint_text_2: ",",
  project__start_privacy_policy_hint_link_2: "Privacy policy",
  project__start_privacy_policy_hint_text_3: "and",
  project__start_privacy_policy_hint_link_3: "Terms of use",
  project__start_privacy_policy_hint_text_4:
    "and herewith agree to them. (In the case of minors, a declaration of consent from a legal guardian is available.)",
  project__start_dialog_text_confirm_modal:
    "This project takes about {{durationInMinutes}} minutes. Please ensure that your internet connection is stable. Please note the access code so that you can resume editing if your internet connection is unstable:",
  project__start_dialog_text_confirm_modal_code: "Your access code:",
  project__start_confirm: "Start project",
  project__start_now: "Start project now",
  project__start_loading: "Project starts...",
  project__end_successful_title: "Project successfully completed!",
  project__end_successful_header: "End of project",
  project__end_successful_text:
    "Thank you for your participation. After you have noted your access code, you can close this site. When you log in with your access code again, you will be able to view the data collected. Once the scoring is complete, an evaluation of your task solution will also be made available. Please bear in mind that an evaluation of the data can take several weeks, depending on the project.",
  project__end_back_button_confirmation: "The project is completed. Confirmation takes you to the login.",
  project__welcome_dialog_success_wishes: "Good luck!",
  project__finish_title: 'complete "{{title}}" now',
  project__remaining_time: "{{time}} remaining",
  project__additional_time: "+ {{time}} additional time",
  project__display_remaining_time: "Display remaining time",
  project__display_clock: "Display time ",
  project__back_button_confirmation:
    "This will cancel the project. You may only be able to start it again with a new access code.",
  project__wait_for_next_module: "Waiting for release...",
  project__wait_for_next_module_text: "Please wait until the next project module is started...",
  project__wait_project_start_text: "Please wait until the project is started...",

  // Scenario
  scenario__no_scenario_found: "No scenarios could be found for the selected project.",
  scenario__no_scenario_error: "An error occurred while searching for scenarios.",
  scenario__next_scenario_could_not_be_found: "The next scenario could not be found.",
  scenario_time_up_title: "„{{title}}“ Processing time expired",
  scenario_time_up_text: "The processing time ({{duration}} minutes) for this scenario has expired.",
  scenario__finish_scenario_text: "Once completed, you can no longer make any changes to this scenario.",
  scenario__finish_scenario_question: "Would you like to close this scenario now?",
  scenario__finish_scenario_button: "Close scenario",
  scenario__start_button_label: "Start scenario",

  // Reference Books
  reference_book__title: "Reference book",
  reference_book__title_article: "Reference book (Artikel)",
  reference_book__contents: "Table of contents",
  reference_book__placeholder_title: "No reference books",
  reference_book__placeholder: "There is no content available for this scenario",
  reference_book__chapter_placeholder: "No chapter selected",
  reference_book__chapter_contents_count: "Table of contents ({{count}})",
  reference_book__chapter_contents_column: "Article",
  reference_book__search: "Search the reference book...",

  // Directories and files
  directories_and_files__file_preview_label: "File preview",
  directories_and_files__title: "Folders and files",
  directories_and_files__directory_detail__heading: "Folders and files",
  directories_and_files__directory_detail__placeholder: "No folders or  files available",
  directories_and_files__directory_detail__column_header_title: "Title",
  directories_and_files__directory_detail__column_header_type: "Type",
  directories_and_files__type_directory: "Folder",
  directories_and_files__type_file_image: "Graphic",
  directories_and_files__type_file_pdf: "PDF",
  directories_and_files__type_file_video: "Video",
  directories_and_files__type_file_spreadsheet: "Spreadsheet",
  directories_and_files__type_file_text_document: "Text file",

  // Questionnaire
  questionnaire__finish_event: "Complete event",
  questionnaire__finish_questionnaire: "Complete questionnaire",
  questionnaire__time_up_modal: "The processing time ({{duration}} minutes) for this questionnaire has expired.",
  questionnaire__start_button_label: "Start questionnaire",
  questionnaire__finish_button_label: "Complete",
  questionnaire__title: "Questionnaire",
  questionnaire__finish_questionnaire_text: "Once completed, you can no longer make any changes to this questionnaire.",
  questionnaire__finish_questionnaire_button: "Complete questionnaire",
  questionnaire__finish_questionnaire_question: "Would you like to complete the questionnaire now?",
  questionnaire__question_number: "Question {{questionNumber}}",

  // Websocket
  websocket_connection_error_invalid_url: "Websocket connection error: Invalid connection url",
  websocket_connection_error_common: "Websocket connection error: {{error}}",
  // Text Editor
  text_editor__label: "Text processing",
  text_editor__title_placeholder: "Enter title",
  text_editor__dropdown_title: "Title",
  text_editor__dropdown_text: "Text",
  text_editor__dropdown_headline: "Headline",
  text_editor__create_message: "You can create text documents here directly in Luca. They can be edited later.",
  text_editor__create_button: "Create text file",

  // Reporting
  reporting__error_no_participant_found:
    "No participant could be found for this survey with the access code you entered.",
  reporting__error_rating_in_progress: "There are no results available yet. Please try again later.",
  reporting__show_reporting: "View results",
  reporting__show_description_available_token: "You have already participated in this project.",
  reporting__show_sub_description_available_token: "As soon as the assessment is available, you can view it here.",
  reporting__show_description_unavailable_token:
    "The project has ended. If you participated in the survey, you can enter your access code here to view your results.",
  reporting__overview_header_label: "Project overview",
  reporting__overview_no_data_placeholder: "No data could be found.",
  reporting__overview_ratings_title: "Ratings",
  reporting__overview_participant_score: "Your score"
}
// tslint:disable-next-line:max-file-line-count
