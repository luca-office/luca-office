package models

// JSONS schema based on https://github.com/LucaOffice/evaluation-api/blob/main/src/runtime_functions/python/p_answer_001_politeness.py#L78
case class RScriptEvaluationApiResponse(
    function_name: Option[String],
    criterion_no: Option[Int],
    criterion_prediction: Option[String],
    criterion_probability: Option[BigDecimal],
    criterion_threshold: Option[BigDecimal],
    data: Option[String]
)
