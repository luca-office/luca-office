import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button} from "../../../../button/button"
import {CardHeader} from "../../../../card"
import {Icon} from "../../../../icon/icon"
import {Text} from "../../../../typography/typography"
import {RatingDetailHeader, RatingDetailHeaderProps} from "../rating-detail-header"

const nextSpy = jest.fn()
const prevSpy = jest.fn()
const defaultProps: RatingDetailHeaderProps = {
  participantIndex: 0,
  navigateToNextParticipant: nextSpy,
  navigateToPreviousParticipant: prevSpy,
  participantName: "John Smith",
  participantsCount: 33
}

const getComponent = (props?: Partial<RatingDetailHeaderProps>) => <RatingDetailHeader {...defaultProps} {...props} />

describe("rating-detail-header", () => {
  it("renders correctly", () => {
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)

    const text = component.find(Text).html()
    expect(text).toContain("rating__labeled_count")
    expect(component.find(Button)).toHaveLength(2)
    component.find(Button).first().simulate("click")
    expect(prevSpy).toHaveBeenCalled()
    expect(nextSpy).not.toHaveBeenCalled()
    prevSpy.mockClear()
    component.find(Button).last().simulate("click")
    expect(nextSpy).toHaveBeenCalled()
    expect(prevSpy).not.toHaveBeenCalled()
  })
})
