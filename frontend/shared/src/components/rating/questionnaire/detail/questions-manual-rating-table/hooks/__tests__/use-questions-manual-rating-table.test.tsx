import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {act} from "react-test-renderer"
import wait from "waait"
import {RaterMode} from "../../../../../../../enums"
import {
  freetextQuestionRatingsMock,
  ratingsMock,
  surveyIdMock,
  surveyInvitationIdMock,
  surveyInvitationsMock
} from "../../../../../../../graphql/__mocks__"
import {questionnaireQuestionsMock} from "../../../../../../../graphql/__mocks__/questionnaire-questions.mock"
import {QuestionScoringType} from "../../../../../../../graphql/generated/globalTypes"
import {SurveyInvitationsProps as UseSurveyInvitationsHook} from "../../../../../../../graphql/hooks"
import * as useSurveyInvitationsHook from "../../../../../../../graphql/hooks/queries/survey/use-survey-invitations"
import {
  createFreetextQuestionRatingCriterionSelectionMutation,
  createFreetextQuestionRatingMutation,
  deleteFreetextQuestionRatingCriterionSelectionMutation,
  updateFreetextQuestionRatingMutation
} from "../../../../../../../graphql/mutations"
import {freetextQuestionRatingForParticipantQuery} from "../../../../../../../graphql/queries"
import {Children} from "../../../../../../../styles"
import {Option} from "../../../../../../../utils"
import * as useFreeTextAnswersForParticipantsHook from "../../../../../../rating/hooks/use-free-text-answers-for-participants"
import * as useFreetextQuestionRatingsByRatingsListHook from "../../../../../../rating/hooks/use-freetext-question-ratings-by-ratings-list"
import * as useRatingsHook from "../../../../../../rating/hooks/use-ratings"
import {
  FreeTextAnswersForParticipantsMap,
  UseFreeTextAnswersForParticipantsHook,
  UseFreetextQuestionRatingsByRatingsListHook,
  UseRatingsHook
} from "../../../../../hooks"
import {useQuestionsManualRatingTable} from "../use-questions-manual-rating-table"

const surveyInvitationId = surveyInvitationIdMock
const questionnaireQuestion = {...questionnaireQuestionsMock[0], scoringType: QuestionScoringType.Holistic}
const freetextQuestionRatings = freetextQuestionRatingsMock.map(rating => ({
  ...rating,
  questionId: questionnaireQuestion.id
}))
const rating = ratingsMock[0]
const freeTextAnswersForParticipants = surveyInvitationsMock.reduce(
  (accumulator, surveyInvitation, index) => ({
    ...accumulator,
    [index === 0 ? surveyInvitationId : surveyInvitation.id]: Option.of(surveyInvitation.email)
  }),
  {} as FreeTextAnswersForParticipantsMap
)

const freetextQuestionHookValuesDefault: UseFreetextQuestionRatingsByRatingsListHook = {
  freetextQuestionRatings: freetextQuestionRatingsMock,
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
}
const freetextQuestionStateSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
)

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock,
  allRatings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const surveyInvitationsHookValuesDefault: UseSurveyInvitationsHook = {
  surveyInvitationsLoading: false,
  surveyInvitations: surveyInvitationsMock
}
const surveyInvitationsSpy = jest.spyOn(useSurveyInvitationsHook, "useSurveyInvitations")

const freeTextAnswersForParticipantsHookValuesDefault: UseFreeTextAnswersForParticipantsHook = {
  freeTextAnswersForParticipantsLoading: false,
  freeTextAnswersForParticipants: freeTextAnswersForParticipants,
  getFreeTextAnswersForParticipants: jest.fn(() => Promise.resolve(freeTextAnswersForParticipants))
}
const freeTextAnswersForParticipantsSpy = jest.spyOn(
  useFreeTextAnswersForParticipantsHook,
  "useFreeTextAnswersForParticipants"
)

const getConnectedHook = () =>
  renderHook(
    () =>
      useQuestionsManualRatingTable({
        surveyInvitationId,
        question: questionnaireQuestion,
        ratingId: Option.of(rating.id),
        surveyId: surveyIdMock,
        mode: RaterMode.FinalRater,
        showDataForAllParticipants: false
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider
          mocks={[
            {
              request: {
                query: freetextQuestionRatingForParticipantQuery,
                variables: {questionId: questionnaireQuestion.id, surveyInvitationId}
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
                    ratingId: freetextQuestionRatings[0].id,
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
                  ratingId: freetextQuestionRatings[0].id,
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
                query: createFreetextQuestionRatingMutation,
                variables: {
                  creation: {
                    ratingId: rating.id,
                    questionId: questionnaireQuestion.id,
                    surveyInvitationId,
                    noCriterionFulfilled: false
                  }
                }
              },
              result: {
                data: {
                  createFreetextQuestionRating: rating
                }
              }
            }
          ]}
          addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      )
    }
  )

describe("use-questions-manual-rating-table", () => {
  describe("dataLoading", () => {
    it("should be defined", async () => {
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      freeTextAnswersForParticipantsSpy.mockReturnValue(freeTextAnswersForParticipantsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("actionLoading", () => {
    it("should be defined", async () => {
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      freeTextAnswersForParticipantsSpy.mockReturnValue(freeTextAnswersForParticipantsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("freeTextAnswer", () => {
    it("should be defined", async () => {
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      freeTextAnswersForParticipantsSpy.mockReturnValue(freeTextAnswersForParticipantsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.freeTextAnswer).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("noCriterionFulfilled", () => {
    it("should be defined", async () => {
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      freeTextAnswersForParticipantsSpy.mockReturnValue(freeTextAnswersForParticipantsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.noCriterionFulfilled).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isSelected", () => {
    it("should be defined", async () => {
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      freeTextAnswersForParticipantsSpy.mockReturnValue(freeTextAnswersForParticipantsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isSelected).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("hasRatingChanged", () => {
    it("should be defined", async () => {
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      freeTextAnswersForParticipantsSpy.mockReturnValue(freeTextAnswersForParticipantsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.hasRatingChanged).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("refreshData", () => {
    it("should be a function", async () => {
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      freeTextAnswersForParticipantsSpy.mockReturnValue(freeTextAnswersForParticipantsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.refreshData).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
