import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Paper, Text} from "shared/components"
import {userAccountMock} from "shared/graphql/__mocks__"
import {ratingIndicatorFinished, ratingIndicatorInProgress} from "shared/styles"
import {RaterPaper, RaterPaperProps} from "../rater-paper"

const defaultProps: RaterPaperProps = {
  email: userAccountMock.email,
  inProgress: false
}

const getComponent = (props?: Partial<RaterPaperProps>) => <RaterPaper {...{...defaultProps, ...props}} />

describe("rater-paper", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (inProgress)", () => {
    const component = getComponent({inProgress: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const paper = tree.find(Paper)
    expect(paper).toHaveLength(1)

    const paperContent = paper.dive()
    expect(paperContent.find(Text)).toHaveLength(1)

    const progressIndicator = paperContent.find(".progress-indicator")
    expect(progressIndicator).toHaveLength(1)
    expect(JSON.stringify(progressIndicator.prop("css"))).toContain(`background-color:${ratingIndicatorFinished}`)
  })
  it("has correct structure (inProgress)", () => {
    const component = getComponent({inProgress: true})
    const tree = shallow(component)

    const paper = tree.find(Paper)
    expect(paper).toHaveLength(1)

    const paperContent = paper.dive()
    expect(paperContent.find(Text)).toHaveLength(1)

    const progressIndicator = paperContent.find(".progress-indicator")
    expect(progressIndicator).toHaveLength(1)
    expect(JSON.stringify(progressIndicator.prop("css"))).toContain(`background-color:${ratingIndicatorInProgress}`)
  })
})
