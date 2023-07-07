/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AuthenticationType {
  OnlyAnonymous = "OnlyAnonymous",
  OnlyRegistered = "OnlyRegistered",
  RegisteredOrAnonymous = "RegisteredOrAnonymous",
}

export enum AutomatedCodingItemRule {
  DocumentView = "DocumentView",
  FeatureUsage = "FeatureUsage",
  InputValue = "InputValue",
  RScript = "RScript",
  ToolUsage = "ToolUsage",
}

export enum DeliveryStatus {
  Completed = "Completed",
  InProcess = "InProcess",
}

export enum EmailDirectory {
  Draft = "Draft",
  Inbox = "Inbox",
  Sent = "Sent",
  Trash = "Trash",
}

export enum EmploymentMode {
  Assistance = "Assistance",
  FullTime = "FullTime",
  PartTime = "PartTime",
  Student = "Student",
}

export enum ErpTableType {
  Component = "Component",
  ComponentProduct = "ComponentProduct",
  Customer = "Customer",
  Employee = "Employee",
  Invoice = "Invoice",
  Order = "Order",
  OrderItem = "OrderItem",
  Product = "Product",
  Supplier = "Supplier",
}

export enum FamilyStatus {
  Divorced = "Divorced",
  Married = "Married",
  Single = "Single",
}

export enum FeatureType {
  AnswerEmail = "AnswerEmail",
  CopyToClipboard = "CopyToClipboard",
  FormulaUsage = "FormulaUsage",
  PasteFromClipboard = "PasteFromClipboard",
  Search = "Search",
}

export enum FileUsageType {
  Email = "Email",
  FileSystem = "FileSystem",
}

export enum InterventionType {
  EmailOpening = "EmailOpening",
  ErpRowOpening = "ErpRowOpening",
  FileOpening = "FileOpening",
  NotesContent = "NotesContent",
  RuntimeSurveyAnswerSelection = "RuntimeSurveyAnswerSelection",
  SpreadsheetCellContent = "SpreadsheetCellContent",
  TextDocumentContent = "TextDocumentContent",
}

export enum MimeType {
  ApplicationPdf = "ApplicationPdf",
  ImageGif = "ImageGif",
  ImageJpeg = "ImageJpeg",
  ImagePng = "ImagePng",
  ImageSvg = "ImageSvg",
  Spreadsheet = "Spreadsheet",
  TextHtml = "TextHtml",
  VideoMp4 = "VideoMp4",
}

export enum OfficeTool {
  Calculator = "Calculator",
  Chat = "Chat",
  EmailClient = "EmailClient",
  Erp = "Erp",
  FileBrowser = "FileBrowser",
  ImageViewer = "ImageViewer",
  Notes = "Notes",
  PdfViewer = "PdfViewer",
  ReferenceBookViewer = "ReferenceBookViewer",
  SpreadsheetEditor = "SpreadsheetEditor",
  TextEditor = "TextEditor",
  VideoPlayer = "VideoPlayer",
}

export enum PaymentStatus {
  Paid = "Paid",
  Unpaid = "Unpaid",
}

export enum ProjectModuleProgressType {
  Completed = "Completed",
  InProgress = "InProgress",
}

export enum ProjectModuleType {
  Questionnaire = "Questionnaire",
  Scenario = "Scenario",
}

export enum QuestionScoringType {
  Analytical = "Analytical",
  Holistic = "Holistic",
  None = "None",
}

export enum QuestionType {
  FreeText = "FreeText",
  MultipleChoice = "MultipleChoice",
  SingleChoice = "SingleChoice",
}

export enum QuestionnaireType {
  Global = "Global",
  RuntimeSurvey = "RuntimeSurvey",
}

export enum ReferenceBookContentType {
  ImageContent = "ImageContent",
  PdfContent = "PdfContent",
  TextContent = "TextContent",
  VideoContent = "VideoContent",
}

export enum Relevance {
  Irrelevant = "Irrelevant",
  PotentiallyHelpful = "PotentiallyHelpful",
  Required = "Required",
}

