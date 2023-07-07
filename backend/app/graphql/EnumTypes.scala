package graphql

import enums._
import sangria.macros.derive.deriveEnumType

object EnumTypes {

  implicit val SalutationEnumType = deriveEnumType[Salutation]()
  implicit val EmploymentModeEnumType = deriveEnumType[EmploymentMode]()
  implicit val FamilyStatusEnumType = deriveEnumType[FamilyStatus]()
  implicit val MimeTypeEnumType = deriveEnumType[MimeType]()
  implicit val EmailDirectoryEnumType = deriveEnumType[EmailDirectory]()
  implicit val RelevanceEnumType = deriveEnumType[Relevance]()
  implicit val FileUsageTypeEnumType = deriveEnumType[FileUsageType]()
  implicit val ReferenceBookContentTypeEnumType = deriveEnumType[ReferenceBookContentType]()
  implicit val PaymentStatusEnumType = deriveEnumType[PaymentStatus]()
  implicit val DeliveryStatusEnumType = deriveEnumType[DeliveryStatus]()
  implicit val QuestionTypeEnumType = deriveEnumType[QuestionType]()
  implicit val QuestionnaireTypeEnumType = deriveEnumType[QuestionnaireType]()
  implicit val SurveyEventTypeEnumType = deriveEnumType[SurveyEventType]()
  implicit val UsageFieldEnumType = deriveEnumType[UsageField]()
  implicit val AuthenticationTypeEnumType = deriveEnumType[AuthenticationType]()
  implicit val OfficeToolEnumType = deriveEnumType[OfficeTool]()
  implicit val ProjectModuleTypeEnumType = deriveEnumType[ProjectModuleType]()
  implicit val ProjectModuleProgressTypeEnumType = deriveEnumType[ProjectModuleProgressType]()
  implicit val SpreadsheetCellTypeEnumType = deriveEnumType[SpreadsheetCellType]()
  implicit val ScoringTypeEnumType = deriveEnumType[ScoringType]()
  implicit val QuestionScoringTypeEnumType = deriveEnumType[QuestionScoringType]()
  implicit val InterventionTypeEnumType = deriveEnumType[InterventionType]()
  implicit val CalculatorKeyEnumType = deriveEnumType[CalculatorKey]()
  implicit val ErpTableTypeEnumType = deriveEnumType[ErpTableType]()
  implicit val AutomatedCodingItemRuleEnumType = deriveEnumType[AutomatedCodingItemRule]()
  implicit val FeatureTypeEnumType = deriveEnumType[FeatureType]()
  implicit val SurveyExecutionTypeEnumType = deriveEnumType[SurveyExecutionType]()
  implicit val SurveyParticipationStatusEnumType = deriveEnumType[SurveyParticipationStatus]()
  implicit val ProjectModuleEndTypeEnumType = deriveEnumType[ProjectModuleEndType]()
}
