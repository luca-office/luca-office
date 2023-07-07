import {create} from "react-test-renderer"
import {Button} from "../../index"
import {WarningTooltip, WarningTooltipProps} from "../warning-tooltip"

const defaultProps: WarningTooltipProps = {
  warningConfig: [{label: "Error"}]
}

const getComponent = (props?: Partial<WarningTooltipProps>) => (
  <WarningTooltip {...defaultProps} {...props}>
    <Button>test</Button>
  </WarningTooltip>
)

describe("warning-tooltip", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
