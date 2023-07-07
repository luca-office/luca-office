import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../../../enums"
import {questionnaireQuestionsMock} from "../../../../../graphql/__mocks__/questionnaire-questions.mock"
import {QuestionScoringType, QuestionType} from "../../../../../graphql/generated/globalTypes"
import {useLucaTranslation} from "../../../../../translations"
import {Icon} from "../../../../icon/icon"
import {getQuestionTypeIconName} from "../../../../questionnaire"
import {Table} from "../../../../table/table"
import {Heading, Text} from "../../../../typography/typography"
import {TableEntity} from "../../../models"
import {getMaxScore} from "../../../utils"
import {RatingOverviewTable, RatingOverviewTableProps} from "../rating-overview-table"

const {t} = useLucaTranslation()
const defaultProps: RatingOverviewTableProps<TableEntity> = {
  entities: questionnaireQuestionsMock.map(question => ({
    ...question,
    scoringType: QuestionScoringType.Analytical,
    maxScore: getMaxScore(questionnaireQuestionsMock, question),
    rated: question.questionType !== QuestionType.FreeText,
    iconName: getQuestionTypeIconName(question.questionType),
    title: question.text,
    averageScore: 6
  })),
  scoringName: t("rating_questionnaire_question__question_scoring_label"),
  entityName: t("questions"),
  enumerate: true,
  title: t("question"),
  iconName: IconName.QuestionnaireCascade,
  onClick: jest.fn(),
  isReadonly: false,
  isNotRatable: false
}

const getComponent = (props?: Partial<RatingOverviewTableProps<TableEntity>>) => (
  <RatingOverviewTable<TableEntity> {...{...defaultProps, ...props}} />
)

describe("questions-table", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no questions)", () => {
    const component = getComponent({entities: []})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Heading)).toHaveLength(1)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()
    expect(tableContent.find(".table-placeholder")).toHaveLength(0)
    expect(tableContent.find(".entity-row")).toHaveLength(5)
    expect(tableContent.find(Icon)).toHaveLength(11)
    expect(tableContent.find(Text)).toHaveLength(12)
  })
  it("has correct structure (no questions)", () => {
    const component = getComponent({entities: []})
    const tree = shallow(component)

    expect(tree.find(Heading)).toHaveLength(1)

    const table = tree.find(Table)
    expect(table).toHaveLength(1)

    const tableContent = table.dive()
    expect(tableContent.find(".table-placeholder")).toHaveLength(1)
    expect(tableContent.find(".entity-row")).toHaveLength(0)
    expect(tableContent.find(Icon)).toHaveLength(1)
    expect(tableContent.find(Text)).toHaveLength(2)
  })
})
