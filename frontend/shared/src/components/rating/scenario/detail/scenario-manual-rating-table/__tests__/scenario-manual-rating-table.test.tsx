import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {RaterMode} from "../../../../../../enums"
import {
  checkLoginMock,
  codingCriteriaMock,
  ratingsMock,
  scenarioManualCodingItemRatingsMock,
  surveyIdMock,
  userAccountsMock
} from "../../../../../../graphql/__mocks__"
import {QuestionScoringType} from "../../../../../../graphql/generated/globalTypes"
import {checkLoginQuery, ratingsQuery, surveyUserAccountsQuery} from "../../../../../../graphql/queries"
import {Option} from "../../../../../../utils"
import * as useScenarioCodingItemRatingsByRatingsListHook from "../../../../../rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import * as useScenarioCodingItemsByRatingsListHook from "../../../../../rating/hooks/use-scenario-coding-items-by-ratings-list"
import {CriterionRatingTable} from "../../../../common"
import {UseScenarioCodingItemRatingsByRatingsListHook, UseScenarioCodingItemsByRatingsListHook} from "../../../../hooks"
import * as useScenarioManualRatingTableHook from "../hooks/use-scenario-manual-rating-table"
import {UseScenarioManualRatingTableHook} from "../hooks/use-scenario-manual-rating-table"
import {ScenarioManualRatingTable, ScenarioManualRatingTableProps} from "../scenario-manual-rating-table"

const scenarioCodingItemRating = scenarioManualCodingItemRatingsMock[0]

const defaultProps: ScenarioManualRatingTableProps = {
  scenarioCodingItemRating: Option.of(scenarioCodingItemRating),
  scoringType: QuestionScoringType.Analytical,
  codingCriteria: codingCriteriaMock,
  performAction: jest.fn(),
  mode: RaterMode.FinalRater,
  surveyId: surveyIdMock,
  participantFinishedModule: true,
  isReadonly: false,
  ratingId: Option.of(ratingsMock[0].id)
}

const stateHookValuesDefault: UseScenarioManualRatingTableHook = {
  actionLoading: false,
  noCriterionFulfilled: false,
  isSelected: jest.fn(),
  updateCriterionSelection: jest.fn(),
  setNoCriterionFulfilled: jest.fn(),
  hasRatingChanged: false,
  applyRatingChanges: jest.fn()
}

const stateSpy = jest.spyOn(useScenarioManualRatingTableHook, "useScenarioManualRatingTable")

const scenarioCodingItemRatingsByRatingsListHookValuesDefault: UseScenarioCodingItemRatingsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
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

const getComponent = (props?: Partial<ScenarioManualRatingTableProps>) => (
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
    <ScenarioManualRatingTable {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("scenario-manual-rating-table", () => {
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
