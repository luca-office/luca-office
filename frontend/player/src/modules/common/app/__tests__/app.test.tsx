import {MockedProvider} from "@apollo/client/testing"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "sharedTests/redux/fake-store"
import {initialAppState} from "../../../../redux/state/app-state"
import {App} from "../app"

/**
 * This is an example on how to mock and test apollo.
 */
describe("App Render Component", () => {
  it("renders correctly", async () => {
    const component = create(
      <MockedProvider>
        <Provider store={fakeStore(initialAppState(null))}>
          <App />
        </Provider>
      </MockedProvider>
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
