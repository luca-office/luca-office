// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "sharedTests/redux/fake-store"
import {initialAppState} from "../../../../../redux/state/app-state"
import {ModuleSelectionContainer} from "../../../../common/module-selection/module-selection-container"
import {SampleCompanySelection} from "../sample-company-selection"

const component = (
  <MockedProvider>
    <Provider store={fakeStore(initialAppState)}>
      <SampleCompanySelection scenarioId="sflksdf" />
    </Provider>
  </MockedProvider>
)

describe("sample-company-selection", () => {
  it("renders correctly", async () => {
    const wrapper = create(component)
    const tree = wrapper.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const wrapper = mount(component)

    expect(wrapper.find(ModuleSelectionContainer)).toHaveLength(1)
  })
})
