import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {questionnairesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {scenarioQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import wait from "waait"
import {QuestionnaireDetailMode} from "../../../../../../enums"
import {QuestionnaireDetail} from "../../../../../questionnaires"
import * as hook from "../../../../../questionnaires/detail/hooks/use-questionnaire-detail"
import {UseQuestionnaireDetailHook} from "../../../../../questionnaires/detail/hooks/use-questionnaire-detail"
import {convertQuestionsToResortableEntity} from "../../../../../questionnaires/utils"
import {
  ScenarioQuestionnaireSelectionDetail,
  ScenarioQuestionnaireSelectionDetailProps
} from "../scenario-questionnaire-selection-detail"

const defaultProps: ScenarioQuestionnaireSelectionDetailProps = {
  scenarioId: scenariosMock[0].id,
  questionnaireId: questionnairesMock[0].id
}

const hookValuesDefault: UseQuestionnaireDetailHook = {
  actionsLoading: false,
  dataLoading: false,
  deleteQuestion: jest.fn(),
  handleBackNavigation: jest.fn(),
  handleEventsNavigation: jest.fn,
  handleOperation: jest.fn(),
  handleFinalize: jest.fn(),
  handlePublish: jest.fn(),
  isEventSelection: false,
  isPreviewVisible: false,
  isProjectQuestionnaire: false,
  isQuestionnaireFinalizedOrPublished: false,
  isRuntimeSurvey: false,
  isScenarioReadOnly: false,
  navigateToQuestion: jest.fn(),
  navigateToQuestionnaire: jest.fn,
  questionCreationVisible: false,
  questionnaire: Option.of(questionnairesMock[0]),
  repositionQuestions: questions => new Promise(resolve => resolve([])),
  resortModalVisible: false,
  scenarioQuestionnaires: Option.of(scenarioQuestionnairesMock),
  selectedEntityId: Option.none(),
  selectEntityId: jest.fn(),
  setIsPreviewVisible: jest.fn(),
  setQuestionCreationVisible: jest.fn(),
  setResortModalVisible: jest.fn,
  sortableQuestions: convertQuestionsToResortableEntity(Option.of(questionnaireQuestionsMock)),
  updateQuestionnaire: jest.fn(),
  userMayArchive: false,
  userMayFinalizeWithoutPublishing: false
}

const getComponent = (props?: Partial<ScenarioQuestionnaireSelectionDetailProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: scenarioQuery,
          variables: {id: scenariosMock[0].id}
        },
        result: {
          data: {
            scenario: scenariosMock[0]
          }
        }
      },
      {
        request: {
          query: scenarioQuestionnairesQuery,
          variables: {scenarioId: scenariosMock[0].id}
        },
        result: {
          data: {
            scenarioQuestionnaires: scenarioQuestionnairesMock
          }
        }
      }
    ]}>
    <ScenarioQuestionnaireSelectionDetail {...defaultProps} {...props} />
  </MockedProvider>
)

const hookStateSpy = jest.spyOn(hook, "useQuestionnaireDetail")

describe("scenario-questionnaire-selection-detail", () => {
  it("renders correctly", async () => {
    hookStateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    hookStateSpy.mockReturnValue(hookValuesDefault)
    const tree = mount(getComponent())

    await act(() => wait(0))

    expect(tree.find(QuestionnaireDetail)).toHaveLength(1)
    expect(tree.find(QuestionnaireDetail).prop("displayMode")).toEqual(QuestionnaireDetailMode.ScenarioRuntimeSurvey)
    expect(tree.find(QuestionnaireDetail).prop("scenarioId")).toEqual(defaultProps.scenarioId)
    expect(tree.find(QuestionnaireDetail).prop("questionnaireId")).toEqual(defaultProps.questionnaireId)
    expect(tree.find(QuestionnaireDetail).prop("questionId")).toEqual(defaultProps.questionId)
  })
})
