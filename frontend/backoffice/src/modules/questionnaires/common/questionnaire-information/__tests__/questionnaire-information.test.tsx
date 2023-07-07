import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardContent, CardHeader, Icon, Label, Table} from "shared/components"
import {questionnairesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {scenarioQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import wait from "waait"
import {
  DetailViewBinary,
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  OverlayEditField,
  OverlayEditFieldType
} from "../../../../../components"
import {Route} from "../../../../../routes"
import {getQuestionsColumns} from "../../../config"
import {DeleteScenarioQuestionnaireButton} from "../../delete-scenario-questionnaire-button/delete-scenario-questionnaire-button"
import {QuestionDetailBodyFooter} from "../../question-detail-body-footer/question-detail-body-footer"
import * as useQuestionnaireInformationHook from "../hooks/use-questionnaire-information"
import {UseQuestionnaireInformationHook} from "../hooks/use-questionnaire-information"
import {QuestionnaireInformation, QuestionnaireInformationProps} from "../questionnaire-information"

const questionnaire = questionnairesMock[3]

const defaultProps: QuestionnaireInformationProps = {
  actionsLoading: false,
  questionnaire,
  deleteQuestion: jest.fn,
  openQuestionCreation: jest.fn,
  openQuestionsSortOverlay: jest.fn,
  showQuestionnaireTitle: false,
  updateQuestionnaire: jest.fn,
  renderRightHeaderChild: () => (
    <DeleteScenarioQuestionnaireButton scenarioId={scenariosMock[0].id} questionnaireId={questionnairesMock[0].id} />
  ),
  navigationQuestionConfig: {
    route: Route.QuestionnaireDetailQuestion,
    payload: {questionnaireId: questionnaire.id, questionId: questionnaireQuestionsMock[0].id}
  }
}

const hookValuesDefault: UseQuestionnaireInformationHook = {
  isEditable: true,
  descriptionField: {
    updateId: "description",
    value: questionnaire.description,
    labelKey: "description",
    type: OverlayEditFieldType.TEXTAREA
  },
  questionnaireUpdate: {
    binaryFileId: questionnaire.binaryFileId,
    description: questionnaire.description,
    questionnaireType: questionnaire.questionnaireType,
    title: questionnaire.title
  },
  isEditDurationModalVisible: false,
  toggleIsEditDurationModalVisible: jest.fn(),
  questionsColumns: getQuestionsColumns({
    t: fakeTranslate,
    hideActionButtons: false,
    openCreation: jest.fn,
    openSortOverlay: jest.fn,
    deleteQuestion: jest.fn,
    isEditable: true,
    showQuestionScoring: true
  }),
  navigateToQuestionDetails: jest.fn()
}

const stateSpy = jest.spyOn(useQuestionnaireInformationHook, "useQuestionnaireInformation")

const getComponent = (props?: Partial<QuestionnaireInformationProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {query: scenarioQuery, variables: {id: scenariosMock[0].id}},
        result: {data: {scenario: scenariosMock[0]}}
      },
      {
        request: {query: scenarioQuestionnairesQuery, variables: {scenarioId: scenariosMock[0].id}},
        result: {data: {scenarioQuestionnaires: scenarioQuestionnairesMock}}
      }
    ]}>
    <QuestionnaireInformation {...defaultProps} {...props} />
  </MockedProvider>
)

describe("questionnaire-information", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly finalized", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent({questionnaire: questionnairesMock[0]}))
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (with questionnaire)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = mount(getComponent())

    await act(() => wait(0))

    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(DetailViewBinary)).toHaveLength(1)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(OverlayEditField)).toHaveLength(1)
    expect(component.find(InlineEditableTextareaContainer)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(3)
    expect(component.find(Table)).toHaveLength(1)
    expect(component.find(Table).prop("sortedEntities")).toHaveLength(questionnaire.questions.length)
    expect(component.find(DeleteScenarioQuestionnaireButton)).toHaveLength(1)
  })

  it("does not renderRightHeaderChild if no props present", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = mount(getComponent({renderRightHeaderChild: undefined}))

    await act(() => wait(0))

    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(DetailViewBinary)).toHaveLength(1)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(InlineEditableTextareaContainer)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(3)
    expect(component.find(Table)).toHaveLength(1)
    expect(component.find(Table).prop("sortedEntities")).toHaveLength(questionnaire.questions.length)
    expect(component.find(DeleteScenarioQuestionnaireButton)).toHaveLength(0)
  })
  it("shows questionnaire title and scoring", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = mount(getComponent({showQuestionnaireTitle: true, showQuestionScoring: true}))

    await act(() => wait(0))

    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardHeader).html()).toContain(questionnaire.title)
    expect(component.find(DetailViewBinary)).toHaveLength(1)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(InlineEditableTextareaContainer)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(3)
    expect(component.find(Table)).toHaveLength(1)
    expect(component.find(Table).prop("sortedEntities")).toHaveLength(questionnaire.questions.length)
    expect(component.find(Table).prop("columns")).toHaveLength(hookValuesDefault.questionsColumns.length)
  })
  it("has correct structure with hideActions", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = mount(getComponent({hideActions: true}))

    await act(() => wait(0))

    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(CardContent).find(Label)).toHaveLength(3)
    component.find(Label).forEach(node => expect(node.find(Icon)).toHaveLength(0))
  })
  it("has correct structure readonly and scenario", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isEditable: false})
    const component = mount(getComponent({scenarioId: scenariosMock[0].id, readonly: true}))

    await act(() => wait(0))

    expect(component.find(QuestionDetailBodyFooter)).toHaveLength(1)
    expect(component.find(QuestionDetailBodyFooter).prop("disabled")).toBe(true)
    expect(component.find(InlineEditableHeaderContainer).prop("disabled")).toBe(true)
    expect(component.find(OverlayEditField).prop("disabled")).toBe(true)
    expect(component.find(DetailViewBinary).prop("readonly")).toBe(true)
  })
})