export enum Salutation {
  Mr = "Mr",
  Mrs = "Mrs",
  NonBinary = "NonBinary",
}

export enum ScoringType {
  Analytical = "Analytical",
  Holistic = "Holistic",
}

export enum SpreadsheetCellType {
  Currency = "Currency",
  Date = "Date",
  General = "General",
  Number = "Number",
  Percent = "Percent",
  Text = "Text",
}

export enum SurveyEventType {
  AddEmailAttachment = "AddEmailAttachment",
  AnswerEmail = "AnswerEmail",
  CalculatorKeyPressed = "CalculatorKeyPressed",
  CloseImageBinary = "CloseImageBinary",
  ClosePdfBinary = "ClosePdfBinary",
  CloseSpreadsheet = "CloseSpreadsheet",
  CloseTextDocument = "CloseTextDocument",
  CloseTool = "CloseTool",
  CloseVideoBinary = "CloseVideoBinary",
  CopyToClipboard = "CopyToClipboard",
  CreateEmail = "CreateEmail",
  DeleteEmailAttachment = "DeleteEmailAttachment",
  DeleteEmailDraft = "DeleteEmailDraft",
  DeselectQuestionnaireAnswer = "DeselectQuestionnaireAnswer",
  DeselectQuestionnaireFreetextAnswer = "DeselectQuestionnaireFreetextAnswer",
  DownloadEmailAttachment = "DownloadEmailAttachment",
  EndEvent = "EndEvent",
  EndProject = "EndProject",
  EndQuestionnaire = "EndQuestionnaire",
  EndScenario = "EndScenario",
  EndSurveyCommand = "EndSurveyCommand",
  EnlargeQuestionnaireBinary = "EnlargeQuestionnaireBinary",
  EnlargeQuestionnaireQuestionBinary = "EnlargeQuestionnaireQuestionBinary",
  EnterFullscreenQuestionnaireQuestionVideo = "EnterFullscreenQuestionnaireQuestionVideo",
  EnterFullscreenQuestionnaireVideo = "EnterFullscreenQuestionnaireVideo",
  ErpCloseRow = "ErpCloseRow",
  ErpCollapseDirectory = "ErpCollapseDirectory",
  ErpCopyCellContentToClipboard = "ErpCopyCellContentToClipboard",
  ErpCopyCoreDataAndReferencesToClipboard = "ErpCopyCoreDataAndReferencesToClipboard",
  ErpCopyCoreDataToClipboard = "ErpCopyCoreDataToClipboard",
  ErpCopyReferenceToClipboard = "ErpCopyReferenceToClipboard",
  ErpDeselectAllRows = "ErpDeselectAllRows",
  ErpDeselectRow = "ErpDeselectRow",
  ErpExpandDirectory = "ErpExpandDirectory",
  ErpNavigateBack = "ErpNavigateBack",
  ErpNavigateToReference = "ErpNavigateToReference",
  ErpOpenAttachment = "ErpOpenAttachment",
  ErpOpenRow = "ErpOpenRow",
  ErpSearchTable = "ErpSearchTable",
  ErpSelectAllRows = "ErpSelectAllRows",
  ErpSelectCell = "ErpSelectCell",
  ErpSelectRow = "ErpSelectRow",
  ErpSelectTable = "ErpSelectTable",
  ErpSortTable = "ErpSortTable",
  ErpUpdateShowOnlySelectedRows = "ErpUpdateShowOnlySelectedRows",
  EvaluateIntervention = "EvaluateIntervention",
  LeaveFullscreenQuestionnaireQuestionVideo = "LeaveFullscreenQuestionnaireQuestionVideo",
  LeaveFullscreenQuestionnaireVideo = "LeaveFullscreenQuestionnaireVideo",
  MinimizeTool = "MinimizeTool",
  MoveEmailToTrash = "MoveEmailToTrash",
  OpenImageBinary = "OpenImageBinary",
  OpenPdfBinary = "OpenPdfBinary",
  OpenSpreadsheet = "OpenSpreadsheet",
  OpenTextDocument = "OpenTextDocument",
  OpenTool = "OpenTool",
  OpenVideoBinary = "OpenVideoBinary",
  PasteFromClipboard = "PasteFromClipboard",
  PauseQuestionnaireQuestionVideo = "PauseQuestionnaireQuestionVideo",
  PauseQuestionnaireVideo = "PauseQuestionnaireVideo",
  PauseVideo = "PauseVideo",
  PlayQuestionnaireQuestionVideo = "PlayQuestionnaireQuestionVideo",
  PlayQuestionnaireVideo = "PlayQuestionnaireVideo",
  PlayVideo = "PlayVideo",
  QuestionnaireQuestionVideoPlaybackEnded = "QuestionnaireQuestionVideoPlaybackEnded",
  QuestionnaireVideoPlaybackEnded = "QuestionnaireVideoPlaybackEnded",
  ReceiveEmail = "ReceiveEmail",
  ReceiveSupervisorChatMessage = "ReceiveSupervisorChatMessage",
  RestoreTool = "RestoreTool",
  ResumeEvent = "ResumeEvent",
  ResumeProject = "ResumeProject",
  ResumeQuestionnaire = "ResumeQuestionnaire",
  ResumeScenario = "ResumeScenario",
  SearchEmails = "SearchEmails",
  SearchReferenceBook = "SearchReferenceBook",
  SelectEmailDirectory = "SelectEmailDirectory",
  SelectImageBinary = "SelectImageBinary",
  SelectPdfBinary = "SelectPdfBinary",
  SelectQuestionnaireAnswer = "SelectQuestionnaireAnswer",
  SelectQuestionnaireFreetextAnswer = "SelectQuestionnaireFreetextAnswer",
  SelectSpreadsheet = "SelectSpreadsheet",
  SelectSpreadsheetCell = "SelectSpreadsheetCell",
  SelectSpreadsheetCellRange = "SelectSpreadsheetCellRange",
  SelectTextDocument = "SelectTextDocument",
  SelectVideoBinary = "SelectVideoBinary",
  SendEmail = "SendEmail",
  SendParticipantChatMessage = "SendParticipantChatMessage",
  SendSupervisorChatMessage = "SendSupervisorChatMessage",
  ShowEmail = "ShowEmail",
  ShrinkQuestionnaireBinary = "ShrinkQuestionnaireBinary",
  ShrinkQuestionnaireQuestionBinary = "ShrinkQuestionnaireQuestionBinary",
  StartEvent = "StartEvent",
  StartProject = "StartProject",
  StartQuestionnaire = "StartQuestionnaire",
  StartQuestionnaireCommand = "StartQuestionnaireCommand",
  StartScenario = "StartScenario",
  StartScenarioCommand = "StartScenarioCommand",
  StartSurveyCommand = "StartSurveyCommand",
  StoreParticipantData = "StoreParticipantData",
  UpdateEmail = "UpdateEmail",
  UpdateEmailText = "UpdateEmailText",
  UpdateNotesText = "UpdateNotesText",
  UpdateQuestionnaireFreeTextAnswer = "UpdateQuestionnaireFreeTextAnswer",
  UpdateSpreadsheetCellStyle = "UpdateSpreadsheetCellStyle",
  UpdateSpreadsheetCellType = "UpdateSpreadsheetCellType",
  UpdateSpreadsheetCellValue = "UpdateSpreadsheetCellValue",
  UpdateTextDocumentContent = "UpdateTextDocumentContent",
  ViewDirectory = "ViewDirectory",
  ViewDownloadsDirectory = "ViewDownloadsDirectory",
  ViewFile = "ViewFile",
  ViewReferenceBookArticle = "ViewReferenceBookArticle",
  ViewReferenceBookBinary = "ViewReferenceBookBinary",
  ViewReferenceBookChapter = "ViewReferenceBookChapter",
}

