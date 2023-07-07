package services.helpers

import database.generated.public._
import enums.AutomatedCodingItemRule.ToolUsage
import enums.EmailDirectory.Inbox
import enums.FileUsageType.FileSystem
import enums.MimeType.ImageJpeg
import enums.OfficeTool.Calculator
import enums.QuestionType.SingleChoice
import enums.ReferenceBookContentType.TextContent
import enums.Relevance.{PotentiallyHelpful, Required}
import enums.Salutation.Mrs
import enums.ScoringType.Analytical
import enums.SurveyExecutionType.AutomaticAsynchronous
import enums.UsageField.Company
import enums._
import models._
import services._
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class CreationUtils @Inject() (
    binaryFileService: BinaryFileService,
    codingModelService: CodingModelService,
    codingDimensionService: CodingDimensionService,
    codingItemService: CodingItemService,
    codingCriterionService: CodingCriterionService,
    directoryService: DirectoryService,
    emailService: EmailService,
    fileService: FileService,
    freetextQuestionCodingCriterionService: FreetextQuestionCodingCriterionService,
    freetextQuestionRatingCriterionSelectionService: FreetextQuestionRatingCriterionSelectionService,
    freetextQuestionRatingService: FreetextQuestionRatingService,
    interventionService: InterventionService,
    projectModuleService: ProjectModuleService,
    projectService: ProjectService,
    questionnaireService: QuestionnaireService,
    questionnaireQuestionService: QuestionnaireQuestionService,
    questionnaireAnswerService: QuestionnaireAnswerService,
    ratingService: RatingService,
    referenceBookChapterService: ReferenceBookChapterService,
    referenceBookArticleService: ReferenceBookArticleService,
    referenceBookContentService: ReferenceBookContentService,
    referenceBookChapterScenarioService: ReferenceBookChapterScenarioService,
    scenarioService: ScenarioService,
    scenarioCodingAutomatedCriterionService: ScenarioCodingAutomatedCriterionService,
    scenarioCodingItemRatingService: ScenarioCodingItemRatingService,
    scenarioQuestionnaireService: ScenarioQuestionnaireService,
    scenarioRatingCriterionSelectionService: ScenarioRatingCriterionSelectionService,
    surveyService: SurveyService,
    surveyInvitationService: SurveyInvitationService,
    userAccountService: UserAccountService,
    sampleCompanyService: SampleCompanyService) {

  def createDirectory(parentDirectoryId: Option[UUID], scenarioId: Option[UUID]): Directory =
    createDirectories(parentDirectoryId, scenarioId, 1).head

  def createDirectories(parentDirectoryId: Option[UUID], scenarioId: Option[UUID], count: Int): Seq[Directory] =
    (1 to count).map { n =>
      val creation = DirectoryCreation(s"directory-$n", parentDirectoryId, scenarioId, None)
      Await.result(directoryService.create(creation), Duration.Inf)
    }

  def createFile(directoryId: Option[UUID], emailId: Option[UUID], binaryFileId: UUID): File =
    createFiles(directoryId, emailId, binaryFileId, 1).head

  def createFiles(directoryId: Option[UUID], emailId: Option[UUID], binaryFileId: UUID, count: Int): Seq[File] =
    (1 to count).map { n =>
      val creation =
        FileCreation(FileSystem, s"file-$n", Required, Nil, directoryId, emailId, Some(binaryFileId), None, None)
      Await.result(fileService.create(creation), Duration.Inf)
    }

  def createEmail(scenarioId: UUID): Email =
    createEmails(1, scenarioId).head

  def createEmails(count: Int, scenarioId: UUID, relevance: Relevance = PotentiallyHelpful): Seq[Email] =
    (1 to count).map { n =>
      val creation = EmailCreation(
        sender = Some("sender"),
        recipient = None,
        ccRecipients = Nil,
        subject = s"subject-$n",
        directory = Inbox,
        receptionDelayInSeconds = 0,
        isInitiallyRead = false,
        relevance = relevance,
        message = s"message-$n",
        scenarioId = scenarioId
      )
      Await.result(emailService.createEmail(creation), Duration.Inf)
    }

  def createIntervention(scenarioId: UUID, interventionEmailId: UUID, fileId: UUID): InterventionBase =
    createInterventions(1, scenarioId, interventionEmailId, fileId).head

  def createInterventions(
      count: Int,
      scenarioId: UUID,
      interventionEmailId: UUID,
      fileId: UUID): Seq[InterventionBase] =
    (1 to count).map { n =>
      val creation = FileOpeningInterventionCreation(
        title = s"title-$n",
        timeOffsetInSeconds = 60 * n,
        scenarioId = scenarioId,
        interventionEmailId = interventionEmailId,
        fileId = fileId
      )
      Await.result(interventionService.create(creation), Duration.Inf)
    }

  def createBinaryFile: BinaryFile = {
    val creation = BinaryFileCreation("binary-file", 1024, ImageJpeg)
    Await.result(binaryFileService.create(creation), Duration.Inf)
  }

  def createCodingModel(scenarioId: UUID): CodingModel =
    createCodingModels(scenarioId, 1).head

  def createCodingModels(scenarioId: UUID, count: Int): Seq[CodingModel] = {
    val creation = CodingModelCreation(title = "title", description = "description", scenarioId = scenarioId)
    (1 to count).map(_ => Await.result(codingModelService.create(creation), Duration.Inf))
  }

  def createCodingDimension(codingModelId: UUID, parentDimensionId: Option[UUID]): CodingDimension =
    createCodingDimensions(codingModelId, parentDimensionId, 1).head

  def createCodingDimensions(codingModelId: UUID, parentDimensionId: Option[UUID], count: Int): Seq[CodingDimension] = {
    val creation = CodingDimensionCreation(
      title = "title",
      description = "description",
      codingModelId = codingModelId,
      parentDimensionId = parentDimensionId)
    (1 to count).map(_ => Await.result(codingDimensionService.create(creation), Duration.Inf))
  }

  def createManualCodingItem(dimensionId: UUID, scoringType: ScoringType = Analytical): CodingItemBase =
    createManualCodingItems(1, dimensionId, scoringType).head

  def createManualCodingItems(
      count: Int,
      dimensionId: UUID,
      scoringType: ScoringType = Analytical): Seq[CodingItemBase] = {
    val creation = ManualCodingItemCreation(
      title = "title",
      description = "description",
      scoringType = scoringType,
      dimensionId = dimensionId)
    (1 to count).map(_ => Await.result(codingItemService.create(creation), Duration.Inf))
  }

  def createAutomatedCodingItem(dimensionId: UUID): CodingItemBase =
    createAutomatedCodingItems(1, dimensionId).head

  def createAutomatedCodingItems(count: Int, dimensionId: UUID): Seq[CodingItemBase] = {
    val creation = AutomatedCodingItemCreation(
      title = "title",
      description = "description",
      rule = ToolUsage,
      dimensionId = dimensionId)
    (1 to count).map(_ => Await.result(codingItemService.create(creation), Duration.Inf))
  }

  def createManualCodingCriterion(itemId: UUID, score: Int = 1): CodingCriterion =
    createManualCodingCriteria(1, itemId, score).head

  def createManualCodingCriteria(count: Int, itemId: UUID, score: Int = 1): Seq[CodingCriterion] = {
    val creation = CodingCriterionCreation(description = "description", score = score, itemId = itemId)
    (1 to count).map(_ => Await.result(codingCriterionService.createCodingCriterion(creation), Duration.Inf))
  }

  def createScenarioCodingAutomatedCodingCriterion(itemId: UUID, score: Int = 1): ScenarioCodingAutomatedCriterionBase =
    createScenarioCodingAutomatedCodingCriteria(1, itemId, score).head

  def createScenarioCodingAutomatedCodingCriteria(
      count: Int,
      itemId: UUID,
      score: Int = 1): Seq[ScenarioCodingAutomatedCriterionBase] = {
    val creation =
      ToolUsageScenarioCodingAutomatedCriterionCreation(score = score, itemId = itemId, officeTool = Calculator)
    (1 to count).map(_ => Await.result(scenarioCodingAutomatedCriterionService.create(creation), Duration.Inf))
  }

  def createScenarioRatingCriterionSelection(
      scenarioCodingItemRatingId: UUID,
      manualCriterionId: Option[UUID],
      automatedCriterionId: Option[UUID]): ScenarioRatingCriterionSelection =
    createScenarioRatingCriterionSelections(1, scenarioCodingItemRatingId, manualCriterionId, automatedCriterionId).head

  def createScenarioRatingCriterionSelections(
      count: Int,
      scenarioCodingItemRatingId: UUID,
      manualCriterionId: Option[UUID],
      automatedCriterionId: Option[UUID]): Seq[ScenarioRatingCriterionSelection] = {
    val creation =
      ScenarioRatingCriterionSelectionCreation(scenarioCodingItemRatingId, manualCriterionId, automatedCriterionId)
    (1 to count).map(_ => Await.result(scenarioRatingCriterionSelectionService.create(creation), Duration.Inf))
  }

  def createProjectModule(projectId: UUID, scenarioId: Option[UUID], questionnaireId: Option[UUID]): ProjectModule =
    createProjectModules(projectId, scenarioId, questionnaireId, 1).head

  def createProjectModules(
      projectId: UUID,
      scenarioId: Option[UUID],
      questionnaireId: Option[UUID],
      count: Int): Seq[ProjectModule] = {
    val creation = ProjectModuleCreation(
      projectId = projectId,
      moduleType = if (scenarioId.isDefined) ProjectModuleType.Scenario else ProjectModuleType.Questionnaire,
      scenarioId = scenarioId,
      questionnaireId = questionnaireId
    )
    (1 to count).map(_ => Await.result(projectModuleService.create(creation), Duration.Inf))
  }

  def createProject(userAccountId: UUID): Project =
    createProjects(userAccountId, 1).head

  def createProjects(userAccountId: UUID, count: Int): Seq[Project] =
    (1 to count).map { n =>
      val creation = ProjectCreation(s"project-$n", s"description-$n", Company, s"audience-$n", "welcome text")
      Await.result(projectService.create(userAccountId)(creation), Duration.Inf)
    }

  def createQuestionnaire(userAccountId: UUID): Questionnaire =
    createQuestionnaires(userAccountId, 1).head

  def createQuestionnaires(userAccountId: UUID, count: Int): Seq[Questionnaire] =
    (1 to count).map { n =>
      val creation = QuestionnaireCreation(
        title = s"title-$n",
        description = s"description-$n",
        questionnaireType = QuestionnaireType.Global,
        binaryFileId = None
      )
      Await.result(questionnaireService.create(creation, userAccountId), Duration.Inf)
    }

  def createQuestionnaireQuestion(
      questionnaireId: UUID,
      questionType: QuestionType = SingleChoice,
      score: Int = 1): QuestionnaireQuestion =
    createQuestionnaireQuestions(1, questionnaireId, questionType, score).head

  def createQuestionnaireQuestions(
      count: Int,
      questionnaireId: UUID,
      questionType: QuestionType = SingleChoice,
      score: Int = 1): Seq[QuestionnaireQuestion] =
    (1 to count).map { n =>
      val creation = QuestionnaireQuestionCreation(
        text = s"text-$n",
        questionType = questionType,
        isAdditionalFreeTextAnswerEnabled = false,
        binaryFileId = None,
        scoringType = QuestionScoringType.Analytical,
        score = score,
        questionnaireId = questionnaireId
      )
      Await.result(questionnaireQuestionService.create(creation), Duration.Inf)
    }

  def createQuestionnaireAnswer(questionId: UUID, isCorrect: Boolean = false): QuestionnaireAnswer =
    createQuestionnaireAnswers(1, questionId, isCorrect).head

  def createQuestionnaireAnswers(count: Int, questionId: UUID, isCorrect: Boolean = false): Seq[QuestionnaireAnswer] =
    (1 to count).map { n =>
      val creation = QuestionnaireAnswerCreation(
        text = s"text-$n",
        isCorrect = isCorrect,
        questionId = questionId
      )
      Await.result(questionnaireAnswerService.create(creation), Duration.Inf)
    }

  def createRating(userAccountId: UUID, surveyId: UUID, isFinalScore: Boolean = false): Rating =
    createRatings(1, userAccountId, surveyId, isFinalScore).head

  def createRatings(count: Int, userAccountId: UUID, surveyId: UUID, isFinalScore: Boolean = false): Seq[Rating] =
    (1 to count).map { _ =>
      val creation = RatingCreation(
        surveyId = surveyId,
        isFinalScore = isFinalScore
      )
      Await.result(ratingService.create(creation, userAccountId), Duration.Inf)
    }

  def createScenarioCodingItemRating(
      ratingId: UUID,
      codingItemId: UUID,
      surveyInvitationId: UUID,
      noCriterionFulfilled: Boolean = false): ScenarioCodingItemRating =
    createScenarioCodingItemRatings(1, ratingId, codingItemId, surveyInvitationId, noCriterionFulfilled).head

  def createScenarioCodingItemRatings(
      count: Int,
      ratingId: UUID,
      codingItemId: UUID,
      surveyInvitationId: UUID,
      noCriterionFulfilled: Boolean = false): Seq[ScenarioCodingItemRating] =
    (1 to count).map { _ =>
      val creation = ScenarioCodingItemRatingCreation(
        ratingId = ratingId,
        codingItemId = codingItemId,
        surveyInvitationId = surveyInvitationId,
        noCriterionFulfilled = noCriterionFulfilled
      )
      Await.result(scenarioCodingItemRatingService.create(creation), Duration.Inf)
    }

  def createScenarioQuestionnaire(scenarioId: UUID, questionnaireId: UUID): ScenarioQuestionnaire =
    createScenarioQuestionnaires(1, scenarioId, questionnaireId).head

  def createScenarioQuestionnaires(count: Int, scenarioId: UUID, questionnaireId: UUID): Seq[ScenarioQuestionnaire] =
    (1 to count).map { _ =>
      val creation = ScenarioQuestionnaireCreation(
        scenarioId = scenarioId,
        questionnaireId = questionnaireId,
        activationDelayInSeconds = 1
      )
      Await.result(scenarioQuestionnaireService.create(creation), Duration.Inf)
    }

  def createFreetextQuestionRatingCriterionSelection(
      freetextQuestionRatingId: UUID,
      criterionId: UUID): FreetextQuestionRatingCriterionSelection =
    createFreetextQuestionRatingCriterionSelections(1, freetextQuestionRatingId, criterionId).head

  def createFreetextQuestionRatingCriterionSelections(
      count: Int,
      freetextQuestionRatingId: UUID,
      criterionId: UUID): Seq[FreetextQuestionRatingCriterionSelection] =
    (1 to count).map { _ =>
      val creation = FreetextQuestionRatingCriterionSelectionCreation(
        freetextQuestionRatingId = freetextQuestionRatingId,
        criterionId = criterionId
      )
      Await.result(freetextQuestionRatingCriterionSelectionService.create(creation), Duration.Inf)
    }

  def createFreetextQuestionRating(
      ratingId: UUID,
      questionId: UUID,
      surveyInvitationId: UUID,
      noCriterionFulfilled: Boolean = false): FreetextQuestionRating =
    createFreetextQuestionRatings(1, ratingId, questionId, surveyInvitationId, noCriterionFulfilled).head

  def createFreetextQuestionRatings(
      count: Int,
      ratingId: UUID,
      questionId: UUID,
      surveyInvitationId: UUID,
      noCriterionFulfilled: Boolean = false): Seq[FreetextQuestionRating] =
    (1 to count).map { _ =>
      val creation = FreetextQuestionRatingCreation(
        ratingId = ratingId,
        questionId = questionId,
        surveyInvitationId = surveyInvitationId,
        noCriterionFulfilled = noCriterionFulfilled
      )
      Await.result(freetextQuestionRatingService.create(creation), Duration.Inf)
    }

  def createFreetextQuestionCodingCriterion(questionId: UUID, score: Int = 1): FreetextQuestionCodingCriterion =
    createFreetextQuestionCodingCriteria(1, questionId, score).head

  def createFreetextQuestionCodingCriteria(
      count: Int,
      questionId: UUID,
      score: Int = 1): Seq[FreetextQuestionCodingCriterion] =
    (1 to count).map { n =>
      val creation = FreetextQuestionCodingCriterionCreation(
        description = s"description-$n",
        score = score,
        questionId = questionId
      )
      Await.result(freetextQuestionCodingCriterionService.create(creation), Duration.Inf)
    }

  def createScenario(userAccountId: UUID, completionEmailAddress: Option[String] = None): Scenario =
    createScenarios(1, userAccountId, completionEmailAddress).head

  def createScenarios(count: Int, userAccountId: UUID, completionEmailAddress: Option[String] = None): Seq[Scenario] =
    (1 to count).map { n =>
      val creation = ScenarioCreation(
        date = None,
        name = s"scenario-$n",
        description = s"description-$n",
        maxDurationInSeconds = None,
        introductionEmailId = None,
        shouldDisplayTime = true,
        tags = Seq(),
        completionEmailAddress = completionEmailAddress,
        shouldHideReferenceBookChapters = false,
        sampleCompanyId = None
      )
      Await.result(scenarioService.create(userAccountId)(creation), Duration.Inf)
    }

  def createReferenceBookChapter(userAccountId: UUID): ReferenceBookChapter =
    createReferenceBookChapters(userAccountId, 1).head

  def createReferenceBookChapters(userAccountId: UUID, count: Int): Seq[ReferenceBookChapter] =
    (1 to count).map { n =>
      val creation = ReferenceBookChapterCreation(s"reference-book-chapter-$n", s"description-$n")
      Await.result(referenceBookChapterService.create(userAccountId)(creation), Duration.Inf)
    }

  def createReferenceBookArticle(referenceBookChapterId: UUID): ReferenceBookArticle =
    createReferenceBookArticles(referenceBookChapterId, 1).head

  def createReferenceBookArticles(referenceBookChapterId: UUID, count: Int): Seq[ReferenceBookArticle] =
    (1 to count).map { n =>
      val creation = ReferenceBookArticleCreation(s"article-$n", referenceBookChapterId)
      Await.result(referenceBookArticleService.create(creation), Duration.Inf)
    }

  def createReferenceBookContent(referenceBookArticleId: UUID): ReferenceBookContent =
    createReferenceBookContents(referenceBookArticleId, 1).head

  def createReferenceBookContents(referenceBookArticleId: UUID, count: Int): Seq[ReferenceBookContent] =
    (1 to count).map { n =>
      val creation = ReferenceBookContentCreation(
        TextContent,
        text = Some(s"text-$n"),
        imageBinaryFileId = None,
        pdfBinaryFileId = None,
        videoBinaryFileId = None,
        referenceBookArticleId = referenceBookArticleId)
      Await.result(referenceBookContentService.create(creation), Duration.Inf)
    }

  def createReferenceBookChapterScenario(scenarioId: UUID, referenceBookChapterId: UUID): ReferenceBookChapterScenario =
    createReferenceBookChapterScenarios(scenarioId, Seq(referenceBookChapterId)).head

  def createReferenceBookChapterScenarios(
      scenarioId: UUID,
      referenceBookChapterIds: Seq[UUID]): Seq[ReferenceBookChapterScenario] =
    referenceBookChapterIds.map { referenceBookChapterId =>
      val creation = ReferenceBookChapterScenarioId(
        referenceBookChapterId = referenceBookChapterId,
        scenarioId = scenarioId
      )
      Await.result(referenceBookChapterScenarioService.create(creation), Duration.Inf)
    }

  def createSurvey(
      projectId: UUID,
      startsAt: Option[Instant] = Some(DateUtils.now.minusSeconds(60 * 60)),
      endsAt: Option[Instant] = Some(DateUtils.now.plusSeconds(60 * 60))): Survey =
    createSurveys(projectId, startsAt, endsAt, 1).head

  def createSurveys(
      projectId: UUID,
      startsAt: Option[Instant] = Some(DateUtils.now.minusSeconds(60 * 60)),
      endsAt: Option[Instant] = Some(DateUtils.now.plusSeconds(60 * 60)),
      count: Int): Seq[Survey] =
    (1 to count).map { n =>
      val creation = SurveyCreation(
        title = s"title-$n",
        description = s"description-$n",
        startsAt = startsAt,
        endsAt = endsAt,
        authenticationType = AuthenticationType.OnlyRegistered,
        isTestSurvey = true,
        isOpenParticipationEnabled = false,
        projectId = projectId,
        executionType = AutomaticAsynchronous
      )
      Await.result(surveyService.create(creation), Duration.Inf)
    }

  def createSurveyInvitation(projectId: UUID): SurveyInvitation =
    createSurveyInvitations(projectId, 1).head

  def createSurveyInvitations(surveyId: UUID, count: Int): Seq[SurveyInvitation] = {
    val creations = (1 to count).map(n =>
      SurveyInvitationCreation(
        email = s"email-$n",
        surveyId = surveyId,
        userAccountId = None
      ))
    Await.result(surveyInvitationService.createBulk(creations), Duration.Inf)
  }

  def createUserAccount: UserAccount =
    createUserAccounts(1).head

  def createUserAccounts(count: Int): Seq[UserAccount] =
    (1 to count).map { n =>
      val creation =
        UserAccountCreation(s"email-$n", "password", "firstName", "lastName", "organization", Mrs, hasConfirmedBackofficeTermsAndConditions = true)
      Await.result(userAccountService.create(creation), Duration.Inf)
    }

  def createSampleCompany(userAccount: UserAccount): SampleCompany = createSampleCompanies(userAccount, 1).head

  def createSampleCompanies(userAccount: UserAccount, count: Int): Seq[SampleCompany] =
    (1 to count).map { n =>
      val creation = SampleCompanyCreation(s"name-$n", "description", Seq(), None, None, None, None)
      Await.result(sampleCompanyService.create(userAccount.id)(creation), Duration.Inf)
    }
}
