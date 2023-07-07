import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {IconName, RaterMode, RatingActionOption} from "../../../../../enums"
import {
  automatedCodingCriteriaMock,
  checkLoginMock,
  codingCriteriaMock,
  codingDimensionsMock,
  ratingsMock,
  scenarioAutomatedCodingItemRatingsMock,
  scenarioManualCodingItemRatingsMock,
  scenariosMock,
  surveyIdMock,
  surveyInvitationIdMock,
  userAccountsMock
} from "../../../../../graphql/__mocks__"
import {QuestionScoringType} from "../../../../../graphql/generated/globalTypes"
import {checkLoginQuery, ratingsQuery, surveyUserAccountsQuery} from "../../../../../graphql/queries"
import {CodingItem} from "../../../../../models"
import {Option} from "../../../../../utils"
import {Card, CardContent} from "../../../../card"
import * as useScenarioCodingItemsByRatingsListHook from "../../../../rating/hooks/use-scenario-coding-items-by-ratings-list"
import {RatingDetailView, RatingOverviewTable} from "../../../common"
import {UseScenarioCodingItemRatingsByRatingsListHook, UseScenarioCodingItemsByRatingsListHook} from "../../../hooks"
import * as useScenarioRatingsByRatingsListHook from "../../../hooks/use-scenario-coding-item-ratings-by-ratings-list"
import {ScenarioAutomaticRatingTable, ScenarioManualRatingTable} from "../../detail"
import * as useRatingScenarioDetailViewHook from "../hooks/use-rating-scenario-detail-view"
import {UseRatingScenarioDetailViewHook} from "../hooks/use-rating-scenario-detail-view"
import {RatingScenarioDetailView, RatingScenarioDetailViewProps} from "../rating-scenario-detail-view"

const scenario = scenariosMock[0]
const codingDimension = codingDimensionsMock[0]
const codingItem = codingDimension.items[0]

const defaultProps: RatingScenarioDetailViewProps = {
  navigateToNextParticipant: jest.fn(),
  navigateToPreviousParticipant: jest.fn(),
  participantIndex: 0,
  participantName: "Laurence Moulder",
  participantsCount: 12,
  navigateToNextQuestion: jest.fn(),
  navigateToPreviousQuestion: jest.fn(),
  surveyInvitationId: surveyInvitationIdMock,
  scenario,
  selectedCodingEntityId: codingItem.id,
  navigateToEntity: jest.fn(),
  ratingId: Option.of(ratingsMock[0].id),
  mode: RaterMode.FinalRater,
  surveyId: surveyIdMock,
  participantFinishedModule: true,
  isReadonly: false,
  isNotRatable: false,
  refreshData: jest.fn()
}

const stateHookValuesDefault: UseRatingScenarioDetailViewHook = {
  dataLoading: false,
  selectedCodingDimension: Option.none(),
  selectedCodingItem: Option.of<CodingItem>(codingItem),
  label: codingItem.title,
  description: codingItem.description,
  isOverviewPage: false,
  isAutomatedCodingItem: false,
  score: 12,
  maxScore: 24,
  backgroundIcon: Option.of<IconName>(IconName.Gear),
  overviewEntityName: "",
  overviewEntities: [],
  scenarioCodingItemRating: Option.of(scenarioManualCodingItemRatingsMock[0]),
  codingCriteria: codingCriteriaMock.map(mock => ({...mock, itemId: codingItem.id})),
  automatedCodingCriteria: automatedCodingCriteriaMock.map(mock => ({...mock, itemId: codingItem.id})),
  scoringType: codingItem.scoringType as unknown as QuestionScoringType,
  selectedRatingAction: RatingActionOption.None,
  setSelectedRatingAction: jest.fn(),
  refreshData: jest.fn(),
  createScenarioCodingItemRatingLoading: false,
  isRatingInProgress: true,
  averageScore: 3
}

const stateSpy = jest.spyOn(useRatingScenarioDetailViewHook, "useRatingScenarioDetailView")

const scenarioRatingsByRatingsListHookValuesDefault: UseScenarioCodingItemRatingsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioAutomatedCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn()
}

