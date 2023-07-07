import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Icon, Label, Text} from "shared/components"
import {IconName} from "shared/enums"
import {TriggerCondition, TriggerConditionProps} from "../trigger-condition"

const defaultProps: TriggerConditionProps = {
  icon: IconName.File,
  descriptionKey: "description",
  titleKey: "title"
}

const getComponent = (props?: Partial<TriggerConditionProps>) => <TriggerCondition {...{...defaultProps, ...props}} />

describe("trigger-condition", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure without custom render", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
  })
  it("has correct structure with custom render", () => {
    const component = getComponent({
      renderCondition: () => (
        <div className="test-render">
          <Text>Test</Text>
        </div>
      )
    })
    const tree = shallow(component)

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(".test-render")).toHaveLength(1)
  })
})
