import {
  DetailViewHeaderButtonConfig,
  DetailViewHeaderDeleteOrArchiveButtonConfig,
  WarningTooltipConfig
} from "shared/components"
import {IconName} from "shared/enums"
import {QuestionnaireType} from "shared/graphql/generated/globalTypes"
import {useArchiveQuestionnaire, useDeleteQuestionnaire} from "shared/graphql/hooks"
import {Questionnaire} from "shared/models"
import {LucaTFunction} from "shared/translations"
import {Option} from "shared/utils"
import {containsEmptyTitleAnswersOrCriteria, containsUnsetCorrectAnswer} from "../utils"

export const getQuestionnaireSecondOperationButtonConfig = (
  questionnaire: Questionnaire,
  isFinalizedOrPublished: boolean,
  publishQuestionnaire: () => void,
  finalizeQuestionnaire: () => void,
  disabled: boolean,
  t: LucaTFunction
): DetailViewHeaderButtonConfig => {
  const isRuntimeSurvey = questionnaire.questionnaireType === QuestionnaireType.RuntimeSurvey
  const cantBePublishedOrFinalized =
    disabled ||
    !questionnaire.questionsCount ||
    containsEmptyTitleAnswersOrCriteria(questionnaire.questions) ||
    (!isRuntimeSurvey && questionnaire.maxDurationInSeconds === null) ||
    (!isRuntimeSurvey && containsUnsetCorrectAnswer(questionnaire.questions))

  if (isFinalizedOrPublished) {
    return {
      icon: IconName.Publish,
      labelKey: "questionnaires__detail_header_publish_button",
      onClick: publishQuestionnaire,
      disabled: cantBePublishedOrFinalized,
      orlyConfirmKey: "questionnaires__header_orly_publish_button",
      orlyTextKey: "questionnaires__header_orly_publish_text",
      orlyTitleKey: "questionnaires__header_orly_publish_title",
      tooltipConfig: {
        labelKey: "questionnaires__header_button_publish_tooltip",
        warningConfig: !isRuntimeSurvey ? getTooltipWarningConfig(questionnaire, disabled, t) : undefined
      }
    }
  } else {
    return {
      labelKey: "questionnaires__detail_header_finalize_button",
      onClick: finalizeQuestionnaire,
      icon: IconName.LockOpen,
      orlyConfirmKey: "scenario_details__header_orly_finalize_button",
      orlyTextKey: "questionnaires__detail_header_finalize_orly_text",
      orlyTitleKey: "questionnaires__detail_header_finalize_orly_title",
      tooltipConfig: {
        labelKey: "questionnaires__detail_header_finalize_tooltip",
        warningConfig: !isRuntimeSurvey ? getTooltipWarningConfig(questionnaire, disabled, t) : undefined
      },
      disabled: cantBePublishedOrFinalized
    }
  }
}

export const getQuestionnaireDetailOperationButtonConfig = (
  questionnaireOption: Option<Questionnaire>,
  isRuntimeSurvey: boolean,
  isEventSelection: boolean,
  isProjectQuestionnaire: boolean,
  handleOperation: () => void,
  disabled: boolean,
  t: LucaTFunction
): DetailViewHeaderButtonConfig | undefined => {
  if (isProjectQuestionnaire) {
    return undefined
  } else if (isEventSelection) {
    // eslint-disable-next-line consistent-return
    return {
      icon: IconName.Duplicate,
      labelKey: "preview",
      onClick: handleOperation
    }
  }

  // eslint-disable-next-line consistent-return
  return questionnaireOption
    .map<DetailViewHeaderButtonConfig>(questionnaire =>
      questionnaire.finalizedAt || questionnaire.publishedAt
        ? {
            icon: IconName.Duplicate,
            labelKey: isRuntimeSurvey
              ? "events__detail_header_duplicate_button"
              : "questionnaires__detail_header_duplicate_button",
            onClick: handleOperation,
            disabled
          }
        : {
            icon: IconName.Publish,
            labelKey: isRuntimeSurvey
              ? "events__detail_header_publish_button"
              : "questionnaires__detail_header_publish_button",
            onClick: handleOperation,
            disabled:
              disabled ||
              !questionnaire.questionsCount ||
              containsEmptyTitleAnswersOrCriteria(questionnaire.questions) ||
              (!isRuntimeSurvey && questionnaire.maxDurationInSeconds === null) ||
              (!isRuntimeSurvey && containsUnsetCorrectAnswer(questionnaire.questions)),
            orlyConfirmKey: "questionnaires__header_orly_publish_button",
            orlyTextKey: isRuntimeSurvey
              ? "events__header_orly_publish_text"
              : "questionnaires__header_orly_publish_text",
            orlyTitleKey: isRuntimeSurvey
              ? "events__header_orly_publish_title"
              : "questionnaires__header_orly_publish_title",
            tooltipConfig: {
              labelKey: isRuntimeSurvey
                ? containsEmptyTitleAnswersOrCriteria(questionnaire.questions)
                  ? "events__header_button_publish_tooltip_disabled_empty_questions_or_answers"
                  : containsUnsetCorrectAnswer(questionnaire.questions)
                  ? "events__header_button_publish_tooltip_unset_correct_answer"
                  : questionnaire.questionsCount === 0
                  ? "events__header_button_publish_tooltip_disabled_no_questions"
                  : "events__header_button_publish_tooltip"
                : "questionnaires__header_button_publish_tooltip",
              warningConfig: !isRuntimeSurvey
                ? questionnaireOption
                    .map(questionnaire => getTooltipWarningConfig(questionnaire, disabled, t))
                    .orUndefined()
                : undefined
            }
          }
    )
    .orUndefined()
}

