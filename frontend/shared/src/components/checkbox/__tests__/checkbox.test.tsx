import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Text} from "../../typography/typography"
import {Checkbox, CheckboxLabelPosition, CheckboxProps} from "../checkbox"

const defaultProps: CheckboxProps = {
  label: "label",
  checked: false,
  onChange: jest.fn(),
  labelPosition: CheckboxLabelPosition.Right,
  disabled: false
}

const getComponent = (props?: Partial<CheckboxProps>) => <Checkbox {...{...defaultProps, ...props}} />

describe("checkbox", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("shows label", () => {
    const mockLabel = "checkbox-label"
    const component = getComponent({label: mockLabel})
    render(component)
    expect(screen.queryAllByText(mockLabel).length).toBe(1)
  })
  it("changes selection status", async () => {
    const mockOnChange = jest.fn()
    const component = getComponent({onChange: mockOnChange})
    render(component)
    const checkbox: HTMLInputElement = screen.getByRole("checkbox")
    expect(checkbox.checked).toBe(false)

    fireEvent.click(screen.getByRole("checkbox"))

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled()
    })
  })
})
