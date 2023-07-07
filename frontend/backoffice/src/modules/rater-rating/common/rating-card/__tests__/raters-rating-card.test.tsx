import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card} from "shared/components"
import {RatingStatus} from "shared/enums"
import {surveysMock, userAccountMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import * as useRatersRatingCardHook from "../hooks/use-raters-rating-card"
import {UseRatersRatingCardHook} from "../hooks/use-raters-rating-card"
import {RatersRatingCard, RatersRatingCardProps} from "../raters-rating-card"
import {RatersRatingCardContent} from "../rating-card-content/raters-rating-card-content"
import {RatersRatingCardFooter} from "../rating-card-footer/raters-rating-card-footer"
import {RatersRatingCardHeader} from "../rating-card-header/raters-rating-card-header"

const defaultProps: RatersRatingCardProps = {
  survey: surveysMock[0],
  userAccount: Option.of(userAccountMock)
}

const stateHookValuesDefault: UseRatersRatingCardHook = {
  ratingStatus: RatingStatus.SurveyInProgress,
  ratingPercentage: 66.67,
  totalEntitiesCount: 12,
  ratedEntitiesCount: 8
}

const stateSpy = jest.spyOn(useRatersRatingCardHook, "useRatersRatingCard")

const getComponent = (props?: Partial<RatersRatingCardProps>) => <RatersRatingCard {...{...defaultProps, ...props}} />

describe("raters-rating-card", () => {
  it("renders correctly (survey in progress)", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (rating in progress)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, ratingStatus: RatingStatus.RatingInProgress})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (completed)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      ratingStatus: RatingStatus.Completed,
      ratingPercentage: 100,
      ratedEntitiesCount: stateHookValuesDefault.totalEntitiesCount
    })
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (survey in progress)", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)

    const card = tree.find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()
    expect(cardContent.find(RatersRatingCardHeader)).toHaveLength(1)
    expect(cardContent.find(RatersRatingCardContent)).toHaveLength(1)
    expect(cardContent.find(RatersRatingCardFooter)).toHaveLength(1)
  })
  it("has correct structure (rating in progress)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, ratingStatus: RatingStatus.RatingInProgress})
    const component = getComponent()
    const tree = shallow(component)

    const card = tree.find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()
    expect(cardContent.find(RatersRatingCardHeader)).toHaveLength(1)
    expect(cardContent.find(RatersRatingCardContent)).toHaveLength(1)
    expect(cardContent.find(RatersRatingCardFooter)).toHaveLength(1)
  })
  it("has correct structure (completed)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      ratingStatus: RatingStatus.Completed,
      ratingPercentage: 100,
      ratedEntitiesCount: stateHookValuesDefault.totalEntitiesCount
    })
    const component = getComponent()
    const tree = shallow(component)

    const card = tree.find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive()
    expect(cardContent.find(RatersRatingCardHeader)).toHaveLength(1)
    expect(cardContent.find(RatersRatingCardContent)).toHaveLength(1)
    expect(cardContent.find(RatersRatingCardFooter)).toHaveLength(1)
  })
})
