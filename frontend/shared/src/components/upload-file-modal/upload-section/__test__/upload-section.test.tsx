import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading} from "../../../typography/typography"
import {UploadSection, UploadSectionProps} from "../upload-section"

const defaultProps: UploadSectionProps = {
  heading: ""
}

const useComponent = (props?: Partial<UploadSectionProps>) => (
  <UploadSection {...defaultProps} {...props}>
    <div className="children"></div>
  </UploadSection>
)

describe("UploadSection", () => {
  it("renders correctly", () => {
    const component = useComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(useComponent())

    expect(component.find(".upload-section")).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
  })

  it("renders children correctly", () => {
    const component = mount(useComponent())

    expect(component.find(".children")).toHaveLength(1)
  })
})
