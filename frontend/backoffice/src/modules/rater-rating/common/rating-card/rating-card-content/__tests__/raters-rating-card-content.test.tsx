import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardContent, Icon, Text} from "shared/components"
import {surveysMock} from "shared/graphql/__mocks__"
import {RatersRatingCardContent, RatersRatingCardContentProps} from "../raters-rating-card-content"

const defaultProps: RatersRatingCardContentProps = {
  survey: surveysMock[0]
}

const getComponent = (props?: Partial<RatersRatingCardContentProps>) => (
  <RatersRatingCardContent {...{...defaultProps, ...props}} />
)

describe("raters-rating-card-content", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const cardContentComponent = tree.find(CardContent)
    expect(cardContentComponent).toHaveLength(1)

    const cardContentComponentContent = cardContentComponent.dive()
    expect(cardContentComponentContent.find(Text)).toHaveLength(4)
    expect(cardContentComponentContent.find(Icon)).toHaveLength(2)
  })
})
