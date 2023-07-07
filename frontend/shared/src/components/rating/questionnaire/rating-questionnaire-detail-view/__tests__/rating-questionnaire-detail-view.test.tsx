import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {IconName, RaterMode, RatingActionOption} from "../../../../../enums"
import {
  checkLoginMock,
  freetextQuestionRatingCriterionSelectionMock,
  freetextQuestionRatingsMock,
  questionnaireMock,
  ratingsMock,
  surveyIdMock,
  surveyInvitationIdMock,
  surveyInvitationsMock,
  userAccountsMock
} from "../../../../../graphql/__mocks__"
import {QuestionScoringType, QuestionType} from "../../../../../graphql/generated/globalTypes"
import {
  SurveyInvitationsProps as UseSurveyInvitationsHook,
  UseCreateFreetextQuestionRatingHook
} from "../../../../../graphql/hooks"
import * as useCreateFreetextQuestionRatingHook from "../../../../../graphql/hooks/mutations/ratings/use-create-freetext-question-rating"
import * as useSurveyInvitationsHook from "../../../../../graphql/hooks/queries/survey/use-survey-invitations"
import {
  createFreetextQuestionRatingCriterionSelectionMutation,
  deleteFreetextQuestionRatingCriterionSelectionMutation,
  updateFreetextQuestionRatingMutation
} from "../../../../../graphql/mutations"
import {
  checkLoginQuery,
  freeTextAnswerForParticipantQuery,
  freetextQuestionRatingForParticipantQuery,
  ratingsQuery,
  selectedAnswersForParticipantQuery,
  surveyUserAccountsQuery
} from "../../../../../graphql/queries"
import {Option, Subject} from "../../../../../utils"
import {Card, CardContent} from "../../../../card"
import {RatingDetailView, RatingOverviewTable} from "../../../common"
import {UseFreetextQuestionRatingsByRatingsListHook} from "../../../hooks"
import * as useFreetextQuestionRatingsByRatingsListHook from "../../../hooks/use-freetext-question-ratings-by-ratings-list"
import {getMaxScore, getMaxScoreOfAllQuestions, getScoreOfAllQuestions} from "../../../utils"
import {QuestionsAutomaticRatingTable, QuestionsManualRatingTable} from "../../detail"
import * as useRatingQuestionnaireDetailViewHook from "../hooks/use-rating-questionnaire-detail-view"
import {UseRatingQuestionnaireDetailViewHook} from "../hooks/use-rating-questionnaire-detail-view"
import {RatingQuestionnaireDetailView, RatingQuestionnaireDetailViewProps} from "../rating-questionnaire-detail-view"

const questionnaire = {
  ...questionnaireMock,
  questions: questionnaireMock.questions.map(question => ({
    ...question,
    scoringType:
      question.questionType === QuestionType.FreeText ? QuestionScoringType.Holistic : QuestionScoringType.Analytical
  }))
}
const selectedQuestion = questionnaire.questions[0]
const selectedFreeTextQuestion = questionnaire.questions[5]
const freetextQuestionRatings = freetextQuestionRatingsMock.map(rating => ({
  ...rating,
  questionId: selectedFreeTextQuestion.id
}))

const defaultProps: RatingQuestionnaireDetailViewProps = {
  navigateToNextParticipant: jest.fn(),
  navigateToPreviousParticipant: jest.fn(),
  participantIndex: 0,
  participantName: "Laurence Moulder",
  participantsCount: 12,
  navigateToNextQuestion: jest.fn(),
  navigateToPreviousQuestion: jest.fn(),
  surveyInvitationId: surveyInvitationIdMock,
  questionnaire: questionnaire,
  selectedQuestionId: selectedQuestion.id,
  navigateToQuestion: jest.fn(),
  ratingId: Option.of(ratingsMock[0].id),
  mode: RaterMode.FinalRater,
  surveyId: surveyIdMock,
  participantFinishedModule: true,
  fetchFreetextQuestionRatingsSubject: new Subject<void>(),
  isReadonly: false,
  isNotRatable: false
}

