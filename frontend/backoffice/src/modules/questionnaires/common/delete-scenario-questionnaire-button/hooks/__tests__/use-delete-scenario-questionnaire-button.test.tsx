import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {questionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {Children} from "shared/styles"
import {useDeleteScenarioQuestionnaireButton} from "../use-delete-scenario-questionnaire-button"

const questionnaireId = questionnairesMock[0].id
const scenarioId = scenariosMock[0].id

const getConnectedHook = () =>
  renderHook(() => useDeleteScenarioQuestionnaireButton(questionnaireId, scenarioId), {
    wrapper: ({children}: Children) => (
      <MockedProvider>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-delete-scenario", () => {
  describe("deleteScenarioQuestionnaireLoading", () => {
    it("should default to be true", () => {
      const {result} = getConnectedHook()
      expect(result.current.deleteScenarioQuestionnaireLoading).toBe(false)
    })
  })
})
