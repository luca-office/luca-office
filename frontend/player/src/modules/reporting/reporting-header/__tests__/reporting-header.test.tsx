import * as React from "react"
import {create} from "react-test-renderer"
import {userAccountsMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {ReportingHeader, ReportingHeaderProps} from "../reporting-header"

const defaultProps: ReportingHeaderProps = {
  participantName: Option.of(`${userAccountsMock[0].firstName} ${userAccountsMock[0].lastName}`)
}

const getComponent = (props?: Partial<ReportingHeaderProps>) => <ReportingHeader {...{...defaultProps, ...props}} />

describe("reporting-header", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no name)", () => {
    const component = getComponent({participantName: Option.none()})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
