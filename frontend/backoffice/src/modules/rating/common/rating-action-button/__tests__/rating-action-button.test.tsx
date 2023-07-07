import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Orly} from "shared/components"
import {surveyIdMock} from "shared/graphql/__mocks__"
import wait from "waait"
import * as useRatingActionButtonHook from "../hooks/use-rating-action-button"
import {UseRatingActionButtonHook} from "../hooks/use-rating-action-button"
import {RatingActionButton, RatingActionButtonProps} from "../rating-action-button"

const defaultProps: RatingActionButtonProps = {
  surveyId: surveyIdMock
}

const hookValuesDefault: UseRatingActionButtonHook = {
  dataLoading: false,
  actionLoading: false,
  buttonDisabled: false,
  showOrly: jest.fn(),
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
  isOrlyVisible: false,
  finalRatingFinalized: false
}

const stateSpy = jest.spyOn(useRatingActionButtonHook, "useRatingActionButton")

const getComponent = (props?: Partial<RatingActionButtonProps>) => (
  <RatingActionButton {...{...defaultProps, ...props}} />
)

describe("rating-action-button", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent())

    await act(() => wait(0))

    expect(tree.find(Orly)).toHaveLength(0)

    const button = tree.find(Button)
    expect(button).toHaveLength(1)
    expect(button.html()).toContain("rating__rating__action_button_finish_scoring")
  })
  it("has correct structure (orly visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isOrlyVisible: true})
    const tree = shallow(getComponent())

    await act(() => wait(0))

    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(Orly)).toHaveLength(1)
  })
})
