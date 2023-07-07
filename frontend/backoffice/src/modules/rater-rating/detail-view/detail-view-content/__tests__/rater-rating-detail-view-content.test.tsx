import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {LoadingIndicator} from "shared/components"
import {surveyIdMock, surveyInvitationsMock, surveyLightMock, userAccountMock} from "shared/graphql/__mocks__"
import {surveyInvitationsQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {RaterRatingContentInfo} from "../content-info/rater-rating-content-info"
import {RaterRatingContentParticipantList} from "../content-participant-list/rater-rating-content-participant-list"
import {RaterRatingContentSettings} from "../content-settings/rater-rating-content-settings"
import * as useRaterRatingDetailviewContentHook from "../hooks/use-rater-rating-detail-view-content"
import {UseRaterRatingDetailViewContentHook} from "../hooks/use-rater-rating-detail-view-content"
import {RaterRatingDetailViewContent, RaterRatingDetailViewContentProps} from "../rater-rating-detail-view-content"

const defaultProps: RaterRatingDetailViewContentProps = {
  userAccountId: userAccountMock.id,
  surveyId: surveyIdMock
}

const stateHookValuesDefault: UseRaterRatingDetailViewContentHook = {
  dataLoading: false,
  survey: Option.of(surveyLightMock)
}

const stateSpy = jest.spyOn(useRaterRatingDetailviewContentHook, "useRaterRatingDetailViewContent")

const getComponent = (props?: Partial<RaterRatingDetailViewContentProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: surveyInvitationsQuery,
          variables: {surveyId: surveyIdMock}
        },
        result: {
          data: {
            surveyInvitations: surveyInvitationsMock
          }
        }
      }
    ]}>
    <RaterRatingDetailViewContent {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("rater-rating-detail-view-content", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(LoadingIndicator)).toHaveLength(0)
    expect(tree.find(RaterRatingContentInfo)).toHaveLength(1)
    expect(tree.find(RaterRatingContentSettings)).toHaveLength(1)
    expect(tree.find(RaterRatingContentParticipantList)).toHaveLength(1)
  })
  it("has correct structure (loading)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, dataLoading: true})
    const component = getComponent()
    const tree = shallow(component).childAt(0).dive()

    expect(tree.find(LoadingIndicator)).toHaveLength(1)
    expect(tree.find(RaterRatingContentInfo)).toHaveLength(0)
    expect(tree.find(RaterRatingContentSettings)).toHaveLength(0)
    expect(tree.find(RaterRatingContentParticipantList)).toHaveLength(0)
  })
})
