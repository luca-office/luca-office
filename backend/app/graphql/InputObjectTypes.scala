package graphql

import models._
import sangria.macros.derive.deriveInputObjectType

object InputObjectTypes {
  import EnumTypes._
  import ScalarAliases._

  implicit val CodingCriterionCreationObjectType = deriveInputObjectType[CodingCriterionCreation]()
  implicit val CodingCriterionUpdateObjectType = deriveInputObjectType[CodingCriterionUpdate]()

  implicit val DocumentViewScenarioCodingAutomatedCriterionCreationObjectType =
    deriveInputObjectType[DocumentViewScenarioCodingAutomatedCriterionCreation]()
  implicit val DocumentViewScenarioCodingAutomatedCriterionUpdateObjectType =
    deriveInputObjectType[DocumentViewScenarioCodingAutomatedCriterionUpdate]()

  implicit val FeatureUsageScenarioCodingAutomatedCriterionCreationObjectType =
    deriveInputObjectType[FeatureUsageScenarioCodingAutomatedCriterionCreation]()
  implicit val FeatureUsageScenarioCodingAutomatedCriterionUpdateObjectType =
    deriveInputObjectType[FeatureUsageScenarioCodingAutomatedCriterionUpdate]()

  implicit val InputValueScenarioCodingAutomatedCriterionCreationObjectType =
    deriveInputObjectType[InputValueScenarioCodingAutomatedCriterionCreation]()
  implicit val InputValueScenarioCodingAutomatedCriterionUpdateObjectType =
    deriveInputObjectType[InputValueScenarioCodingAutomatedCriterionUpdate]()

  implicit val RScriptScenarioCodingAutomatedCriterionCreationObjectType =
    deriveInputObjectType[RScriptScenarioCodingAutomatedCriterionCreation]()
  implicit val RScriptScenarioCodingAutomatedCriterionUpdateObjectType =
    deriveInputObjectType[RScriptScenarioCodingAutomatedCriterionUpdate]()

  implicit val ToolUsageScenarioCodingAutomatedCriterionCreationObjectType =
    deriveInputObjectType[ToolUsageScenarioCodingAutomatedCriterionCreation]()
  implicit val ToolUsageScenarioCodingAutomatedCriterionUpdateObjectType =
    deriveInputObjectType[ToolUsageScenarioCodingAutomatedCriterionUpdate]()

  implicit val CodingDimensionCreationObjectType = deriveInputObjectType[CodingDimensionCreation]()
  implicit val CodingDimensionUpdateObjectType = deriveInputObjectType[CodingDimensionUpdate]()

  implicit val AutomatedCodingItemCreationObjectType = deriveInputObjectType[AutomatedCodingItemCreation]()
  implicit val AutomatedCodingItemUpdateObjectType = deriveInputObjectType[AutomatedCodingItemUpdate]()

  implicit val ManualCodingItemCreationObjectType = deriveInputObjectType[ManualCodingItemCreation]()
  implicit val ManualCodingItemUpdateObjectType = deriveInputObjectType[ManualCodingItemUpdate]()

  implicit val CodingModelCreationObjectType = deriveInputObjectType[CodingModelCreation]()
  implicit val CodingModelUpdateObjectType = deriveInputObjectType[CodingModelUpdate]()

  implicit val DirectoryCreationInputObjectType = deriveInputObjectType[DirectoryCreation]()
  implicit val DirectoryUpdateInputObjectType = deriveInputObjectType[DirectoryUpdate]()

  implicit val EmailCreationInputObjectType = deriveInputObjectType[EmailCreation]()
  implicit val EmailUpdateInputObjectType = deriveInputObjectType[EmailUpdate]()

  implicit val ErpComponentErpProductCreationInputObjectType = deriveInputObjectType[ErpComponentErpProductCreation]()
  implicit val ErpComponentErpProductUpdateInputObjectType = deriveInputObjectType[ErpComponentErpProductUpdate]()

  implicit val ErpComponentCreationInputObjectType = deriveInputObjectType[ErpComponentCreation]()
  implicit val ErpComponentUpdateInputObjectType = deriveInputObjectType[ErpComponentUpdate]()

