import * as React from "react"
import {Button, Card, CardContent, CardFooterItem, Label, TableContainer, Text, Tooltip} from "shared/components"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {
  FreetextQuestionCodingCriterion,
  QuestionnaireAnswer,
  QuestionnaireQuestion,
  RuntimeSurveyAnswerSelectionIntervention
} from "shared/models"
import {Flex, TextSize} from "shared/styles"
import {WithLucaTranslation} from "shared/translations"
import {find, Option, sortByCreatedAt, sortByPosition} from "shared/utils"
import {InlineEditableHeaderContainer} from "../../../../components"
import {freeTextAnswerEntity, getAnswerColumns, QuestionAnswerTableEntity} from "../../config"
import {getScore} from "../../utils"
import {UseQuestionnaireQuestionDetailHook} from "../questionnaire-question-detail/hooks/use-questionnaire-question-detail"
import {questionAnswerTableStyles as styles} from "./question-answer-table.style"

export interface QuestionAnswerInterventionsConfig {
  readonly interventions: RuntimeSurveyAnswerSelectionIntervention[]
  readonly onAnswerClick: (entity: QuestionAnswerTableEntity) => void
  readonly selectedEntityForInterventionSettings: Option<QuestionAnswerTableEntity>
  readonly isCreateInterventionModalVisible: boolean
  readonly toggleIsCreateInterventionModalVisible: () => void
  readonly scenarioId: UUID
  readonly scenarioMaxDurationInSeconds: number
}

export interface QuestionAnswerTableProps
  extends Pick<UseQuestionnaireQuestionDetailHook, "updateQuestionnaireAnswer">,
    Pick<UseQuestionnaireQuestionDetailHook, "updateQuestionnaireQuestion">,
    WithLucaTranslation {
  readonly deleteAnswer: (id: UUID) => void
  readonly handleCreateAnswer: () => void
  readonly hideActions: boolean
  readonly isEditable: boolean
  readonly interventionsConfig?: QuestionAnswerInterventionsConfig
  readonly openAnswersSortOverlay: () => void
  readonly questionnaireQuestion: QuestionnaireQuestion
  readonly showQuestionScoring: boolean
  readonly toggleFreeTextAnswer: (additionalAnswerAllowed: boolean) => void
  readonly readonly: boolean
}

