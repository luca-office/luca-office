import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text} from "../../../.."
import {imageBinariesMock} from "../../../../binary-viewer/__mocks__/binaries.mock"
import {SubheaderTab, SubheaderTabProps} from "../subheader-tab"

const close = jest.fn()
const select = jest.fn()

const defaultProps: SubheaderTabProps = {
  onClose: close,
  binary: imageBinariesMock[0],
  onSelect: select,
  selected: false
}

describe("subheader-tab", () => {
  it("renders correctly", async () => {
    const component = create(<SubheaderTab {...defaultProps} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly selected", async () => {
    const component = create(<SubheaderTab {...defaultProps} selected={true} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const tree = shallow(<SubheaderTab {...defaultProps} />)

    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
  })
  it("triggers actions correctly", async () => {
    const tree = shallow(<SubheaderTab {...defaultProps} />)

    render(<SubheaderTab {...defaultProps} />)

    expect(screen.getByTestId("subheader-tab")).toBeDefined()

    fireEvent.click(screen.getByTestId("subheader-tab"))

    await waitFor(() => {
      expect(close).toHaveBeenCalledTimes(0)
      expect(select).toHaveBeenCalledTimes(1)
    })
  })
})
