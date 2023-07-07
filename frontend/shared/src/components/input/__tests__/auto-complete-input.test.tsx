import {SerializedStyles} from "@emotion/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {useRefMock} from "../../../../tests/react/use-ref-mock"
import {AutoCompleteInput, AutoCompleteInputProps} from "../auto-complete-input"
import * as useAutoCompleteInputHook from "../hooks/use-auto-complete-input"
import {UseAutoCompleteInputHook} from "../hooks/use-auto-complete-input"
import {TextInput} from "../text-input"

const hookValuesDefault: UseAutoCompleteInputHook = {
  results: [],
  textInputWrapperRef: useRefMock<HTMLDivElement>(),
  textInputRef: useRefMock<HTMLInputElement>(),
  resultsListRef: useRefMock<HTMLDivElement>(),
  resultsVisible: false,
  inputValue: "",
  onChange: jest.fn(),
  popperStyles: {},
  popperAttributes: undefined,
  setInputFocus: jest.fn(),
  onResultClick: jest.fn()
}

const stateSpy = jest.spyOn(useAutoCompleteInputHook, "useAutoCompleteInput")

const defaultProps: AutoCompleteInputProps = {
  value: "",
  onChange: jest.fn(),
  items: ["this", "is", "a", "test"]
}

const getComponent = (props?: Partial<AutoCompleteInputProps>) => <AutoCompleteInput {...{...defaultProps, ...props}} />

describe("auto-complete-input", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (disabled)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent({disabled: true}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (showCopyToClipboard)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent({disabled: true, showCopyToClipboard: true}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (results hidden)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent())

    const textInput = component.find(TextInput)
    expect(textInput).toHaveLength(1)

    const resultsList = component.find(".results-list")
    expect(resultsList).toHaveLength(1)

    const resultsListItems = component.find(".results-list-item")
    expect(resultsListItems).toHaveLength(0)

    expect((resultsList.prop("css") as SerializedStyles[])[0].styles).toContain("visibility:hidden")
  })
  it("has correct structure (results visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, resultsVisible: true})

    const component = shallow(getComponent())

    const textInput = component.find(TextInput)
    expect(textInput).toHaveLength(1)

    const resultsList = component.find(".results-list")
    expect(resultsList).toHaveLength(1)

    const resultsListItems = component.find(".results-list-item")
    expect(resultsListItems).toHaveLength(0)

    expect((resultsList.prop("css") as SerializedStyles[])[0].styles).toContain("visibility:initial")
  })
})
