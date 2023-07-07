import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardContent} from "../../../../card"
import {Heading, Text} from "../../../../typography/typography"
import {RatingDetailFooter} from "../../rating-detail-footer/rating-detail-footer"
import {RatingDetailHeader} from "../../rating-detail-header/rating-detail-header"
import {RatingDetailView, RatingDetailViewProps} from "../rating-detail-view"

const defaultProps: RatingDetailViewProps = {
  label: "Fragebogen der Marktforschung",
  description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
  navigateToNextParticipant: jest.fn(),
  navigateToPreviousParticipant: jest.fn(),
  participantIndex: 0,
  participantName: "Dieter",
  participantsCount: 6,
  score: 6,
  maxScore: 12,
  participantFinishedModule: true,
  isRatingInProgress: true,
  isNotRatable: false
}

const getComponent = (props?: Partial<RatingDetailViewProps>) => <RatingDetailView {...{...defaultProps, ...props}} />

describe("rating-detail-view", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (question navigation)", () => {
    const component = getComponent({navigateToNextQuestion: jest.fn(), navigateToPreviousQuestion: jest.fn()})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (isOverviewPage=true)", () => {
    const component = getComponent({isOverviewPage: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (requiresScoring=true)", () => {
    const component = getComponent({requiresScoring: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const card = tree.find(Card)
    expect(card).toHaveLength(1)

    const cardBody = card.dive()
    expect(cardBody.find(RatingDetailHeader)).toHaveLength(1)
    expect(cardBody.find(RatingDetailFooter)).toHaveLength(1)

    const cardContent = cardBody.find(CardContent)
    expect(cardContent).toHaveLength(1)

    const cardContentBody = cardContent.dive()
    expect(cardContentBody.find(Heading)).toHaveLength(1)
    expect(cardContentBody.find(Text)).toHaveLength(1)
    expect(cardContentBody.find(".rating-content")).toHaveLength(1)
  })
  it("has correct structure (question navigation)", () => {
    const component = getComponent({navigateToNextQuestion: jest.fn(), navigateToPreviousQuestion: jest.fn()})
    const tree = shallow(component)

    const card = tree.find(Card)
    expect(card).toHaveLength(1)

    const cardBody = card.dive()
    expect(cardBody.find(RatingDetailHeader)).toHaveLength(1)
    expect(cardBody.find(RatingDetailFooter)).toHaveLength(1)

    const cardContent = cardBody.find(CardContent)
    expect(cardContent).toHaveLength(1)

    const cardContentBody = cardContent.dive()
    expect(cardContentBody.find(Heading)).toHaveLength(1)
    expect(cardContentBody.find(Text)).toHaveLength(1)
    expect(cardContentBody.find(".rating-content")).toHaveLength(1)
  })
  it("has correct structure (isOverviewPage=true)", () => {
    const component = getComponent({isOverviewPage: true})
    const tree = shallow(component)

    const card = tree.find(Card)
    expect(card).toHaveLength(1)

    const cardBody = card.dive()
    expect(cardBody.find(RatingDetailHeader)).toHaveLength(1)
    expect(cardBody.find(RatingDetailFooter)).toHaveLength(1)

    const cardContent = cardBody.find(CardContent)
    expect(cardContent).toHaveLength(1)

    const cardContentBody = cardContent.dive()
    expect(cardContentBody.find(Heading)).toHaveLength(1)
    expect(cardContentBody.find(Text)).toHaveLength(1)
    expect(cardContentBody.find(".rating-content")).toHaveLength(1)
  })
  it("has correct structure (requiresScoring=true)", () => {
    const component = getComponent({requiresScoring: true})
    const tree = shallow(component)

    const card = tree.find(Card)
    expect(card).toHaveLength(1)

    const cardBody = card.dive()
    expect(cardBody.find(RatingDetailHeader)).toHaveLength(1)
    expect(cardBody.find(RatingDetailFooter)).toHaveLength(1)

    const cardContent = cardBody.find(CardContent)
    expect(cardContent).toHaveLength(1)

    const cardContentBody = cardContent.dive()
    expect(cardContentBody.find(Heading)).toHaveLength(1)
    expect(cardContentBody.find(Text)).toHaveLength(1)
    expect(cardContentBody.find(".rating-content")).toHaveLength(1)
  })
})
