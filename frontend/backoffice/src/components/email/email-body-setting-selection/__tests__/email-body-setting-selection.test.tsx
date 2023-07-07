import {render, fireEvent} from "@testing-library/react"
import {EmailBodySettingSelection} from "../email-body-setting-selection"
import "@testing-library/jest-dom/extend-expect"
import {SelectOptionCustomized} from "shared/components"
import {create} from "react-test-renderer"

describe("EmailBodySettingSelection", () => {
  it("renders correctly", () => {
    const component = <EmailBodySettingSelection label={"label"} options={[]} value="" onChange={() => {}} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("should render the label", () => {
    const label = "Label Text"
    const {getByText} = render(<EmailBodySettingSelection label={label} options={[]} value="" onChange={() => {}} />)
    expect(getByText(label)).toBeInTheDocument()
  })

  it("should render the options when not disabled", () => {
    const options: SelectOptionCustomized[] = [
      {value: "option1", label: "Option 1"},
      {value: "option2", label: "Option 2"}
    ]
    const {getByTestId} = render(<EmailBodySettingSelection label="" options={options} value="" onChange={() => {}} />)
    expect(getByTestId("custom-select")).toBeInTheDocument()
  })

  it("should render the value when disabled", () => {
    const options = [
      {value: "option1", label: "Option 1"},
      {value: "option2", label: "Option 2"}
    ]
    const value = "option1"
    const {getByText} = render(
      <EmailBodySettingSelection label="" options={options} value={value} onChange={() => {}} disabled />
    )
    expect(getByText("Option 1")).toBeInTheDocument()
  })

  it("should render the lock icon when disabled", () => {
    const options = [
      {value: "option1", label: "Option 1"},
      {value: "option2", label: "Option 2"}
    ]
    const {getByTitle} = render(
      <EmailBodySettingSelection label="" options={options} value="" onChange={() => {}} disabled />
    )
    expect(getByTitle("disabled")).toBeInTheDocument()
  })
})
