import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button} from "shared/components"
import {MetaEntry, MetaEntryProps} from "../meta-entry"

const defaultProps: MetaEntryProps<unknown> = {
  labelKey: "sample_companies__detail_general_information_company_tags",
  buttonConfig: {labelKey: "placeholder", onClick: jest.fn()},
  overlayConfig: undefined
}

const getComponent = (props?: Partial<MetaEntryProps<unknown>>) => <MetaEntry {...{...defaultProps, ...props}} />

describe("meta-entry", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("handles button call", () => {
    const mockOnCLick = jest.fn()
    const component = getComponent({buttonConfig: {...defaultProps.buttonConfig!, onClick: mockOnCLick}})
    const tree = shallow(component)

    const button = tree.dive().find(Button)
    expect(button).toHaveLength(1)

    button.simulate("click")
    expect(mockOnCLick).toHaveBeenCalledTimes(1)
  })
})
