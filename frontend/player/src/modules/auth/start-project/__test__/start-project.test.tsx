import {mount} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {surveyIdMock, surveyInvitationsMock} from "shared/graphql/__mocks__"
import {ParticipantData} from "shared/models"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import {surveyInvitationMock} from "../../../../graphql/__mocks__"
import {Salutation} from "../../../../graphql/generated/globalTypes"
import {initialAppState} from "../../../../redux/state/app-state"
import {ProjectMetadata} from "../../login/project-metadata/project-metadata"
import {UserMetadata} from "../../login/user-metadata/user-metadata"
import * as startProjectHook from "../hooks/use-start-project"
import {UseStartProjectHook} from "../hooks/use-start-project"
import {ProjectInformation} from "../project-information/project-information"
import {StartProject, StartProjectProps} from "../start-project"
import {StartProjectConfirmModal} from "../start-project-confirm-modal/start-project-confirm-modal"

const defaultProps: StartProjectProps = {
  surveyInvitationData: Option.none()
}

const getComponent = (props?: Partial<React.PropsWithChildren<StartProjectProps>>) => (
  <Provider store={fakeStore(initialAppState(null))}>
    <StartProject {...{...defaultProps, ...props}} />
  </Provider>
)

const participantDataMock: ParticipantData = {
  __typename: "ParticipantData",
  firstName: "Max",
  lastName: "Mustermann",
  salutation: Salutation.Mr
}

const hookValuesDefault: UseStartProjectHook = {
  initialized: false,
  isStartProjectConfirmModalVisible: false,
  participantData: Option.of(participantDataMock),
  loading: false,
  setIsStartProjectConfirmModalVisible: jest.fn(),
  loadProjectModules: jest.fn(),
  isSurveyCompleted: false,
  isSurveyParticipationCompleted: false,
  isOpenParticipation: false,
  surveyId: Option.of(surveyIdMock),
  token: Option.of(surveyInvitationsMock[0].token),
  isPrivacyPolicyChecked: false,
  updateIsPrivacyPolicyChecked: jest.fn()
}

const stateSpy = jest.spyOn(startProjectHook, "useStartProject")

describe("start-project", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure with logged in user and not survey invitation data", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(ProjectMetadata)).toHaveLength(0)
    expect(tree.find(UserMetadata)).toHaveLength(0)
    expect(tree.find(ProjectInformation)).toHaveLength(0)
  })

  it("has correct structure with logged in user and survey invitation data", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent({surveyInvitationData: Option.of(surveyInvitationMock)})
    const tree = mount(component)

    expect(tree.find(ProjectMetadata)).toHaveLength(1)
    expect(tree.find(UserMetadata)).toHaveLength(1)
    expect(tree.find(ProjectInformation)).toHaveLength(1)
    expect(tree.find(ProjectInformation).prop("isStartLoading")).toBe(false)
  })
  it("has correct structure with logged in user and start is loading", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, loading: true})
    const component = getComponent({surveyInvitationData: Option.of(surveyInvitationMock)})
    const tree = mount(component)

    expect(tree.find(ProjectMetadata)).toHaveLength(1)
    expect(tree.find(UserMetadata)).toHaveLength(1)
    expect(tree.find(ProjectInformation)).toHaveLength(1)
    expect(tree.find(ProjectInformation).prop("isStartLoading")).toBe(true)
  })
  it("has correct structure with confirm modal", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isStartProjectConfirmModalVisible: true})
    const component = getComponent({surveyInvitationData: Option.of(surveyInvitationMock)})
    const tree = mount(component)

    expect(tree.find(ProjectMetadata)).toHaveLength(1)
    expect(tree.find(UserMetadata)).toHaveLength(1)
    expect(tree.find(ProjectInformation)).toHaveLength(1)
    expect(tree.find(StartProjectConfirmModal)).toHaveLength(1)
  })
})
