import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import React from "react"
import {IconName, ViewerToolsType} from "../../../enums"
import {QuestionType} from "../../../graphql/generated/globalTypes"
import {Questionnaire, QuestionnaireQuestion, QuestionnaireSurveyEvents} from "../../../models"
import {backgroundColorBright, CustomStyle, spacing, spacingHuger, spacingLarge, spacingMedium} from "../../../styles"
import {find} from "../../../utils/array"
import {isDefined} from "../../../utils/common"
import {sortByPosition} from "../../../utils/sort"
import {STATIC_FREETEXT_ANSWER_ID} from "../config/common"
import {QuestionnaireIntroduction} from "../questionnaire-introduction/questionnaire-introduction"
import {QuestionnaireQuestionComponent} from "../questionnaire-question"

export interface QuestionnaireViewFooterConfig {
  readonly label: string
  readonly onClick: () => void
}

export interface QuestionnaireViewWindowConfig {
  readonly icon: IconName
  readonly label: string
  readonly toolType: ViewerToolsType
}

export type ParticipantQuestionAnswer =
  | {
      readonly questionType: QuestionType.SingleChoice
      readonly questionId: UUID
      readonly selectedAnswerId: UUID
      readonly isFreetextAnswerSelected: boolean
      readonly freeTextAnswer?: string
    }
  | {
      readonly questionType: QuestionType.MultipleChoice
      readonly questionId: UUID
      readonly selectedAnswerIds: UUID[]
      readonly isFreetextAnswerSelected: boolean
      readonly freeTextAnswer?: string
    }
  | {
      readonly questionType: QuestionType.FreeText
      readonly questionId: UUID
      readonly freeTextAnswer: string
    }

export interface QuestionnaireParticipantResults {
  readonly questionnaireId: UUID
  readonly answers: Record<UUID, ParticipantQuestionAnswer>
}

export interface QuestionnaireViewProps extends CustomStyle {
  readonly questionnaire: Questionnaire
  readonly customQuestionsContainerStyles?: CSSInterpolation
  readonly onSelectAnswer?: (questionId: UUID, answerId: UUID) => void
  readonly onDeselectAnswer?: (questionId: UUID, answerId: UUID) => void
  readonly onChangeFreeText?: (questionId: string, text: string) => void
  readonly surveyEvents?: QuestionnaireSurveyEvents
  readonly results?: QuestionnaireParticipantResults
}

