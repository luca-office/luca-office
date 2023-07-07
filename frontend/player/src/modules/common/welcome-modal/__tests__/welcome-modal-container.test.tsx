import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import {scenariosMock} from "../../../../graphql/__mocks__"
import {projectQuery} from "../../../../graphql/queries"
import {initialAppState} from "../../../../redux/state/app-state"
import {WelcomeModal} from "../welcome-modal"
import {WelcomeModalContainer, WelcomeModalContainerProps} from "../welcome-modal-container"

const scenarioId = scenariosMock[0].id

const defaultProps: WelcomeModalContainerProps = {
  firstProjectModule: {
    projectId: "123",
    scenarioId,
    position: 0,
    moduleType: ProjectModuleType.Scenario,
    questionnaireId: null,
    id: "3a95851e-cd0d-4073-b0a0-ddd324ebcc70"
  }
}

const getComponent = (props?: Partial<WelcomeModalContainerProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: projectQuery,
          variables: {
            id: "123"
          }
        },
        result: {
          data: {
            project: Option.none()
          }
        }
      }
    ]}
    addTypename={true}>
    <Provider store={fakeStore(initialAppState(null))}>
      <WelcomeModalContainer {...{...defaultProps, ...props}} />
    </Provider>
  </MockedProvider>
)

describe("welcome-modal-container", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = mount(getComponent())
    expect(component.find(WelcomeModal)).toHaveLength(1)
  })
})
