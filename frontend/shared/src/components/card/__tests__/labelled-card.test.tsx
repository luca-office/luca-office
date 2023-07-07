import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Label} from "../../label/label"
import {LabelledCard} from "../labelled-card"

describe("labelled-card", () => {
  it("renders correctly", () => {
    const component = (
      <LabelledCard label={"test title"}>
        <div className={"text"}>sample</div>
      </LabelledCard>
    )
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(
      <LabelledCard label={"test title"}>
        <div className={"text"}>sample</div>
      </LabelledCard>
    )
    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(".text")).toHaveLength(1)
    expect(component.find(Label).html()).toContain("test title")
  })
})
