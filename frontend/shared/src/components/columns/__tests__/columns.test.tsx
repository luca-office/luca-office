import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Column, Columns} from "../columns"

describe("Columns", () => {
  it("renders correctly", () => {
    const component = (
      <Columns>
        <Column>1</Column>
        <Column>2</Column>
        <Column>3</Column>
      </Columns>
    )
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(
      <Columns>
        <Column>1</Column>
        <Column>2</Column>
        <Column>3</Column>
      </Columns>
    )
    expect(component).toBeDefined()
  })
})
