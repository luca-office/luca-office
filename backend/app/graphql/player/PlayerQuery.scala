package graphql.player

import graphql.player.queries._

trait PlayerQuery
    extends DirectoryQuery
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
    with InterventionQuery
    with ManualSurveyControlQuery
    with ProjectModuleQuery
    with ProjectQuery
    with QuestionnaireQuery
    with ReferenceBookChapterScenarioQuery
    with SampleCompanyQuery
    with ScenarioQuery
    with ScenarioQuestionnaireQuery
    with SpreadsheetQuery
    with SurveyInvitationQuery
    with SurveyQuery
    with CodingDimensionQuery
    with CodingModelQuery
    with ScenarioCodingAutomatedCriteriaQuery
    with CodingCriteriaQuery
    with SurveyResultQuery {
  context: PlayerContext =>
}