export enum SurveyExecutionType {
  AutomaticAsynchronous = "AutomaticAsynchronous",
  ManualAsynchronous = "ManualAsynchronous",
  ManualSynchronous = "ManualSynchronous",
}

export enum SurveyParticipationStatus {
  ParticipationFinished = "ParticipationFinished",
  ParticipationInProgress = "ParticipationInProgress",
  ParticipationNotStarted = "ParticipationNotStarted",
  RatingFinalized = "RatingFinalized",
}

export enum UsageField {
  Company = "Company",
  Demonstration = "Demonstration",
  Other = "Other",
  Research = "Research",
  School = "School",
}

export interface AutomatedCodingItemCreation {
  title: string;
  description: string;
  rule: AutomatedCodingItemRule;
  dimensionId: string;
}

export interface AutomatedCodingItemUpdate {
  title: string;
  description: string;
}

export interface CodingCriterionCreation {
  description: string;
  score: number;
  itemId: string;
}

export interface CodingCriterionUpdate {
  description: string;
  score: number;
}

export interface CodingDimensionCreation {
  title: string;
  description: string;
  codingModelId: string;
  parentDimensionId?: string | null;
}

export interface CodingDimensionUpdate {
  title: string;
  description: string;
  parentDimensionId?: string | null;
}

