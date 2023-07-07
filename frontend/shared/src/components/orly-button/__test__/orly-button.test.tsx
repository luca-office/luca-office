import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Orly} from "../../"
import {OrlyButton, OrlyButtonContainerProps, OrlyButtonProps} from "../orly-button"

const toggleConfirmDialog = jest.fn()
const defaultProps: OrlyButtonProps & OrlyButtonContainerProps = {
  onConfirm: jest.fn(),
  showConfirmDialog: false,
  toggleConfirmDialog: toggleConfirmDialog
}

const getComponent = (props?: Partial<OrlyButtonProps & OrlyButtonContainerProps>) => (
  <OrlyButton {...{...defaultProps, ...props}} />
)

describe("delete-entity-button", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure: dont showConfirmDialig", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Orly)).toHaveLength(0)
  })

  it("has correct structure: showConfirmDialig", () => {
    const component = getComponent({showConfirmDialog: true})
    const tree = shallow(component)

    expect(tree.find(Orly)).toHaveLength(1)
  })

  it("executes actions", () => {
    const component = getComponent()
    const tree = shallow(component)

    tree.find(Button).simulate("click")
    expect(toggleConfirmDialog).toHaveBeenCalledTimes(1)
  })
})
