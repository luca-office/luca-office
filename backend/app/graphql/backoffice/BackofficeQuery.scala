package graphql.backoffice

import graphql.backoffice.queries._

trait BackofficeQuery
    extends ChatMessageQuery
    with CodingCriterionQuery
    with CodingDimensionQuery
    with CodingItemQuery
    with CodingModelQuery
    with DirectoryQuery
    with EmailQuery
    with ErpComponentErpProductQuery
    with ErpComponentQuery
    with ErpCustomerQuery
    with ErpEmployeeQuery
    with ErpInvoiceQuery
    with ErpOrderItemQuery
    with ErpOrderQuery
    with ErpProductQuery
    with ErpSupplierQuery
    with FileQuery
    with FreetextQuestionCodingCriterionQuery
    with FreetextQuestionRatingQuery
    with FreetextQuestionRatingCriterionSelectionQuery
    with InterventionQuery
    with ManualSurveyControlQuery
    with ProjectQuery
    with ProjectUserAccountQuery
    with QuestionnaireAnswerQuery
    with QuestionnaireQuery
    with QuestionnaireQuestionQuery
    with RScriptQuery
    with RatingQuery
    with ReferenceBookChapterQuery
    with ReferenceBookArticleQuery
    with ReferenceBookContentQuery
    with ReferenceBookChapterScenarioQuery
    with SampleCompanyQuery
    with ScenarioCodingAutomatedCriterionQuery
    with ScenarioDocumentsQuery
    with ScenarioErpComponentQuery
    with ScenarioErpComponentErpProductQuery
    with ScenarioErpCustomerQuery
    with ScenarioErpEmployeeQuery
    with ScenarioErpInvoiceQuery
    with ScenarioErpOrderQuery
    with ScenarioErpOrderItemQuery
    with ScenarioErpProductQuery
    with ScenarioErpSupplierQuery
    with ScenarioQuery
    with ScenarioQuestionnaireQuery
    with ScenarioCodingItemRatingQuery
    with ScenarioRatingCriterionSelectionQuery
    with ScenarioSampleCompanyFileQuery
    with ScenarioUserAccountQuery
    with ProjectModuleQuery
    with SpreadsheetQuery
    with SpreadsheetCellQuery
    with SurveyQuery
    with SurveyEventQuery
    with SurveyInvitationQuery
    with SurveyResultQuery
    with SurveyUserAccountQuery
    with TextDocumentQuery
    with UserAccountQuery {
  context: BackofficeContext =>
}
