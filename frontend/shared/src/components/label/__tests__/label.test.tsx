import {render, screen} from "@testing-library/react"
import {shallow} from "enzyme"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Icon} from "../../icon/icon"
import {Label, LabelProps} from "../label"

const defaultProps: LabelProps = {
  label: "Label"
}

const getComponent = (props?: Partial<LabelProps>) => <Label {...{...defaultProps, ...props}} />

describe("label", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has label", () => {
    const mockLabel = "mock-label"
    const component = getComponent({label: mockLabel})
    render(component)
    expect(screen.getByText(mockLabel)).toBeDefined()
  })
  it("has icon", () => {
    const component = getComponent({icon: IconName.EditPencil})
    const tree = shallow(component)

    expect(tree.find(Icon)).toHaveLength(1)
  })
})
