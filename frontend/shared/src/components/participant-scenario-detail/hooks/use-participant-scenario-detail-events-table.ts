import {isEqual} from "lodash-es"
import * as React from "react"
import {FreetextAnswerFragment} from "../../../graphql/generated/FreetextAnswerFragment"
import {QuestionType} from "../../../graphql/generated/globalTypes"
import {
  useFreetextAnswersForQuestionnaireLazy,
  useQuestionnaireQuestionsLazy,
  useRuntimeSurveyResultsLazy
} from "../../../graphql/hooks"
import {QuestionnaireQuestion, ScenarioQuestionnaire} from "../../../models"
import {LucaI18nLangKey} from "../../../translations"
import {find, first, flatten, some} from "../../../utils"

export interface UseParticipantScenarioDetailEventsTableHook {
  readonly getStatusLabelKey: (questionnaireId: UUID) => LucaI18nLangKey
}

interface UseParticipantScenarioDetailEventsTableParams {
  readonly surveyId: UUID
  readonly surveyInvitationId: UUID
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
}

export const useParticipantScenarioDetailEventsTable = ({
  surveyId,
  surveyInvitationId,
  scenarioQuestionnaires
}: UseParticipantScenarioDetailEventsTableParams): UseParticipantScenarioDetailEventsTableHook => {
  const scenarioIdRef = React.useRef<UUID | null>(null)

  const [questionnaireQuestions, setQuestionnaireQuestions] = React.useState<QuestionnaireQuestion[]>([])
  const [freetextAnswers, setFreetextAnswers] = React.useState<FreetextAnswerFragment[]>([])

  const {getRuntimeSurveyResults, runtimeSurveyResults} = useRuntimeSurveyResultsLazy()
  const {getFreetextAnswersForQuestionnaire} = useFreetextAnswersForQuestionnaireLazy(surveyId)
  const {getQuestionnaireQuestions} = useQuestionnaireQuestionsLazy()

  const scenarioIdOption = first(scenarioQuestionnaires).map(({scenarioId}) => scenarioId)

  if (!isEqual(scenarioIdRef.current, scenarioIdOption.orNull())) {
    scenarioIdRef.current = scenarioIdOption.orNull()
  }

  const getStatusLabelKey = (questionnaireId: UUID) => {
    const allQuestions = questionnaireQuestions.filter(question => question.questionnaireId === questionnaireId)
    const allFreetextAnswers = freetextAnswers.filter(
      freetextAnswer => freetextAnswer.questionnaireId === questionnaireId
    )
    const surveyResults = find(
      runtimeSurveyResult => runtimeSurveyResult.questionnaireId === questionnaireId,
      runtimeSurveyResults
    )

    return surveyResults
      .map(({questionResults, completedParticipantIds}) => {
        const results = questionResults.reduce(
          (accumulator, questionResult) =>
            find(question => question.id === questionResult.questionId, allQuestions)
              .map(question => {
                const hasFreetextAnswer =
                  question.questionType === QuestionType.FreeText &&
                  find(
                    freetextAnswer =>
                      freetextAnswer.questionId === question.id &&
                      freetextAnswer.surveyInvitationId === surveyInvitationId,
                    allFreetextAnswers
                  ).exists(freetextAnswer => freetextAnswer.text !== "")

                if (hasFreetextAnswer) {
                  return [...accumulator, {questionId: question.id, inProgress: false, completed: true}]
                }

                const participantResults = questionResult.participantResults.filter(
                  participantResult => participantResult.invitationId === surveyInvitationId
                )

                const inProgress = some(({selectedAnswerIds}) => selectedAnswerIds.length > 0, participantResults)
                if (inProgress) {
                  return [...accumulator, {questionId: question.id, inProgress: true, completed: false}]
                }

                return [...accumulator, {questionId: question.id, inProgress: false, completed: false}]
              })
              .getOrElse(accumulator),
          [] as Array<{readonly questionId: UUID; readonly inProgress: boolean; readonly completed: boolean}>
        )

        if (completedParticipantIds.includes(surveyInvitationId)) {
          return "dashboard__attendee_status_completed"
        }

        if (some(result => result.inProgress || result.completed, results)) {
          return "dashboard__attendee_status_progressing"
        }
        return "dashboard__attendee_status_not_completed"
      })
      .getOrElse("dashboard__attendee_status_not_completed")
  }

  React.useEffect(() => {
    if (scenarioIdRef.current !== null) {
      getRuntimeSurveyResults(surveyId, scenarioIdRef.current)
    }
  }, [surveyId, scenarioIdRef.current])

  React.useEffect(() => {
    const questionnaireIds = scenarioQuestionnaires.map(({questionnaireId}) => questionnaireId)

    Promise.all(questionnaireIds.map(questionnaireId => getQuestionnaireQuestions(questionnaireId)))
      .then(results => {
        const questions = flatten(results)
        setQuestionnaireQuestions(questions)
      })
      .catch(() => setQuestionnaireQuestions([]))

    Promise.all(questionnaireIds.map(questionnaireId => getFreetextAnswersForQuestionnaire(questionnaireId)))
      .then(results => {
        const answers = flatten(results)
        setFreetextAnswers(answers)
      })
      .catch(() => setFreetextAnswers([]))
  }, [scenarioQuestionnaires])

  return {getStatusLabelKey}
}