  implicit val ErpCustomerCreationInputObjectType = deriveInputObjectType[ErpCustomerCreation]()
  implicit val ErpCustomerUpdateInputObjectType = deriveInputObjectType[ErpCustomerUpdate]()

  implicit val ErpEmployeeCreationInputObjectType = deriveInputObjectType[ErpEmployeeCreation]()
  implicit val ErpEmployeeUpdateInputObjectType = deriveInputObjectType[ErpEmployeeUpdate]()

  implicit val ErpInvoiceCreationInputObjectType = deriveInputObjectType[ErpInvoiceCreation]()
  implicit val ErpInvoiceUpdateInputObjectType = deriveInputObjectType[ErpInvoiceUpdate]()

  implicit val ErpOrderItemCreationInputObjectType = deriveInputObjectType[ErpOrderItemCreation]()
  implicit val ErpOrderItemUpdateInputObjectType = deriveInputObjectType[ErpOrderItemUpdate]()

  implicit val ErpOrderCreationInputObjectType = deriveInputObjectType[ErpOrderCreation]()
  implicit val ErpOrderUpdateInputObjectType = deriveInputObjectType[ErpOrderUpdate]()

  implicit val ErpProductCreationInputObjectType = deriveInputObjectType[ErpProductCreation]()
  implicit val ErpProductUpdateInputObjectType = deriveInputObjectType[ErpProductUpdate]()

  implicit val ErpSupplierCreationInputObjectType = deriveInputObjectType[ErpSupplierCreation]()
  implicit val ErpSupplierUpdateInputObjectType = deriveInputObjectType[ErpSupplierUpdate]()

  implicit val ScenarioErpComponentCreationObjectType = deriveInputObjectType[ScenarioErpComponentCreation]()
  implicit val ScenarioErpComponentUpdateObjectType = deriveInputObjectType[ScenarioErpComponentUpdate]()

  implicit val ScenarioErpComponentErpProductCreationInputObjectType =
    deriveInputObjectType[ScenarioErpComponentErpProductCreation]()
  implicit val ScenarioErpComponentErpProductUpdateInputObjectType =
    deriveInputObjectType[ScenarioErpComponentErpProductUpdate]()

  implicit val ScenarioErpCustomerCreationInputObjectType = deriveInputObjectType[ScenarioErpCustomerCreation]()
  implicit val ScenarioErpCustomerUpdateInputObjectType = deriveInputObjectType[ScenarioErpCustomerUpdate]()

  implicit val ScenarioErpEmployeeCreationInputObjectType = deriveInputObjectType[ScenarioErpEmployeeCreation]()
  implicit val ScenarioErpEmployeeUpdateInputObjectType = deriveInputObjectType[ScenarioErpEmployeeUpdate]()

  implicit val ScenarioErpInvoiceCreationInputObjectType = deriveInputObjectType[ScenarioErpInvoiceCreation]()
  implicit val ScenarioErpInvoiceUpdateInputObjectType = deriveInputObjectType[ScenarioErpInvoiceUpdate]()

  implicit val ScenarioErpOrderCreationInputObjectType = deriveInputObjectType[ScenarioErpOrderCreation]()
  implicit val ScenarioErpOrderUpdateInputObjectType = deriveInputObjectType[ScenarioErpOrderUpdate]()

  implicit val ScenarioErpOrderItemCreationInputObjectType = deriveInputObjectType[ScenarioErpOrderItemCreation]()
  implicit val ScenarioErpOrderItemUpdateInputObjectType = deriveInputObjectType[ScenarioErpOrderItemUpdate]()

  implicit val ScenarioErpProductCreationInputObjectType = deriveInputObjectType[ScenarioErpProductCreation]()
  implicit val ScenarioErpProductUpdateInputObjectType = deriveInputObjectType[ScenarioErpProductUpdate]()

  implicit val ScenarioErpSupplierCreationInputObjectType = deriveInputObjectType[ScenarioErpSupplierCreation]()
  implicit val ScenarioErpSupplierUpdateInputObjectType = deriveInputObjectType[ScenarioErpSupplierUpdate]()

