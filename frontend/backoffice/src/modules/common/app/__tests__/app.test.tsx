import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {LoadingIndicator} from "shared/components"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import {initialAppState} from "../../../../redux/state/app-state"
import {Auth} from "../../../auth"
import {AppContentContainer, AppHeaderContainer} from "../.."
import {App} from "../app"

/**
 * this is an example on how to mock and test apollo!
 */
describe("App Render Component", () => {
  it("renders correctly", async () => {
    const component = create(
      <MockedProvider>
        <Provider store={fakeStore(initialAppState)}>
          <App userAccount={Option.of(checkLoginMock)} isLoading={false} />
        </Provider>
      </MockedProvider>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("does not crash", async () => {
    const component = create(
      <MockedProvider>
        <Provider store={fakeStore(initialAppState)}>
          <App userAccount={Option.none()} isLoading={false} />
        </Provider>
      </MockedProvider>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (with data)", async () => {
    const component = mount(
      <MockedProvider>
        <Provider store={fakeStore(initialAppState)}>
          <App userAccount={Option.none()} isLoading={false} />
        </Provider>
      </MockedProvider>
    )

    expect(component.find(Auth)).toHaveLength(1)
  })
  it("has correct structure (with data + authenticated)", async () => {
    const component = mount(
      <MockedProvider>
        <Provider store={fakeStore(initialAppState)}>
          <App userAccount={Option.of(checkLoginMock)} isLoading={false} />
        </Provider>
      </MockedProvider>
    )

    expect(component.find(AppHeaderContainer)).toHaveLength(1)
    expect(component.find(AppContentContainer)).toHaveLength(1)
  })

  it("has correct structure (with loader)", async () => {
    const component = mount(
      <MockedProvider>
        <Provider store={fakeStore(initialAppState)}>
          <App userAccount={Option.none()} isLoading={true} />
        </Provider>
      </MockedProvider>
    )

    expect(component.find(LoadingIndicator)).toHaveLength(1)
  })
})
