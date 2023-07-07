import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {multipleChoiceQuestionMock, questionnaireMock} from "shared/graphql/__mocks__"
import {createQuestionnaireQuestionMutation} from "shared/graphql/mutations"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useCreateQuestionnaireQuestionModal} from "../use-create-questionnaire-question-modal"

const questionnaire = questionnaireMock
const navigateToQuestion = jest.fn()

const getConnectedHook = () =>
  renderHook(() => useCreateQuestionnaireQuestionModal(questionnaire.id, navigateToQuestion), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: createQuestionnaireQuestionMutation,
              variables: {
                creation: pick(questionnaireMock, [
                  "title",
                  "text",
                  "questionType",
                  "isAdditionalFreeTextAnswerEnabled",
                  "questionnaireId",
                  "scoringType"
                ])
              }
            },
            result: {
              data: {
                createQuestionnaireQuestion: multipleChoiceQuestionMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-create-questionnaire-question-modal", () => {
  describe("selectedQuestionType", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedQuestionType).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
