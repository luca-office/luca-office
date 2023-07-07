import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {LoadingIndicator} from "shared/components"
import {checkLoginMock, ratingsMock, surveyIdMock, surveysMock} from "shared/graphql/__mocks__"
import {ratingsQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {CardOverview} from "../../../../components"
import {RaterRatingOverviewPlaceholder, RatersRatingCard} from "../../common"
import * as useRaterRatingOverviewHook from "../hooks/use-rater-rating-overview"
import {UseRaterRatingOverviewHook} from "../hooks/use-rater-rating-overview"
import {RaterRatingOverview} from "../rater-rating-overview"

const stateHookValuesDefault: UseRaterRatingOverviewHook = {
  dataLoading: false,
  userAccount: Option.of(checkLoginMock),
  surveys: surveysMock,
  navigateToDetailview: jest.fn()
}

const stateSpy = jest.spyOn(useRaterRatingOverviewHook, "useRaterRatingOverview")

const getComponent = () => (
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
    <RaterRatingOverview />
  </MockedProvider>
)

describe("rater-rating-overview", () => {
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
  it("renders correctly (no surveys)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, surveys: []})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    const cardOverview = tree.find(CardOverview)
    expect(cardOverview).toHaveLength(1)

    const cardOverviewContent = cardOverview.dive()
    expect(cardOverviewContent.find(LoadingIndicator)).toHaveLength(0)
    expect(cardOverviewContent.find(RaterRatingOverviewPlaceholder)).toHaveLength(0)
    expect(cardOverviewContent.find(RatersRatingCard)).toHaveLength(2)
  })
  it("has correct structure (data loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    const cardOverview = tree.find(CardOverview)
    expect(cardOverview).toHaveLength(1)

    const cardOverviewContent = cardOverview.dive()
    expect(cardOverviewContent.find(LoadingIndicator)).toHaveLength(1)
    expect(cardOverviewContent.find(RaterRatingOverviewPlaceholder)).toHaveLength(0)
    expect(cardOverviewContent.find(RatersRatingCard)).toHaveLength(0)
  })
  it("has correct structure (no surveys)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, surveys: []})
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    const cardOverview = tree.find(CardOverview)
    expect(cardOverview).toHaveLength(1)

    const cardOverviewContent = cardOverview.dive()
    expect(cardOverviewContent.find(LoadingIndicator)).toHaveLength(0)
    expect(cardOverviewContent.find(RaterRatingOverviewPlaceholder)).toHaveLength(1)
    expect(cardOverviewContent.find(RatersRatingCard)).toHaveLength(0)
  })
})
