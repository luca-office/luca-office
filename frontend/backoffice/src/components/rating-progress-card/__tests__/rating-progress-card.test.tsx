import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading} from "shared/components"
import {surveyIdMock} from "shared/graphql/__mocks__"
import {DonutChartWithLegend} from "../../index"
import * as useRatingProgressCardHook from "../hooks/use-rating-progress-card"
import {UseRatingProgressCardHook} from "../hooks/use-rating-progress-card"
import {RatingProgressCard, RatingProgressCardProps} from "../rating-progress-card"

const defaultProps: RatingProgressCardProps = {
  surveyId: surveyIdMock
}

const stateHookValuesDefault: UseRatingProgressCardHook = {
  ratersInProgressCount: 8,
  finishedRatersCount: 12
}

const stateSpy = jest.spyOn(useRatingProgressCardHook, "useRatingProgressCard")

const getComponent = (props?: Partial<RatingProgressCardProps>) => (
  <RatingProgressCard {...{...defaultProps, ...props}} />
)

describe("rating-progress-card", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(DonutChartWithLegend)).toHaveLength(1)
  })
})
