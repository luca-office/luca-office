import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Text} from "shared/components"
import {codingDimensionsMock, codingModelsMock} from "shared/graphql/__mocks__"
import {ratingProjectModulesMock} from "../../../__mocks__/rating-project-modules.mock"
import {RatingProjectModule} from "../../../models"
import {
  RaterRatingParticipantRatingMaxScoreLabel,
  RaterRatingParticipantRatingMaxScoreLabelProps
} from "../rater-rating-participant-rating-max-score-label"

const ratingProjectModule = {
  ...ratingProjectModulesMock[1],
  scenario: {...ratingProjectModulesMock[1].scenario, codingModel: codingModelsMock[1]}
} as RatingProjectModule

const ratingCodingDimensions = codingDimensionsMock.map(mock => ({
  ...mock,
  codingModelId: `${ratingProjectModule.scenario?.codingModel?.id}`
}))

const defaultProps: RaterRatingParticipantRatingMaxScoreLabelProps = {
  ratingProjectModule,
  codingDimensions: ratingCodingDimensions
}

const getComponent = (props?: Partial<RaterRatingParticipantRatingMaxScoreLabelProps>) => (
  <RaterRatingParticipantRatingMaxScoreLabel {...{...defaultProps, ...props}} />
)

describe("rater-rating-participant-rating-max-score-label", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const label = tree.find(Text)
    expect(label).toHaveLength(1)
    expect(label.html()).toContain("coding_criteria__criterion_list_score")
  })
})
