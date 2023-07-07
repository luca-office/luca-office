import React from "react"
import {create} from "react-test-renderer"
import {ProjectModuleType} from "../../../graphql/generated/globalTypes"
import {FinishModal, FinishModalProps} from "../finish-modal"

const defaultProps: FinishModalProps = {
  moduleType: ProjectModuleType.Scenario,
  title: "Szenario XYZ",
  onAbort: jest.fn(),
  onFinish: jest.fn()
}

describe("FinishModal", () => {
  it("should render correctly", () => {
    const component = <FinishModal {...defaultProps} />
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
