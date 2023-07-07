import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Option} from "../../../../utils"
import {Button, Heading} from "../../.."
import {imageBinariesMock} from "../../../binary-viewer/__mocks__/binaries.mock"
import {SubheaderTab} from "../subheader-tab/subheader-tab"
import {ViewerToolsSubHeader, ViewerToolsSubHeaderProps} from "../viewer-tools-sub-header"
import {render} from "@testing-library/react"

const navigateToPreviousSpy = jest.fn()
const navigateToFollowingSpy = jest.fn()
const defaultProps: ViewerToolsSubHeaderProps = {
  hideNavigationButtons: false,
  elements: Option.of(imageBinariesMock),
  selectedElement: Option.none(),
  closeElement: jest.fn,
  selectElement: jest.fn,
  navigateToPrevious: navigateToPreviousSpy,
  navigateToNext: navigateToFollowingSpy
}

describe("viewer-tools-sub-header", () => {
  it("renders correctly", async () => {
    const component = create(<ViewerToolsSubHeader {...defaultProps} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const tree = shallow(<ViewerToolsSubHeader {...defaultProps} />)
    expect(tree.find(Button)).toHaveLength(2)
    expect(tree.find(SubheaderTab)).toHaveLength(imageBinariesMock.length)
  })
  it("has correct structure for only one binary", async () => {
    const tree = shallow(<ViewerToolsSubHeader {...defaultProps} elements={Option.of([imageBinariesMock[0]])} />)

    expect(tree.find(Button)).toHaveLength(2)
    expect(tree.find(Button).first().prop("disabled")).toBeTruthy()
    expect(tree.find(Button).last().prop("disabled")).toBeTruthy()
    expect(tree.find(SubheaderTab)).toHaveLength(1)
  })
  it("hides the navigation buttons on hideNavigationButtons", async () => {
    const tree = shallow(<ViewerToolsSubHeader {...defaultProps} hideNavigationButtons={true} />)

    expect(tree.find(Button)).toHaveLength(0)
  })
  it("disables the navigation buttons when no method is provided", async () => {
    const tree = shallow(
      <ViewerToolsSubHeader {...defaultProps} navigateToPrevious={undefined} navigateToNext={undefined} />
    )

    const leftArrowButton = tree.find(Button).first()
    const rightArrowButton = tree.find(Button).last()

    expect(tree.find(Button)).toHaveLength(2)
    expect(leftArrowButton.prop("disabled")).toBeTruthy()
    expect(rightArrowButton.prop("disabled")).toBeTruthy()
  })
  it("triggers the navigation buttons on click", async () => {
    const tree = shallow(<ViewerToolsSubHeader {...{...defaultProps}} />)

    const leftArrowButton = tree.find(Button).first()
    const rightArrowButton = tree.find(Button).last()

    leftArrowButton.simulate("click")
    rightArrowButton.simulate("click")

    expect(navigateToPreviousSpy).toHaveBeenCalledTimes(1)
    expect(navigateToFollowingSpy).toHaveBeenCalledTimes(1)
  })
})
