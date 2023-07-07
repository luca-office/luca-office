import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {freeTextQuestionMock, multipleChoiceQuestionWithExtraFreeTextMock} from "shared/graphql/__mocks__"
import {
  deleteFreetextCodingCriterionMutation,
  deleteQuestionnaireAnswerMutation,
  updateQuestionnaireAnswerMutation,
  updateQuestionnaireQuestionMutation
} from "shared/graphql/mutations"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {questionnaireAnswerMock} from "../__mocks__/questionnaire-answer.mock"
import {useUpdateQuestionnaireQuestionTypeModal} from "../use-update-questionnaire-question-type-modal"

const question = multipleChoiceQuestionWithExtraFreeTextMock
const questionnaireAnswer = questionnaireAnswerMock(question.id)

const getConnectedHook = () =>
  renderHook(() => useUpdateQuestionnaireQuestionTypeModal(freeTextQuestionMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateQuestionnaireQuestionMutation,
              variables: {
                id: question.id,
                update: pick(question, [
                  "title",
                  "text",
                  "questionType",
                  "isAdditionalTextAnswerAllowed",
                  "binaryFileId",
                  "scoringType",
                  "score"
                ])
              }
            },
            result: {
              data: {
                updateQuestionnaireQuestion: question
              }
            }
          },
          {
            request: {
              query: updateQuestionnaireAnswerMutation,
              variables: {
                id: questionnaireAnswer.id,
                update: pick(questionnaireAnswer, ["text", "isCorrect"])
              }
            },
            result: {
              data: {
                updateQuestionnaireAnswer: questionnaireAnswer
              }
            }
          },
          {
            request: {
              query: deleteQuestionnaireAnswerMutation,
              variables: {id: questionnaireAnswer.id}
            },
            result: {
              data: {
                deleteQuestionnaireAnswer: questionnaireAnswer.id
              }
            }
          },
          {
            request: {
              query: deleteFreetextCodingCriterionMutation,
              variables: {id: freeTextQuestionMock.freetextQuestionCodingCriteria[0].id}
            },
            result: {
              data: {
                deleteFreetextQuestionCodingCriterion: freeTextQuestionMock.freetextQuestionCodingCriteria[0].id
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-update-questionnaire-question-type-modal", () => {
  describe("actionLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedQuestionType", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedQuestionType).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("errorMessage", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.errorMessage).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