export const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({
  questionnaire,
  customStyles,
  onSelectAnswer,
  onDeselectAnswer,
  onChangeFreeText,
  surveyEvents,
  results,
  customQuestionsContainerStyles
}) => {
  const createIntroductionEventHandlers = () => {
    if (!surveyEvents || !isDefined(questionnaire.binaryFileId)) {
      return {}
    }

    const payload = {binaryFileId: questionnaire.binaryFileId}

    return {
      onImageEnlarged: () => surveyEvents.sendEnlargeQuestionnaireBinary(questionnaire.id, payload),
      onImageShrunk: () => surveyEvents.sendShrinkQuestionnaireBinary(questionnaire.id, payload),
      onVideoFullscreenEntered: () => surveyEvents.sendEnterFullscreenQuestionnaireVideo(questionnaire.id, payload),
      onVideoFullscreenLeft: () => surveyEvents.sendLeaveFullscreenQuestionnaireVideo(questionnaire.id, payload),
      onVideoPlaybackStarted: () => surveyEvents.sendPlayQuestionnaireVideo(questionnaire.id, payload),
      onVideoPlaybackPaused: () => surveyEvents.sendPauseQuestionnaireVideo(questionnaire.id, payload),
      onVideoPlaybackEnded: () => surveyEvents.sendQuestionnaireVideoPlaybackEnded(questionnaire.id, payload)
    }
  }

  const createQuestionEventHandlers = (questionId: UUID) =>
    surveyEvents
      ? {
          onSelectAnswer: (answerId: UUID, freeText?: string) => {
            onSelectAnswer?.(questionId, answerId)

            find(q => q.id === questionId, questionnaire.questions).forEach(question => {
              if (answerId === STATIC_FREETEXT_ANSWER_ID) {
                surveyEvents.sendSelectQuestionnaireFreeTextAnswer(
                  questionnaire.id,
                  questionId,
                  question.position,
                  question.answers.length,
                  freeText || ""
                )
              } else {
                find(a => a.id === answerId, question.answers).forEach(({position, text}) => {
                  surveyEvents.sendSelectQuestionnaireAnswer(
                    questionnaire.id,
                    questionId,
                    answerId,
                    question.position,
                    position,
                    text
                  )
                })
              }
            })
          },
          onDeselectAnswer: (answerId: UUID, freeText?: string) => {
            onDeselectAnswer?.(questionId, answerId)

            find(q => q.id === questionId, questionnaire.questions).forEach(question => {
              if (answerId === STATIC_FREETEXT_ANSWER_ID) {
                surveyEvents.sendDeselectQuestionnaireFreeTextAnswer(
                  questionnaire.id,
                  questionId,
                  question.position,
                  question.answers.length,
                  freeText || ""
                )
              }
              find(a => a.id === answerId, question.answers).forEach(({position, text}) => {
                surveyEvents.sendDeselectQuestionnaireAnswer(
                  questionnaire.id,
                  questionId,
                  answerId,
                  question.position,
                  position,
                  text
                )
              })
            })
          },
          onChangeFreeText: (text: string) => {
            onChangeFreeText?.(questionId, text)
            find(q => q.id === questionId, questionnaire.questions).forEach(question => {
              surveyEvents.sendUpdateQuestionnaireFreeTextAnswer(questionnaire.id, questionId, text, question.position)
            })
          },
          onMediaEnlarged: (binaryFileId: UUID) =>
            surveyEvents.sendEnlargeQuestionnaireQuestionBinary(questionnaire.id, {questionId, binaryFileId}),
          onMediaShrunk: (binaryFileId: UUID) =>
            surveyEvents.sendShrinkQuestionnaireQuestionBinary(questionnaire.id, {questionId, binaryFileId}),
          onVideoFullscreenEntered: (binaryFileId: UUID) =>
            surveyEvents.sendEnterFullscreenQuestionnaireQuestionVideo(questionnaire.id, {questionId, binaryFileId}),
          onVideoFullscreenLeft: (binaryFileId: UUID) =>
            surveyEvents.sendLeaveFullscreenQuestionnaireQuestionVideo(questionnaire.id, {questionId, binaryFileId}),
          onVideoPlaybackStarted: (binaryFileId: UUID) =>
            surveyEvents.sendPlayQuestionnaireQuestionVideo(questionnaire.id, {questionId, binaryFileId}),
          onVideoPlaybackPaused: (binaryFileId: UUID) =>
            surveyEvents.sendPauseQuestionnaireQuestionVideo(questionnaire.id, {questionId, binaryFileId}),
          onVideoPlaybackEnded: (binaryFileId: UUID) =>
            surveyEvents.sendQuestionnaireQuestionVideoPlaybackEnded(questionnaire.id, {questionId, binaryFileId})
        }
      : {
          onSelectAnswer: (answerId: UUID) => onSelectAnswer?.(questionId, answerId),
          onDeselectAnswer: (answerId: UUID) => onDeselectAnswer?.(questionId, answerId),
          onChangeFreeText: (text: string) => onChangeFreeText?.(questionId, text)
        }

  return (
    <div css={[styles.container, customStyles]}>
      <QuestionnaireIntroduction
        title={questionnaire.title}
        description={questionnaire.description}
        binaryFile={questionnaire.binaryFile || undefined}
        {...createIntroductionEventHandlers()}
      />
      <div css={[styles.questions, customQuestionsContainerStyles]}>
        {sortByPosition<QuestionnaireQuestion>(questionnaire.questions).map(
          (question: QuestionnaireQuestion, index: number) => (
            <QuestionnaireQuestionComponent
              questionNumber={index + 1}
              key={question.id}
              question={question}
              participantAnswer={results?.answers[question.id]}
              {...createQuestionEventHandlers(question.id)}
            />
          )
        )}
      </div>
    </div>
  )
}

const styles = {
  container: css({
    padding: spacing(spacingMedium, spacingLarge, 0, spacingLarge),
    overflowY: "auto",
    backgroundColor: backgroundColorBright
  }),
  questions: css({
    display: "grid",
    gridColumn: "1fr",
    gap: spacingHuger
  })
}