  implicit val FreetextQuestionCodingCriterionCreationInputObjectType =
    deriveInputObjectType[FreetextQuestionCodingCriterionCreation]()
  implicit val FreetextQuestionCodingCriterionUpdateInputObjectType =
    deriveInputObjectType[FreetextQuestionCodingCriterionUpdate]()

  implicit val FreetextQuestionRatingCreationInputObjectType =
    deriveInputObjectType[FreetextQuestionRatingCreation]()
  implicit val FreetextQuestionRatingUpdateInputObjectType =
    deriveInputObjectType[FreetextQuestionRatingUpdate]()

  implicit val FreetextQuestionRatingCriterionSelectionCreationInputObjectType =
    deriveInputObjectType[FreetextQuestionRatingCriterionSelectionCreation]()

  implicit val FileCreationInputObjectType = deriveInputObjectType[FileCreation]()
  implicit val FileUpdateInputObjectType = deriveInputObjectType[FileUpdate]()

  implicit val EmailOpeningInterventionCreationInputObjectType =
    deriveInputObjectType[EmailOpeningInterventionCreation]()
  implicit val EmailOpeningInterventionUpdateInputObjectType = deriveInputObjectType[EmailOpeningInterventionUpdate]()

  implicit val ErpRowOpeningInterventionCreationInputObjectType =
    deriveInputObjectType[ErpRowOpeningInterventionCreation]()
  implicit val ErpRowOpeningInterventionUpdateInputObjectType = deriveInputObjectType[ErpRowOpeningInterventionUpdate]()

  implicit val FileOpeningInterventionCreationInputObjectType = deriveInputObjectType[FileOpeningInterventionCreation]()
  implicit val FileOpeningInterventionUpdateInputObjectType = deriveInputObjectType[FileOpeningInterventionUpdate]()

  implicit val NotesContentInterventionCreationInputObjectType =
    deriveInputObjectType[NotesContentInterventionCreation]()
  implicit val NotesContentInterventionUpdateInputObjectType = deriveInputObjectType[NotesContentInterventionUpdate]()

  implicit val RuntimeSurveyAnswerSelectionInterventionCreationInputObjectType =
    deriveInputObjectType[RuntimeSurveyAnswerSelectionInterventionCreation]()
  implicit val RuntimeSurveyAnswerSelectionInterventionUpdateInputObjectType =
    deriveInputObjectType[RuntimeSurveyAnswerSelectionInterventionUpdate]()

  implicit val SpreadsheetCellContentInterventionCreationInputObjectType =
    deriveInputObjectType[SpreadsheetCellContentInterventionCreation]()
  implicit val SpreadsheetCellContentInterventionUpdateInputObjectType =
    deriveInputObjectType[SpreadsheetCellContentInterventionUpdate]()

  implicit val TextDocumentContentInterventionCreationInputObjectType =
    deriveInputObjectType[TextDocumentContentInterventionCreation]()
  implicit val TextDocumentContentInterventionUpdateInputObjectType =
    deriveInputObjectType[TextDocumentContentInterventionUpdate]()

  implicit val ProjectCreationInputObjectType = deriveInputObjectType[ProjectCreation]()
  implicit val ProjectUpdateInputObjectType = deriveInputObjectType[ProjectUpdate]()

  implicit val ProjectModuleCreationInputObjectType = deriveInputObjectType[ProjectModuleCreation]()

  implicit val QuestionnaireCreationInputObjectType = deriveInputObjectType[QuestionnaireCreation]()
  implicit val QuestionnaireUpdateInputObjectType = deriveInputObjectType[QuestionnaireUpdate]()

  implicit val QuestionnaireAnswerCreationInputObjectType = deriveInputObjectType[QuestionnaireAnswerCreation]()
  implicit val QuestionnaireAnswerUpdateInputObjectType = deriveInputObjectType[QuestionnaireAnswerUpdate]()

  implicit val QuestionnaireQuestionCreationInputObjectType = deriveInputObjectType[QuestionnaireQuestionCreation]()
  implicit val QuestionnaireQuestionUpdateInputObjectType = deriveInputObjectType[QuestionnaireQuestionUpdate]()

