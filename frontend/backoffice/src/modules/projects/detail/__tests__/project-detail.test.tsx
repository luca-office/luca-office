// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {act as actRenderer, create} from "react-test-renderer"
import {
  CardFooterItem,
  Content,
  ContentBottomActionbar,
  ContentLoadingIndicator,
  ContentMissingIndicator,
  CustomSelect,
  DetailViewHeader
} from "shared/components"
import {projectModulesMock, projectsMock, surveysMock, userAccountMock} from "shared/graphql/__mocks__"
import {projectUserAccountsQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import wait from "waait"
import {OverlayEditField, ResortModal} from "../../../../components"
import {CreateProjectModuleModal} from "../../common/create-project-module-modal/create-project-module-modal"
import {convertModulesToSortables} from "../../utils"
import * as projectDetailHook from "../hooks/use-project-detail"
import {UseProjectDetailHook} from "../hooks/use-project-detail"
import {InviteProjectUsersModalContainer} from "../invite-users/invite-project-users-modal-container"
import {ProjectDetail} from "../project-detail"
import {ProjectDetailTabbedCard} from "../project-detail-tabbed-card/project-detail-tabbed-card"

const hookValuesDefault: UseProjectDetailHook = {
  project: Option.of(projectsMock[0]),
  defaultSelectedListTabIndex: 0,
  selectListTabIndex: jest.fn(),
  surveysLoading: false,
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
  inviteUserModalVisible: false
}

const stateSpy = jest.spyOn(projectDetailHook, "useProjectDetail")

const getComponent = () => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: projectUserAccountsQuery,
          variables: {projectId: projectsMock[0].id}
        },
        result: {
          data: {
            userAccountsForProject: [userAccountMock]
          }
        }
      }
    ]}>
    <ProjectDetail projectId={projectsMock[0].id} />
  </MockedProvider>
)

describe("project-detail", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (with project)", () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(OverlayEditField)).toHaveLength(3)
    expect(component.find(CustomSelect)).toHaveLength(1)
    expect(component.find(CardFooterItem)).toHaveLength(2)
    expect(component.find(ProjectDetailTabbedCard)).toHaveLength(1)
  })
  it("has correct structure (loading)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, project: Option.none(), dataLoading: true})

    const component = mount(getComponent())
    expect(component.find(ContentLoadingIndicator)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(0)
  })
  it("has correct structure (project not found)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, project: Option.none()})

    const component = mount(getComponent())
    expect(component.find(ContentBottomActionbar)).toHaveLength(0)
    expect(component.find(ContentMissingIndicator)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
  })
  it("has correct structure (createModuleModalVisible)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, createModuleModalVisible: true})

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(OverlayEditField)).toHaveLength(3)
    expect(component.find(CustomSelect)).toHaveLength(1)
    expect(component.find(CardFooterItem)).toHaveLength(2)
    expect(component.find(ProjectDetailTabbedCard)).toHaveLength(1)
    expect(component.find(CreateProjectModuleModal)).toHaveLength(1)
  })
  it("has correct structure (resortModalVisible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, resortModalVisible: true})

    const component = mount(getComponent())
    await actRenderer(() => wait(0))
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(OverlayEditField)).toHaveLength(3)
    expect(component.find(CustomSelect)).toHaveLength(1)
    expect(component.find(CardFooterItem)).toHaveLength(2)
    expect(component.find(ProjectDetailTabbedCard)).toHaveLength(1)
    expect(component.find(ResortModal)).toHaveLength(1)
  })
  it("has correct structure (inviteUserModalVisible)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, inviteUserModalVisible: true})

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(OverlayEditField)).toHaveLength(3)
    expect(component.find(CustomSelect)).toHaveLength(1)
    expect(component.find(CardFooterItem)).toHaveLength(2)
    expect(component.find(ProjectDetailTabbedCard)).toHaveLength(1)
    expect(component.find(InviteProjectUsersModalContainer)).toHaveLength(1)
  })
})
