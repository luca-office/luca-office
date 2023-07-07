import {shallow} from "enzyme"
import * as React from "react"
import {
  Button,
  Checkbox,
  getQuestionTypeIconName,
  Icon,
  OrlyButtonContainer,
  RadioButton,
  Text
} from "shared/components"
import {IconName} from "shared/enums"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {Children, fontColor, fontColorLight, successColor} from "shared/styles"
import {fakeTranslateWithOptions} from "sharedTests/utils/translate-mock"
import {EditableMultilineTextarea, InlineEditableHeaderContainer, InlineEditableTextarea} from "../../../../components"
import {AnswerColumnsParams, getAnswerColumns} from "../answer-columns"
import {QuestionAnswerTableEntity} from "../question-columns"

const deleteSpy = jest.fn()
const createSpy = jest.fn()
const sortSpy = jest.fn()
const freeTextOptionSpy = jest.fn()
const updateAnswerSpy = jest.fn()
const answer: QuestionAnswerTableEntity = {...questionnaireQuestionsMock[1].answers[0], isFreeTextAnswer: false}
const answerFreeText: QuestionAnswerTableEntity = {...questionnaireQuestionsMock[1].answers[0], isFreeTextAnswer: true}
const codingCriterion: QuestionAnswerTableEntity = {
  ...questionnaireQuestionsMock[0].freetextQuestionCodingCriteria[0],
  isFreeTextAnswer: false,
  text: questionnaireQuestionsMock[0].freetextQuestionCodingCriteria[0].description
}

const defaultParams: AnswerColumnsParams = {
  hasCorrectAnswers: false,
  hideActionButtons: false,
  isAdditionalTextAnswerEnabled: true,
  isEditable: true,
  isDeletable: true,
  onDelete: deleteSpy,
  openCreation: createSpy,
  openSortOverlay: sortSpy,
  questionType: QuestionType.SingleChoice,
  scoringType: QuestionScoringType.Holistic,
  showQuestionScoring: true,
  readonly: false,
  t: fakeTranslateWithOptions,
  toggleFreeTextAnswer: freeTextOptionSpy,
  updateAnswer: updateAnswerSpy
}

const TestContent: React.FC<Children> = ({children}) => <TestContent>{children}</TestContent>

