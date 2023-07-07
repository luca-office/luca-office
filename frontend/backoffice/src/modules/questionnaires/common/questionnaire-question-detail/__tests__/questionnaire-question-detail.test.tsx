// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {act, create} from "react-test-renderer"
import {runtimeSurveyAnswerSelectionInterventionsMock} from "shared/__mocks__"
import {CardFooter, CardHeader, Label, OrlyButtonContainer, ReadonlyActionField, Table} from "shared/components"
import {questionnairesMock} from "shared/graphql/__mocks__"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {
  DetailViewBinary,
  InlineEditableTextareaContainer,
  OverlayEditField,
  ResortModal
} from "../../../../../components"
import {CreateRuntimeSurveyAnswerSelectionInterventionModalContainer} from "../../../../scenario-interventions/create/create-intervention-modal/container/create-runtime-survey-answer-selection-intervention-modal-container"
import {QuestionAnswerTableEntity} from "../../../config"
import {convertAnswersToResortableEntity} from "../../../utils"
import {QuestionScoringSelection} from "../../question-scoring-selection/question-scoring-selection"
import {UpdateQuestionnaireQuestionTypeModal} from "../../update-questionnaire-question-type-modal/update-questionnaire-question-type-modal"
import * as questionDetailHook from "../hooks/use-questionnaire-question-detail"
import {UseQuestionnaireQuestionDetailHook} from "../hooks/use-questionnaire-question-detail"
import {QuestionnaireQuestionDetail, QuestionnaireQuestionDetailProps} from "../questionnaire-question-detail"

const defaultProps: QuestionnaireQuestionDetailProps = {
  readonly: false,
  showQuestionScoring: false,
  questionId: questionnaireQuestionsMock[1].id,
  questionnaireId: questionnairesMock[1].id,
  navigateToQuestionnaire: jest.fn,
  showScenarioSpecificSettings: false
}

const hookValuesDefault: UseQuestionnaireQuestionDetailHook = {
  question: Option.of(questionnaireQuestionsMock[1]),
  actionsLoading: false,
  dataLoading: false,
  updateQuestionnaireQuestion: jest.fn(),
  deleteAnswer: jest.fn,
  handleCreateAnswer: jest.fn,
  deleteQuestion: jest.fn(),
  openAnswersSortOverlay: jest.fn,
  isChangeQuestionTypeModalVisible: false,
  interventionsConfig: {
    isCreateInterventionModalVisible: false,
    runtimeSurveyAnswerSelectionInterventions: runtimeSurveyAnswerSelectionInterventionsMock,
    scenarioMaxDurationInSeconds: 600,
    setSelectedAnswerForInterventionsSetting: jest.fn(),
    toggleIsCreateInterventionModalVisible: jest.fn(),
    selectedAnswerForInterventionsSetting: Option.none(),
    isScenarioReadOnly: false,
    navigateToInterventions: jest.fn()
  },
  setChangeQuestionTypeModalVisible: jest.fn(),
  toggleFreeTextAnswer: jest.fn,
  updateQuestionnaireAnswer: jest.fn(),
  repositionAnswers: jest.fn(),
  sortableAnswers: convertAnswersToResortableEntity(Option.of(questionnaireQuestionsMock[1].answers)),
  setResortModalVisible: jest.fn(),
  resortModalVisible: false,
  createDefaultHolisticAnswer: jest.fn()
}

const getComponent = (props?: Partial<QuestionnaireQuestionDetailProps>) => (
  <MockedProvider>
    <QuestionnaireQuestionDetail {...defaultProps} {...props} />
  </MockedProvider>
)

const stateSpy = jest.spyOn(questionDetailHook, "useQuestionnaireQuestionDetail")

