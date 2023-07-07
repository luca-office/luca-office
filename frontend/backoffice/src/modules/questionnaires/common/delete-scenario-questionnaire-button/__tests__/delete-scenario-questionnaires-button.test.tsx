import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {OrlyButtonContainer} from "shared/components"
import {questionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {DeleteScenarioQuestionnaireButton} from "../delete-scenario-questionnaire-button"
import * as hook from "../hooks/use-delete-scenario-questionnaire-button"
import {UseDeleteScenarioQuestionnaireButtonProps} from "../hooks/use-delete-scenario-questionnaire-button"

const scenarioId = scenariosMock[0].id
const questionnaireId = questionnairesMock[0].id
const hookValuesDefault: UseDeleteScenarioQuestionnaireButtonProps = {
  deleteScenarioQuestionnaireLoading: false,
  deleteScenarioQuestionnaire: jest.fn
}

const hookStateSpy = jest.spyOn(hook, "useDeleteScenarioQuestionnaireButton")

describe("scenario-detail", () => {
  it("renders correctly", () => {
    hookStateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<DeleteScenarioQuestionnaireButton {...{scenarioId, questionnaireId}} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    hookStateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<DeleteScenarioQuestionnaireButton {...{scenarioId, questionnaireId}} />)

    expect(tree.find(OrlyButtonContainer)).toHaveLength(1)
  })
})
