package codegen

import io.getquill.codegen.jdbc.model.JdbcTypeInfo
import io.getquill.codegen.jdbc.model.JdbcTypes.JdbcTyper
import io.getquill.codegen.model._

import java.sql.Types._
import scala.reflect.{classTag, ClassTag}

class CustomTyper extends JdbcTyper {

  def unresolvedType(jdbcType: Int, tag: ClassTag[_]): Option[ClassTag[_]] =
    unresolvedType(jdbcType, Some(tag))

  def unresolvedType(jdbcType: Int, tag: Option[ClassTag[_]]): Option[ClassTag[_]] =
    throw new TypingError(s"Could not resolve jdbc type: $jdbcType${tag.map(t => s" class: `$t`.").getOrElse("")}")

  def apply(jdbcTypeInfo: JdbcTypeInfo): Option[ClassTag[_]] = {
    val jdbcType = jdbcTypeInfo.jdbcType
    val typeName = jdbcTypeInfo.typeName

    val enumMapping = Map(
      "authentication_type" -> classTag[enums.AuthenticationType],
      "automated_coding_item_rule" -> classTag[enums.AutomatedCodingItemRule],
      "delivery_status" -> classTag[enums.DeliveryStatus],
      "email_directory" -> classTag[enums.EmailDirectory],
      "employment_mode" -> classTag[enums.EmploymentMode],
      "family_status" -> classTag[enums.FamilyStatus],
      "feature_type" -> classTag[enums.FeatureType],
      "file_usage_type" -> classTag[enums.FileUsageType],
      "intervention_type" -> classTag[enums.InterventionType],
      "mime_type" -> classTag[enums.MimeType],
      "payment_status" -> classTag[enums.PaymentStatus],
      "office_tool" -> classTag[enums.OfficeTool],
      "project_module_type" -> classTag[enums.ProjectModuleType],
      "question_scoring_type" -> classTag[enums.QuestionScoringType],
      "question_type" -> classTag[enums.QuestionType],
      "questionnaire_type" -> classTag[enums.QuestionnaireType],
      "reference_book_content_type" -> classTag[enums.ReferenceBookContentType],
      "relevance" -> classTag[enums.Relevance],
      "r_script_evaluation_status" -> classTag[enums.RScriptEvaluationStatus],
      "salutation" -> classTag[enums.Salutation],
      "scoring_type" -> classTag[enums.ScoringType],
      "spreadsheet_cell_type" -> classTag[enums.SpreadsheetCellType],
      "survey_event_type" -> classTag[enums.SurveyEventType],
      "survey_execution_type" -> classTag[enums.SurveyExecutionType],
      "usage_field" -> classTag[enums.UsageField]
    )

    jdbcType match {
      case CHAR | VARCHAR | LONGVARCHAR | NCHAR | NVARCHAR | LONGNVARCHAR =>
        typeName match {
          case Some(name) if enumMapping.contains(name) => enumMapping.get(name)
          case _ => Some(classTag[String])
        }
      case NUMERIC | DECIMAL => Some(classTag[BigDecimal])
      case BIT | BOOLEAN => Some(classTag[Boolean])
      case TINYINT => Some(classTag[Byte])
      case SMALLINT => Some(classTag[Short])
      case INTEGER => Some(classTag[Int])
      case BIGINT => Some(classTag[Long])
      case REAL => Some(classTag[Float])
      case FLOAT | DOUBLE => Some(classTag[Double])
      case DATE => Some(classTag[java.time.LocalDate])
      case TIME => Some(classTag[java.time.LocalDateTime])
      case TIMESTAMP => Some(classTag[java.time.Instant])
      case ARRAY => Some(classTag[java.sql.Array])
      case OTHER if typeName.contains("uuid") => Some(classTag[java.util.UUID])
      case OTHER if typeName.contains("jsonb") => Some(classTag[io.circe.Json])

      case BINARY | VARBINARY | LONGVARBINARY | BLOB => unresolvedType(jdbcType, classTag[java.sql.Blob])
      case STRUCT => unresolvedType(jdbcType, classTag[java.sql.Struct])
      case REF => unresolvedType(jdbcType, classTag[java.sql.Ref])
      case DATALINK => unresolvedType(jdbcType, classTag[java.net.URL])
      case ROWID => unresolvedType(jdbcType, classTag[java.sql.RowId])
      case NCLOB => unresolvedType(jdbcType, classTag[java.sql.NClob])
      case SQLXML => unresolvedType(jdbcType, classTag[java.sql.SQLXML])
      case NULL => unresolvedType(jdbcType, classTag[Null])
      case CLOB => unresolvedType(jdbcType, classTag[java.sql.Clob])

      case other => unresolvedType(other, None)
    }
  }
}
