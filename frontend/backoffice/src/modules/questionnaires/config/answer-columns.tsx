import {noop} from "lodash-es"
import * as React from "react"
import {
  Button,
  Checkbox,
  ColumnProps,
  deleteEntityButtonStyles,
  getQuestionTypeIconName,
  Icon,
  OrlyButtonContainer,
  RadioButton,
  Text,
  Tooltip
} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {fontColor, fontColorLight, spacingMedium, successColor, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {EditableMultilineTextarea, InlineEditableHeaderContainer, InlineEditableTextarea} from "../../../components"
import {questionnaireDetailStyles} from "../detail/questionnaire-detail.style"
import {getScore} from "../utils"
import {QuestionAnswerTableEntity} from "./question-columns"

export interface AnswerColumnsParams {
  // indicate one or more correct answers to display checkmark hint in first column
  readonly hasCorrectAnswers: boolean
  // usually used on selection pages
  readonly hideActionButtons: boolean
  // setting on question to indicate if free text option is present
  readonly isAdditionalTextAnswerEnabled: boolean
  // usually false for finalized or published
  readonly isEditable: boolean
  // not same as editable since this depends on number of answers in some cases
  readonly isDeletable: boolean
  readonly onDelete: (id: UUID) => void
  readonly openCreation: () => void
  readonly openSortOverlay: () => void
  readonly questionType: QuestionType
  readonly scoringType: QuestionScoringType
  // this usually means either scoring type is none or scoring is not displayed
  readonly showQuestionScoring: boolean
  readonly t: LucaTFunction
  // toggle isAdditionalTextAnswerEnabled flag
  readonly toggleFreeTextAnswer: (isAdditionalTextAnswerAllowed: boolean) => void
  readonly updateAnswer: (id: UUID, update: QuestionAnswerTableEntity) => void
  // check used to mark answers with an intervention
  readonly answerIdsWithInterventions?: UUID[]
  readonly readonly: boolean
}

/**
 * Please see LUCA-986 for detailed column rules
 * @param params
 */
export const getAnswerColumns = (params: AnswerColumnsParams): ColumnProps<QuestionAnswerTableEntity>[] => {
  const {
    answerIdsWithInterventions,
    hasCorrectAnswers,
    hideActionButtons,
    isAdditionalTextAnswerEnabled,
    isEditable,
    isDeletable,
    onDelete,
    openCreation,
    openSortOverlay,
    questionType,
    scoringType,
    showQuestionScoring,
    t,
    toggleFreeTextAnswer,
    updateAnswer,
    readonly
  } = params
  const isSingleChoiceQuestion = questionType === QuestionType.SingleChoice
  const isFreeTextQuestion = questionType === QuestionType.FreeText
  const scoringDisabledForQuestion = scoringType === QuestionScoringType.None
  const showFreeTextQuestionPlaceholder = isFreeTextQuestion && !showQuestionScoring
  const isAnswerCheckingDisabled = (answer: QuestionAnswerTableEntity) =>
    !isEditable || answer.isFreeTextAnswer || !showQuestionScoring || isFreeTextQuestion
  const hasInterventions = answerIdsWithInterventions ? answerIdsWithInterventions.length > 0 : false

  return [
    {
      content: (answer: QuestionAnswerTableEntity) =>
        isSingleChoiceQuestion || scoringType === QuestionScoringType.Holistic ? (
          <RadioButton
            customStyles={questionnaireDetailStyles.radioButton}
            selected={!!answer.isCorrect && showQuestionScoring}
            onChange={isCorrect =>
              updateAnswer(answer.id, {
                text: answer.text,
                score: answer.score || 0,
                isCorrect,
                position: answer.position,
                id: answer.id,
                isFreeTextAnswer: false
              })
            }
            disabled={isAnswerCheckingDisabled(answer)}
          />
        ) : showQuestionScoring || !isFreeTextQuestion ? (
          <Checkbox
            checked={answer.isCorrect && showQuestionScoring}
            onChange={e =>
              updateAnswer(answer.id, {
                text: answer.text,
                score: answer.score || 0,
                isCorrect: e.target.checked,
                position: answer.position,
                id: answer.id,
                isFreeTextAnswer: false
              })
            }
            customStyles={questionnaireDetailStyles.checkBox}
            disabled={isAnswerCheckingDisabled(answer)}
          />
        ) : (
          <div />
        ),
      header: (
        <Icon
          name={showQuestionScoring && !isFreeTextQuestion ? IconName.Check : getQuestionTypeIconName(questionType)}
          color={
            showQuestionScoring && !isFreeTextQuestion && hasCorrectAnswers
              ? successColor
              : showQuestionScoring && !isFreeTextQuestion
              ? fontColorLight
              : fontColor
          }
        />
      ),
      key: "select-col",
      customHeaderStyles: questionnaireDetailStyles.iconColumn,
      customStyles:
        showQuestionScoring || !isFreeTextQuestion
          ? questionnaireDetailStyles.smallColumn
          : questionnaireDetailStyles.emptyColumn
    },
    {
      content: answer =>
        hideActionButtons && !isFreeTextQuestion ? (
          <div css={questionnaireDetailStyles.answerHeader}>
            <Text
              size={TextSize.Medium}
              css={questionnaireDetailStyles.plainText}
              customStyles={answer.isFreeTextAnswer && questionnaireDetailStyles.placeholder}>
              {answer.isFreeTextAnswer ? t("questionnaires_question__free_text_answer_placeholder") : answer.text}
            </Text>
            {answerIdsWithInterventions?.includes(answer.id) && <Icon name={IconName.Check} />}
          </div>
        ) : !showFreeTextQuestionPlaceholder ? (
          <div css={questionnaireDetailStyles.answerWrapper}>
            <EditableMultilineTextarea
              text={answer.text}
              placeholder={
                answer.isFreeTextAnswer
                  ? t("questionnaire_question__answer_freetext")
                  : isFreeTextQuestion
                  ? t("questionnaire_question__answer_criteria_placeholder")
                  : t("questionnaire_question__answer_description_placeholder")
              }
              onConfirm={text =>
                updateAnswer(answer.id, {
                  text,
                  score: answer.score || 0,
                  isCorrect: !!answer.isCorrect,
                  position: answer.position,
                  id: answer.id,
                  isFreeTextAnswer: false
                })
              }
              disabled={readonly || hideActionButtons || answer.isFreeTextAnswer}
            />
            {answer.isFreeTextAnswer && (
              <Icon
                name={IconName.LockClosed}
                height={spacingMedium}
                width={spacingMedium}
                color={fontColorLight}
                customStyles={questionnaireDetailStyles.answerIcon}
              />
            )}
          </div>
        ) : (
          <Tooltip title={t("questionnaire_question__freetext_hint")}>
            <div css={questionnaireDetailStyles.disabledFreeTextWrapper}>
              <InlineEditableTextarea
                placeholder={t("questionnaire_question__freetext_placeholder")}
                text={""}
                isEditing={false}
                disabled={true}
                value={""}
                setValue={noop}
                setIsEditing={noop}
                customStyles={questionnaireDetailStyles.disabledFreeText}
              />
              <Icon
                name={IconName.LockClosed}
                color={fontColorLight}
                customStyles={[questionnaireDetailStyles.answerIcon, questionnaireDetailStyles.textareaIcon]}
              />
            </div>
          </Tooltip>
        ),
      header:
        isFreeTextQuestion && showQuestionScoring ? (
          t("questionnaires__detail_questions_scoring_list_title")
        ) : (
          <div css={questionnaireDetailStyles.answerHeader}>
            <Text size={TextSize.Medium}>{t("questionnaires__detail_questions_answer")}</Text>
            {hasInterventions && (
              <Text size={TextSize.Medium}>{t("questionnaires__detail_questions_answer_has_interventions")}</Text>
            )}
          </div>
        ),
      key: "title"
    },
    ...(!hideActionButtons && !isFreeTextQuestion
      ? [
          {
            content: () => "",
            header: (
              <Tooltip
                inactive={scoringType === QuestionScoringType.None && !isAdditionalTextAnswerEnabled}
                title={
                  scoringType !== QuestionScoringType.None
                    ? t("questionnaire__additional_free_text_answer_disabled")
                    : isAdditionalTextAnswerEnabled
                    ? t("questionnaire__additional_free_text_answer_already_present")
                    : ""
                }>
                <Button
                  icon={IconName.Add}
                  onClick={() => toggleFreeTextAnswer(true)}
                  // free text option only possible if not existing and QuestionScoringType = None
                  disabled={isAdditionalTextAnswerEnabled || !scoringDisabledForQuestion || !isEditable}>
                  {t("questionnaire__free_text_option")}
                </Button>
              </Tooltip>
            ),
            key: "add-free-text",
            customHeaderStyles: questionnaireDetailStyles.buttonColumn,
            customStyles: questionnaireDetailStyles.emptyColumn
          }
        ]
      : []),
    ...(!hideActionButtons
      ? [
          ...(isFreeTextQuestion && showQuestionScoring
            ? [
                {
                  content: (answer: QuestionAnswerTableEntity, index?: number) => {
                    const scoreDisabled =
                      answer.score === 0 && scoringType === QuestionScoringType.Holistic && isFreeTextQuestion
                    return (
                      <Tooltip
                        title={
                          scoreDisabled
                            ? t("questionnaires_question__holistic_score_null_value_hint")
                            : t("questionnaires_question__score_variable_value_hint", {minScore: 1, maxScore: 99})
                        }>
                        <InlineEditableHeaderContainer
                          text={`${answer.score}`}
                          formatValue={value => {
                            const score = getScore(value, index === 0 ? 0 : 1)
                            return `${score} ${
                              score === 1
                                ? t("questionnaire_question__scoring_unit_singular")
                                : t("questionnaire_question__scoring_unit")
                            }`
                          }}
                          customStyles={questionnaireDetailStyles.answerInput}
                          onConfirm={score =>
                            updateAnswer(answer.id, {
                              text: answer.text,
                              score: getScore(score, index === 0 ? 0 : 1),
                              isCorrect: !!answer.isCorrect,
                              position: answer.position,
                              id: answer.id,
                              isFreeTextAnswer: false
                            })
                          }
                          disabled={!isEditable || answer.isFreeTextAnswer || scoreDisabled}
                          showLockWhenDisabled={scoreDisabled}
                        />
                      </Tooltip>
                    )
                  },
                  header: !isFreeTextQuestion ? (
                    <Button
                      icon={IconName.Sort}
                      onClick={openSortOverlay}
                      variant={ButtonVariant.IconOnly}
                      disabled={!isEditable}
                    />
                  ) : (
                    t("questionnaire__score")
                  ),
                  key: "sort-action",
                  customStyles: questionnaireDetailStyles.scoreColumn,
                  customHeaderStyles: questionnaireDetailStyles.scoreHeader
                }
              ]
            : [
                {
                  content: () => "",
                  header: !isFreeTextQuestion ? (
                    <Button
                      icon={IconName.Sort}
                      onClick={openSortOverlay}
                      variant={ButtonVariant.IconOnly}
                      disabled={!isEditable}
                    />
                  ) : (
                    ""
                  ),
                  key: "sort-action",
                  customHeaderStyles: questionnaireDetailStyles.smallColumn,
                  customStyles: questionnaireDetailStyles.emptyColumn
                }
              ]),
          {
            content: (answer: QuestionAnswerTableEntity) => {
              if (!isFreeTextQuestion || showQuestionScoring) {
                const isNonDeletableFreetextAnswer =
                  answer.score === 0 && scoringType === QuestionScoringType.Holistic && isFreeTextQuestion
                return (
                  <OrlyButtonContainer
                    onConfirm={answer.isFreeTextAnswer ? () => toggleFreeTextAnswer(false) : () => onDelete(answer.id)}
                    customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
                    disabled={
                      ((!answer.isFreeTextAnswer || !isEditable) && !isDeletable) || isNonDeletableFreetextAnswer
                    }
                    iconColor={fontColor}
                    tooltipConfig={{
                      labelKey:
                        !answer.isFreeTextAnswer && (!isDeletable || isNonDeletableFreetextAnswer)
                          ? "questionnaires_question__not_deletable"
                          : undefined
                    }}
                    dismissOnConfirm={true}
                  />
                )
              }
              return ""
            },
            header:
              !isFreeTextQuestion || showQuestionScoring ? (
                <Button
                  icon={IconName.Add}
                  onClick={openCreation}
                  variant={ButtonVariant.IconOnly}
                  disabled={!isEditable}
                />
              ) : (
                ""
              ),
            key: "delete-action",
            customHeaderStyles: questionnaireDetailStyles.smallColumn,
            customStyles:
              isFreeTextQuestion && !showQuestionScoring
                ? questionnaireDetailStyles.emptyColumn
                : questionnaireDetailStyles.iconColumn
          }
        ]
      : [])
  ]
}
