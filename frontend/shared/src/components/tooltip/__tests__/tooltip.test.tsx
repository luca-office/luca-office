import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Tooltip as ReactTooltip} from "react-tooltip"
import {IconName} from "../../../enums"
import {Button} from "../../index"
import {Tooltip, TooltipHintProps} from "../tooltip"

const defaultProps: TooltipHintProps = {
  title: "test",
  text: "Lorem Ipsum Banana Cake",
  icon: IconName.PaperEdit
}

const getComponent = (props?: Partial<TooltipHintProps>) => (
  <Tooltip {...defaultProps} {...props}>
    <Button>test</Button>
  </Tooltip>
)

describe("tooltip", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (simple)", () => {
    const component = getComponent({text: undefined, icon: undefined})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("hides if necessary", () => {
    const component = shallow(getComponent({inactive: true}))

    expect(component.find(ReactTooltip)).toHaveLength(0)
    expect(component.find(Button)).toHaveLength(1)
  })
})
