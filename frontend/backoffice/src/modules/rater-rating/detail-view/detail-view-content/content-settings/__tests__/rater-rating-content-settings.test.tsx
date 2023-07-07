import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Paper, Text} from "shared/components"
import {surveysMock} from "shared/graphql/__mocks__"
import {RaterRatingContentSettings, RaterRatingContentSettingsProps} from "../rater-rating-content-settings"

const defaultProps: RaterRatingContentSettingsProps = {
  survey: surveysMock[0]
}

const getComponent = (props?: Partial<RaterRatingContentSettingsProps>) => (
  <RaterRatingContentSettings {...{...defaultProps, ...props}} />
)

describe("rater-rating-content-settings", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(5)
    expect(tree.find(Paper)).toHaveLength(1)
  })
})
