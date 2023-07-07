package database.generated.public

case class ErpCustomer(id: Int, salutation: enums.Salutation, firstName: String, lastName: String, company: Option[String], addressLine: String, postalCode: String, city: String, country: String, email: Option[String], phone: Option[String], note: Option[String], sampleCompanyId: java.util.UUID, binaryFileId: Option[java.util.UUID])

case class ErpEmployee(id: Int, salutation: enums.Salutation, firstName: String, lastName: String, addressLine: String, postalCode: String, city: String, country: String, email: Option[String], phone: Option[String], department: String, jobTitle: String, employmentMode: enums.EmploymentMode, employedAt: java.time.Instant, employmentEndsAt: Option[java.time.Instant], site: String, graduation: Option[String], furtherEducation: Seq[String], taxClass: String, familyStatus: enums.FamilyStatus, childCount: Option[Int], sampleCompanyId: java.util.UUID, binaryFileId: Option[java.util.UUID], note: Option[String])

case class ScenarioQuestionnaire(scenarioId: java.util.UUID, questionnaireId: java.util.UUID, activationDelayInSeconds: Int)

case class ScenarioErpComponent(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, componentId: Int, relevance: enums.Relevance)

case class Survey(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, startsAt: Option[java.time.Instant], projectId: java.util.UUID, title: String, description: String, endsAt: Option[java.time.Instant], authenticationType: enums.AuthenticationType, isTestSurvey: Boolean, isOpenParticipationEnabled: Boolean, executionType: enums.SurveyExecutionType)

case class ScenarioErpEmployee(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, employeeId: Int, relevance: enums.Relevance)

case class Intervention(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, title: String, interventionType: enums.InterventionType, timeOffsetInSeconds: Int, scenarioId: java.util.UUID, interventionEmailId: java.util.UUID, fileId: Option[java.util.UUID], emailId: Option[java.util.UUID], answerId: Option[java.util.UUID], isNegated: Option[Boolean], value: Option[String], sampleCompanyId: Option[java.util.UUID], erpComponentId: Option[Int], erpComponentErpProductId: Option[Int], erpCustomerId: Option[Int], erpEmployeeId: Option[Int], erpInvoiceId: Option[Int], erpOrderId: Option[Int], erpOrderItemId: Option[Int], erpProductId: Option[Int], erpSupplierId: Option[Int], spreadsheetRowIndex: Option[Int], spreadsheetColumnIndex: Option[Int], spreadsheetId: Option[java.util.UUID], textDocumentId: Option[java.util.UUID])

case class SurveyUserAccount(surveyId: java.util.UUID, userAccountId: java.util.UUID)

case class ErpComponent(id: Int, name: String, category: String, purchasingPriceInCents: Int, margin: scala.math.BigDecimal, sampleCompanyId: java.util.UUID, supplierId: Int, packSize: Int, availableStock: Int, stockCostPerUnitInCents: Int, stockCostTotalInCents: Int, binaryFileId: Option[java.util.UUID], unit: String, note: Option[String])

case class ScenarioErpInvoice(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, invoiceId: Int, relevance: enums.Relevance)

case class RScript(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, title: String, description: String, archivedAt: Option[java.time.Instant], version: String, gitCommitHash: String)

case class ScenarioErpComponentErpProduct(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, relevance: enums.Relevance, componentProductId: Int)

case class ScenarioErpOrder(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, orderId: Int, relevance: enums.Relevance)

case class ErpInvoice(id: Int, invoiceDate: java.time.Instant, dueDate: java.time.Instant, paymentTerms: String, amountPaidInCents: Option[Int], paymentStatus: enums.PaymentStatus, reminderFeeInCents: Option[Int], defaultChargesInCents: Option[Int], note: Option[String], sampleCompanyId: java.util.UUID, orderId: Int, totalNetInCents: Int, totalGrossInCents: Int, taxAmountInCents: Int, binaryFileId: Option[java.util.UUID])

case class ReferenceBookChapter(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, authorId: java.util.UUID, title: String, description: String, publishedAt: Option[java.time.Instant], archivedAt: Option[java.time.Instant])

case class ScenarioErpSupplier(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, supplierId: Int, relevance: enums.Relevance)

case class FreetextQuestionRatingCriterionSelection(createdAt: java.time.Instant, freetextQuestionRatingId: java.util.UUID, criterionId: java.util.UUID)

case class ScenarioErpProduct(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, productId: Int, relevance: enums.Relevance)

case class ReferenceBookChapterScenario(referenceBookChapterId: java.util.UUID, scenarioId: java.util.UUID, position: scala.math.BigDecimal)

case class Rating(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, finalizedAt: Option[java.time.Instant], surveyId: java.util.UUID, userAccountId: java.util.UUID, isFinalScore: Boolean)