export interface CodingModelCreation {
  title: string;
  description: string;
  scenarioId: string;
}

export interface CodingModelUpdate {
  title: string;
  description: string;
}

export interface DocumentViewScenarioCodingAutomatedCriterionCreation {
  score: number;
  itemId: string;
  fileId?: string | null;
  emailId?: string | null;
  sampleCompanyId?: string | null;
  erpRowId?: number | null;
  erpTableType?: ErpTableType | null;
  referenceBookArticleId?: string | null;
}

export interface DocumentViewScenarioCodingAutomatedCriterionUpdate {
  score: number;
  fileId?: string | null;
  emailId?: string | null;
  sampleCompanyId?: string | null;
  erpRowId?: number | null;
  erpTableType?: ErpTableType | null;
  referenceBookArticleId?: string | null;
}

export interface EmailCreation {
  sender?: string | null;
  recipient?: string | null;
  ccRecipients: string[];
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  scenarioId: string;
}

export interface EmailOpeningInterventionCreation {
  title: string;
  timeOffsetInSeconds: number;
  scenarioId: string;
  interventionEmailId: string;
  emailId: string;
}

export interface EmailOpeningInterventionUpdate {
  title: string;
  timeOffsetInSeconds: number;
  interventionEmailId: string;
  emailId: string;
}

export interface EmailUpdate {
  sender?: string | null;
  recipient?: string | null;
  ccRecipients: string[];
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  scenarioId: string;
}

export interface ErpComponentCreation {
  name: string;
  category: string;
  purchasingPriceInCents: number;
  margin: number;
  packSize: number;
  availableStock: number;
  stockCostPerUnitInCents: number;
  stockCostTotalInCents: number;
  note?: string | null;
  unit: string;
  supplierId: number;
  binaryFileId?: string | null;
  sampleCompanyId: string;
}

export interface ErpComponentErpProductCreation {
  componentId: number;
  productId: number;
  quantity: number;
  sampleCompanyId: string;
}

export interface ErpComponentErpProductUpdate {
  quantity: number;
}

export interface ErpComponentUpdate {
  name: string;
  category: string;
  purchasingPriceInCents: number;
  margin: number;
  packSize: number;
  availableStock: number;
  stockCostPerUnitInCents: number;
  stockCostTotalInCents: number;
  note?: string | null;
  unit: string;
  supplierId: number;
  binaryFileId?: string | null;
}

export interface ErpCustomerCreation {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  company?: string | null;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email?: string | null;
  phone?: string | null;
  note?: string | null;
  binaryFileId?: string | null;
  sampleCompanyId: string;
}

export interface ErpCustomerUpdate {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  company?: string | null;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email?: string | null;
  phone?: string | null;
  note?: string | null;
  binaryFileId?: string | null;
}

export interface ErpEmployeeCreation {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email?: string | null;
  phone?: string | null;
  department: string;
  jobTitle: string;
  employmentMode: EmploymentMode;
  employedAt: string;
  employmentEndsAt?: string | null;
  site: string;
  graduation?: string | null;
  furtherEducation: string[];
  taxClass: string;
  familyStatus: FamilyStatus;
  childCount?: number | null;
  note?: string | null;
  binaryFileId?: string | null;
  sampleCompanyId: string;
}

