import * as React from "react"
import {create} from "react-test-renderer"
import {ReportingOverviewMetadata, ReportingOverviewMetadataProps} from "../reporting-overview-metadata"

const defaultProps: ReportingOverviewMetadataProps = {
  averageScore: 6,
  maximumScore: 12,
  participantScore: 8
}

const getComponent = (props?: Partial<ReportingOverviewMetadataProps>) => (
  <ReportingOverviewMetadata {...{...defaultProps, ...props}} />
)

describe("reporting-overview-metadata", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
