import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Label, Text} from "../.."
import {Button} from "../../button/button"
import {Icon} from "../../icon/icon"
import {Heading} from "../../typography/typography"
import {SelectionInPreviewFooter, SelectionInPreviewFooterProps} from "../selection-in-preview-footer"

const defaultProps: SelectionInPreviewFooterProps = {
  headingKey: "coding_models__automated_item_r_scripts_choose_modal_description",
  icon: IconName.Email,
  textKey: "welcome_text",
  title: "test Title"
}

const getComponent = (props?: Partial<SelectionInPreviewFooterProps>) => (
  <SelectionInPreviewFooter {...{...defaultProps, ...props}} />
)

describe("selection-in-preview-footer", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(".card-wrapper")).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(1)
  })
  it("renders custom content", () => {
    const component = shallow(getComponent({customContent: <div className="custom-content">Test</div>}))
    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(".card-wrapper")).toHaveLength(1)
    expect(component.find(".custom-content")).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(0)
  })
})
