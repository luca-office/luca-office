import * as React from "react"
import {create} from "react-test-renderer"
import {ProjectProgressType} from "shared/enums"
import {Option} from "shared/utils"
import {participantProjectProgressMock} from "sharedTests/__mocks__"
import {ReportingOverviewRatingTable, ReportingOverviewRatingTableProps} from "../reporting-overview-rating-table"

const defaultProps: ReportingOverviewRatingTableProps = {
  participantProjectProgress: Option.of(participantProjectProgressMock),
  projectProgress: ProjectProgressType.SurveyFinished,
  maximumScore: 12,
  participantScore: 8,
  handleClick: jest.fn()
}

const getComponent = (props?: Partial<ReportingOverviewRatingTableProps>) => (
  <ReportingOverviewRatingTable {...{...defaultProps, ...props}} />
)

describe("reporting-overview-rating-table", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
