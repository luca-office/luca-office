import {shallow} from "enzyme"
import * as React from "react"
import {Controller} from "react-hook-form"
import {create} from "react-test-renderer"
import {Button} from "../../../../button/button"
import {Icon} from "../../../../icon/icon"
import {Tooltip} from "../../../../tooltip/tooltip"
import {RatingDetailActionElement, RatingDetailActionElementProps} from "../rating-detail-action-element"

const clickSpy = jest.fn()
const defaultProps: RatingDetailActionElementProps = {
  isScenario: false,
  onClick: clickSpy,
  disabled: false
}

const getComponent = (props?: Partial<RatingDetailActionElementProps>) => (
  <RatingDetailActionElement {...{...defaultProps, ...props}} />
)

describe("rating-action-element", () => {
  it("renders correctly", () => {
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure active - questionnaire", () => {
    const component = shallow(getComponent())
    expect(component.find(Controller)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(1)

    const button = component.find(Button)
    expect(button).toHaveLength(1)
    expect(button.prop("disabled")).toBeFalsy()
  })

  it("has correct structure disabled - scenario", () => {
    const component = shallow(getComponent({isScenario: true, disabled: true}))
    expect(component.find(Controller)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(1)

    const button = component.find(Button)
    expect(button).toHaveLength(1)
    expect(button.prop("disabled")).toBeTruthy()
  })

  it("handles button click correctly", () => {
    const component = shallow(getComponent({isScenario: true, disabled: true}))
    expect(component.find(Controller)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(1)

    const button = component.find(Button)
    expect(button).toHaveLength(1)

    button.simulate("click")
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it("displays correct title and icon on disabled", () => {
    const component = shallow(getComponent({disabled: true}))
    expect(component.find(Controller)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(1)

    expect(component.find(Icon)).toHaveLength(1)
    const button = component.find(Button)
    expect(button).toHaveLength(1)
    expect(button.html()).toContain("confirmed")
  })
})
