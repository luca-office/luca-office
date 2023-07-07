import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, ErrorBoundary, Heading, Table, TableContainer, Tooltip} from "shared/components"
import {surveyIdMock} from "shared/graphql/__mocks__"
import {participantTableEntityMocks} from "../__mocks__/participant-table-entity.mocks"
import {ScoringDashboardTable, ScoringDashboardTableProps} from "../scoring-dashboard-table"

const defaultProps: ScoringDashboardTableProps = {
  surveyId: surveyIdMock,
  participantTableEntities: participantTableEntityMocks.map(mock => ({...mock, isRatingOfMainRater: false})),
  navigateToParticipantRating: jest.fn(),
  navigateToParticipantProgress: jest.fn(),
  selfInvited: false,
  selfInvitedRatingFinished: false,
  isFinalRatingCompleted: false
}

const getComponent = (props?: Partial<ScoringDashboardTableProps>) => (
  <ScoringDashboardTable {...{...defaultProps, ...props}} />
)

describe("scoring-dashboard-table", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Heading)).toHaveLength(1)

    const tableContainer = tree.find(TableContainer)
    expect(tableContainer).toHaveLength(1)

    const errorBoundary = tableContainer.dive().find(ErrorBoundary)
    expect(errorBoundary).toHaveLength(1)

    const table = errorBoundary.dive().find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()

    expect(tableContent.find(Button)).toHaveLength(3)
  })
  it("correctly navigates to participant rating", () => {
    const navigateToParticipantRatingMock = jest.fn()
    const component = getComponent({navigateToParticipantRating: navigateToParticipantRatingMock})
    const tree = shallow(component)

    tree
      .find(TableContainer)
      .dive()
      .find(ErrorBoundary)
      .dive()
      .find(Table)
      .dive()
      .find(Button)
      .at(1)
      .simulate("click", {
        stopPropagation: () => {}
      })
    expect(navigateToParticipantRatingMock).toHaveBeenCalledTimes(1)
  })
  it("correctly navigates to participant progress", () => {
    const navigateToParticipantProgressMock = jest.fn()
    const component = getComponent({navigateToParticipantProgress: navigateToParticipantProgressMock})
    const tree = shallow(component)

    tree
      .find(TableContainer)
      .dive()
      .find(ErrorBoundary)
      .dive()
      .find(Table)
      .dive()
      .find(".entity-row")
      .at(0)
      .simulate("click")
    expect(navigateToParticipantProgressMock).toHaveBeenCalledTimes(1)
  })
})
