import {MockedProvider} from "@apollo/client/testing"
import * as React from "react"
import {create, act} from "react-test-renderer"
import wait from "waait"
import {RaterMode} from "../../../../../../enums"
import {
  checkLoginMock,
  freetextQuestionRatingsMock,
  ratingsMock,
  surveyIdMock,
  surveyInvitationIdMock,
  userAccountsMock
} from "../../../../../../graphql/__mocks__"
import {questionnaireQuestionsMock} from "../../../../../../graphql/__mocks__/questionnaire-questions.mock"
import {QuestionScoringType} from "../../../../../../graphql/generated/globalTypes"
import {checkLoginQuery, ratingsQuery, surveyUserAccountsQuery} from "../../../../../../graphql/queries"
import {Option} from "../../../../../../utils"
import * as useFreetextQuestionRatingsByRatingsListHook from "../../../../../rating/hooks/use-freetext-question-ratings-by-ratings-list"
import {CriterionRatingTable} from "../../../../common"
import {UseFreetextQuestionRatingsByRatingsListHook} from "../../../../hooks"
import * as useQuestionsManualRatingTable from "../hooks/use-questions-manual-rating-table"
import {UseQuestionsManualRatingTableHook} from "../hooks/use-questions-manual-rating-table"
import {QuestionsManualRatingTable, QuestionsManualRatingTableProps} from "../questions-manual-rating-table"
import {waitFor} from "@testing-library/react"
import {shallow} from "enzyme"

const questionnaireQuestion = {...questionnaireQuestionsMock[0], scoringType: QuestionScoringType.Holistic}

const defaultProps: QuestionsManualRatingTableProps = {
  surveyInvitationId: surveyInvitationIdMock,
  question: questionnaireQuestion,
  ratingId: Option.of(ratingsMock[0].id),
  performAction: jest.fn(),
  mode: RaterMode.FinalRater,
  surveyId: surveyIdMock,
  participantFinishedModule: true,
  isReadonly: false
}

const stateHookValuesDefault: UseQuestionsManualRatingTableHook = {
  dataLoading: false,
  actionLoading: false,
  freeTextAnswer: Option.of("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."),
  noCriterionFulfilled: false,
  isSelected: jest.fn(),
  updateCriterionSelection: jest.fn(),
  setNoCriterionFulfilled: jest.fn(),
  hasRatingChanged: false,
  applyRatingChanges: jest.fn(),
  refreshData: jest.fn(),
  isNothingSelected: false
}

const stateSpy = jest.spyOn(useQuestionsManualRatingTable, "useQuestionsManualRatingTable")

const freetextQuestionRatingsByRatingsListHookValuesDefault: UseFreetextQuestionRatingsByRatingsListHook = {
  freetextQuestionRatings: freetextQuestionRatingsMock,
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
}

const freetextQuestionRatingsByRatingsListSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
)

const getComponent = (props?: Partial<QuestionsManualRatingTableProps>) => (
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
    <QuestionsManualRatingTable {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("questions-manual-rating-table", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
    const tree = shallow(getComponent()).childAt(0).dive()
    await act(() => wait(0))
    expect(tree.find(CriterionRatingTable)).toHaveLength(1)
  })
})