export interface ErpEmployeeUpdate {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email?: string | null;
  phone?: string | null;
  department: string;
  jobTitle: string;
  employmentMode: EmploymentMode;
  employedAt: string;
  employmentEndsAt?: string | null;
  site: string;
  graduation?: string | null;
  furtherEducation: string[];
  taxClass: string;
  familyStatus: FamilyStatus;
  childCount?: number | null;
  note?: string | null;
  binaryFileId?: string | null;
}

export interface ErpInvoiceCreation {
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  amountPaidInCents?: number | null;
  paymentStatus: PaymentStatus;
  reminderFeeInCents?: number | null;
  defaultChargesInCents?: number | null;
  note?: string | null;
  totalNetInCents: number;
  totalGrossInCents: number;
  taxAmountInCents: number;
  orderId: number;
  binaryFileId?: string | null;
  sampleCompanyId: string;
}

export interface ErpInvoiceUpdate {
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  amountPaidInCents?: number | null;
  paymentStatus: PaymentStatus;
  reminderFeeInCents?: number | null;
  defaultChargesInCents?: number | null;
  note?: string | null;
  totalNetInCents: number;
  totalGrossInCents: number;
  taxAmountInCents: number;
  orderId: number;
  binaryFileId?: string | null;
}

export interface ErpOrderCreation {
  cashbackInCents?: number | null;
  discountInCents?: number | null;
  deliveryChargeInCents: number;
  deliveryStatus: DeliveryStatus;
  deliveryDate: string;
  note?: string | null;
  customerId: number;
  employeeId: number;
  binaryFileId?: string | null;
  sampleCompanyId: string;
}

export interface ErpOrderItemCreation {
  quantity: number;
  totalNetInCents: number;
  orderId: number;
  productId: number;
  binaryFileId?: string | null;
  sampleCompanyId: string;
}

export interface ErpOrderItemUpdate {
  quantity: number;
  totalNetInCents: number;
  binaryFileId?: string | null;
}

export interface ErpOrderUpdate {
  cashbackInCents?: number | null;
  discountInCents?: number | null;
  deliveryChargeInCents: number;
  deliveryStatus: DeliveryStatus;
  deliveryDate: string;
  note?: string | null;
  customerId: number;
  employeeId: number;
  binaryFileId?: string | null;
}

export interface ErpProductCreation {
  name: string;
  netPriceInCents: number;
  taxRate: number;
  packSize: number;
  availableStock: number;
  stockCostPerUnitInCents: number;
  stockCostTotalInCents: number;
  unit: string;
  note?: string | null;
  binaryFileId?: string | null;
  sampleCompanyId: string;
}

export interface ErpProductUpdate {
  name: string;
  netPriceInCents: number;
  taxRate: number;
  packSize: number;
  availableStock: number;
  stockCostPerUnitInCents: number;
  stockCostTotalInCents: number;
  unit: string;
  note?: string | null;
  binaryFileId?: string | null;
}

export interface ErpRowOpeningInterventionCreation {
  title: string;
  timeOffsetInSeconds: number;
  scenarioId: string;
  interventionEmailId: string;
  erpTableType: ErpTableType;
  erpRowId: number;
  sampleCompanyId: string;
}

export interface ErpRowOpeningInterventionUpdate {
  title: string;
  timeOffsetInSeconds: number;
  interventionEmailId: string;
}

export interface ErpSupplierCreation {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  company: string;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  note?: string | null;
  binaryFileId?: string | null;
  sampleCompanyId: string;
}

export interface ErpSupplierUpdate {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  company: string;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  note?: string | null;
  binaryFileId?: string | null;
}

export interface FeatureUsageScenarioCodingAutomatedCriterionCreation {
  score: number;
  itemId: string;
  officeTool: OfficeTool;
  featureType: FeatureType;
}