export const QuestionAnswerTable: React.FunctionComponent<QuestionAnswerTableProps> = ({
  questionnaireQuestion,
  showQuestionScoring,
  hideActions,
  updateQuestionnaireAnswer,
  toggleFreeTextAnswer,
  isEditable,
  interventionsConfig,
  handleCreateAnswer,
  openAnswersSortOverlay,
  deleteAnswer,
  updateQuestionnaireQuestion,
  readonly,
  t
}) => {
  const isFreeTextQuestion = questionnaireQuestion.questionType === QuestionType.FreeText
  const hasNoneScoreSetting = questionnaireQuestion.scoringType === QuestionScoringType.None
  const displayScoring = !hasNoneScoreSetting && showQuestionScoring
  const sortedAnswers: (FreetextQuestionCodingCriterion | QuestionnaireAnswer)[] = isFreeTextQuestion
    ? sortByCreatedAt(questionnaireQuestion.freetextQuestionCodingCriteria)
    : sortByPosition(questionnaireQuestion.answers)
  const hasCorrectAnswers = displayScoring && questionnaireQuestion.answers.some(answer => answer.isCorrect)

  const answerIdsWithAssociatedIntervention = interventionsConfig?.interventions.map(
    intervention => intervention.answerId
  )

  const firstNonDeletableFreetextQuestionCodingCriterion = isFreeTextQuestion
    ? find(
        answer => (answer as FreetextQuestionCodingCriterion).score === 0,
        sortedAnswers as FreetextQuestionCodingCriterion[]
      )
    : Option.none<FreetextQuestionCodingCriterion>()

  const answerEntities: QuestionAnswerTableEntity[] = [
    ...sortedAnswers
      .filter(
        answer =>
          !(
            isFreeTextQuestion &&
            questionnaireQuestion.scoringType === QuestionScoringType.Analytical &&
            (answer as FreetextQuestionCodingCriterion).score === 0
          )
      )
      .map((answer: FreetextQuestionCodingCriterion | QuestionnaireAnswer) =>
        !isFreeTextQuestion
          ? {
              isCorrect: (answer as QuestionnaireAnswer).isCorrect,
              position: (answer as QuestionnaireAnswer).position,
              isFreeTextAnswer: false,
              text: (answer as QuestionnaireAnswer).text,
              id: answer.id
            }
          : {
              score: (answer as FreetextQuestionCodingCriterion).score,
              isCorrect: false,
              isFreeTextAnswer: false,
              text: (answer as FreetextQuestionCodingCriterion).description,
              id: answer.id,
              disabled:
                questionnaireQuestion.scoringType === QuestionScoringType.Holistic &&
                firstNonDeletableFreetextQuestionCodingCriterion
                  .map(criterion => criterion.id === answer.id)
                  .getOrElse(false)
            }
      ),
    ...((questionnaireQuestion.isAdditionalFreeTextAnswerEnabled &&
      questionnaireQuestion.scoringType === QuestionScoringType.None) ||
    (!showQuestionScoring && isFreeTextQuestion)
      ? // add a freetext answer option placeholder if setting is given an none scoring
        [freeTextAnswerEntity]
      : [])
  ]
  // if no scoring is valid and freetext, the answers are reduced artificially to display a single placeholder
  const answerTableEntities =
    (hasNoneScoreSetting || !showQuestionScoring) && isFreeTextQuestion ? [freeTextAnswerEntity] : answerEntities
  const answerColumns = getAnswerColumns({
    openSortOverlay: openAnswersSortOverlay,
    openCreation: handleCreateAnswer,
    onDelete: deleteAnswer,
    toggleFreeTextAnswer,
    questionType: questionnaireQuestion.questionType,
    scoringType: questionnaireQuestion.scoringType,
    hasCorrectAnswers,
    isEditable,
    isDeletable: isFreeTextQuestion
      ? questionnaireQuestion.freetextQuestionCodingCriteria.length > 2
      : questionnaireQuestion.answers.length > 2,
    isAdditionalTextAnswerEnabled: questionnaireQuestion.isAdditionalFreeTextAnswerEnabled,
    hideActionButtons: hideActions,
    showQuestionScoring: displayScoring,
    updateAnswer: updateQuestionnaireAnswer,
    answerIdsWithInterventions: answerIdsWithAssociatedIntervention,
    readonly,
    t
  })

  const getTableFooter = () => {
    if (
      !isEditable ||
      !displayScoring ||
      (isFreeTextQuestion && questionnaireQuestion.scoringType === QuestionScoringType.Holistic)
    ) {
      return <div css={styles.emptyFooter} />
    }

    if (isFreeTextQuestion && questionnaireQuestion.scoringType === QuestionScoringType.Analytical) {
      return (
        <Card hasShadow={true} customStyles={styles.noScoreCard}>
          <CardContent customStyles={styles.noScoreContent}>
            <div css={Flex.column}>
              <Text customStyles={styles.noScoreHeadline} size={TextSize.Medium}>
                {t("questionnaires_question__scoring_freetext_analytic_title")}
              </Text>
              <Text size={TextSize.Medium}>{t("questionnaires_question__scoring_freetext_analytic_text")}</Text>
            </div>
            <Button customStyles={styles.noScoreButton} disabled={true}>
              {t("questionnaires_question__scoring_freetext_analytic_button")}
            </Button>
          </CardContent>
        </Card>
      )
    }

    if (!isFreeTextQuestion) {
      const handleUpdateScore = (score: string) =>
        updateQuestionnaireQuestion({
          score: getScore(score, questionnaireQuestion.questionType === QuestionType.SingleChoice ? 1 : 0),
          text: questionnaireQuestion.text,
          questionType: questionnaireQuestion.questionType,
          isAdditionalTextAnswerAllowed: questionnaireQuestion.isAdditionalFreeTextAnswerEnabled,
          scoringType: questionnaireQuestion.scoringType
        })

      return (
        <div css={styles.scoreLine}>
          <CardFooterItem
            customStyles={styles.scoreLabel}
            customTextStyles={styles.scoreLabelText}
            text={t(
              questionnaireQuestion.questionType === QuestionType.SingleChoice
                ? "questionnaires_question__scoring_single_holistic_text"
                : "questionnaires_question__scoring_multiple_analytic_text"
            )}
          />
          <Tooltip
            title={t("questionnaires_question__score_variable_value_hint", {
              minScore: questionnaireQuestion.questionType === QuestionType.SingleChoice ? 1 : 0,
              maxScore: 99
            })}>
            <InlineEditableHeaderContainer
              onConfirm={handleUpdateScore}
              customStyles={styles.scoreEditField}
              customTextInputStyles={styles.scoreInput}
              text={`${questionnaireQuestion.score}`}
              isNumber={true}
              formatValue={score => `${score} ${t("questionnaire_question__scoring_unit")}`}
            />
          </Tooltip>
        </div>
      )
    }

    return <div css={styles.emptyFooter} />
  }

  return (
    <React.Fragment>
      <Label
        customStyles={styles.spacedLabel}
        label={
          isFreeTextQuestion && showQuestionScoring
            ? t("questionnaires__detail_questions_scoring_count_title", {
                count:
                  questionnaireQuestion.scoringType === QuestionScoringType.Analytical
                    ? questionnaireQuestion.freetextQuestionCodingCriteria?.length - 1 ?? 0
                    : questionnaireQuestion.freetextQuestionCodingCriteria?.length
              })
            : t("questionnaires__detail_questions_answers_title", {
                count:
                  isFreeTextQuestion && !showQuestionScoring
                    ? 1
                    : questionnaireQuestion.answers?.length ??
                      0 + (questionnaireQuestion.isAdditionalFreeTextAnswerEnabled ? 1 : 0)
              })
        }
      />
      <TableContainer
        entities={answerTableEntities}
        columns={answerColumns}
        entityKey={answer => answer.id}
        customHeaderRowStyles={styles.tableHeader}
        customRowStyles={entity =>
          styles.tableRow(
            interventionsConfig?.selectedEntityForInterventionSettings.map(answer => answer.id).contains(entity.id) ??
              false,
            !entity.isFreeTextAnswer
          )
        }
        onClick={entity => (!entity.isFreeTextAnswer ? interventionsConfig?.onAnswerClick(entity) : undefined)}
        showFooter={true}
        tableFooter={getTableFooter()}
        customTableFooterStyles={styles.tableFooter}
      />
    </React.Fragment>
  )
}
