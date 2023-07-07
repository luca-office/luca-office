import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ProgressBarColumn, Text} from "shared/components"
import {ParticipantRatingProgressBar, ParticipantRatingProgressBarProps} from "../participant-rating-progress-bar"

const defaultProps: ParticipantRatingProgressBarProps = {
  progressCount: 2,
  overallCount: 6,
  t: jest.fn()
}

const getComponent = (props?: Partial<ParticipantRatingProgressBarProps>) => (
  <ParticipantRatingProgressBar {...{...defaultProps, ...props}} />
)

describe("participant-rating-progress-bar", () => {
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
