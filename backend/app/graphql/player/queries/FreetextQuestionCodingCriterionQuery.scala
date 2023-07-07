package graphql.player.queries

import database.generated.public.FreetextQuestionCodingCriterion
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FreetextQuestionCodingCriterionQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freetextQuestionCodingCriteriaForQuestionnaire(
      questionnaireId: UUID): Future[Seq[FreetextQuestionCodingCriterion]] =
    freetextQuestionCodingCriterionService.allForQuestionnaire(questionnaireId)
}
