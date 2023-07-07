import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button} from "shared/components"
import {surveyIdMock, userAccountMock} from "shared/graphql/__mocks__"
import * as useRaterRatingActionButtonHook from "../hooks/use-rater-rating-action-button"
import {UseRaterRatingActionButtonHook} from "../hooks/use-rater-rating-action-button"
import {RaterRatingActionButton, RaterRatingActionButtonProps} from "../rater-rating-action-button"

const defaultProps: RaterRatingActionButtonProps = {
  surveyId: surveyIdMock,
  userAccountId: userAccountMock.id
}

const stateHookValuesDefault: UseRaterRatingActionButtonHook = {
  dataLoading: false,
  actionLoading: false,
  isFinalized: false,
  isOrlyVisible: false,
  showOrly: jest.fn(),
  onConfirm: jest.fn(),
  onCancel: jest.fn()
}

const stateSpy = jest.spyOn(useRaterRatingActionButtonHook, "useRaterRatingActionButton")

const getComponent = (props?: Partial<RaterRatingActionButtonProps>) => (
  <RaterRatingActionButton {...{...defaultProps, ...props}} />
)

describe("rater-rating-action-button", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (data loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (action loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, actionLoading: true})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (finalized)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, isFinalized: true})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)

    const button = tree.find(Button)
    expect(button).toHaveLength(1)
    expect(button.prop("disabled")).toEqual(false)
    expect(button.prop("isLoading")).toEqual(false)
  })
  it("has correct structure (data loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    const component = getComponent()
    const tree = shallow(component)

    const button = tree.find(Button)
    expect(button).toHaveLength(1)
    expect(button.prop("disabled")).toEqual(true)
    expect(button.prop("isLoading")).toEqual(true)
  })
  it("has correct structure (action loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, actionLoading: true})
    const component = getComponent()
    const tree = shallow(component)

    const button = tree.find(Button)
    expect(button).toHaveLength(1)
    expect(button.prop("disabled")).toEqual(true)
    expect(button.prop("isLoading")).toEqual(true)
  })
  it("has correct structure (finalized)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, isFinalized: true})
    const component = getComponent()
    const tree = shallow(component)

    const button = tree.find(Button)
    expect(button).toHaveLength(1)
    expect(button.prop("disabled")).toEqual(true)
    expect(button.prop("isLoading")).toEqual(false)
  })
  it("correctly handles click", () => {
    const showOrlyMock = jest.fn()
    stateSpy.mockReturnValue({...stateHookValuesDefault, showOrly: showOrlyMock})
    const component = getComponent()
    const tree = shallow(component)

    const button = tree.find(Button)
    expect(button).toHaveLength(1)

    button.simulate("click")
    expect(showOrlyMock).toHaveBeenCalledTimes(1)
  })
})
