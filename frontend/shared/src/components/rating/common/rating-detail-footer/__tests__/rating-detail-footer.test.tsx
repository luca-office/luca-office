import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button} from "../../../../button/button"
import {CardFooter} from "../../../../card"
import {Icon} from "../../../../icon/icon"
import {Text} from "../../../../typography/typography"
import {RatingDetailFooter, RatingDetailFooterProps} from "../rating-detail-footer"

const defaultProps: RatingDetailFooterProps = {
  score: 0,
  maxScore: 10,
  navigateToNextQuestion: jest.fn(),
  navigateToPreviousQuestion: jest.fn(),
  isOverviewPage: false,
  requiresScoring: false,
  participantFinishedModule: true,
  isRatingInProgress: true,
  isNotRatable: false
}

const getComponent = (props?: Partial<RatingDetailFooterProps>) => <RatingDetailFooter {...defaultProps} {...props} />

describe("rating-detail-header", () => {
  it("renders correctly", () => {
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())

    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(2)
    expect(component.find(Button)).toHaveLength(2)
  })
})
