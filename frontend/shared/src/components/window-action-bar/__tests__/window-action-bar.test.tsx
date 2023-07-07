import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {act, create} from "react-test-renderer"
import wait from "waait"
import {Button, TextInput} from "../../../components"
import {IconName} from "../../../enums"
import {ActionButtonConfig, WindowActionBar, WindowActionBarProps} from "../window-action-bar"

const changeSpy = jest.fn()
const requiredProps: WindowActionBarProps = {
  onSearchChange: changeSpy,
  searchPlaceHolderKey: "reference_book__search",
  debounceTime: 0
}

const clickSpy = jest.fn()
const button: ActionButtonConfig = {
  label: "test",
  icon: IconName.BookPage,
  onClick: clickSpy
}

describe("window-action-bar", () => {
  it("renders correctly with required props", () => {
    const windowBar = <WindowActionBar {...requiredProps} />
    const tree = create(windowBar).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correct structure", () => {
    const windowBar = shallow(<WindowActionBar {...requiredProps} actionButtonConfig={button} />)

    expect(windowBar.find(Button)).toHaveLength(1)
    expect(windowBar.find(TextInput)).toHaveLength(1)
  })

  it("renders correct structure without button", () => {
    const windowBar = shallow(<WindowActionBar {...requiredProps} />)

    expect(windowBar.find(Button)).toHaveLength(0)
    expect(windowBar.find(TextInput)).toHaveLength(1)
  })

  it("calls button handler correctly", () => {
    const windowBar = <WindowActionBar {...requiredProps} actionButtonConfig={button} />
    const tree = shallow(windowBar)

    const buttonElement = tree.find(Button).first()

    expect(buttonElement).toBeDefined()
    buttonElement.simulate("click")
    expect(clickSpy).toBeCalledTimes(1)
  })

  it("calls input change handler correctly with debounce", async () => {
    const onSearchChangeMock = jest.fn()
    const windowBar = <WindowActionBar {...requiredProps} debounceTime={350} onSearchChange={onSearchChangeMock} />
    render(windowBar)

    const input = screen.getByRole("textbox")
    expect(input).toBeDefined()

    fireEvent.change(input, {target: {value: "test1"}})
    expect(onSearchChangeMock).not.toBeCalled()

    await waitFor(
      () => {
        expect(onSearchChangeMock).toBeCalledWith("test1")
        expect(onSearchChangeMock).toBeCalledTimes(1)
      },
      {timeout: 400}
    )
  })
})
