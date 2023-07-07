package database

import enums._
import io.getquill.MappedEncoding

object EnumEncoders {

  implicit val decodeSalutation: MappedEncoding[String, Salutation] =
    MappedEncoding[String, Salutation](Salutation.parse)
  implicit val encodeSalutation: MappedEncoding[Salutation, String] =
    MappedEncoding[Salutation, String](Salutation.print)

  implicit val decodeEmploymentMode: MappedEncoding[String, EmploymentMode] =
    MappedEncoding[String, EmploymentMode](EmploymentMode.parse)
  implicit val encodeEmploymentMode: MappedEncoding[EmploymentMode, String] =
    MappedEncoding[EmploymentMode, String](EmploymentMode.print)

  implicit val decodeFamilyStatus: MappedEncoding[String, FamilyStatus] =
    MappedEncoding[String, FamilyStatus](FamilyStatus.parse)
  implicit val encodeFamilyStatus: MappedEncoding[FamilyStatus, String] =
    MappedEncoding[FamilyStatus, String](FamilyStatus.print)

  implicit val decodeMimeType: MappedEncoding[String, MimeType] =
    MappedEncoding[String, MimeType](MimeType.parse)
  implicit val encodeMimeType: MappedEncoding[MimeType, String] =
    MappedEncoding[MimeType, String](MimeType.print)

  implicit val decodeEmailDirectory: MappedEncoding[String, EmailDirectory] =
    MappedEncoding[String, EmailDirectory](EmailDirectory.parse)
  implicit val encodeEmailDirectory: MappedEncoding[EmailDirectory, String] =
    MappedEncoding[EmailDirectory, String](EmailDirectory.print)

  implicit val decodeRelevance: MappedEncoding[String, Relevance] =
    MappedEncoding[String, Relevance](Relevance.parse)
  implicit val encodeRelevance: MappedEncoding[Relevance, String] =
    MappedEncoding[Relevance, String](Relevance.print)

  implicit val decodeFileUsageType: MappedEncoding[String, FileUsageType] =
    MappedEncoding[String, FileUsageType](FileUsageType.parse)
  implicit val encodeFileUsageType: MappedEncoding[FileUsageType, String] =
    MappedEncoding[FileUsageType, String](FileUsageType.print)

  implicit val decodeReferenceBookContentType: MappedEncoding[String, ReferenceBookContentType] =
    MappedEncoding[String, ReferenceBookContentType](ReferenceBookContentType.parse)
  implicit val encodeReferenceBookContentType: MappedEncoding[ReferenceBookContentType, String] =
    MappedEncoding[ReferenceBookContentType, String](ReferenceBookContentType.print)

  implicit val decodePaymentStatus: MappedEncoding[String, PaymentStatus] =
    MappedEncoding[String, PaymentStatus](PaymentStatus.parse)
  implicit val encodePaymentStatus: MappedEncoding[PaymentStatus, String] =
    MappedEncoding[PaymentStatus, String](PaymentStatus.print)

  implicit val decodeDeliveryStatus: MappedEncoding[String, DeliveryStatus] =
    MappedEncoding[String, DeliveryStatus](DeliveryStatus.parse)
  implicit val encodeDeliveryStatus: MappedEncoding[DeliveryStatus, String] =
    MappedEncoding[DeliveryStatus, String](DeliveryStatus.print)

  implicit val decodeQuestionType: MappedEncoding[String, QuestionType] =
    MappedEncoding[String, QuestionType](QuestionType.parse)
  implicit val encodeQuestionType: MappedEncoding[QuestionType, String] =
    MappedEncoding[QuestionType, String](QuestionType.print)

  implicit val decodeQuestionnaireType: MappedEncoding[String, QuestionnaireType] =
    MappedEncoding[String, QuestionnaireType](QuestionnaireType.parse)
  implicit val encodeQuestionnaireType: MappedEncoding[QuestionnaireType, String] =
    MappedEncoding[QuestionnaireType, String](QuestionnaireType.print)

  implicit val decodeSurveyEventType: MappedEncoding[String, SurveyEventType] =
    MappedEncoding[String, SurveyEventType](SurveyEventType.parse)
  implicit val encodeSurveyEventType: MappedEncoding[SurveyEventType, String] =
    MappedEncoding[SurveyEventType, String](SurveyEventType.print)

