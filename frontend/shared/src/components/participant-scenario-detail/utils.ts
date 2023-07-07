import {FreetextAnswerFragment} from "../../graphql/generated/FreetextAnswerFragment"
import {QuestionType} from "../../graphql/generated/globalTypes"
import {Questionnaire, RuntimeSurveyResults} from "../../models"
import {ParticipantQuestionAnswer, QuestionnaireParticipantResults} from "../questionnaire"

export const runtimeSurveyResultsToQuestionnaireParticipantResults = (
  invitationId: UUID,
  questionnaire: Questionnaire,
  runtimeSurveyResults: RuntimeSurveyResults,
  freeTextAnswers: FreetextAnswerFragment[]
): QuestionnaireParticipantResults => {
  const answers = runtimeSurveyResults.questionResults.reduce<Record<UUID, ParticipantQuestionAnswer>>(
    (answersAccumulator, result) => {
      const question = questionnaire.questions.find(question => question.id === result.questionId)
      const participantResult = result.participantResults.find(results => results.invitationId === invitationId)
      const freeTextAnswer = freeTextAnswers.find(
        answer => answer.questionId === result.questionId && answer.surveyInvitationId === invitationId
      )?.text

      switch (question?.questionType) {
        case QuestionType.SingleChoice: {
          return {
            ...answersAccumulator,
            [question.id]: {
              questionType: QuestionType.SingleChoice,
              questionId: question.id,
              selectedAnswerId: participantResult?.selectedAnswerIds[0] ?? "",
              isFreetextAnswerSelected: participantResult?.wasFreetextAnswerSelected ?? false,
              freeTextAnswer: freeTextAnswer
            }
          }
        }

        case QuestionType.MultipleChoice: {
          return {
            ...answersAccumulator,
            [question.id]: {
              questionType: QuestionType.MultipleChoice,
              questionId: question.id,
              selectedAnswerIds: participantResult?.selectedAnswerIds ?? [],
              isFreetextAnswerSelected: participantResult?.wasFreetextAnswerSelected ?? false,
              freeTextAnswer: freeTextAnswer
            }
          }
        }

        case QuestionType.FreeText: {
          return {
            ...answersAccumulator,
            [question.id]: {
              questionType: QuestionType.FreeText,
              questionId: question.id,
              freeTextAnswer: freeTextAnswer ?? ""
            }
          }
        }

        default:
          return answersAccumulator
      }
    },
    {}
  )

  return {questionnaireId: runtimeSurveyResults.questionnaireId, answers}
}
