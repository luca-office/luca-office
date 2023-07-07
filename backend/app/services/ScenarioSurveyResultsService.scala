package services

import database.DatabaseContext
import database.generated.public._
import enums.{ScoringType, SurveyEventType}
import models._
import services.actions.{AllSurveyEvent, FindCodingModelForScenario}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioSurveyResultsService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends QuillUtils
    with ScenarioSurveyResultsServiceActions
    with ScenarioServiceActions
    with AllSurveyEvent {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def scenarioFinalScore(surveyId: UUID, invitationId: UUID, scenarioId: UUID): Future[ScenarioScore] =
    performIO(scenarioFinalScoreAction(surveyId, invitationId, scenarioId))

  def completionEmailWordCount(surveyId: UUID, scenarioId: UUID): Future[Seq[CompletionEmailWordCount]] = {
    val action = for {
      scenario <- findScenarioWithoutUserAccountAction(scenarioId).flatMap(liftIOOrFail(EntityNotFound))
      surveyEvents <- runIO(
        allSurveyEventsForScenarioQuotation(surveyId, scenarioId)
          .filter(event =>
            event.eventType == lift(SurveyEventType.UpdateEmail: SurveyEventType)
              || event.eventType == lift(SurveyEventType.UpdateEmailText: SurveyEventType)
              || event.eventType == lift(SurveyEventType.SendEmail: SurveyEventType)))
    } yield (scenario.completionEmailAddress, surveyEvents)

    performIO(action)
      .map { case (completionEmailAddress, surveyEvents) =>
        surveyEvents
          .groupBy(_.invitationId)
          .collect { case (Some(invitationId), events) =>
            invitationId ->
              events
                .collect { case SurveyEvent(_, eventType, Some(data), _, _, _) =>
                  SurveyEventService.decodeData(data, eventType)
                }
                .collect { case Right(eventData) => eventData }
          }
          .map { case (invitationId, events) =>
            CompletionEmailWordCount(
              invitationId,
              completionEmailAddress.flatMap(calculateCompletionEmailWordCount(_, events)))
          }
          .toSeq
      }
  }

  def calculateCompletionEmailWordCount(
      completionEmailAddress: String,
      sortedEventDataItems: Seq[SurveyEventData]): Option[Int] =
    findSentCompletionEmailText(sortedEventDataItems)
      .orElse(findLatestCompletionEmailText(completionEmailAddress, sortedEventDataItems))
      .map(
        _.split("\\n")
          .filter(!_.startsWith(">"))
          .filter(!_.isBlank)
          .mkString("\n")
          .split("\\s")
          .length)

  private def findSentCompletionEmailText(sortedEventDataItems: Seq[SurveyEventData]) =
    sortedEventDataItems
      .collectFirst { case eventData: SendEmail if eventData.isCompletionEmail => eventData.id }
      .flatMap(sentCompletionEmailId =>
        sortedEventDataItems
          .collect {
            case eventData: UpdateEmailText if eventData.id == sentCompletionEmailId => eventData
          }
          .lastOption
          .map(_.text))

  private def findLatestCompletionEmailText(
      completionEmailAddress: String,
      sortedEventDataItems: Seq[SurveyEventData]) = {
    val allCompletionEmailIds = sortedEventDataItems
      .collect {
        case eventData: UpdateEmail if eventData.to.toLowerCase == completionEmailAddress.toLowerCase => eventData.id
      }
      .filter { id =>
        val recipientsForId = sortedEventDataItems.collect {
          case eventData: UpdateEmail if eventData.id == id => eventData.to
        }
        recipientsForId.lastOption.map(_.toLowerCase).contains(completionEmailAddress.toLowerCase)
      }

    sortedEventDataItems
      .collect {
        case eventData: UpdateEmailText if allCompletionEmailIds.contains(eventData.id) => eventData
      }
      .lastOption
      .map(_.text)
  }
}

