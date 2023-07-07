import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading} from "../.."
import {RadioButton} from "../radio-button"

describe("radio-button", () => {
  it("renders correctly", () => {
    const component = <RadioButton selected={true} label={"test"} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(<RadioButton selected={true} label={"test"} />)

    expect(component).toBeDefined()
    expect(component.find(Heading)).toBeDefined()
  })
})
