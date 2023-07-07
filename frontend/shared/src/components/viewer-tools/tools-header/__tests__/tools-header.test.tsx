import {shallow} from "enzyme"
import {create} from "react-test-renderer"
import {Button} from "../../.."
import {ViewerToolsType} from "../../../../enums"
import {ToolsHeader, ToolsHeaderProps} from "../tools-header"

const defaultProps: ToolsHeaderProps = {
  toolType: ViewerToolsType.PDF,
  onClose: jest.fn()
}

describe("viewer-tools-header", () => {
  it("renders correctly", async () => {
    const component = create(<ToolsHeader {...defaultProps} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("triggers onMinimizeTool when minimize text is pressed", async () => {
    const onMinimizeToolSpy = jest.fn()
    const tree = shallow(<ToolsHeader {...{...defaultProps}} onMinimizeTool={onMinimizeToolSpy} />)

    const minimizeButton = tree.find(Button).first()
    minimizeButton.simulate("click")
    expect(onMinimizeToolSpy).toHaveBeenCalledTimes(1)
  })
  it("triggers onClose when Close icon is pressed", async () => {
    const onMinimizeToolSpy = jest.fn()
    const onCloseSpy = jest.fn()
    const tree = shallow(<ToolsHeader {...{...defaultProps}} onClose={onCloseSpy} onMinimizeTool={onMinimizeToolSpy} />)

    const closeButton = tree.find(Button).last()
    closeButton.simulate("click")
    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  })
})