const getTooltipWarningConfig = (questionnaire: Questionnaire, disabled: boolean, t: LucaTFunction) => {
  const hasNoQuestions = !questionnaire.questionsCount
  const hasEmptyTileOrAnswerOrCriteria = containsEmptyTitleAnswersOrCriteria(questionnaire.questions)
  const hasNoMaxDuration = questionnaire.maxDurationInSeconds === null
  const hasUnsetCorrectAnswer = containsUnsetCorrectAnswer(questionnaire.questions)

  const isDisabled =
    disabled || hasNoQuestions || hasEmptyTileOrAnswerOrCriteria || hasNoMaxDuration || hasUnsetCorrectAnswer

  if (!isDisabled) {
    return undefined
  }

  const tooltipWarningConfig: WarningTooltipConfig[] = []

  if (hasNoQuestions) {
    tooltipWarningConfig.push({label: t("questionnaires__header_button_publish_tooltip_no_questions")})
  }

  if (hasEmptyTileOrAnswerOrCriteria) {
    tooltipWarningConfig.push({label: t("questionnaires__header_button_publish_tooltip_empty_questions")})
  }

  if (hasNoMaxDuration) {
    tooltipWarningConfig.push({label: t("questionnaires__header_button_publish_tooltip_no_time")})
  }

  if (hasUnsetCorrectAnswer) {
    tooltipWarningConfig.push({label: t("questionnaires__header_button_publish_tooltip_unset_correct_answer")})
  }

  // eslint-disable-next-line consistent-return
  return tooltipWarningConfig
}

export const getQuestionnaireDetailDeleteButtonConfig = (
  isSelectionPage: boolean,
  questionnaireOption: Option<Questionnaire>,
  navigateToOverview: () => void,
  userMayArchive: boolean,
  disabled: boolean
): DetailViewHeaderDeleteOrArchiveButtonConfig | undefined => {
  if (isSelectionPage) {
    return undefined
  }

  const canBeArchived =
    questionnaireOption.exists(questionnaire => questionnaire.finalizedAt !== null) ||
    questionnaireOption.exists(questionnaire => questionnaire.publishedAt !== null)

  // eslint-disable-next-line consistent-return
  return questionnaireOption
    .map<DetailViewHeaderDeleteOrArchiveButtonConfig>(questionnaire => {
      const isRuntimeSurvey = questionnaireOption.exists(
        questionnaire => questionnaire.questionnaireType === QuestionnaireType.RuntimeSurvey
      )

      return {
        entityId: questionnaire.id,
        archiveHook: canBeArchived ? () => useArchiveQuestionnaire(isRuntimeSurvey) : undefined,
        invisible: !userMayArchive && canBeArchived,
        deleteHook: !canBeArchived ? () => useDeleteQuestionnaire(isRuntimeSurvey) : undefined,
        disabled: disabled,
        onSuccess: navigateToOverview
      }
    })
    .orUndefined()
}
