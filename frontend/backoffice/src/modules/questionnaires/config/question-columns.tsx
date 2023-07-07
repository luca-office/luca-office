import {max, sum} from "lodash-es"
import * as React from "react"
import {Button, ColumnProps, deleteEntityButtonStyles, Icon, OrlyButtonContainer, Text} from "shared/components"
import {getQuestionTypeIconName} from "shared/components/questionnaire/questionnaire-question/questionnaire-question-helpers"
import {ButtonVariant, IconName} from "shared/enums"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "shared/models"
import {errorColor, fontColor} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {questionnaireDetailStyles} from "../detail/questionnaire-detail.style"

export interface QuestionAnswerTableEntity {
  readonly id: UUID
  readonly isFreeTextAnswer: boolean
  readonly text: string
  readonly isCorrect?: boolean
  readonly score?: number
  readonly position?: number
  readonly disabled?: boolean
}

interface QuestionColumnsParams {
  readonly deleteQuestion: (id: UUID) => void
  readonly hideActionButtons: boolean
  readonly isEditable: boolean
  readonly openCreation: () => void
  readonly openSortOverlay: () => void
  readonly showQuestionScoring: boolean
  readonly t: LucaTFunction
}

export const getQuestionsColumns = (params: QuestionColumnsParams): ColumnProps<QuestionnaireQuestion>[] => {
  const {hideActionButtons, showQuestionScoring, t, openSortOverlay, isEditable, openCreation, deleteQuestion} = params

  return [
    {
      content: question => (
        <Icon name={getQuestionTypeIconName(question.questionType)} color={question.text ? fontColor : errorColor} />
      ),
      header: <Icon name={IconName.ClipboardQuestionnaire} />,
      key: "icon-col",
      customHeaderStyles: questionnaireDetailStyles.iconColumn,
      customStyles: questionnaireDetailStyles.iconColumn
    },
    {
      content: question => (
        <Text customStyles={questionnaireDetailStyles.textStyle(!!question.text)}>
          {question.text || t("questionnaires__detail_questions_no_question_given")}
        </Text>
      ),
      header: t("questionnaires__detail_questions_question"),
      key: "title"
    },
    ...(showQuestionScoring
      ? [
          {
            content: (question: QuestionnaireQuestion) => (
              <Text customStyles={questionnaireDetailStyles.textStyle(true)}>{getQuestionMaxScore(question, t)}</Text>
            ),
            header: t("questionnaires__detail_questions_scoring"),
            key: "score"
          }
        ]
      : []),
    ...(!hideActionButtons
      ? [
          {
            content: () => "",
            header: (
              <Button
                icon={IconName.Sort}
                onClick={openSortOverlay}
                variant={ButtonVariant.IconOnly}
                disabled={!isEditable}
              />
            ),
            key: "sort-action",
            customHeaderStyles: questionnaireDetailStyles.smallColumn,
            customStyles: questionnaireDetailStyles.smallColumn
          },
          {
            content: (question: {id: string}) => (
              <OrlyButtonContainer
                onConfirm={() => deleteQuestion(question.id)}
                customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
                disabled={!isEditable}
                tooltipConfig={{labelKey: !isEditable ? "questionnaires_question__not_deletable" : undefined}}
                iconColor={fontColor}
                dismissOnConfirm={true}
                stopEventPropagation={true}
                stopEventPropagationOnOverlayClick={true}
              />
            ),
            header: (
              <Button
                icon={IconName.Add}
                onClick={openCreation}
                variant={ButtonVariant.IconOnly}
                disabled={!isEditable}
              />
            ),
            key: "delete-action",
            customHeaderStyles: questionnaireDetailStyles.smallColumn,
            customStyles: questionnaireDetailStyles.smallColumn
          }
        ]
      : [])
  ]
}

export const freeTextAnswerEntity: QuestionAnswerTableEntity = {
  isCorrect: false,
  isFreeTextAnswer: true,
  text: "",
  id: "-1",
  score: 0,
  position: 1
}

const getQuestionMaxScore = (question: QuestionnaireQuestion, t: LucaTFunction) => {
  if (question.scoringType === QuestionScoringType.None) {
    return t("rater_rating_details__project_module_no_rating")
  } else if (question.questionType !== QuestionType.FreeText) {
    return question.score
  } else if (question.scoringType === QuestionScoringType.Holistic) {
    return max(question.freetextQuestionCodingCriteria.map(criterion => criterion.score))
  } else {
    return sum(question.freetextQuestionCodingCriteria.map(criterion => criterion.score))
  }
}
