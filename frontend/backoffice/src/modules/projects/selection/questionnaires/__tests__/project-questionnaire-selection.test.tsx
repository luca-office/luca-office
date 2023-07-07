import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardFooterItem, DetailViewHeader, OverviewCard} from "shared/components"
import {checkLoginMock, projectsMock, questionnairesMock} from "shared/graphql/__mocks__"
import {checkLoginQuery} from "shared/graphql/queries"
import {CardOverview} from "../../../../../components"
import {ModuleSelectionContainer} from "../../../../common/module-selection/module-selection-container"
import * as hook from "../hooks/use-project-questionnaire-selection"
import {UseProjectQuestionnaireSelectionHook} from "../hooks/use-project-questionnaire-selection"
import {ProjectQuestionnaireSelection} from "../project-questionnaire-selection"

const hookValuesDefault: UseProjectQuestionnaireSelectionHook = {
  openSelectionDetail: jest.fn(),
  openProjectDetail: jest.fn(),
  alreadyAssignedQuestionnaires: questionnairesMock,
  saveQuestionnaireAssignment: jest.fn(),
  questionnaires: questionnairesMock,
  isProjectFinalized: false,
  userMayFinalizeWithoutPublishing: true
}
const projectId = projectsMock[0].id

const stateSpy = jest.spyOn(hook, "useProjectQuestionnaireSelection")

const getComponent = () => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: checkLoginQuery
        },
        result: {
          data: {
            checkLogin: checkLoginMock
          }
        }
      }
    ]}>
    <ProjectQuestionnaireSelection projectId={projectId} />
  </MockedProvider>
)

describe("questionnaire-selection", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (0 Questionnaire)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, questionnaires: []})

    const component = mount(getComponent())
    const moduleSelectionContainer = component.find(ModuleSelectionContainer)
    expect(moduleSelectionContainer).toHaveLength(1)

    expect(moduleSelectionContainer.find(OverviewCard)).toHaveLength(0)
    expect(moduleSelectionContainer.find(CardOverview)).toHaveLength(1)
    expect(moduleSelectionContainer.find(DetailViewHeader)).toHaveLength(1)
    expect(moduleSelectionContainer.find(DetailViewHeader)).toHaveLength(1)
  })
  it("has correct structure (with Questionnaire)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    const moduleSelectionContainer = component.find(ModuleSelectionContainer)
    expect(moduleSelectionContainer).toHaveLength(1)

    expect(moduleSelectionContainer.find(OverviewCard)).toHaveLength(4)
    expect(moduleSelectionContainer.find(OverviewCard).first().find(CardFooterItem)).toHaveLength(3)
    expect(moduleSelectionContainer.find(DetailViewHeader)).toHaveLength(1)
  })
  it("has correct structure (with Questionnaire+isProjectFinalized)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isProjectFinalized: true})

    const component = mount(getComponent())
    const moduleSelectionContainer = component.find(ModuleSelectionContainer)
    expect(moduleSelectionContainer).toHaveLength(1)

    expect(moduleSelectionContainer.find(OverviewCard)).toHaveLength(questionnairesMock.length)
    expect(moduleSelectionContainer.find(OverviewCard).first().find(CardFooterItem)).toHaveLength(3)
    expect(moduleSelectionContainer.find(DetailViewHeader)).toHaveLength(1)
  })
})