  implicit val RScriptCreationInputObjectType = deriveInputObjectType[RScriptCreation]()
  implicit val RScriptUpdateInputObjectType = deriveInputObjectType[RScriptUpdate]()

  implicit val RatingCreationInputObjectType = deriveInputObjectType[RatingCreation]()

  implicit val ReferenceBookChapterCreationInputObjectType = deriveInputObjectType[ReferenceBookChapterCreation]()
  implicit val ReferenceBookChapterUpdateInputObjectType = deriveInputObjectType[ReferenceBookChapterUpdate]()

  implicit val ReferenceBookArticleCreationInputObjectType = deriveInputObjectType[ReferenceBookArticleCreation]()
  implicit val ReferenceBookArticleUpdateInputObjectType = deriveInputObjectType[ReferenceBookArticleUpdate]()

  implicit val ReferenceBookContentCreationInputObjectType = deriveInputObjectType[ReferenceBookContentCreation]()
  implicit val ReferenceBookContentUpdateInputObjectType = deriveInputObjectType[ReferenceBookContentUpdate]()

  implicit val ReferenceBookChapterScenarioIdInputObjectType = deriveInputObjectType[ReferenceBookChapterScenarioId]()

  implicit val SampleCompanyCreationInputObjectType = deriveInputObjectType[SampleCompanyCreation]()
  implicit val SampleCompanyUpdateInputObjectType = deriveInputObjectType[SampleCompanyUpdate]()

  implicit val ScenarioCreationInputObjectType = deriveInputObjectType[ScenarioCreation]()
  implicit val ScenarioUpdateInputObjectType = deriveInputObjectType[ScenarioUpdate]()

  implicit val ScenarioQuestionnaireCreationInputObjectType = deriveInputObjectType[ScenarioQuestionnaireCreation]()
  implicit val ScenarioQuestionnaireUpdateInputObjectType = deriveInputObjectType[ScenarioQuestionnaireUpdate]()

  implicit val ScenarioCodingItemRatingCreationInputObjectType =
    deriveInputObjectType[ScenarioCodingItemRatingCreation]()
  implicit val ScenarioCodingItemRatingUpdateInputObjectType = deriveInputObjectType[ScenarioCodingItemRatingUpdate]()

  implicit val ScenarioRatingCriterionSelectionCreationInputObjectType =
    deriveInputObjectType[ScenarioRatingCriterionSelectionCreation]()

  implicit val ScenarioSampleCompanyFileCreationInputObjectType =
    deriveInputObjectType[ScenarioSampleCompanyFileCreation]()
  implicit val ScenarioSampleCompanyFileUpdateInputObjectType =
    deriveInputObjectType[ScenarioSampleCompanyFileUpdate]()

  implicit val SpreadsheetCellCreationInputObjectType = deriveInputObjectType[SpreadsheetCellCreation]()
  implicit val SpreadsheetCellUpdateInputObjectType = deriveInputObjectType[SpreadsheetCellUpdate]()

  implicit val SurveyCreationInputObjectType = deriveInputObjectType[SurveyCreation]()
  implicit val SurveyUpdateInputObjectType = deriveInputObjectType[SurveyUpdate]()

  implicit val SurveyEventCreationInputObjectType = deriveInputObjectType[SurveyEventCreation]()

  implicit val SurveyInvitationCreationInputObjectType = deriveInputObjectType[SurveyInvitationCreation]()
  implicit val SurveyInvitationUpdateInputObjectType = deriveInputObjectType[SurveyInvitationUpdate]()

  implicit val TextDocumentCreationInputObjectType = deriveInputObjectType[TextDocumentCreation]()
  implicit val TextDocumentUpdateInputObjectType = deriveInputObjectType[TextDocumentUpdate]()

  implicit val UserAccountCreationInputObjectType = deriveInputObjectType[UserAccountCreation]()
  implicit val UserAccountUpdateInputObjectType = deriveInputObjectType[UserAccountUpdate]()
}