export interface FeatureUsageScenarioCodingAutomatedCriterionUpdate {
  score: number;
  officeTool: OfficeTool;
  featureType: FeatureType;
}

export interface FileCreation {
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId?: string | null;
  emailId?: string | null;
  binaryFileId?: string | null;
  spreadsheetId?: string | null;
  textDocumentId?: string | null;
}

export interface FileOpeningInterventionCreation {
  title: string;
  timeOffsetInSeconds: number;
  scenarioId: string;
  interventionEmailId: string;
  fileId: string;
}

export interface FileOpeningInterventionUpdate {
  title: string;
  timeOffsetInSeconds: number;
  interventionEmailId: string;
  fileId: string;
}

export interface FileUpdate {
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId?: string | null;
  binaryFileId?: string | null;
}

export interface FreetextQuestionCodingCriterionCreation {
  description: string;
  score: number;
  questionId: string;
}

export interface FreetextQuestionCodingCriterionUpdate {
  description: string;
  score: number;
}

export interface FreetextQuestionRatingCreation {
  ratingId: string;
  questionId: string;
  surveyInvitationId: string;
  noCriterionFulfilled: boolean;
}

export interface FreetextQuestionRatingCriterionSelectionCreation {
  freetextQuestionRatingId: string;
  criterionId: string;
}

export interface FreetextQuestionRatingUpdate {
  noCriterionFulfilled: boolean;
}

export interface InputValueScenarioCodingAutomatedCriterionCreation {
  score: number;
  itemId: string;
  officeTool: OfficeTool;
  value: string;
  fileId?: string | null;
  spreadsheetRowIndex?: number | null;
  spreadsheetColumnIndex?: number | null;
}

export interface InputValueScenarioCodingAutomatedCriterionUpdate {
  score: number;
  officeTool: OfficeTool;
  value: string;
  fileId?: string | null;
  spreadsheetRowIndex?: number | null;
  spreadsheetColumnIndex?: number | null;
}

export interface ManualCodingItemCreation {
  title: string;
  description: string;
  scoringType: ScoringType;
  dimensionId: string;
}

export interface ManualCodingItemUpdate {
  title: string;
  description: string;
  scoringType: ScoringType;
}

export interface NotesContentInterventionCreation {
  title: string;
  timeOffsetInSeconds: number;
  scenarioId: string;
  interventionEmailId: string;
  value: string;
}

export interface NotesContentInterventionUpdate {
  title: string;
  timeOffsetInSeconds: number;
  interventionEmailId: string;
  value: string;
}

export interface ProjectCreation {
  name: string;
  description: string;
  usageField: UsageField;
  audience: string;
  welcomeText: string;
}

export interface ProjectModuleCreation {
  projectId: string;
  moduleType: ProjectModuleType;
  scenarioId?: string | null;
  questionnaireId?: string | null;
}

export interface ProjectUpdate {
  name: string;
  description: string;
  usageField: UsageField;
  audience: string;
  welcomeText: string;
}

export interface QuestionnaireAnswerCreation {
  text: string;
  isCorrect: boolean;
  questionId: string;
}

export interface QuestionnaireAnswerUpdate {
  text: string;
  isCorrect: boolean;
}

export interface QuestionnaireCreation {
  title: string;
  description: string;
  questionnaireType: QuestionnaireType;
  binaryFileId?: string | null;
}

export interface QuestionnaireQuestionCreation {
  text: string;
  questionType: QuestionType;
  isAdditionalFreeTextAnswerEnabled: boolean;
  binaryFileId?: string | null;
  scoringType: QuestionScoringType;
  score: number;
  questionnaireId: string;
}

export interface QuestionnaireQuestionUpdate {
  text: string;
  questionType: QuestionType;
  isAdditionalTextAnswerAllowed: boolean;
  binaryFileId?: string | null;
  scoringType: QuestionScoringType;
  score: number;
}

export interface QuestionnaireUpdate {
  title: string;
  description: string;
  questionnaireType: QuestionnaireType;
  binaryFileId?: string | null;
  maxDurationInSeconds?: number | null;
}

