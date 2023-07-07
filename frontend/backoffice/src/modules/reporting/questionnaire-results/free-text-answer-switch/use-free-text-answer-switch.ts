import {first} from "lodash-es"
import {useEffect, useState} from "react"
import {FreetextAnswerFragment} from "shared/graphql/generated/FreetextAnswerFragment"

export interface UseFreeTextAnswerSwitch {
  readonly currentAnswer?: FreetextAnswerFragment
  readonly next: () => void
  readonly previous: () => void
  readonly totalNumberOfAnswers: number
  readonly currentAnswerIndex: number
}

export const useFreeTextAnswerSwitch = (answers: FreetextAnswerFragment[]): UseFreeTextAnswerSwitch => {
  const [currentAnswer, setCurrentAnswer] = useState(first(answers))
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0)

  useEffect(() => {
    setCurrentAnswer(first(answers))
  }, [answers])

  const totalNumberOfAnswers = answers.length

  const next = () => {
    if (totalNumberOfAnswers > 0) {
      const newIndex = (currentAnswerIndex + 1) % totalNumberOfAnswers
      setCurrentAnswerIndex(newIndex)
      setCurrentAnswer(answers[newIndex])
    }
  }

  const previous = () => {
    if (totalNumberOfAnswers > 0) {
      const newIndex = currentAnswerIndex - 1 < 0 ? answers.length - 1 : currentAnswerIndex - 1
      setCurrentAnswerIndex(newIndex)
      setCurrentAnswer(answers[newIndex])
    }
  }

  return {
    currentAnswer,
    next,
    previous,
    totalNumberOfAnswers,
    currentAnswerIndex
  }
}
