import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, CustomSelect, TextInput} from "shared/components"
import {AnonymousLogin} from "../anonymous-login"

describe("Anon User Information Login", () => {
  it("renders correctly", () => {
    const component = create(<AnonymousLogin login={jest.fn()} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = mount(<AnonymousLogin login={jest.fn()} />)
    expect(component.find(CustomSelect)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(2)
    expect(component.find(Button)).toHaveLength(1)
  })
})
