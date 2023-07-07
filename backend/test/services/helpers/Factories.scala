package services.helpers

import database.generated.public.UserAccount
import enums.FeatureType.AnswerEmail
import enums.OfficeTool.{EmailClient, SpreadsheetEditor}
import enums.Salutation.Mrs
import enums.SurveyEventType
import models._
import utils.DateUtils

import java.util.UUID

object Factories {

  def documentViewScenarioCodingAutomatedCriterionFactory: DocumentViewScenarioCodingAutomatedCriterion =
    DocumentViewScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      score = 1,
      itemId = UUID.randomUUID(),
      fileId = None,
      emailId = None,
      sampleCompanyId = None,
      erpRowId = None,
      erpTableType = None,
      referenceBookArticleId = None
    )

  def featureUsageScenarioCodingAutomatedCriterionFactory: FeatureUsageScenarioCodingAutomatedCriterion =
    FeatureUsageScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      score = 1,
      itemId = UUID.randomUUID(),
      officeTool = EmailClient,
      featureType = AnswerEmail
    )

  def inputValueScenarioCodingAutomatedCriterionFactory: InputValueScenarioCodingAutomatedCriterion =
    InputValueScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      score = 1,
      itemId = UUID.randomUUID(),
      officeTool = SpreadsheetEditor,
      value = "",
      fileId = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None
    )

  def surveyEventCreationFactory(
      surveyId: UUID,
      surveyInvitationId: UUID,
      eventType: SurveyEventType,
      index: Int,
      data: Option[String] = None): SurveyEventCreation =
    SurveyEventCreation(
      surveyId = surveyId,
      invitationId = surveyInvitationId,
      timestamp = DateUtils.now,
      eventType = eventType,
      index = index,
      data = data
    )

  def userAccountFactory: UserAccount =
    UserAccount(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      email = "email",
      passwordHash = "passwordHash",
      firstName = "firstName",
      lastName = "lastName",
      organization = "organization",
      resetPasswordToken = None,
      salutation = Mrs,
      mayAdministrateUserAccounts = false,
      mayArchive = false,
      mayFinalizeWithoutPublishing = false,
      mayAdministrateRScripts = false,
      isGlobalSuperAdmin = false,
      Some(DateUtils.now)
    )

  def userAccountUpdateFactory: UserAccountUpdate =
    UserAccountUpdate(
      firstName = "firstName",
      lastName = "lastName",
      organization = "organization",
      salutation = Mrs,
      mayAdministrateUserAccounts = false,
      mayArchive = false,
      mayFinalizeWithoutPublishing = false,
      mayAdministrateRScripts = false
    )

  def selectQuestionnaireAnswerFactory: SelectQuestionnaireAnswer =
    SelectQuestionnaireAnswer(
      questionnaireId = UUID.randomUUID(),
      scenarioId = None,
      questionId = UUID.randomUUID(),
      questionPosition = 1,
      answerId = UUID.randomUUID(),
      answerPosition = 1,
      value = ""
    )

  def deselectQuestionnaireAnswerFactory: DeselectQuestionnaireAnswer =
    DeselectQuestionnaireAnswer(
      questionnaireId = UUID.randomUUID(),
      scenarioId = None,
      questionId = UUID.randomUUID(),
      questionPosition = 1,
      answerId = UUID.randomUUID(),
      answerPosition = 1,
      value = ""
    )
}