case class ProjectUserAccount(projectId: java.util.UUID, userAccountId: java.util.UUID)

case class ScenarioSampleCompanyFile(scenarioId: java.util.UUID, fileId: java.util.UUID, relevance: enums.Relevance)

case class ErpProduct(id: Int, name: String, netPriceInCents: Int, taxRate: scala.math.BigDecimal, sampleCompanyId: java.util.UUID, binaryFileId: Option[java.util.UUID], unit: String, note: Option[String], packSize: Int, availableStock: Int, stockCostPerUnitInCents: Int, stockCostTotalInCents: Int)

case class CodingDimension(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, title: String, description: String, codingModelId: java.util.UUID, parentDimensionId: Option[java.util.UUID], position: scala.math.BigDecimal)

case class ErpOrderItem(id: Int, quantity: Int, sampleCompanyId: java.util.UUID, orderId: Int, productId: Int, totalNetInCents: Int, binaryFileId: Option[java.util.UUID])

case class BinaryFile(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, filename: String, fileSize: Long, mimeType: enums.MimeType)

case class ErpSupplier(id: Int, firstName: String, lastName: String, company: String, addressLine: String, postalCode: String, city: String, country: String, email: String, phone: String, note: Option[String], sampleCompanyId: java.util.UUID, binaryFileId: Option[java.util.UUID], salutation: enums.Salutation)

case class ScenarioRatingCriterionSelection(createdAt: java.time.Instant, manualCriterionId: Option[java.util.UUID], automatedCriterionId: Option[java.util.UUID], scenarioCodingItemRatingId: java.util.UUID)

case class SurveyEvent(timestamp: java.time.Instant, eventType: enums.SurveyEventType, data: Option[io.circe.Json], surveyId: java.util.UUID, index: Int, invitationId: Option[java.util.UUID])

case class Spreadsheet(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, filename: String, fileSize: Long)

case class FlywaySchemaHistory(installedRank: Int, version: Option[String], description: String, `type`: String, script: String, checksum: Option[Int], installedBy: String, installedOn: java.time.Instant, executionTime: Int, success: Boolean)

case class Project(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, name: String, authorId: java.util.UUID, description: String, audience: String, usageField: enums.UsageField, welcomeText: String)

case class ScenarioErpCustomer(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, customerId: Int, relevance: enums.Relevance)

case class TextDocument(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, content: String)

case class ScenarioUserAccount(scenarioId: java.util.UUID, userAccountId: java.util.UUID)

case class ReferenceBookArticle(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, title: String, referenceBookChapterId: java.util.UUID, position: scala.math.BigDecimal)

case class SpreadsheetCell(id: java.util.UUID, rowIndex: Int, columnIndex: Int, cellType: enums.SpreadsheetCellType, value: String, spreadsheetId: java.util.UUID, style: Option[io.circe.Json])

case class SampleCompany(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, authorId: java.util.UUID, name: String, description: String, tags: Seq[String], emailSignature: Option[String], profileFileId: Option[java.util.UUID], logoFileId: Option[java.util.UUID], publishedAt: Option[java.time.Instant], domain: Option[String], archivedAt: Option[java.time.Instant])

case class RScriptEvaluationResult(id: java.util.UUID, createdAt: java.time.Instant, status: enums.RScriptEvaluationStatus, probability: scala.math.BigDecimal, invitationId: java.util.UUID, criterionId: java.util.UUID, criterionFulfilled: Option[Boolean], threshold: Option[scala.math.BigDecimal], functionName: Option[String], criterionNo: Option[Int], resultData: Option[String])

case class ProjectModule(projectId: java.util.UUID, scenarioId: Option[java.util.UUID], position: scala.math.BigDecimal, id: java.util.UUID, moduleType: enums.ProjectModuleType, questionnaireId: Option[java.util.UUID])

case class Scenario(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, date: Option[java.time.Instant], name: String, description: String, maxDurationInSeconds: Option[Int], introductionEmailId: Option[java.util.UUID], authorId: java.util.UUID, shouldDisplayTime: Boolean, finalizedAt: Option[java.time.Instant], publishedAt: Option[java.time.Instant], tags: Seq[String], completionEmailAddress: Option[String], shouldHideReferenceBookChapters: Boolean, sampleCompanyId: Option[java.util.UUID], archivedAt: Option[java.time.Instant])

case class ScenarioCodingItemRating(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, noCriterionFulfilled: Boolean, surveyInvitationId: java.util.UUID, ratingId: java.util.UUID, codingItemId: java.util.UUID)

