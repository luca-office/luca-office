import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardFooter, Icon, ProgressBarColumn, Text} from "shared/components"
import {RatingStatus} from "shared/enums"
import {chartBackgroundBarColor, chartCompleteBarColor, gradientPrimary} from "shared/styles"
import {RatersRatingCardFooter, RatersRatingCardFooterProps} from "../raters-rating-card-footer"

const defaultProps: RatersRatingCardFooterProps = {
  status: RatingStatus.SurveyInProgress,
  ratingPercentage: 66.67,
  totalEntitiesCount: 12,
  ratedEntitiesCount: 8
}

const getComponent = (props?: Partial<RatersRatingCardFooterProps>) => (
  <RatersRatingCardFooter {...{...defaultProps, ...props}} />
)

describe("raters-rating-card-footer", () => {
  it("renders correctly (survey in progress)", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (rating in progress)", () => {
    const component = getComponent({status: RatingStatus.RatingInProgress})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (completed)", () => {
    const component = getComponent({
      status: RatingStatus.Completed,
      ratingPercentage: 100,
      ratedEntitiesCount: defaultProps.totalEntitiesCount
    })
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (survey in progress)", () => {
    const component = getComponent()
    const tree = shallow(component)

    const cardFooter = tree.find(CardFooter)
    expect(cardFooter).toHaveLength(1)

    const cardFooterContent = cardFooter.dive()
    expect(cardFooterContent.find(Text)).toHaveLength(1)
    expect(cardFooterContent.find(Icon)).toHaveLength(1)

    const progressBar = cardFooterContent.find(ProgressBarColumn)
    expect(progressBar).toHaveLength(1)

    const progressElement = progressBar.dive().find(".progress-element")
    expect(progressElement).toHaveLength(1)
    expect(JSON.stringify(progressElement.prop("css"))).toContain(`background:${chartBackgroundBarColor}`)
  })
  it("has correct structure (rating in progress)", () => {
    const component = getComponent({status: RatingStatus.RatingInProgress})
    const tree = shallow(component)

    const cardFooter = tree.find(CardFooter)
    expect(cardFooter).toHaveLength(1)

    const cardFooterContent = cardFooter.dive()
    expect(cardFooterContent.find(Text)).toHaveLength(1)
    expect(cardFooterContent.find(Icon)).toHaveLength(1)

    const progressBar = cardFooterContent.find(ProgressBarColumn)
    expect(progressBar).toHaveLength(1)

    const progressElement = progressBar.dive().find(".progress-element")
    expect(progressElement).toHaveLength(1)
    expect(JSON.stringify(progressElement.prop("css"))).toContain(`background:${gradientPrimary}`)
  })
  it("has correct structure (completed)", () => {
    const component = getComponent({
      status: RatingStatus.Completed,
      ratingPercentage: 100,
      ratedEntitiesCount: defaultProps.totalEntitiesCount
    })
    const tree = shallow(component)

    const cardFooter = tree.find(CardFooter)
    expect(cardFooter).toHaveLength(1)

    const cardFooterContent = cardFooter.dive()
    expect(cardFooterContent.find(Text)).toHaveLength(1)
    expect(cardFooterContent.find(Icon)).toHaveLength(1)

    const progressBar = cardFooterContent.find(ProgressBarColumn)
    expect(progressBar).toHaveLength(1)

    const progressElement = progressBar.dive().find(".progress-element")
    expect(progressElement).toHaveLength(1)
    expect(JSON.stringify(progressElement.prop("css"))).toContain(`background:${chartCompleteBarColor}`)
  })
})
