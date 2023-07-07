package services

import database.DatabaseContext
import database.generated.public._
import enums.SurveyEventType
import models._
import services.actions.{AllFile, AllSurveyEvent}
import services.converters.InterventionConverter.toInterventionBase
import services.generated._
import utils.CirceUtils.addProperties
import utils.Excel

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class SurveyDataExportService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends QuillUtils
    with DefaultAllSurveyInvitation
    with SurveyServiceActions
    with ProjectServiceActions
    with AllSurveyEvent
    with ProjectModuleServiceActions
    with ErpServiceActions
    with DefaultAllEmail
    with AllFile
    with DefaultAllSpreadsheet
    with DefaultAllTextDocument
    with DefaultAllCodingModel
    with DefaultAllCodingDimension
    with DefaultAllCodingItem
    with DefaultAllCodingCriterion
    with DefaultAllScenarioCodingAutomatedCriterion
    with RatingServiceActions
    with DefaultFindUserAccount
    with ScenarioRatingCriterionSelectionServiceActions
    with DefaultAllQuestionnaireQuestion
    with DefaultAllReferenceBookArticle
    with DefaultAllReferenceBookContent
    with QuestionnaireSurveyResultsServiceActions
    with DefaultAllIntervention
    with DefaultAllRScriptEvaluationResult {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def exportBinaries(surveyId: UUID): Future[Seq[BinaryFile]] = {
    val action = for {
      projectModules <- allProjectModulesForSurveyAction(surveyId)
      scenarioIds = projectModules.collect {
        case projectModule if projectModule.scenarioId.isDefined => projectModule.scenarioId.get
      }
      questionnaireIds = projectModules.collect {
        case projectModule if projectModule.questionnaireId.isDefined => projectModule.questionnaireId.get
      }
      scenarios <- runIO(query[Scenario].filter(scenario => liftQuery(scenarioIds).contains(scenario.id)))
      questionnaires <- runIO(
        query[Questionnaire].filter(questionnaire => liftQuery(questionnaireIds).contains(questionnaire.id)))
      sampleCompanyIds = scenarios.collect {
        case scenario if scenario.sampleCompanyId.isDefined => scenario.sampleCompanyId.get
      }
      questionnaireQuestions <- IO.traverse(questionnaireIds)(allQuestionnaireQuestionsAction).map(_.flatten)
      scenarioFiles <- IO.traverse(scenarioIds)(allFilesForScenarioAction).map(_.flatten)
      sampleCompanyFiles <- IO.traverse(sampleCompanyIds)(allFilesForSampleCompanyAction).map(_.flatten)
      erpDataPairs <- IO.traverse(sampleCompanyIds)(sampleCompanyId =>
        allErpAction(sampleCompanyId).map((sampleCompanyId, _)))
      allFiles = scenarioFiles ++ sampleCompanyFiles
      fileBinaryFileIds = allFiles.map(_.binaryFileId)
      erpDataItems = erpDataPairs.map { case (_, erpData) => erpData }
      erpBinaryFileIds = erpDataItems.flatMap(_.components.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.customers.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.employees.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.invoices.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.orders.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.orderItems.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.products.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.suppliers.map(_.binaryFileId))
      referenceBookChapterIds <- runIO(
        query[ReferenceBookChapterScenario]
          .filter(referenceBookChapterScenario =>
            liftQuery(scenarioIds).contains(referenceBookChapterScenario.scenarioId))
          .map(_.referenceBookChapterId))
      referenceBookArticles <- runIO(query[ReferenceBookArticle].filter(referenceBookArticle =>
        liftQuery(referenceBookChapterIds).contains(referenceBookArticle.referenceBookChapterId)))
      referenceBookContents <- runIO(query[ReferenceBookContent].filter(referenceBookContent =>
        liftQuery(referenceBookArticles.map(_.id)).contains(referenceBookContent.referenceBookArticleId)))
      questionnaireBinaryFileIds = questionnaires.map(_.binaryFileId) ++ questionnaireQuestions.map(_.binaryFileId)
      referenceBookContentBinaryFileIds = referenceBookContents
        .map(content => content.imageBinaryFileId.orElse(content.videoBinaryFileId).orElse(content.pdfBinaryFileId))
      binaryFileIds =
        (fileBinaryFileIds ++ erpBinaryFileIds ++ questionnaireBinaryFileIds ++ referenceBookContentBinaryFileIds).flatten
      binaryFiles <- runIO(query[BinaryFile].filter(binaryFile => liftQuery(binaryFileIds).contains(binaryFile.id)))
    } yield binaryFiles
    performIO(action)
  }

  def export(surveyId: UUID): Future[Seq[SurveyDataExport]] = {
    val action = for {
      survey <- findSurveyWithoutUserAccountAction(surveyId).flatMap(liftIOOrFail(EntityNotFound))
      project <- findProjectWithoutUserAccountAction(survey.projectId).flatMap(liftIOOrFail(EntityNotFound))
      surveyInvitations <- allSurveyInvitationsAction(surveyId)
      projectModules <- allProjectModulesForSurveyAction(surveyId)
      scenarioIds = projectModules.collect {
        case projectModule if projectModule.scenarioId.isDefined => projectModule.scenarioId.get
      }
      questionnaireIds = projectModules.collect {
        case projectModule if projectModule.questionnaireId.isDefined => projectModule.questionnaireId.get
      }
      scenarios <- runIO(query[Scenario].filter(scenario => liftQuery(scenarioIds).contains(scenario.id)))
      questionnaires <- runIO(
        query[Questionnaire].filter(questionnaire => liftQuery(questionnaireIds).contains(questionnaire.id)))
      questionnaireQuestions <- IO.traverse(questionnaireIds)(allQuestionnaireQuestionsAction).map(_.flatten)
      questionnaireQuestionIds = questionnaireQuestions.map(_.id)
      questionnaireAnswers <- IO.traverse(questionnaireQuestionIds)(allQuestionnaireAnswersAction).map(_.flatten)
      runtimeSurveys <- runIO(
        query[ScenarioQuestionnaire]
          .filter(questionnaire => liftQuery(scenarioIds).contains(questionnaire.scenarioId))
          .flatMap(scenarioQuestionnaire => query[Questionnaire].filter(_.id == scenarioQuestionnaire.questionnaireId))
      )
      runtimeSurveysQuestions <- IO.traverse(runtimeSurveys.map(_.id))(allQuestionnaireQuestionsAction).map(_.flatten)
      runtimeSurveysQuestionIds = runtimeSurveysQuestions.map(_.id)
      runtimeSurveysAnswers <- IO.traverse(runtimeSurveysQuestionIds)(allQuestionnaireAnswersAction).map(_.flatten)
      freetextQuestionCodingCriteria <- IO
        .traverse(questionnaireQuestionIds)(allFreetextQuestionCodingCriteriaAction)
        .map(_.flatten)
      projectModuleExports = projectModules.map(createProjectModuleExport(_, scenarios, questionnaires))
      emails <- IO.traverse(scenarioIds)(allEmailsAction).map(_.flatten)
      sampleCompanyIds = scenarios.collect {
        case scenario if scenario.sampleCompanyId.isDefined => scenario.sampleCompanyId.get
      }
      scenarioDirectories <- IO.traverse(scenarioIds)(allDirectoriesForScenarioAction).map(_.flatten)
      sampleCompanyDirectories <- IO.traverse(sampleCompanyIds)(allDirectoriesForSampleCompanyAction).map(_.flatten)
      allDirectories = scenarioDirectories ++ sampleCompanyDirectories
      scenarioFiles <- IO.traverse(scenarioIds)(allFilesForScenarioAction).map(_.flatten)
      sampleCompanyFiles <- IO.traverse(sampleCompanyIds)(allFilesForSampleCompanyAction).map(_.flatten)
      allFiles = scenarioFiles ++ sampleCompanyFiles
      spreadsheetIds = allFiles.collect { case file if file.spreadsheetId.isDefined => file.spreadsheetId.get }
      textDocumentIds = allFiles.collect { case file if file.textDocumentId.isDefined => file.textDocumentId.get }
      spreadsheets <- runIO(
        allSpreadsheetsQuotation.filter(spreadsheet => liftQuery(spreadsheetIds).contains(spreadsheet.id)))
      textDocuments <- runIO(
        allTextDocumentsQuotation.filter(textDocument => liftQuery(textDocumentIds).contains(textDocument.id)))
      referenceBookChapterIds <- runIO(
        query[ReferenceBookChapterScenario]
          .filter(referenceBookChapterScenario =>
            liftQuery(scenarioIds).contains(referenceBookChapterScenario.scenarioId))
          .map(_.referenceBookChapterId))
      referenceBookChapters <- runIO(query[ReferenceBookChapter].filter(referenceBookChapter =>
        liftQuery(referenceBookChapterIds).contains(referenceBookChapter.id)))
      referenceBookArticles <- runIO(query[ReferenceBookArticle].filter(referenceBookArticle =>
        liftQuery(referenceBookChapterIds).contains(referenceBookArticle.referenceBookChapterId)))
      referenceBookContents <- runIO(query[ReferenceBookContent].filter(referenceBookContent =>
        liftQuery(referenceBookArticles.map(_.id)).contains(referenceBookContent.referenceBookArticleId)))
      sampleCompanies <- runIO(
        query[SampleCompany].filter(sampleCompany => liftQuery(sampleCompanyIds).contains(sampleCompany.id)))
      erpDataPairs <- IO.traverse(sampleCompanyIds)(sampleCompanyId =>
        allErpAction(sampleCompanyId).map((sampleCompanyId, _)))
      surveyEvents <- allSurveyEventsForSurveyAction(surveyId)
      surveyEventsMap = surveyEvents.groupBy(_.invitationId)
      globalSurveyEvents = surveyEventsMap.getOrElse(None, Nil)
      surveyEventsByInvitation = surveyEventsMap.collect { case (Some(invitationId), events) =>
        invitationId -> (events ++ globalSurveyEvents.filter(belongsToParticipant(invitationId, _)))
      }
      fileBinaryFileIds = allFiles.map(_.binaryFileId)
      erpDataItems = erpDataPairs.map { case (_, erpData) => erpData }
      erpBinaryFileIds = erpDataItems.flatMap(_.components.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.customers.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.employees.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.invoices.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.orders.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.orderItems.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.products.map(_.binaryFileId)) ++
        erpDataItems.flatMap(_.suppliers.map(_.binaryFileId))
      questionnaireBinaryFileIds = questionnaires.map(_.binaryFileId) ++ questionnaireQuestions.map(_.binaryFileId)
      referenceBookContentBinaryFileIds = referenceBookContents
        .map(content => content.imageBinaryFileId.orElse(content.videoBinaryFileId).orElse(content.pdfBinaryFileId))
      binaryFileIds =
        (fileBinaryFileIds ++ erpBinaryFileIds ++ questionnaireBinaryFileIds ++ referenceBookContentBinaryFileIds).flatten
      binaryFiles <- runIO(query[BinaryFile].filter(binaryFile => liftQuery(binaryFileIds).contains(binaryFile.id)))
      directoryNames = allDirectories.map(directory => directory.id -> directory.name).toMap
      binaryFilesMap = binaryFiles.groupBy(_.id).view.mapValues(_.head).toMap
      sampleCompanyFilesByDirectory = sampleCompanyFiles.groupBy(_.directoryId)
      sampleCompanyFilesBySampleCompany = sampleCompanyDirectories
        .groupBy(_.sampleCompanyId)
        .collect { case (Some(sampleCompanyId), directories) => sampleCompanyId -> directories }
        .view
        .mapValues(directories =>
          directories.flatMap(directory => sampleCompanyFilesByDirectory.getOrElse(Some(directory.id), Nil)))
      erpExports = erpDataPairs.map { case (sampleCompanyId, erpData) =>
        sampleCompanyId -> createErpExport(erpData, binaryFilesMap)
      }.toMap
      sampleCompanyExports = sampleCompanies.map(sampleCompany =>
        createSampleCompanyExport(
          sampleCompany,
          sampleCompanyFilesBySampleCompany.getOrElse(sampleCompany.id, Nil).map(_.id),
          erpExports(sampleCompany.id)))
      fileExports = allFiles.map(createFileExport(_, directoryNames, binaryFilesMap))
      referenceBookContentExports = referenceBookContents.map(createReferenceBookContentExport(_, binaryFilesMap))
      ratings <- allRatingsAction(surveyId)
      raters <- IO
        .traverse(ratings.map(_.userAccountId))(userAccountId => findUserAccountAction(userAccountId))
        .map(_.flatten)
      scenarioScoringsByInvitation <- createScenarioScoringExportsAction(
        surveyId,
        scenarioIds,
        surveyInvitations,
        projectModuleExports,
        ratings,
        raters)
      freeTextAnswers = createFreetextAnswersForQuestionnaire(
        questionnaireQuestions,
        filterQuestionnaireSurveyEventsForFreetextAnswer(surveyEvents))
      runtimeSurveyFreeTextAnswers = createFreetextAnswersForQuestionnaire(
        runtimeSurveysQuestions,
        filterQuestionnaireSurveyEventsForFreetextAnswer(surveyEvents))
      questionnaireScoringsByInvitation <- createQuestionnaireScoringExportsAction(
        surveyId,
        surveyInvitations.map(_.id),
        projectModuleExports,
        questionnaireQuestions,
        freeTextAnswers,
        binaryFilesMap,
        ratings,
        raters)
      interventions <- IO
        .traverse(scenarioIds)(scenarioId => allInterventionsAction(scenarioId).map(_.map(toInterventionBase)))
        .map(_.flatten)
    } yield surveyInvitations.map(invitation =>
      SurveyDataExport(
        surveyInvitation =
          createSurveyInvitationExport(invitation, surveyEventsByInvitation.getOrElse(invitation.id, Nil)),
        surveyEvents = surveyEventsByInvitation
          .getOrElse(invitation.id, Nil)
          .filter(_.invitationId.isDefined)
          .map(createSurveyEventExport(_, invitation)),
        survey = createSurveyExport(survey),
        project = createProjectExport(project, projectModuleExports),
        scoring = ScoringExport(
          scenarioScorings = scenarioScoringsByInvitation(invitation.id),
          questionnaireScorings = questionnaireScoringsByInvitation(invitation.id)),
        sampleCompanies = sampleCompanyExports,
        emails = emails,
        directories = allDirectories,
        files = fileExports,
        spreadsheets = spreadsheets,
        textDocuments = textDocuments,
        referenceBookChapters = referenceBookChapters,
        referenceBookArticles = referenceBookArticles,
        referenceBookContents = referenceBookContentExports,
        binaryFiles = binaryFiles,
        scenarios = scenarios.map(createScenarioExport),
        questionnaires = createQuestionnaireExport(
          invitation.id,
          questionnaires,
          questionnaireQuestions,
          questionnaireAnswers,
          surveyEventsByInvitation.getOrElse(invitation.id, Nil),
          freetextQuestionCodingCriteria,
          freeTextAnswers
        ),
        runtimeSurveys = createQuestionnaireExport(
          invitation.id,
          runtimeSurveys,
          runtimeSurveysQuestions,
          runtimeSurveysAnswers,
          surveyEventsByInvitation.getOrElse(invitation.id, Nil),
          Seq(),
          runtimeSurveyFreeTextAnswers
        ),
        interventions = interventions
      ))

    performIO(action)
  }

  private def createSurveyInvitationExport(invitation: SurveyInvitation, surveyEvents: Seq[SurveyEvent]) = {
    val firstSurveyEventTimestamp = surveyEvents.headOption.map(_.timestamp)
    val lastSurveyEventTimestamp = surveyEvents.lastOption.map(_.timestamp)
    SurveyInvitationExport(
      id = invitation.id,
      token = invitation.token,
      firstSurveyEventTimestamp = firstSurveyEventTimestamp,
      lastSurveyEventTimestamp = lastSurveyEventTimestamp,
      isUserAccountParticipation = invitation.userAccountId.isDefined,
      isOpenParticipation = invitation.isOpenParticipation
    )
  }

  private def createScenarioExport(scenario: Scenario): ScenarioExport =
    ScenarioExport(
      id = scenario.id,
      name = scenario.name,
      description = scenario.description,
      completionEmailAddress = scenario.completionEmailAddress,
      introductionEmailId = scenario.introductionEmailId
    )

  private def createSurveyEventExport(event: SurveyEvent, invitation: SurveyInvitation) = {
    val data = event.eventType match {
      case SurveyEventType.UpdateSpreadsheetCellValue | SurveyEventType.UpdateSpreadsheetCellType |
          SurveyEventType.UpdateSpreadsheetCellStyle | SurveyEventType.SelectSpreadsheetCell |
          SurveyEventType.SelectSpreadsheetCellRange =>
        event.data
          .flatMap(SurveyEventService.decodeData(_, event.eventType).toOption)
          .flatMap {
            case data: models.UpdateSpreadsheetCellValue =>
              event.data.flatMap(
                addProperties(_, Seq(("cellName", Excel.indexToCellName(data.rowIndex, data.columnIndex)))))
            case data: models.UpdateSpreadsheetCellType =>
              event.data.flatMap(
                addProperties(_, Seq(("cellName", Excel.indexToCellName(data.rowIndex, data.columnIndex)))))
            case data: models.UpdateSpreadsheetCellStyle =>
              event.data.flatMap(
                addProperties(_, Seq(("cellName", Excel.indexToCellName(data.rowIndex, data.columnIndex)))))
            case data: models.SelectSpreadsheetCell =>
              event.data.flatMap(
                addProperties(_, Seq(("cellName", Excel.indexToCellName(data.rowIndex, data.columnIndex)))))
            case data: models.SelectSpreadsheetCellRange =>
              val properties = Seq(
                ("startCellName", Excel.indexToCellName(data.startCellRowIndex, data.startCellColumnIndex)),
                ("endCellName", Excel.indexToCellName(data.endCellRowIndex, data.endCellColumnIndex))
              )
              event.data.flatMap(addProperties(_, properties))
            case _ =>
              event.data
          }
      case _ =>
        event.data
    }

    SurveyEventExport(
      timestamp = event.timestamp,
      eventType = event.eventType,
      data = data,
      surveyId = event.surveyId,
      index = event.index,
      invitationId = invitation.id,
      invitationToken = invitation.token
    )
  }

  private def createSurveyExport(survey: Survey) = SurveyExport(
    id = survey.id,
    title = survey.title,
    description = survey.description,
    authenticationType = survey.authenticationType,
    isOpenParticipationEnabled = survey.isOpenParticipationEnabled
  )

  private def createProjectExport(project: Project, projectModuleExports: Seq[ProjectModuleExport]) =
    ProjectExport(project.id, project.name, project.description, projectModuleExports)

  private def createProjectModuleExport(
      projectModule: ProjectModule,
      scenarios: Seq[Scenario],
      questionnaires: Seq[Questionnaire]) = {
    val scenario = projectModule.scenarioId.flatMap(scenarioId => scenarios.find(_.id == scenarioId))
    val questionnaire =
      projectModule.questionnaireId.flatMap(questionnaireId => questionnaires.find(_.id == questionnaireId))
    val title = scenario.map(_.name).orElse(questionnaire.map(_.title)).getOrElse("")

    ProjectModuleExport(
      id = projectModule.id,
      title = title,
      position = projectModule.position,
      scenarioId = projectModule.scenarioId,
      questionnaireId = projectModule.questionnaireId,
      sampleCompanyId = scenario.flatMap(_.sampleCompanyId),
      binaryFileId = questionnaire.flatMap(_.binaryFileId)
    )
  }

  private def createReferenceBookContentExport(
      referenceBookContent: ReferenceBookContent,
      binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFileId = referenceBookContent.imageBinaryFileId
      .orElse(referenceBookContent.videoBinaryFileId)
      .orElse(referenceBookContent.pdfBinaryFileId)
    val binaryFile = binaryFileId.flatMap(binaryFilesMap.get)

    ReferenceBookContentExport(
      id = referenceBookContent.id,
      position = referenceBookContent.position,
      contentType = referenceBookContent.contentType,
      text = referenceBookContent.text,
      referenceBookArticleId = referenceBookContent.referenceBookArticleId,
      binaryFileId = binaryFileId,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createSampleCompanyExport(sampleCompany: SampleCompany, fileIds: Seq[UUID], erp: ErpExport) =
    SampleCompanyExport(sampleCompany.id, sampleCompany.name, sampleCompany.description, fileIds, erp)

  private def createErpExport(erpData: ErpData, binaryFilesMap: Map[UUID, BinaryFile]) =
    ErpExport(
      components = erpData.components.map(createErpComponentExport(_, binaryFilesMap)),
      componentProducts = erpData.componentProducts,
      customers = erpData.customers.map(createErpCustomerExport(_, binaryFilesMap)),
      employees = erpData.employees.map(createErpEmployeeExport(_, binaryFilesMap)),
      invoices = erpData.invoices.map(createErpInvoiceExport(_, binaryFilesMap)),
      orderItems = erpData.orderItems.map(createErpOrderItemExport(_, binaryFilesMap)),
      orders = erpData.orders.map(createErpOrderExport(_, binaryFilesMap)),
      products = erpData.products.map(createErpProductExport(_, binaryFilesMap)),
      suppliers = erpData.suppliers.map(createErpSupplierExport(_, binaryFilesMap))
    )

  private def createErpComponentExport(erpComponent: ErpComponent, binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = erpComponent.binaryFileId.flatMap(binaryFilesMap.get)

    ErpComponentExport(
      id = erpComponent.id,
      name = erpComponent.name,
      category = erpComponent.category,
      purchasingPriceInCents = erpComponent.purchasingPriceInCents,
      margin = erpComponent.margin,
      sampleCompanyId = erpComponent.sampleCompanyId,
      supplierId = erpComponent.supplierId,
      packSize = erpComponent.packSize,
      availableStock = erpComponent.availableStock,
      stockCostPerUnitInCents = erpComponent.stockCostPerUnitInCents,
      stockCostTotalInCents = erpComponent.stockCostTotalInCents,
      binaryFileId = erpComponent.binaryFileId,
      unit = erpComponent.unit,
      note = erpComponent.note,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createErpCustomerExport(erpCustomer: ErpCustomer, binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = erpCustomer.binaryFileId.flatMap(binaryFilesMap.get)

    ErpCustomerExport(
      id = erpCustomer.id,
      salutation = erpCustomer.salutation,
      firstName = erpCustomer.firstName,
      lastName = erpCustomer.lastName,
      company = erpCustomer.company,
      addressLine = erpCustomer.addressLine,
      postalCode = erpCustomer.postalCode,
      city = erpCustomer.city,
      country = erpCustomer.country,
      email = erpCustomer.email,
      phone = erpCustomer.phone,
      note = erpCustomer.note,
      sampleCompanyId = erpCustomer.sampleCompanyId,
      binaryFileId = erpCustomer.binaryFileId,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createErpEmployeeExport(erpEmployee: ErpEmployee, binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = erpEmployee.binaryFileId.flatMap(binaryFilesMap.get)

    ErpEmployeeExport(
      id = erpEmployee.id,
      salutation = erpEmployee.salutation,
      firstName = erpEmployee.firstName,
      lastName = erpEmployee.lastName,
      addressLine = erpEmployee.addressLine,
      postalCode = erpEmployee.postalCode,
      city = erpEmployee.city,
      country = erpEmployee.country,
      email = erpEmployee.email,
      phone = erpEmployee.phone,
      department = erpEmployee.department,
      jobTitle = erpEmployee.jobTitle,
      employmentMode = erpEmployee.employmentMode,
      employedAt = erpEmployee.employedAt,
      employmentEndsAt = erpEmployee.employmentEndsAt,
      site = erpEmployee.site,
      graduation = erpEmployee.graduation,
      furtherEducation = erpEmployee.furtherEducation,
      taxClass = erpEmployee.taxClass,
      familyStatus = erpEmployee.familyStatus,
      childCount = erpEmployee.childCount,
      sampleCompanyId = erpEmployee.sampleCompanyId,
      binaryFileId = erpEmployee.binaryFileId,
      note = erpEmployee.note,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createErpInvoiceExport(erpInvoice: ErpInvoice, binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = erpInvoice.binaryFileId.flatMap(binaryFilesMap.get)

    ErpInvoiceExport(
      id = erpInvoice.id,
      invoiceDate = erpInvoice.invoiceDate,
      dueDate = erpInvoice.dueDate,
      paymentTerms = erpInvoice.paymentTerms,
      amountPaidInCents = erpInvoice.amountPaidInCents,
      paymentStatus = erpInvoice.paymentStatus,
      reminderFeeInCents = erpInvoice.reminderFeeInCents,
      defaultChargesInCents = erpInvoice.defaultChargesInCents,
      note = erpInvoice.note,
      sampleCompanyId = erpInvoice.sampleCompanyId,
      orderId = erpInvoice.orderId,
      totalNetInCents = erpInvoice.totalNetInCents,
      totalGrossInCents = erpInvoice.totalGrossInCents,
      taxAmountInCents = erpInvoice.taxAmountInCents,
      binaryFileId = erpInvoice.binaryFileId,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createErpOrderExport(erpOrder: ErpOrder, binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = erpOrder.binaryFileId.flatMap(binaryFilesMap.get)

    ErpOrderExport(
      id = erpOrder.id,
      cashbackInCents = erpOrder.cashbackInCents,
      discountInCents = erpOrder.discountInCents,
      deliveryChargeInCents = erpOrder.deliveryChargeInCents,
      deliveryStatus = erpOrder.deliveryStatus,
      deliveryDate = erpOrder.deliveryDate,
      note = erpOrder.note,
      sampleCompanyId = erpOrder.sampleCompanyId,
      customerId = erpOrder.customerId,
      employeeId = erpOrder.employeeId,
      binaryFileId = erpOrder.binaryFileId,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createErpOrderItemExport(erpOrderItem: ErpOrderItem, binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = erpOrderItem.binaryFileId.flatMap(binaryFilesMap.get)

    ErpOrderItemExport(
      id = erpOrderItem.id,
      quantity = erpOrderItem.quantity,
      sampleCompanyId = erpOrderItem.sampleCompanyId,
      orderId = erpOrderItem.orderId,
      productId = erpOrderItem.productId,
      totalNetInCents = erpOrderItem.totalNetInCents,
      binaryFileId = erpOrderItem.binaryFileId,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createErpProductExport(erpProduct: ErpProduct, binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = erpProduct.binaryFileId.flatMap(binaryFilesMap.get)

    ErpProductExport(
      id = erpProduct.id,
      name = erpProduct.name,
      netPriceInCents = erpProduct.netPriceInCents,
      taxRate = erpProduct.taxRate,
      sampleCompanyId = erpProduct.sampleCompanyId,
      binaryFileId = erpProduct.binaryFileId,
      unit = erpProduct.unit,
      note = erpProduct.note,
      packSize = erpProduct.packSize,
      availableStock = erpProduct.availableStock,
      stockCostPerUnitInCents = erpProduct.stockCostPerUnitInCents,
      stockCostTotalInCents = erpProduct.stockCostTotalInCents,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createErpSupplierExport(erpSupplier: ErpSupplier, binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = erpSupplier.binaryFileId.flatMap(binaryFilesMap.get)

    ErpSupplierExport(
      id = erpSupplier.id,
      firstName = erpSupplier.firstName,
      lastName = erpSupplier.lastName,
      company = erpSupplier.company,
      addressLine = erpSupplier.addressLine,
      postalCode = erpSupplier.postalCode,
      city = erpSupplier.city,
      country = erpSupplier.country,
      email = erpSupplier.email,
      phone = erpSupplier.phone,
      note = erpSupplier.note,
      sampleCompanyId = erpSupplier.sampleCompanyId,
      binaryFileId = erpSupplier.binaryFileId,
      salutation = erpSupplier.salutation,
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createFileExport(file: File, directoryNames: Map[UUID, String], binaryFilesMap: Map[UUID, BinaryFile]) = {
    val binaryFile = file.binaryFileId.flatMap(binaryFilesMap.get)

    FileExport(
      id = file.id,
      usageType = file.usageType,
      name = file.name,
      relevance = file.relevance,
      tags = file.tags,
      directoryId = file.directoryId,
      emailId = file.emailId,
      binaryFileId = file.binaryFileId,
      spreadsheetId = file.spreadsheetId,
      textDocumentId = file.textDocumentId,
      directoryName = file.directoryId.flatMap(directoryNames.get),
      binaryFileSize = binaryFile.map(_.fileSize),
      binaryFileMimeType = binaryFile.map(_.mimeType)
    )
  }

  private def createScenarioScoringExportsAction(
      surveyId: UUID,
      scenarioIds: Seq[UUID],
      surveyInvitations: Seq[SurveyInvitation],
      projectModuleExports: Seq[ProjectModuleExport],
      ratings: Seq[Rating],
      raters: Seq[UserAccount]) =
    for {
      codingModels <- runIO(
        allCodingModelsQuotation.filter(codingModel => liftQuery(scenarioIds).contains(codingModel.scenarioId)))
      (dimensions, automatedItems, manualItems, automatedCriteria, manualCriteria) <- IO
        .traverse(codingModels.map(_.id))(scenarioCodingEntitiesAction)
        .map(codingEntities =>
          (
            codingEntities.flatMap { case (dimensions, _, _, _, _) => dimensions },
            codingEntities.flatMap { case (_, automatedItems, _, _, _) => automatedItems },
            codingEntities.flatMap { case (_, _, manualItems, _, _) => manualItems },
            codingEntities.flatMap { case (_, _, _, automatedCriteria, _) => automatedCriteria },
            codingEntities.flatMap { case (_, _, _, _, manualCriteria) => manualCriteria }
          ))
      rScriptEvaluationResults <- IO.traverse(surveyInvitations)(surveyInvitation =>
        runIO(allRScriptEvaluationResultsQuotation.filter(_.invitationId == lift(surveyInvitation.id))))
      ratingsWithCodingCriterionSelectionsByInvitation: Seq[
        (Rating, Map[UUID, Seq[ScenarioRatingCriterionSelection]])] <-
        IO.traverse(ratings)(rating => codingCriterionSelectionsByInvitationAction(rating.id).map((rating, _)))
    } yield createScenarioScoringExports(
      surveyInvitations,
      projectModuleExports,
      codingModels,
      dimensions,
      automatedItems,
      manualItems,
      automatedCriteria,
      manualCriteria,
      ratingsWithCodingCriterionSelectionsByInvitation,
      raters,
      rScriptEvaluationResults.flatten
    )

  private def scenarioCodingEntitiesAction(codingModelId: UUID) =
    for {
      dimensions <- allCodingDimensionsAction(codingModelId)
      items <- IO.traverse(dimensions.map(_.id))(allCodingItemsAction).map(_.flatten)
      (automatedItems, manualItems) = items.partition(_.isAutomated)
      automatedCriteria <- IO
        .traverse(automatedItems.map(_.id))(allScenarioCodingAutomatedCriteriaAction)
        .map(_.flatten)
      manualCriteria <- IO.traverse(manualItems.map(_.id))(allCodingCriteriaAction).map(_.flatten)
    } yield (dimensions, automatedItems, manualItems, automatedCriteria, manualCriteria)

  private def codingCriterionSelectionsByInvitationAction(ratingId: UUID) =
    for {
      scenarioCodingItemRatings <- allScenarioCodingItemRatingsAction(ratingId)
      criterionSelections <- runIO(
        query[ScenarioRatingCriterionSelection]
          .filter(criterion =>
            liftQuery(scenarioCodingItemRatings.map(_.id)).contains(criterion.scenarioCodingItemRatingId)))
    } yield criterionSelections
      .groupBy(_.scenarioCodingItemRatingId)
      .map { case (scenarioCodingItemRatingId, selections) =>
        scenarioCodingItemRatings.find(_.id == scenarioCodingItemRatingId).get.surveyInvitationId -> selections
      }

  private def createScenarioScoringExports(
      surveyInvitations: Seq[SurveyInvitation],
      projectModuleExports: Seq[ProjectModuleExport],
      codingModels: Seq[CodingModel],
      dimensions: Seq[CodingDimension],
      automatedItems: Seq[CodingItem],
      manualItems: Seq[CodingItem],
      automatedCriteria: Seq[ScenarioCodingAutomatedCriterion],
      manualCriteria: Seq[CodingCriterion],
      ratingsWithCodingCriterionSelectionsByInvitation: Seq[(Rating, Map[UUID, Seq[ScenarioRatingCriterionSelection]])],
      raters: Seq[UserAccount],
      rScriptEvaluationResults: Seq[RScriptEvaluationResult]) = {
    val dimensionsByModel = dimensions.groupBy(_.codingModelId)
    val automatedItemsByDimension = automatedItems.groupBy(_.dimensionId)
    val manualItemsByDimension = manualItems.groupBy(_.dimensionId)
    val automatedCriteriaByItem = automatedCriteria.groupBy(_.itemId)
    val manualCriteriaByItem = manualCriteria.groupBy(_.itemId)
    val rScriptEvaluationResultsByInvitationId = rScriptEvaluationResults.groupBy(_.invitationId)

    def createCodingDimensionExportForInvitationIdAndRating(
        dimension: CodingDimension,
        criterionSelections: Seq[ScenarioRatingCriterionSelection],
        rScriptEvaluationResultForInvitationId: Seq[RScriptEvaluationResult]) = {
      val selectedAutomatedCriterionIdsByInvitation = criterionSelections
        .collect {
          case selection if selection.automatedCriterionId.isDefined => selection.automatedCriterionId.get
        }
      val selectedManualCriterionIdsByInvitation = criterionSelections
        .collect {
          case selection if selection.manualCriterionId.isDefined => selection.manualCriterionId.get
        }

      CodingDimensionExport(
        dimension.title,
        dimension.description,
        dimension.parentDimensionId,
        manualItemsByDimension
          .getOrElse(dimension.id, Nil)
          .map(item =>
            createCodingItemExport(
              item,
              manualCriteriaByItem
                .getOrElse(item.id, Nil)
                .map(criterion => CriterionInfo(criterion.id, criterion.description, criterion.score, None)),
              selectedManualCriterionIdsByInvitation
            )),
        automatedItemsByDimension
          .getOrElse(dimension.id, Nil)
          .map(item =>
            createCodingItemExport(
              item,
              automatedCriteriaByItem
                .getOrElse(item.id, Nil)
                .map(criterion =>
                  CriterionInfo(
                    criterion.id,
                    criterion.rule.toString,
                    criterion.score,
                    rScriptEvaluationResultForInvitationId.find(r => r.criterionId == criterion.id))),
              selectedAutomatedCriterionIdsByInvitation
            ))
      )
    }

    surveyInvitations
      .map(invitation =>
        invitation.id ->
          projectModuleExports
            .filter(_.scenarioId.isDefined)
            .map(projectModule =>
              ScenarioScoringExport(
                projectModuleId = projectModule.id,
                scenarioId = projectModule.scenarioId.get,
                title = projectModule.title,
                position = projectModule.position,
                ratings = ratingsWithCodingCriterionSelectionsByInvitation.map {
                  case (rating, codingCriterionSelectionsByInvitation) =>
                    RatingWithCodingDimensionExport(
                      id = rating.id,
                      rater = raters.find(_.id == rating.userAccountId).map(userAccountToUserExport),
                      isFinalScore = rating.isFinalScore,
                      dimensions = codingModels
                        .find(_.scenarioId == projectModule.scenarioId.get)
                        .map(codingModel => dimensionsByModel.getOrElse(codingModel.id, Nil))
                        .getOrElse(Nil)
                        .map(dimension =>
                          createCodingDimensionExportForInvitationIdAndRating(
                            dimension,
                            codingCriterionSelectionsByInvitation.getOrElse(invitation.id, Seq()),
                            rScriptEvaluationResultsByInvitationId.getOrElse(invitation.id, Seq())))
                    )
                }
              )))
      .toMap
  }

  private def createCodingItemExport(
      item: CodingItem,
      criterionInfos: Seq[CriterionInfo],
      selectedCriterionIds: Seq[UUID]) =
    CodingItemExport(
      item.title,
      item.description,
      criterionInfos
        .map(criterionInfo =>
          CodingCriterionExport(
            id = criterionInfo.id,
            criterionInfo.description,
            if (selectedCriterionIds.contains(criterionInfo.id)) {
              criterionInfo.score
            }
            else {
              noRatingAvailableScore
            },
            criterionInfo.rScriptEvaluationResult.map(rScriptEvaluationResult =>
              RScriptEvaluationResultExport(
                criterionId = rScriptEvaluationResult.criterionId,
                status = rScriptEvaluationResult.status,
                criterionFulfilled = rScriptEvaluationResult.criterionFulfilled,
                probability = rScriptEvaluationResult.probability,
                threshold = rScriptEvaluationResult.threshold,
                functionName = rScriptEvaluationResult.functionName,
                criterionNo = rScriptEvaluationResult.criterionNo,
                resultData = rScriptEvaluationResult.resultData
              ))
          ))
    )

  private def createQuestionnaireExport(
      surveyInvitationId: UUID,
      questionnaires: Seq[Questionnaire],
      questions: Seq[QuestionnaireQuestion],
      answers: Seq[QuestionnaireAnswer],
      surveyEventsForParticipant: Seq[SurveyEvent],
      freetextQuestionCodingCriteria: Seq[FreetextQuestionCodingCriterion],
      freeTextAnswers: Seq[FreetextAnswer]): Seq[QuestionnaireExport] = {
    val questionsByQuestionnaire = questions.groupBy(_.questionnaireId)
    val answersByQuestion = answers.groupBy(_.questionId)
    val freetextQuestionCodingCriteriaByQuestion = freetextQuestionCodingCriteria.groupBy(_.questionId)
    val sortedSurveyEventsForParticipant = surveyEventsForParticipant.sortBy(_.index)
    questionnaires.map(questionnaire =>
      QuestionnaireExport(
        id = questionnaire.id,
        title = questionnaire.title,
        description = questionnaire.description,
        questionnaireType = questionnaire.questionnaireType,
        maxDurationInSeconds = questionnaire.maxDurationInSeconds,
        questions = questionsByQuestionnaire
          .get(questionnaire.id)
          .map(questionsOfQuestionnaire =>
            questionsOfQuestionnaire.map(question =>
              QuestionnaireQuestionExport(
                id = question.id,
                text = question.text,
                questionType = question.questionType,
                position = question.position,
                answers = answersByQuestion
                  .getOrElse(question.id, Seq())
                  .map(a =>
                    QuestionnaireAnswerExport(
                      id = a.id,
                      text = a.text,
                      isCorrect = a.isCorrect,
                      position = a.position)),
                selectedAnswerIds =
                  selectedAnswersForParticipant(question, sortedSurveyEventsForParticipant).selectedAnswerIds,
                freeTextAnswer = freeTextAnswers.find(freeTextAnswer =>
                  freeTextAnswer.questionId == question.id && freeTextAnswer.surveyInvitationId == surveyInvitationId),
                freetextQuestionCodingCriteria = freetextQuestionCodingCriteriaByQuestion
                  .getOrElse(question.id, Seq())
                  .map(c =>
                    FreetextQuestionCodingCriterionExport(id = c.id, description = c.description, score = c.score)),
                isAdditionalFreeTextAnswerEnabled = question.isAdditionalFreeTextAnswerEnabled
              )))
          .getOrElse(Seq())
      ))
  }

  private def createQuestionnaireScoringExportsAction(
      surveyId: UUID,
      invitationIds: Seq[UUID],
      projectModuleExports: Seq[ProjectModuleExport],
      questions: Seq[QuestionnaireQuestion],
      freeTextAnswers: Seq[FreetextAnswer],
      binaryFilesMap: Map[UUID, BinaryFile],
      ratings: Seq[Rating],
      raters: Seq[UserAccount]) = {
    val questionnaireProjectModulesExports = projectModuleExports.filter(_.questionnaireId.isDefined)
    val questionnaireIds = questionnaireProjectModulesExports.map(_.questionnaireId.get)
    val questionsByQuestionnaire = questions.groupBy(_.questionnaireId)
    val freeTextAnswersByInvitationId = freeTextAnswers.groupBy(_.surveyInvitationId)

    val questionExportInfosAction =
      IO
      .sequence(
        invitationIds.map(invitationId =>
          IO.sequence(questionnaireIds.map { questionnaireId =>
            val questions = questionsByQuestionnaire.getOrElse(questionnaireId, Nil)
            IO.sequence(questions.map { question =>
              val binaryFile = question.binaryFileId.flatMap(binaryFilesMap.get)

              IO.sequence(
                ratings.map(rating =>
                  questionnaireQuestionScoreForRatingAction(
                    surveyId = surveyId,
                    ratingId = rating.id,
                    surveyInvitationId = invitationId,
                    question = question).map(questionIntermediateScore =>
                    QuestionExportInfo(
                      invitationId,
                      questionnaireId,
                      QuestionScoringExport(
                        id = question.id,
                        title = question.text,
                        position = question.position,
                        binaryFileId = question.binaryFileId,
                        binaryFileSize = binaryFile.map(_.fileSize),
                        binaryFileMimeType = binaryFile.map(_.mimeType),
                        ratingId = rating.id,
                        score = questionIntermediateScore.scoreTuple.score.getOrElse(noRatingAvailableScore),
                        scoringType = question.scoringType,
                        freeTextAnswer =
                          freeTextAnswersByInvitationId.get(invitationId).flatMap(_.find(_.questionId == question.id)),
                        selectedAnswerIds = questionIntermediateScore match {
                          case score: QuestionIntermediateScoreClosed => score.selectedAnswerIds
                          case _ => Seq()
                        },
                        selectedCriteriaIds = questionIntermediateScore match {
                          case score: QuestionIntermediateScoreFreeText => score.selectedCriteriaIds
                          case _ => Seq()
                        },
                        noCriterionFulfilled = questionIntermediateScore match {
                          case score: QuestionIntermediateScoreFreeText => Some(score.noCriterionFulfilled)
                          case _ => None
                        }
                      )
                    ))))
            }).map(_.flatten)
          }).map(_.flatten)))
      .map(_.flatten)

    questionExportInfosAction.map { questionExportInfos =>
      val questionExportInfosByInvitationByQuestionnaire = questionExportInfos
        .groupBy(_.invitationId)
        .view
        .mapValues(_.groupBy(_.questionnaireId))

      invitationIds.map { invitationId =>
        val questionScoreInfosForInvitation =
          questionExportInfosByInvitationByQuestionnaire.getOrElse(invitationId, Map.empty)
        val exports = questionnaireProjectModulesExports.map { projectModule =>
          val questionnaireId = projectModule.questionnaireId.get
          val questionScoreInfosForQuestionnaire = questionScoreInfosForInvitation.getOrElse(questionnaireId, Nil)
          val questionExports = questionScoreInfosForQuestionnaire.map(_.questionExport)
          val binaryFile = projectModule.binaryFileId.flatMap(binaryFilesMap.get)
          val questionExportsByRatingId = questionExports.groupBy(_.ratingId)

          QuestionnaireScoringExport(
            projectModuleId = projectModule.id,
            questionnaireId = questionnaireId,
            title = projectModule.title,
            position = projectModule.position,
            binaryFileId = projectModule.binaryFileId,
            binaryFileSize = binaryFile.map(_.fileSize),
            binaryFileMimeType = binaryFile.map(_.mimeType),
            ratings = questionExportsByRatingId.map { case (ratingId, questionExports) =>
              val rating = ratings
                .find(_.id == ratingId)
              QuestionnaireRatingExport(
                ratingId = ratingId,
                rater = rating
                  .map(_.userAccountId)
                  .flatMap(userId => raters.find(_.id == userId))
                  .map(userAccountToUserExport),
                isFinalScore = rating.exists(_.isFinalScore),
                questions = questionExports
              )
            }.toList
          )
        }
        invitationId -> exports
      }.toMap
    }
  }

  private def belongsToParticipant(invitationId: UUID, surveyEvent: SurveyEvent) = surveyEvent.eventType match {
    case SurveyEventType.SendSupervisorChatMessage =>
      surveyEvent.data
        .flatMap(data => SurveyEventService.decodeData(data, surveyEvent.eventType).toOption)
        .exists {
          case data: SendSupervisorChatMessage =>
            data.recipientInvitationId == invitationId
          case _ =>
            true
        }
    case _ =>
      true
  }

  private def userAccountToUserExport(userAccount: UserAccount): UserExport =
    UserExport(
      id = userAccount.id,
      email = userAccount.email,
      firstName = userAccount.firstName,
      lastName = userAccount.lastName,
      organization = userAccount.organization
    )

  private val noRatingAvailableScore = -99

  case class QuestionExportInfo(invitationId: UUID, questionnaireId: UUID, questionExport: QuestionScoringExport)

  case class CriterionInfo(
      id: UUID,
      description: String,
      score: Int,
      rScriptEvaluationResult: Option[RScriptEvaluationResult])
}
