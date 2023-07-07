import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Icon} from "shared/components"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {CardDurationInfo} from "../card-duration-info"

describe("card-duration-info", () => {
  it("renders correctly", () => {
    const component = <CardDurationInfo maxDurationInSeconds={12} t={fakeTranslate} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(<CardDurationInfo maxDurationInSeconds={12} t={fakeTranslate} />)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
  })

  it("has correct structure (zero timing)", () => {
    const component = shallow(<CardDurationInfo maxDurationInSeconds={0} t={fakeTranslate} />)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
  })

  it("has correct structure (null timing)", () => {
    const component = shallow(<CardDurationInfo maxDurationInSeconds={null} t={fakeTranslate} />)
    expect(component.find(Heading)).toHaveLength(0)
    expect(component.find(Icon)).toHaveLength(0)
  })
  it("has correct structure (placeholder)", () => {
    const component = shallow(<CardDurationInfo placeholder={"-"} t={fakeTranslate} />)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Heading).html()).toContain("-")
    expect(component.find(Icon)).toHaveLength(1)
  })
  it("has correct structure (icon first)", () => {
    const component = shallow(<CardDurationInfo placeholder={"-"} showIconBeforeText={true} t={fakeTranslate} />)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Heading).html()).toContain("-")
    expect(component.find(Icon)).toHaveLength(1)
  })
})
