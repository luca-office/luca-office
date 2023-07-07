import * as React from "react"
import {create} from "react-test-renderer"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {rScriptMock} from "../../__mocks__/r-scripts.mock"
import {Props, RScriptDetailView} from "../r-script-detail-view"

const defaultProps: Props = {
  t: jest.fn(),
  rScript: rScriptMock,
  isUpdateLoading: false,
  updateRScript: jest.fn(),
  deleteRScript: jest.fn(),
  archiveRScript: jest.fn(),
  formMethods: mockedFormMethods
}

describe("r-script-detail-view", () => {
  it("renders correctly", () => {
    const component = <RScriptDetailView {...defaultProps} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly (readonly)", () => {
    const props = {...defaultProps, rScript: {...rScriptMock, isEditable: false}}
    const component = <RScriptDetailView {...props} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
