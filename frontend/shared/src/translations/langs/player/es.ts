import {LucaI18nLangPlayer} from "../../luca-i18n-lang"

// Do not use nested keys to provide full type safety for
// translation keys!

// syntax: <module/area>__<function>__component, words separated by _

export const translations: LucaI18nLangPlayer = {
  // General
  brand_name: "Luca",
  ok: "Ok",
  cancel: "Cancelar",
  back: "Volver",
  password: "Contraseña",
  password_repeat: "Repetir contraseña",
  email: "Correo electrónico",
  first_name: "Nombre",
  last_name: "Apellido",
  organization: "Organización",
  project: "Proyecto",
  title: "Título",
  accept_button: "Entendido",
  close_button: "Cerrar",
  continue_button: "Seguir",
  cancel_button: "Cancelar",
  login_button: "Iniciar sesión",
  edit_button: "Cambiar",
  signup_button: "Registrarse",
  logout_button: "Cerrar sesión",
  overview: "Resumen",
  preview: "Vista previa",
  confirm_button: "Aplicar",
  minutes: "Minutos",
  finish: "Finalizar",
  used: "usado",

  // Langs
  lang_de: "Alemán",
  lang_en: "Inglés",
  lang_es: "español",

  // General fields or placeholders,
  select__placeholder: "Seleccionar",
  select__empty: "Sin datos",
  loading: "Cargando…",
  saving: "Guardando…",
  salutation_female: "Señora",
  salutation_male: "Señor",

  // Before unload page
  event_before_unload_prompt: " ¿Está seguro de que quiere abandonar esta página?",

  // Error
  error_general: "Ha ocurrido un error",
  error_login: "Ha ocurrido un error durante el registro",
  error_login_message: "No ha podido iniciar sesión. Por favor, compruebe sus datos de acceso.",
  error_sign_up: "Se ha producido un error durante el registro",
  error_sign_up_email_already_registered_message:
    "La dirección de correo electrónico seleccionada ya se está utilizando para otra cuenta",
  error_login_already_participated: "Ya ha participado en la encuesta.",
  error_login_survey_already_ended: "La encuesta ya se ha completado.",

  // Header
  header__app_title: "Luca Office",

  // Calculator
  calculator__label: "Calculadora",
  calculator__invalid_input: "Entrada no válida",
  calculator__copy_to_clipboard: "Copiar resultado al portapapeles",

  //Notes
  notes__label: "Notas",

  // E-Mail Client
  email__create_new_email: "Crear un nuevo correo electrónico",
  email__search_emails: "Buscar correos electrónicos...",
  email__reply: "Responder",
  email__incoming: "Bandeja de entrada",
  email__sent: "Bandeja de salida",
  email__drafts: "Borradores",
  email__draft: "Borrador",
  email__trash: "Papelera",
  email__in_process: "en curso",
  email__no_email_selected: "Ningún correo electrónico seleccionado",
  email__no_emails: "No hay correos electrónicos disponibles",
  email__yesterday: "ayer",
  email__today: "hoy",
  email__title: "Correos electrónicos",
  email__recipient: "Destinatario",
  email__sender: "Remitente",
  email__cc: "CC",
  email__subject: "Asunto",
  email__send_email: "Enviar correo electrónico",
  email__to: "Para",
  email__intro_can_not_delete: "El correo de apertura no se puede borrar",
  email__trash_can_not_delete: "No se pueden borrar los correos electrónicos de la papelera",
  email__move_to_trash: "Mover a la papelera",
  email__move_to_trash_confirm_title: "Mover el correo electrónico a la papelera",
  email__move_to_trash_confirm_text: "¿De verdad quiere mover este correo electrónico a la papelera?",
  email__delete_label: "Eliminar borrador",
  email__delete_draft_tooltip: "Eliminar el borrador irreversiblemente",
  email__delete_draft_confirm_text: "¿De verdad quiere eliminar este borrador irreversiblemente?",
  email__files_label: "Anexos",
  email__files_download_tooltip: "Guardar archivo en „Descargas”",
  email__files_download_disabled_tooltip: "Archivo ya disponible en „Descargas”",
  email__subject_answer_mail: "Re: {{subject}}",

  // Viewer Tools
  viewer_tools__minimize_tool_label: "Minimizar herramienta",
  viewer_tools__close_tool_label: "Cerrar herramienta",
  viewer_tools__text_type_label: "Text Editor",
  viewer_tools__pdf_type_label: "PDF Viewer",
  viewer_tools__image_type_label: "Image Viewer",
  viewer_tools__video_type_label: "Video Player",
  viewer_tools__calc_type_label: "Hoja de cálculo",
  viewer_tools__general_type_label: "File Viewer",

  // Auth
  welcome_office: "Bienvenido al Luca Office!",
  welcome_office_text:
    "Como participante, podrá familiarizarse con diversas herramientas de la vida cotidiana en la oficina en el marco de una tarea predefinida. Tendrá que trabajar y resolver una tarea creada por el jefe de proyecto.",

  auth__open_participation_error_not_found: "Encuesta no encontrada.",
  auth__open_participation_error_not_qualified: "La encuesta no está prevista para la participación abierta.",
  auth__open_participation_error_not_ongoing: "La encuesta ya no está abierta.",
  auth__entry_code: "Código de acceso",
  auth__entry_code_verify: "Comprobar el código de acceso",
  auth__entry_code_placeholder: "000000",
  auth__entry_code_mandatory: "El código de acceso es un campo obligatorio",
  auth__entry_code_length_of_six: "El código de acceso debe tener 6 caracteres",
  auth__entry_code_invalid: "No se ha encontrado ningún token válido",
  auth__enter_code_help_text:
    "Introduzca el código de acceso a la encuesta. Lo encontrará en el correo electrónico de invitación correspondiente.",
  auth__enter_code_error_no_project: "No se ha podido encontrar ningún proyecto con el código de acceso introducido.",
  auth__enter_code_error_survey_not_started: "El proyecto con el código de acceso introducido aún no se ha iniciado.",
  auth__enter_code_error_survey_already_completed:
    "El proyecto con el código de acceso introducido ya se ha completado.",
  auth__enter_code_error_survey_ended:
    "Ya se ha pasado el periodo de encuesta del proyecto con el código de acceso introducido.",
  auth__project_metadata_period: "Periodo",
  auth__project_metadata_processing_time: "Tiempo de procesamiento",
  auth__project_resumption: "Continuar el proyecto",
  auth__project_resumption_navigate_to: "Para reanudar",
  auth__project_project_start_navigate_to: "Al inicio del proyecto",
  auth__project_start_description: "Confirme que desea iniciar el proyecto",
  auth__project_resumption_description:
    "Si ya ha iniciado el proyecto y se ha interrumpido la ejecución, puede continuarlo con la ayuda de su código de acceso.",
  auth__project_resumption_header: "Token de reanudación",
  auth__project_resumption_button: "Continuar el proyecto",
  auth__project_resumption_text:
    "Asegúrese de que su conexión a Internet es estable antes de continuar con el proyecto. Desea continuar con el proyecto ahora?",
  auth__project_resumption_token_error: "El proyecto aún no se ha iniciado o ya ha finalizado",
  auth__project_resumption_token_error_survey_ended: "El proyecto ya está finalizado",
  auth__project_resumption_token_error_no_project: "No se ha encontrado ningún proyecto",
  auth__salutation_label: "¿Cómo quiere que se dirijan a usted?",
  auth__salutation: "Título",
  auth__user_information_registered: "Información del usuario (usuario registrado)",
  auth__user_information: "Información del usuario",
  auth__user_signup_data: "Datos de registro",
  auth__as_registered_user: "Como usuario registrado",
  auth__as_registered_user_help_text:
    "Si ya tiene una cuenta, inicie sesión usando la misma para poder participar o regístrese para utilizar la información del usuario.",
  auth__as_anon_user: "Participación anónima",
  auth__as_anon_user_help_text:
    "Participe en este proyecto con datos de usuario de su elección (también ficticios para una mayor anonimización).",
  auth__as_anon_user_text_error: "Introduzca al menos 1 carácter.",
  auth__as_anon_user_participate: "Participar ahora",
  auth__user_information_help_text:
    "Por favor, introduzca aquí la información del usuario deseado para la correcta ilustración de las tareas:",
  auth__no_account_existing: "¿Aún no tiene cuenta?",
  auth__sign_up_now: "Regístrese aquí",
  auth__sign_up_now_alt: "Regístrese ahora",
  auth__successful_sign_up: "Registro realizado con éxito! Inicie sesión para continuar",

  // Project
  project__start_dialog_title: "'{{title}}' iniciar ahora",
  project__start_dialog_text_1:
    "Este proyecto dura unos {{durationInMinutes}} minutos. Asegúrese de que su conexión a Internet es estable. No podrá reanudar el proyecto por segunda vez.",
  project__start_dialog_text_2: "¿Le gustaría empezar el proyecto ahora?",
  project__start_privacy_policy_hint_text_1: "Lo tengo",
  project__start_privacy_policy_hint_link_1: "Declaración de consentimiento",
  project__start_privacy_policy_hint_text_2: ",",
  project__start_privacy_policy_hint_link_2: "Política de privacidad",
  project__start_privacy_policy_hint_text_3: "y",
  project__start_privacy_policy_hint_link_3: "Condiciones de uso",
  project__start_privacy_policy_hint_text_4:
    "leído, entendido y por la presente lo acepto. (En el caso de menores, se dispone de una declaración de consentimiento del tutor legal).",
  project__start_dialog_text_confirm_modal:
    "Este proyecto dura unos {{durationInMinutes}} minutos. Asegúrese de que su conexión a Internet es estable. Anote el código de acceso para poder reanudar la edición si su conexión a Internet es inestable:",
  project__start_dialog_text_confirm_modal_code: "Su código de acceso: ",
  project__start_confirm: "Iniciar proyecto",
  project__start_now: "Iniciar proyecto ahora",
  project__start_loading: "Iniciod de proyecto...",
  project__end_successful_title: "¡Proyecto finalizado con éxito!",
  project__end_successful_header: "Fin del proyecto",
  project__end_successful_text:
    "Gracias por su participación. Después de apuntar su código de acceso, puede cerrar esta página. Cuando vuelva a conectarse con su código de acceso, podrá ver los datos obtenidos. Una vez finalizada la evaluación, también estará disponible una valoración de la solución de su tarea. Tenga en cuenta que la evaluación de los datos puede tardar varias semanas dependiendo del proyecto.",
  project__end_back_button_confirmation:
    "El proyecto está terminado. Con la confirmación se accede al inicio de sesión.",
  project__welcome_dialog_success_wishes: "¡Buena suerte!",
  project__finish_title: '"{{title}}" finalizar ahora',
  project__remaining_time: "{{time}} restante",
  project__additional_time: "+ {{time}} tiempo adicional",
  project__display_remaining_time: "Mostrar tiempo restante",
  project__display_clock: "Mostrar hora",
  project__back_button_confirmation:
    "De este modo se cancelará el proyecto. Es posible que solo puedas volver a iniciarlo con un nuevo código de acceso.",
  project__wait_for_next_module: "Esperando la aprobación...",
  project__wait_for_next_module_text: "Por favor, espere hasta que se inicie el siguiente módulo del proyecto...",
  project__wait_project_start_text: "Por favor, espere hasta que se inicie el proyecto...",

  // Scenario
  scenario__no_scenario_found: "No se han encontrado escenarios para el proyecto seleccionado.",
  scenario__no_scenario_error: "Se ha producido un error al buscar escenarios.",
  scenario__next_scenario_could_not_be_found: "No se ha podido encontrar el siguiente escenario.",
  scenario_time_up_title: "„{{title}}“ tiempo de procesamiento finalizado",
  scenario_time_up_text: "El tiempo de procesamiento ({{duration}} minutos) para este escenario ha finalizado.",
  scenario__finish_scenario_text: "Nach dem Abschließen können Sie keine Änderungen mehr an diesem Szenario vornehmen.",
  scenario__finish_scenario_question: "¿Quiere finalizar este escenario ahora?",
  scenario__finish_scenario_button: "Finalizar escenario",
  scenario__start_button_label: "Iniciar escenario",

  // Reference Books
  reference_book__title: "Obra de consulta",
  reference_book__title_article: "Obra de consulta (artículo)",
  reference_book__contents: "Índice",
  reference_book__placeholder_title: "No hay obras de consulta",
  reference_book__placeholder: "No hay contenido disponible para este escenario",
  reference_book__chapter_placeholder: "Ningún capítulo seleccionado",
  reference_book__chapter_contents_count: "Índice ({{count}})",
  reference_book__chapter_contents_column: "Artículo",
  reference_book__search: "Buscar en obra de consulta...",

  // Directories and files
  directories_and_files__file_preview_label: "Vista previa del archivo",
  directories_and_files__title: "Carpetas y archivos",
  directories_and_files__directory_detail__heading: "Carpetas y archivos",
  directories_and_files__directory_detail__placeholder: "No hay carpetas ni archivos disponibles",
  directories_and_files__directory_detail__column_header_title: "Título",
  directories_and_files__directory_detail__column_header_type: "Tipo",
  directories_and_files__type_directory: "Carpeta",
  directories_and_files__type_file_image: "Gráfico",
  directories_and_files__type_file_pdf: "PDF",
  directories_and_files__type_file_video: "Vídeo",
  directories_and_files__type_file_spreadsheet: "Hoja de cálculo",
  directories_and_files__type_file_text_document: "Documento de texto",

  // Questionnaire
  questionnaire__finish_event: "Finalizar el evento",
  questionnaire__finish_questionnaire: "Finalizar cuestionario",
  questionnaire__time_up_modal:
    "El tiempo de procesamiento ( {{duration}} minutos) para este cuestionario ha finalizado.",
  questionnaire__start_button_label: "Iniciar cuestionario",
  questionnaire__finish_button_label: "Finalizar",
  questionnaire__title: "Fragebogen",
  questionnaire__finish_questionnaire_text:
    "Una vez finalizado, ya no podrá realizar ningún cambio en este cuestionario.",
  questionnaire__finish_questionnaire_button: "Finalizar cuestionario",
  questionnaire__finish_questionnaire_question: "¿Desea rellenar el cuestionario ahora?",
  questionnaire__question_number: "{{questionNumber}}. Pregunta",

  // Websocket
  websocket_connection_error_invalid_url: "Error de conexión Websocket: Url de conexión no válida",
  websocket_connection_error_common: "Error de conexión Websocket: {{error}}",
  // Text Editor
  text_editor__label: "Tratamiento de textos",
  text_editor__title_placeholder: "Introducir título",
  text_editor__dropdown_title: "Título",
  text_editor__dropdown_text: "Texto",
  text_editor__dropdown_headline: "Título",
  text_editor__create_message:
    "Aquí puede crear documentos de texto directamente en Luca. Estos pueden ser editados posteriormente.",
  text_editor__create_button: "Crear documento de texto",

  // Reporting
  reporting__error_no_participant_found:
    "No se ha podido encontrar ningún participante para esta encuesta con el código de acceso que ha introducido.",
  reporting__error_rating_in_progress: "Aún no hay resultados disponibles. Vuelva a intentarlo más tarde.",
  reporting__show_reporting: "Consultar resultados",
  reporting__show_description_available_token: "Ya ha participado en este proyecto.",
  reporting__show_sub_description_available_token: "En cuanto esté disponible la evaluación, podrá consultarla aquí.",
  reporting__show_description_unavailable_token:
    "El proyecto ha sido finalizado. Si ha participado en la encuesta, puede introducir aquí su código de acceso para consultar los resultados.",
  reporting__overview_header_label: "Resumen del proyecto",
  reporting__overview_no_data_placeholder: "No se han encontrado datos.",
  reporting__overview_ratings_title: "Evaluaciones",
  reporting__overview_participant_score: "Su puntuación"
}
// tslint:disable-next-line:max-file-line-count