const scenarioRatingsByRatingsListSpy = jest.spyOn(
  useScenarioRatingsByRatingsListHook,
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

const getComponent = (props?: Partial<RatingScenarioDetailViewProps>) => (
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
    <RatingScenarioDetailView {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("rating-scenario-detail-view", () => {
  it("renders correctly (selected item)", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (selected dimension)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      selectedCodingDimension: Option.of(codingDimension),
      label: codingDimension.title,
      description: codingDimension.description,
      isOverviewPage: true,
      isAutomatedCodingItem: false,
      overviewEntityName: `${fakeTranslate("rating_scenario__items_label")} (${codingDimension.items.length})`,
      overviewEntities: [
        {
          position: 0,
          title: codingItem.title,
          score: 6,
          maxScore: 12,
          id: codingItem.id,
          rated: true,
          averageScore: 3
        }
      ],
      scoringType: QuestionScoringType.None
    })
    scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const component = create(getComponent({selectedCodingEntityId: codingItem.id}))
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no selection)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      selectedCodingDimension: Option.none(),
      selectedCodingItem: Option.none(),
      label: scenario.name,
      description: scenario.description,
      isOverviewPage: true,
      isAutomatedCodingItem: false,
      scoringType: QuestionScoringType.None
    })
    scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const component = create(getComponent({selectedCodingEntityId: undefined}))
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (selected item, isAutomatedCodingItem=false)", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const tree = shallow(getComponent()).childAt(0).dive()

    await act(() => wait(0))

    const ratingDetailView = tree.find(RatingDetailView)
    expect(ratingDetailView).toHaveLength(1)

    const card = ratingDetailView.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const ratingContent = cardContent.dive().find(".rating-content")
    expect(ratingContent).toHaveLength(1)

    expect(ratingContent.find(RatingOverviewTable)).toHaveLength(0)
    expect(ratingContent.find(ScenarioManualRatingTable)).toHaveLength(1)
    expect(ratingContent.find(ScenarioAutomaticRatingTable)).toHaveLength(0)
  })
  it("has correct structure (selected item, isAutomatedCodingItem=true)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, isAutomatedCodingItem: true})
    scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const tree = shallow(getComponent()).childAt(0).dive()

    await act(() => wait(0))

    const ratingDetailView = tree.find(RatingDetailView)
    expect(ratingDetailView).toHaveLength(1)

    const card = ratingDetailView.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const ratingContent = cardContent.dive().find(".rating-content")
    expect(ratingContent).toHaveLength(1)

    expect(ratingContent.find(RatingOverviewTable)).toHaveLength(0)
    expect(ratingContent.find(ScenarioManualRatingTable)).toHaveLength(0)
    expect(ratingContent.find(ScenarioAutomaticRatingTable)).toHaveLength(1)
  })
  it("has correct structure (selected dimension)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      selectedCodingDimension: Option.of(codingDimension),
      label: codingDimension.title,
      description: codingDimension.description,
      isOverviewPage: true,
      isAutomatedCodingItem: false,
      overviewEntityName: `${fakeTranslate("rating_scenario__items_label")} (${codingDimension.items.length})`,
      overviewEntities: [
        {
          position: 0,
          title: codingItem.title,
          score: 6,
          maxScore: 12,
          id: codingItem.id,
          rated: true,
          averageScore: 3
        }
      ],
      scoringType: QuestionScoringType.None
    })
    scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const tree = shallow(getComponent({selectedCodingEntityId: codingItem.id}))
      .childAt(0)
      .dive()

    await act(() => wait(0))

    const ratingDetailView = tree.find(RatingDetailView)
    expect(ratingDetailView).toHaveLength(1)

    const card = ratingDetailView.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const ratingContent = cardContent.dive().find(".rating-content")
    expect(ratingContent).toHaveLength(1)

    expect(ratingContent.find(RatingOverviewTable)).toHaveLength(1)
    expect(ratingContent.find(ScenarioManualRatingTable)).toHaveLength(0)
    expect(ratingContent.find(ScenarioAutomaticRatingTable)).toHaveLength(0)
  })
  it("has correct structure (no selection)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      selectedCodingDimension: Option.none(),
      selectedCodingItem: Option.none(),
      label: scenario.name,
      description: scenario.description,
      isOverviewPage: true,
      isAutomatedCodingItem: false,
      scoringType: QuestionScoringType.None
    })
    scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const tree = shallow(getComponent({selectedCodingEntityId: undefined}))
      .childAt(0)
      .dive()

    await act(() => wait(0))

    const ratingDetailView = tree.find(RatingDetailView)
    expect(ratingDetailView).toHaveLength(1)

    const card = ratingDetailView.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const ratingContent = cardContent.dive().find(".rating-content")
    expect(ratingContent).toHaveLength(1)

    expect(ratingContent.find(RatingOverviewTable)).toHaveLength(1)
    expect(ratingContent.find(ScenarioManualRatingTable)).toHaveLength(0)
    expect(ratingContent.find(ScenarioAutomaticRatingTable)).toHaveLength(0)
  })
})
