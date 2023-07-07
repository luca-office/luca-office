import {MockedProvider} from "@apollo/client/testing"
import React from "react"
import {create} from "react-test-renderer"
import {projectsMock, ratingsMock, surveyInvitationsMock, surveysMock} from "shared/graphql/__mocks__"
import {ratingsQuery} from "shared/graphql/queries"
import * as useScoringDashboardHook from "../hooks/use-scoring-dashboard"
import {UseScoringDashboardHook} from "../hooks/use-scoring-dashboard"
import {ScoringDashboard, ScoringDashboardProps} from "../scoring-dashboard"
import {ParticipantTableEntity} from "../scoring-dashboard-table/scoring-dashboard-table"

const survey = surveysMock[0]
const project = projectsMock[0]

const participantTableEntities: ParticipantTableEntity[] = surveyInvitationsMock.map((mock, index) => ({
  id: mock.id,
  name: mock.participantData ? `${mock.participantData.firstName} ${mock.participantData.lastName}` : mock.token,
  index: index + 1,
  isFinalScore: index % 2 === 0,
  isRatingCompleted: index % 2 === 0,
  isRatingOfMainRater: index % 2 === 1,
  ratingCounts: {ratableProjectModulesCount: 12, finalRatedProjectModulesCount: 6},
  isRatingOfAllModulesPossible: true,
  isRatingOfSomeModulePossible: true
}))

const defaultProps: ScoringDashboardProps = {
  surveyId: survey.id,
  projectId: project.id
}

const stateHookValuesDefault: UseScoringDashboardHook = {
  loading: false,
  navigateToParticipantRating: jest.fn(),
  navigateToParticipantProgress: jest.fn(),
  participantTableEntities,
  selfInvited: false,
  selfInvitedRatingFinished: false,
  isFinalRatingCompleted: false
}

const stateSpy = jest.spyOn(useScoringDashboardHook, "useScoringDashboard")

const getComponent = (props?: Partial<ScoringDashboardProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: ratingsQuery,
          variables: {surveyId: survey.id}
        },
        result: {
          data: {
            ratings: ratingsMock.map(rating => ({...rating, surveyId: survey.id}))
          }
        }
      }
    ]}>
    <ScoringDashboard {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("ScoringDashboard", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
