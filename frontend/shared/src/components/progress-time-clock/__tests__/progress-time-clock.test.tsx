import {SerializedStyles} from "@emotion/react"
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text, Tooltip} from "../../../components"
import {errorColor, primaryColor} from "../../../styles"
import {formatDate} from "../../../utils"
import * as progressTimeClockHook from "../hooks/use-progress-time-clock"
import {UseProgressTimeClock} from "../hooks/use-progress-time-clock"
import {ProgressTimeClock, ProgressTimeClockProps} from "../progress-time-clock"

const defaultProps: ProgressTimeClockProps = {
  maxModuleTimeInSeconds: 500
}

const getComponent = (props?: Partial<ProgressTimeClockProps>) => <ProgressTimeClock {...{...defaultProps, ...props}} />

const onClickSpy = jest.fn()
const dateValue = new Date("01.01.2021")
const hookValuesDefault: UseProgressTimeClock = {
  timeVisible: true,
  dateValue,
  percentWidth: 25,
  remainingTimeString: "00:05",
  handleTimeClick: onClickSpy,
  isTimeElapsed: false
}

const stateSpy = jest.spyOn(progressTimeClockHook, "useProgressTimeClock")

describe("progress-time-clock", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (time visible)", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = mount(getComponent())

    expect(component.find(Tooltip)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)

    expect(component.find(Text).text()).toContain(`${formatDate(dateValue)} - 15:00`) // 15:00 cause of mocked now
  })
  it("sets fictive Date", () => {
    const fictiveDate = new Date("03.01.2021")
    stateSpy.mockReturnValue({...hookValuesDefault, dateValue: fictiveDate})
    const component = mount(getComponent({fictiveDate: fictiveDate}))

    expect(component.find(Tooltip)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)

    expect(component.find(Text).text()).toContain(`01.03.2021 - 15:00`)
  })

  it("has correct structure (progress visible)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, ...{timeVisible: false}})
    const component = shallow(getComponent())

    expect(component.find(Tooltip)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    const progressElement = component.find(".progress-element")
    expect(progressElement).toHaveLength(1)
  })

  it("sets the progress width correctly and color (< 10%)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, ...{timeVisible: false}})
    const component = shallow(getComponent())

    const progressElement = component.find(".progress-element")
    expect(progressElement).toHaveLength(1)

    const cssStyle = (progressElement.prop("css") as SerializedStyles).styles
    expect(cssStyle).toContain("width:25%")
    expect(cssStyle).toContain(`background:${primaryColor}`)
  })

  it("sets the progress width correctly and color (<= 10%)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, ...{timeVisible: false, percentWidth: 10}})
    const component = shallow(getComponent())

    const progressElement = component.find(".progress-element")
    expect(progressElement).toHaveLength(1)

    const cssStyle = (progressElement.prop("css") as SerializedStyles).styles
    expect(cssStyle).toContain("width:10%")
    expect(cssStyle).toContain(`background:${errorColor}`)
  })

  it("handles click correctly", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, ...{timeVisible: false}})
    const component = mount(getComponent())

    const containerDiv = component.find("div").first()
    containerDiv.simulate("click")
    expect(onClickSpy).toHaveBeenCalledTimes(1)
  })
})
