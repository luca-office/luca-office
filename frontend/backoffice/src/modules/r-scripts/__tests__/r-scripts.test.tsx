import * as React from "react"
import {create} from "react-test-renderer"
import {Option} from "shared/utils"
import {rScriptsMock} from "../__mocks__/r-scripts.mock"
import {Props, RScripts} from "../r-scripts"

const defaultProps: Props = {
  t: jest.fn(),
  rScripts: rScriptsMock,
  isLoading: false,
  isUpdateLoading: false,
  selectedRScript: Option.none(),
  selectRScript: jest.fn(),
  createRScript: jest.fn(),
  updateRScript: jest.fn(),
  deleteRScript: jest.fn(),
  archiveRScript: jest.fn()
}

describe("r-scripts", () => {
  it("renders correctly", () => {
    const component = <RScripts {...defaultProps} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly (content loading)", () => {
    const component = <RScripts {...defaultProps} isLoading={true} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
