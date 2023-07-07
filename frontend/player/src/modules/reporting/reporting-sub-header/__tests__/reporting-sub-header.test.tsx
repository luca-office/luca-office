import * as React from "react"
import {create} from "react-test-renderer"
import {ReportingSubHeader} from "../reporting-sub-header"

const getComponent = () => <ReportingSubHeader />

describe("reporting-sub-header", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