const stateHookValuesDefault: UseRatingQuestionnaireDetailViewHook = {
  questions: questionnaire.questions,
  selectedQuestion: Option.of(selectedQuestion),
  label: selectedQuestion.text,
  description: selectedQuestion.text,
  isOverviewPage: false,
  requiresScoring: false,
  score: selectedQuestion.score,
  maxScore: getMaxScore(questionnaire.questions, selectedQuestion),
  averageScore: selectedQuestion.score,
  backgroundIcon: Option.of<IconName>(IconName.Gear),
  selectedRatingAction: RatingActionOption.None,
  setSelectedRatingAction: jest.fn(),
  refetchFreetextQuestionRatings: jest.fn(),
  getScoreByQuestion: jest.fn(),
  isRatingInProgress: true,
  criterionSelections: [freetextQuestionRatingCriterionSelectionMock],
  freetextQuestionRatingsForParticipant: freetextQuestionRatingsMock,
  getAverageScoreByQuestion: jest.fn(),
  dataLoading: false
}
const stateSpy = jest.spyOn(useRatingQuestionnaireDetailViewHook, "useRatingQuestionnaireDetailView")

const freetextQuestionRatingsByRatingsListHookValuesDefault: UseFreetextQuestionRatingsByRatingsListHook = {
  freetextQuestionRatings: freetextQuestionRatingsMock,
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
}

const freetextQuestionRatingsByRatingsListSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
)

const createFreetextQuestionRatingHookValuesDefault: UseCreateFreetextQuestionRatingHook = {
  createFreetextQuestionRatingLoading: false,
  createFreetextQuestionRating: jest.fn(() => Promise.resolve(Option.of(freetextQuestionRatingsMock[0])))
}
const createFreetextQuestionRatingSpy = jest.spyOn(
  useCreateFreetextQuestionRatingHook,
  "useCreateFreetextQuestionRating"
)

const surveyInvitationsHookValuesDefault: UseSurveyInvitationsHook = {
  surveyInvitationsLoading: false,
  surveyInvitations: surveyInvitationsMock
}
const surveyInvitationsSpy = jest.spyOn(useSurveyInvitationsHook, "useSurveyInvitations")

