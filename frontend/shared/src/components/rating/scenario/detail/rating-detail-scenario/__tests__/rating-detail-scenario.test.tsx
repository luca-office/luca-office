import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {
  codingCriteriaMock,
  codingDimensionNodesMock,
  codingDimensionsMock,
  projectModulesMockWithQuestionnaire,
  projectsMock,
  ratingsMock,
  scenarioAutomatedCodingItemRatingsMock,
  scenarioManualCodingItemRatingsMock,
  scenariosMock,
  surveyInvitationIdMock,
  surveyInvitationsProgressMock
} from "../../../../../../graphql/__mocks__"
import {
  UseCodingDimensionsLazyHook,
  UseCreateScenarioCodingItemRatingHook,
  UseRatingsHook,
  UseScenarioCodingItemRatingsLazyHook
} from "../../../../../../graphql/hooks"
import * as useCreateScenarioRatingHook from "../../../../../../graphql/hooks/mutations/ratings/use-create-scenario-coding-item-rating"
import * as useCodingDimensionsLazyHook from "../../../../../../graphql/hooks/queries/coding-models/use-coding-dimensions-lazy"
import * as useRatingsHook from "../../../../../../graphql/hooks/queries/ratings/use-ratings"
import * as useScenarioCodingItemRatingsLazyHook from "../../../../../../graphql/hooks/queries/ratings/use-scenario-coding-item-ratings-lazy"
import {Route} from "../../../../../../routes"
import {Option, Subject} from "../../../../../../utils"
import {Content} from "../../../../../content"
import {SlideMenu} from "../../../../../slide-menu/slide-menu"
import {RatingPlaceholder} from "../../../../common"
import * as useRatingCodingTableOfContentsHook from "../../../../common/rating-table-of-contents/coding/hooks/use-rating-coding-table-of-contents"
import {UseRatingCodingTableOfContentsHook} from "../../../../common/rating-table-of-contents/coding/hooks/use-rating-coding-table-of-contents"
import {UseCodingCriteriaByItemsListHook, UseScenarioCodingItemsByRatingsListHook} from "../../../../hooks"
import * as useCodingCriteriaByItemsListHook from "../../../../hooks/use-coding-criteria-by-items-list"
import * as useScenarioCodingItemsByRatingsListHook from "../../../../hooks/use-scenario-coding-items-by-ratings-list"
import * as useRatingDetailScenarioHook from "../hooks/use-rating-detail-scenario"
import {UseRatingDetailScenarioHook} from "../hooks/use-rating-detail-scenario"
import {RatingDetailScenario, RatingDetailScenarioProps} from "../rating-detail-scenario"

const projectModule = projectModulesMockWithQuestionnaire[2]
const questions = projectModule.questionnaire?.questions

const defaultProps: RatingDetailScenarioProps<Route> = {
  projectId: projectsMock[0].id,
  surveyId: surveyInvitationsProgressMock[0].id,
  moduleId: projectModulesMockWithQuestionnaire[2].id,
  surveyInvitationId: surveyInvitationIdMock,
  dimensionId: codingDimensionNodesMock[0].id,
  navigateTo: jest.fn(),
  renderScenarioSnapshot: () => <div>Snapshot</div>
}

const stateHookValuesDefault: UseRatingDetailScenarioHook = {
  projectName: Option.of(projectsMock[0].name),
  projectModules: projectModulesMockWithQuestionnaire,
  participant: Option.of(surveyInvitationsProgressMock[0]),
  participants: Option.of(surveyInvitationsProgressMock),
  participantIndex: 0,
  participantName: "John Doe",
  dataLoading: false,
  navigateToOverview: jest.fn(),
  navigateToModule: jest.fn(),
  navigateToParticipantWithIndexOffset: jest.fn(),
  navigateToDimensionWithIndexOffset: jest.fn(),
  selectedEntityId: Option.of(questions && questions[0].id),
  selectEntityId: jest.fn(),
  codingDimensions: [],
  ratingId: Option.of(ratingsMock[0].id),
  scenario: Option.of(scenariosMock[0]),
  participantFinishedModule: true,
  refreshRatingSubject: new Subject<void>(),
  isReadonly: false,
  isNotRatable: false,
  refreshData: jest.fn(),
  isContentMissing: false
}
const stateSpy = jest.spyOn(useRatingDetailScenarioHook, "useRatingDetailScenario")

const ratingCodingTableOfContentsHookValuesDefault: UseRatingCodingTableOfContentsHook = {
  loading: false,
  codingNodes: codingDimensionNodesMock,
  scenarioPercentageRated: 60,
  getPercentageRatedForCodingDimensionNode: jest.fn(() => 80),
  allRated: false,
  score: 35,
  maxScore: 60,
  averageScore: 20,
  getPercentageRatedForCodingItemNode: jest.fn(() => 20),
  getScoresForCodingDimension: jest.fn(() => ({maxScore: 6, averageScore: 3})),
  getScoresForCodingItem: jest.fn(() => ({maxScore: 6, averageScore: 3}))
}
const ratingCodingTableOfContentsSpy = jest.spyOn(useRatingCodingTableOfContentsHook, "useRatingCodingTableOfContents")

