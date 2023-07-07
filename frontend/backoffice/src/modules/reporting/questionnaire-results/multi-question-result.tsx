import React, {useState} from "react"
import {
  getAnswersTitle,
  getQuestionTypeIconName,
  getQuestionTypeTitle,
  Icon,
  InlineMediaViewer,
  Text
} from "shared/components"
import {FreetextAnswerFragment} from "shared/graphql/generated/FreetextAnswerFragment"
import {QuestionType} from "shared/graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "shared/models"
import {RuntimeSurveyQuestionResults} from "shared/models/runtime-survey-results"
import {TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {sortByPosition} from "shared/utils"
import {FreeTextAnswerSwitch} from "./free-text-answer-switch/free-text-answer-switch"
import {MultiQuestionAnswer} from "./multi-question-answer"
import {styles} from "./multi-question-result.styles"

export interface MultiQuestionResultProps {
  readonly questionNumber: number
  readonly question: QuestionnaireQuestion
  readonly results?: RuntimeSurveyQuestionResults
  readonly freeTextAnswers: FreetextAnswerFragment[]
  readonly participantCount: number
  readonly participantNames: Record<UUID, string>
}

export const MultiQuestionResult: React.FC<MultiQuestionResultProps> = props => {
  const {questionNumber, question, results, freeTextAnswers, participantCount, participantNames} = props
  const {t} = useLucaTranslation()
  const [isPreviewZoomed, setIsPreviewZoomed] = useState(false)
  const {text, questionType, answers, binaryFile} = question
  const freetextAnswerSelection = results?.answerSelections.find(selection => selection.isFreetextAnswer)

  const toggleZoom = () => setIsPreviewZoomed(!isPreviewZoomed)

  const formatPercent = (value: number) => Number((value * 100).toFixed(2)) + " %"

  const renderedClosedAnswers = sortByPosition(answers).map(answer => {
    const answerSelection = results?.answerSelections.find(selection => selection.answerId === answer.id)
    const percent = formatPercent(answerSelection?.selectionsAsPercent ?? 0)
    const selectionCount = answerSelection?.selectionsCount ?? 0

    return (
      <MultiQuestionAnswer
        key={answer.id}
        percent={percent}
        selectionCount={selectionCount}
        participantCount={participantCount}
        text={answer.text}
        participantNames={participantNames}
      />
    )
  })

  const renderedAdditionalFreetextAnswer =
    question.isAdditionalFreeTextAnswerEnabled !== undefined ? (
      <MultiQuestionAnswer
        key={`${question.id}-free_text_answer`}
        percent={formatPercent(freetextAnswerSelection?.selectionsAsPercent ?? 0)}
        selectionCount={freetextAnswerSelection?.selectionsCount ?? 0}
        participantCount={participantCount}
        freeTextAnswers={freeTextAnswers}
        participantNames={participantNames}
      />
    ) : null

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
          />
        )}
      </div>
      <div css={styles.answersTitle}>{getAnswersTitle(t, questionType)}</div>
      <div css={styles.answersContainer}>
        {questionType === QuestionType.FreeText ? (
          <FreeTextAnswerSwitch freeTextAnswers={freeTextAnswers} participantNames={participantNames} />
        ) : (
          <React.Fragment>
            {renderedClosedAnswers}
            {renderedAdditionalFreetextAnswer}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
