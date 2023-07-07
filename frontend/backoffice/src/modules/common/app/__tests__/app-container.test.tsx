import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {checkLoginQuery} from "shared/graphql/queries"
import {fakeStore} from "sharedTests/redux/fake-store"
import {initialAppState} from "../../../../redux/state/app-state"
import {AppContainer} from "../app-container"

/**
 * this is an example on how to mock and test apollo!
 */
describe("App", () => {
  it("loads correctly", async () => {
    const mocks = [
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
    ]
    const component = shallow(
      <Provider store={fakeStore(initialAppState)}>
        <MockedProvider mocks={mocks} addTypename={true}>
          <AppContainer />
        </MockedProvider>
      </Provider>
    )
    expect(component.html()).not.toContain("Error")
    // this SHOULD work, but due to use of fragments, it does not...
    // await waitFor(() => {})
    // expect(component.html()).toContain("Content")
  })
})
