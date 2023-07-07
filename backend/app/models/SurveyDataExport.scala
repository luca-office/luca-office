package models

import database.generated.public._
import enums._
import io.circe.Json

import java.time.Instant
import java.util.UUID

case class SurveyDataExport(
    surveyInvitation: SurveyInvitationExport,
    surveyEvents: Seq[SurveyEventExport],
    survey: SurveyExport,
    project: ProjectExport,
    scoring: ScoringExport,
    sampleCompanies: Seq[SampleCompanyExport],
    emails: Seq[Email],
    directories: Seq[Directory],
    files: Seq[FileExport],
    spreadsheets: Seq[Spreadsheet],
    textDocuments: Seq[TextDocument],
    referenceBookChapters: Seq[ReferenceBookChapter],
    referenceBookArticles: Seq[ReferenceBookArticle],
    referenceBookContents: Seq[ReferenceBookContentExport],
    binaryFiles: Seq[BinaryFile],
    interventions: Seq[InterventionBase],
    scenarios: Seq[ScenarioExport],
    questionnaires: Seq[QuestionnaireExport],
    runtimeSurveys: Seq[QuestionnaireExport])

case class ProjectExport(id: UUID, title: String, description: String, projectModules: Seq[ProjectModuleExport])

case class ProjectModuleExport(
    id: UUID,
    title: String,
    position: BigDecimal,
    scenarioId: Option[UUID],
    questionnaireId: Option[UUID],
    sampleCompanyId: Option[UUID],
    binaryFileId: Option[UUID])

case class ScenarioExport(
    id: UUID,
    name: String,
    description: String,
    completionEmailAddress: Option[String],
    introductionEmailId: Option[UUID]
)
case class QuestionnaireExport(
    id: UUID,
    title: String,
    description: String,
    questionnaireType: enums.QuestionnaireType,
    maxDurationInSeconds: Option[Int],
    questions: Seq[QuestionnaireQuestionExport]
)

case class QuestionnaireQuestionExport(
    id: UUID,
    text: String,
    questionType: QuestionType,
    position: BigDecimal,
    answers: Seq[QuestionnaireAnswerExport],
    freeTextAnswer: Option[FreetextAnswer],
    selectedAnswerIds: Seq[UUID],
    freetextQuestionCodingCriteria: Seq[FreetextQuestionCodingCriterionExport],
    isAdditionalFreeTextAnswerEnabled: Boolean
)

case class QuestionnaireAnswerExport(
    id: UUID,
    text: String,
    isCorrect: Boolean,
    position: BigDecimal
)

case class FreetextQuestionCodingCriterionExport(
    id: UUID,
    description: String,
    score: Int
)

case class SurveyExport(
    id: UUID,
    title: String,
    description: String,
    authenticationType: AuthenticationType,
    isOpenParticipationEnabled: Boolean)

case class SurveyInvitationExport(
    id: UUID,
    token: String,
    firstSurveyEventTimestamp: Option[Instant],
    lastSurveyEventTimestamp: Option[Instant],
    isUserAccountParticipation: Boolean,
    isOpenParticipation: Boolean)

case class SurveyEventExport(
    timestamp: Instant,
    eventType: SurveyEventType,
    data: Option[Json],
    surveyId: UUID,
    index: Int,
    invitationId: UUID,
    invitationToken: String)

case class ScoringExport(
    scenarioScorings: Seq[ScenarioScoringExport],
    questionnaireScorings: Seq[QuestionnaireScoringExport])

case class ScenarioScoringExport(
    projectModuleId: UUID,
    scenarioId: UUID,
    title: String,
    position: BigDecimal,
    ratings: Seq[RatingWithCodingDimensionExport]
)

case class RatingWithCodingDimensionExport(
    id: UUID,
    rater: Option[UserExport],
    isFinalScore: Boolean,
    dimensions: Seq[CodingDimensionExport]
)

case class CodingDimensionExport(
    title: String,
    description: String,
    parentDimensionId: Option[UUID],
    manualItems: Seq[CodingItemExport],
    automatedItems: Seq[CodingItemExport])

case class CodingItemExport(title: String, description: String, criteria: Seq[CodingCriterionExport])

case class CodingCriterionExport(
    id: UUID,
    description: String,
    score: Int,
    rScriptEvaluationResult: Option[RScriptEvaluationResultExport])

case class RScriptEvaluationResultExport(
    criterionId: UUID,
    status: RScriptEvaluationStatus,
    criterionFulfilled: Option[Boolean],
    probability: BigDecimal,
    threshold: Option[BigDecimal],
    functionName: Option[String],
    criterionNo: Option[Int],
    resultData: Option[String])

trait BinaryFileExport {
  def binaryFileSize: Option[Long]
  def binaryFileMimeType: Option[MimeType]
}

case class UserExport(
    id: UUID,
    email: String,
    firstName: String,
    lastName: String,
    organization: String
)

case class QuestionnaireRatingExport(
    ratingId: UUID,
    rater: Option[UserExport],
    isFinalScore: Boolean,
    questions: Seq[QuestionScoringExport]
)
case class QuestionnaireScoringExport(
    projectModuleId: UUID,
    questionnaireId: UUID,
    title: String,
    position: BigDecimal,
    binaryFileId: Option[UUID],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType],
    ratings: Seq[QuestionnaireRatingExport])
    extends BinaryFileExport