case class ScenarioCodingAutomatedCriterion(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, score: Int, officeTool: Option[enums.OfficeTool], value: Option[String], spreadsheetRowIndex: Option[Int], spreadsheetColumnIndex: Option[Int], itemId: java.util.UUID, emailId: Option[java.util.UUID], fileId: Option[java.util.UUID], referenceBookArticleId: Option[java.util.UUID], sampleCompanyId: Option[java.util.UUID], erpComponentId: Option[Int], erpComponentErpProductId: Option[Int], erpCustomerId: Option[Int], erpEmployeeId: Option[Int], erpInvoiceId: Option[Int], erpOrderId: Option[Int], erpOrderItemId: Option[Int], erpProductId: Option[Int], erpSupplierId: Option[Int], rule: enums.AutomatedCodingItemRule, featureType: Option[enums.FeatureType], rScriptId: Option[java.util.UUID])

case class QuestionnaireQuestion(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, text: String, questionType: enums.QuestionType, isAdditionalFreeTextAnswerEnabled: Boolean, questionnaireId: java.util.UUID, binaryFileId: Option[java.util.UUID], position: scala.math.BigDecimal, scoringType: enums.QuestionScoringType, score: Int)

case class FreetextQuestionCodingCriterion(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, description: String, score: Int, questionId: java.util.UUID)

case class UserAccount(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, email: String, passwordHash: String, firstName: String, lastName: String, organization: String, resetPasswordToken: Option[java.util.UUID], salutation: enums.Salutation, mayAdministrateUserAccounts: Boolean, mayArchive: Boolean, mayFinalizeWithoutPublishing: Boolean, mayAdministrateRScripts: Boolean, isGlobalSuperAdmin: Boolean, hasConfirmedBackofficeTermsAndConditionsAt: Option[java.time.Instant])

case class QuestionnaireAnswer(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, text: String, questionId: java.util.UUID, position: scala.math.BigDecimal, isCorrect: Boolean)

case class CodingItem(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, title: String, description: String, scoringType: enums.ScoringType, dimensionId: java.util.UUID, position: scala.math.BigDecimal, isAutomated: Boolean, rule: Option[enums.AutomatedCodingItemRule])

case class Directory(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, name: String, parentDirectoryId: Option[java.util.UUID], scenarioId: Option[java.util.UUID], sampleCompanyId: Option[java.util.UUID])

case class ReferenceBookContent(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, position: scala.math.BigDecimal, contentType: enums.ReferenceBookContentType, text: Option[String], imageBinaryFileId: Option[java.util.UUID], videoBinaryFileId: Option[java.util.UUID], referenceBookArticleId: java.util.UUID, pdfBinaryFileId: Option[java.util.UUID])

case class Questionnaire(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, title: String, description: String, questionnaireType: enums.QuestionnaireType, publishedAt: Option[java.time.Instant], binaryFileId: Option[java.util.UUID], authorId: java.util.UUID, finalizedAt: Option[java.time.Instant], archivedAt: Option[java.time.Instant], maxDurationInSeconds: Option[Int])

case class CodingModel(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, title: String, description: String, scenarioId: java.util.UUID)

case class ScenarioErpOrderItem(scenarioId: java.util.UUID, sampleCompanyId: java.util.UUID, orderItemId: Int, relevance: enums.Relevance)

case class Email(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, sender: Option[String], ccRecipients: Seq[String], subject: String, directory: enums.EmailDirectory, receptionDelayInSeconds: Int, isInitiallyRead: Boolean, relevance: enums.Relevance, message: String, scenarioId: java.util.UUID, recipient: Option[String])

case class ErpComponentErpProduct(componentId: Int, productId: Int, sampleCompanyId: java.util.UUID, quantity: Int, id: Int)

case class File(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, usageType: enums.FileUsageType, name: String, relevance: enums.Relevance, tags: Seq[String], directoryId: Option[java.util.UUID], emailId: Option[java.util.UUID], binaryFileId: Option[java.util.UUID], spreadsheetId: Option[java.util.UUID], textDocumentId: Option[java.util.UUID])

case class SurveyInvitation(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, token: String, email: Option[String], surveyId: java.util.UUID, userAccountId: Option[java.util.UUID], index: Int, isOpenParticipation: Boolean)

case class FreetextQuestionRating(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, questionId: java.util.UUID, surveyInvitationId: java.util.UUID, noCriterionFulfilled: Boolean, ratingId: java.util.UUID)

case class CodingCriterion(id: java.util.UUID, createdAt: java.time.Instant, modifiedAt: java.time.Instant, description: String, score: Int, itemId: java.util.UUID)

case class ErpOrder(id: Int, cashbackInCents: Option[Int], discountInCents: Option[Int], deliveryChargeInCents: Int, deliveryStatus: enums.DeliveryStatus, deliveryDate: java.time.Instant, note: Option[String], sampleCompanyId: java.util.UUID, customerId: Int, employeeId: Int, binaryFileId: Option[java.util.UUID])

