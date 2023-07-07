package models

import enums.RScriptEvaluationStatus

import java.util.UUID

case class RScriptEvaluationResultCreation(
    status: RScriptEvaluationStatus,
    probability: BigDecimal,
    invitationId: UUID,
    criterionId: UUID,
    criterionFulfilled: Option[Boolean],
    threshold: Option[BigDecimal],
    functionName: Option[String],
    criterionNo: Option[Int],
    resultData: Option[String]
)