case class QuestionScoringExport(
    id: UUID,
    title: String,
    position: BigDecimal,
    binaryFileId: Option[UUID],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType],
    ratingId: UUID,
    score: Int,
    scoringType: QuestionScoringType,
    freeTextAnswer: Option[FreetextAnswer],
    selectedAnswerIds: Seq[UUID],
    selectedCriteriaIds: Seq[UUID],
    noCriterionFulfilled: Option[Boolean])
    extends BinaryFileExport

case class SampleCompanyExport(id: UUID, title: String, description: String, fileIds: Seq[UUID], erp: ErpExport)

case class ReferenceBookContentExport(
    id: UUID,
    position: BigDecimal,
    contentType: ReferenceBookContentType,
    text: Option[String],
    referenceBookArticleId: UUID,
    binaryFileId: Option[UUID],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class FileExport(
    id: UUID,
    usageType: FileUsageType,
    name: String,
    relevance: Relevance,
    tags: Seq[String],
    directoryId: Option[UUID],
    emailId: Option[UUID],
    binaryFileId: Option[UUID],
    spreadsheetId: Option[UUID],
    textDocumentId: Option[UUID],
    directoryName: Option[String],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class ErpExport(
    components: Seq[ErpComponentExport],
    componentProducts: Seq[ErpComponentErpProduct],
    customers: Seq[ErpCustomerExport],
    employees: Seq[ErpEmployeeExport],
    invoices: Seq[ErpInvoiceExport],
    orderItems: Seq[ErpOrderItemExport],
    orders: Seq[ErpOrderExport],
    products: Seq[ErpProductExport],
    suppliers: Seq[ErpSupplierExport])

case class ErpCustomerExport(
    id: Int,
    salutation: Salutation,
    firstName: String,
    lastName: String,
    company: Option[String],
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: Option[String],
    phone: Option[String],
    note: Option[String],
    sampleCompanyId: UUID,
    binaryFileId: Option[UUID],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class ErpComponentExport(
    id: Int,
    name: String,
    category: String,
    purchasingPriceInCents: Int,
    margin: scala.math.BigDecimal,
    sampleCompanyId: UUID,
    supplierId: Int,
    packSize: Int,
    availableStock: Int,
    stockCostPerUnitInCents: Int,
    stockCostTotalInCents: Int,
    binaryFileId: Option[UUID],
    unit: String,
    note: Option[String],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class ErpEmployeeExport(
    id: Int,
    salutation: Salutation,
    firstName: String,
    lastName: String,
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: Option[String],
    phone: Option[String],
    department: String,
    jobTitle: String,
    employmentMode: EmploymentMode,
    employedAt: java.time.Instant,
    employmentEndsAt: Option[java.time.Instant],
    site: String,
    graduation: Option[String],
    furtherEducation: Seq[String],
    taxClass: String,
    familyStatus: FamilyStatus,
    childCount: Option[Int],
    sampleCompanyId: UUID,
    binaryFileId: Option[UUID],
    note: Option[String],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class ErpInvoiceExport(
    id: Int,
    invoiceDate: java.time.Instant,
    dueDate: java.time.Instant,
    paymentTerms: String,
    amountPaidInCents: Option[Int],
    paymentStatus: PaymentStatus,
    reminderFeeInCents: Option[Int],
    defaultChargesInCents: Option[Int],
    note: Option[String],
    sampleCompanyId: UUID,
    orderId: Int,
    totalNetInCents: Int,
    totalGrossInCents: Int,
    taxAmountInCents: Int,
    binaryFileId: Option[UUID],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class ErpOrderExport(
    id: Int,
    cashbackInCents: Option[Int],
    discountInCents: Option[Int],
    deliveryChargeInCents: Int,
    deliveryStatus: DeliveryStatus,
    deliveryDate: java.time.Instant,
    note: Option[String],
    sampleCompanyId: UUID,
    customerId: Int,
    employeeId: Int,
    binaryFileId: Option[UUID],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class ErpOrderItemExport(
    id: Int,
    quantity: Int,
    sampleCompanyId: UUID,
    orderId: Int,
    productId: Int,
    totalNetInCents: Int,
    binaryFileId: Option[UUID],
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class ErpProductExport(
    id: Int,
    name: String,
    netPriceInCents: Int,
    taxRate: scala.math.BigDecimal,
    sampleCompanyId: UUID,
    binaryFileId: Option[UUID],
    unit: String,
    note: Option[String],
    packSize: Int,
    availableStock: Int,
    stockCostPerUnitInCents: Int,
    stockCostTotalInCents: Int,
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport

case class ErpSupplierExport(
    id: Int,
    firstName: String,
    lastName: String,
    company: String,
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: String,
    phone: String,
    note: Option[String],
    sampleCompanyId: UUID,
    binaryFileId: Option[UUID],
    salutation: Salutation,
    binaryFileSize: Option[Long],
    binaryFileMimeType: Option[MimeType])
    extends BinaryFileExport