  implicit val decodeUsageField: MappedEncoding[String, UsageField] =
    MappedEncoding[String, UsageField](UsageField.parse)
  implicit val encodeUsageField: MappedEncoding[UsageField, String] =
    MappedEncoding[UsageField, String](UsageField.print)

  implicit val decodeAuthenticationType: MappedEncoding[String, AuthenticationType] =
    MappedEncoding[String, AuthenticationType](AuthenticationType.parse)
  implicit val encodeAuthenticationType: MappedEncoding[AuthenticationType, String] =
    MappedEncoding[AuthenticationType, String](AuthenticationType.print)

  implicit val decodeSpreadsheetCellType: MappedEncoding[String, SpreadsheetCellType] =
    MappedEncoding[String, SpreadsheetCellType](SpreadsheetCellType.parse)
  implicit val encodeSpreadsheetCellType: MappedEncoding[SpreadsheetCellType, String] =
    MappedEncoding[SpreadsheetCellType, String](SpreadsheetCellType.print)

  implicit val decodeScoringType: MappedEncoding[String, ScoringType] =
    MappedEncoding[String, ScoringType](ScoringType.parse)
  implicit val encodeScoringType: MappedEncoding[ScoringType, String] =
    MappedEncoding[ScoringType, String](ScoringType.print)

  implicit val decodeProjectModuleType: MappedEncoding[String, ProjectModuleType] =
    MappedEncoding[String, ProjectModuleType](ProjectModuleType.parse)
  implicit val encodeProjectModuleType: MappedEncoding[ProjectModuleType, String] =
    MappedEncoding[ProjectModuleType, String](ProjectModuleType.print)

  implicit val decodeQuestionScoringType: MappedEncoding[String, QuestionScoringType] =
    MappedEncoding[String, QuestionScoringType](QuestionScoringType.parse)
  implicit val encodeQuestionScoringType: MappedEncoding[QuestionScoringType, String] =
    MappedEncoding[QuestionScoringType, String](QuestionScoringType.print)

  implicit val decodeInterventionType: MappedEncoding[String, InterventionType] =
    MappedEncoding[String, InterventionType](InterventionType.parse)
  implicit val encodeInterventionType: MappedEncoding[InterventionType, String] =
    MappedEncoding[InterventionType, String](InterventionType.print)

  implicit val decodeOfficeTool: MappedEncoding[String, OfficeTool] =
    MappedEncoding[String, OfficeTool](OfficeTool.parse)
  implicit val encodeOfficeTool: MappedEncoding[OfficeTool, String] =
    MappedEncoding[OfficeTool, String](OfficeTool.print)

  implicit val decodeAutomatedCodingItemRule: MappedEncoding[String, AutomatedCodingItemRule] =
    MappedEncoding[String, AutomatedCodingItemRule](AutomatedCodingItemRule.parse)
  implicit val encodeAutomatedCodingItemRule: MappedEncoding[AutomatedCodingItemRule, String] =
    MappedEncoding[AutomatedCodingItemRule, String](AutomatedCodingItemRule.print)

  implicit val decodeFeatureType: MappedEncoding[String, FeatureType] =
    MappedEncoding[String, FeatureType](FeatureType.parse)
  implicit val encodeFeatureType: MappedEncoding[FeatureType, String] =
    MappedEncoding[FeatureType, String](FeatureType.print)

  implicit val decodeRScriptEvaluationStatus: MappedEncoding[String, RScriptEvaluationStatus] =
    MappedEncoding[String, RScriptEvaluationStatus](RScriptEvaluationStatus.parse)
  implicit val encodeRScriptEvaluationStatus: MappedEncoding[RScriptEvaluationStatus, String] =
    MappedEncoding[RScriptEvaluationStatus, String](RScriptEvaluationStatus.print)

  implicit val decodeSurveyExecutionType: MappedEncoding[String, SurveyExecutionType] =
    MappedEncoding[String, SurveyExecutionType](SurveyExecutionType.parse)
  implicit val encodeSurveyExecutionType: MappedEncoding[SurveyExecutionType, String] =
    MappedEncoding[SurveyExecutionType, String](SurveyExecutionType.print)
  
}
