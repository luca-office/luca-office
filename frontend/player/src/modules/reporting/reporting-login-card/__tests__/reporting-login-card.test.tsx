import * as React from "react"
import {create} from "react-test-renderer"
import {surveyIdMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import * as useReportingLoginCardHook from "../hooks/use-reporting-login-card"
import {UseReportingLoginCardHook} from "../hooks/use-reporting-login-card"
import {ReportingLoginCard, ReportingLoginCardProps} from "../reporting-login-card"

const defaultProps: ReportingLoginCardProps = {
  surveyId: surveyIdMock
}

const stateHookValuesDefault: UseReportingLoginCardHook = {
  loading: false,
  tokenInput: "",
  errorMessage: Option.none(),
  description: "description",
  subDescription: Option.none(),
  onChange: jest.fn(),
  navigateToReporting: jest.fn()
}
const stateSpy = jest.spyOn(useReportingLoginCardHook, "useReportingLoginCard")

const getComponent = (props?: Partial<ReportingLoginCardProps>) => (
  <ReportingLoginCard {...{...defaultProps, ...props}} />
)

describe("reporting-login-card", () => {
  it("renders correctly (no token)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (has token)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent({token: "aBc45f"})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no token, sub-description)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, subDescription: Option.of("sub-description")})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (has token, , sub-description)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, subDescription: Option.of("sub-description")})
    const component = getComponent({token: "aBc45f"})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no token, show error)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, errorMessage: Option.of("error")})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (has token, show error)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, errorMessage: Option.of("error")})
    const component = getComponent({token: "aBc45f"})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
