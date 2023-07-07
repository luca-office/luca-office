import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text} from "shared/components"
import {ratingsMock, surveyInvitationsMock, surveysMock, userAccountsMock} from "shared/graphql/__mocks__"
import {ratingsQuery} from "shared/graphql/queries"
import {RatingActionButton} from "../../../common"
import * as useScoringFooterHook from "../hooks/use-scoring-footer"
import {UseScoringFooterHook} from "../hooks/use-scoring-footer"
import {ScoringFooter, ScoringFooterProps} from "../scoring-footer"

const survey = surveysMock[0]

const defaultProps: ScoringFooterProps = {
  surveyId: survey.id,
  raters: userAccountsMock,
  ratings: ratingsMock,
  totalCount: surveyInvitationsMock.length
}

const stateHookValuesDefault: UseScoringFooterHook = {
  completedRatingsCount: 1,
  participantsFullyRatedCount: 0
}

const stateSpy = jest.spyOn(useScoringFooterHook, "useScoringFooter")

const getComponent = (props?: Partial<ScoringFooterProps>) => (
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
    <ScoringFooter {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("scoring-footer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(Icon)).toHaveLength(2)
    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(RatingActionButton)).toHaveLength(1)
  })
})
