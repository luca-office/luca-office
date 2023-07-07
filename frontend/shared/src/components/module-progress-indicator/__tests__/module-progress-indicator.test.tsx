import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Text} from "../../../components"
import {ProgressIndicatorStatus} from "../../../enums"
import {ModuleProgressIndicator, ProgressIndicatorProps} from "../module-progress-indicator"

const defaultProps: ProgressIndicatorProps = {
  progressEntities: [
    ProgressIndicatorStatus.Completed,
    ProgressIndicatorStatus.Completed,
    ProgressIndicatorStatus.Open,
    ProgressIndicatorStatus.Open,
    ProgressIndicatorStatus.Open
  ]
}

const getComponent = (props?: Partial<ProgressIndicatorProps>) => (
  <ModuleProgressIndicator {...{...defaultProps, ...props}} />
)

describe("rater-rating-participant-progress-indicator", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(".completed-indicator")).toHaveLength(2)
    expect(tree.find(".open-indicator")).toHaveLength(3)
  })
})