export interface RScriptCreation {
  title: string;
  description: string;
  version: string;
  gitCommitHash: string;
}

export interface RScriptScenarioCodingAutomatedCriterionCreation {
  score: number;
  itemId: string;
  rScriptId: string;
}

export interface RScriptScenarioCodingAutomatedCriterionUpdate {
  score: number;
  rScriptId: string;
}

export interface RScriptUpdate {
  title: string;
  description: string;
  version: string;
  gitCommitHash: string;
}

export interface ReferenceBookArticleCreation {
  title: string;
  referenceBookChapterId: string;
}

export interface ReferenceBookArticleUpdate {
  title: string;
}

export interface ReferenceBookChapterCreation {
  title: string;
  description: string;
}

export interface ReferenceBookChapterScenarioId {
  scenarioId: string;
  referenceBookChapterId: string;
}

export interface ReferenceBookChapterUpdate {
  title: string;
  description: string;
}

export interface ReferenceBookContentCreation {
  contentType: ReferenceBookContentType;
  text?: string | null;
  imageBinaryFileId?: string | null;
  pdfBinaryFileId?: string | null;
  videoBinaryFileId?: string | null;
  referenceBookArticleId: string;
}

export interface ReferenceBookContentUpdate {
  text?: string | null;
  imageBinaryFileId?: string | null;
  pdfBinaryFileId?: string | null;
  videoBinaryFileId?: string | null;
}

export interface RuntimeSurveyAnswerSelectionInterventionCreation {
  title: string;
  scenarioId: string;
  interventionEmailId: string;
  answerId: string;
  isNegated: boolean;
}

export interface RuntimeSurveyAnswerSelectionInterventionUpdate {
  title: string;
  interventionEmailId: string;
  answerId: string;
  isNegated: boolean;
}

export interface SampleCompanyCreation {
  name: string;
  description: string;
  tags: string[];
  emailSignature?: string | null;
  profileFileId?: string | null;
  logoFileId?: string | null;
  domain?: string | null;
}

export interface SampleCompanyUpdate {
  name: string;
  description: string;
  tags: string[];
  emailSignature?: string | null;
  profileFileId?: string | null;
  logoFileId?: string | null;
  domain?: string | null;
}

export interface ScenarioCodingItemRatingCreation {
  ratingId: string;
  surveyInvitationId: string;
  codingItemId: string;
  noCriterionFulfilled: boolean;
}

export interface ScenarioCodingItemRatingUpdate {
  noCriterionFulfilled: boolean;
}

export interface ScenarioCreation {
  date?: string | null;
  name: string;
  description: string;
  maxDurationInSeconds?: number | null;
  introductionEmailId?: string | null;
  shouldDisplayTime: boolean;
  tags: string[];
  completionEmailAddress?: string | null;
  shouldHideReferenceBookChapters: boolean;
  sampleCompanyId?: string | null;
}

