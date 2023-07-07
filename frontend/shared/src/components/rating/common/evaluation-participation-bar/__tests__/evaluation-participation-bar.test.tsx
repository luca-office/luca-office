import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Paper} from "../../../../paper/paper"
import {ProgressBarColumn} from "../../../../progress-bar-column/progress-bar-column"
import {Heading, Text} from "../../../../typography/typography"
import {EvaluationParticipationBar, EvaluationParticipationBarProps} from "../evaluation-participation-bar"

const defaultProps: EvaluationParticipationBarProps = {
  finishedRaters: 8,
  totalRaters: 12
}

const getComponent = (props?: Partial<EvaluationParticipationBarProps>) => (
  <EvaluationParticipationBar {...{...defaultProps, ...props}} />
)

describe("evaluation-participation-bar", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(ProgressBarColumn)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
  })
})