describe("questionnaire-question-detail", () => {
  describe("rendering", () => {
    it("renders correctly", async () => {
      stateSpy.mockReturnValue(hookValuesDefault)
      const component = create(getComponent())

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("renders correctly with scoring", async () => {
      stateSpy.mockReturnValue(hookValuesDefault)
      const component = create(getComponent({showQuestionScoring: true}))

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("renders correctly with analytic scoring", async () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          scoringType: QuestionScoringType.Analytical
        } as QuestionnaireQuestion)
      })
      const component = create(getComponent({showQuestionScoring: true}))

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("renders correctly with holistic scoring", async () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          scoringType: QuestionScoringType.Holistic
        } as QuestionnaireQuestion)
      })
      const component = create(getComponent({showQuestionScoring: true}))

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("renders correctly with scoring / without actions", async () => {
      stateSpy.mockReturnValue(hookValuesDefault)
      const component = create(getComponent({showQuestionScoring: true, hideActions: true}))

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("renders correctly multiple choice, non scoring", async () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.MultipleChoice,
          scoringType: QuestionScoringType.None
        } as QuestionnaireQuestion)
      })
      const component = create(getComponent({showQuestionScoring: true}))

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("renders correctly multiple choice, analytics scoring", async () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.MultipleChoice,
          scoringType: QuestionScoringType.Analytical
        } as QuestionnaireQuestion)
      })
      const component = create(getComponent({showQuestionScoring: true}))

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("renders correctly single choice, non scoring", async () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.SingleChoice,
          scoringType: QuestionScoringType.None
        } as QuestionnaireQuestion)
      })
      const component = create(getComponent({showQuestionScoring: true}))

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("renders correctly single choice, holistic scoring", async () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.SingleChoice,
          scoringType: QuestionScoringType.Holistic
        } as QuestionnaireQuestion)
      })
      const component = create(getComponent({showQuestionScoring: true}))

      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe("multiple choice", () => {
    it("has correct structure: no scoring / free text option", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.MultipleChoice,
          scoringType: QuestionScoringType.None
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent())

      expect(component.find(CardHeader)).toHaveLength(1)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(QuestionScoringSelection)).toHaveLength(0)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(
        questionnaireQuestionsMock[1].answers.length + 1
      )
    })

    it("has correct structure: analytic scoring / free text option", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.MultipleChoice,
          scoringType: QuestionScoringType.Analytical
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent())

      expect(component.find(CardHeader)).toHaveLength(1)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(QuestionScoringSelection)).toHaveLength(0)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(questionnaireQuestionsMock[1].answers.length)
    })
  })

  describe("single choice", () => {
    it("has correct structure: no scoring / free text option", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.SingleChoice,
          scoringType: QuestionScoringType.None
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent())

      expect(component.find(CardHeader)).toHaveLength(1)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(QuestionScoringSelection)).toHaveLength(0)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(
        questionnaireQuestionsMock[1].answers.length + 1
      )
    })

    it("has correct structure: holistic scoring / free text option", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.SingleChoice,
          scoringType: QuestionScoringType.Holistic
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent())

      expect(component.find(CardHeader)).toHaveLength(1)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(QuestionScoringSelection)).toHaveLength(0)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(questionnaireQuestionsMock[1].answers.length)
    })
  })

  describe("freetext question", () => {
    it("has correct structure: no scoring / free text option / scoring not displayed", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          scoringType: QuestionScoringType.None
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent())

      expect(component.find(CardHeader)).toHaveLength(1)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(QuestionScoringSelection)).toHaveLength(0)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(1)
    })

    it("has correct structure: no scoring / free text option", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          scoringType: QuestionScoringType.None
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent({showQuestionScoring: true}))

      expect(component.find(CardHeader)).toHaveLength(4)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(QuestionScoringSelection)).toHaveLength(1)
      expect(component.find(Table)).toHaveLength(0)
    })

    it("has correct structure: holistic scoring / free text option", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          scoringType: QuestionScoringType.Holistic
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent({showQuestionScoring: true}))

      expect(component.find(CardHeader)).toHaveLength(4)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(3)
      expect(component.find(QuestionScoringSelection)).toHaveLength(1)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(
        questionnaireQuestionsMock[1].freetextQuestionCodingCriteria.length
      )
    })

    it("has correct structure: analytic scoring / free text option", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          scoringType: QuestionScoringType.Analytical
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent({showQuestionScoring: true}))

      expect(component.find(CardHeader)).toHaveLength(4)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(3)
      expect(component.find(QuestionScoringSelection)).toHaveLength(1)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(
        questionnaireQuestionsMock[1].freetextQuestionCodingCriteria.length
      )
    })
  })

  describe("optional props", () => {
    it("has correct structure: actions hidden", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.MultipleChoice,
          scoringType: QuestionScoringType.Analytical
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent({hideActions: true}))

      expect(component.find(CardHeader)).toHaveLength(1)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(QuestionScoringSelection)).toHaveLength(0)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(questionnaireQuestionsMock[1].answers.length)
      // check action elements
      expect(component.find(OrlyButtonContainer)).toHaveLength(0)
      expect(component.find(OverlayEditField).first().prop("disabled")).toBe(true)
      expect(component.find(InlineEditableTextareaContainer).first().prop("disabled")).toBe(true)
      expect(component.find(InlineEditableTextareaContainer).first().prop("readOnly")).toBe(true)
      expect(component.find(DetailViewBinary).first().prop("readonly")).toBe(true)
      expect(component.find(ReadonlyActionField).last().prop("disabled")).toBe(true)
    })
    it("has correct structure: scoring enabled", () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        question: Option.of({
          ...questionnaireQuestionsMock[1],
          questionType: QuestionType.MultipleChoice,
          scoringType: QuestionScoringType.Analytical
        } as QuestionnaireQuestion)
      })
      const component = mount(getComponent({showQuestionScoring: true}))

      expect(component.find(CardHeader)).toHaveLength(3)
      expect(component.find(DetailViewBinary)).toHaveLength(1)
      expect(component.find(Label)).toHaveLength(3)
      expect(component.find(Table)).toHaveLength(1)
      expect(component.find(Table).prop("sortedEntities")).toHaveLength(questionnaireQuestionsMock[1].answers.length)
      // check action elements
      expect(component.find(CardFooter)).toHaveLength(2)
      expect(component.find(QuestionScoringSelection)).toHaveLength(1)
    })

    it("shows resort modal", async () => {
      stateSpy.mockReturnValue({...hookValuesDefault, resortModalVisible: true})
      const component = mount(getComponent())

      await act(() => wait(0))
      expect(component.find(ResortModal)).toHaveLength(1)
    })
    it("shows change question type modal", async () => {
      stateSpy.mockReturnValue({...hookValuesDefault, isChangeQuestionTypeModalVisible: true})
      const component = mount(getComponent())

      await act(() => wait(0))
      expect(component.find(UpdateQuestionnaireQuestionTypeModal)).toHaveLength(1)
    })
    it("shows scenarios-pecific settings correctly - active", async () => {
      stateSpy.mockReturnValue(hookValuesDefault)
      const component = mount(getComponent({showScenarioSpecificSettings: true}))

      await act(() => wait(0))
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(Label).last().prop("label")).toEqual("questionnaires__detail_questions_answers_title")
    })
    it("shows scenarios-pecific settings correctly -not active", async () => {
      stateSpy.mockReturnValue(hookValuesDefault)
      const component = mount(getComponent({showScenarioSpecificSettings: false}))

      await act(() => wait(0))
      expect(component.find(Label)).toHaveLength(2)
      expect(component.find(CreateRuntimeSurveyAnswerSelectionInterventionModalContainer)).toHaveLength(0)
    })
    it("shows create intervention Modal correctly", async () => {
      stateSpy.mockReturnValue({
        ...hookValuesDefault,
        interventionsConfig: {
          ...hookValuesDefault.interventionsConfig,
          isCreateInterventionModalVisible: true,
          selectedAnswerForInterventionsSetting: Option.of<QuestionAnswerTableEntity>({
            id: "4581ef2e-1e68-49e4-9864-6f5e0c9f5662",
            isFreeTextAnswer: false,
            text: "sdff"
          })
        }
      })
      const component = mount(getComponent({showScenarioSpecificSettings: true}))

      await act(() => wait(0))
      expect(component.find(CreateRuntimeSurveyAnswerSelectionInterventionModalContainer)).toHaveLength(0)
    })
  })
})
