import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import wait from "waait"
import {
  freetextQuestionRatingsMock,
  projectModulesMockWithQuestionnaire,
  projectsMock,
  ratingsMock,
  surveyIdMock,
  surveyInvitationIdMock,
  surveyInvitationsProgressMock
} from "../../../../../../graphql/__mocks__"
import {freetextQuestionRatingsQuery, ratingsQuery} from "../../../../../../graphql/queries"
import {Route} from "../../../../../../routes"
import {Option, Subject} from "../../../../../../utils"
import {Content} from "../../../../../content"
import {TableOfContentsContainer, TableOfContentsEntry} from "../../../../../table-of-content"
import {RatingQuestionnaireTableOfContents} from "../../../../common"
import * as useRatingQuestionnaireTableOfContentsHook from "../../../../common/rating-table-of-contents/questionnaire/hooks/use-rating-questionnaire-table-of-contents"
import {UseRatingQuestionnaireTableOfContentsHook} from "../../../../common/rating-table-of-contents/questionnaire/hooks/use-rating-questionnaire-table-of-contents"
import {UseRatingsHook} from "../../../../hooks"
import * as useRatingsHook from "../../../../hooks/use-ratings"
import {RatingQuestionnaireDetailView} from "../../../rating-questionnaire-detail-view/rating-questionnaire-detail-view"
import * as useRatingDetailQuestionnaireHook from "../hooks/use-rating-detail-questionnaire"
import {UseRatingDetailQuestionnaireHook} from "../hooks/use-rating-detail-questionnaire"
import {RatingDetailQuestionnaire, RatingDetailQuestionnaireProps} from "../rating-detail-questionnaire"

const projectModule = projectModulesMockWithQuestionnaire[3]
const questions = projectModule.questionnaire?.questions
const questionId = projectModule.questionnaire?.questions[2].id
const freetextQuestionRatings = freetextQuestionRatingsMock.map(mock => ({...mock, questionId}))

const hookValuesDefault: UseRatingDetailQuestionnaireHook = {
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
  navigateToQuestionWithIndexOffset: jest.fn(),
  questionnaire: Option.of(projectModule.questionnaire),
  selectedEntityId: Option.of(questions && questions[0].id),
  selectEntityId: jest.fn(),
  ratingId: Option.of(ratingsMock[0].id),
  participantFinishedModule: true,
  fetchFreetextQuestionRatingsSubject: new Subject<void>(),
  isReadonly: false,
  isNotRatable: false,
  isContentMissing: false
}

const tocStateHookValuesDefault: UseRatingQuestionnaireTableOfContentsHook = {
  allRated: false,
  score: 8,
  maxScore: 12,
  isRated: jest.fn(),
  dataLoading: false,
  getScores: jest.fn(() => ({maxScore: 6, averageScore: 3})),
  getScoresOfAllQuestions: jest.fn(() => ({maxScore: 6, averageScore: 3}))
}

const defaultProps: RatingDetailQuestionnaireProps<Route> = {
  projectId: projectsMock[0].id,
  surveyId: surveyIdMock,
  moduleId: projectModule.id,
  surveyInvitationId: surveyInvitationIdMock,
  questionId,
  navigateTo: jest.fn()
}

const getComponent = (props?: Partial<RatingDetailQuestionnaireProps<Route>>) => (
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
      },
      ...ratingsMock.map(rating => ({
        request: {
          query: freetextQuestionRatingsQuery,
          variables: {ratingId: rating.id}
        },
        result: {
          data: {freetextQuestionRatings}
        }
      }))
    ]}>
    <RatingDetailQuestionnaire {...{...defaultProps, ...props}} />
  </MockedProvider>
)

const stateSpy = jest.spyOn(useRatingDetailQuestionnaireHook, "useRatingDetailQuestionnaire")
const tocStateSpy = jest.spyOn(useRatingQuestionnaireTableOfContentsHook, "useRatingQuestionnaireTableOfContents")

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock,
  allRatings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

describe("rating-detail-questionnaire", () => {
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    tocStateSpy.mockReturnValue(tocStateHookValuesDefault)
    ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
    const tree = shallow(getComponent()).childAt(0).dive()

    await act(() => wait(0))

    const cardOverview = tree.find(Content)
    expect(cardOverview).toHaveLength(1)

    const ratingQuestionnaireTableOfContents = tree.find(RatingQuestionnaireTableOfContents)
    expect(ratingQuestionnaireTableOfContents).toHaveLength(1)

    const tableOfContentsContainer = ratingQuestionnaireTableOfContents.dive().find(TableOfContentsContainer)
    expect(tableOfContentsContainer).toHaveLength(1)

    const tableOfContentsEntries = tableOfContentsContainer.dive().find(TableOfContentsEntry)
    expect(tableOfContentsEntries).toHaveLength(1)

    const ratingQuestionnaireDetailView = tree.find(RatingQuestionnaireDetailView)
    expect(ratingQuestionnaireDetailView).toHaveLength(1)
  })
})
