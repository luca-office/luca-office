import {LucaI18nLangShared} from "../../luca-i18n-lang"

/* eslint-disable max-lines */
// Do not use nested keys to provide full type safety for
// translation keys!

// syntax: <module/area>__<function>__component, words separated by _

export const translations: LucaI18nLangShared = {
  // Buttons
  ok: "Ok",
  cancel: "Cancelar",
  copy: "Copiar",
  accept_button: "Entendido",
  close_button: "Cerrar",
  continue_button: "Seguir",
  create_button: "Crear",
  update_button: "Actualizar",
  publish_button: "Publicar",
  copy_button: "Crear copia",
  cancel_button: "Cancelar",
  login_button: "Iniciar sesión",
  signup_button: "Registrarse",
  logout_button: "Cerrar sesión",
  confirm_button: "Aplicar",
  edit_button: "Editar",
  invite_button: "Invitar",
  show_button: "Ver",
  delete_button: "Borrar",
  archive_button: "Archivar",
  back_button: "Volver",
  add_button: "Añadir",
  remove_button: "Eliminar",

  // Common
  common_to: "Ir a",
  common_to_masculinum: "A",
  common_of: "de",
  common__x_of_y: "{{x}} de {{y}}",
  common_number: "{{number, number}}",
  common_number_en: "{{number, number_en}}",

  // Percentage
  percentage: "{{percentage, number}}%",

  // Password
  password__reset: "¿Ha olvidado su contraseña?",

  // Scenario Settings
  scenario_setting__header_label: "Ajustes específicos del escenario",
  scenario_setting__relevance_label: "Relevancia",
  scenario_setting__intervention_label: "Intervención",
  scenario_setting__intervention_placeholder: "Ninguna intervención disponible",
  scenario_setting__intervention_count_single: "{{interventionsCount}} Intervención disponible",
  scenario_setting__intervention_count_multiple: "{{interventionsCount} Intervenciones disponibles",

  // Clipboard
  clipboard__copy: "Copiar al portapapeles",
  clipboard__copy_toast: "Texto copiado al portapapeles.",
  clipboard__copy_all: "Copiar todos los datos al portapapeles",

  // Tests
  placeholder: "Placeholder",

  // WS
  ws__reconnect_error: "Hay un problema con la conexión.",

  // PDF Viewer
  pdf_viewer__error: "No se ha podido cargar el PDF",
  pdf_viewer__no_data: "No se ha encontrado ningún PDF",

  // Events
  events__title: "Evento",

  // Reference Books
  reference_book__title_placeholder: "Ningún capítulo o artículo seleccionado",
  reference_book__content_placeholder: "Elija un capítulo o artículo en el lado izquierdo.",
  reference_books__placeholder: "Sin contenido",
  reference_books__text: "Bloque de texto",
  reference_books__placeholder_text: "Bloque de texto sin contenido",

  // Files and Directories
  files_and_directories__tree__no_content: "Ningún contenido disponible",
  files_and_directories__detail__empty__title: "No se ha realizado ninguna selección",
  files_and_directories__detail__empty__heading: "No se ha realizado ninguna selección",
  files_and_directories__detail__empty__text: "Seleccione una carpeta o archivo a la izquierda.",
  files_and_directories__email__upload__title: "Seleccionar anexo de carpeta y archivos",
  files_and_directories__email__upload__text: "Añadir este archivo como anexo",
  files_and_directories__email__upload__tooltip: "Añade diversos archivos como anexos a los correos electrónicos.",

  // Salutation
  mr: "Señor",
  mrs: "Señora",
  non_binary: "Diverso",

  // Spreadsheet
  spreadsheet_editor__save_button: "Guardar",
  spreadsheet_editor__error_alert_text:
    "Recuerde introducir los números en formato inglés (punto en lugar de coma, por ejemplo, 1.75 en lugar de 1,75).\n" +
    "Los nombres de las fórmulas también deben introducirse en inglés. Ejemplos:\n",

  // Questionnaire
  questionnaire__single_choice: "Elección única",
  questionnaire__multiple_choice: "Elección múltiple",
  questionnaire__free_text: "Pregunta de texto libre",
  questionnaire__free_text_option: "Respuesta de texto libre",
  questionnaire__score: "Puntuación",
  questionnaire__single_choice_title: "Indique sólo una respuesta:",
  questionnaire__multiple_choice_title: "Indique al menos una respuesta:",
  questionnaire__free_text_title: "Respuesta de texto libre",
  questionnaire__additional_free_text_answer: "Respuesta adicional de texto libre",
  questionnaire__additional_free_text_answer_disabled: "La opción de texto libre sólo está disponible sin evaluación",
  questionnaire__additional_free_text_answer_already_present: "Respuesta de texto libre ya disponible",
  questionnaire__completed_answers: "{{finishedCount}} de {{totalCount}} preguntas contestadas",

  // ERP
  erp__title: "ERP",
  erp__title_full: "Planificación de recursos empresariales",
  erp__navigation_label_user_management: "Administración de usuarios",
  erp__navigation_label_office: "Oficina",
  erp__navigation_label_phone_integration: "Integración del teléfono",
  erp__navigation_label_appointment_calendar: "Agenda",
  erp__navigation_label_occupancy_of_space: "Ocupación de las habitaciones",
  erp__navigation_label_application_spanning_components: "Componentes para varias aplicaciones",
  erp__navigation_label_audit_management: "Gestión de auditorías",
  erp__navigation_label_e_document: "eDocument",
  erp__navigation_label_logistics: "Logística",
  erp__navigation_label_materials_administration: "Gestión de materiales",
  erp__navigation_label_suppliers: "Proveedores",
  erp__navigation_label_stock_take: "Inventario",
  erp__navigation_label_stock: "Almacén",
  erp__navigation_label_external_trade: "Comercio exterior/aduanas",
  erp__navigation_label_sales: "Ventas",
  erp__navigation_label_core_data: "Datos principales",
  erp__navigation_label_components: "Componentes",
  erp__navigation_label_components_for_products: "Asignación de componentes",
  erp__navigation_label_customers: "Clientes",
  erp__navigation_label_reseller: "Socio comercial",
  erp__navigation_label_products: "Productos",
  erp__navigation_label_shipping: "Envío y transporte",
  erp__navigation_label_billing: "Facturación",
  erp__navigation_label_orders: "Pedidos",
  erp__navigation_label_order_items: "Artículo del pedido",
  erp__navigation_label_invoices: "Facturas",
  erp__navigation_label_production: "Producción",
  erp__navigation_label_sales_planning: "Planificación de ventas",
  erp__navigation_label_production_planning: "Planificación de la producción",
  erp__navigation_label_requirements_planning: "Planificación de la demanda",
  erp__navigation_label_product_cost_planning: "Planificación de costes de productos",
  erp__navigation_label_customer_service: "Atención al cliente",
  erp__navigation_label_quality_management: "Gestión de la calidad",
  erp__navigation_label_logistics_controlling: "Controlling logístico",
  erp__navigation_label_core_functions: "Funciones centrales",
  erp__navigation_label_accounting: "Contabilidad",
  erp__navigation_label_finance: "Finanzas",
  erp__navigation_label_controlling: "Gestión",
  erp__navigation_label_strategic_enterprise_management: "Gestión estratégica empresarial",
  erp__navigation_label_property_management: "Gestión inmobiliaria",
  erp__navigation_label_staff: "Personal",
  erp__navigation_label_staff_table: "Personal",
  erp__navigation_label_staff_time_management: "Gestión del tiempo del personal",
  erp__navigation_label_payroll: "Nómina",
  erp__navigation_label_training_needs_management: "Gestión de las necesidades de formación",
  erp__navigation_label_information_system: "Sistema de información",
  erp__navigation_label_info_systems: "Sistemas de información",
  erp__navigation_label_financial_analytics: "Financial Analytics",
  erp__navigation_label_product_lifecycle_analytics: "Product Lifecycle Analytics",
  erp__navigation_label_tools: "Herramientas",
  erp__navigation_label_administration: "Administración",
  erp__navigation_label_web_client_ui_framework: "WebClient-UI-Framework",
  erp__navigation_label_enterprise_search: "Búsqueda empresarial",
  erp__navigation_import_excel_file: "Importar datos",
  erp__navigation_export_excel_file: "Exportar datos (Descargas)",
  erp__table_search_placeholder: "Busca en esta tabla…",

  // ERP-Table
  erp__employment_mode_label_assistance: "Auxiliar",
  erp__employment_mode_label_full_time: "Jornada completa",
  erp__employment_mode_label_part_time: "Media jornada",
  erp__employment_mode_label_student: "Estudiante",
  erp__family_status_label_divorced: "Divorciado",
  erp__family_status_label_married: "Casado",
  erp__family_status_label_single: "Soltero",
  erp__payment_status_label_paid: "Pagado",
  erp__payment_status_label_unpaid: "Pendiente",
  erp__delivery_status_label_completed: "Completado",
  erp__delivery_status_label_in_process: "En curso",
  erp__salutation_label_mr: "Señor",
  erp__salutation_label_mrs: "Señora",
  erp__salutation_label_non_binary: "Diverso",
  erp__no_table: "Sin tabla",
  erp__no_table_selected: "Ninguna mesa seleccionada",
  erp__no_table_select_hint: "Seleccione una tabla",

  erp__table_label_id: "Id",
  erp__table_label_component_id: "Componente no.",
  erp__table_label_sample_company_id: "No. de empresa",
  erp__table_label_salutation: "Título",
  erp__table_label_first_name: "Nombre",
  erp__table_label_last_name: "Apellido",
  erp__table_label_address_line: "Dirección",
  erp__table_label_postal_code: "Código postal",
  erp__table_label_city: "Ciudad",
  erp__table_label_country: "País",
  erp__table_label_email: "Correo electrónico",
  erp__table_label_phone: "Número de teléfono",
  erp__table_label_note: "Notas",
  erp__table_label_order_id: "No. de pedido",
  erp__table_label_order_item_id: "No. de artículo del pedido",
  erp__table_label_name: "Nombre",
  erp__table_label_company: "Empresa",
  erp__table_label_employee_id: "Personal no.",
  erp__table_label_invoice_id: "No. de factura.",
  erp__table_label_product_id: "No. de producto.",
  erp__table_label_order_product_id: "No. de artículo",
  erp__table_label_supplier_id: "No. de proveedor",
  erp__table_label_total_net: "Precio total neto",
  erp__table_label_unit: "Unidad",
  erp__table_label_binary_file_id: "Anexo",
  erp__table_label_stock_cost_per_unit: "Costes de almacenamiento por contenedor",
  erp__table_label_stock_cost_total: "Costes de almacenamiento",
  erp__table_label_pack_size: "Cantidad por unidad de producto",
  erp__table_label_available_stock: "Stock",
  erp__table_label_quantity: "Cantidad",
  erp__table_label_quantity_per_product: "Número de componentes por unidad de producto",
  erp__table_label_value_string: "Texto",
  erp__table_label_value_number: "Número",
  erp__table_label_value_currency: "Euro",
  erp__table_label_value_binary: "Archivo",
  erp__table_label_value_email: "Correo electrónico",
  erp__table_label_value_salutation: "Título",
  erp__table_label_value_date: "Fecha",
  erp__table_label_value_employment: "Relación laboral",
  erp__table_label_value_family_status: "Estado civil",
  erp__table_label_value_payment_status: "Estado de pago",
  erp__table_label_value_delivery_status: "Estado de entrega",
  erp__table_label_value_postal_code: "Código postal",
  erp__table_label_value_phone: "Número de teléfono",
  erp__table_label_unknown: "Tipo de tabla desconocido",

  erp__show_selected_only: "Mostrar sólo marcadores",
  erp__no_cell_selected: "Ninguna celda seleccionada",
  erp__no_data: "No hay datos disponibles",
  erp__no_data_create_or_import: "Cree conjuntos de datos por separado o importe las tablas de Excel que desee",
  erp__table_placeholder: "Esta tabla es sólo un fijador de posiciones y no puede ser editada.",
  erp__table_locked: "Esta tabla del banco de datos está bloqueada",

  erp__table_component_label_category: "Grupo de artículos",
  erp__table_component_label_purchasing_price: "Precio de compra",
  erp__table_component_label_margin: "Margen",

  erp__table_employee_label_department: "Departamento",
  erp__table_employee_label_job_title: "Función",
  erp__table_employee_label_employment_mode: "Tipo de empleo",
  erp__table_employee_label_employed_at: "Inicio del contrato",
  erp__table_employee_label_employment_ends_at: "Fin del contrato",
  erp__table_employee_label_site: "Ubicación de la planta",
  erp__table_employee_label_graduation: "Grado",
  erp__table_employee_label_further_education: "Formaciones",
  erp__table_employee_label_tax_class: "Categoría fiscal",
  erp__table_employee_label_family_status: "Estado civil",
  erp__table_employee_label_child_count: "Número de hijos",
  erp__table_employee_label_assessment: "Dimensionamiento",

  erp__table_invoice_label_invoice_date: "Fecha de la factura",
  erp__table_invoice_label_due_date: "Fecha de vencimiento",
  erp__table_invoice_label_payment_terms: "Condiciones de pago",
  erp__table_invoice_label_amount_paid: "Pagado",
  erp__table_invoice_label_payment_status: "Estado del pago",
  erp__table_invoice_label_reminder_fee: "Gasto de requirimiento",
  erp__table_invoice_label_default_charges: "Intereses de mora",
  erp__table_invoice_label_total_gross: "Precio total bruto",
  erp__table_invoice_label_tax_amount: "Recaudación",

  erp__table_order_label_cashback: "Descuento",
  erp__table_order_label_discount: "Rebaja",
  erp__table_order_label_delivery_charge: "Gastos de envío",
  erp__table_order_label_delivery_status: "Estado de entrega",
  erp__table_order_label_delivery_date: "Fecha de entrega",
  erp__table_order_label_customer_id: "No. de cliente",

  erp__table_product_label_net_price: "Precio base neto",
  erp__table_product_label_tax_rate: "Tasa del IVA",

  erp__table_cell_content: "Contenido de celda",

  erp__table_select_all: "Marcar todo",
  erp__table_deselect_all: "Eliminar marcadores",

  erp__table_primary_key: "Clave primaria",
  erp__table_primary_key_tooltip_text:
    "La clave primaria se utiliza para identificar un registro de forma única. Se genera automáticamente cuando se crea un registro.",
  erp__table_foreign_key: "Clave externa",
  erp__table_foreign_key_tooltip_text: "La clave externa se utiliza para vincular un registro de otra tabla.",
  erp__table_attachment_available: "Anexo disponible",
  erp__table_attachment_not_available: "No hay ningún anexo disponible",

  // ERP-Navigation
  erp__navigation_label_shipment: "Entregas",
  erp__navigation_label_company: "Empresa",

  erp__navigation_label_supplier: "Proveedores",
  erp__navigation_label_component: "Componentes",
  erp__navigation_label_employee: "Empleados",
  erp__navigation_label_product: "Productos",
  erp__navigation_label_order_item: "Artículo",
  erp__navigation_label_order: "Pedidos",
  erp__navigation_label_customer: "Clientes",
  erp__navigation_label_invoice: "Facturas",

  // ERP-Dataset
  erp_dataset__general: "Registro",
  erp_dataset__criterion_title: "ERP (Registro)",
  erp_dataset__open: "Abrir registro",
  erp_dataset__edit: "Editar registro",
  erp_dataset__delete: "Borrar registro",
  erp_dataset__primary_key: "Clave primaria",
  erp_dataset__foreign_key: "Clave externa",
  erp_dataset__navigate_to_dataset: "al registro",
  erp_dataset__copy_all: "Copiar datos principales al portapapeles",
  erp_dataset__file_upload_title: "Subir anexo",
  erp_dataset__primary_key_placeholder: "Generado automáticamente...",
  erp_dataset__create: "Crear un nuevo registro",
  erp_dataset__required_info: "Información obligatoria",

  // ERP
  erp__cell_header_Label: "Contenido de celda",
  erp__cell_short: "Celda(s)",
  erp__cell_add_button: "Crear fila (registro)",
  erp__navigation_hide_placeholders: "Ocultar fijador de posiciones",
  erp__navigation_label: "ERP",
  erp__cell_refresh_button: "Comprobar todo",
  erp__dialog_delete_dataset_title: "Borrar registro",
  erp__dialog_delete_dataset_description: "¿Realmente desea eliminar el registro? Esta operación no se puede revertir.",

  // ERP Excel Import
  erp_excel_import__modal_title: "Importar archivo Excel",
  erp_excel_import__modal_description:
    "También puede crear el ERP utilizando Excel e importarlo aquí. Para ello, descargue la plantilla y, a continuación, utilice la ventana de importación para importar las tablas de forma agrupada.",
  erp_excel_import__modal_warning:
    "¡Atención!: al importar una plantilla Excel, se perderán todos los datos anteriores del ERP.",
  erp_excel_import__modal_download: "Descargar plantilla Excel",
  erp_excel_import__modal_upload_title: "Carga",
  erp_excel_import__modal_upload_description: "Suba aquí la plantilla Excel revisada.",
  erp_excel_import__modal_upload_description_hint: "Puede añadirse después de una revisión.",
  erp_excel_import__modal_upload_error: "El archivo cargado es defectuoso",
  erp_excel_import__modal_upload_check: "El archivo está siendo comprobando...",
  erp_excel_import__modal_file_chip_error: "Archivo defectuoso",

  // ERP Accordion
  erp_accordion__component_label: "Componente no.",
  erp_accordion__component_additional_label: "{{count}} componentes",
  erp_accordion__customer_label: "No. de cliente",
  erp_accordion__customer_additional_label: "{{count}} clientes",
  erp_accordion__employee_label: "Empleado no.",
  erp_accordion__employee_additional_label: "{{count}} empleados",
  erp_accordion__invoice_label: "No. de factura",
  erp_accordion__invoice_additional_label: "{{count}} facturas",
  erp_accordion__order_label: "No. de pedido",
  erp_accordion__order_additional_label: "{{count}} pedidos",
  erp_accordion__order_item_label: "No. de artículo",
  erp_accordion__order_item_additional_label: "{{count}} artículos",
  erp_accordion__product_label: "No. de producto",
  erp_accordion__product_additional_label: "{{count}} productos",
  erp_accordion__supplier_label: "No. de proveedor",
  erp_accordion__supplier_additional_label: "{{count}} proveedores",
  erp_accordion__copy_all: "Copiar datos principales y claves externas al portapapeles",
  erp_accordion__component_for_product_label_simple: "Componente del producto",
  erp_accordion__component_for_product_label:
    " No. de componente {{componentId}} para el no. de producto {{productId}}",
  erp_accordion__component_for_product_additional_label: "{{count}} componentes para productos",

  // Binary Input
  binary_input__placeholder_label: "No disponible",
  binary_input__upload_title: "Subir archivo",

  // Coding Criterion
  coding_models__automated_item_input_value_preview_spreadsheet_title: "Documento (hoja de cálculo)",
  coding_models__automated_item_input_value_preview_spreadsheet_title_check_file: "comprobar contenido",
  coding_models__coding_item_deletion_fk_error:
    "El elemento ya se ha utilizado en una calificación y no se puede eliminar",
  coding_models__coding_dimension_deletion_fk_error:
    "La dimensión ya se utiliza en una calificación y no se puede eliminar",
  coding_models__coding_model_deletion_fk_error:
    "La instrucción de codificación ya se utiliza en una clasificación y no se puede eliminar",

  // Chat
  chat__title: "Mensajes",
  chat__unknown_title: "Desconocido",
  chat__group_title: "Mensaje de grupo ({{count}})",
  chat__supervisor_back: "Ver como participante",
  chat__supervisor: "Jefe de prueba",
  chat__participant: "Participante",
  chat__instruction: "Enviar mensaje a los participantes seleccionados ({{count}}):",
  chat__instruction_reporting_attendee: "Enviar mensaje a {{name}}:",
  chat__supervisor_unapproachable:
    "Tenga en cuenta que es posible que el gestor del proyecto no reciba su mensaje hasta que el proyecto haya sido procesado y no pueda responderle directamente.",
  chat__supervisor_unapproachable_text:
    "Tenga en cuenta que es posible que el supervisor del proyecto no reciba su mensaje hasta que el proyecto haya sido procesado y no pueda responderle directamente.",
  chat__error_notification: "El chat no funciona, inténtelo más tarde.",

  // E-Mail-Message Template
  email_message_template__template_label_salutation: "{Saludo}",
  email_message_template__template_label_first_name: "{Nombre}",
  email_message_template__template_label_last_name: "{Apellido}",
  email_message_template__template_label_formal_salutation: "{Saludo formal}",
  email_message_template__tooltip_salutation: "Señora/Señora/*",
  email_message_template__tooltip_first_name: "Nombre del participante",
  email_message_template__tooltip_last_name: "Apellido(s) del participante",
  email_message_template__tooltip_formal_salutation: "Estimado/Estimada/Estimad@",
  email_message_template__formal_greeting_mr: "Estimado",
  email_message_template__formal_greeting_mrs: "Estimada",
  email_message_template__formal_greeting_non_binary: "Estimad@",

  // Error
  error_entity_in_use: "La entidad ya está en uso y no se puede eliminar",
  error_entity_in_use_scenario_questionnaire_intervention:
    "Las intervenciones están asignadas al evento, por lo que no se puede eliminar.",
  error_reset_password_token: "El enlace de restablecimiento de contraseña que has utilizado es incorrecto.",
  error_reset_password_token_title: "Error al restablecer la contraseña"
}
