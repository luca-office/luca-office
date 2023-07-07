import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {RaterMode} from "../../../../../../enums"
import {questionnaireMock, surveyIdMock, surveyInvitationIdMock} from "../../../../../../graphql/__mocks__"
import {Option, Subject} from "../../../../../../utils"
import {Icon} from "../../../../../icon/icon"
import {TableOfContentsContainer, TableOfContentsEntry} from "../../../../../table-of-content"
import {Text} from "../../../../../typography/typography"
import * as useRatingQuestionnaireTableOfContentsHook from "../hooks/use-rating-questionnaire-table-of-contents"
import {UseRatingQuestionnaireTableOfContentsHook} from "../hooks/use-rating-questionnaire-table-of-contents"
import {
  RatingQuestionnaireTableOfContents,
  RatingQuestionnaireTableOfContentsProps
} from "../rating-questionnaire-table-of-contents"

const defaultProps: RatingQuestionnaireTableOfContentsProps = {
  surveyId: surveyIdMock,
  surveyInvitationId: surveyInvitationIdMock,
  questionnaire: Option.of(questionnaireMock),
  selectEntityId: jest.fn(),
  selectedEntityId: Option.none(),
  fetchFreetextQuestionRatingsSubject: new Subject<void>(),
  isReadonly: false,
  isNotRatable: false,
  mode: RaterMode.FinalRater
}

const stateHookValuesDefault: UseRatingQuestionnaireTableOfContentsHook = {
  allRated: false,
  score: 8,
  maxScore: 12,
  isRated: jest.fn(),
  dataLoading: false,
  getScores: jest.fn(() => ({maxScore: 6, averageScore: 3})),
  getScoresOfAllQuestions: jest.fn(() => ({maxScore: 6, averageScore: 3}))
}

const stateSpy = jest.spyOn(useRatingQuestionnaireTableOfContentsHook, "useRatingQuestionnaireTableOfContents")

const getComponent = (props?: Partial<RatingQuestionnaireTableOfContentsProps>) => (
  <RatingQuestionnaireTableOfContents {...{...defaultProps, ...props}} />
)

describe("rating-coding-table-of-contents", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure with data", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const tree = shallow(getComponent())

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    const tableEntry = tree.find(TableOfContentsEntry)
    expect(tableEntry).toHaveLength(1)

    expect(tableEntry.first().dive().find(Text)).toHaveLength(2)
    expect(tableEntry.first().dive().find(Icon)).toHaveLength(1)
  })

  it("has correct structure without data", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const tree = shallow(getComponent({questionnaire: Option.none()}))

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    const tableEntry = tree.find(TableOfContentsEntry)
    expect(tableEntry).toHaveLength(0)
  })
})
