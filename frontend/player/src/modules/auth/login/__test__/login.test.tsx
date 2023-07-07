// importing from direct file because of issues of babel loader and spyOn
import {mount} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {Columns, FormErrorText, InfoColumnContainer} from "shared/components"
import {surveyInvitationsMock} from "shared/graphql/__mocks__"
import {SurveyParticipationStatus} from "shared/graphql/generated/globalTypes"
import {UseSurveyParticipationInfoLazyHook} from "shared/graphql/hooks"
import * as useSurveyParticipationInfoLazyHook from "shared/graphql/hooks/queries/survey/use-survey-participation-info-lazy"
import {SurveyParticipationInfo} from "shared/models"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {surveyInvitationMock} from "../../../../graphql/__mocks__"
import {initialAppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {SignUpModal} from "../.."
import {StartProject} from "../../start-project/start-project"
import * as useLoginHook from "../hooks/use-login"
import {UseLoginHook} from "../hooks/use-login"
import {Login, LoginProps} from "../login"
import {ProjectMetadata} from "../project-metadata/project-metadata"
import {UserInformationLogin} from "../user-information-login/user-information-login"
import {UserMetadata} from "../user-metadata/user-metadata"
import {MockedProvider} from "@apollo/client/testing"

const surveyParticipationInfo: SurveyParticipationInfo = {
  __typename: "SurveyParticipationInfo",
  surveyInvitation: surveyInvitationsMock[0],
  surveyParticipationStatus: SurveyParticipationStatus.ParticipationInProgress
}

const hookValuesDefault: UseLoginHook = {
  t: fakeTranslate,
  login: jest.fn(),
  anonymousLogin: jest.fn(),
  showSignUpModal: false,
  surveyInvitationData: Option.none(),
  surveyInvitationLoading: false,
  toggleShowSignUpModal: jest.fn(),
  loginLoading: false,
  navigateToResumption: jest.fn(),
  isOpenParticipationSurvey: false
}

const defaultProps: LoginProps = {
  originRoute: Route.Login
}

const stateSpy = jest.spyOn(useLoginHook, "useLogin")

const surveyStatusForTokenLazyHookValuesDefault: UseSurveyParticipationInfoLazyHook = {
  surveyParticipationInfoLoading: false,
  surveyParticipationInfo: Option.of(surveyParticipationInfo),
  getSurveyParticipationInfo: jest.fn(() => Promise.resolve(Option.of(surveyParticipationInfo)))
}
const surveyStatusForTokenLazySpy = jest.spyOn(useSurveyParticipationInfoLazyHook, "useSurveyParticipationInfoLazy")

const getComponent = (props?: Partial<React.PropsWithChildren<LoginProps>>) => (
  <MockedProvider>
    <Provider store={fakeStore(initialAppState(null))}>
      <Login {...{...defaultProps, ...props}} />
    </Provider>
  </MockedProvider>
)

describe("Login", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    surveyStatusForTokenLazySpy.mockReturnValue(surveyStatusForTokenLazyHookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly loading", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, loginLoading: true})
    surveyStatusForTokenLazySpy.mockReturnValue(surveyStatusForTokenLazyHookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure coming from Start Project Route with survey invitation data", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, surveyInvitationData: Option.of(surveyInvitationMock)})
    surveyStatusForTokenLazySpy.mockReturnValue(surveyStatusForTokenLazyHookValuesDefault)

    const component = mount(getComponent({originRoute: Route.StartProject}))
    expect(component.find(Columns)).toHaveLength(1)
    expect(component.find(InfoColumnContainer)).toHaveLength(1)
    expect(component.find(FormErrorText)).toHaveLength(0)
    expect(component.find(StartProject)).toHaveLength(1)
    expect(component.find(UserInformationLogin)).toHaveLength(0)
    expect(component.find(SignUpModal)).toHaveLength(0)
  })

  it("has correct structure coming from Login Route without survey invitation data", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    surveyStatusForTokenLazySpy.mockReturnValue(surveyStatusForTokenLazyHookValuesDefault)

    const component = mount(getComponent({originRoute: Route.Login}))
    expect(component.find(Columns)).toHaveLength(1)
    expect(component.find(InfoColumnContainer)).toHaveLength(1)
    expect(component.find(FormErrorText)).toHaveLength(0)
    expect(component.find(ProjectMetadata)).toHaveLength(0)
    expect(component.find(UserMetadata)).toHaveLength(0)
    expect(component.find(StartProject)).toHaveLength(0)
    expect(component.find(UserInformationLogin)).toHaveLength(0)
    expect(component.find(SignUpModal)).toHaveLength(0)
  })

  it("has correct structure coming from Login Route with survey invitation data", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      surveyInvitationData: Option.of(surveyInvitationMock)
    })
    surveyStatusForTokenLazySpy.mockReturnValue(surveyStatusForTokenLazyHookValuesDefault)

    const component = mount(getComponent())
    expect(component.find(Columns)).toHaveLength(2)
    expect(component.find(InfoColumnContainer)).toHaveLength(1)
    expect(component.find(FormErrorText)).toHaveLength(0)
    expect(component.find(ProjectMetadata)).toHaveLength(1)
    expect(component.find(UserInformationLogin)).toHaveLength(1)
    expect(component.find(StartProject)).toHaveLength(0)
    expect(component.find(SignUpModal)).toHaveLength(0)
  })
})
