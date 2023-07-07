import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {LoadingIndicator} from "../../loading-indicator/loading-indicator"
import {ContentLoadingIndicator} from "../content-loading-indicator"

describe("content-loading-indicator", () => {
  it("renders correctly", () => {
    const component = <ContentLoadingIndicator />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = <ContentLoadingIndicator />
    const tree = shallow(component)

    expect(tree.find(LoadingIndicator)).toHaveLength(1)
  })
})
