import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ProgressBarColumn, Text} from "shared/components"
import {codingModelsMock} from "shared/graphql/__mocks__"
import {ratingProjectModulesMock} from "../../../__mocks__/rating-project-modules.mock"
import {RatingProjectModule} from "../../../models"
import {
  RaterRatingParticipantRatingProgressBar,
  RaterRatingParticipantRatingProgressBarProps
} from "../rater-rating-participant-rating-progress-bar"

const ratingProjectModule = {
  ...ratingProjectModulesMock[1],
  scenario: {...ratingProjectModulesMock[1].scenario, codingModel: codingModelsMock[1]}
} as RatingProjectModule

const defaultProps: RaterRatingParticipantRatingProgressBarProps = {
  ratingProjectModule
}

const getComponent = (props?: Partial<RaterRatingParticipantRatingProgressBarProps>) => (
  <RaterRatingParticipantRatingProgressBar {...{...defaultProps, ...props}} />
)

describe("rater-rating-participant-rating-progress-bar", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(ProgressBarColumn)).toHaveLength(1)
  })
})
