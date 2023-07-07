import React from "react"
import {create} from "react-test-renderer"
import {ModuleStartOverlay, ModuleStartOverlayProps} from "../module-start-overlay"

const defaultProps: ModuleStartOverlayProps = {
  title: "Questionnaire Title",
  buttonTitle: "Start Questionnaire",
  description: "Questionnaire Description",
  onStartModule: jest.fn()
}

describe("module-start-overlay", () => {
  it("renders correctly with default props", () => {
    const component = create(<ModuleStartOverlay {...defaultProps} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
