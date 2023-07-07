/* eslint-disable max-lines */
import {LucaI18nLangBackoffice} from "../../luca-i18n-lang"

// Do not use nested keys to provide full type safety for
// translation keys!

// syntax: <module/area>__<function>__component, words separated by _

export const translations: LucaI18nLangBackoffice = {
  // General
  brand_name: "Luca",
  edit: "Editar",
  confirm: "Confirmar",
  confirmed: "Confirmado",
  select: "Seleccionar",
  table_of_contents: "Tabla de contenidos",
  graphics: "Gráficos",
  display_graphics: "Muestra de gráficos",

  // Fields / Labels
  password: "Contraseña",
  email: "Dirección de correo electrónico",
  email_short: "Correo electrónico",
  first_name: "Nombre",
  last_name: "Apellido",
  organization: "Organización",
  description: "Descripción",
  edit_description: "Editar descripción",
  title: "Título",
  add: "Añadir",
  category: "Categoría",
  file: "Archivo",
  files: "Archivos",
  video: "Vídeo",
  logo: "Logo",
  name: "Nombre",
  salutation: "Título",
  selection: "Selección",
  salutation_long: "¿Cómo quiere que se dirijan a usted?",
  question: "Pregunta",
  questions: "Preguntas",
  create_date_title: "Fecha de creación",
  author_title: "Autor",
  question_description: "Pregunta",
  type: "Tipo",
  document: "Documento",

  // Common
  common__no_data: "No hay datos disponibles...",

  // Edit
  edit__image: "Editar imagen",
  edit__video: "Editar vídeo",

  // Preview
  preview__general: "Ver",
  preview__image: "Ver gráfico",
  preview__video: "Ver vídeo",

  // General fields or placeholders,
  select__placeholder: "Por favor, seleccione",
  select__empty: "No hay entradas",
  element__unknown: "Desconocido",

  // Not Found
  not_found__label: "No se ha encontrado la página solicitada",

  // Dialog
  dialog__delete_element_title: "Eliminar elemento",
  dialog__archive_element_title: "Elemento de archivo",
  dialog__confirm_title: "Confirmar acción",
  dialog__delete_element_text: "¿De verdad quieres eliminar el elemento? Esta acción no se puede revertir",
  dialog__archive_element_text: "¿Realmente quieres archivar el elemento? Esta operación no se puede revertir",

  // Headlines
  overview: "Resumen",
  preview: "Vista previa",
  information: "Información",

  // Auth
  login: "Login",
  login_hint:
    "Para poder utilizar todas las funciones en Luca, debes iniciar sesión. Si todavía no tiene datos de acceso, regístrese primero.",
  register: "Registración",
  register_hint:
    "Con su registro en Luca, se le creará una cuenta de usuario. A continuación, puede utilizar esta cuenta de usuario para crear sus propios proyectos o participar en simulaciones usted mismo.",
  register_backoffice_terms_and_conditions_hint_text_1: "Tengo leído, entendido y aceptado la",
  register_backoffice_terms_and_conditions_hint_link_1: "formulario de consentimiento",
  register_backoffice_terms_and_conditions_hint_text_2: ",",
  register_backoffice_terms_and_conditions_hint_link_2: "aviso de privacidad",
  register_backoffice_terms_and_conditions_hint_text_3: "y",
  register_backoffice_terms_and_conditions_hint_link_3: "condiciones de uso",
  register_backoffice_terms_and_conditions_hint_text_4: "leído, entendido y por la presente de acuerdo con estos",
  privacy_policy_confirmation_required__heading: "Cambios en las condiciones de uso",
  privacy_policy_confirmation_required__text: "Por favor, confirme las condiciones de uso modificadas",
  privacy_policy_confirmation_required__confirm_button: "Aceptar",
  to_login: "Para iniciar sesión",
  to_register: "Para registrarse",
  welcome_headline: "¡Bienvenido!",
  welcome_text:
    "Luca es una plataforma de aprendizaje para simular situaciones realistas en la oficina. Luca se utiliza en la formación de profesiones comerciales para familiarizar a los alumnos con su futuro lugar de trabajo y proporcionar a los profesores un medio de apoyo directo.",
  auth__request_password_reset:
    "Si ha perdido su contraseña, puede restablecerla mediante un enlace de confirmación. El enlace se enviará a su buzón de correo electrónico para asegurarse de que está autorizado a acceder a él.",
  auth__reset_password:
    "Por favor, establezca su nueva contraseña. Deberá repetir la contraseña que solicitó para evitar posibles errores de escritura.",

  // Langs
  lang_de: "alemán",
  lang_en: "inglés",
  lang_es: "español",

  //Error
  error_general: "Se ha producido un error",

  //Units
  unit__just_now: "Inmediatamente",
  unit__seconds_singular: "Segundo",
  unit__seconds_plural: "Segundos",
  unit__minutes_short: "min",
  unit__minutes_plural: "Minutos",
  unit__hours_singular: "Hora",
  unit__hours_plural: "Horas",
  unit__days_singular: " Día",
  unit__days_plural: "Días",
  unit__weeks_singular: "Semana",
  unit__weeks_plural: "Semanas",
  unit__months_singular: "Mes",
  unit__months_plural: "Meses",
  unit__years_singular: "año",
  unit__years_plural: "años",

  //Dates
  distance_past_plural: "Antes de {{distance}}",
  distance_past: "Antes de  {{distance}}",
  distance_future_plural: "en {{distance}}",
  distance_future: "Falta {{distance}}",
  distance_today: "Hoy",

  // Placeholder
  placeholder__tags: "No se han creado etiquetas",
  placeholder__indicate_more_tags: "...",
  placeholder__no_entry: "ninguna especificación",
  placeholder__add_to_selection: "Añadir a la selección",
  placeholder__remove_from_selection: "Eliminar de la selección",
  placeholder__already_assigned: "Ya asignado",
  placeholder__disabled_cause_of_single_selection: "Sólo se puede seleccionar un módulo",
  placeholder__data_present: "Disponible",
  placeholder__data_unavailable: "No disponible",

  // Notification
  notification__error: "Atención",
  notification__warning: "Aviso importante",
  notification__success: "Acción exitosa",
  notification__message_graphql_error: "Se ha producido un error en la comunicación del backend.",
  notification__message_network_error: "Se ha producido un error de red.",
  notification__message_unauthorized: "Su sesión ha expirado. Por favor, inicie la sesión de nuevo.",
  notification__message_email_folder_delay:
    "Los futuros correos electrónicos no están disponibles en la ubicación de archivo establecida. Por favor, compruebe la configuración de la hora del correo electrónico",
  notification__title_successful_registration: "Registración exitosa",
  notification__message_successful_registration:
    "Su registración fue exitosa. Por favor, identifíquese para continuar. ",
  notification__title_successful_chat_message_send: "Mensaje enviado con éxito",
  notification__message_successful_chat_message_send: "El mensaje fue enviado a todos los participantes seleccionados.",

  //Header
  header__label_editor: "Luca Editor",
  header__label_manager: "Luca Manager",
  header__label_rating: "Luca Rating",
  header__label_user_management: "Luca Administración de usuarios",
  header__user_logout: "Cerrar la sesión",
  header__user_my_account: "Mi cuenta",

  //Content (general)
  content__not_found: "El elemento que se busca no está disponible",
  content__not_found_headline: "Detalles no disponibles",

  //Sub-Header
  subheader__typ: "Tipo",
  subheader__sort: "Clasificación",
  subheader__state: "Estado",
  subheader__search: "Búsqueda",
  subheader__search_placeholder: "Buscar por título, descripción o autor...",
  subheader__filter_by_all_entities: "Todo {{entity}}",
  subheader__filter_by_owned_entities: "Mi {{entity}}",
  subheader__filter_by_selected_entities: "Seleccionado({{count}})",
  subheader__filter_by_published: "Publicado",
  subheader__filter_by_unpublished: "No publicado",
  subheader__filter_by_show_all: "Todos",
  subheader__filter_by_in_progress: "En progreso",
  subheader__filter_by_done: "Sellado",
  subheader__sort_by_author: "Por autor",
  subheader__sort_by_name: "Por nombre",
  subheader__sort_by_creation_date: "Por fecha de creación",
  subheader__sort_by_duration: "Por duración",
  subheader__sort_by_title: "Por título",
  subheader__filter_default_title: "Elementos",
  subheader__filter_by_rating_done: "completed",
  subheader__sort_by_date: "Por fecha",

  //Navigation
  navigation__scenarios: "scenarios",
  navigation__sample_companies: "Empresas modelo",
  navigation__questionnaires: "Cuestionario",
  navigation__reference_books: "Libros de referencia",
  navigation__my_account: "Mi cuenta",
  navigation__projects: "Proyectos",
  navigation__events: "Eventos",
  navigation__r_scripts: "R-scripts",

  // Detail Card (projects, scenarios)
  detail_card__title_createdAt: "Fecha de creación",
  detail_card__title_author: "Autor",
  detail_card__label_status: "Estado",
  detail_card__status_editable: "En trámite ",
  detail_card__status_finalized: "Sellado",
  detail_card__status_completed: "Terminado",
  detail_card__status_running: "En curio",

  // Reference Books
  reference_books__filter_title: "Capítulo",
  reference_books__edit_description: "Editar descripción",
  reference_books__card_article: "Artículo",
  reference_books__card_articles: "Artículo",
  reference_books__create_reference_book: "Crear nuevo capítulo",
  reference_books__create_reference_book_title_placeholder: "Introduzca el título del capítulo...",
  reference_books__create_reference_book_description_label: "Descripción del capítulo",
  reference_books__create_reference_book_description_placeholder:
    "Introduzca aquí el texto de descripción del capítulo...",
  reference_books__create_reference_book_delete_dialog: "¿Debe eliminarse definitivamente el capítulo?",
  reference_books__create_reference_book_article_delete_dialog: "¿Debe eliminarse definitivamente el artículo?",
  reference_books__sub_header_title: "Capítulo",
  reference_books__sub_header_overview: "Selección de capítulos",
  reference_books__create_reference_book_article_title: "Crear nuevo artículo",
  reference_books__create_reference_book_article_title_placeholder: "Introduzca el título del artículo...",
  reference_books__table_of_contents: "Tabla de contenidos",
  reference_books__table_of_contents_count: "Tabla de contenidos ({{count}})",
  reference_books__table_of_contents_placeholder: "No hay artículos disponibles",
  reference_books__add_new_article: "Añadir otro artículo",
  reference_books__add_new_article_dialog_title: "Añadir elemento de artículo",
  reference_books__creation_bar_title: "Añadir otro elemento",
  reference_books__create_text_content_title: "Crear bloque de texto",
  reference_books__create_image_content_title: "Crear elemento de imagen",
  reference_books__edit_text_content_title: "Editar bloque de texto",
  reference_books__create_text_content_confirm: "Crear",
  reference_books__article_content_type_text: "Bloque de texto",
  reference_books__article_content_type_text_description: "Añade más secciones de texto a tu artículo",
  reference_books__article_content_type_graphic: "Gráfico",
  reference_books__article_content_type_graphic_description: "Añade más gráficos a tu artículo",

  reference_books__article_content_type_video: "Vídeos",
  reference_books__article_content_type_video_description: "Añade más vídeos a tu artículo",
  reference_books__article_content_type_pdf: "PDF",
  reference_books__article_content_type_pdf_description: "Añade más archivos PDF a tu artículo",
  reference_books__article_content_view_pdf: "Ver en el visor de PDF",
  reference_books__article_table_header_article: "Artículo",
  reference_books__duplicate_button: "Duplicar capítulo",
  reference_books__publish_button: "Publicar capítulo",
  reference_books__header_button_publish_tooltip: "El capítulo está publicado y no se puede editar más",
  reference_books__header_orly_publish_title: "Publicar el capítulo",
  reference_books__header_orly_publish_button: "Publicar",
  reference_books__header_orly_publish_text:
    "¿De verdad usted quiere publicar el capítulo? Después de eso, no es posible realizar más cambios en el capítulo.",

  reference_books__duplicate_success: "El capítulo se ha duplicado con éxito",
  reference_books__duplicate_error: "El capítulo no pudo ser duplicado",
  reference_books__sort_article_content_title: "Ordenar los componentes del artículo",
  reference_books__sort_article_content_table_of_contents_label: "Bloques de artículos ({{count}})",
  reference_books__sort_article_content_text_bock_label: "Módulo de texto",
  reference_books__sort_article_content_image_bock_label: "Módulo de imagen",
  reference_books__sort_article_content_video_bock_label: "Módulo de vídeo",
  reference_books__sort_article_content_pdf_bock_label: "Módulo PDF",
  reference_books__delete_dialog_title_text: "Eliminar bloque de texto",
  reference_books__delete_dialog_text_text:
    "¿Realmente desea eliminar este bloque de texto de forma irrevocable de este artículo?",
  reference_books__delete_dialog_title_image: "Eliminar gráfico",
  reference_books__delete_dialog_text_image:
    "¿Realmente quieres borrar este gráfico irremediablemente de este artículo?",
  reference_books__delete_dialog_title_video: "Borrar vídeo",
  reference_books__delete_dialog_text_video: "¿Realmente quieres borrar este vídeo irremediablemente de este artículo?",
  reference_books__delete_dialog_title_pdf: "Borrar PDF",
  reference_books__delete_dialog_text_pdf: "¿Realmente quiere eliminar este PDF de forma irrevocable de este artículo?",
  reference_books__article_content_type_label_text: "Bloque de texto",
  reference_books__article_content_type_label_graphic: "Bloque gráfico",
  reference_books__article_content_type_label_video: "Video_block",
  reference_books__article_content_type_label_pdf: "Bloque PDF",
  reference_books__sort_chapters_title: "Ordenar capítulos",
  reference_books__sort_chapters_table_of_contents_label: "Capítulos ({{count}})",

  // Reorder
  reorder__table_column_title: "Título",
  reorder__table_show_preview: "Mostrar previsión",

  // Scenario reference books
  reference_books__header_label: "Libro de referencia",
  reference_books__scenario_chapter_setting_title: "Agrupar capítulos",
  reference_books__scenario_add_chapter: "Añadir capítulo",
  reference_books__scenario_no_chapters_added: "No se han añadido capítulos",
  reference_books__scenario_chapter_placeholder: "No hay capítulo o artículo seleccionado",
  reference_books__scenario_chapter_content_placeholder: "Por favor, seleccione un capítulo a la izquierda",
  reference_books__scenario_please_add_chapters: "Por favor, añada un capítulo primero",
  reference_books__scenario_chapter_setting_hint:
    "Si los capítulos están agrupados, el participante sólo podrá ver una lista de elementos, pero no la separación por capítulos",
  reference_books__scenario_amount_selected_chapters_label: "{{count}} Capítulo seleccionado",
  reference_books__scenario_add_selected_label: "Añadir seleccionado ({{count}})",
  reference_books__chapters_bundled_header_info: "La agrupación de capítulos oculta esta página para los participantes",

  // Sample Companies
  sample_companies__header_details_label: "Detalles de la empresa modelo",
  sample_companies__header_label_selection: "Añadir empresa modelo",
  sample_companies__header_finalize_label: "Sello empresa modelo",
  sample_companies__header_publish_label: "Publicar empresa modelo",
  sample_companies__header_button_finalize_tooltip: "La empresa modelo está sellada y no se puede editar más",
  sample_companies__header_button_finalize_tooltip_missing_profile: "Intro de la empresa no es disponible",
  sample_companies__header_button_finalize_tooltip_missing_logo: "Logotipo de la empresa no es disponible",
  sample_companies__header_button_finalize_tooltip_missing_description: "Descripción de la empresa no disponible",
  sample_companies__header_orly_finalize_title: "Sellado de la empresa modelo",
  sample_companies__header_orly_finalize_button: "Sellado",
  sample_companies__header_orly_finalize_text:
    "¿Realmente quieres sellar la empresa modelo? Después no es posible realizar más cambios en la empresa modelo",
  sample_companies__header_button_publish_tooltip: "La empresa modelo está publicada y no se puede editar más",
  sample_companies__header_orly_publish_title: "Publicar la empresa modelo",
  sample_companies__header_orly_publish_button: "Publicar",
  sample_companies__header_orly_publish_text:
    "¿Realmente quieres publicar la empresa modelo? Después no es posible realizar más cambios en la empresa modelo",
  sample_companies__header_duplicate_label: "Empresa modelo duplicada",
  sample_companies__duplicate_success: "La empresa modelo ha sido duplicada con éxito",
  sample_companies__filter_title: "Modelo de empresa",
  sample_companies__create_sample_company: "Crear nueva empresa modelo",
  sample_companies__create_sample_company_author_title: "Autor",
  sample_companies__create_sample_company_title_placeholder: "Introduzca el título de la empresa modelo...",
  sample_companies__create_sample_company_description_placeholder:
    "Usted añada aquí un texto de descripción de su empresa modelo...",
  sample_companies__detail_button_create: "crear",
  sample_companies__detail_button_edit: "editar",
  sample_companies__detail_button_show: "mortar",
  sample_companies__detail_button_confirm: "aplicar",
  sample_companies__detail_clear_button_confirm: "eliminar",
  sample_companies__detail_clear_modal_title: "eliminar elemento",
  sample_companies__detail_clear_modal_text:
    "¿Realmente quieres eliminar el elemento? Esta operación no se puede revertir",

  sample_companies__detail_header_navigate_back_label: "Selección de empresa modelo",
  sample_companies__logo_label: "Logotipo de la empresa",
  sample_companies__detail_general_information_label: "Información general",
  sample_companies__detail_general_information_binary_placeholder: "No se ha creado ningún logotipo",
  sample_companies__detail_general_information_binary_selection: "Seleccionar logotipo",
  sample_companies__detail_general_information_company_intro: "Intro de la empresa modelo",
  sample_companies__detail_general_information_company_intro_edit: "Editar introducción de la empresa",
  sample_companies__detail_general_information_company_intro_delete: "Eliminar la introducción de la empresa",
  sample_companies__detail_general_information_company_upload_intro: "Añadir introducción de la empresa",
  sample_companies__detail_general_information_company_upload_placeholder: "No se ha creado ninguna introducción",
  sample_companies__detail_general_information_company_name: "Título",
  sample_companies__detail_general_information_company_type: "Tipo de empresa",
  sample_companies__detail_general_information_company_type_placeholder: "No se ha establecido ningún tipo",
  sample_companies__detail_general_information_company_description: "Descripción",
  sample_companies__detail_general_information_company_description_edit: "Editar descripción",
  sample_companies__detail_general_information_company_tags: "Etiquetas",
  sample_companies__detail_general_information_company_all_files: "Todos los archivos",
  sample_companies__detail_general_information_company_files: "Archivos",
  sample_companies__detail_settings_company_files: "Documentos de la empresa",
  sample_companies__detail_settings_company_files_desc:
    "Cree aquí todos los documentos relevantes para la empresa. Los criterios de relevancia específicos del escenario de los documentos se pueden asignar en el editor de escenarios para que coincidan con la tarea",

  sample_companies__detail_settings_files: "Archivos",
  sample_companies__detail_settings_erp: "Planificación de recursos empresariales",
  sample_companies__detail_settings_erp_desc:
    "Defina aquí el sistema ERP de esta empresa modelo. Los criterios de relevancia específicos del escenario de los conjuntos de datos se pueden asignar en el editor de escenarios para que coincidan con la tarea",
  sample_companies__detail_settings_rows_count: "Conjuntos de datos",
  sample_companies__detail_settings_email_signature: "Firma y dominio del correo electrónico",
  sample_companies__detail_settings_email_signature_title: "Firma de correo electrónico",
  sample_companies__detail_settings_email_signature_input: "Firma de correo electrónico de la empresa modelo",
  sample_companies__detail_settings_email_signature_input_edit:
    "Editar la firma de correo electrónico de la empresa modelo",
  sample_companies__detail_settings_email_signature_input_placeholder: "Añadir firma de correo electrónico aquí...",
  sample_companies__detail_settings_email_signature_input_placeholder_example:
    "por ejemplo, JuanPérez@empresamodelo.es",
  sample_companies__detail_settings_email_signature_desc:
    "Cree aquí una firma de correo electrónico y un dominio adecuados, que puedan utilizarse cuando se utilice esta empresa modelo en un escenario en 'Definir correos electrónicos'",
  sample_companies__detail_settings_email_signature_desc_detail:
    "Aquí puedes crear una firma de correo electrónico de la empresa modelo, que puedes reutilizar en los correos electrónicos de un escenario. La firma del correo electrónico puede insertarse al editar el contenido de un correo electrónico en el editor de escenarios y adaptarse posteriormente.",
  sample_companies__detail_settings_email_signature_available: "Firma disponible",
  sample_companies__detail_settings_email_signature_unavailable: "Firma no disponible",
  sample_companies__detail_settings_email_domain: "Dominio",
  sample_companies__detail_settings_email_domain_title: "Modelo de dominio de correo electrónico de la empresa",
  sample_companies__detail_settings_email_domain_available: "Dominio disponible",
  sample_companies__detail_settings_email_domain_unavailable: "Dominio no disponible",
  sample_companies__detail_settings_email_domain_edit: "Editar dominio",
  sample_companies__detail_settings_email_domain_generated: "Dirección de correo electrónico del participante generada",
  sample_companies__detail_settings_email_domain_generated_filled: "por ejemplo, JuanPerez@{domain}}.es",
  sample_companies__detail_settings_email_domain_generated_example: "por ejemplo, JuanPerez@empresamodelo.es",
  sample_companies__detail_settings_email_domain_desc_detail:
    "Aquí puede crear un dominio de la empresa modelo, que se utilizará para generar las direcciones de correo electrónico de los participantes. Estos están compuestos por el nombre y el apellido de los participantes y el dominio almacenado",
  sample_companies__detail_settings_email_domain_modal_desc_detail:
    "Por favor, introduzca el nombre de dominio sin espacios (empresa modelo) y el dominio de nivel superior (es, com, shop, online, org) separados por un punto",
  sample_companies__detail_settings_label: "Configuración de la empresa",
  sample_companies__detail_settings_scenario_label: "Ajustes específicos del escenario",
  sample_companies__selection_header: "Seleccione el modelo de empresa",
  sample_companies__selection_back_button: "Empresa modelo",
  sample_companies__selection_empty_selection: "No se ha seleccionado ninguna empresa modelo",
  sample_companies__selection_selected: "Empresa modelo seleccionada",
  sample_companies__selection_remove_tooltip: "Eliminar la empresa modelo del escenario",

  // Sample Company Files
  sample_companies_files__title: "Documentos de la empresa",
  sample_companies_files__navigate_back: "Empresa modelo",
  sample_companies_files__disabled_tooltip: "Cambio no posible",

  // PDF View
  pdf_view__placeholder: "No se ha podido cargar el PDF",
  pdf_view__loading_pdf: "Cargando PDF...",
  pdf_view__loading_pdf_page: "Cargando página PDF...",

  // Spreadsheet Editor
  spreadsheet_editor_unsaved_changes_orly_message: "¿Realmente quiere descartar sus cambios no guardados?",

  // Questionnaires
  questionnaires__filter_title: "Cuestionarios",
  questionnaires__create_event: "Crear nuevo cuestionario",
  questionnaires__create_event_title_placeholder: "Introduzca el título del cuestionario...",
  questionnaires__create_event_description_placeholder: "Introduzca el texto de descripción del cuestionario...",
  questionnaires__selection_header: "Seleccionar evento",
  questionnaires__selection_back_button: "Escenario",
  questionnaires__selection_empty_selection: "No hay evento seleccionado",
  questionnaires__selection_selected: "Evento seleccionado",
  questionnaires__selection_remove_tooltip: "Eliminar evento del escenario",
  questionnaires__selection_details_label: "Eventos",
  questionnaires__selection_header_navigate_back_label: "Escenario",
  questionnaires__selection_add_questionnaire: "Añadir evento",
  questionnaires__selection_nothing_selected: "No se ha seleccionado ningún evento",
  questionnaires__selection_nothing_selected_hint: "Por favor, seleccione un evento a la izquierda",
  questionnaires__selection_nothing_assigned: "No hay eventos añadidos",
  questionnaires__selection_nothing_assigned_hint: "Por favor, añada un evento primero",
  questionnaires__selection_questions_count: "{{count}} Preguntas",

  // Questionnaire Detail
  questionnaire__title: "Cuestionario",
  questionnaires__header_details_label: "Cuestionarios",
  questionnaires__detail_header_navigate_back_label: "Selección del cuestionario",
  questionnaires__detail_header_event: "Evento",
  questionnaires__detail_header_questionnaire: "Cuestionario",
  questionnaires__detail_header_duplicate_button: "Duplicar cuestionario",
  questionnaires__detail_header_delete_button: "Eliminar cuestionario",
  questionnaires__detail_header_publish_button: "Publicar cuestionario",
  questionnaires__detail_header_finalize_button: "Sellar cuestionario",
  questionnaires__detail_header_finalize_orly_title: "Sellado del cuestionario",
  questionnaires__detail_header_finalize_tooltip: "El cuestionario está sellado y no se puede editar más",
  questionnaires__detail_header_finalize_orly_text:
    "¿De verdad quieres sellar el cuestionario? A partir de ahí, no es posible realizar más cambios en el cuestionario",
  questionnaires__header_orly_publish_button: "Publicar",
  questionnaires__header_button_publish_tooltip: "El cuestionario está publicado y no se puede editar más",
  questionnaires__header_button_publish_tooltip_no_questions: "No hay preguntas disponibles",
  questionnaires__header_button_publish_tooltip_empty_questions:
    "Contiene preguntas, opciones de respuesta o criterios de puntuación vacíos",
  questionnaires__header_button_publish_tooltip_no_time: "No se ha especificado el tiempo de procesamiento",
  questionnaires__header_button_publish_tooltip_disabled_empty_questions_or_answers:
    "No se puede publicar un cuestionario con preguntas, opciones de respuesta o criterios de evaluación vacíos",
  questionnaires__header_button_publish_tooltip_unset_correct_answer:
    "Una pregunta de opción única o múltiple con puntuación no contiene una opción de respuesta marcada como correcta",
  questionnaires__header_orly_publish_title: "Publicar el cuestionario",
  questionnaires__header_orly_publish_text:
    "¿Realmente quiere publicar el cuestionario? A partir de ahí, no es posible realizar más cambios en el cuestionario",
  questionnaires__detail_no_project: "El cuestionario seleccionado no existe",
  questionnaires__detail_title: "Resumen",
  questionnaires__detail_binary: "Graphic / Video",
  questionnaires__detail_binary_placeholder: "No se ha creado ningún gráfico o vídeo",
  questionnaires__detail_questions_title: "Preguntas ({{count}})",
  questionnaires__detail_questions_answers_title: "Opciones de respuesta ({{count}})",
  questionnaires__detail_questions_scoring_count_title: "Criterios de puntuación ({{count}})",
  questionnaires__detail_questions_scoring_title: "Puntuación",
  questionnaires__detail_questions_question: "Cuestionarios",
  questionnaires__detail_questions_no_question_given: "Ninguna pregunta dada",
  questionnaires__detail_questions_answer: "Opciones de respuesta",
  questionnaires__detail_questions_answer_has_interventions: "Intervenciones disponibles",
  questionnaires__detail_questions_interventions_placeholder_title: "No se ha seleccionado ninguna opción de respuesta",
  questionnaires__detail_questions_interventions_placeholder_hint:
    "Por favor, seleccione una opción de respuesta para realizar los ajustes específicos del escenario",
  questionnaires__detail_questions_answer_singular: "opción de respuesta",
  questionnaires__detail_questions_scoring_list_title: "Criterios de puntuación",
  questionnaires__detail_questions_scoring: "max. score",
  questionnaires__detail_overlay_update_description: "Descripción del cuestionario",
  questionnaires__detail_edit_time_modal_description:
    "El tiempo de finalización indica el tiempo máximo que los participantes pueden tardar en completar este cuestionario",
  questionnaires__detail_edit_time_modal_label: "Tiempo de procesamiento de este cuestionario",
  questionnaires__add_question: "Añadir otra pregunta",
  questionnaires__disabled_tooltip: "Cuestionario ya sellado",
  questionnaires__scenario_disabled_tooltip: "Escenario ya sellado",
  questionnaires_event__disabled_tooltip: "Evento ya sellado",
  questionnaires__sort_questions_title: "Ordenar preguntas",
  questionnaires__edit_questions_title: "Editar pregunta",
  questionnaires__sort_answers_title: "Ordenar respuestas",
  questionnaires__title_preview: "Cuestionario (vista previa)",

  // Event Detail
  events__header_details_label: "Evento",
  events__detail_header_navigate_back_label: "Selección de eventos",
  events__detail_no_project: "El evento seleccionado no existe",
  events__detail_header_duplicate_button: "Duplicar evento",
  events__detail_header_publish_button: "Publicar evento",
  events__detail_overlay_update_description: "Descripción del evento",
  events__header_button_publish_tooltip: "El evento está publicado y no se puede editar más",
  events__header_button_publish_tooltip_disabled_empty_questions_or_answers:
    "No se puede publicar un evento con preguntas u opciones de respuesta vacías",
  events__header_button_publish_tooltip_disabled_no_questions: "Un evento sin preguntas no puede ser publicado",
  events__header_button_publish_tooltip_unset_correct_answer:
    "No se puede publicar un evento con una sola opción o una pregunta de opción múltiple con puntuación y ninguna opción de respuesta marcada como correcta",
  events__header_orly_publish_title: "Publicar el evento",
  events__header_orly_publish_text:
    "¿Realmente usted quiere publicar el evento? Después de eso, no es posible realizar más cambios en el evento",
  events__intervention_delay_title: "después {{delay}} min",
  events__preview_title: "Evento (previsión)",
  events__end_preview: "finalizar la previsión",

  // Questionnaire Question
  questionnaire_question__creation_title: "Seleccione el tipo de pregunta",
  questionnaire_question__multiple_choice_label: "Opción múltiple",
  questionnaire_question__single_choice_label: "Opción única",
  questionnaire_question__free_text_label: "Texto libre",
  questionnaire_question__multiple_choice_description:
    "Los participantes pueden elegir varias respuestas entre las opciones de respuesta",
  questionnaire_question__single_choice_description:
    "Los participantes deben seleccionar exactamente una respuesta de las opciones de respuesta",
  questionnaire_question__free_text_description:
    "Los participantes responden aquí con un texto sin especificaciones estructurales",
  questionnaire_question__question_description_placeholder: "Por favor, indique aquí la pregunta...",
  questionnaire_question__answer_description_placeholder: "Por favor, indique aquí la opción de respuesta...",
  questionnaire_question__answer_criteria_placeholder: "Indique aquí el criterio de evaluación...",
  questionnaire_question__title: "Tipo de pregunta",
  questionnaire_question__update_to_free_text_question_waning:
    "¡Atención! Las opciones de respuesta creadas se borrarán si se selecciona el tipo de pregunta a cambiar",
  questionnaire_question__update_from_free_text_question_waning:
    "¡Atención! Los criterios de evaluación creados se borrarán si se cambia el tipo de pregunta",
  questionnaire_question__answer_freetext: "Respuesta de texto libre",
  questionnaire_question__freetext_placeholder: "Introduzca el texto de la respuesta aquí",
  questionnaire_question__freetext_hint: "La respuesta será rellenada por el usuario",
  questionnaire_question__scoring_none_title: "Sin evaluación",
  questionnaire_question__scoring_none_text: "La respuesta a esta pregunta está excluida de la puntuación",
  questionnaire_question__scoring_holistic_title: "Puntuación holística",
  questionnaire_question__answer_holistic_text:
    "Por favor, marque la opción de respuesta que se requiere para responder correctamente a esta pregunta y establezca una puntuación",
  questionnaire_question__scoring_holistic_text: "El anotador debe elegir uno de los criterios de evaluación previstos",
  questionnaire_question__scoring_analytic_title: "Evaluación analítica",

  questionnaire_question__scoring_analytic_text:
    "El anotador puede seleccionar varios criterios de evaluación. Las puntuaciones se suman para obtener el total",
  questionnaire_question__answer_analytic_text:
    "Por favor, marque las opciones de respuesta que son necesarias para responder correctamente a esta pregunta y establezca una puntuación",
  questionnaire_question__scoring_unit: "Puntuación",
  questionnaire_question__scoring_unit_singular: "Punto",
  questionnaire_question__scoring_footer: "Puntuación a conseguir para esta pregunta:",
  questionnaire_question__scoring_footer_score: "{{scoreMin}} a {{scoreMax}} puntos",
  questionnaire_question__scoring_footer_no_score: "Sin puntuación",
  questionnaires_question__scoring_freetext_analytic_title: "¿No se cumple el criterio de puntuación?",
  questionnaires_question__scoring_freetext_analytic_text:
    "Si el participante no ha cumplido ninguno de los criterios de puntuación, el anotador hace la selección aquí para otorgar 0 puntos",
  questionnaires_question__scoring_freetext_analytic_button: "Conceder 0 puntos",
  questionnaires_question__scoring_multiple_analytic_text:
    "Puntuación si la respuesta es correcta (sin puntuación parcial)",
  questionnaires_question__scoring_single_holistic_text: "Puntuación por respuesta correcta",
  questionnaires_question__free_text_answer: "Respuesta de texto libre",
  questionnaires_question__free_text_answer_placeholder: "Otros (campo de texto libre)",
  questionnaires_question__not_deletable: "Deletion not possible",
  questionnaires_question__score_variable_value_hint: "Introduzca un valor entre {{minScore}} y {{maxScore}}",
  questionnaires_question__holistic_score_null_value_hint: "Puntuación no posible",

  // Events
  events__filter_title: "Eventos",
  events__create_event: "Crear nuevo evento",
  events__create_event_title_placeholder: "Introduzca el título del evento...",
  events__create_event_description_placeholder: "Introduzca el texto de descripción del evento...",
  events__delay_settings_title: "Tiempo",
  events__delay_modal_title: "Hora del evento",
  events__delay_modal_text:
    "Seleccione el tiempo dentro del periodo de procesamiento de este escenario ({{duration}} min) para este evento. (Especifique un número entero)",
  events__delay_modal_text_no_max_duration:
    "Seleccione el tiempo dentro del periodo de procesamiento de este escenario (aún no establecido) para este evento. (Especifique un número entero)",
  events__delay_modal_delay_section_title: "El evento ocurre después de:",
  events__delay_modal_delay_unit: "Unidad",
  events__delay_modal_tooltip: "No es posible seleccionar esta opción",
  events__delay_modal_tooltip_temporal_stage_disabled: "No es posible para la ubicación seleccionada ({{directory}})",
  events__delay_modal_delay_title_future: "Hora (máx. {{duration}} min)",
  events__delay_modal_delay_title: "Hora",

  // Scenario Event
  scenario_events__header_orly_delete_title: "Eliminar el evento",
  scenario_events__header_orly_delete_text: "¿Realmente desea eliminar el evento?",

  // Coding Models
  coding_models__title: "Instrucciones de codificación",
  coding_models__filter_title: "Escenarios",
  coding_models__overview_subheader_title: "Aplicar instrucción de codificación",
  coding_models__overview_description_placeholder:
    "Añadir un texto de descripción a la instrucción de codificación aquí...",
  coding_models__overview_duplicate_success: "La instrucción de codificación se ha adoptado con éxito",
  coding_models__overview_duplicate_error: "Se ha producido un error al aplicar la instrucción de codificación",
  coding_models__detail_header: "Instrucción de codificación",
  coding_models__detail_header_delete_tooltip: "Eliminar la instrucción de codificación del escenario",
  coding_models__detail_header_delete_orly_title: "Eliminar la instrucción de codificación",
  coding_models__detail_header_delete_orly_text:
    "¿Quiere eliminar la declaración de codificación del escenario? Esta operación no se puede deshacer",
  coding_models__create: "Nueva instrucción de codificación",
  coding_models__create_modal_title: "Nueva instrucción de codificación",
  coding_models__create_modal_description_placeholder:
    "Introduzca aquí la descripción de la instrucción de codificación...",
  coding_models__detail_main_dimension_label: "Dimensiones principales",
  coding_models__detail_main_dimension_label_singular: "Dimensión principal",
  coding_models__detail_main_dimension_sort_modal_title: "Ordenar dimensiones principales",
  coding_models__detail_main_dimension_sort_modal_description:
    "Aquí puede cambiar el orden de las dimensiones principales de esta instrucción de codificación.",
  coding_models__detail_main_dimension_table_placeholder_title: "No hay subdimensiones ni elementos disponibles.",
  coding_models__detail_main_dimension_edit_description_modal: "Editar la descripción de la dimensión principal",
  coding_models__detail_main_dimension_table_placeholder_sub_title:
    "¿Qué contenidos quiere crear en esta dimensión principal?",
  coding_models__detail_sub_dimension_label: "Subdimensiones",
  coding_models__detail_sub_dimension_label_singular: "Subdimensiones",
  coding_models__detail_sub_dimension_sort_modal_title: "Ordenar subdimensiones",
  coding_models__detail_sub_dimension_sort_modal_description:
    "Aquí puede cambiar el orden de las subdimensiones de esta dimensión principal.",
  coding_models__detail_sub_dimension_edit_description_modal: "Editar descripción de la subdimensión",
  coding_models__detail_items_label: "Elemento",
  coding_models__detail_items_label_singular: "Elemento",
  coding_models__detail_item_sort_modal_title: "Ordenar elementos",
  coding_models__detail_item_sort_modal_description: "Aquí puede cambiar el orden de los elementos de esta dimensión.",
  coding_models__detail_items_table_placeholder_button: "Crear elemento",
  coding_models__detail_items_table_placeholder_title: "Ningún elemento disponible",
  coding_models__detail_items_scoring_type: "Tipo de evaluación",
  coding_models__detail_items_scoring_type_holistic: "Holística",
  coding_models__detail_items_scoring_type_analytic: "Analítica",
  coding_models__detail_item_edit_description_modal: "Editar la descripción del elemento",
  coding_models__detail_item_edit_description_description_placeholder:
    "Añada aquí un texto descriptivo a este elemento...",

  coding_models__detail_item_view_scoring_method: "Método de evaluación",
  coding_models__detail_item_view_scoring_type: "Tipo de evaluación",
  coding_models__detail_item_criteria: "Criterios",
  coding_models__detail_item_criteria_placeholder: "Ningún criterio creado",
  coding_models__detail_item_missing_description: "Sin descripción",
  coding_models__detail_maximum_score: "Puntuación máx.",
  coding_models__detail_score: "Puntos",
  coding_models__detail_score_singular: "Punto",
  coding_models__detail_maximum_score_long: "Puntuación máxima a alcanzar:",
  coding_models__detail_table_placeholder: "Ninguna dimensión creada",
  coding_models__detail_table_item_criteria_placeholder: "Ningún criterio de evaluación creado",
  coding_models__create_main_dimension_title: "Crear dimensión principal",
  coding_models__create_main_dimension_hint: "Por favor, ponga título a la nueva dimensión principal.",
  coding_models__create_main_dimension_description_placeholder:
    "Añada aquí un texto descriptivo a esta dimensión principal...",
  coding_models__create_sub_dimension_title: "Crear subdimensión",
  coding_models__create_sub_dimension_description_placeholder: "Añada aquí un texto descriptivo a esta subdimensión...",
  coding_models__create_sub_dimension_hint: "Por favor, ponga un título a la nueva subdimensión.",
  coding_models__create_sub_dimension_label_parent: "Crear en dimensión principal",
  coding_models__create_item_title: "Crear elemento",
  coding_models__create_item_hint: "Por favor, ponga un título al nuevo elemento.",
  coding_models__create_automated_item_hint: "Seleccione una regla automatizada para este elemento.",
  coding_models__create_item_label_parent: "Crear en dimensión",
  coding_models__create_item_label_rating_method: "Seleccionar método de evaluación",
  coding_models__create_item_label_rating_method_manual_title: "Manual",
  coding_models__create_item_label_rating_method_automated_title: "Automatización",
  coding_models__create_item_label_rating_method_automated_title_tooltip_title: "Método de evaluación automatizado",

  coding_models__create_item_label_rating_method_automated_title_tooltip_text:
    "La evaluación de este elemento se realiza de forma automatizada. Para todos los criterios de evaluación se debe crear una regla automatizada para el contenido a evaluar.",
  coding_models__create_item_label_rating_method_manual_text:
    "La evaluación de este elemento es realizada por los calificadores. Para todos los criterios de evaluación, debe proporcionarse una descripción clara del contenido que se va a evaluar.",
  coding_models__create_item_label_rating_method_automatic_text:
    "La evaluación de este elemento se realiza de forma automatizada. Para todos los criterios de evaluación se debe crear una regla automatizada para el contenido a evaluar.",
  coding_models__create_item_label_rating_method_automatic_title: "Automatizado",
  coding_models__create_item_label_rating_type: "Seleccionar el tipo de evaluación",
  coding_models__create_item_label_rating_type_holistic_title: "Evaluación holística",
  coding_models__create_item_label_rating_type_holistic_text:
    "El calificador elige exactamente un criterio de evaluación. El criterio seleccionado indica la puntuación total de ese elemento.",
  coding_models__create_item_label_rating_type_analytic_text:
    "El calificador o la regla automatizada pueden seleccionar más de un criterio de evaluación. Se suman todos los criterios para obtener la puntuación total de ese elemento.",
  coding_models__create_item_label_rating_type_analytic_title: "Evaluación analítica",
  coding_models__create_item_label_rating_type_automated_title: "Regla automatizada",
  coding_models__create_item_label_rating_type_automated_document_view: "Consulta de documentos",
  coding_models__create_item_label_rating_type_automated_document_view_hint:
    "Compruebe automáticamente si un documento concreto ha sido abierto o no.",
  coding_models__create_item_label_rating_type_automated_feature_usage: "Uso de funciones",
  coding_models__create_item_label_rating_type_automated_feature_usage_hint:
    "Compruebe automáticamente si se ha utilizado una función específica de una herramienta.",
  coding_models__create_item_label_rating_type_automated_tool_usage: "Uso de herramientas",
  coding_models__create_item_label_rating_type_automated_tool_usage_hint:
    "Comprobación automática después de utilizar una herramienta.",
  coding_models__create_item_label_rating_type_automated_input_value: "Valor de entrada",
  coding_models__create_item_label_rating_type_automated_input_value_hint:
    "Comprobación de un valor de entrada específico.",
  coding_models__create_item_label_rating_type_automated_r_script: "R-script",
  coding_models__create_item_label_rating_type_automated_r_script_hint:
    "Utilice R-scripts para comprobar una amplia variedad de datos.",
  coding_models__table_of_contents_item_manual: "Manual",
  coding_models__table_of_contents_item_automated: "Automatizado",
  coding_models__automated_item_input_value_position: "Lugar",
  coding_models__automated_item_input_value_value: "Contenido disponible",
  coding_models__automated_item_input_value_position_mail: "Correos electrónicos salientes",
  coding_models__automated_item_input_value_position_all_mails: "Correos electrónicos",
  coding_models__automated_item_input_value_position_notes: "Herramienta de apuntes",
  coding_models__automated_item_input_value_choose_document_modal_title: "Seleccionar documento",
  coding_models__automated_item_input_value_choose_document_modal_mails_text:
    "Comprueba todos los correos electrónicos salientes del participante para averiguar el contenido especificado.",
  coding_models__automated_item_input_value_choose_document_modal_files_and_directories_text:
    "Compruebe el contenido de determinados documentos del participante.",
  coding_models__automated_item_input_value_choose_document_modal_notes_text:
    "Compruebe la herramienta de notas del participante para averiguar el contenido especificado.",
  coding_models__automated_item_input_value_choose_document_modal_notes_text_placeholder: "valor1;valor2",
  coding_models__automated_item_input_value_preview_spreadsheet_title: "Documento (hoja de cálculo)",
  coding_models__automated_item_input_value_preview_spreadsheet_title_check_file: "Comprobar el contenido",
  coding_models__automated_item_input_value_preview_spreadsheet_title_check_file_input:
    "Comprobar los valores de entrada",
  coding_models__automated_item_input_value_preview_spreadsheet_text:
    "Compruebe automáticamente el documento del participante en busca de contenido específico.",
  coding_models__automated_item_input_value_preview_spreadsheet_text_table:
    "Compruebe automáticamente la tabla de este participante en busca de valores de entrada específicos. Puede comprobar el contenido de toda la tabla o de una celda concreta.",
  coding_models__automated_item_input_value_preview_spreadsheet_specific_cell: "Celda específica",
  coding_models__automated_item_input_value_preview_spreadsheet_whole_table: "Tabla completa",
  coding_models__automated_item_input_value_preview_spreadsheet_specific_cell_placeholder: "Aún sin determinar",
  coding_models__automated_item_input_value_preview_spreadsheet_range: "Rango de celdas",
  coding_models__automated_item_document_view_column_header: "Documento abierto",
  coding_models__automated_item_document_view_email_action_field: "Correo electrónico abierto",
  coding_models__automated_item_document_view_file_action_field: "Archivo abierto",
  coding_models__automated_item_document_view_dataset_action_field: "Registro abierto",
  coding_models__automated_item_document_view_article_action_field: "Artículo abierto",
  coding_models__automated_item_document_view_choose_document_modal_mails:
    "Compruebe si determinados correos electrónicos han sido abiertos por el participante.",
  coding_models__automated_item_document_view_choose_document_modal_files_and_directories:
    "Compruebe si el participante ha abierto determinados archivos.",
  coding_models__automated_item_document_view_choose_document_modal_reference_books:
    "Compruebe si determinados artículos han sido abiertos por el participante.",
  coding_models__automated_item_document_view_choose_document_modal_erp:
    "Compruebe si el participante ha abierto determinados registros.",
  coding_models__automated_item_document_view_choose_document_modal_notes:
    "Compruebe si el participante ha abierto determinados registros.",
  coding_models__automated_item_document_view_email_preview_selection_footer:
    "Compruebe si este correo electrónico ha sido abierto por el participante.",
  coding_models__automated_item_document_view_files_and_directories_selection_footer:
    "Compruebe si el participante ha abierto este archivo.",
  coding_models__automated_item_document_view_reference_books_selection_footer:
    "Compruebe si el participante ha abierto este artículo.",
  coding_models__automated_item_document_view_erp_selection_footer:
    "Compruebe si el participante ha abierto este registro.",
  coding_models__automated_item_feature_usage_table_header: "Función aplicada",
  coding_models__automated_item_feature_usage_feature_type_answer_mail: "Responder al correo electrónico",
  coding_models__automated_item_feature_usage_feature_type_search_mails: "Búsqueda en correos electrónicos",
  coding_models__automated_item_feature_usage_feature_type_search_reference_books: "Buscar en libro de referencia",
  coding_models__automated_item_feature_usage_feature_type_search_erp: "Buscar en tabla",
  coding_models__automated_item_feature_usage_feature_type_copy: "Copiar en el portapapeles",
  coding_models__automated_item_feature_usage_feature_type_paste: "Pegar del portapapeles",
  coding_models__automated_item_feature_usage_feature_type_formula_usage: "Uso de fórmula",
  coding_models__automated_item_feature_usage_feature_type_combination_error:
    "Combinación de herramienta y función no válida",
  coding_models__automated_item_r_scripts_choose_modal_title: "Añadir R-script al criterio de evaluación",
  coding_models__automated_item_r_scripts_choose_modal_description:
    "Utilizar R-scripts para comprobar una amplia variedad de datos.",
  coding_models__automated_item_r_scripts_choose_modal_search_placeholder: "Filtrar R-scripts",
  coding_models__automated_item_r_scripts_choose_modal_search_empty: "Ningún R-script disponible para añadir",
  coding_models__automated_item_r_scripts_choose_modal_search_empty_text: "Crear un R-script o ajustar el filtro.",
  coding_models__automated_item_r_scripts_column_header: "R-script",
  coding_models__automated_item_r_scripts_edit_content_description:
    "Utilizar R-scripts para comprobar una amplia variedad de datos.",
  coding_models__automated_item_r_scripts_edit_content_selected_script_label: "R-script seleccionado",

  // Coding Item Update
  coding_item_update__title_type: "Editar tipo de evaluación",
  coding_item_update__title_method: "Editar método de evaluación",
  coding_item_update__description_type: "El tipo de evaluación indica cómo se evalúan los criterios de evaluación.",
  coding_item_update__description_method:
    "El método de evaluación indica si este elemento debe ser evaluado manualmente por un calificador o automáticamente utilizando reglas establecidas.",
  coding_item_update__selection_label_type: "Seleccionar tipo de evaluación",
  coding_item_update__selection_label_method: "Seleccionar método de evaluación",
  coding_item_update__selection_card_type_holistic_label: "Evaluación holística",
  coding_item_update__selection_card_type_analytical_label: "Evaluación analítica",
  coding_item_update__selection_card_type_holistic_description:
    "El calificador decide exactamente un criterio de evaluación. El criterio seleccionado da la puntuación total de ese elemento.",
  coding_item_update__selection_card_type_analytical_description:
    "El calificador o la regla automatizada pueden elegir más de un criterio de puntuación. Se suman todos los criterios para obtener la puntuación total de ese elemento.",
  coding_item_update__selection_card_method_manual_label: "Manual",
  coding_item_update__selection_card_method_automatic_label: "Automatizado",
  coding_item_update__selection_card_method_manual_description:
    "La evaluación de este elemento corre a cargo de los calificadores. Para todos los criterios de evaluación, debe proporcionarse una descripción clara del contenido que se va a evaluar.",
  coding_item_update__selection_card_method_automatic_description:
    "La evaluación de este elemento está automatizada. Es necesario crear una regla automatizada del contenido a evaluar para todos los criterios de evaluación.",

  // Coding Criteria
  coding_criteria__edit_title: "Editar criterios de evaluación",
  coding_criteria__item_meta_data_label: "Elemento",
  coding_criteria__item_meta_data_title: "Título",
  coding_criteria__item_meta_data_method: "Método de evaluación",
  coding_criteria__item_meta_data_method_manual: "Manual",
  coding_criteria__item_meta_data_method_automatic: "Automatizado",
  coding_criteria__item_meta_data_type: "Tipo de evaluación",
  coding_criteria__item_meta_data_type_holistic: "Evaluación holística",
  coding_criteria__item_meta_data_type_analytical: "Evaluación analítica",
  coding_criteria__item_meta_data_automated_rule: "Regla automatizada",
  coding_criteria__item_meta_data_description: "Descripción",
  coding_criteria__criterion_list_label: "Criterios de evaluación ({{count}})",
  coding_criteria__criterion_create_button: "Crear criterios de evaluación",
  coding_criteria__criterion_list_description_placeholder: "Sin descripción",
  coding_criteria__criterion_list_score: "{{score}} Puntos",
  coding_criteria__criterion_list_score_singular: "{{score}} Punto",
  coding_criteria__criterion_list_placeholder: "No hay criterios de evaluación disponibles",
  coding_criteria__criterion_edit_title: "Criterio de evaluación",
  coding_criteria__criterion_edit_placeholder_label_main: "Ningún criterio de evaluación seleccionado",
  coding_criteria__criterion_edit_placeholder_label_sub:
    "Por favor, seleccione un criterio de evaluación a la izquierda.",
  coding_criteria__criterion_scoring_label: "Puntuación para este criterio de evaluación",
  coding_criteria__criterion_scoring_label_default: "Puntuación",
  coding_criteria__criterion_scoring_label_holistic: "Puntuación (Evaluación holística)",
  coding_criteria__criterion_scoring_label_analytical: "Puntuación (Evaluación analítica)",
  coding_criteria__criterion_scoring_description:
    "El calificador o la regla automatizada determinan exactamente un criterio de evaluación. El criterio seleccionado da la puntuación total de ese elemento.",
  coding_criteria__criterion_scoring_description_holistic:
    "El calificador decide exactamente un criterio de evaluación. El criterio seleccionado da la puntuación total para ese elemento.",
  coding_criteria__criterion_scoring_input_label: "Puntos",
  coding_criteria__criterion_description_label: "Descripción",
  coding_criteria__automated_criterion_tool_usage_column: "Herramienta utilizada",

  // Scenario
  scenario_title: "Escenario",
  scenario_create_scenario: "Crear un nuevo escenario",
  scenario__filter_title: "Escenarios",
  scenario__overlay_update_description: "Descripción del escenario",
  scenario_create_scenario_category_placeholder: "Añadir categoría",
  scenario_create_scenario_title_placeholder: "Añadir título",
  scenario_create_scenario_description_placeholder: "Introduzca aquí el texto que describa el escenario...",
  scenario_create_scenario_description_label: "Descripción del escenario",

  // Scenario Detail
  scenario_details__button_create: "Crear",
  scenario_details__button_show: "Ver",
  scenario_details__button_invite: "Invitar",
  scenario_details__available: "Disponible",
  scenario_details__unavailable: "No disponible",
  scenario_details__header_label: "Escenario",
  scenario_details__header_navigate_back_label: "Selección de escenario",
  scenario_details__header_button_finalize: "Sellar escenario",

  scenario_details__header_button_is_finalized: "Escenario ya sellado",
  scenario_details__header_button_finalize_tooltip: "El escenario se sellará y no se podrá editar más",
  scenario_details__header_button_duplicate: "Duplicar escenario",
  scenario_details__header_orly_finalize_title: "Sellar escenario",
  scenario_details__header_orly_finalize_button: "Sellar",
  scenario_details__header_orly_finalize_text:
    "¿Realmente desea sellar el escenario? Después de esto, no se podrán realizar cambios en el escenario..",
  scenario_details__header_button_publish_tooltip: "El escenario se publicará y no se podrá editar más",
  scenario_details__header_orly_publish_title: "Publicar el escenario",
  scenario_details__header_orly_publish_button: "Publicar",
  scenario_details__header_orly_publish_text:
    "¿Realmente desea publicar el escenario? Después de esto, no se podrán realizar cambios en el escenario.",
  scenario_details__header_button_publish: "Publicar escenario",
  scenario_details__header_tooltip_missing_mail: "Correo de apertura no está disponible",
  scenario_details__header_tooltip_missing_time: "Tiempo de edición no especificado",
  scenario_details__header_tooltip_missing_dimension:
    "Instrucción de codificación incorrecta: No hay dimensión disponible",

  scenario_details__header_tooltip_missing_item:
    "Instrucción de codificación incorrecta: Cada dimensión debe contener al menos un elemento",
  scenario_details__header_tooltip_missing_criteria:
    "Instrucción de codificación incorrecta: Cada elemento debe contener al menos un criterio",
  scenario_details__header_tooltip_missing_criteria_holistic:
    "Instrucción de codificación incorrecta: Cada elemento evaluado holísticamente debe contener al menos dos criterios",
  scenario_details__header_button_copy: "Copiar scenario",
  scenario_details__placeholder_not_found: "No se ha encontrado ningún escenario",
  scenario_details__general_information_label: "Información general sobre el escenario",
  scenario_details__general_information_scenario_description_edit: "Editar descripción",
  scenario_details__general_tags: "Etiquetas",
  scenario_details__general_tags_edit: "Editar etiquetas",
  scenario_details__general_tags_description: "Introduzca todas las etiquetas deseadas separadas por punto y coma.",
  scenario_details__general_tags_placeholder_example: "Ejemplo: Etiqueta1; Etiqueta2;...",
  scenario_details__general_email: "Correo electrónico de apertura",
  scenario_details__general_all_files: "Todos los archivos",
  scenario_details__general_contributors: "Colaboradores",
  scenario_details__settings_label: "Ajustes del escenario",
  scenario_details__settings_label_sample_company: "Empresa modelo",
  scenario_details__settings_sample_company_description:
    "Añade una empresa modelo al escenario que describa la empresa de este escenario.",
  scenario_details__settings_label_emails: "Determinar los correos electrónicos",
  scenario_details__settings_label_emails_finalized: "Correos electrónicos",
  scenario_details__settings_emails_description:
    "Los correos electrónicos transmiten la tarea y se entregan a medida que ésta avanza. Cree y edite los correos electrónicos para su escenario.",
  scenario_details__settings_label_files_and_directories: "Carpetas y archivos",
  scenario_details__settings_label_files_and_directories_only_spreadsheet: "Hojas de cálculo",
  scenario_details__settings_files_and_directories_description:
    "Aquí se pueden crear y gestionar todas las carpetas y documentos directamente accesibles.",
  scenario_details__settings_label_reference_books: "Libros de referencia",
  scenario_details__settings_reference_books_description:
    "Añade libros de referencia al escenario, que pueden utilizarse durante la ejecución del mismo.",
  scenario_details__settings_label_interventions: "Intervenciones",
  scenario_details__settings_interventions_description:
    "Enviar ayuda automáticamente cuando no se abren documentos predefinidos.",
  scenario_details__settings_label_instructions: "Instrucción de codificación",
  scenario_details__settings_instructions_description:
    "Establezca aquí todos los criterios de evaluación y las puntuaciones correspondientes.",
  scenario_details__settings_label_events: "Eventos",
  scenario_details__settings_events_description:
    "Añadir eventos al escenario, que aparecen en un momento determinado durante la ejecución del escenario.",
  scenario_details__settings_card_footer_label_files: "{{filesCount}} Archivos",
  scenario_details__settings_card_footer_label_mails: "Correos",
  scenario_details__settings_card_footer_label_directories: "Carpeta",
  scenario_details__settings_card_footer_label_reference_books: "Libros de referencia",
  scenario_details__settings_card_footer_label_interventions: "Intervenciones",
  scenario_details__settings_card_footer_label_dimensions: "Dimensiones",
  scenario_details__settings_card_footer_label_criteria: "Criterios",
  scenario_details__settings_card_footer_label_events: "Eventos",
  scenario_details__settings_footer_label_preview: "Vista previa",
  scenario_details__duplicate_success: "El escenario ha sido duplicado correctamente.",
  scenario_details__edit_duration_modal_label: "Tiempo de procesamiento de este escenario",
  scenario_details__edit_duration_modal_title: "Editar tiempo de procesamiento",
  scenario_details__edit_duration_modal_error_text:
    "{{entity}} se encuentra fuera del periodo válido de ({{durationInMinutes}} min)",
  scenario_details__edit_duration_modal_error_text_maximum_duration: "Especificación fuera del periodo válido",
  scenario_details__edit_duration_modal_text:
    "El tiempo de procesamiento indica el tiempo máximo que los participantes pueden necesitar para este escenario. Tenga en cuenta que todos los elementos de este escenario, como correos electrónicos o eventos con especificaciones de tiempo, deben estar dentro de este tiempo de procesamiento.",
  scenario_details__users_invite: "Invitar a colaboradores",
  scenario_details__users_invite_help_text:
    "Puede invitar a todos los colaboradores juntos. Para ello, introduzca todas las direcciones de correo electrónico que desee separadas por punto y coma.",
  scenario_details__actual_date: "Fecha real",
  scenario_details__fictive_date: "Fecha ficticia",
  scenario_details__date: "Fecha de ejecución",
  scenario_details__date_edit: "Editar fecha de ejecución",
  scenario_details__date_edit_modal_text:
    "Los tiempos del escenario pueden referirse al día de la ejecución o a un día ficticio.",
  scenario_details__date_edit_modal_actual_date:
    "Todas las horas de los correos electrónicos creados y la indicación de la fecha para el participante se refieren a la fecha real de la ejecución del escenario.",
  scenario_details__date_edit_modal_fictive_date:
    "El escenario se realiza en una fecha ficticia. Todas las horas de los correos electrónicos creados y la visualización de la fecha se refieren al día seleccionado.",

  // Scenario Preview
  scenario_preview__header_label: "Vista previa del escenario: {{name}}",
  scenario_preview__back_button_label: "Cancelar vista previa",

  // Scenario Snapshot Overlay
  scenario_snapshot_overlay__header_label: "Escenario: {{name}}",

  // Scenario Sample Companies
  scenario_sample_companies__settings_relevance_label: "Relevancia",
  scenario_sample_companies__settings_relevance_description:
    "Los criterios de relevancia facilitan la revisión de los participantes durante el tratamiento del escenario. Determine la importancia de este documento para la resolución de la tarea.",
  scenario_sample_companies__settings_intervention_label: "Intervención",
  scenario_sample_companies__settings_intervention_description:
    "Una intervención es una ayuda automática. Seleccione el tipo de ayuda si el participante no ve este documento.",
  scenario_sample_companies__settings_intervention_placeholder: "Ninguno",
  scenario_sample_companies__none_added: "No se ha añadido ninguna empresa modelo",
  scenario_sample_companies__no_signature: "La empresa modelo no tiene firma de correo electrónico",
  scenario_sample_companies__add_signature: "Añadir firma de correo electrónico",
  scenario_sample_companies__add_signature_text:
    "Añade la firma de correo electrónico creada en la empresa modelo al contenido de este correo electrónico.",
  scenario_sample_companies__add_signature_company_placeholder: "Ninguna empresa modelo añadida",

  // Relevance
  relevance__irrelevant: "Irrelevante",
  relevance__required: "Requerido",
  relevance__potentially_helpful: "Posiblemente útil",
  relevance__dropdown_placeholder: "Filtrar por",
  relevance__all_documents: "Todos los documentos",

  // Email
  email__header_label: "Definir correos electrónicos",
  email__create_email: "Crear un nuevo correo electrónico",
  email__directory: "Lugar de archivo",
  email__directory_sender: "Remitente",
  email__directory_recipient: "Destinatario",
  email__directory_sender_edit: "Editar remitente",
  email__directory_recipient_edit: "Editar destinatario",
  email__directory_inbox: "Bandeja de entrada",
  email__directory_draft: "Borradores",
  email__directory_sent: "Bandeja de salida",
  email__directory_trash: "Papelera",
  email__cc_label: "Cc",
  email__cc_label_edit: "Editar Cc",
  email__cc_edit_description:
    "Introduzca todas las direcciones de correo electrónico deseadas separadas por punto y coma.",
  email__cc_placeholder_example: "Ejemplo: jose-lopez@mail.es; maria-gomez@mail.es...",
  email__create: "Crear nuevo correo electrónico",
  email__create_placeholder: "jose-lopez@mail.es",
  email__create_hint:
    "Para crear un nuevo correo electrónico, rellene la información requerida. Puede editarlos posteriormente en cualquier momento:",
  email__status_read: "leído",
  email__status_unread: "sin leer",
  email__introduction_email_label: "Correo electrónico de apertura",
  email__introduction_email_label_defined: " Correo electrónico de apertura (disponible)",
  email__introduction_email_label_not_defined: "Correo electrónico de apertura (no disponible)",
  email__introduction_email_info:
    "Introduzca aquí una tarea detallada del escenario y la dirección del destinatario del correo electrónico de cierre.",
  email__intervention_email_label: "Correo electrónico de intervención",
  email__intervention_email_delete_tooltip: "Eliminar sólo es posible en el resumen de intervenciones",
  email__intervention_email_delete_tooltip_email_has_intervention_error: "Eliminar sólo es posible sin intervenciones",
  email__intervention_email_position_label: "Posición de este correo electrónico de intervención",
  email__intervention_email_position_description:
    "Este correo electrónico sólo se envía si se aplica la condición activadora creada como intervención en la posición siguiente.",
  email__intervention_email_button_label: "Resumen de la intervención",
  email__intervention_email_no_subject_placeholder: "Ningún asunto especificado",
  email__placeholder: "No hay correos electrónicos disponibles",
  email__placeholder_not_found_title: "Ningún correo electrónico seleccionado",
  email__placeholder_not_found: "Por favor, seleccione un correo electrónico.",
  email__placeholder_loading: "Cargar correo electrónico...",
  email__title_delete_introduction: "El correo de apertura no se puede borrar",
  email__additional_settings: "Ajustes adicionales",
  email__completion_email_setting: "Dirección del destinatario del correo de cierre",
  email__completion_email_text:
    "Introduzca aquí la dirección del destinatario deseado para responder a la tarea. Al enviar un correo electrónico a esta dirección, los participantes finalizan el escenario. Asegúrese de que esta dirección se anotó en la tarea.",
  email__relevance_label: "Relevancia",
  email__relevance_text:
    "Los criterios de relevancia facilitan la evaluación de los participantes durante el tratamiento del escenario. Determine la importancia de este documento para resolver la tarea.",
  email__intervention_label: "Intervenciones",
  email__intervention_text:
    "Una intervención es una ayuda automática. Seleccione el tipo de ayuda si el participante no consulta este documento.",
  email__intervention_placeholder: "No hay intervenciones disponibles",
  email__intervention_button_create: "Crear",
  email__reception_delay_label_inbox: "Disponibles después de:",
  email__reception_delay_label_sent: "Enviado antes:",
  email__reception_delay_button_edit: "Editar",
  email__reception_delay_edit_label: "Editar la hora de envío del correo electrónico",
  email__reception_delay_choose_time_label: "Seleccione el modo",
  email__reception_delay_choose_time_past: "Pasado",
  email__reception_delay_choose_time_past_hint:
    "El correo electrónico se envió/recibió antes de que se iniciara el procesamiento del escenario.",
  email__reception_delay_choose_time_present: "Presente (inmediato)",
  email__reception_delay_choose_time_present_hint:
    "El correo electrónico se recibe/envía inmediatamente después del inicio del escenario.",
  email__reception_delay_choose_time_future: "Futuro",
  email__reception_delay_choose_time_future_hint:
    "El correo electrónico se envía durante el procesamiento (dentro del tiempo de procesamiento del escenario {{durationInMinutes}} min).",
  email__marker_label: "Marcación",
  email__cc_recipients_placeholder: "No creado ",
  email__subject_label: "Asunto",
  email__subject_placeholder: "Por favor, introduzca aquí un asunto...",
  email__message_label: "Contenido del correo electrónico ",
  email__message_placeholder: "Por favor, introduzca aquí el contenido del correo electrónico...",
  email__message_dialog_title: "Editar el contenido del correo electrónico",
  email__message_dialog_sample_company: "Insertar firma de correo electrónico de la empresa modelo",
  email__message_insert_user_information_label: "Insertar información del usuario",
  email__message_insert_user_information_description:
    "Para dirigirse a los participantes individualmente, puede insertar aquí la información de usuario deseada.",
  email__files_placeholder: "No hay archivos disponibles",
  email__files_placeholder_error: "Archivo no encontrado",
  email__files_label: "Anexos",
  email__files_tooltip:
    "Añada varios archivos como anexos a los correos electrónicos. Una vez descargados, los participantes los encontrarán en la carpeta de descargas de la herramienta de carpetas y archivos.",
  email__files_table_column_file: "Archivo",
  email__files_table_column_relevance: "Relevancia",
  email__files_table_column_classification: "Clasificación",
  email__delay_instruction:
    "Determine si este correo electrónico se envió en el pasado, en el presente o en el futuro y especifique la hora de envío deseada.",
  email__delay_instruction_past_only:
    "Puede establecer la hora de recepción de este correo electrónico en el pasado (antes del inicio del escenario). Sólo los correos electrónicos de la bandeja de entrada pueden establecerse como futuros correos electrónicos",
  email__past_email: "Correo electrónico pasado",
  email__future_email: "Correo electrónico futuro",
  email__past_label: "Enviado antes (correo electrónico pasado):",
  email__future_label: "Enviado después (correo electrónico futuro):",
  email__present_label: "Enviado después (correo electrónico inmediato):",
  email__past_email_instruction: "Indique el número entero.",
  email__future_email_instruction:
    "Indicación como número entero. No debe sobrepasar el tiempo de procesamiento ({{timeMin}} min).",
  email__future_email_error: "El tiempo se encuentra fuera del periodo de tramitación",
  email__future_email_error_before_email_available: "El tiempo es anterior a la disponibilidad del correo electrónico",
  email__unavailable: "No disponible",
  email__completion_receiver_edit: "Editar la dirección del destinatario del correo de cierre",
  email__completion_delay_label: "Directamente disponible (correo de apertura)",

  // Validation
  validation__required: "Campo obligatorio",
  validation__email_format: "Formato de correo electrónico no válido",
  validation__email_delay: "El tiempo se encuentra fuera del periodo de tramitación",
  validation__email_delay_max_error: "Tiempo máximo de tratamiento excedido",
  validation__email_delay_intervention_email:
    "El tiempo no debe exceder el tiempo de auditoría de la intervención relacionada",
  validation__event_delay: "Ya utilizado o fuera del periodo de tramitación",

  // Creation Status
  creation_status: "Estado",
  creation_status__not_created: "Aún no creado",
  creation_status__created: "Creado",
  creation_status__unpublished: "No publicado",
  creation_status__published: "Publicado",

  // Sample Company Detail View
  sample_company_details__placeholder_not_found: "No se ha encontrado ninguna empresa modelo",
  sample_company_details__create_directory_modal_title: "Añadir una nueva carpeta principal",
  sample_company_details__create_sub_directory_modal_title: "Añadir nueva subcarpeta",
  sample_company_details__directory_label: "{{name}} (carpeta principal)",
  sample_company_details__intro_suffix: "Introducción",
  sample_company_details__intro_hint: "Este archivo está creado como una introducción de la empresa.",
  sample_company_details__logo_suffix: "Logotipo",
  sample_company_details__logo_hint: "Este archivo está creado como logotipo de empresa.",

  // My Account / Edit Profile
  account__headline: "Mi cuenta",
  account__language: "Idioma",
  account__hint: "Aquí puede ver y modificar los datos personales de su cuenta de usuario.",
  account__field_name: "Nombre",
  account__field_firstname: "Nombre",
  account__field_surname: "Apellidos",
  account__field_email: "Correo electrónico",
  account__field_password: "Contraseña",
  account__field_roles: "Derechos",
  account__field_organization: "Organización",
  account__field_salutation: "¿Cómo quiere que se dirijan a usted?",
  account__placeholder_organization: "<Nombre de la organización>",
  account__dialog_name: "Editar nombre",
  account__dialog_organization: "Editar organización",

  // Password Reset Modal
  password_reset__title: "¿Ha olvidado su contraseña?",
  password_reset__confirm_button: "Solicitar enlace de confirmación",
  password_reset__new_password: "Nueva contraseña",
  password_reset__new_password_title: "Definir nueva contraseña",
  password_reset__new_password_repeat: "Vuelva a introducir la contraseña nueva",
  password_reset__reset_confirm_button: "Crear ahora una nueva contraseña",
  password_reset__mail_success:
    "Se ha enviado a la dirección seleccionada un correo electrónico con instrucciones para restablecer la contraseña.",
  password_reset__success: "La contraseña se ha cambiado correctamente",

  // Projects
  projects__create_project: "Crear proyecto",
  project__filter_title: "Proyectos",
  project_create_project: "Crear proyecto",
  project_create_project_name_placeholder: "Nombre del proyecto",
  project_create_project_description_label: "Descripción del proyecto",
  project_create_project_description_placeholder: "Introduzca aquí el texto descriptivo del proyecto...",
  project_title_surveys: "Encuestas",
  project_title_survey: "Encuesta",
  project_title_test_surveys: "Prueba de encuestas",
  project_title_test_survey: "Prueba de encuesta",

  // Project Detail
  projects__header_details_label: "Proyecto",
  projects__detail_header_navigate_back_label: "Selección de proyectos",
  projects__detail_header_general_info: "Información general sobre el proyecto",
  projects__detail_no_project: "El proyecto seleccionado no existe",
  projects__detail_time_label: "Período de tramitación",
  projects__detail_status_label: "Estado",
  projects__overlay_update_description: "Descripción del proyecto",
  projects__overlay_label_target: "Grupo destinatario",
  projects__overlay_label_welcome_field: "Texto de bienvenida",
  projects__overlay_label_welcome_field_content: "Contenido del texto de bienvenida",
  projects__overlay_label_welcome_field_placeholder:
    "Por favor, introduzca aquí el contenido del texto de bienvenida para este proyecto.",
  projects__overlay_label_welcome_headline: "Editar el texto de bienvenida",
  projects__overlay_label_welcome_headline_finalized: "Texto de bienvenida",
  projects__overlay_label_welcome_description:
    "El texto de bienvenida sirve como introducción a un proyecto y se muestra inmediatamente antes del primer módulo del proyecto. Utilice el texto de bienvenida para ofrecer a los participantes una breve introducción al proyecto completo.",
  projects__overlay_label_usage_field: "Ámbito de aplicación",
  projects__overlay_placeholder_target: "Grupos destinatarios separados por comas",
  projects__overlay_target: "Editar grupo destinatario",
  projects__overlay_usage_field: "Seleccionar ámbito de aplicación",
  projects__usage_field_Other: "Otros",
  projects__usage_field_Company: "Empresa",
  projects__usage_field_Research: "Investigación",
  projects__usage_field_School: "Escuela",
  projects__usage_field_Demonstration: "Demonstración",

  // Project Detail lists
  projects__scenarios_title: "Módulos del proyecto ({{count}})",
  projects__scenarios_card_title: "Duración total del proyecto",
  projects__scenarios_add: "Añadir un nuevo módulo de proyecto",
  projects__scenarios_actions_disabled_tooltip: "Cambios sólo posibles sin encuesta",
  projects__scenarios_add_scenario_text:
    "Con la ayuda de escenarios, los participantes pueden ser evaluados mediante una simulación de oficina.",
  projects__scenarios_add_questionnaire_text:
    "Los cuestionarios pueden utilizarse para evaluar a los participantes en una secuencia de preguntas.",
  projects__scenarios_placeholder_title: "No hay módulo de proyecto disponible.",
  projects__scenarios_placeholder_text: "Añada aquí los módulos de proyecto necesarios para trabajar en este proyecto.",
  projects__scenarios_placeholder_button: "A los módulos del proyecto",
  projects__scenarios_module_placeholder_button: "Añadir módulo de proyecto",
  projects__surveys_card_title: "Encuestas ({{count}})",
  projects__test_surveys_card_title: "Prueba de encuestas ({{count}})",
  projects__surveys_placeholder_text:
    "Para crear encuestas, debe haber al menos un módulo de proyecto y el texto de bienvenida. Además, no puede haber ningún módulo de proyecto en progreso.",
  projects__test_surveys_placeholder_text:
    "Para poder crear pruebas de encuestas, es necesario disponer al menos de un módulo de proyecto y del texto de bienvenida",
  projects__test_surveys_placeholder_text_enabled: "Cree ahora una prueba de encuesta.",
  projects__surveys_placeholder_text_enabled: "Cree una encuesta ahora.",
  projects__surveys_placeholder_title: "No hay encuestas disponibles.",
  projects__test_surveys_placeholder_title: "No se dispone de prueba de encuesta.",
  projects__surveys_add: "Crear encuesta",
  projects__surveys_add_test_survey: "Crear prueba de encuesta",
  projects__surveys_modules: "A los módulos del proyecto",
  projects__surveys_table_title: "Título",
  projects__surveys_table_condition: "Condición de participación",
  projects__surveys_table_open_participation: "Participación abierta",
  projects__surveys_table_open_participation_text:
    "La participación es accesible a todos a través de un enlace. No es necesario un código de acceso.",
  projects__surveys_table_closed_participation: "Participación restringida",
  projects__surveys_table_closed_participation_text:
    "La participación es sólo posible por invitación. Los usuarios invitados recibirán un código de acceso por correo electrónico.",
  projects__surveys_table_condition_auto: "automático",
  projects__surveys_table_condition_manual: "manual (síncrono)",
  projects__surveys_table_participants: "Participantes",
  projects__surveys_table_participants_count: "Participantes ({{count}})",
  projects__surveys_table_participants_column: "{{participants}} de {{invites}}",
  projects__surveys_table_participants_column_tooltip: "{{participants}} completado, {{invites}} invitado",
  projects__surveys_table_status: "Estado",
  projects__surveys_table_status_complete: "Completado",
  projects__surveys_table_status_incomplete: "Futuro",
  projects__surveys_delete: "Borrar encuesta",
  projects__modules_sort_title: "Ordenar los módulos del proyecto",
  projects__modules_delete: "Borrar módulo de proyecto",
  projects__users_invite: "Invitar a colaboradores",

  // Project scenario selection
  projects__scenario_label_already_assigned: "Ya en la lista de escenarios",
  projects__scenario_label_selected: "Seleccionado",
  projects__scenario_header_label: "Añadir módulos de proyecto",
  projects__scenario_header_action_label: "Añadir escenarios",
  projects__scenario_header_action_label_count: "Añadir escenarios ({{count}})",
  projects__scenario_detail_header_label: "Resumen de escenarios",
  projects__scenario_detail_navigate_back_label: "Selección de escenarios",

  // Project questionnaire selection
  projects__questionnaire_label_already_assigned: "Ya en la lista del cuestionario",
  projects__questionnaire_label_selected: "Seleccionado",
  projects__questionnaire_header_label: "Añadir módulos de proyecto",
  projects__questionnaire_header_action_label: "Añadir cuestionarios",
  projects__questionnaire_header_action_label_count: "Añadir cuestionarios ({{count}})",
  projects__questionnaire_detail_header_label: "Resumen de cuestionarios",
  projects__questionnaire_detail_navigate_back_label: "Selección del cuestionario",
  projects__questionnaire_detail_header_action_label: "Añadir a la lista de favoritos",

  // Project surveys
  projects__surveys_creation_orly_title: "Crear encuestas",
  projects__surveys_creation_orly_text:
    "Una vez que un proyecto contiene encuestas, no se pueden hacer más cambios en el proyecto. ¿Está seguro de que desea crear una encuesta?",
  projects__surveys_creation_orly_confirm: "Crear",
  projects__surveys_creation_form_title: "Crear una nueva encuesta",
  projects__surveys_test_creation_form_title: "Crear una nueva prueba de encuesta",
  projects__surveys_creation_form_hint:
    "Para crear una nueva encuesta, rellene los datos obligatorios. Puede editar esta información en cualquier momento:",
  projects__surveys_title_label: "Título",
  projects__surveys_description_label: "Descripción",
  projects__surveys_start_label: "Inicio",
  projects__surveys_end_label: "Fin",
  projects__surveys_progress_section_label: "Procedimiento de encuesta",
  projects__surveys_progress_manual_label: "Inicio manual de la encuesta",
  projects__surveys_progress_manual_hint:
    "Una vez creada, la encuesta puede ser iniciada por el investigador en un momento libre. Seleccione si los participantes deben realizar la encuesta de forma sincrónica o asincrónica:",
  projects__surveys_progress_automatic_label: "Inicio automático de la encuesta",
  projects__surveys_progress_automatic_hint:
    "La encuesta se llevará a cabo después de la creación en el período que desee.",
  projects__surveys_trigger_asynchronous_label: "Desarrollo asíncrono (el participante controla la ejecución)",
  projects__surveys_trigger_asynchronous_hint:
    "Todos los participantes pueden controlar ellos mismos el proceso del proyecto y finalizar escenarios u otros elementos del proyecto antes de tiempo (dentro del periodo de tramitación). Así, los escenarios o cuestionarios siguientes se pueden iniciar directamente.",
  projects__surveys_progress_manual_asynchronous_label:
    "Desarrollo asíncrono (el participante controla la ejecución por sí mismo)",
  projects__surveys_progress_manual_asynchronous_hint:
    "Todos los participantes pueden controlar ellos mismos el proceso del proyecto y finalizar escenarios u otros elementos del proyecto antes de tiempo (dentro del periodo de tramitación). Así, los escenarios o cuestionarios siguientes se pueden iniciar directamente.",
  projects__surveys_progress_manual_synchronous_label:
    "Desarrollo sincrónico (el experimentador controla la ejecución)",
  projects__surveys_progress_manual_synchronous_hint:
    "El curso del proyecto lo fija el experimentador. Los participantes pueden terminar los elementos del proyecto antes de tiempo (dentro del periodo de tramitación). Los escenarios o cuestionarios posteriores, sin embargo, sólo pueden iniciarse cuando el experimentador los autoriza para todos los participantes.",

  // Project Module
  project_module__create_module_title: "Añadir otro módulo",
  project_module__create_scenario_label: "Escenario",
  project_module__create_questionnaire_label: "Cuestionario",

  // Survey Detail
  projects__survey_details_header_label: "Encuesta",
  projects__survey_details_header_navigate_back_label: "Proyecto",
  projects__survey_details_header_general_info: "Información general sobre la encuesta",
  projects__survey_details_no_survey: "La encuesta seleccionada no existe",
  projects__survey_details_settings_label: "Configuración de la ejecución",
  projects__survey_details_data: "Descargas",
  projects__survey_details_media: "Medios",
  projects__survey_details_media_tooltip: "Todos los archivos externos utilizados en este proyecto.",
  projects__survey_details_survey_data: "Datos de la encuesta",
  projects__survey_details_survey_data_tooltip:
    "Los datos de la encuesta de todos los participantes, facilitados en formato JSON.",
  projects__survey_details_data_description: "Descargue aquí todos los datos de esta encuesta.",
  projects__survey_details_data_button: "Descargar todos los conjuntos de datos",
  projects__survey_details_data_tooltip_title: "Nota sobre los conjuntos de datos de las pruebas de encuestas",
  projects__survey_details_data_tooltip_text:
    "Es posible que las referencias en los datos no se resuelvan si los módulos del proyecto y sus dependencias se han modificado después de la prueba de encuesta.",
  projects__survey_details_data_download_modal_title: "Nota sobre la descarga de los conjuntos de datos",
  projects__survey_details_data_download_modal_button: "Descargar datos",
  projects__surveys_details_participation_label: "Derecho de participación",
  projects__surveys_details_progress_label: "Procedimiento de encuesta",
  projects__survey_overlay_anon_participation_auth: "Autorización",
  projects__survey_overlay_anon_participation_auth_tooltip:
    "La participación anónima le permite participar en la encuesta sin registrarse con datos de usuario de libre elección.",
  projects__survey_overlay_anon_participation_label: "Permitir la participación anónima",
  projects__survey_overlay_open_participation: "Participación abierta",
  projects__survey_overlay_closed_participation: "Participación privada",
  projects__survey_overlay_anonym_participation: "Anónimo permitido",
  projects__survey_overlay_timerange_label: "Periodo de tramitación",
  projects__surveys_details_participation_registered: "Permitir sólo usuarios registrados",
  projects__surveys_details_participants_label: "Lista de invitados",
  projects__surveys_details_participants_value: "{{count}} Participantes",
  projects__surveys_details_participants_link: "Enlace de invitación",
  projects__surveys_details_accounts_label: "Colaboradores",
  projects__surveys_details_accounts_value: "{{count}} Colaboradores",
  projects__surveys_details_project_label: "Proyecto",
  projects__surveys_details_progress_automatic: "Automático ({{start}} - {{end}})",
  projects__surveys_details_progress_manual_synchron: "Manual (síncrono)",
  projects__surveys_details_progress_manual_asynchron: "Manual (asíncrono)",
  projects__surveys_details_progress_no_date: "indeterminado",
  projects__surveys_details_dashboard_participants: "{{count}} de {{invited}} participantes",
  projects__surveys_details_dashboard_participants_completed: "{{completed}} de {{invited}} completado",
  projects__surveys_details_dashboard_next_module_modal_title: "Iniciar ahora el siguiente módulo del proyecto",
  projects__surveys_details_dashboard_next_module_modal_confirm_button: "Iniciar",
  projects__surveys_details_dashboard_next_module_modal_text_1:
    "El procesamiento de los participantes que aún no han completado el módulo actual del proyecto se cancela cuando se inicia el siguiente módulo.",
  projects__surveys_details_dashboard_next_module_modal_text_2: "¿Desea iniciar ya el siguiente módulo del proyecto?",
  projects__surveys_details_dashboard_end_survey_modal_title: "Finalizar la encuesta",
  projects__surveys_details_dashboard_end_survey_modal_confirm_button: "Finalizar",
  projects__surveys_details_dashboard_end_survey_modal_text_1:
    "El procesamiento de los participantes que aún no han completado el módulo del proyecto actual se cancela al finalizar la encuesta.",
  projects__surveys_details_dashboard_end_survey_modal_text_2: "¿Desea finalizar ahora la ejecución del proyecto?",
  projects__surveys_details_navigate_label: "Ir al resumen de la encuesta",
  projects__surveys_details_test_survey_info: "Se trata de una prueba de encuesta.",
  projects__survey_overlay_update_description: "Descripción de la encuesta",

  // Survey Invite Attendees
  projects__survey_details_invite_title: "Invitar a participantes",
  projects__survey_details_invite_emails_heading: "Introducir las direcciones de correo electrónico",
  projects__survey_details_invite_emails_grid_heading:
    "Envíe invitaciones de participación a las siguientes direcciones de correo electrónico:",
  projects__survey_details_invite_emails_placeholder: "Ejemplo: jose-lopez@mail.es ; maria-gomez@mail.es ; ...",
  projects__survey_details_invite_emails_invalid:
    "La entrada contiene direcciones de correo electrónico incompletas o incorrectas",
  projects__survey_details_invite_emails_duplications:
    "La entrada contiene direcciones de correo electrónico repetidas.",
  projects__survey_details_invite_emails_already_invited: "La entrada contiene direcciones ya añadidas.",
  projects__survey_details_invite_emails_empty: "No hay direcciones de correo electrónico indicadas",
  projects__survey_details_invite_emails_help_text:
    "Puede invitar a todos los participantes agrupados. Para ello, introduzca todas las direcciones de correo electrónico deseadas separadas por punto y coma.",
  projects__survey_details_tooltip_invite_already_sent: "Invitación ya enviada",
  projects__survey_details_tooltip_invite_duplicate: "Dirección de correo electrónico indicada reiteradamente",
  projects__survey_details_tooltip_remove_from_list: "Eliminar de la lista",
  projects__survey_details_invite_emails_number_of_valid_addresses:
    "{{number}} Direcciones de correo electrónico completas",
  // Survey edit
  projects__surveys_update_form_title: "Editar los ajustes de aplicación",

  // Project Module Selection
  project_module_selection__empty_selection_scenario: "Ningún escenario seleccionado",
  project_module_selection__selected_scenario: "Escenarios",
  project_module_selection__empty_selection_questionnaire: "Ningún cuestionario seleccionado",
  project_module_selection__selected_questionnaire: "Cuestionarios",

  // Survey Rating
  rating_overview__rating_ended: "Finalizado el {{date}}",
  rating_overview__rating_end: "Termina el {{date}}",
  rating_overview__ended_today: "Hoy",
  rating_overview__rater_count: "Evaluador ({{count}})",
  rating_overview__no_raters: "No se han añadido evaluadores",
  rating_overview__invite_raters_button_label: "Invitar ahora a evaluadores",
  rating_overview__rating_progress: "Progreso de la evaluación",
  rating_overview__attendees_list_label: "Lista de participantes ({{count}})",
  rating_overview_title: "Clasificación",
  rating_participant_list_placeholder_title: "No hay evaluación disponible.",
  rating_participant_list_placeholder_description:
    "Realice primero la evaluación de la calificación antes de proceder a la puntuación.",
  rating_participant_list_placeholder_button: "A la calificación",
  rating_participant_list_no_data_placeholder_description: "Aún no hay participantes disponibles para evaluar.",

  // Survey Dashboard
  dashboard__header_navigate_back_label: "Resumen de encuesta",
  dashboard__details_label: "Información general sobre la encuesta",
  dashboard__details_time_future: "Futuro ({{date}})",
  dashboard__details_time_future_manual: "Aún no iniciado",
  dashboard__details_time_running: "Ejecución del proyecto (en curso...)",
  dashboard__details_time_ended: "completado",
  dashboard__details_time_undefined: "Sin fecha",
  dashboard__title_time_future: "Inicio el {{date}} ({{remainingTime}})",
  dashboard__title_time_future_manual_survey: "Encuesta aún no iniciada",
  dashboard__title_time_running: "Ejecución del proyecto en curso ({{remainingTime}})",
  dashboard__title_time_running_without_time: "Ejecución del proyecto en curso",
  dashboard__title_time_ended: "Ejecución del proyecto finalizada ({{endDate}})",
  dashboard__title_time_undefined: "Sin fecha",
  dashboard__title_days_to: "En {{days}} días",
  dashboard__title_days_today: "Hoy",
  dashboard__title_day_to: "En un día",
  dashboard__title_days_remaining: "Todavía {{days}} días",
  dashboard__title_day_remaining: "Todavía un día",
  dashboard__title_remaining_today: "Todavía hoy",
  dashboard__title_today: "Hoy",
  dashboard__progress_project_title: "Supervisión",
  dashboard__progress_scoring_title: "Puntuación",
  dashboard__progress_monitoring_title: "Supervisión",
  dashboard__progress_results_title: "Resultados",
  dashboard__progress_reports_title: "Informes",
  dashboard__progress_reports_finished_modules: "Módulos del proyecto completados",
  dashboard__progress_reports_finalized_attendees: "Participantes completamente evaluados",
  dashboard__progress_reports_fully_rate_abbr: "Participantes completamente evaluados",
  dashboard__progress_reports_maximum_score: "Puntuación máxima",
  dashboard__progress_reports_attendee_score: "Puntuación de este participante",
  dashboard__progress_reports_all_reports_done: "Resultados completos",
  dashboard__progress_reports_no_reports: "No hay datos disponibles",
  dashboard__progress_reports_missing_reports: "Resultados incompletos",
  dashboard__progress_reports_survey_average: "Promedio de la encuesta:",
  dashboard__progress_scoring_placeholder: "A continuación se muestra una evaluación",
  dashboard__progress_results_placeholder:
    "A continuación se presenta un resumen de los resultados de los participantes.",
  dashboard__progress_chart_legend: "Participantes invitados",
  dashboard__progress_chart_legend_open: "Participantes",
  dashboard__progress_chart_legend_abbr: "Participantes invitados",
  dashboard__scoring_chart_legend: "Conjuntos de datos disponibles",
  dashboard__progress_chart_invited: "invitado",
  dashboard__progress_chart_active: "activo",
  dashboard__progress_chart_offline: "desconectado",
  dashboard__progress_chart_online: "conectado",
  dashboard__progress_chart_not_joined: "no unido",
  dashboard__progress_chart_completed: "completado",
  dashboard__progress_chart_rating_ongoing: "en curso",
  dashboard__progress_chart_rating_finished: "completado",
  dashboard__rating_attendees_finalized: "Participantes completamente evaluados",
  dashboard__progress_chart_finalized: "finalizado",
  dashboard__progress_future: "Invitar a participantes...",
  dashboard__progress_running: "Ejecución del proyecto en curso",
  dashboard__progress_ended: "Ejecución del proyecto finalizada",
  dashboard__scoring_future: "Invitar a evaluadores...",
  dashboard__scoring_ongoing: "Puntuación en curso...",
  dashboard__scoring_finished: "Puntuación completada",
  dashboard__result_future: "No hay datos disponibles",

  // Dashboard Project progress
  dashboard__project_header_label: "Supervisión",
  dashboard__project_header_navigate_back_label: "Encuesta",
  dashboard__project_project_title: "Proyecto",
  dashboard__project_project_module_title: "Módulo de proyecto ({{index}}/{{count}})",
  dashboard__project_project_navigation: "Todo el proyecto",
  dashboard__project_project_events_placeholder: "No hay eventos disponibles",
  dashboard__project_chart_title: "Progreso del proyecto",
  dashboard__project_chart_title_module_selected: "Progreso del módulo",
  dashboard__project_table_title: "Lista de participantes",
  dashboard__project_table_placeholder_title: "Ningún participante invitado",
  dashboard__project_table_placeholder_title_manual_synchron: "Ningún participante conectado",
  dashboard__project_table_placeholder_hint_manual_synchron:
    "Por favor, reenvíe el enlace de invitación para invitar a personas a esta encuesta",
  dashboard__project_table_placeholder_button: "Invitar ahora a participantes",
  dashboard__project_table_participant_header: "Participantes ({{count}})",
  dashboard__project_table_element_header: "Módulo del proyecto actual",
  dashboard__project_table_progress_header: "Módulos de proyectos ({{count}})",
  dashboard__project_table_progress_tooltip: "Ordenar por progreso del módulo de proyecto",
  dashboard__project_table_progress_none: "Aún no iniciado",
  dashboard__project_table_progress_done: "Encuesta completada",
  dashboard__project_table_progress_module_is_starting: "Se inicia el módulo",
  dashboard__project_table_progress_questionnaire_header: "Preguntas ({{count}})",
  dashboard__project_table_progress_questionnaire_tooltip: "Ordenar por número de preguntas contestadas",
  dashboard__project_table_progress_documents_header: "Documentos relevantes abiertos ({{count}})",
  dashboard__project_table_progress_documents_tooltip: "Ordenar por número de documentos relevantes abiertos",
  dashboard__project_table_progress_words_in_mails_title: "Palabras en el correo saliente",
  dashboard__project_table_progress_words_in_mails_title_no_words: "No hay correo saliente disponible",
  project__remaining_time_placeholder: "Tiempo restante cargando...",
  project__name_and_duration: "{{name}} ({{duration}} {{unit}})",
  dashboard__scenario_none: "Ningún escenario",
  dashboard__scenario_count: "1 escenario",
  dashboard__scenarios_count: "{{count}} escenarios",
  dashboard__questionnaire_none: "Ningún cuestionario",
  dashboard__questionnaire_count: "1 cuestionario",
  dashboard__questionnaires_count: "{{count}} cuestionarios",

  // Dashboard attendee progress
  dashboard__participant_header_label: "Participante",
  dashboard__participant_header_navigate_back_label: "Supervisión",
  dashboard__attendee_action_title: "Al panel de control",
  dashboard__attendee_information_title: "Información participantes",
  dashboard__attendee_progress_title: "Progreso de la encuesta ({{count}}/{{total}})",
  dashboard__attendee__scoring_progress_title: "Progreso de la puntuación ({{count}}/{{total}})",
  dashboard__attendee_salutation_label: "Título",
  dashboard__attendee_attendee_label: "Nombre",
  dashboard__attendee_attendee_index: "Número de referencia",
  dashboard__attendee_attendee_token: "Código de acceso",
  dashboard__attendee_elements_header: "Elementos del proyecto ({{count}})",
  dashboard__attendee_type_header: "Tipo",
  dashboard__attendee_type_scenario: "Escenario",
  dashboard__attendee_type_questionnaire: "Cuestionario",
  dashboard__attendee_status_header: "Estado",
  dashboard__attendee_final_score_header: "Resultado final",
  dashboard__attendee_status_completed: "completado",
  dashboard__attendee_status_progressing: "en curso",
  dashboard__attendee_status_not_completed: "no completado",
  dashboard__attendee_status_open: "aún no iniciado",
  dashboard__attendee_questionnaire_back_to_overview: "Resumen ({{participantName}})",
  dashboard__attendee_questionnaires_status_in_progress: "Ejecución en curso",
  dashboard__attendee_questionnaires_status_finished: "completado",
  dashboard__attendee_questionnaires_results: "Resultados",
  dashboard__attendee_questionnaires_progress: "Progreso del cuestionario",
  dashboard__attendee_questionnaires_answered_questions: "Preguntas contestadas",
  dashboard__attendee_questionnaires_title: "{{index}}. {{questionnaireName}}",

  // Dashboard Footer
  dashboard__footer_timing_future: "Inicio el {{date}} ({{remainingTime}})",
  dashboard__footer_timing_present: "Fin el {{date}} ({{remainingTime}})",
  dashboard__footer_timing_past: "Finalizado el {{end}}",
  dashboard__footer_timing_past_today: "Finalizado hoy",
  dashboard__footer_timing_undefined: "Período incompleto",
  dashboard__footer_invited: "{{invitationsCount}} participantes invitados",
  dashboard__footer_completed: "{{completedCount}} de {{invitationsCount}} completados",
  dashboard__footer_project_future: "futuro",
  dashboard__footer_project_present: "Encuesta en curso",
  dashboard__footer_project_past: "Encuesta completada",
  dashboard__footer_navigate_scoring: "A la puntuación",
  dashboard__footer_navigate_dashboard: "A la supervisión",
  dashboard__footer_manual_synchron: "Inicio manual (síncrono)",
  dashboard__footer_manual_asynchron: "Inicio manual (asíncrono)",
  dashboard__footer_manual_synchron_start_project: "Iniciar encuesta",
  dashboard__footer_manual_synchron_stop_project: "Finalizar la encuesta",
  dashboard__footer_manual_synchron_start_next_module: "Iniciar el siguiente módulo del proyecto",
  dashboard__footer_manual_synchron_chat_footer_tooltip: "Enviar mensaje a los participantes seleccionados ({{count}})",
  dashboard__footer_manual_synchron_chat_footer_tooltip_disabled: "Ningún participante seleccionado",

  // File Explorer
  file_explorer__title: "Estructura del directorio",
  file_explorer__create_new_main_directories: "Añadir carpeta principal",
  file_explorer__no_directories_title: "Ninguna carpeta creada",
  file_explorer__no_directories_message: "Por favor, primero añade una carpeta",

  // Module Selection
  module_selection__single_entity_selected: "„{{name}}“ seleccionado",
  module_selection__multi_entity_selected: "seleccionado",
  module_selection__placeholder_title: "Ningún {{entity}} seleccionado",
  module_selection__placeholder_hint: "Ningún {{entity}} añadido",
  module_selection__placeholder_button: "{{entity}} añadir",

  // Files and Directories
  files_and_directories__title: "Carpetas y archivos",
  files_and_directories__files: "Archivos",
  files_and_directories__upload_modal_title_singular: "Añadir archivo",
  files_and_directories__upload_modal_title_plural: " Añadir archivos",
  files_and_directories__upload_modal_choose_file: "Seleccionar archivo",
  files_and_directories__upload_modal_choose_file_disabled: "Archivo ya seleccionado",
  files_and_directories__upload_modal_create_text_document: "Crear documento de texto",
  files_and_directories__upload_modal_show_preview: "Ver vista previa",
  files_and_directories__upload_modal_file_typ: "Tipo de archivo",
  files_and_directories__upload_modal_file_typ_text_plural:
    "Añada aquí los archivos que desee en los siguientes formatos:",
  files_and_directories__upload_modal_file_typ_text_singular:
    "Añada aquí el archivo que desee en los siguientes formatos:",
  files_and_directories__upload_modal_file_size_hint_plural:
    "El tamaño máximo de los archivos individuales es de {{fileSizeInMB}} MB. Limite su selección a archivos de tamaño adecuado.",
  files_and_directories__upload_modal_file_size_hint_singular:
    "El tamaño máximo del archivo es {{fileSizeInMB}} MB. Limite su selección a un archivo de tamaño adecuado.",
  files_and_directories__upload_modal_added_file_no_amount: "Archivo añadido",
  files_and_directories__upload_modal_added_file: "Archivo añadido ({{amount}})",
  files_and_directories__upload_modal_added_files: "Archivos añadidos ({{amount}})",
  files_and_directories__upload_modal_failed_upload: "Se ha producido un error al cargar el archivo seleccionado.",
  files_and_directories__upload_modal_file_too_large: "El archivo seleccionado excede el tamaño máximo de archivo",
  files_and_directories__upload_modal_file_type_invalid: "El tipo de archivo seleccionado no es compatible.",
  files_and_directories__upload_modal_no_single_file: "Se puede seleccionar como máximo un archivo.",
  files_and_directories__upload_modal_is_uploading: "Cargar…",
  files_and_directories__upload_modal_is_uploading_plural: "Los archivos se cargan...",
  files_and_directories__upload_modal_no_files_selected: "No se han añadido archivos",
  files_and_directories__upload_modal_no_files_selected_hint:
    "Añada los archivos deseados en la parte superior de la ventana de carga.",
  files_and_directories__upload_modal_no_file_selected: "No se ha añadido ningún archivo",
  files_and_directories__upload_modal_no_file_selected_hint:
    "Añada el archivo deseado en la parte superior de la ventana de carga.",
  files_and_directories__upload_modal_upload_title: "Cargar",
  files_and_directories__file_type_table_calculation: "Hoja de cálculo",
  files_and_directories__file_type_pdf: "PDF",
  files_and_directories__file_type_image: "Gráfico",
  files_and_directories__file_type_video: "Vídeo",
  files_and_directories__file_type_text: "Texto",
  files_and_directories__file_detail_name: "Nombre del archivo",
  files_and_directories__file_detail_name_edit: "Editar nombre de archivo",
  files_and_directories__file_detail_settings: "Ajustes específicos del escenario",
  files_and_directories__directory_detail_name_edit: "Editar carpeta",
  files_and_directories__directory_detail_name: "Carpeta",
  files_and_directories__directory_detail_sub_directory: "Subcarpeta",
  files_and_directories__directory_detail__column_header_title: "Título",
  files_and_directories__directory_detail__column_header_relevance: "Relevancia",
  files_and_directories__create_main_directory_modal_title: "Añadir una nueva carpeta principal",
  files_and_directories__create_sub_directory_modal_title: "Añadir nueva subcarpeta",
  files_and_directories__create_main_directory_modal_name_title: "Nombre de la carpeta",
  files_and_directories__create_main_directory_modal_name_placeholder: "Nombre de la carpeta",
  files_and_directories__directory_content_list_heading: "Carpetas y archivos",
  files_and_directories__directory_content_list_placeholder: "No hay carpetas ni archivos disponibles",
  files_and_directories__create_subdirectory_tooltip: "Añadir subcarpeta",
  files_and_directories__create_file_tooltip: "Añadir archivo",
  files_and_directories__rename_directory_label: "Nombre de la carpeta",
  files_and_directories__move_directory_label: "Carpeta",
  files_and_directories__open_in_viewer: "{{preposition}} {{viewerTool}} abrir",
  files_and_directories__viewer_not_found: "No hay ninguna herramienta adecuada para el tipo de archivo seleccionado",
  files_and_directories__move_directory: "Mover a",
  files_and_directories__move_directory_main_directory: "Carpetas y archivos (Carpeta principal)",
  files_and_directories__move_modal_title: "{{entity}} mover",
  files_and_directories__move_modal_entity_file: "Archivo",
  files_and_directories__move_modal_entity_directory: "Carpeta",
  files_and_directories__move_modal_info_text_file:
    "Por favor, seleccione una carpeta para mover el archivo seleccionado.",
  files_and_directories__move_modal_info_text_directory: "Seleccione una carpeta para mover la carpeta seleccionada.",
  files_and_directories__move_modal_file_name_label: "Archivo a mover",
  files_and_directories__move_modal_directory_name_label: "Carpeta a mover",
  files_and_directories__move_modal_select_directory: "Seleccionar carpeta",
  files_and_directories__move_modal_current_position: "Posición actual",
  files_and_directories__move_modal_target_directory: "Mover a esta carpeta",
  files_and_directories__move_modal_no_subfolders: "No hay subcarpetas disponibles",
  files_and_directories__move_modal_tooltip_revert_selection: "Deshacer selección",
  files_and_directories__move_modal_define_as_root_directory: "Carpetas y archivos (definir como carpeta principal)",
  files_and_directories__move_modal_tooltip_move_not_possible: "No es posible mover a una subcarpeta propia",
  files_and_directories__disabled_tooltip: "Escenario ya publicado",
  files_and_directories__readonly_tooltip: "no editable",
  files_and_directories__intervention_singular: "Intervención disponible",
  files_and_directories__intervention_plural: "Intervenciones disponibles",
  files_and_directories__intervention_spreadsheet_info:
    "Una intervención es una ayuda automática. Se produce cuando el participante no consulta el documento. También puede crear intervenciones de celda en la herramienta de hoja de cálculo.",
  files_and_directories__intervention_spreadsheet_title: "Intervención de celdas",
  files_and_directories__intervention_spreadsheet_is_included: "Contenido es igual",
  files_and_directories__intervention_spreadsheet_is_not_included: "Contenidos no iguales",
  files_and_directories__intervention_spreadsheet_description:
    "Una intervención de celda es una ayuda automática. Se produce cuando la celda seleccionada contiene o no contenidos definidos después de un tiempo determinado. Indique los contenidos que deben comprobarse por separado con un punto y coma.",
  files_and_directories__sample_company_file_hint:
    "Este archivo se creó en la empresa modelo utilizada. Por favor, realice allí los ajustes específicos del escenario.",
  files_and_directories__sample_company_directory_hint:
    "Los archivos de esta carpeta se crearon en la empresa modelo utilizada.",
  files_and_directories__sample_company_label: "Empresa modelo",
  files_and_directories__sample_company_button: "A la empresa modelo",
  files_and_directories__downloads_label: "Descargas",
  files_and_directories__downloads_mail: "Correo electrónico",
  files_and_directories__downloads_mail_files: "Archivos",
  files_and_directories__downloads_mail_navigate: "Al correo electrónico",
  files_and_directories__downloads_mail_defaultRecipient: "{nombre}.{apellido}@lucaoffice.es",
  files_and_directories__downloads_hint:
    "Los archivos de esta carpeta estarán disponibles en cuanto el participante los haya descargado en los correos electrónicos correspondientes.",
  files_and_directories__downloads_mail_dispatch_time: "Hora de envío",
  files_and_directories__downloads_mail_detail_hint:
    "Este archivo estará disponible en cuanto el participante lo haya descargado en el correo electrónico correspondiente.",

  // Files
  file__edit_title_file_type_image: "Editar gráfico",
  file__edit_title_file_type_video: "Editar vídeo",
  file__edit_title_file_type_pdf: "Editar PDF",
  file__delete_button_file_type_image: "Borrar gráfico",
  file__delete_button_file_type_video: "Borrar vídeo",
  file__delete_button_file_type_pdf: "Borrar PDF",
  file__preview__label: "Vista previa del archivo",
  file__swap__label: "Intercambiar archivos",
  file__delete_file_type_image_failed: "Se ha producido un error al borrar el gráfico.",
  file__swap_file_type_image_failed: "Se ha producido un error al cargar el gráfico.",
  file__swap_file_type_video_failed: "Se ha producido un error al cargar el vídeo.",

  // Interventions
  interventions__detail_view_header_label: "Intervenciones",
  interventions__detail_view_header_label_singular: "Intervención",
  interventions__detail_view_table_of_contents_title_all: "Todas las posiciones",
  interventions__detail_view_table_of_contents_title_files: "Archivos",
  interventions__detail_view_table_of_contents_title_erp: "Registros de datos ERP",
  interventions__detail_view_table_of_contents_title_mail: "Correo electrónico",
  interventions__detail_view_table_of_contents_title_notes: "Notas",
  interventions__detail_view_table_of_contents_title_erp_short: "ERP",
  interventions__detail_view_table_of_contents_title_event: "Evento",
  interventions__detail_view_table_of_contents_placeholder_title: "No hay intervenciones disponibles",
  interventions__detail_view_table_of_contents_placeholder_hint:
    "Puede crear intervenciones en los ajustes adicionales de los correos electrónicos, registros (ERP), archivos y eventos.",
  interventions__detail_view_overview_empty_placeholder: "Sin selección",
  interventions__detail_view_overview_no_position_or_intervention_placeholder:
    "Seleccione una posición o intervención a la izquierda.",
  interventions__group_type_header: "Posición ({{groupType}})",
  interventions__group_type_label: "Posición",
  interventions__group_type_to_file: "Al archivo",
  interventions__group_type_erp_table: "Tabla",
  interventions__interventions_table_time_offset: "Tiempo",
  interventions__interventions_table_time_placeholder: "Ninguna intervención creada",
  interventions__interventions_table_time_offset_after_event: "Después del evento",
  interventions__interventions_table_trigger_condition: "Condición de activación",
  interventions__interventions_detail_title_label: "Título de la intervención",
  interventions__interventions_detail_email_label: "Correo electrónico de intervención (bandeja de entrada)",
  interventions__interventions_detail_email_hint:
    "El correo electrónico de intervención aparece como correo no leído en la bandeja de entrada del correo electrónico en cuanto se produce la condición de activación a la hora seleccionada.",
  interventions__interventions_detail_email_delay: "(+ {{delayInMinutes}} minutos)",
  interventions__interventions_detail_email_button: "Al correo electrónico",
  interventions__interventions_detail_edit_tim_modal_title: "Momento de la intervención",
  interventions__interventions_detail_edit_tim_modal_description:
    "Seleccione el tiempo dentro del periodo de tramitación de este escenario ({{durationInMinutes}} min) para esta intervención. (Especifique un número entero)",
  interventions__interventions_detail_edit_tim_modal_label: "La intervención se produce después de:",
  interventions__interventions_detail_delete_modal_title: "Borrar intervención",
  interventions__interventions_detail_delete_modal_erp_dataset_title: "Borrar intervenciones del número de pedido",
  interventions__interventions_detail_delete_modal_description:
    "¿De verdad quiere borrar irreversiblemente esta intervención y el correspondiente correo electrónico saliente?",
  interventions__interventions_detail_delete_position_modal_title: "Borrar posición",
  interventions__interventions_detail_delete_position_modal_description:
    "¿Realmente quieres borrar irrevocablemente esta posición con todas las intervenciones creadas y los correos salientes correspondientes?",
  interventions__interventions_trigger_conditions_opening_indicator: "Indicador de apertura",
  interventions__interventions_trigger_conditions_opening_indicator_open: "Abierto",
  interventions__interventions_trigger_conditions_opening_indicator_not_opened: "Sin abrir",
  interventions__interventions_check_file: "Archivo no abierto",
  interventions__interventions_check_mail: "Correo electrónico no abierto",
  interventions__interventions_check_runtime_survey: "Opción de respuesta seleccionada",
  interventions__interventions_check_answer_runtime_survey: "Opción de respuesta seleccionada",
  interventions__interventions_check_answer_runtime_survey_negated: "Opción de respuesta no seleccionada",
  interventions__interventions_check_answer_runtime_survey_description:
    "La marcación de la opción de respuesta se comprueba una vez cerrado el evento. Si se ha seleccionado esta opción de respuesta, se envía el correo electrónico de intervención, que se puede encontrar en la bandeja de entrada del correo electrónico del participante.",
  interventions__interventions_check_erp: "Registro no abierto",
  interventions__interventions_check_spreadsheet: "Contenido de la celda ({{cellName}}) disponible",
  interventions__interventions_check_spreadsheet_edit_overlay_title:
    "Comprueba si la celda tiene el siguiente contenido:",
  interventions__interventions_check_spreadsheet_negated:
    "Contenido de la celda en la celda ({{cellName}}) no está disponible",
  interventions__interventions_check_erp_row: "Registro no abierto",
  interventions__interventions_check_erp_row_runtime_survey: "Registro abierto",
  interventions__interventions_check_notes_value: "Valor de entrada en notas no disponible",
  interventions__interventions_check_notes_value_label: "Contenido a comprobar",
  interventions__interventions_check_notes_value_label_update_title:
    "Compruebe las notas de los siguientes contenidos:",
  interventions__interventions_check_text_document_value_label_update_title:
    "Compruebe el contenido del documento de texto:",
  interventions__interventions_check_notes_value_label_update_description:
    "Por favor, indique los contenidos a comprobar por separado con punto y coma. (función O)",
  interventions__interventions_check_notes_value_label_tooltip:
    "Por favor, indique los contenidos a comprobar por separado con punto y coma. (función O)",
  interventions__interventions_check_text_document_value: "Valor de entrada no disponible en el documento de texto",
  interventions__interventions_check_text_document_value_description:
    "El contenido del documento de texto se comprueba en el momento seleccionado. Si ninguno de los contenidos especificados del documento de texto está presente en el momento seleccionado, se envía el correo electrónico de intervención, que puede encontrarse en la bandeja de entrada del correo electrónico del participante.",
  interventions__interventions_check_notes_value_description:
    "El contenido de la herramienta de notas se comprueba a la hora seleccionada. Si ninguno de los contenidos especificados de la herramienta de notas está presente en el momento seleccionado, se envía el correo electrónico de intervención, que puede encontrarse en la bandeja de entrada del correo electrónico del participante.",
  interventions__interventions_check_spreadsheet_cell_content_description:
    "El contenido de la celda de esta hoja de cálculo se comprueba en el momento seleccionado. Si esto sucede, se envía el correo electrónico de intervención, que se encuentra en la bandeja de entrada del participante.",
  interventions__interventions_check_spreadsheet_cell_content_title:
    "Contenido en la celda ({{cellName}}) no está disponible",
  interventions__interventions_check_spreadsheet_cell_content_short_text:
    "Una intervención de celda es una ayuda automática. Se produce cuando la celda seleccionada no contiene contenido definido después de un tiempo determinado.",
  interventions__interventions_check_file_description:
    "El indicador de apertura del archivo se comprueba a la hora seleccionada. Si el archivo no se ha abierto a la hora seleccionada, se envía el correo electrónico de intervención, que se encuentra en la bandeja de entrada del participante.",
  interventions__interventions_check_erp_row_description:
    "El indicador de apertura del registro se comprueba a la hora seleccionada. Si este registro no se ha abierto a la hora seleccionada, se envía el correo electrónico de intervención, que se puede encontrar en la bandeja de entrada del correo electrónico del participante.",
  interventions__interventions_check_mail_description:
    "El indicador de apertura del correo electrónico se comprueba a la hora seleccionada. Si este correo electrónico no se ha abierto, se envía el correo electrónico de intervención y se puede encontrar en la bandeja de entrada del correo electrónico del participante.",
  interventions__interventions_check_runtime_survey_description:
    "La marcación de la opción de respuesta se comprueba una vez cerrado el evento. Si la selección definida de la opción de respuesta es correcta, se envía el correo electrónico de intervención, que puede encontrarse en la bandeja de entrada del correo electrónico del participante.",
  interventions__interventions_create_modal_description:
    "Introduzca un título, una hora y una condición de activación para la nueva intervención. Una vez creada, puede editar el correo electrónico de la intervención.",
  interventions__interventions_create_modal_description_event:
    "Introduzca un título para la nueva intervención. Una vez creada, puede editar el correo electrónico de la intervención.",
  interventions__interventions_create_modal_title_file: "Crear intervención de archivos",
  interventions__interventions_create_modal_title_erp: "Crear intervención de registro",
  interventions__interventions_create_modal_title_spreadsheet: "Crear intervención en celdas",
  interventions__interventions_create_modal_title_notes: "Crear intervención en notas",
  interventions__interventions_create_modal_title_text_document: "Crear intervención en documento de texto",
  interventions__interventions_create_modal_title_mail: "Crear intervención en correo electrónico",
  interventions__interventions_create_modal_title_survey_event: "Crear intervención en el evento",
  interventions__interventions_create_modal_title_survey_event_selected_label: "Opción de respuesta seleccionada",
  interventions__interventions_create_modal_title_survey_event_not_selected_label:
    "Opción de respuesta no seleccionada",
  interventions__interventions_create_modal_title: "Título de la intervención",
  interventions__interventions_create_modal_time_hint:
    "Seleccione el tiempo dentro del periodo de tramitación de este escenario ({{durationInMinutes}} min) para esta intervención. (Especifique un número entero)",
  interventions__interventions_create_modal_time_hint_on_email_attachement:
    "Seleccione el tiempo entre la disponibilidad del archivo ({{emailReceptionInSeconds}} seg) y el periodo de tramitación de este escenario ({{durationInMinutes}} min) para esta intervención. (Especifíquelo como un número entero)",
  interventions__interventions_create_modal_time_hint_on_email_attachement_error:
    "La hora es antes de la disponibilidad del archivo",
  interventions__interventions_create_modal_time_hint_email_future_mail:
    "Seleccione el tiempo entre la disponibilidad del correo electrónico ({{emailReceptionInMinutes}} min) y el periodo de tramitación de este escenario ({{durationInMinutes}} min) para esta intervención. (Especifique un número entero)",
  interventions__interventions_create_modal_time_hint_email:
    "Seleccione el tiempo dentro del periodo de tramitación de este escenario ({{durationInMinutes}} min) para esta intervención. (Especifique un número entero)",
  interventions__interventions_create_modal_confirm_button: "Crear y editar el correo electrónico de intervención",
  interventions__interventions_create_modal_new_mail_label: "Crear un nuevo correo electrónico de intervención",
  interventions__interventions_create_modal_new_mail_description:
    "Para crear un nuevo correo electrónico, rellene los datos obligatorios. Puede editar esta información en cualquier momento:",
  interventions__interventions_erp_datasets_table_primary_key: "Número de pedido (clave primaria)",
  interventions__interventions_erp_number_ac: "No.",
  interventions__interventions_choose_textdocument_intervention_type: "Seleccione el tipo de intervención",
  interventions__interventions_choose_textdocument_intervention_type_file_opening: "Abrir documento de texto",
  interventions__interventions_choose_textdocument_intervention_type_file_opening_description:
    "Seleccione el tipo de ayuda si el participante no consulta este documento de texto.",
  interventions__interventions_choose_textdocument_intervention_type_content: "Contenido del documento de texto",
  interventions__interventions_choose_textdocument_intervention_type_content_description:
    "Seleccione el tipo de ayuda si este documento de texto no contiene determinados contenidos.",

  // Viewer Tools
  viewer_tool_image: "Visualizador de imágenes",
  viewer_tool_pdf: "Visualizador de PDF",
  viewer_tool_video: "Player de vídeo",
  viewer_tool_spreadsheet: "Hoja de cálculo",
  viewer_tool_text: "Tratamiento de textos",

  //Viewer tools preposition
  viewer_tool_preposition_m: "En",
  viewer_tool_preposition_n: "En",

  // User Management
  user_management__filter_label_management: "Administración de usuarios",
  user_management__filter_label_archive: "Archivar",
  user_management__filter_label_finalize: "Sellar",
  user_management__filter_label_r_scripts_short: "R-scripts",
  user_management__filter_label_r_scripts: "Gestión de R-scripts",
  user_management__filter_header: "Derechos globales",
  user_management__filter_search_placeholder: "Búsqueda por usuario u organización...",
  user_management__table_header_username: "Nombre de usuario",
  user_management__table_header_salutation: "Título",
  user_management__table_header_e_mail: "Dirección de correo electrónico",
  user_management__table_header_organisation: "Organización",
  user_management__table_header_rights: "Derechos globales",
  user_management__missing_claims: "Falta de derechos para el recurso solicitado",
  user_management__user_information_label: "Información para el usuario",
  user_management__edit_user_claims_manage: "Este usuario puede asignar derechos globales.",
  user_management__edit_user_claims_manage_tooltip:
    "Derechos de administración de usuarios sólo pueden ser eliminados por otros usuarios.",
  user_management__edit_user_claims_archive:
    "Los módulos del proyecto y los elementos del escenario pueden ser archivados por este usuario.",
  user_management__edit_user_claims_finalize:
    "Los módulos de proyecto y los elementos del escenario puede ser sellados por este usuario.",
  user_management__edit_user_claims_r_scripts: "Este usuario puede crear y editar R-scripts.",

  // Rating
  rating__rating__header_label: "Clasificación - {{title}}",
  rating__rating__header_back_button: "Resumen de evaluación",
  rating__rating__placeholder_headline: "No hay archivos disponibles",
  rating__rating__placeholder_text:
    "Este módulo del proyecto aún no ha sido completado por los participantes seleccionados. Por lo tanto, no es posible realizar una evaluación.",
  rating__rating__action_dropdown_label: "Acción tras la confirmación",
  rating__rating__action_dropdown_tooltip_text:
    "Seleccione si desea saltar al siguiente elemento o al siguiente participante tras la confirmación.",
  rating__rating__action_button_tooltip: "Ninguna selección",
  rating__rating__action_no_label: "Ningún",
  rating__rating__action_next_attendee_label: "Próximos participantes",
  rating__rating__action_next_item_label: "Próximo elemento",
  rating__rating__action_next_question_label: "Próxima pregunta",
  rating__rating__rating_score: "Puntos concedidos:",
  rating__rating__rating_global_score: "Total de puntos concedidos:",
  rating__rating__rating_global_score_automatic: "Puntuación otorgada automáticamente:",
  rating__rating__rating_global_achieved_score: "Total de puntos obtenidos:",
  rating__rating__manual_scoring_required: "Evaluación manual necesaria",
  rating__rating__scoring: "{{score}} de {{maxScore}} puntos",
  rating__rating__action_button_finish_scoring: "Completar puntuación",
  rating__rating__action_button_finish_scoring_finalized: "Puntuación completada",
  rating__rating__action_button_finish_scoring_description:
    "Esto determina el resultado final de esta encuesta. Ya no podrá realizar ningún ajuste en las puntuaciones finales y la calificación se dará por finalizada para todos los calificadores invitados.",
  rating__rating__action_button_finish_scoring_question: "¿Quiere completar la puntuación ahora?",
  rating__rating__right_side_title_table_of_contents: "Evaluado en %",
  rating__rating__automatic_rating: "automatizado",
  rating__rating__manual_rating: "manual",
  rating__rating__trailing_percent: "%",

  // Rating Questionnaire Question
  rating_questionnaire_question__question_scoring_label: "Promedio global",

  // Rating Questionnaire Answer
  rating_questionnaire_answer__automatic_rating_text_label: "Opción de respuesta",

  // Rating Scenario
  rating_scenario__scoring_label: "Puntuación obtendia",
  rating_scenario__main_dimensions_label: "Dimensiones principales",
  rating_scenario__dimensions_label: "Dimensiones",
  rating_scenario__items_label: "Elementos",
  rating_scenario__placeholder_headline: "No hay datos disponibles",
  rating_scenario__placeholder_text:
    "No se ha encontrado ningún escenario. Por lo tanto, no es posible realizar una evaluación.",
  rating_scenario__snapshot_placeholder_description:
    "Este módulo del proyecto aún no ha sido completado por los participantes seleccionados. Por lo tanto, no es posible realizar una evaluación.",

  // Rating
  rating__finalize_dialog_text: "¿Desea finalizar la puntuación? Después ya no es posible puntuar.",
  rating__subheader_search_placeholder: "Introduzca el término de búsqueda...",
  rating__filter_title: "Encuestas",
  rating__criterion_label: "Criterio de evaluación",
  rating__scoring_analytic_title: "Evaluación analítica",
  rating__scoring_holistic_title: "Evaluación holística",
  rating__scoring_none_title: "Sin clasificación",
  rating__scoring_title: "Evaluación",
  rating__freetext_answer_label: "Respuesta de texto libre del participante",
  rating__automatic_rating_label: "Evaluación automatizada",
  rating__automatic_rating_description:
    "La evaluación de este elemento está automatizada. Se crea una regla automatizada del contenido a evaluar para todos los criterios de evaluación.",
  rating__automatic_rating_description_questionnaire:
    "La evaluación de esta pregunta está automatizada. Se crea una regla automatizada del contenido a evaluar para todas las opciones de respuesta.",
  rating__manual_rating_label: "Evaluación manual",
  rating__manual_rating_description:
    "La evaluación de este elemento se realiza manualmente. Se proporciona una descripción clara del contenido a evaluar para todos los criterios de evaluación.",
  rating__manual_rating_description_questionnaire:
    "La evaluación de esta pregunta se realiza manualmente. Para todos los criteros de evaluación, se crea una descripción clara del contenido a evaluar.",
  rating__no_criterion_title: "¿Ningún criterio de evaluación cumplido?",
  rating__no_criterion_title_readonly: "Ningún criterio de evaluación cumplido",
  rating__no_criterion_description:
    "Si el participante no ha cumplido ninguno de los criterios de evaluación, concédale 0 puntos.",
  rating__no_criterion_description_readonly: "El participante no ha cumplido ninguno de los criterios de evaluación.",
  rating__scoring_unit: "Puntos",
  rating__no_score_button: "0 puntos concedido",
  rating__computerrater_radio_label: "Evaluador informático",
  rating__invite_title: "Invitar a evaluadores",
  rating__invite_description:
    "Puede invitar a todos los evaluadores juntos. Para ello, introduzca separado por punto y coma todas las direcciones de correo electrónico deseadas.",
  rating__invite_emails_title: "Enviar invitaciones de evaluación a las siguientes direcciones de correo electrónico:",
  rating__chart_title: "Invitar a evaluadores",
  rating__participant: "Participante",
  rating__participant_index: "Número de referencia",
  rating__final_score_available: "Resultado final disponible",
  rating__final_score_project_modules_tooltip: "Evaluado finalmente / número de módulos de Proyecto evaluables",
  rating__final_score_set: "Establecer el resultado final",
  rating__final_score_set_not_possible: "No se puede establecer el resultado final porque faltan datos.",
  rating__final_score_set_alt: "Evaluar finalmente",
  rating__final_score_disabled:
    "La invitación a evaluar debe completarse antes de poder establecer el resultado final.",
  rating__completed_label: "{{count}} de {{totalCount}} evaluaciones completadas",
  rating__finalized_label: "{{count}} de {{totalCount}} participantes evaluados completamente",
  rating__finalized_label_short: "{{count}} de {{totalCount}}",
  rating__evaluation_participation_title: "Participación en la evaluación",
  rating__evaluation_participation_score_label: "({{finished}} de {{total}})",
  rating__raters_count: "{{count}} de {{totalCount}} evaluadores",
  rating__total_score_achieved: "Total de puntos obtenidos",
  rating__average_score_achieved: "Promedia global",
  rating__not_possible: "Evaluación no posible",
  rating__partly_not_possible: "Evaluación solo parcialmente posible",
  rating__not_possible_tooltip:
    "Como no se dispone de datos sobre el participante, no es posible realizar una evaluación.",
  rating__partly_not_possible_tooltip:
    "Dado que se dispone de datos incompletos sobre el participante, no es posible realizar una evaluación de todos los módulos del proyecto.",
  rating__action_button_not_possible: "Evaluación no posible",
  rating__document_opened: "{{name}} fue abierto",
  rating__document_reference_opened: "{{name}} se abrió en el libro de referencia",
  rating__document_erp_components_for_products:
    "Asignación de componentes (componente {{componentId}}, producto {{productId}})",
  rating__feature_usage: "{{featureName}} en {{toolName}} fue utilizado",
  rating__tool_usage: "{{toolName}} fue utilizado",
  rating__input_in_file: "{{input}} en {{fileName}} disponible",
  rating__input_in_spreadsheet: "{{input}} en {{fileName}}({{size}}) disponible",
  rating__r_script_used: "{{rScriptName}} desencadenado",
  rating__raters_label: "Evaluadores",
  rating__ongoing_count: "Evaluación abierta",
  rating__finished_count: "Evaluación finalizada",
  rating__holistic_description:
    "El evaluador se decide por sólo un criterio de evaluación. El criterio seleccionado da la puntuación total para ese elemento",
  rating__invite_raters_warning:
    "¡ATENCIÓN! Recuerde que sólo podrá establecer el resultado final y completar la calificación una vez que haya completado la evaluación de la calificación.",
  rating__table_column_completed: "Módulos del Proyecto finalmente evaluado",
  rating__labeled_count: "{{label}} ({{countFrom}}/{{countTo}})",
  rating__right_side_title_table_of_contents: "Puntos obtenidos en %",
  rating__average_score_label: "Promedio global:",

  // Rater Rating
  rater_rating__placeholder_title: "No se dispone de encuestas para la evaluación",
  rater_rating__placeholder_description: "En cuanto haya una encuesta disponible, recibirá un correo electrónico.",
  rater_rating__status_survey_in_progress: "Proyecto en curso…",
  rater_rating__status_rating_in_progress: "Calificación en curso…",
  rater_rating__status_rating_completed: "Completado",
  rater_rating__status_rating_progress_tooltip: "Progreso de su evaluación",
  rater_rating__info_box_title: "Información de la encuesta",
  rater_rating__survey_progress_manual: "Manual (Sincrónico)",
  rater_rating__participant_table_column_full_rated: "Módulos de Proyecto completamente evaluados ({{count}})",
  rater_rating__action_button_finish_rating: "Finalizar evaluación",
  rater_rating__action_button_finish_rating_tooltip: "Progreso de la evaluación",
  rater_rating__action_button_finish_rating_description:
    "Esto determinará el resultado final de su valoración para esta encuesta. Ya no podrá realizar ningún ajuste en las valoraciones del participante.",
  rater_rating__action_button_finish_rating_question: "¿Desea finalizar la evaluación ahora?",

  // Rater Rating Details
  rater_rating_details__header_label: "Resumen de evaluación",
  rater_rating_details__header_navigation_label: "Selección de encuestas",
  rater_rating_details__title: "Título",
  rater_rating_details__description: "Descripción",
  rater_rating_details__settings: "Ajustes de aplicación",
  rater_rating_details__settings_conditions_of_participation: "Condición de participación",
  rater_rating_details__settings_survey_procedure: "Procedimiento de encuesta",
  rater_rating_details__rating_list: "Evaluación",
  rater_rating_details__survey_in_progress: "Ejecución del proyecto en curso",
  rater_rating_details__survey_finished: " Ejecución del proyecto completada",
  rater_rating_details__survey_authentication_anonymous_only: "Sólo anónimo",
  rater_rating_details__survey_authentication_registered_only: "Sólo registrado",
  rater_rating_details__survey_authentication_anonymous_allowed: "Anónimo permitido",
  rater_rating_details__project_modules: "Módulos de proyecto",
  rater_rating_details__project_module: "Módulo de proyecto",
  rater_rating_details__project_module_max_points: "Puntuación máxima",
  rater_rating_details__project_module_rated_participants: "Participantes completamente evaluados ({{count}})",
  rater_rating_details__project_module_no_rating: "Sin evaluación",

  // Reporting
  reporting_overview_subheader_title: "Informe",
  reporting_overview_project_modules: "Módulos de proyecto ({{count}})",
  reporting_overview_detail_view_results: "Resultados",
  reporting_overview_detail_view_results_button: "Visualizar resultados",
  reporting_overview_detail_view_activity_and_toolusage: "Actividad y uso de herramientas",
  reporting_overview_detail_view_activity_and_toolusage_description:
    "Representación gráfica de la actividad o el uso de herramientas durante la realización de este escenario.",
  reporting_overview_detail_view_final_score: "Puntuación final",
  reporting_overview_detail_view_final_score_description:
    "La puntuación final se establece en función de las puntuaciones disponibles de los escenarios o cuestionarios de un proyecto y determina la calificación obtenida.",
  reporting_overview_detail_view_participants_list: "Lista de participantes ({{count}})",
  reporting_overview_maximum_points: "Número máximo de puntos a obtener",
  reporting_overview_average_points: "Puntuación media obtenida",
  reporting_overview_reached_points: "Puntuación obtenida",
  reporting_overview_final_score_not_set: "Puntuación final sin determinar",
  reporting_participant_overview_header_messages: "Mensajes ({{count}})",
  reporting_participant_overview_total_points_label: "Puntuación total:",
  reporting_participant_overview_total_points: "{{points}} de {{maxPoints}} puntos obtenidos",
  reporting_participant_overview_final_score_count: "{{count}} de {{total}} resultados finales determinados",
  reporting_participant_overview_final_score_tooltip: "Puntuación final disponible",
  reporting_result__show_results_for_all_participants: "Mostrar resultados - Todos los participantes ({{count}})",
  reporting_result__events_count: "Resultados ({{count}})",
  reporting_result__breadcrumb_project_label: "Proyecto:",
  reporting_result__breadcrumb_survey_label: "Encuesta:",
  reporting_result__breadcrumb_module_label: "Módulo de proyecto:",
  reporting_participant_document_overview_table_filter: "{{filterBy}} ({{count}})",
  reporting_result__chat_messages_count: "Mensajes ({{count}})",
  reporting_result__open_last_scenario_state: "Consultar el último estado",
  reporting_result__finalscore_label: "Puntuación final",
  reporting_result__finalscore_description:
    "La puntuación final se establece en función de las puntuaciones disponibles de los escenarios o cuestionarios de un proyecto y determina la calificación obtenida.",
  reporting_result__max_finalscore_label: "Número máximo de puntos a obtener",
  reporting_result__average_finalscore_label: "Promedio de la encuesta",
  reporting_result__participant_finalscore_label: "Puntuación de este participante",
  reporting_result__scenario_progress_label: "Progreso del escenario",
  reporting_result__opened_relevant_documents_label: "documentos relevantes abiertos ({{count}})",
  reporting_result__words_in_completion_mail_label: "Palabras en el correo de cierre",
  reporting_result__words_in_completion_mail_total: "{{count}} palabras en el correo de cierre",
  reporting_result__result_label: "Resultados",
  reporting_result__documents_overview_label: "Resumen de documentos",
  reporting_result__documents_overview_description:
    "Resumen de los documentos abiertos y no abiertos por el participante en este escenario.",
  reporting_result__view_button_label: "Mostrar",
  reporting_result__activity_and_tool_usage_label: "Actividad y uso de herramientas",
  reporting_result__activity_and_tool_usage_description:
    "Representación gráfica de la actividad o el uso de herramientas durante la realización de este escenario.",
  reporting_result__finalscore_count_label: "Puntuación obtenida",
  reporting_result__finalscore_count: "{{finalScore}} de {{finalScoreMax}} puntos obtenidos",
  reporting_result__finalscore_not_set: "Puntuación final no determinada",
  reporting_result__finalscore_edit_tooltip: "Editar puntuación final",
  reporting_result__events_count_label: "Resultados ({{count}})",
  reporting_result__participant_overview_back_label: "Resumen ({{name}})",
  reporting_result__scenario_state_in_progress_label: "en curso...",
  reporting_result__scenario_state_completed_label: "completado",
  reporting_result__scenario_state_scoring_completed_label: "Puntuación final disponible",

  // R Scripts
  r_scripts__header_label: "R-scripts",
  r_scripts__list_title: "R-scripts disponibles",
  r_scripts__list_placeholder_title: "Ningún R-script creado",
  r_scripts__list_placeholder_text: "Por favor, primero crea un R-script.",
  r_scripts__button_create: "Crear R-script",
  r_scripts__title_placeholder: "R-script desconocido",
  r_scripts__description_placeholder: "Introduzca aquí una descripción",
  r_scripts__details_script_label: "Script",
  r_scripts__details_version_label: "Versión",
  r_scripts__details_hash_label: "Git-Commit-Hash",
  r_scripts__details_hash_label_placeholder: "Por favor, inserte aquí...",
  r_scripts__details_empty_header_label: "Ningún R-script seleccionado",
  r_scripts__details_empty_heading: "Ningún R-script seleccionado",
  r_scripts__details_empty_text: "Por favor, seleccione un R-script a la izquierda.",
  r_scripts__details_empty_script_placeholder: "Copie aquí el contenido del R-script...",

  // Reporting
  reporting__header_label: "Informe",
  reporting__carousel_header_scenario: "{{name}} (escenario)",
  reporting__carousel_header_questionnaire: "{{name}} (encuesta)",
  reporting__survey_average_score: "Promedio de la encuesta: {{score}} puntos",

  // Reporting - Scoring
  reporting_scoring__overlay_title_default: "Mostrar puntuación final",
  reporting_scoring__overlay_title_participant: "Mostrar puntuación final - {{name}}",
  reporting_scoring__overlay_title_all: "Mostrar puntuación final - Todos los participantes ({{count}})",
  reporting_scoring__overlay_metadata_project: "Proyecto:",
  reporting_scoring__overlay_metadata_survey: "Encuesta:",
  reporting_scoring__overlay_metadata_project_module: "Módulo de proyecto:",
  reporting_scoring__overlay_mean_tooltip: "Promedio general: {{mean}} puntos",
  reporting_scoring__scenario_details_header: "Todos los participantes ({{count}})",
  reporting_scoring__scenario_details_overview_title: "Promedio general",

  // Chat
  chat__scenario_snapshot_title: "Historial de chat",

  // Activity and ToolUsage
  activity_tool_usage__header: "Actividad y uso de herramientas - {{participantName}}",
  activity_tool_usage__header_all: "Actividad y uso de herramientas - Todos los participantes ({{participantCount}})",
  activity_tool_usage__subheader_tool_usage: "Uso de herramientas",
  activity_tool_usage__subheader_activity: "Actividad",
  activity_tool_usage__required_documents: "documentos requeridos",
  activity_tool_usage__irrelevant_documents: "documentos irrelevantes",
  activity_tool_usage__inactivity: "Inactividad",
  activity_tool_usage__diagram_title_total_time: "Duración total (gráfico de barras)",
  activity_tool_usage__diagram_title_impulse: "Desarrollo temporal (diagrama de impulsos)",
  activity_tool_usage__diagram_title_line: "Desarrollo temporal (diagrama de líneas)",
  activity_tool_usage__diagram_title_total_time_tooltip:
    "Resumen mediante un gráfico de barras de los puntos temporales de los participantes.",
  activity_tool_usage__diagram_title_total_time_all_participants_tooltip:
    "Resumen basado en un diagrama de barras de los participantes.",
  activity_tool_usage__diagram_title_impulse_tooltip:
    "Resumen basado en un diagrama de impulsos del participante en momentos concretos.",
  activity_tool_usage__diagram_title_line_tooltip: "Resumen basado en un gráfico lineal de los participantes.",
  activity_tool_usage__diagram_footer_resumption_notice:
    "El escenario fue retomado por el participante en los siguientes momentos:",
  activity_tool_usage__tooltip_participants: "Número de participantes: {{participantCount}}",

  //Document overview
  document_overview__erp_row: "(Conjunto de datos)",
  document_overview__title: "Resumen de documentos - {{participantName}}",
  document_overview__opened_table_title: "Ya abierto",
  document_overview__not_opened_table_title: "Sin abrir",
  document_overview__opened_at: "Momento de la apertura"
}
// eslint:disable-next-line:max-file-line-count