const getComponent = (props?: Partial<RatingQuestionnaireDetailViewProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: selectedAnswersForParticipantQuery,
          variables: {questionId: selectedQuestion.id, surveyInvitationId: surveyInvitationIdMock}
        },
        result: {
          data: {
            selectedAnswersForParticipant: selectedQuestion.answers.map(({id}) => id)
          }
        }
      },
      {
        request: {
          query: freeTextAnswerForParticipantQuery,
          variables: {questionId: selectedFreeTextQuestion.id, surveyInvitationId: surveyInvitationIdMock}
        },
        result: {
          data: {
            freeTextAnswerForParticipant: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."
          }
        }
      },
      {
        request: {
          query: freetextQuestionRatingForParticipantQuery,
          variables: {questionId: selectedFreeTextQuestion.id, surveyInvitationId: surveyInvitationIdMock}
        },
        result: {
          data: {
            freetextQuestionRatingForParticipant: freetextQuestionRatings
          }
        }
      },
      {
        request: {
          query: updateFreetextQuestionRatingMutation,
          variables: {
            id: freetextQuestionRatings[0].id,
            update: {noCriterionFulfilled: !freetextQuestionRatings[0].noCriterionFulfilled}
          }
        },
        result: {
          data: {
            updateFreetextQuestionRating: {
              ...freetextQuestionRatings[0],
              noCriterionFulfilled: !freetextQuestionRatings[0].noCriterionFulfilled
            }
          }
        }
      },
      {
        request: {
          query: createFreetextQuestionRatingCriterionSelectionMutation,
          variables: {
            creation: {
              freetextQuestionRatingId: freetextQuestionRatings[0].id,
              criterionId: freetextQuestionRatings[0].criterionSelections[0].criterionId
            }
          }
        },
        result: {
          data: {
            createFreetextQuestionRatingCriterionSelection: freetextQuestionRatings[0].criterionSelections[0]
          }
        }
      },
      {
        request: {
          query: deleteFreetextQuestionRatingCriterionSelectionMutation,
          variables: {
            freetextQuestionRatingId: freetextQuestionRatings[0].id,
            criterionId: freetextQuestionRatings[0].criterionSelections[0].criterionId
          }
        },
        result: {
          data: {
            deleteFreetextQuestionRatingCriterionSelection: freetextQuestionRatings[0].criterionSelections[0]
          }
        }
      },
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
    ]}
    addTypename={true}>
    <RatingQuestionnaireDetailView {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("rating-questionnaire-detail-view", () => {
  it.skip("renders correctly (selected question, requiresScoring=false)", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
    createFreetextQuestionRatingSpy.mockReturnValue(createFreetextQuestionRatingHookValuesDefault)
    surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it.skip("renders correctly (selected question, requiresScoring=true)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      selectedQuestion: Option.of(selectedFreeTextQuestion),
      label: selectedFreeTextQuestion.text,
      description: selectedFreeTextQuestion.text,
      requiresScoring: true,
      score: selectedFreeTextQuestion.score,
      maxScore: getMaxScore(questionnaire.questions, selectedFreeTextQuestion),
      backgroundIcon: Option.of<IconName>(IconName.MouseLined)
    })
    freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
    createFreetextQuestionRatingSpy.mockReturnValue(createFreetextQuestionRatingHookValuesDefault)
    surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
    const component = create(getComponent({selectedQuestionId: selectedFreeTextQuestion.id}))
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it.skip("renders correctly (no selected question)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      selectedQuestion: Option.none(),
      label: questionnaire.title,
      description: questionnaire.description,
      isOverviewPage: true,
      requiresScoring: false,
      score: getScoreOfAllQuestions(questionnaire.questions),
      maxScore: getMaxScoreOfAllQuestions(questionnaire.questions),
      backgroundIcon: Option.none()
    })
    freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
    createFreetextQuestionRatingSpy.mockReturnValue(createFreetextQuestionRatingHookValuesDefault)
    surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
    const component = create(getComponent({selectedQuestionId: undefined}))
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (selected question, requiresScoring=false)", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
    createFreetextQuestionRatingSpy.mockReturnValue(createFreetextQuestionRatingHookValuesDefault)
    surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
    const tree = shallow(getComponent())

    await act(() => wait(0))

    const ratingDetailView = tree.childAt(0).dive().find(RatingDetailView)
    expect(ratingDetailView).toHaveLength(1)

    const card = ratingDetailView.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const ratingContent = cardContent.dive().find(".rating-content")
    expect(ratingContent).toHaveLength(1)

    expect(ratingContent.find(RatingOverviewTable)).toHaveLength(0)
    expect(ratingContent.find(QuestionsManualRatingTable)).toHaveLength(0)
    expect(ratingContent.find(QuestionsAutomaticRatingTable)).toHaveLength(1)
  })
  it("has correct structure (selected question, requiresScoring=true)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      selectedQuestion: Option.of(selectedFreeTextQuestion),
      label: questionnaire.title,
      description: selectedFreeTextQuestion.text,
      requiresScoring: true,
      score: selectedFreeTextQuestion.score,
      maxScore: getMaxScore(questionnaire.questions, selectedFreeTextQuestion),
      backgroundIcon: Option.of<IconName>(IconName.MouseLined)
    })
    freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
    createFreetextQuestionRatingSpy.mockReturnValue(createFreetextQuestionRatingHookValuesDefault)
    surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
    const tree = shallow(getComponent({selectedQuestionId: selectedFreeTextQuestion.id}))

    await act(() => wait(0))

    const ratingDetailView = tree.childAt(0).dive().find(RatingDetailView)
    expect(ratingDetailView).toHaveLength(1)

    const card = ratingDetailView.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const ratingContent = cardContent.dive().find(".rating-content")
    expect(ratingContent).toHaveLength(1)

    expect(ratingContent.find(RatingOverviewTable)).toHaveLength(0)
    expect(ratingContent.find(QuestionsManualRatingTable)).toHaveLength(1)
    expect(ratingContent.find(QuestionsAutomaticRatingTable)).toHaveLength(0)
  })
  it("has correct structure (no selected question)", async () => {
    stateSpy.mockReturnValue({
      ...stateHookValuesDefault,
      selectedQuestion: Option.none(),
      label: questionnaire.title,
      description: questionnaire.description,
      isOverviewPage: true,
      requiresScoring: false,
      score: getScoreOfAllQuestions(questionnaire.questions),
      maxScore: getMaxScoreOfAllQuestions(questionnaire.questions),
      backgroundIcon: Option.none()
    })
    freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
    createFreetextQuestionRatingSpy.mockReturnValue(createFreetextQuestionRatingHookValuesDefault)
    surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
    const tree = shallow(getComponent({selectedQuestionId: undefined}))

    await act(() => wait(0))

    const ratingDetailView = tree.childAt(0).dive().find(RatingDetailView)
    expect(ratingDetailView).toHaveLength(1)

    const card = ratingDetailView.dive().find(Card)
    expect(card).toHaveLength(1)

    const cardContent = card.dive().find(CardContent)
    expect(cardContent).toHaveLength(1)

    const ratingContent = cardContent.dive().find(".rating-content")
    expect(ratingContent).toHaveLength(1)

    expect(ratingContent.find(RatingOverviewTable)).toHaveLength(1)
    expect(ratingContent.find(QuestionsManualRatingTable)).toHaveLength(0)
    expect(ratingContent.find(QuestionsAutomaticRatingTable)).toHaveLength(0)
  })
})
