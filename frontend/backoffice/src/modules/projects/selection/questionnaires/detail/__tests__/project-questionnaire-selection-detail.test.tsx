import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {projectsMock, questionnairesMock, scenarioQuestionnairesMock} from "shared/graphql/__mocks__"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {Option} from "shared/utils"
import wait from "waait"
import {QuestionnaireDetailMode} from "../../../../../../enums"
import {QuestionnaireDetail} from "../../../../../questionnaires"
import * as hook from "../../../../../questionnaires/detail/hooks/use-questionnaire-detail"
import {UseQuestionnaireDetailHook} from "../../../../../questionnaires/detail/hooks/use-questionnaire-detail"
import {convertQuestionsToResortableEntity} from "../../../../../questionnaires/utils"
import {
  ProjectQuestionnaireSelectionDetail,
  ProjectQuestionnaireSelectionDetailProps
} from "../project-questionnaire-selection-detail"

const defaultProps: ProjectQuestionnaireSelectionDetailProps = {
  projectId: projectsMock[0].id,
  questionnaireId: questionnairesMock[0].id
}

const hookValuesDefault: UseQuestionnaireDetailHook = {
  questionnaire: Option.of(questionnairesMock[0]),
  setQuestionCreationVisible: jest.fn(),
  questionCreationVisible: false,
  dataLoading: false,
  actionsLoading: false,
  navigateToQuestion: jest.fn(),
  handleBackNavigation: jest.fn(),
  handleFinalize: jest.fn(),
  handlePublish: jest.fn(),
  updateQuestionnaire: jest.fn(),
  deleteQuestion: jest.fn(),
  isQuestionnaireFinalizedOrPublished: false,
  handleOperation: jest.fn(),
  selectedEntityId: Option.none(),
  selectEntityId: jest.fn(),
  isEventSelection: false,
  isScenarioReadOnly: false,
  isProjectQuestionnaire: false,
  isRuntimeSurvey: false,
  handleEventsNavigation: jest.fn,
  scenarioQuestionnaires: Option.of(scenarioQuestionnairesMock),
  repositionQuestions: () => new Promise(resolve => resolve([])),
  setResortModalVisible: jest.fn,
  resortModalVisible: false,
  sortableQuestions: convertQuestionsToResortableEntity(Option.of(questionnaireQuestionsMock)),
  isPreviewVisible: false,
  setIsPreviewVisible: jest.fn(),
  navigateToQuestionnaire: jest.fn,
  userMayArchive: false,
  userMayFinalizeWithoutPublishing: false
}

const hookStateSpy = jest.spyOn(hook, "useQuestionnaireDetail")

describe("scenario-detail", () => {
  it("renders correctly", async () => {
    hookStateSpy.mockReturnValue(hookValuesDefault)
    const component = create(
      <MockedProvider>
        <ProjectQuestionnaireSelectionDetail {...defaultProps} />
      </MockedProvider>
    )
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    hookStateSpy.mockReturnValue(hookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ProjectQuestionnaireSelectionDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    expect(tree.find(QuestionnaireDetail)).toHaveLength(1)
    expect(tree.find(QuestionnaireDetail).prop("displayMode")).toEqual(QuestionnaireDetailMode.ProjectQuestionnaire)
    expect(tree.find(QuestionnaireDetail).prop("questionnaireId")).toEqual(defaultProps.questionnaireId)
    expect(tree.find(QuestionnaireDetail).prop("questionId")).toEqual(defaultProps.questionId)
  })
})
