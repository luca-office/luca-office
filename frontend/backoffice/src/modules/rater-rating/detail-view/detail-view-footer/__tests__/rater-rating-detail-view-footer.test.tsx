import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ProgressBarColumn, Text} from "shared/components"
import {ratingsMock, surveyIdMock, userAccountMock} from "shared/graphql/__mocks__"
import {ratingsQuery} from "shared/graphql/queries"
import {RaterRatingActionButton} from "../../../common"
import {RaterRatingDetailViewFooter, RaterRatingDetailViewFooterProps} from "../rater-rating-detail-view-footer"

const defaultProps: RaterRatingDetailViewFooterProps = {
  surveyId: surveyIdMock,
  userAccountId: userAccountMock.id,
  ratingPercentage: 66.67,
  totalEntitiesCount: 12,
  ratedEntitiesCount: 8
}

const getComponent = (props?: Partial<RaterRatingDetailViewFooterProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: ratingsQuery,
          variables: {surveyId: surveyIdMock}
        },
        result: {
          data: {
            ratings: ratingsMock
          }
        }
      }
    ]}>
    <RaterRatingDetailViewFooter {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("rater-rating-detail-view-footer", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(ProgressBarColumn)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(RaterRatingActionButton)).toHaveLength(1)
  })
})
