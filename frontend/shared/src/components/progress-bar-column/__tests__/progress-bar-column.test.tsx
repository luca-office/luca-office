import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {chartIncompleteColor} from "../../../styles"
import {Icon} from "../../icon/icon"
import {Text} from "../../typography/typography"
import {ProgressBarColumn, ProgressTableColumnProps} from "../progress-bar-column"

const inProgress = 3
const overall = 5
const getComponent = (props?: Partial<ProgressTableColumnProps>) => (
  <ProgressBarColumn overallCount={overall} progressCount={inProgress} {...props} />
)

describe("progress-steps-column", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (complete)", () => {
    const component = getComponent({progressCount: overall})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(".progress-element")).toHaveLength(1)
  })
  it("has correct structure (not started)", () => {
    const component = shallow(getComponent({progressCount: 0}))

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(".progress-element")).toHaveLength(1)
  })
  it("has correct structure completed", () => {
    const component = shallow(getComponent({progressCount: overall}))

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(".progress-element")).toHaveLength(1)
  })

  it("has correct structure no label, no icon", () => {
    const component = shallow(getComponent({displayLabel: false, displayCompleteIcon: false}))

    expect(component.find(Text)).toHaveLength(0)
    expect(component.find(Icon)).toHaveLength(0)
  })

  it("has custom bar color", () => {
    const component = shallow(getComponent({barColor: chartIncompleteColor}))

    const progressBar = component.find(".progress-element")
    expect(JSON.stringify(progressBar.prop("css"))).toContain(chartIncompleteColor)
  })

  it("has custom bar completed color", () => {
    const component = shallow(getComponent({progressCount: overall, completedColor: chartIncompleteColor}))

    const progressBar = component.find(".progress-element")
    expect(JSON.stringify(progressBar.prop("css"))).toContain(chartIncompleteColor)
  })
})
