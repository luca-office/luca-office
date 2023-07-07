package graphql

import database.generated.public._
import models._
import sangria.macros.derive._
import sangria.schema.{
  fields,
  BooleanType,
  Field,
  IntType,
  InterfaceType,
  ListType,
  ObjectType,
  OptionType,
  OutputType,
  StringType
}
import services.AutomatedCodingCriterionEvaluationResult

import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class OutputObjectTypes @Inject() (implicit executionContext: ExecutionContext) {
  import CommonOutputObjectTypes._
  import EnumTypes._
  import ErpOutputObjectTypes._
  import ScalarAliases._

  // https://github.com/sangria-graphql/sangria/pull/306

  implicit def interfaceLookup[T](implicit interfaceType: InterfaceType[_, T]): GraphQLOutputTypeLookup[T] =
    new GraphQLOutputTypeLookup[T] {
      override def graphqlType: OutputType[T] = interfaceType
    }

  implicit val AutomatedCodingCriterionEvaluationResultObjectType
      : ObjectType[ContextBase, AutomatedCodingCriterionEvaluationResult] =
    deriveObjectType[ContextBase, AutomatedCodingCriterionEvaluationResult]()
  implicit val CodingCriterionObjectType: ObjectType[ContextBase, CodingCriterion] =
    deriveObjectType[ContextBase, CodingCriterion]()
  implicit val CompletionEmailWordCountObjectType: ObjectType[ContextBase, CompletionEmailWordCount] =
    deriveObjectType[ContextBase, CompletionEmailWordCount]()
  implicit val DirectoryContentObjectType: ObjectType[ContextBase, Directory] =
    deriveObjectType[ContextBase, Directory]()
  implicit val EmailObjectType: ObjectType[ContextBase, Email] = deriveObjectType[ContextBase, Email]()
  implicit val FreetextAnswerObjectType: ObjectType[ContextBase, FreetextAnswer] =
    deriveObjectType[ContextBase, FreetextAnswer]()
  implicit val FreetextQuestionCodingCriterionObjectType: ObjectType[ContextBase, FreetextQuestionCodingCriterion] =
    deriveObjectType[ContextBase, FreetextQuestionCodingCriterion]()
  implicit val FreetextQuestionRatingCriterionSelectionObjectType
      : ObjectType[ContextBase, FreetextQuestionRatingCriterionSelection] =
    deriveObjectType[ContextBase, FreetextQuestionRatingCriterionSelection]()
  implicit val ProjectModuleStartObjectType: ObjectType[ContextBase, ProjectModuleStart] =
    deriveObjectType[ContextBase, ProjectModuleStart]()
  implicit val QuestionnaireAnswerObjectType: ObjectType[ContextBase, QuestionnaireAnswer] =
    deriveObjectType[ContextBase, QuestionnaireAnswer]()
  implicit val ScenarioDocumentsObjectType: ObjectType[ContextBase, ScenarioDocuments] =
    deriveObjectType[ContextBase, ScenarioDocuments]()
  implicit val ScenarioRatingCriterionSelectionObjectType: ObjectType[ContextBase, ScenarioRatingCriterionSelection] =
    deriveObjectType[ContextBase, ScenarioRatingCriterionSelection]()
  implicit val SurveyParticipationInfoObjectType: ObjectType[ContextBase, SurveyParticipationInfo] =
    deriveObjectType[ContextBase, SurveyParticipationInfo]()
  implicit val ParticipantProjectModuleProgressObjectType: ObjectType[ContextBase, ParticipantProjectModuleProgress] =
    deriveObjectType[ContextBase, ParticipantProjectModuleProgress]()
  implicit val ParticipantQuestionnaireSurveyResultObjectType
      : ObjectType[ContextBase, ParticipantQuestionnaireSurveyResult] =
    deriveObjectType[ContextBase, ParticipantQuestionnaireSurveyResult]()
  implicit val ParticipantDataObjectType: ObjectType[ContextBase, ParticipantData] =
    deriveObjectType[ContextBase, ParticipantData]()
  implicit val ParticipantQuestionSurveyResultObjectType: ObjectType[ContextBase, ParticipantQuestionSurveyResult] =
    deriveObjectType[ContextBase, ParticipantQuestionSurveyResult]()
  implicit val ParticipantScenarioSurveyResultObjectType: ObjectType[ContextBase, ParticipantScenarioSurveyResult] =
    deriveObjectType[ContextBase, ParticipantScenarioSurveyResult]()
  implicit val ParticipantCodingItemSurveyResultObjectType: ObjectType[ContextBase, ParticipantCodingItemSurveyResult] =
    deriveObjectType[ContextBase, ParticipantCodingItemSurveyResult]()
  implicit val PeriodObjectType: ObjectType[ContextBase, Period] =
    deriveObjectType[ContextBase, Period]()
  implicit val ProjectModuleProgressObjectType: ObjectType[ContextBase, ProjectModuleProgress] =
    deriveObjectType[ContextBase, ProjectModuleProgress]()
  implicit val ProjectProjectUserAccountObjectType: ObjectType[ContextBase, ProjectUserAccount] =
    deriveObjectType[ContextBase, ProjectUserAccount]()
  implicit val RuntimeSurveyResultObjectType: ObjectType[ContextBase, RuntimeSurveyResult] =
    deriveObjectType[ContextBase, RuntimeSurveyResult]()
  implicit val RuntimeSurveyQuestionResultObjectType: ObjectType[ContextBase, RuntimeSurveyQuestionResult] =
    deriveObjectType[ContextBase, RuntimeSurveyQuestionResult]()
  implicit val RuntimeSurveyAnswerSelectionObjectType: ObjectType[ContextBase, RuntimeSurveyAnswerSelection] =
    deriveObjectType[ContextBase, RuntimeSurveyAnswerSelection]()
  implicit val RuntimeSurveyParticipantResultObjectType: ObjectType[ContextBase, RuntimeSurveyParticipantResult] =
    deriveObjectType[ContextBase, RuntimeSurveyParticipantResult]()
  implicit val ReferenceBookChapterScenarioObjectType: ObjectType[ContextBase, ReferenceBookChapterScenario] =
    deriveObjectType[ContextBase, ReferenceBookChapterScenario]()
  implicit val ScenarioSampleCompanyFileObjectType: ObjectType[ContextBase, ScenarioSampleCompanyFile] =
    deriveObjectType[ContextBase, ScenarioSampleCompanyFile]()
  implicit val ScenarioUserAccountObjectType: ObjectType[ContextBase, ScenarioUserAccount] =
    deriveObjectType[ContextBase, ScenarioUserAccount]()
  implicit val SpreadsheetCellObjectType: ObjectType[ContextBase, SpreadsheetCell] =
    deriveObjectType[ContextBase, SpreadsheetCell]()
  implicit val SurveyEventObjectType: ObjectType[ContextBase, SurveyEvent] =
    deriveObjectType[ContextBase, SurveyEvent]()
  implicit val SurveyUserAccountObjectType: ObjectType[ContextBase, SurveyUserAccount] =
    deriveObjectType[ContextBase, SurveyUserAccount]()
  implicit val TextDocumentObjectType: ObjectType[ContextBase, TextDocument] =
    deriveObjectType[ContextBase, TextDocument]()
  implicit val ParticipantResultObjectType: ObjectType[ContextBase, ParticipantResult] =
    deriveObjectType[ContextBase, ParticipantResult]()
  implicit val ParticipantResultsObjectType: ObjectType[ContextBase, ParticipantResults] =
    deriveObjectType[ContextBase, ParticipantResults]()
  implicit val ParticipantProjectModuleResultObjectType: ObjectType[ContextBase, ParticipantProjectModuleResult] =
    deriveObjectType[ContextBase, ParticipantProjectModuleResult]()
  implicit val ProjectModuleResultObjectType: ObjectType[ContextBase, ProjectModuleResult] =
    deriveObjectType[ContextBase, ProjectModuleResult]()
  implicit val ProjectModuleResultsObjectType: ObjectType[ContextBase, ProjectModuleResults] =
    deriveObjectType[ContextBase, ProjectModuleResults]()
  implicit val ProjectModuleSurveyEventsObjectType: ObjectType[ContextBase, ProjectModuleSurveyEvents] =
    deriveObjectType[ContextBase, ProjectModuleSurveyEvents]()
  implicit val SurveyInvitationAndEventsObjectType: ObjectType[ContextBase, SurveyInvitationAndEvents] =
    deriveObjectType[ContextBase, SurveyInvitationAndEvents]()
  implicit val SurveyResultsOverviewObjectType: ObjectType[ContextBase, SurveyResultsOverview] =
    deriveObjectType[ContextBase, SurveyResultsOverview]()

  implicit val ProjectModuleScoreInterfaceType: InterfaceType[ContextBase, ProjectModuleScore] =
    InterfaceType(
      name = "ProjectModuleScore",
      fields = fields[ContextBase, ProjectModuleScore](
        Field("score", OptionType(IntType), resolve = _.value.score),
        Field("maximumScore", IntType, resolve = _.value.maximumScore)
      )
    )

  implicit val ScenarioScoreObjectType: ObjectType[ContextBase, ScenarioScore] =
    deriveObjectType[ContextBase, ScenarioScore](Interfaces(ProjectModuleScoreInterfaceType))

  implicit val QuestionnaireScoreObjectType: ObjectType[ContextBase, QuestionnaireScore] =
    deriveObjectType[ContextBase, QuestionnaireScore](Interfaces(ProjectModuleScoreInterfaceType))

  implicit val ChatMessageInterfaceType: InterfaceType[ContextBase, ChatMessage] =
    InterfaceType(
      name = "ChatMessage",
      fields = fields[ContextBase, ChatMessage](
        Field("timestamp", InstantType, resolve = _.value.timestamp),
        Field("message", StringType, resolve = _.value.message)
      )
    )

  implicit val SendParticipantChatMessageObjectType: ObjectType[ContextBase, ParticipantChatMessage] =
    deriveObjectType[ContextBase, ParticipantChatMessage](Interfaces(ChatMessageInterfaceType))

  implicit val SendSupervisorChatMessageObjectType: ObjectType[ContextBase, SupervisorChatMessage] =
    deriveObjectType[ContextBase, SupervisorChatMessage](Interfaces(ChatMessageInterfaceType))

  implicit val ErpComponentObjectType: ObjectType[ContextBase, ErpComponent] =
    deriveObjectType[ContextBase, ErpComponent](
      AddFields(
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        )
      )
    )

  implicit val ErpComponentErpProductObjectType: ObjectType[ContextBase, ErpComponentErpProduct] =
    deriveObjectType[ContextBase, ErpComponentErpProduct]()

  implicit val ErpCustomerObjectType: ObjectType[ContextBase, ErpCustomer] =
    deriveObjectType[ContextBase, ErpCustomer](
      AddFields(
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        )
      )
    )

  implicit val ErpEmployeeObjectType: ObjectType[ContextBase, ErpEmployee] =
    deriveObjectType[ContextBase, ErpEmployee](
      AddFields(
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        )
      )
    )

  implicit val ErpInvoiceObjectType: ObjectType[ContextBase, ErpInvoice] =
    deriveObjectType[ContextBase, ErpInvoice](
      AddFields(
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        )
      )
    )

  implicit val ErpOrderObjectType: ObjectType[ContextBase, ErpOrder] = deriveObjectType[ContextBase, ErpOrder](
    AddFields(
      Field(
        name = "binaryFile",
        fieldType = OptionType(BinaryFileObjectType),
        resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
      )
    )
  )

  implicit val ErpOrderItemObjectType: ObjectType[ContextBase, ErpOrderItem] =
    deriveObjectType[ContextBase, ErpOrderItem](
      AddFields(
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        )
      )
    )

  implicit val ErpProductObjectType: ObjectType[ContextBase, ErpProduct] =
    deriveObjectType[ContextBase, ErpProduct](
      AddFields(
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        )
      )
    )

  implicit val ErpSupplierObjectType: ObjectType[ContextBase, ErpSupplier] =
    deriveObjectType[ContextBase, ErpSupplier](
      AddFields(
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        )
      )
    )

  implicit val FreetextQuestionRatingObjectType: ObjectType[ContextBase, FreetextQuestionRating] =
    deriveObjectType[ContextBase, FreetextQuestionRating](
      AddFields(
        Field(
          name = "criterionSelections",
          fieldType = ListType(FreetextQuestionRatingCriterionSelectionObjectType),
          resolve = context => context.ctx.freetextQuestionRatingCriterionSelectionService.all(context.value.id)
        )
      )
    )

  implicit val ScenarioCodingItemRatingObjectType: ObjectType[ContextBase, ScenarioCodingItemRating] =
    deriveObjectType[ContextBase, ScenarioCodingItemRating](
      AddFields(
        Field(
          name = "criterionSelections",
          fieldType = ListType(ScenarioRatingCriterionSelectionObjectType),
          resolve = context => context.ctx.scenarioRatingCriterionSelectionService.all(context.value.id)
        )
      )
    )

  implicit val RatingObjectType: ObjectType[ContextBase, Rating] =
    deriveObjectType[ContextBase, Rating]()

  implicit val SpreadsheetObjectType: ObjectType[ContextBase, Spreadsheet] =
    deriveObjectType[ContextBase, Spreadsheet](
      AddFields(
        Field(
          name = "cells",
          fieldType = ListType(SpreadsheetCellObjectType),
          resolve = context => context.ctx.spreadsheetCellService.all(context.value.id)
        )
      )
    )

  implicit val FileObjectType: ObjectType[ContextBase, File] = deriveObjectType[ContextBase, File](
    AddFields(
      Field(
        name = "binaryFile",
        fieldType = OptionType(BinaryFileObjectType),
        resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
      ),
      Field(
        name = "binaryFileUrl",
        fieldType = OptionType(StringType),
        resolve = context => context.value.binaryFileId.map(context.ctx.storage.createDownloadUrl)
      ),
      Field(
        name = "spreadsheet",
        fieldType = OptionType(SpreadsheetObjectType),
        resolve = context => runIfDefined(context.value.spreadsheetId, context.ctx.spreadsheetService.find)
      ),
      Field(
        name = "textDocument",
        fieldType = OptionType(TextDocumentObjectType),
        resolve = context => runIfDefined(context.value.textDocumentId, context.ctx.textDocumentService.find)
      )
    )
  )

  implicit val SampleCompanyObjectType: ObjectType[ContextBase, SampleCompany] =
    deriveObjectType[ContextBase, SampleCompany](
      AddFields(
        Field(
          name = "author",
          fieldType = UserAccountObjectType,
          resolve = context => context.ctx.userAccountService.find(context.value.authorId).map(_.get)
        ),
        Field(
          name = "directoryId",
          fieldType = UuidType,
          resolve = context => context.ctx.directoryService.findIdForSampleCompany(context.value.id).map(_.get)
        ),
        Field(
          name = "filesCount",
          fieldType = IntType,
          resolve = context => context.ctx.fileService.allFilesForSampleCompany(context.value.id).map(_.length)
        ),
        Field(
          name = "erpRowsCount",
          fieldType = IntType,
          resolve = context => context.ctx.erpService.rowsCount(context.value.id)
        ),
        Field(
          name = "logoFile",
          fieldType = OptionType(FileObjectType),
          resolve = context => runIfDefined(context.value.logoFileId, context.ctx.fileService.find)
        ),
        Field(
          name = "profileFile",
          fieldType = OptionType(FileObjectType),
          resolve = context => runIfDefined(context.value.profileFileId, context.ctx.fileService.find)
        )
      )
    )

  implicit val ScenarioObjectType: ObjectType[ContextBase, Scenario] = deriveObjectType[ContextBase, Scenario](
    AddFields(
      Field(
        name = "author",
        fieldType = UserAccountObjectType,
        resolve = context => context.ctx.userAccountService.find(context.value.authorId).map(_.get)
      ),
      Field(
        name = "introductionEmail",
        fieldType = OptionType(EmailObjectType),
        resolve = context => runIfDefined(context.value.introductionEmailId, context.ctx.emailService.find)
      ),
      Field(
        name = "sampleCompany",
        fieldType = OptionType(SampleCompanyObjectType),
        resolve = context =>
          runIfDefined(context.value.sampleCompanyId, context.ctx.sampleCompanyService.findWithoutUserAccount)
      ),
      Field(
        name = "codingModel",
        fieldType = OptionType(CodingModelObjectType),
        resolve = context => context.ctx.codingModelService.findForScenario(context.value.id)
      )
    )
  )

  implicit val ScenarioCodingAutomatedCriterionObjectType: ObjectType[ContextBase, ScenarioCodingAutomatedCriterion] =
    deriveObjectType[ContextBase, ScenarioCodingAutomatedCriterion]()

  implicit val ScenarioCodingAutomatedCriterionInterfaceType
      : InterfaceType[ContextBase, ScenarioCodingAutomatedCriterionBase] =
    InterfaceType(
      name = "ScenarioCodingAutomatedCriterion",
      fields = fields[ContextBase, ScenarioCodingAutomatedCriterionBase](
        Field("id", UuidType, resolve = _.value.id),
        Field("createdAt", InstantType, resolve = _.value.createdAt),
        Field("modifiedAt", InstantType, resolve = _.value.modifiedAt),
        Field("score", IntType, resolve = _.value.score),
        Field("itemId", UuidType, resolve = _.value.itemId)
      )
    )

  implicit val DocumentViewScenarioCodingAutomatedCriterionObjectType
      : ObjectType[ContextBase, DocumentViewScenarioCodingAutomatedCriterion] =
    deriveObjectType[ContextBase, DocumentViewScenarioCodingAutomatedCriterion](
      Interfaces(ScenarioCodingAutomatedCriterionInterfaceType))

  implicit val FeatureUsageScenarioCodingAutomatedCriterionObjectType
      : ObjectType[ContextBase, FeatureUsageScenarioCodingAutomatedCriterion] =
    deriveObjectType[ContextBase, FeatureUsageScenarioCodingAutomatedCriterion](
      Interfaces(ScenarioCodingAutomatedCriterionInterfaceType))

  implicit val InputValueScenarioCodingAutomatedCriterionObjectType
      : ObjectType[ContextBase, InputValueScenarioCodingAutomatedCriterion] =
    deriveObjectType[ContextBase, InputValueScenarioCodingAutomatedCriterion](
      Interfaces(ScenarioCodingAutomatedCriterionInterfaceType))

  implicit val RScriptScenarioCodingAutomatedCriterionObjectType
      : ObjectType[ContextBase, RScriptScenarioCodingAutomatedCriterion] =
    deriveObjectType[ContextBase, RScriptScenarioCodingAutomatedCriterion](
      Interfaces(ScenarioCodingAutomatedCriterionInterfaceType))

  implicit val ToolUsageScenarioCodingAutomatedCriterionObjectType
      : ObjectType[ContextBase, ToolUsageScenarioCodingAutomatedCriterion] =
    deriveObjectType[ContextBase, ToolUsageScenarioCodingAutomatedCriterion](
      Interfaces(ScenarioCodingAutomatedCriterionInterfaceType))

  implicit val CodingItemInterfaceType: InterfaceType[ContextBase, CodingItemBase] =
    InterfaceType(
      name = "CodingItem",
      fields = fields[ContextBase, CodingItemBase](
        Field("id", UuidType, resolve = _.value.id),
        Field("createdAt", InstantType, resolve = _.value.createdAt),
        Field("modifiedAt", InstantType, resolve = _.value.modifiedAt),
        Field("title", StringType, resolve = _.value.title),
        Field("description", StringType, resolve = _.value.description),
        Field("scoringType", ScoringTypeEnumType, resolve = _.value.scoringType),
        Field("position", BigDecimalType, resolve = _.value.position),
        Field("dimensionId", UuidType, resolve = _.value.dimensionId),
        Field(
          name = "criteriaCount",
          fieldType = LongType,
          resolve = context => context.ctx.codingItemService.criteriaCount(context.value)
        ),
        Field(
          name = "maximumScore",
          fieldType = IntType,
          resolve = context => context.ctx.codingItemService.calculateMaximumScore(context.value)
        )
      )
    )

  implicit val AutomatedCodingItemObjectType: ObjectType[ContextBase, AutomatedCodingItem] =
    deriveObjectType[ContextBase, AutomatedCodingItem](Interfaces(CodingItemInterfaceType))

  implicit val ManualCodingItemObjectType: ObjectType[ContextBase, ManualCodingItem] =
    deriveObjectType[ContextBase, ManualCodingItem](Interfaces(CodingItemInterfaceType))

  implicit val CodingDimensionObjectType: ObjectType[ContextBase, CodingDimension] =
    deriveObjectType[ContextBase, CodingDimension](
      AddFields(
        Field(
          name = "items",
          fieldType = ListType(CodingItemInterfaceType),
          resolve = context => context.ctx.codingItemService.all(context.value.id)
        )
      )
    )

  implicit val CodingModelObjectType: ObjectType[ContextBase, CodingModel] =
    deriveObjectType[ContextBase, CodingModel](
      AddFields(
        Field(
          name = "scenario",
          fieldType = ScenarioObjectType,
          resolve = context => context.ctx.scenarioService.findWithoutUserAccount(context.value.scenarioId).map(_.get)
        ),
        Field(
          name = "dimensionsCount",
          fieldType = LongType,
          resolve = context => context.ctx.codingModelService.dimensionsCount(context.value.id)
        )
      )
    )

  implicit val QuestionnaireQuestionObjectType: ObjectType[ContextBase, QuestionnaireQuestion] =
    deriveObjectType[ContextBase, QuestionnaireQuestion](
      AddFields(
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        ),
        Field(
          name = "answers",
          fieldType = ListType(QuestionnaireAnswerObjectType),
          resolve = context => context.ctx.questionnaireAnswerService.all(context.value.id)
        ),
        Field(
          name = "freetextQuestionCodingCriteria",
          fieldType = ListType(FreetextQuestionCodingCriterionObjectType),
          resolve = context => context.ctx.freetextQuestionCodingCriterionService.all(context.value.id)
        )
      )
    )

  implicit val QuestionnaireObjectType: ObjectType[ContextBase, Questionnaire] =
    deriveObjectType[ContextBase, Questionnaire](
      AddFields(
        Field(
          name = "author",
          fieldType = UserAccountObjectType,
          resolve = context => context.ctx.userAccountService.find(context.value.authorId).map(_.get)
        ),
        Field(
          name = "binaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.binaryFileId, context.ctx.binaryFileService.find)
        ),
        Field(
          name = "questionsCount",
          fieldType = LongType,
          resolve = context => context.ctx.questionnaireService.questionsCount(context.value.id)
        ),
        Field(
          name = "questions",
          fieldType = ListType(QuestionnaireQuestionObjectType),
          resolve = context => context.ctx.questionnaireQuestionService.all(context.value.id)
        )
      )
    )

  implicit val ScenarioQuestionnaireObjectType: ObjectType[ContextBase, ScenarioQuestionnaire] =
    deriveObjectType[ContextBase, ScenarioQuestionnaire](
      AddFields(
        Field(
          name = "questionnaire",
          fieldType = QuestionnaireObjectType,
          resolve =
            context => context.ctx.questionnaireService.findWithoutUserAccount(context.value.questionnaireId).map(_.get)
        )
      )
    )

  implicit val ProjectModuleObjectType: ObjectType[ContextBase, ProjectModule] =
    deriveObjectType[ContextBase, ProjectModule](
      AddFields(
        Field(
          name = "scenario",
          fieldType = OptionType(ScenarioObjectType),
          resolve =
            context => runIfDefined(context.value.scenarioId, context.ctx.scenarioService.findWithoutUserAccount)
        ),
        Field(
          name = "questionnaire",
          fieldType = OptionType(QuestionnaireObjectType),
          resolve = context =>
            runIfDefined(context.value.questionnaireId, context.ctx.questionnaireService.findWithoutUserAccount)
        )
      )
    )

  implicit val SurveyObjectType: ObjectType[ContextBase, Survey] = deriveObjectType[ContextBase, Survey](
    AddFields(
      Field(
        name = "invitationsCount",
        fieldType = LongType,
        resolve = context => context.ctx.surveyService.invitationsCount(context.value.id)
      ),
      Field(
        name = "inProgressParticipationsCount",
        fieldType = LongType,
        resolve = context => context.ctx.surveyService.inProgressParticipationsCount(context.value.id)
      ),
      Field(
        name = "completedParticipationsCount",
        fieldType = LongType,
        resolve = context => context.ctx.surveyService.completedParticipationsCount(context.value.id)
      ),
      Field(
        name = "isCompleted",
        fieldType = BooleanType,
        resolve = context => context.ctx.surveyService.isCompleted(context.value.endsAt)
      ),
      Field(
        name = "isRatingFinalized",
        fieldType = BooleanType,
        resolve = context => context.ctx.surveyService.isRatingFinalized(context.value.id)
      ),
      Field(
        name = "project",
        fieldType = ProjectObjectType,
        resolve = context => context.ctx.projectService.findWithoutUserAccount(context.value.projectId).map(_.get)
      ),
      Field(
        name = "projectModuleProgresses",
        fieldType = ListType(ProjectModuleProgressObjectType),
        resolve = context => context.ctx.surveyService.projectModuleProgresses(context.value.id)
      ),
      Field(
        name = "openParticipationPlayerUrl",
        fieldType = StringType,
        resolve = context => context.ctx.surveyService.openParticipationPlayerUrl(context.value.id)
      ),
      Field(
        name = "manualPeriod",
        fieldType = OptionType(PeriodObjectType),
        resolve = context => context.ctx.surveyService.manualPeriod(context.value.id)
      )
    )
  )

  implicit val SurveyInvitationObjectType: ObjectType[ContextBase, SurveyInvitation] =
    deriveObjectType[ContextBase, SurveyInvitation](
      ExcludeFields("index"),
      AddFields(
        Field(
          name = "participantData",
          fieldType = OptionType(ParticipantDataObjectType),
          resolve = context => context.ctx.surveyInvitationService.participationData(context.value.id)
        ),
        Field(
          name = "projectModuleProgresses",
          fieldType = ListType(ParticipantProjectModuleProgressObjectType),
          resolve = context => context.ctx.surveyInvitationService.projectModuleProgresses(context.value.id, context.value.surveyId)
        ),
        Field(
          name = "survey",
          fieldType = SurveyObjectType,
          resolve = context => context.ctx.surveyService.findWithoutUserAccount(context.value.surveyId).map(_.get)
        ),
        Field(
          name = "userAccount",
          fieldType = OptionType(UserAccountObjectType),
          resolve = context => runIfDefined(context.value.userAccountId, context.ctx.userAccountService.find)
        )
      )
    )

  implicit val ProjectObjectType: ObjectType[ContextBase, Project] = deriveObjectType[ContextBase, Project](
    AddFields(
      Field(
        name = "author",
        fieldType = UserAccountObjectType,
        resolve = context => context.ctx.userAccountService.find(context.value.authorId).map(_.get)
      ),
      Field(
        name = "maxDurationInSeconds",
        fieldType = IntType,
        resolve = context => context.ctx.projectService.calculateMaxDurationInSeconds(context.value.id)
      ),
      Field(
        name = "isFinalized",
        fieldType = BooleanType,
        resolve = context => context.ctx.projectService.isFinalized(context.value.id)
      ),
      Field(
        name = "surveys",
        fieldType = ListType(SurveyObjectType),
        resolve = context => context.ctx.surveyService.allWithoutUserAccount(context.value.id)
      )
    )
  )

  implicit val ReferenceBookContentObjectType: ObjectType[ContextBase, ReferenceBookContent] =
    deriveObjectType[ContextBase, ReferenceBookContent](
      AddFields(
        Field(
          name = "imageUrl",
          fieldType = OptionType(StringType),
          resolve = context => context.value.imageBinaryFileId.map(id => context.ctx.storage.createDownloadUrl(id))
        ),
        Field(
          name = "videoUrl",
          fieldType = OptionType(StringType),
          resolve = context => context.value.videoBinaryFileId.map(id => context.ctx.storage.createDownloadUrl(id))
        ),
        Field(
          name = "imageBinaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.imageBinaryFileId, context.ctx.binaryFileService.find)
        ),
        Field(
          name = "pdfBinaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.pdfBinaryFileId, context.ctx.binaryFileService.find)
        ),
        Field(
          name = "videoBinaryFile",
          fieldType = OptionType(BinaryFileObjectType),
          resolve = context => runIfDefined(context.value.videoBinaryFileId, context.ctx.binaryFileService.find)
        )
      )
    )

  implicit val ReferenceBookArticleObjectType: ObjectType[ContextBase, ReferenceBookArticle] =
    deriveObjectType[ContextBase, ReferenceBookArticle](
      AddFields(
        Field(
          name = "contents",
          fieldType = ListType(ReferenceBookContentObjectType),
          resolve = context => context.ctx.referenceBookContentService.allReferenceBookContents(context.value.id)
        )
      )
    )

  implicit val ReferenceBookChapterObjectType: ObjectType[ContextBase, ReferenceBookChapter] =
    deriveObjectType[ContextBase, ReferenceBookChapter](
      AddFields(
        Field(
          name = "articles",
          fieldType = ListType(ReferenceBookArticleObjectType),
          resolve = context => context.ctx.referenceBookArticleService.allReferenceBookArticles(context.value.id)
        ),
        Field(
          name = "author",
          fieldType = UserAccountObjectType,
          resolve = context => context.ctx.userAccountService.find(context.value.authorId).map(_.get)
        )
      )
    )

  implicit val InterventionInterfaceType: InterfaceType[ContextBase, InterventionBase] =
    InterfaceType(
      name = "Intervention",
      fields = fields[ContextBase, InterventionBase](
        Field("id", UuidType, resolve = _.value.id),
        Field("createdAt", InstantType, resolve = _.value.createdAt),
        Field("modifiedAt", InstantType, resolve = _.value.modifiedAt),
        Field("title", StringType, resolve = _.value.title),
        Field("interventionType", InterventionTypeEnumType, resolve = _.value.interventionType),
        Field("scenarioId", UuidType, resolve = _.value.scenarioId),
        Field("interventionEmailId", UuidType, resolve = _.value.interventionEmailId),
        Field(
          name = "interventionEmail",
          fieldType = EmailObjectType,
          resolve = context => context.ctx.emailService.find(context.value.interventionEmailId).map(_.get)
        )
      )
    )

  implicit val EmailOpeningInterventionObjectType: ObjectType[ContextBase, EmailOpeningIntervention] =
    deriveObjectType[ContextBase, EmailOpeningIntervention](
      Interfaces(InterventionInterfaceType),
      AddFields(
        Field(
          name = "email",
          fieldType = EmailObjectType,
          resolve = context => context.ctx.emailService.find(context.value.emailId).map(_.get)
        )
      )
    )

  implicit val ErpRowOpeningInterventionObjectType: ObjectType[ContextBase, ErpRowOpeningIntervention] =
    deriveObjectType[ContextBase, ErpRowOpeningIntervention](Interfaces(InterventionInterfaceType))

  implicit val FileOpeningInterventionObjectType: ObjectType[ContextBase, FileOpeningIntervention] =
    deriveObjectType[ContextBase, FileOpeningIntervention](
      Interfaces(InterventionInterfaceType),
      AddFields(
        Field(
          name = "file",
          fieldType = FileObjectType,
          resolve = context => context.ctx.fileService.find(context.value.fileId).map(_.get)
        )
      )
    )

  implicit val NotesContentInterventionObjectType: ObjectType[ContextBase, NotesContentIntervention] =
    deriveObjectType[ContextBase, NotesContentIntervention](Interfaces(InterventionInterfaceType))

  implicit val RuntimeSurveyAnswerSelectionInterventionObjectType
      : ObjectType[ContextBase, RuntimeSurveyAnswerSelectionIntervention] =
    deriveObjectType[ContextBase, RuntimeSurveyAnswerSelectionIntervention](
      Interfaces(InterventionInterfaceType),
      AddFields(
        Field(
          name = "answer",
          fieldType = QuestionnaireAnswerObjectType,
          resolve = context => context.ctx.questionnaireAnswerService.find(context.value.answerId).map(_.get)
        )
      )
    )

  implicit val SpreadsheetCellContentInterventionObjectType
      : ObjectType[ContextBase, SpreadsheetCellContentIntervention] =
    deriveObjectType[ContextBase, SpreadsheetCellContentIntervention](
      Interfaces(InterventionInterfaceType),
      AddFields(
        Field(
          name = "file",
          fieldType = FileObjectType,
          resolve = context => context.ctx.fileService.find(context.value.fileId).map(_.get)
        )
      )
    )

  implicit val TextDocumentContentInterventionObjectType: ObjectType[ContextBase, TextDocumentContentIntervention] =
    deriveObjectType[ContextBase, TextDocumentContentIntervention](
      Interfaces(InterventionInterfaceType),
      AddFields(
        Field(
          name = "file",
          fieldType = FileObjectType,
          resolve = context => context.ctx.fileService.find(context.value.fileId).map(_.get)
        )
      )
    )

  val additionalOutputTypes =
    List(
      EmailOpeningInterventionObjectType,
      ErpRowOpeningInterventionObjectType,
      FileOpeningInterventionObjectType,
      NotesContentInterventionObjectType,
      RuntimeSurveyAnswerSelectionInterventionObjectType,
      SpreadsheetCellContentInterventionObjectType,
      TextDocumentContentInterventionObjectType,
      AutomatedCodingItemObjectType,
      ManualCodingItemObjectType,
      DocumentViewScenarioCodingAutomatedCriterionObjectType,
      FeatureUsageScenarioCodingAutomatedCriterionObjectType,
      InputValueScenarioCodingAutomatedCriterionObjectType,
      RScriptScenarioCodingAutomatedCriterionObjectType,
      ToolUsageScenarioCodingAutomatedCriterionObjectType,
      ScenarioScoreObjectType,
      QuestionnaireScoreObjectType,
      SendParticipantChatMessageObjectType,
      SendSupervisorChatMessageObjectType
    )

  private def runIfDefined[T, U](option: Option[T], action: T => Future[Option[U]]): Future[Option[U]] =
    option match {
      case Some(id) =>
        action(id)
      case _ =>
        Future.successful(None)
    }
}
