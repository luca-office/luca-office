package graphql.backoffice.mutations

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.SurveyEventCreation
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import scala.concurrent.Future

//TODO: LUCA-2705 - unused mutation to fix codegen problems
trait SurveyEventMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createSurveyEvents(creations: Seq[SurveyEventCreation]): Future[String] =
    surveyEventService.createBulk(creations)
}
