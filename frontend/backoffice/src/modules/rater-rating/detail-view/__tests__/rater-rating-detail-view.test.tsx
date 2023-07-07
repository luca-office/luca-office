import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DetailViewHeader, LoadingIndicator} from "shared/components"
import {surveyIdMock, surveysMock, userAccountMock} from "shared/graphql/__mocks__"
import {surveyQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {RaterRatingDetailViewContent} from "../detail-view-content/rater-rating-detail-view-content"
import {RaterRatingDetailViewFooter} from "../detail-view-footer/rater-rating-detail-view-footer"
import * as useRaterRatingDetailViewHook from "../hooks/use-rater-rating-detail-view"
import {UseRaterRatingDetailViewHook} from "../hooks/use-rater-rating-detail-view"
import {RaterRatingDetailView, RaterRatingDetailViewProps} from "../rater-rating-detail-view"

const defaultProps: RaterRatingDetailViewProps = {
  surveyId: surveyIdMock
}

const stateHookValuesDefault: UseRaterRatingDetailViewHook = {
  dataLoading: false,
  ratingPercentage: 66.67,
  totalEntitiesCount: 12,
  ratedEntitiesCount: 8,
  userAccount: Option.of(userAccountMock),
  navigateToOverview: jest.fn()
}

const stateSpy = jest.spyOn(useRaterRatingDetailViewHook, "useRaterRatingDetailView")

const getComponent = (props?: Partial<RaterRatingDetailViewProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: surveyQuery,
          variables: {id: surveyIdMock}
        },
        result: {
          data: {
            survey: surveysMock[0]
          }
        }
      }
    ]}>
    <RaterRatingDetailView {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("rater-rating-detail-view", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (data loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
    expect(tree.find(RaterRatingDetailViewContent)).toHaveLength(1)
    expect(tree.find(RaterRatingDetailViewFooter)).toHaveLength(1)
  })
  it("has correct structure (data loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(1)
    expect(tree.find(RaterRatingDetailViewContent)).toHaveLength(0)
    expect(tree.find(RaterRatingDetailViewFooter)).toHaveLength(0)
  })
})