trait ScenarioSurveyResultsServiceActions
    extends FindCodingModelForScenario
    with RatingServiceActions
    with DefaultAllCodingDimension
    with DefaultAllCodingItem
    with DefaultAllCodingCriterion
    with DefaultAllScenarioCodingItemRating
    with DefaultAllScenarioCodingAutomatedCriterion
    with DefaultAllSurveyInvitation {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def participantsScenarioResult(surveyId: UUID, scenarioId: UUID): Future[Seq[ParticipantScenarioSurveyResult]] = {
    val action = for {
      invitationIds <- runIO(allSurveyInvitationsQuotation(surveyId).map(_.id))
      (manualItems, automatedItems, manualCriteria, automatedCriteria) <- codingModelEntitiesAction(scenarioId)
      codingItemIds = (manualItems ++ automatedItems).map(_.id)
      (itemRatings, criterionSelections) <- scenarioRatingEntitiesAction(surveyId, codingItemIds)
    } yield invitationIds.map(invitationId =>
      createParticipantScenarioResult(
        scenarioId = scenarioId,
        invitationId = invitationId,
        invitationIds = invitationIds,
        itemRatings = itemRatings,
        manualCriteria = manualCriteria,
        automatedCriteria = automatedCriteria,
        manualItems = manualItems,
        automatedItems = automatedItems,
        criterionSelections = criterionSelections
      ))

    performIO(action)
  }

  def participantScenarioResult(
      surveyId: UUID,
      invitationId: UUID,
      scenarioId: UUID): Future[ParticipantScenarioSurveyResult] =
    performIO(participantScenarioResultAction(surveyId, invitationId, scenarioId))

  def participantScenarioResultAction(
      surveyId: UUID,
      invitationId: UUID,
      scenarioId: UUID): IO[ParticipantScenarioSurveyResult, Effect.Read] =
    for {
      (manualItems, automatedItems, manualCriteria, automatedCriteria) <- codingModelEntitiesAction(scenarioId)
      itemIds = (manualItems ++ automatedItems).map(_.id)
      (itemRatings, criterionSelections) <- scenarioRatingEntitiesAction(surveyId, itemIds)
      invitationIds <- runIO(allSurveyInvitationsQuotation(surveyId).map(_.id))
    } yield createParticipantScenarioResult(
      scenarioId = scenarioId,
      invitationId = invitationId,
      invitationIds = invitationIds,
      itemRatings = itemRatings,
      manualCriteria = manualCriteria,
      automatedCriteria = automatedCriteria,
      manualItems = manualItems,
      automatedItems = automatedItems,
      criterionSelections = criterionSelections
    )

  def createParticipantScenarioResult(
      scenarioId: UUID,
      invitationId: UUID,
      invitationIds: Seq[UUID],
      itemRatings: Seq[ScenarioCodingItemRating],
      manualCriteria: Seq[CodingCriterion],
      automatedCriteria: Seq[ScenarioCodingAutomatedCriterion],
      manualItems: Seq[CodingItem],
      automatedItems: Seq[CodingItem],
      criterionSelections: Seq[ScenarioRatingCriterionSelection]): ParticipantScenarioSurveyResult = {
    val otherInvitationIds = invitationIds.filter(_ != invitationId)
    val groupedCodingItemRatings = itemRatings.groupBy(_.codingItemId)
    val groupedManualCriteria = manualCriteria.groupBy(_.itemId)
    val groupedAutomatedCriteria = automatedCriteria.groupBy(_.itemId)

    val manualItemResults = manualItems.map(item =>
      createManualItemResult(
        invitationId = invitationId,
        otherInvitationIds = otherInvitationIds,
        itemRatings = groupedCodingItemRatings.getOrElse(item.id, Nil),
        criteria = groupedManualCriteria.getOrElse(item.id, Nil),
        criterionSelections = criterionSelections,
        item = item
      ))
    val automatedItemResults = automatedItems.map(item =>
      createAutomatedItemResult(
        invitationId = invitationId,
        otherInvitationIds = otherInvitationIds,
        itemRatings = groupedCodingItemRatings.getOrElse(item.id, Nil),
        criteria = groupedAutomatedCriteria.getOrElse(item.id, Nil),
        criterionSelections = criterionSelections,
        item = item
      ))
    val codingItemResults = manualItemResults ++ automatedItemResults

    ParticipantScenarioSurveyResult(
      surveyInvitationId = invitationId,
      scenarioId = scenarioId,
      codingItemResults = codingItemResults)

  }

  private def codingModelEntitiesAction(scenarioId: UUID) =
    findCodingModelForScenarioAction(scenarioId).flatMap {
      case Some(codingModel) =>
        for {
          dimensions <- allCodingDimensionsAction(codingModel.id)
          items <- IO.sequence(dimensions.map(dimension => allCodingItemsAction(dimension.id))).map(_.flatten)
          (automatedItems, manualItems) = items.partition(_.isAutomated)
          automatedCriteria <- IO
            .sequence(automatedItems.map(item => allScenarioCodingAutomatedCriteriaAction(item.id)))
            .map(_.flatten)
          manualCriteria <- IO.sequence(manualItems.map(item => allCodingCriteriaAction(item.id))).map(_.flatten)
        } yield (manualItems, automatedItems, manualCriteria, automatedCriteria)
      case _ =>
        IO.successful((Nil, Nil, Nil, Nil))
    }

  private def scenarioRatingEntitiesAction(surveyId: UUID, itemIds: Seq[UUID]) =
    findFinalScoreRatingAction(surveyId).flatMap(ratingOption =>
      for {
        itemRatings <- ratingOption match {
          case Some(rating) =>
            runIO(
              allScenarioCodingItemRatingsQuotation(rating.id)
                .filter(row => liftQuery(itemIds).contains(row.codingItemId)))
          case _ =>
            IO.successful(Nil)
        }
        itemRatingIds = itemRatings.map(_.id)
        criterionSelections <- runIO(
          query[ScenarioRatingCriterionSelection]
            .filter(row => liftQuery(itemRatingIds).contains(row.scenarioCodingItemRatingId)))
      } yield (itemRatings, criterionSelections))

  private def createManualItemResult(
      invitationId: UUID,
      otherInvitationIds: Seq[UUID],
      itemRatings: Seq[ScenarioCodingItemRating],
      criteria: Seq[CodingCriterion],
      criterionSelections: Seq[ScenarioRatingCriterionSelection],
      item: CodingItem) = {
    def calculateScore(surveyInvitationId: UUID) =
      itemRatings
        .find(_.surveyInvitationId == surveyInvitationId)
        .flatMap(itemRating =>
          calculateManualCodingItemScore(
            criteria,
            itemRating,
            criterionSelections.filter(_.scenarioCodingItemRatingId == itemRating.id)))
        .getOrElse(0)

    val itemRating = itemRatings.find(_.surveyInvitationId == invitationId)
    val noCriterionFulfilled = itemRating.exists(_.noCriterionFulfilled)
    val score = calculateScore(invitationId)

    val maximumScore = calculateManualCodingItemMaximumScore(criteria, item.scoringType)
    val otherScores = otherInvitationIds.map(calculateScore)
    val allScores = score +: otherScores
    val averageScore = if (allScores.nonEmpty) BigDecimal(allScores.sum) / allScores.length else BigDecimal(0)

    val itemRatingId = itemRating.map(_.id)
    val criterionIds = criteria.map(_.id)
    val selectedCriteriaIds = criterionSelections
      .filter(criterionSelection => itemRatingId.contains(criterionSelection.scenarioCodingItemRatingId))
      .collect {
        case selection if selection.manualCriterionId.exists(criterionIds.contains) => selection.manualCriterionId.get
      }

    ParticipantCodingItemSurveyResult(
      itemId = item.id,
      score = score,
      maximumScore = maximumScore,
      averageScore = averageScore,
      selectedCriteriaIds = selectedCriteriaIds,
      noCriterionFulfilled = noCriterionFulfilled
    )
  }

  private def createAutomatedItemResult(
      invitationId: UUID,
      otherInvitationIds: Seq[UUID],
      itemRatings: Seq[ScenarioCodingItemRating],
      criteria: Seq[ScenarioCodingAutomatedCriterion],
      criterionSelections: Seq[ScenarioRatingCriterionSelection],
      item: CodingItem) = {
    def calculateScore(surveyInvitationId: UUID) =
      itemRatings
        .find(_.surveyInvitationId == surveyInvitationId)
        .flatMap(itemRating =>
          calculateAutomatedCodingItemScore(
            criteria,
            itemRating,
            criterionSelections.filter(_.scenarioCodingItemRatingId == itemRating.id)))
        .getOrElse(0)

    val itemRating = itemRatings.find(_.surveyInvitationId == invitationId)
    val noCriterionFulfilled = itemRatings.find(_.surveyInvitationId == invitationId).exists(_.noCriterionFulfilled)
    val score = calculateScore(invitationId)
    val maximumScore = calculateAutomatedCodingItemMaximumScore(criteria, item.scoringType)
    val otherScores = otherInvitationIds.map(calculateScore)
    val allScores = score +: otherScores
    val averageScore = if (allScores.nonEmpty) BigDecimal(allScores.sum) / allScores.length else BigDecimal(0)

    val itemRatingId = itemRating.map(_.id)
    val criterionIds = criteria.map(_.id)
    val selectedCriteriaIds = criterionSelections
      .filter(criterionSelection => itemRatingId.contains(criterionSelection.scenarioCodingItemRatingId))
      .collect {
        case selection if selection.automatedCriterionId.exists(criterionIds.contains) =>
          selection.automatedCriterionId.get
      }

    ParticipantCodingItemSurveyResult(
      itemId = item.id,
      score = score,
      maximumScore = maximumScore,
      averageScore = averageScore,
      selectedCriteriaIds = selectedCriteriaIds,
      noCriterionFulfilled = noCriterionFulfilled
    )
  }

  def scenarioFinalScoreAction(surveyId: UUID, invitationId: UUID, scenarioId: UUID): IO[ScenarioScore, Effect.Read] =
    (for {
      codingModel <- findCodingModelForScenarioAction(scenarioId)
      rating <- findFinalScoreRatingAction(surveyId)
    } yield (codingModel, rating))
      .flatMap {
        case (Some(codingModel), ratingOption) =>
          for {
            (manualItems, automatedItems, manualCriteria, automatedCriteria) <- codingModelEntitiesAction(scenarioId)
            itemIds = (manualItems ++ automatedItems).map(_.id)
            itemRatings <- ratingOption match {
              case Some(rating) =>
                runIO(
                  allScenarioCodingItemRatingsQuotation(rating.id)
                    .filter(itemRating =>
                      liftQuery(itemIds).contains(itemRating.codingItemId)
                        && itemRating.surveyInvitationId == lift(invitationId)))
              case _ =>
                IO.successful(Nil)
            }
            criterionSelections <- runIO(
              query[ScenarioRatingCriterionSelection]
                .filter(row => liftQuery(itemRatings.map(_.id)).contains(row.scenarioCodingItemRatingId)))
          } yield calculateScenarioScore(
            scenarioId,
            automatedItems,
            manualItems,
            automatedCriteria,
            manualCriteria,
            itemRatings,
            criterionSelections)

        case _ =>
          IO.successful(ScenarioScore(scenarioId, 0, 0, isComplete = false))
      }

  private def calculateScenarioScore(
      scenarioId: UUID,
      automatedCodingItems: Seq[CodingItem],
      manualCodingItems: Seq[CodingItem],
      automatedCodingCriteria: Seq[ScenarioCodingAutomatedCriterion],
      manualCodingCriteria: Seq[CodingCriterion],
      codingItemRatings: Seq[ScenarioCodingItemRating],
      codingCriterionSelections: Seq[ScenarioRatingCriterionSelection]): ScenarioScore = {
    val groupedManualCriteria = manualCodingCriteria.groupBy(_.itemId)
    val groupedAutomatedCriteria = automatedCodingCriteria.groupBy(_.itemId)
    val groupedCodingItemRatings = codingItemRatings.groupBy(_.codingItemId)

    val manualItemScores = manualCodingItems.map(item =>
      groupedCodingItemRatings
        .get(item.id)
        .flatMap(_.headOption)
        .flatMap(codingItemRating =>
          calculateManualCodingItemScore(
            groupedManualCriteria.getOrElse(item.id, Nil),
            codingItemRating,
            codingCriterionSelections)))
    val manualItemMaximumScores = manualCodingItems.map(item =>
      calculateManualCodingItemMaximumScore(groupedManualCriteria.getOrElse(item.id, Nil), item.scoringType))

    val automatedItemScores = automatedCodingItems.map(item =>
      groupedCodingItemRatings
        .get(item.id)
        .flatMap(_.headOption)
        .flatMap(codingItemRating =>
          calculateAutomatedCodingItemScore(
            groupedAutomatedCriteria.getOrElse(item.id, Nil),
            codingItemRating,
            codingCriterionSelections)))
    val automatedItemMaximumScores = automatedCodingItems.map(item =>
      calculateAutomatedCodingItemMaximumScore(groupedAutomatedCriteria.getOrElse(item.id, Nil), item.scoringType))

    val scores = manualItemScores ++ automatedItemScores
    val definedScores = scores.flatten
    val score = definedScores.sum
    val maximumScore = manualItemMaximumScores.sum + automatedItemMaximumScores.sum
    val isComplete = scores.length == definedScores.length

    ScenarioScore(scenarioId, score, maximumScore, isComplete)
  }

  private def calculateManualCodingItemScore(
      criteria: Seq[CodingCriterion],
      codingItemRating: ScenarioCodingItemRating,
      criterionSelections: Seq[ScenarioRatingCriterionSelection]): Option[Int] =
    (codingItemRating.noCriterionFulfilled, criterionSelections) match {
      case (true, _) =>
        Some(0)
      case (false, Nil) =>
        None
      case (false, selectedCriteria) =>
        val selectedCriterionIds = selectedCriteria.collect {
          case selection: ScenarioRatingCriterionSelection if selection.manualCriterionId.isDefined =>
            selection.manualCriterionId.get
        }
        val score = calculateCodingItemScore(
          criteria.map(criterion => CodingItemValues(criterion.id, criterion.score)),
          selectedCriterionIds)
        Some(score)
    }

  private def calculateManualCodingItemMaximumScore(criteria: Seq[CodingCriterion], scoringType: ScoringType): Int =
    calculateCodingItemMaximumScore(
      criteria.map(criterion => CodingItemValues(criterion.id, criterion.score)),
      scoringType)

  private def calculateAutomatedCodingItemScore(
      criteria: Seq[ScenarioCodingAutomatedCriterion],
      codingItemRating: ScenarioCodingItemRating,
      criterionSelections: Seq[ScenarioRatingCriterionSelection]): Option[Int] =
    (codingItemRating.noCriterionFulfilled, criterionSelections) match {
      case (true, _) =>
        Some(0)
      case (false, Nil) =>
        None
      case (false, selectedCriteria) =>
        val selectedCriterionIds = selectedCriteria.collect {
          case selection: ScenarioRatingCriterionSelection if selection.automatedCriterionId.isDefined =>
            selection.automatedCriterionId.get
        }
        val score = calculateCodingItemScore(
          criteria.map(criterion => CodingItemValues(criterion.id, criterion.score)),
          selectedCriterionIds)
        Some(score)
    }

  private def calculateAutomatedCodingItemMaximumScore(
      criteria: Seq[ScenarioCodingAutomatedCriterion],
      scoringType: ScoringType): Int =
    calculateCodingItemMaximumScore(
      criteria.map(criterion => CodingItemValues(criterion.id, criterion.score)),
      scoringType)

  private def calculateCodingItemScore(criteria: Seq[CodingItemValues], selectedCriterionIds: Seq[UUID]): Int =
    criteria.filter(criterion => selectedCriterionIds.contains(criterion.id)).map(_.score).sum

  private def calculateCodingItemMaximumScore(criteria: Seq[CodingItemValues], scoringType: ScoringType): Int =
    scoringType match {
      case ScoringType.Holistic => criteria.map(_.score).max
      case ScoringType.Analytical => criteria.map(_.score).sum
    }

  case class CodingItemValues(id: UUID, score: Int)
}
