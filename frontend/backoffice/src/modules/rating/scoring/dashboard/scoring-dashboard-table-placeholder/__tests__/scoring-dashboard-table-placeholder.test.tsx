import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Heading, Text} from "shared/components"
import {surveyIdMock} from "shared/graphql/__mocks__"
import {
  ScoringDashboardTablePlaceholder,
  ScoringDashboardTablePlaceholderProps
} from "../rating-overview-table-placeholder"

const defaultProps: ScoringDashboardTablePlaceholderProps = {
  surveyId: surveyIdMock
}

const getComponent = (props?: Partial<ScoringDashboardTablePlaceholderProps>) => (
  <ScoringDashboardTablePlaceholder {...{...defaultProps, ...props}} />
)

describe("scoring-dashboard-table-placeholder", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toTree()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
  })
})
