import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Text} from "shared/components"
import {surveysMock} from "shared/graphql/__mocks__"
import {RaterRatingContentInfo, RaterRatingContentInfoProps} from "../rater-rating-content-info"

const defaultProps: RaterRatingContentInfoProps = {
  survey: surveysMock[0]
}

const getComponent = (props?: Partial<RaterRatingContentInfoProps>) => (
  <RaterRatingContentInfo {...{...defaultProps, ...props}} />
)

describe("rater-rating-content-info", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(3)
    expect(tree.find(Heading)).toHaveLength(2)
  })
})
