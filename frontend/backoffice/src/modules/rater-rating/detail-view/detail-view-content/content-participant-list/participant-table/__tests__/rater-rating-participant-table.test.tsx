import {shallow} from "enzyme"
import {orderBy} from "lodash-es"
import * as React from "react"
import {create} from "react-test-renderer"
import {TableContainer} from "shared/components"
import {surveyInvitationsMock} from "shared/graphql/__mocks__"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {ratingProjectModulesMock} from "../../../../../__mocks__/rating-project-modules.mock"
import {getRaterRatingParticipantTableColumns} from "../../../../../config/participant-table.config"
import * as useRaterRatingParticipantTableHook from "../hooks/use-rater-rating-participant-table"
import {UseRaterRatingParticipantTableHook} from "../hooks/use-rater-rating-participant-table"
import {RaterRatingParticipantTable, RaterRatingParticipantTableProps} from "../rater-rating-participant-table"

const indexedSurveyInvitations = orderBy(surveyInvitationsMock, ({token}) => token.toLowerCase()).map(
  (mock, index) => ({
    ...mock,
    index: index
  })
)

const defaultProps: RaterRatingParticipantTableProps = {
  surveyInvitations: surveyInvitationsMock,
  ratingProjectModules: ratingProjectModulesMock
}

const stateHookValuesDefault: UseRaterRatingParticipantTableHook = {
  indexedSurveyInvitations,
  columns: getRaterRatingParticipantTableColumns(
    fakeTranslate,
    indexedSurveyInvitations,
    ratingProjectModulesMock,
    surveyInvitationsMock.length / 2
  ),
  navigateToParticipantRatingOverview: jest.fn()
}

const stateSpy = jest.spyOn(useRaterRatingParticipantTableHook, "useRaterRatingParticipantTable")

const getComponent = (props?: Partial<RaterRatingParticipantTableProps>) => (
  <RaterRatingParticipantTable {...{...defaultProps, ...props}} />
)

describe("rater-rating-participant-table", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(TableContainer)).toHaveLength(1)
  })
})