describe("answer-columns", () => {
  describe("single choice", () => {
    it("can getAnswerColumns: action buttons hidden", () => {
      const columns = getAnswerColumns({...defaultParams, hideActionButtons: true})

      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(IconName.Check)
      expect(header.find(Icon).prop("color")).toEqual(fontColorLight)

      expect(columns.length).toEqual(2)
    })
    it("can getAnswerColumns: header checked", () => {
      const columns = getAnswerColumns({...defaultParams, hideActionButtons: true, hasCorrectAnswers: true})

      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(IconName.Check)
      expect(header.find(Icon).prop("color")).toEqual(successColor)
    })
    it("can getAnswerColumns: scoring hidden", () => {
      const columns = getAnswerColumns({...defaultParams, showQuestionScoring: false})

      expect(columns.length).toEqual(5)
      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(getQuestionTypeIconName(QuestionType.SingleChoice))
      expect(header.find(Icon).prop("color")).toEqual(fontColor)
      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(1)
      expect(content.find(RadioButton).prop("disabled")).toEqual(true)
      expect(content.find(Checkbox)).toHaveLength(0)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
    })
    it("can getAnswerColumns: !isEditable && !isDeletable", () => {
      const columns = getAnswerColumns({...defaultParams, isEditable: false, isDeletable: false})

      expect(columns.length).toEqual(5)
      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(1)
      expect(content.find(RadioButton).prop("disabled")).toBe(true)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(answer.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)
      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(true)
      // add button / delete
      const header4 = shallow(<TestContent>{columns[4].header}</TestContent>)
      expect(header4.find(Button).prop("disabled")).toBe(true)
      const content4 = shallow(<TestContent>{columns[4].content(answer)}</TestContent>)
      expect(content4.find(OrlyButtonContainer).prop("disabled")).toBe(true)
    })
    it("can getAnswerColumns: readonly", () => {
      const columns = getAnswerColumns({...defaultParams, readonly: true})

      expect(columns.length).toEqual(5)
      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(1)
      expect(content.find(RadioButton).prop("disabled")).toBe(false)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(answer.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(true)
      expect(content1.find(Icon)).toHaveLength(0)
      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      // add button / delete
      const header4 = shallow(<TestContent>{columns[4].header}</TestContent>)
      expect(header4.find(Button).prop("disabled")).toBe(false)
      const content4 = shallow(<TestContent>{columns[4].content(answer)}</TestContent>)
      expect(content4.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })
    it("can getAnswerColumns: no scoring", () => {
      const columns = getAnswerColumns({...defaultParams, scoringType: QuestionScoringType.None})

      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(1)
      expect(content.find(RadioButton).prop("disabled")).toBe(false)
      const contentFreeText = shallow(<TestContent>{columns[0].content(answerFreeText)}</TestContent>)
      expect(contentFreeText.find(RadioButton)).toHaveLength(1)
      expect(contentFreeText.find(RadioButton).prop("disabled")).toBe(true)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(answer.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)
      const contentFreetext = shallow(<TestContent>{columns[1].content(answerFreeText)}</TestContent>)
      expect(contentFreetext.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(contentFreetext.find(EditableMultilineTextarea).prop("placeholder")).toContain(
        "questionnaire_question__answer_freetext"
      )
      expect(contentFreetext.find(EditableMultilineTextarea).prop("disabled")).toBe(true)
      expect(contentFreetext.find(Icon)).toHaveLength(1)

      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      // add button / delete
      const header4 = shallow(<TestContent>{columns[4].header}</TestContent>)
      expect(header4.find(Button).prop("disabled")).toBe(false)
      const content4 = shallow(<TestContent>{columns[4].content(answer)}</TestContent>)
      expect(content4.find(OrlyButtonContainer).prop("disabled")).toBe(false)
      const content4Freetext = shallow(<TestContent>{columns[4].content(answerFreeText)}</TestContent>)
      expect(content4Freetext.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })
    it("can getAnswerColumns: holistic scoring", () => {
      const columns = getAnswerColumns({...defaultParams, scoringType: QuestionScoringType.Holistic})

      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(IconName.Check)
      expect(header.find(Icon).prop("color")).toEqual(fontColorLight)
      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(1)
      expect(content.find(RadioButton).prop("disabled")).toBe(false)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(answer.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)
      const contentFreetext = shallow(<TestContent>{columns[1].content(answerFreeText)}</TestContent>)
      expect(contentFreetext.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(contentFreetext.find(EditableMultilineTextarea).prop("placeholder")).toContain(
        "questionnaire_question__answer_freetext"
      )
      expect(contentFreetext.find(EditableMultilineTextarea).prop("disabled")).toBe(true)
      expect(contentFreetext.find(Icon)).toHaveLength(1)

      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      // add button / delete
      const header4 = shallow(<TestContent>{columns[4].header}</TestContent>)
      expect(header4.find(Button).prop("disabled")).toBe(false)
      const content4 = shallow(<TestContent>{columns[4].content(answer)}</TestContent>)
      expect(content4.find(OrlyButtonContainer).prop("disabled")).toBe(false)
      const content4Freetext = shallow(<TestContent>{columns[4].content(answerFreeText)}</TestContent>)
      expect(content4Freetext.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })
  })

  describe("multiple choice", () => {
    it("can getAnswerColumns: action buttons hidden", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.MultipleChoice,
        hideActionButtons: true,
        scoringType: QuestionScoringType.Analytical
      })

      expect(columns.length).toEqual(2)
    })
    it("can getAnswerColumns: header checked", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.MultipleChoice,
        scoringType: QuestionScoringType.Analytical,
        hasCorrectAnswers: true
      })

      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(IconName.Check)
      expect(header.find(Icon).prop("color")).toEqual(successColor)
    })
    it("can getAnswerColumns: scoring hidden", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        showQuestionScoring: false,
        questionType: QuestionType.MultipleChoice,
        scoringType: QuestionScoringType.Analytical
      })

      expect(columns.length).toEqual(5)
      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(getQuestionTypeIconName(QuestionType.MultipleChoice))
      expect(header.find(Icon).prop("color")).toEqual(fontColor)
      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(0)
      expect(content.find(Checkbox)).toHaveLength(1)
      expect(content.find(Checkbox).prop("disabled")).toEqual(true)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
    })
    it("can getAnswerColumns: !isEditable && !isDeletable", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.MultipleChoice,
        isEditable: false,
        isDeletable: false,
        scoringType: QuestionScoringType.Analytical
      })

      expect(columns.length).toEqual(5)
      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(Checkbox)).toHaveLength(1)
      expect(content.find(Checkbox).prop("disabled")).toEqual(true)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(answer.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)
      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(true)
      // add button / delete
      const header4 = shallow(<TestContent>{columns[4].header}</TestContent>)
      expect(header4.find(Button).prop("disabled")).toBe(true)
      const content4 = shallow(<TestContent>{columns[4].content(answer)}</TestContent>)
      expect(content4.find(OrlyButtonContainer).prop("disabled")).toBe(true)
    })
    it("can getAnswerColumns: readonly", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.MultipleChoice,
        readonly: true,
        scoringType: QuestionScoringType.Analytical
      })

      expect(columns.length).toEqual(5)
      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(Checkbox)).toHaveLength(1)
      expect(content.find(Checkbox).prop("disabled")).toEqual(false)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(answer.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(true)
      expect(content1.find(Icon)).toHaveLength(0)
      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      // add button / delete
      const header4 = shallow(<TestContent>{columns[4].header}</TestContent>)
      expect(header4.find(Button).prop("disabled")).toBe(false)
      const content4 = shallow(<TestContent>{columns[4].content(answer)}</TestContent>)
      expect(content4.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })
    it("can getAnswerColumns: no scoring", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.MultipleChoice,
        scoringType: QuestionScoringType.None
      })

      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(Checkbox)).toHaveLength(1)
      expect(content.find(Checkbox).prop("disabled")).toBe(false)
      const contentFreeText = shallow(<TestContent>{columns[0].content(answerFreeText)}</TestContent>)
      expect(contentFreeText.find(Checkbox)).toHaveLength(1)
      expect(contentFreeText.find(Checkbox).prop("disabled")).toBe(true)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(answer.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)
      const contentFreetext = shallow(<TestContent>{columns[1].content(answerFreeText)}</TestContent>)
      expect(contentFreetext.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(contentFreetext.find(EditableMultilineTextarea).prop("placeholder")).toContain(
        "questionnaire_question__answer_freetext"
      )
      expect(contentFreetext.find(EditableMultilineTextarea).prop("disabled")).toBe(true)
      expect(contentFreetext.find(Icon)).toHaveLength(1)

      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      // add button / delete
      const header4 = shallow(<TestContent>{columns[4].header}</TestContent>)
      expect(header4.find(Button).prop("disabled")).toBe(false)
      const content4 = shallow(<TestContent>{columns[4].content(answer)}</TestContent>)
      expect(content4.find(OrlyButtonContainer).prop("disabled")).toBe(false)
      const content4Freetext = shallow(<TestContent>{columns[4].content(answerFreeText)}</TestContent>)
      expect(content4Freetext.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })

    it("can getAnswerColumns: analytic scoring", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.MultipleChoice,
        scoringType: QuestionScoringType.Analytical
      })

      const content = shallow(<TestContent>{columns[0].content(answer)}</TestContent>)
      expect(content.find(Checkbox)).toHaveLength(1)
      expect(content.find(Checkbox).prop("disabled")).toBe(false)

      const content1 = shallow(<TestContent>{columns[1].content(answer)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(answer.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)
      const contentFreetext = shallow(<TestContent>{columns[1].content(answerFreeText)}</TestContent>)
      expect(contentFreetext.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(contentFreetext.find(EditableMultilineTextarea).prop("placeholder")).toContain(
        "questionnaire_question__answer_freetext"
      )
      expect(contentFreetext.find(EditableMultilineTextarea).prop("disabled")).toBe(true)
      expect(contentFreetext.find(Icon)).toHaveLength(1)

      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      // add button / delete
      const header4 = shallow(<TestContent>{columns[4].header}</TestContent>)
      expect(header4.find(Button).prop("disabled")).toBe(false)
      const content4 = shallow(<TestContent>{columns[4].content(answer)}</TestContent>)
      expect(content4.find(OrlyButtonContainer).prop("disabled")).toBe(false)
      const content4Freetext = shallow(<TestContent>{columns[4].content(answerFreeText)}</TestContent>)
      expect(content4Freetext.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })
  })

  describe("freetext question", () => {
    it("can getAnswerColumns: action buttons hidden", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.FreeText,
        hideActionButtons: true,
        scoringType: QuestionScoringType.Analytical
      })

      expect(columns.length).toEqual(2)
      const content1 = shallow(<TestContent>{columns[1].content(codingCriterion)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
    })
    it("can getAnswerColumns: header not checked", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.FreeText,
        scoringType: QuestionScoringType.Holistic,
        hasCorrectAnswers: true
      })

      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(getQuestionTypeIconName(QuestionType.FreeText))
      expect(header.find(Icon).prop("color")).toEqual(fontColor)
    })
    it("can getAnswerColumns: scoring hidden analytical", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        showQuestionScoring: false,
        questionType: QuestionType.FreeText,
        scoringType: QuestionScoringType.Analytical
      })

      expect(columns.length).toEqual(4)
      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(getQuestionTypeIconName(QuestionType.FreeText))
      expect(header.find(Icon).prop("color")).toEqual(fontColor)
      const content = shallow(<TestContent>{columns[0].content(codingCriterion)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(0)
      expect(content.find(Checkbox)).toHaveLength(0)

      const content1 = shallow(<TestContent>{columns[1].content(codingCriterion)}</TestContent>)
      expect(content1.find(InlineEditableTextarea)).toHaveLength(1)
    })
    it("can getAnswerColumns: scoring hidden holistic", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        showQuestionScoring: false,
        questionType: QuestionType.FreeText,
        scoringType: QuestionScoringType.Holistic
      })

      expect(columns.length).toEqual(4)
      const header = shallow(<TestContent>{columns[0].header}</TestContent>)
      expect(header.find(Icon).prop("name")).toEqual(getQuestionTypeIconName(QuestionType.FreeText))
      expect(header.find(Icon).prop("color")).toEqual(fontColor)
      const content = shallow(<TestContent>{columns[0].content(codingCriterion)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(1)
      expect(content.find(RadioButton).prop("disabled")).toBe(true)
      expect(content.find(Checkbox)).toHaveLength(0)

      const content1 = shallow(<TestContent>{columns[1].content(codingCriterion)}</TestContent>)
      expect(content1.find(InlineEditableTextarea)).toHaveLength(1)
    })

    it("can getAnswerColumns: !isEditable && !isDeletable", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.FreeText,
        isEditable: false,
        isDeletable: false,
        scoringType: QuestionScoringType.Analytical
      })

      expect(columns.length).toEqual(4)
      const content = shallow(<TestContent>{columns[0].content(codingCriterion)}</TestContent>)
      expect(content.find(Checkbox)).toHaveLength(1)
      expect(content.find(Checkbox).prop("disabled")).toEqual(true)

      const content1 = shallow(<TestContent>{columns[1].content(codingCriterion)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(codingCriterion.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)
      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button)).toHaveLength(0)
      const content2 = shallow(<TestContent>{columns[2].content(codingCriterion)}</TestContent>)
      expect(content2.find(InlineEditableHeaderContainer)).toHaveLength(1)
      expect(content2.find(InlineEditableHeaderContainer).html()).toContain(`${codingCriterion.score}`)
      expect(content2.find(InlineEditableHeaderContainer).prop("disabled")).toBe(true)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(true)
      const content3 = shallow(<TestContent>{columns[3].content(codingCriterion)}</TestContent>)
      expect(content3.find(OrlyButtonContainer).prop("disabled")).toBe(true)
    })
    it("can getAnswerColumns: readonly", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.FreeText,
        readonly: true,
        scoringType: QuestionScoringType.Analytical
      })

      expect(columns.length).toEqual(4)
      const content = shallow(<TestContent>{columns[0].content(codingCriterion)}</TestContent>)
      expect(content.find(Checkbox)).toHaveLength(1)
      expect(content.find(Checkbox).prop("disabled")).toEqual(true)

      const content1 = shallow(<TestContent>{columns[1].content(codingCriterion)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(codingCriterion.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(true)
      expect(content1.find(Icon)).toHaveLength(0)
      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button)).toHaveLength(0)
      const content2 = shallow(<TestContent>{columns[2].content(codingCriterion)}</TestContent>)
      expect(content2.find(InlineEditableHeaderContainer)).toHaveLength(1)
      expect(content2.find(InlineEditableHeaderContainer).html()).toContain(`${codingCriterion.score}`)
      expect(content2.find(InlineEditableHeaderContainer).prop("disabled")).toBe(false)
      // sort button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      const content3 = shallow(<TestContent>{columns[3].content(codingCriterion)}</TestContent>)
      expect(content3.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })

    it("can getAnswerColumns: analytic scoring", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.FreeText,
        scoringType: QuestionScoringType.Analytical
      })

      const content = shallow(<TestContent>{columns[0].content(codingCriterion)}</TestContent>)
      expect(content.find(Checkbox)).toHaveLength(1)
      expect(content.find(Checkbox).prop("disabled")).toBe(true)

      const content1 = shallow(<TestContent>{columns[1].content(codingCriterion)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(codingCriterion.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)

      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button)).toHaveLength(0)
      const content2 = shallow(<TestContent>{columns[2].content(codingCriterion)}</TestContent>)
      expect(content2.find(InlineEditableHeaderContainer)).toHaveLength(1)
      expect(content2.find(InlineEditableHeaderContainer).html()).toContain(`${codingCriterion.score}`)
      expect(content2.find(InlineEditableHeaderContainer).prop("disabled")).toBe(false)
      // add button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      const content3 = shallow(<TestContent>{columns[3].content(codingCriterion)}</TestContent>)
      expect(content3.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })
    it("can getAnswerColumns: holistic scoring", () => {
      const columns = getAnswerColumns({
        ...defaultParams,
        questionType: QuestionType.FreeText,
        scoringType: QuestionScoringType.Holistic
      })

      const content = shallow(<TestContent>{columns[0].content(codingCriterion)}</TestContent>)
      expect(content.find(RadioButton)).toHaveLength(1)
      expect(content.find(RadioButton).prop("disabled")).toBe(true)

      const content1 = shallow(<TestContent>{columns[1].content(codingCriterion)}</TestContent>)
      expect(content1.find(EditableMultilineTextarea)).toHaveLength(1)
      expect(content1.find(EditableMultilineTextarea).html()).toContain(codingCriterion.text)
      expect(content1.find(EditableMultilineTextarea).prop("disabled")).toBe(false)
      expect(content1.find(Icon)).toHaveLength(0)

      // freetext option button
      const header2 = shallow(<TestContent>{columns[2].header}</TestContent>)
      expect(header2.find(Button)).toHaveLength(0)
      const content2 = shallow(<TestContent>{columns[2].content(codingCriterion)}</TestContent>)
      expect(content2.find(InlineEditableHeaderContainer)).toHaveLength(1)
      expect(content2.find(InlineEditableHeaderContainer).html()).toContain(`${codingCriterion.score}`)
      expect(content2.find(InlineEditableHeaderContainer).prop("disabled")).toBe(false)
      // add button
      const header3 = shallow(<TestContent>{columns[3].header}</TestContent>)
      expect(header3.find(Button).prop("disabled")).toBe(false)
      const content3 = shallow(<TestContent>{columns[3].content(codingCriterion)}</TestContent>)
      expect(content3.find(OrlyButtonContainer).prop("disabled")).toBe(false)
    })
  })
})
