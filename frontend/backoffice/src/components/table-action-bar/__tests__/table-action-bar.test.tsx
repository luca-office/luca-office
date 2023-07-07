import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Icon} from "shared/components"
import {IconName} from "shared/enums"
import {TableActionBar, TableActionBarProps} from "../table-action-bar"

const mandatoryProps: Pick<TableActionBarProps, "onMoveUpwards" | "onMoveDownwards"> = {
  onMoveUpwards: jest.fn(),
  onMoveDownwards: jest.fn()
}
const optionalProps: Omit<TableActionBarProps, "onMoveUpwards" | "onMoveDownwards"> = {
  onDelete: jest.fn(),
  upwardMoveDisabled: false,
  downwardMoveDisabled: false,
  deleteDisabled: false,
  className: "action-bar"
}
const defaultProps: TableActionBarProps = {
  ...mandatoryProps,
  ...optionalProps
}

const getComponent = (props: TableActionBarProps) => <TableActionBar {...props} />

describe("table-action-bar", () => {
  it("renders correctly", () => {
    const component = getComponent(defaultProps)
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent(mandatoryProps)
    const tree = shallow(component)

    const buttons = tree.find(Button)
    expect(buttons).toHaveLength(2)
    expect(buttons.at(0).dive().find(Icon).prop("name")).toEqual(IconName.ArrowUp)
    expect(buttons.at(1).dive().find(Icon).prop("name")).toEqual(IconName.ArrowDown)
  })
  it("has correct structure (delete)", () => {
    const component = getComponent(defaultProps)
    const tree = shallow(component)

    const buttons = tree.find(Button)
    expect(buttons).toHaveLength(3)
    expect(buttons.at(0).dive().find(Icon).prop("name")).toEqual(IconName.ArrowUp)
    expect(buttons.at(1).dive().find(Icon).prop("name")).toEqual(IconName.ArrowDown)
    expect(buttons.at(2).dive().find(Icon).prop("name")).toEqual(IconName.Trash)
  })
  it("handles clicks", () => {
    const onMoveUpwardsMock = jest.fn()
    const onMoveDownwardsMock = jest.fn()
    const onDeleteMock = jest.fn()

    const component = getComponent({
      ...defaultProps,
      onMoveUpwards: onMoveUpwardsMock,
      onMoveDownwards: onMoveDownwardsMock,
      onDelete: onDeleteMock
    })
    const tree = shallow(component)
    const buttons = tree.find(Button)

    buttons.at(0).simulate("click")
    expect(onMoveUpwardsMock).toHaveBeenCalledTimes(1)
    expect(onMoveDownwardsMock).toHaveBeenCalledTimes(0)
    expect(onDeleteMock).toHaveBeenCalledTimes(0)

    buttons.at(1).simulate("click")
    expect(onMoveUpwardsMock).toHaveBeenCalledTimes(1)
    expect(onMoveDownwardsMock).toHaveBeenCalledTimes(1)
    expect(onDeleteMock).toHaveBeenCalledTimes(0)

    buttons.at(2).simulate("click")
    expect(onMoveUpwardsMock).toHaveBeenCalledTimes(1)
    expect(onMoveDownwardsMock).toHaveBeenCalledTimes(1)
    expect(onDeleteMock).toHaveBeenCalledTimes(1)
  })
})
