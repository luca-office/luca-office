import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {mount} from "enzyme"
import * as React from "react"
import {act, create} from "react-test-renderer"
import {Button, ReadonlyActionField} from "shared/components"
import {OverlayEditField, OverlayEditFieldProps} from "../overlay-edit-field"
import {multipleFields, optionField, textareaField} from "../__mocks__/form-fields.mock"

const updateSpy = jest.fn()
const defaultProps: OverlayEditFieldProps<unknown> = {
  fieldLabelKey: "navigation__scenarios",
  dialogTitleKey: "edit_button",
  onUpdate: updateSpy,
  updateLoading: false,
  formFields: multipleFields,
  renderValue: () => <span>some value</span>
}

const getComponent = (props?: Partial<React.PropsWithChildren<OverlayEditFieldProps<unknown>>>) => (
  <OverlayEditField {...{...defaultProps, ...props}} />
)

describe("overlay-edit-field", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly disabled", () => {
    const component = getComponent({disabled: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders overlay with multiple inputs", async () => {
    const component = getComponent()
    const tree = mount(component)
    const {getByTestId, queryAllByText} = render(component)

    // overlay is closed
    expect(tree.find(ReadonlyActionField)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.html()).toContain(defaultProps.fieldLabelKey)
    expect(tree.html()).toContain("edit_button")
    expect(tree.html()).toContain("some value")
    expect(tree.html()).toContain("span")

    // When I open the overlay
    act(() => {
      fireEvent.click(getByTestId("readonly-action-field"))
    })
    await waitFor(() => {
      // it should contain the respective option field
      expect(queryAllByText(defaultProps.dialogTitleKey)).toHaveLength(2)
    })
  })

  it("renders overlay with option input", async () => {
    const component = getComponent({
      formFields: optionField,
      buttonLabelKey: "edit_button",
      dialogDescriptionKey: "description"
    })
    const tree = mount(component)

    const user = userEvent.setup()
    render(component)

    // overlay is closed
    expect(tree.find(ReadonlyActionField)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)

    await user.click(screen.getByText("edit_button"))

    // it should contain the respective option field
    expect(tree.html()).toContain(defaultProps.dialogTitleKey)
    expect(screen.queryAllByTestId("custom-select")).toHaveLength(optionField.length)
  })

  it("renders overlay with textarea input", async () => {
    const component = getComponent({formFields: textareaField, buttonLabelKey: "edit_button"})
    const tree = mount(component)

    const user = userEvent.setup()
    render(component)

    // overlay is closed
    expect(tree.find(ReadonlyActionField)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)

    await user.click(screen.getByText("edit_button"))

    // it should contain the respective option field
    expect(tree.html()).toContain(defaultProps.dialogTitleKey)
    expect(screen.queryAllByRole("textbox")).toHaveLength(textareaField.length)
  })
})