export interface ScenarioErpComponentCreation {
  scenarioId: string;
  componentId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpComponentErpProductCreation {
  scenarioId: string;
  componentProductId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpComponentErpProductUpdate {
  relevance: Relevance;
}

export interface ScenarioErpComponentUpdate {
  relevance: Relevance;
}

export interface ScenarioErpCustomerCreation {
  scenarioId: string;
  customerId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpCustomerUpdate {
  relevance: Relevance;
}

export interface ScenarioErpEmployeeCreation {
  scenarioId: string;
  employeeId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpEmployeeUpdate {
  relevance: Relevance;
}

export interface ScenarioErpInvoiceCreation {
  scenarioId: string;
  invoiceId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpInvoiceUpdate {
  relevance: Relevance;
}

export interface ScenarioErpOrderCreation {
  scenarioId: string;
  orderId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpOrderItemCreation {
  scenarioId: string;
  orderItemId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpOrderItemUpdate {
  relevance: Relevance;
}

export interface ScenarioErpOrderUpdate {
  relevance: Relevance;
}

export interface ScenarioErpProductCreation {
  scenarioId: string;
  productId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpProductUpdate {
  relevance: Relevance;
}

export interface ScenarioErpSupplierCreation {
  scenarioId: string;
  supplierId: number;
  sampleCompanyId: string;
  relevance: Relevance;
}

export interface ScenarioErpSupplierUpdate {
  relevance: Relevance;
}

export interface ScenarioQuestionnaireCreation {
  scenarioId: string;
  questionnaireId: string;
  activationDelayInSeconds: number;
}

export interface ScenarioQuestionnaireUpdate {
  activationDelayInSeconds: number;
}

export interface ScenarioRatingCriterionSelectionCreation {
  scenarioCodingItemRatingId: string;
  manualCriterionId?: string | null;
  automatedCriterionId?: string | null;
}

export interface ScenarioSampleCompanyFileCreation {
  scenarioId: string;
  fileId: string;
  relevance: Relevance;
}

export interface ScenarioSampleCompanyFileUpdate {
  relevance: Relevance;
}

export interface ScenarioUpdate {
  date?: string | null;
  name: string;
  description: string;
  maxDurationInSeconds?: number | null;
  introductionEmailId?: string | null;
  shouldDisplayTime: boolean;
  tags: string[];
  completionEmailAddress?: string | null;
  shouldHideReferenceBookChapters: boolean;
  sampleCompanyId?: string | null;
}

export interface SpreadsheetCellContentInterventionCreation {
  title: string;
  timeOffsetInSeconds: number;
  scenarioId: string;
  interventionEmailId: string;
  value: string;
  isNegated: boolean;
  fileId: string;
  spreadsheetId: string;
  spreadsheetRowIndex: number;
  spreadsheetColumnIndex: number;
}

export interface SpreadsheetCellContentInterventionUpdate {
  title: string;
  timeOffsetInSeconds: number;
  interventionEmailId: string;
  value: string;
  isNegated: boolean;
  fileId: string;
  spreadsheetId: string;
  spreadsheetRowIndex: number;
  spreadsheetColumnIndex: number;
}

export interface SpreadsheetCellCreation {
  cellType: SpreadsheetCellType;
  value: string;
  rowIndex: number;
  columnIndex: number;
  style?: string | null;
  spreadsheetId: string;
}

export interface SurveyCreation {
  title: string;
  description: string;
  startsAt?: string | null;
  endsAt?: string | null;
  authenticationType: AuthenticationType;
  isTestSurvey: boolean;
  isOpenParticipationEnabled: boolean;
  projectId: string;
  executionType: SurveyExecutionType;
}

export interface SurveyEventCreation {
  surveyId: string;
  invitationId: string;
  timestamp: string;
  eventType: SurveyEventType;
  index: number;
  data?: string | null;
}

export interface SurveyInvitationCreation {
  email: string;
  surveyId: string;
  userAccountId?: string | null;
}

export interface SurveyUpdate {
  title: string;
  description: string;
  startsAt?: string | null;
  endsAt?: string | null;
  authenticationType: AuthenticationType;
  isOpenParticipationEnabled: boolean;
  executionType: SurveyExecutionType;
}

export interface TextDocumentContentInterventionCreation {
  title: string;
  timeOffsetInSeconds: number;
  scenarioId: string;
  interventionEmailId: string;
  value: string;
  fileId: string;
  textDocumentId: string;
}

export interface TextDocumentContentInterventionUpdate {
  title: string;
  timeOffsetInSeconds: number;
  interventionEmailId: string;
  value: string;
  fileId: string;
  textDocumentId: string;
}

export interface TextDocumentCreation {
  content: string;
}

export interface TextDocumentUpdate {
  content: string;
}

export interface ToolUsageScenarioCodingAutomatedCriterionCreation {
  score: number;
  itemId: string;
  officeTool: OfficeTool;
}

export interface ToolUsageScenarioCodingAutomatedCriterionUpdate {
  score: number;
  officeTool: OfficeTool;
}

export interface UserAccountCreation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  hasConfirmedBackofficeTermsAndConditions: boolean;
}

export interface UserAccountUpdate {
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
  mayAdministrateRScripts: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
