import {shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {Overlay} from "shared/components"
import {questionnaireMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {QuestionnaireDetailMode} from "../../../../enums"
import {EventQuestionnairePreview} from "../event-questionnaire-preview"
import {ProjectQuestionnairePreview} from "../project-questionnaire-preview"
import {QuestionnairePreview, QuestionnairePreviewProps} from "../questionnaire-preview"

const defaultProps: QuestionnairePreviewProps = {
  hidePreview: jest.fn(),
  displayMode: QuestionnaireDetailMode.Default,
  questionnaire: Option.of(questionnaireMock)
}

const getComponent = (props?: Partial<QuestionnairePreviewProps>) => (
  <QuestionnairePreview {...defaultProps} {...props} />
)

describe("QuestionnairePreview", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
  it("renders correctly - default", () => {
    const component = shallow(getComponent())

    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(ProjectQuestionnairePreview)).toHaveLength(1)
    expect(component.find(EventQuestionnairePreview)).toHaveLength(0)
  })
  it("renders correctly - ProjectQuestionnaire", () => {
    const component = shallow(getComponent({displayMode: QuestionnaireDetailMode.ProjectQuestionnaire}))

    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(ProjectQuestionnairePreview)).toHaveLength(1)
    expect(component.find(EventQuestionnairePreview)).toHaveLength(0)
  })
  it("renders correctly - RuntimeSurvey", () => {
    const component = shallow(getComponent({displayMode: QuestionnaireDetailMode.RuntimeSurvey}))

    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(ProjectQuestionnairePreview)).toHaveLength(0)
    expect(component.find(EventQuestionnairePreview)).toHaveLength(1)
  })
  it("renders correctly - ScenarioRuntimeSurvey", () => {
    const component = shallow(getComponent({displayMode: QuestionnaireDetailMode.ScenarioRuntimeSurvey}))

    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(ProjectQuestionnairePreview)).toHaveLength(0)
    expect(component.find(EventQuestionnairePreview)).toHaveLength(1)
  })
  it("renders correctly - no data", () => {
    const component = shallow(getComponent({questionnaire: Option.none()}))

    expect(component.find(Overlay)).toHaveLength(0)
    expect(component.find(ProjectQuestionnairePreview)).toHaveLength(0)
    expect(component.find(EventQuestionnairePreview)).toHaveLength(0)
  })
})
