import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Table} from "shared/components"
import {
  projectModulesMock,
  projectModulesMockWithQuestionnaire,
  projectsMock,
  surveysMock
} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {TabbedCard} from "../../../../../components"
import {convertModulesToSortables} from "../../../utils"
import {ListPlaceholder} from "../../list-placeholder/list-placeholder"
import {ProjectModulesList} from "../../project-modules-list/project-modules-list"
import {ProjectSurveysList} from "../../project-surveys-list/project-surveys-list"
import {ProjectDetailTabbedCard, ProjectDetailTabbedCardProps} from "../project-detail-tabbed-card"

const defaultProps: ProjectDetailTabbedCardProps = {
  project: Option.of(projectsMock[0]),
  defaultSelectedListTabIndex: 0,
  selectListTabIndex: jest.fn(),
  updateProject: jest.fn(),
  formMethods: mockedFormMethods,
  dataLoading: false,
  updateInProgress: false,
  navigateToOverview: jest.fn(),
  navigateToSurveyCreation: jest.fn(),
  projectModules: projectModulesMock,
  surveys: surveysMock,
  navigateToSurvey: jest.fn(),
  createModuleModalVisible: false,
  setCreateModuleModalVisible: jest.fn(),
  deleteSurvey: jest.fn,
  deleteProjectModule: jest.fn,
  sortableModules: convertModulesToSortables(projectModulesMock),
  repositionProjectModules: jest.fn(),
  setResortModalVisible: jest.fn(),
  resortModalVisible: false,
  projectUsersCount: 2,
  setInviteUserModalVisible: jest.fn(),
  surveysLoading: false,
  inviteUserModalVisible: false,
  t: fakeTranslate
}

const getComponent = (props?: Partial<ProjectDetailTabbedCardProps>) => (
  <ProjectDetailTabbedCard {...{...defaultProps, ...props}} />
)

describe("project-modules-list", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = shallow(getComponent())
    const tabCard = component.find(TabbedCard)
    expect(tabCard).toHaveLength(1)
    expect(tabCard.prop("tabs")).toHaveLength(3)
    expect(tabCard.prop("defaultActiveIndex")).toEqual(defaultProps.defaultSelectedListTabIndex)
    const content1 = shallow(<div>{tabCard.prop("tabs")[0].content}</div>)
    expect(content1.find(ProjectSurveysList)).toHaveLength(1)
    expect(content1.find(ProjectSurveysList).prop("isTestSurvey")).toBe(false)
    const content2 = shallow(<div>{tabCard.prop("tabs")[1].content}</div>)
    expect(content2.find(ProjectSurveysList)).toHaveLength(1)
    expect(content2.find(ProjectSurveysList).prop("isTestSurvey")).toBe(true)
    const content3 = shallow(<div>{tabCard.prop("tabs")[2].content}</div>)
    expect(content3.find(ProjectModulesList)).toHaveLength(1)
  })
})
