import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardHeader, Text} from "shared/components"
import {RatingStatus} from "shared/enums"
import {surveysMock} from "shared/graphql/__mocks__"
import {RatersRatingCardHeader, RatersRatingCardHeaderProps} from "../raters-rating-card-header"

const defaultProps: RatersRatingCardHeaderProps = {
  title: surveysMock[0].title,
  status: RatingStatus.SurveyInProgress
}

const getComponent = (props?: Partial<RatersRatingCardHeaderProps>) => (
  <RatersRatingCardHeader {...{...defaultProps, ...props}} />
)

describe("raters-rating-card-header", () => {
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
    const component = getComponent({status: RatingStatus.Completed})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (survey in progress)", () => {
    const component = getComponent()
    const tree = shallow(component)

    const cardHeader = tree.find(CardHeader)
    expect(cardHeader).toHaveLength(1)

    const texts = cardHeader.dive().find(Text)
    expect(texts).toHaveLength(2)
    expect(texts.at(1).html()).toContain("rater_rating__status_survey_in_progress")
  })
  it("has correct structure (rating in progress)", () => {
    const component = getComponent({status: RatingStatus.RatingInProgress})
    const tree = shallow(component)

    const cardHeader = tree.find(CardHeader)
    expect(cardHeader).toHaveLength(1)

    const texts = cardHeader.dive().find(Text)
    expect(texts).toHaveLength(2)
    expect(texts.at(1).html()).toContain("rater_rating__status_rating_in_progress")
  })
  it("has correct structure (completed)", () => {
    const component = getComponent({status: RatingStatus.Completed})
    const tree = shallow(component)

    const cardHeader = tree.find(CardHeader)
    expect(cardHeader).toHaveLength(1)

    const texts = cardHeader.dive().find(Text)
    expect(texts).toHaveLength(2)
    expect(texts.at(1).html()).toContain("rater_rating__status_rating_completed")
  })
})
