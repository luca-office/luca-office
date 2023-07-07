import {act} from "@testing-library/react-hooks"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import wait from "waait"
import {surveyIdMock, surveyInvitationIdMock} from "../../../../../../graphql/__mocks__"
import {questionnaireQuestionMockWithAnswers} from "../../../../../../graphql/__mocks__/questionnaire-questions.mock"
import {Checkbox} from "../../../../../checkbox/checkbox"
import {Icon} from "../../../../../icon/icon"
import {Table} from "../../../../../table/table"
import {Heading, Text} from "../../../../../typography/typography"
import * as useQuestionsAutomaticRatingTable from "../hooks/use-questions-automatic-rating-table"
import {UseQuestionsAutomaticRatingTableHook} from "../hooks/use-questions-automatic-rating-table"
import {QuestionsAutomaticRatingTable, QuestionsAutomaticRatingTableProps} from "../questions-automatic-rating-table"

const questionnaireQuestion = questionnaireQuestionMockWithAnswers

const defaultProps: QuestionsAutomaticRatingTableProps = {
  surveyId: surveyIdMock,
  surveyInvitationId: surveyInvitationIdMock,
  question: questionnaireQuestion,
  answers: questionnaireQuestion.answers,
  participantsCount: 4
}

const stateHookValuesDefault: UseQuestionsAutomaticRatingTableHook = {
  dataLoading: false,
  isSelected: jest.fn(),
  ratersCount: 12,
  getRatingsCount: jest.fn(() => 8)
}

const stateSpy = jest.spyOn(useQuestionsAutomaticRatingTable, "useQuestionsAutomaticRatingTable")

const getComponent = (props?: Partial<QuestionsAutomaticRatingTableProps>) => (
  <QuestionsAutomaticRatingTable {...{...defaultProps, ...props}} />
)

describe("questions-automatic-rating-table", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no answers)", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent({answers: []}))
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const tree = shallow(getComponent())

    await act(() => wait(0))

    expect(tree.find(Heading)).toHaveLength(1)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()
    expect(tableContent.find(".table-placeholder")).toHaveLength(0)
    expect(tableContent.find(".entity-row")).toHaveLength(3)
    expect(tableContent.find(Text)).toHaveLength(5)
    expect(tableContent.find(Icon)).toHaveLength(4)
    expect(tableContent.find(Checkbox)).toHaveLength(3)
  })
  it("has correct structure (no answers)", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const tree = shallow(getComponent({answers: []}))

    await act(() => wait(0))

    expect(tree.find(Heading)).toHaveLength(1)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()
    expect(tableContent.find(".table-placeholder")).toHaveLength(1)
    expect(tableContent.find(".entity-row")).toHaveLength(0)
    expect(tableContent.find(Text)).toHaveLength(2)
    expect(tableContent.find(Icon)).toHaveLength(1)
    expect(tableContent.find(Checkbox)).toHaveLength(0)
  })
})
