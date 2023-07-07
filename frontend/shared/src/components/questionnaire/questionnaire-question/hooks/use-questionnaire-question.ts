/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState} from "react"
import {QuestionType} from "../../../../graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "../../../../models"
import {useLucaTranslation} from "../../../../translations"

export interface UseQuestionnaireQuestionProps {
  readonly question: QuestionnaireQuestion
  readonly onSelectAnswer?: (answerId: UUID, freeText?: string) => void
  readonly onDeselectAnswer?: (answerId: UUID, freeText?: string) => void
  readonly onChangeFreeText?: (text: string) => void
  readonly onMediaEnlarged?: () => void
  readonly onMediaShrunk?: () => void
}

export const useQuestionnaireQuestion = ({
  question,
  onSelectAnswer,
  onDeselectAnswer,
  onChangeFreeText,
  onMediaEnlarged,
  onMediaShrunk
}: UseQuestionnaireQuestionProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Array<string>>([])
  const [freeText, setFreeText] = useState<string>()
  const [isPreviewZoomed, setIsPreviewZoomed] = useState(false)
  const {t} = useLucaTranslation()

  useEffect(() => {
    if (freeText !== undefined) {
      onChangeFreeText?.(freeText)
    }
  }, [freeText])

  const toggleAnswer = (id: string) => {
    if (question.questionType === QuestionType.MultipleChoice) {
      if (selectedAnswers.includes(id)) {
        onDeselectAnswer?.(id, freeText)
        setSelectedAnswers(selectedAnswers.filter(answerId => answerId !== id))
      } else {
        onSelectAnswer?.(id, freeText)
        setSelectedAnswers([...selectedAnswers, id])
      }
    } else {
      onSelectAnswer?.(id, freeText)
      setSelectedAnswers([id])
    }
  }

  const toggleZoom = () => {
    setIsPreviewZoomed(!isPreviewZoomed)
    if (isPreviewZoomed) {
      onMediaShrunk?.()
    } else {
      onMediaEnlarged?.()
    }
  }

  return {
    selectedAnswers,
    toggleAnswer,
    freeText,
    setFreeText,
    isPreviewZoomed,
    toggleZoom,
    t
  }
}
