package services.converters

import database.generated.public.RScriptEvaluationResult
import models.RScriptEvaluationResultCreation
import utils.DateUtils

import java.util.UUID

object RScriptEvaluationResultConverter {

  def toRScriptEvaluationResult(creation: RScriptEvaluationResultCreation): RScriptEvaluationResult =
    RScriptEvaluationResult(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      status = creation.status,
      probability = creation.probability,
      invitationId = creation.invitationId,
      criterionId = creation.criterionId,
      criterionFulfilled = creation.criterionFulfilled,
      threshold = creation.threshold,
      functionName = creation.functionName,
      criterionNo = creation.criterionNo,
      resultData = creation.resultData
    )
}
