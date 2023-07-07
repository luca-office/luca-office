import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {RaterMode} from "../../../../../../enums"
import {
  automatedCodingCriteriaMock,
  automatedCodingItemMock,
  checkLoginMock,
  ratingsMock,
  scenarioAutomatedCodingItemRatingsMock,
  scenarioManualCodingItemRatingsMock,
  scenariosMock,
  surveyIdMock,
  userAccountsMock
} from "../../../../../../graphql/__mocks__"
import {QuestionScoringType} from "../../../../../../graphql/generated/globalTypes"
import {checkLoginQuery, ratingsQuery, surveyUserAccountsQuery} from "../../../../../../graphql/queries"
import {ScenarioCodingItemRating} from "../../../../../../models"
import {Option} from "../../../../../../utils"
import * as useScenarioCodingItemRatingsByRatingsListHook from "../../../../../rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import * as useScenarioCodingItemsByRatingsListHook from "../../../../../rating/hooks/use-scenario-coding-items-by-ratings-list"
import {CriterionRatingTable} from "../../../../common"
import {UseScenarioCodingItemRatingsByRatingsListHook, UseScenarioCodingItemsByRatingsListHook} from "../../../../hooks"
import * as useScenarioAutomaticRatingTableHook from "../hooks/use-scenario-automatic-rating-table"
import {UseScenarioAutomaticRatingTableHook} from "../hooks/use-scenario-automatic-rating-table"
import {ScenarioAutomaticRatingTable, ScenarioAutomaticRatingTableProps} from "../scenario-automatic-rating-table"

const codingItem = automatedCodingItemMock
const scenario = scenariosMock[0]
const scenarioCodingItemRating = {...scenarioAutomatedCodingItemRatingsMock[0], scenarioId: scenario.id}

const defaultProps: ScenarioAutomaticRatingTableProps = {
  scenarioCodingItemRating: Option.of<ScenarioCodingItemRating>(scenarioCodingItemRating),
  scoringType: QuestionScoringType.Analytical,
  codingCriteria: automatedCodingCriteriaMock,
  performAction: jest.fn(),
  mode: RaterMode.FinalRater,
  surveyId: surveyIdMock,
  participantFinishedModule: true,
  surveyInvitationId: scenarioCodingItemRating.surveyInvitationId,
  scenario,
  codingItem,
  isReadonly: false,
  ratingId: Option.of(ratingsMock[0].id),
  actionLoading: false,
  showRaterCount: true,
  isNoCriterionFulfilledButtonVisible: false
}

const stateHookValuesDefault: UseScenarioAutomaticRatingTableHook = {
  actionLoading: false,
  isSelected: jest.fn(),
  updateCriterionSelection: jest.fn(),
  applyRatingChanges: jest.fn(),
  hasRatingChanged: false,
  dataLoading: false,
  isComputerRaterSelection: jest.fn(() => false),
  setNoCriterionFulfilled: jest.fn(),
  noCriterionFulfilled: false,
  wasNoCriterionFulfilledByComputerRater: false
}

const stateSpy = jest.spyOn(useScenarioAutomaticRatingTableHook, "useScenarioAutomaticRatingTable")

const scenarioCodingItemRatingsByRatingsListHookValuesDefault: UseScenarioCodingItemRatingsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioAutomatedCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn()
}
const scenarioCodingItemRatingsByRatingsListSpy = jest.spyOn(
  useScenarioCodingItemRatingsByRatingsListHook,
  "useScenarioCodingItemRatingsByRatingsList"
)

const scenarioCodingItemsByRatingsListHookValuesDefault: UseScenarioCodingItemsByRatingsListHook = {
  scenarioCodingItemRatingsLoading: false,
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
  getScenarioCodingItemRatings: jest.fn(() => Promise.resolve(scenarioManualCodingItemRatingsMock))
}
const scenarioCodingItemsByRatingsListSpy = jest.spyOn(
  useScenarioCodingItemsByRatingsListHook,
  "useScenarioCodingItemsByRatingsList"
)

const getComponent = (props?: Partial<ScenarioAutomaticRatingTableProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: checkLoginQuery
        },
        result: {
          data: {
            checkLogin: checkLoginMock
          }
        }
      },
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
      },
      {
        request: {
          query: surveyUserAccountsQuery,
          variables: {surveyId: surveyIdMock}
        },
        result: {
          data: {
            userAccountsForSurvey: userAccountsMock
          }
        }
      }
    ]}>
    <ScenarioAutomaticRatingTable {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("scenario-automatic-rating-table", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const tree = shallow(getComponent()).childAt(0).dive()
    await act(() => wait(0))
    expect(tree.find(CriterionRatingTable)).toHaveLength(1)
  })
})