const codingCriteriaByItemsListHookValuesDefault: UseCodingCriteriaByItemsListHook = {
  codingCriteria: codingCriteriaMock,
  codingCriteriaLoading: false,
  getCodingCriteria: jest.fn()
}
const codingCriteriaByItemsListSpy = jest.spyOn(useCodingCriteriaByItemsListHook, "useCodingCriteriaByItemsList")

const codingDimensionsLazyHookValuesDefault: UseCodingDimensionsLazyHook = {
  codingDimensions: codingDimensionsMock,
  codingDimensionsLoading: false,
  getCodingDimensions: jest.fn()
}
const codingDimensionsLazySpy = jest.spyOn(useCodingDimensionsLazyHook, "useCodingDimensionsLazy")

const createScenarioRatingHookValuesDefault: UseCreateScenarioCodingItemRatingHook = {
  createScenarioCodingItemRating: jest.fn(),
  createScenarioCodingItemRatingLoading: false
}
const createScenarioRatingSpy = jest.spyOn(useCreateScenarioRatingHook, "useCreateScenarioCodingItemRating")

const scenarioCodingItemRatingsLazyHookValuesDefault: UseScenarioCodingItemRatingsLazyHook = {
  scenarioCodingItemRatings: scenarioAutomatedCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn(() => Promise.resolve(scenarioAutomatedCodingItemRatingsMock))
}
const scenarioCodingItemRatingsSpy = jest.spyOn(
  useScenarioCodingItemRatingsLazyHook,
  "useScenarioCodingItemRatingsLazy"
)

const ratingsHookValuesDefault: UseRatingsHook = {
  ratings: ratingsMock,
  ratingsLoading: false
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const scenarioCodingItemsByRatingsListHookValuesDefault: UseScenarioCodingItemsByRatingsListHook = {
  scenarioCodingItemRatingsLoading: false,
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
  getScenarioCodingItemRatings: jest.fn(() => Promise.resolve(scenarioManualCodingItemRatingsMock))
}
const scenarioCodingItemsByRatingsListSpy = jest.spyOn(
  useScenarioCodingItemsByRatingsListHook,
  "useScenarioCodingItemsByRatingsList"
)

const getComponent = (props?: Partial<RatingDetailScenarioProps<Route>>) => (
  <RatingDetailScenario {...{...defaultProps, ...props}} />
)

describe("rating-detail-scenario", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    ratingCodingTableOfContentsSpy.mockReturnValue(ratingCodingTableOfContentsHookValuesDefault)
    codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
    codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
    createScenarioRatingSpy.mockReturnValue(createScenarioRatingHookValuesDefault)
    scenarioCodingItemRatingsSpy.mockReturnValue(scenarioCodingItemRatingsLazyHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const component = create(<MockedProvider>{getComponent()}</MockedProvider>)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no scenario)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, scenario: Option.none()})
    ratingCodingTableOfContentsSpy.mockReturnValue(ratingCodingTableOfContentsHookValuesDefault)
    codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
    codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
    createScenarioRatingSpy.mockReturnValue(createScenarioRatingHookValuesDefault)
    scenarioCodingItemRatingsSpy.mockReturnValue(scenarioCodingItemRatingsLazyHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    ratingCodingTableOfContentsSpy.mockReturnValue(ratingCodingTableOfContentsHookValuesDefault)
    codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
    codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
    createScenarioRatingSpy.mockReturnValue(createScenarioRatingHookValuesDefault)
    scenarioCodingItemRatingsSpy.mockReturnValue(scenarioCodingItemRatingsLazyHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const tree = shallow(getComponent(), {wrappingComponent: MockedProvider})

    await act(() => wait(0))

    const content = tree.find(Content)
    expect(content).toHaveLength(1)
    expect(content.dive().find(SlideMenu)).toHaveLength(1)
    expect(content.dive().find(RatingPlaceholder)).toHaveLength(0)
  })
  it("has correct structure (no scenario)", async () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, scenario: Option.none()})
    ratingCodingTableOfContentsSpy.mockReturnValue(ratingCodingTableOfContentsHookValuesDefault)
    codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
    codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
    createScenarioRatingSpy.mockReturnValue(createScenarioRatingHookValuesDefault)
    scenarioCodingItemRatingsSpy.mockReturnValue(scenarioCodingItemRatingsLazyHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    scenarioCodingItemsByRatingsListSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
    const tree = shallow(getComponent(), {wrappingComponent: MockedProvider})

    await act(() => wait(0))

    const content = tree.find(Content)
    expect(content).toHaveLength(1)
    expect(content.dive().find(SlideMenu)).toHaveLength(0)
    expect(content.dive().find(RatingPlaceholder)).toHaveLength(1)
  })
})
