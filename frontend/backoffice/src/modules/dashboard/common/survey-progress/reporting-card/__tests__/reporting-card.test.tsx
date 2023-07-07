import * as React from "react"
import {create} from "react-test-renderer"
import {surveyResultsOverviewMock} from "../../../../../../graphql/__mocks__"
import {ReportingCard, ReportingCardProps} from "../reporting-card"

const defaultProps: ReportingCardProps = {
  completedParticipantsCount: {
    numCompletedParticipants: 0,
    totalParticipants: 5
  },
  onClick: jest.fn(),
  surveyResultsOverview: surveyResultsOverviewMock
}

const createComponent = (props?: Partial<ReportingCardProps>) => <ReportingCard {...defaultProps} {...props} />

describe("reporting-card", () => {
  it("renders correctly", () => {
    const component = create(createComponent())
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
