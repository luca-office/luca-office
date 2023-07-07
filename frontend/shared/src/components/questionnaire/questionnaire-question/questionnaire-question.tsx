import React from "react"
import {QuestionType} from "../../../graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "../../../models"
import {TextSize} from "../../../styles"
import {sortByPosition} from "../../../utils/sort"
import {ParticipantQuestionAnswer, Text, TextArea} from "../.."
import {Icon} from "../../icon/icon"
import {STATIC_FREETEXT_ANSWER_ID} from "../config/common"
import {InlineMediaViewer} from "../inline-media-viewer/inline-media-viewer"
import {AdditionalFreeTextAnswer} from "./additional-freetext-answer"
import {useQuestionnaireQuestion} from "./hooks/use-questionnaire-question"
import {styles} from "./questionnaire-question.style"
import {getAnswersTitle, getQuestionTypeIconName, getQuestionTypeTitle} from "./questionnaire-question-helpers"
import {SelectableAnswer} from "./selectable-answer"

export interface QuestionnaireQuestionProps {
  readonly questionNumber: number
  readonly question: QuestionnaireQuestion
  readonly participantAnswer?: ParticipantQuestionAnswer
  readonly onSelectAnswer?: (answerId: UUID) => void
  readonly onDeselectAnswer?: (answerId: UUID) => void
  readonly onChangeFreeText?: (text: string) => void
  readonly onMediaEnlarged?: (binaryFileId: UUID) => void
  readonly onMediaShrunk?: (binaryFileId: UUID) => void
  readonly onVideoPlaybackStarted?: (binaryFileId: UUID) => void
  readonly onVideoPlaybackEnded?: (binaryFileId: UUID) => void
  readonly onVideoPlaybackPaused?: (binaryFileId: UUID) => void
  readonly onVideoFullscreenEntered?: (binaryFileId: UUID) => void
  readonly onVideoFullscreenLeft?: (binaryFileId: UUID) => void
}

export const QuestionnaireQuestionComponent: React.FC<QuestionnaireQuestionProps> = ({
  questionNumber,
  question,
  participantAnswer,
  onSelectAnswer,
  onDeselectAnswer,
  onChangeFreeText,
  onMediaEnlarged,
  onMediaShrunk,
  onVideoPlaybackStarted,
  onVideoPlaybackEnded,
  onVideoPlaybackPaused,
  onVideoFullscreenEntered,
  onVideoFullscreenLeft
}) => {
  const {text, questionType, answers, isAdditionalFreeTextAnswerEnabled, binaryFile} = question
  const binarySurveyEvents = binaryFile
    ? {
        onMediaEnlarged: () => onMediaEnlarged?.(binaryFile.id),
        onMediaShrunk: () => onMediaShrunk?.(binaryFile.id),
        onVideoPlaybackStarted: () => onVideoPlaybackStarted?.(binaryFile.id),
        onVideoPlaybackEnded: () => onVideoPlaybackEnded?.(binaryFile.id),
        onVideoPlaybackPaused: () => onVideoPlaybackPaused?.(binaryFile.id),
        onVideoFullscreenEntered: () => onVideoFullscreenEntered?.(binaryFile.id),
        onVideoFullscreenLeft: () => onVideoFullscreenLeft?.(binaryFile.id)
      }
    : {}
  const {
    selectedAnswers,
    toggleAnswer,
    freeText,
    setFreeText,
    isPreviewZoomed,
    toggleZoom,
    t
  } = useQuestionnaireQuestion({
    question,
    onSelectAnswer,
    onDeselectAnswer,
    onChangeFreeText,
    onMediaEnlarged: binarySurveyEvents.onMediaEnlarged,
    onMediaShrunk: binarySurveyEvents.onMediaShrunk
  })
  const isReadOnly = participantAnswer !== undefined

  const getSelectionState = (answerId: UUID, participantAnswer?: ParticipantQuestionAnswer) => {
    if (participantAnswer !== undefined) {
      switch (participantAnswer.questionType) {
        case QuestionType.SingleChoice:
          return participantAnswer.selectedAnswerId === answerId
        case QuestionType.MultipleChoice:
          return participantAnswer.selectedAnswerIds.includes(answerId)
        default:
          return false
      }
    } else {
      return selectedAnswers.includes(answerId)
    }
  }

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <Text customStyles={styles.title} size={TextSize.Medium}>
          {t("questionnaire__question_number", {questionNumber})}
        </Text>
        <div css={styles.questionTypeContainer}>
          <div css={styles.questionTypeTitle}>{getQuestionTypeTitle(t, questionType)}</div>
          <Icon className="questionnaire-question-question-type-icon" name={getQuestionTypeIconName(questionType)} />
        </div>
      </div>
      <div css={styles.descriptionContainer(isPreviewZoomed)}>
        <Text className="questionnaire-question-description" size={TextSize.Medium} customStyles={styles.questionText}>
          {text}
        </Text>
        {binaryFile && (
          <InlineMediaViewer
            customStyles={styles.inlineMediaViewer(isPreviewZoomed)}
            binaryFile={binaryFile}
            isZoomed={isPreviewZoomed}
            onZoomClicked={toggleZoom}
            {...binarySurveyEvents}
          />
        )}
      </div>
      <div css={styles.answersTitle}>{getAnswersTitle(t, questionType)}</div>
      <div css={styles.answersContainer}>
        {questionType === QuestionType.FreeText ? (
          <TextArea
            disabled={isReadOnly}
            value={participantAnswer?.freeTextAnswer ?? freeText}
            onChange={e => setFreeText(e.currentTarget.value)}
            customStyles={styles.freeTextArea}
          />
        ) : (
          <>
            {sortByPosition(answers).map(answer => (
              <SelectableAnswer
                disabled={isReadOnly}
                key={answer.id}
                questionType={questionType}
                answer={answer}
                handleSelectionChange={toggleAnswer}
                isSelected={getSelectionState(answer.id, participantAnswer)}
                isHighlighted={isReadOnly && getSelectionState(answer.id, participantAnswer)}
              />
            ))}
            {isAdditionalFreeTextAnswerEnabled && (
              <AdditionalFreeTextAnswer
                initialText={participantAnswer?.freeTextAnswer}
                isDisabled={isReadOnly}
                key={STATIC_FREETEXT_ANSWER_ID}
                questionType={questionType}
                onClick={toggleAnswer}
                onChangeFreeText={setFreeText}
                isSelected={
                  selectedAnswers.includes(STATIC_FREETEXT_ANSWER_ID) ||
                  ((participantAnswer?.questionType === QuestionType.SingleChoice ||
                    participantAnswer?.questionType === QuestionType.MultipleChoice) &&
                    participantAnswer.isFreetextAnswerSelected)
                }
                isHighlighted={participantAnswer?.freeTextAnswer !== undefined}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
