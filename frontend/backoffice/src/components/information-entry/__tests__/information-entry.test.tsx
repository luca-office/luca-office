import {render} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon} from "shared/components"
import {IconName} from "shared/enums"
import {InformationEntry, InformationEntryProps} from "../information-entry"

const defaultProps: InformationEntryProps = {
  label: "InformationEntry"
}

const getComponent = (props?: Partial<InformationEntryProps>) => <InformationEntry {...{...defaultProps, ...props}} />

describe("information-entry", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should display the label and children passed as props", () => {
    const label = "Test Label"
    const children = "Test Content"

    const {getByText} = render(<InformationEntry label={label}>{children}</InformationEntry>)

    expect(getByText(label)).toBeDefined()
    expect(getByText(children)).toBeDefined()
  })
})
