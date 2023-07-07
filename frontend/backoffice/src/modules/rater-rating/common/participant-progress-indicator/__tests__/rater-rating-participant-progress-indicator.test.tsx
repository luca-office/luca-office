import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Text} from "shared/components"
import {surveyInvitationsMock} from "shared/graphql/__mocks__"
import {ratingProjectModulesMock} from "../../../__mocks__/rating-project-modules.mock"
import {
  RaterRatingParticipantProgressIndicator,
  RaterRatingParticipantProgressIndicatorProps
} from "../rater-rating-participant-progress-indicator"

const defaultProps: RaterRatingParticipantProgressIndicatorProps = {
  projectModules: ratingProjectModulesMock,
  surveyInvitation: surveyInvitationsMock[0]
}

const getComponent = (props?: Partial<RaterRatingParticipantProgressIndicatorProps>) => (
  <RaterRatingParticipantProgressIndicator {...{...defaultProps, ...props}} />
)

describe("rater-rating-participant-progress-indicator", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component).dive()

    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(".completed-indicator")).toHaveLength(4)
    expect(tree.find(".in-progress-indicator")).toHaveLength(0)
    expect(tree.find(".open-indicator")).toHaveLength(0)
  })
})
