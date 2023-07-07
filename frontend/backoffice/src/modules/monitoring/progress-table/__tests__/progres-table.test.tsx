import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Table, TableContainer} from "shared/components"
import {projectModulesMock, projectsMock, surveyInvitationsProgressMock, surveysMock} from "shared/graphql/__mocks__"
import {computeSurveyProgress, Option} from "shared/utils"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {ProgressTable, ProgressTableProps} from "../progress-table"

const progress = computeSurveyProgress(projectModulesMock, Option.of(surveyInvitationsProgressMock))

const getComponent = (props?: Partial<ProgressTableProps>) => (
  <ProgressTable
    activeModuleOfSynchronSurvey={Option.none()}
    selectedModuleId={Option.none()}
    lastProjectModuleOfSurvey={Option.none()}
    surveyProgress={progress}
    t={fakeTranslate}
    survey={Option.of(surveysMock[0])}
    {...props}
    projectId={projectsMock[0].id}
    navigateToParticipantDashboard={jest.fn()}
    surveyId={surveysMock[0].id}
    onOpenChat={jest.fn()}
  />
)

describe("progress-table", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with questionnaire", () => {
    const component = getComponent({questionsCount: 4, questionnaireId: "123"})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(getComponent())

    expect(component.find(TableContainer)).toHaveLength(1)
    expect(component.find(TableContainer).dive().find(Table).dive().find(".entity-row")).toHaveLength(progress.length)
  })
  it("has correct structure with questionnaire", () => {
    const component = shallow(getComponent({questionsCount: 4, questionnaireId: "123"}))

    expect(component.find(TableContainer)).toHaveLength(1)
    expect(component.find(TableContainer).dive().find(Table).dive().find(".entity-row")).toHaveLength(progress.length)
  })
})
