// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {act as actRenderer, create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {
  Button,
  Content,
  ContentBottomActionbar,
  ContentMissingIndicator,
  DetailViewHeader,
  TableOfContentsContainer
} from "shared/components"
import {IconName} from "shared/enums"
import {checkLoginMock, questionnairesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {
  checkLoginQuery,
  questionnaireQuestionQuery,
  scenarioQuery,
  scenarioQuestionnairesQuery
} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {Questionnaire} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {ResortModal} from "../../../../components"
import {QuestionnaireDetailMode} from "../../../../enums"
import {CreateQuestionnaireQuestionModal, QuestionnaireInformation, QuestionnaireQuestionDetail} from "../../common"
import {QuestionnairePreview} from "../../preview/questionnaire-preview"
import {convertQuestionsToResortableEntity} from "../../utils"
import * as eventDetailHook from "../hooks/use-questionnaire-detail"
import {UseQuestionnaireDetailHook} from "../hooks/use-questionnaire-detail"
import {QuestionnaireDetail, QuestionnaireDetailsProps} from "../questionnaire-detail"
import {QuestionnaireDetailActionBar} from "../questionnaire-detail-action-bar/questionnaire-detail-action-bar"
import {SelectionDetailPlaceholder} from "../selection-detail-placeholder/selection-detail-placeholder"

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
  questionCreationVisible: false,
  questionnaire: Option.of(questionnairesMock[0]),
  repositionQuestions: jest.fn(() => Promise.resolve([])),
  resortModalVisible: false,
  scenarioQuestionnaires: Option.of(scenarioQuestionnairesMock),
  selectedEntityId: Option.none(),
  selectEntityId: jest.fn(),
  setIsPreviewVisible: jest.fn(),
  navigateToQuestionnaire: jest.fn,
  setQuestionCreationVisible: jest.fn(),
  setResortModalVisible: jest.fn,
  sortableQuestions: convertQuestionsToResortableEntity(Option.of(questionnaireQuestionsMock)),
  updateQuestionnaire: jest.fn(),
  userMayArchive: false,
  userMayFinalizeWithoutPublishing: false
}

const scenario = scenariosMock[0]
const questionId = scenarioQuestionnairesMock[0].questionnaire.questions[0].id

const stateSpy = jest.spyOn(eventDetailHook, "useQuestionnaireDetail")

const getComponent = (customProps?: Partial<QuestionnaireDetailsProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: scenarioQuery,
          variables: {id: scenario.id}
        },
        result: {
          data: {scenario}
        }
      },
      {
        request: {
          query: scenarioQuestionnairesQuery,
          variables: {
            scenarioId: scenario.id
          }
        },
        result: {
          data: {
            scenarioQuestionnaires: scenarioQuestionnairesMock
          }
        }
      },
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
          query: questionnaireQuestionQuery,
          variables: {
            id: questionId
          }
        },
        result: {
          data: {
            questionnaireQuestion: questionnaireQuestionsMock[0]
          }
        }
      },
      {
        request: {
          query: interventionsQuery,
          variables: {scenarioId: scenariosMock[0].id}
        },
        result: {
          data: {
            interventions: interventionsMock
          }
        }
      }
    ]}
    addTypename={true}>
    <QuestionnaireDetail questionnaireId={questionnairesMock[0].id} {...customProps} />
  </MockedProvider>
)

describe("questionnaire-detail", () => {
  it("renders correctly: questionnaire-detail", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly: questionnaire-detail question", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent({questionId}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly: event detail", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isRuntimeSurvey: true})
    const component = create(getComponent({displayMode: QuestionnaireDetailMode.RuntimeSurvey}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly: event detail question", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isRuntimeSurvey: true})
    const component = create(getComponent({displayMode: QuestionnaireDetailMode.RuntimeSurvey, questionId}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly: scenario event", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isRuntimeSurvey: true, isEventSelection: true})
    const component = create(
      getComponent({scenarioId: scenariosMock[0].id, displayMode: QuestionnaireDetailMode.ScenarioRuntimeSurvey})
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly: scenario event question", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isRuntimeSurvey: true, isEventSelection: true})
    const component = create(
      getComponent({
        scenarioId: scenariosMock[0].id,
        displayMode: QuestionnaireDetailMode.ScenarioRuntimeSurvey,
        questionId
      })
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly: project questionnaire", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isProjectQuestionnaire: true})
    const component = create(getComponent({displayMode: QuestionnaireDetailMode.ProjectQuestionnaire}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly: project questionnaire question", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isProjectQuestionnaire: true})
    const component = create(getComponent({displayMode: QuestionnaireDetailMode.ProjectQuestionnaire, questionId}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure: questionnaire detail", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireInformation)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(QuestionnaireDetailActionBar)).toHaveLength(1)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct delete button config if not published or finalized", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      questionnaire: Option.of<Questionnaire>({...questionnairesMock[0], finalizedAt: null, publishedAt: null})
    })

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.archiveHook).toBeUndefined()
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.deleteHook).toBeDefined()
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.disabled).toBe(false)
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.invisible).toBe(false)
  })

  it("has correct archive button config if published or finalized", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      questionnaire: Option.of<Questionnaire>({
        ...questionnairesMock[0],
        finalizedAt: "2020-08-21T12:15:48.373Z",
        publishedAt: null
      }),
      userMayArchive: true
    })

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.archiveHook).toBeDefined()
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.deleteHook).toBeUndefined()
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.disabled).toBe(false)
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.invisible).toBe(false)
  })
  it("has correct archive button config if published or finalized and user has no claim", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      questionnaire: Option.of<Questionnaire>({
        ...questionnairesMock[0],
        finalizedAt: "2020-08-21T12:15:48.373Z",
        publishedAt: null
      }),
      userMayArchive: false
    })

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.archiveHook).toBeDefined()
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.deleteHook).toBeUndefined()
    expect(component.find(DetailViewHeader).prop("deleteOrArchiveButtonConfig")?.invisible).toBe(true)
  })

  it("has correct structure: questionnaire detail question", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent({questionId}))
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireQuestionDetail)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(QuestionnaireDetailActionBar)).toHaveLength(1)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct structure: event detail", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isRuntimeSurvey: true})

    const component = mount(getComponent({displayMode: QuestionnaireDetailMode.RuntimeSurvey}))
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireInformation)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(QuestionnaireDetailActionBar)).toHaveLength(1)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct structure: event detail question", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isRuntimeSurvey: true})

    const component = mount(getComponent({displayMode: QuestionnaireDetailMode.RuntimeSurvey, questionId}))
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireQuestionDetail)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(QuestionnaireDetailActionBar)).toHaveLength(1)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct structure: project questionnaire", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isProjectQuestionnaire: true})

    const component = mount(getComponent({displayMode: QuestionnaireDetailMode.ProjectQuestionnaire}))
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireInformation)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(0)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct structure: project questionnaire question", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isProjectQuestionnaire: true})

    const component = mount(getComponent({displayMode: QuestionnaireDetailMode.ProjectQuestionnaire, questionId}))
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireQuestionDetail)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(0)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct structure: scenario questionnaire", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      selectedEntityId: Option.of(scenarioQuestionnairesMock[0].questionnaireId),
      isRuntimeSurvey: true,
      isEventSelection: true
    })

    const component = mount(
      getComponent({scenarioId: scenariosMock[0].id, displayMode: QuestionnaireDetailMode.ScenarioRuntimeSurvey})
    )
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireInformation)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ContentBottomActionbar)).toHaveLength(0)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct structure: scenario questionnaire question", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      selectedEntityId: Option.of(scenarioQuestionnairesMock[0].questionnaireId),
      isRuntimeSurvey: true,
      isEventSelection: true
    })

    const component = mount(
      getComponent({
        scenarioId: scenariosMock[0].id,
        displayMode: QuestionnaireDetailMode.ScenarioRuntimeSurvey,
        questionId
      })
    )
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireQuestionDetail)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ContentBottomActionbar)).toHaveLength(0)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct structure: with question create modal open", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, questionCreationVisible: true})

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireInformation)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
  })
  it("has correct structure: with preview open", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isPreviewVisible: true})

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireInformation)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(ResortModal)).toHaveLength(0)
    expect(component.find(QuestionnairePreview)).toHaveLength(1)
  })
  it("has correct structure: with resort modal open", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, resortModalVisible: true})

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(Button)).toHaveLength(2)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(QuestionnaireInformation)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(1)
    expect(component.find(QuestionnairePreview)).toHaveLength(0)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
  })

  it("has correct structure: questionnaire not found, scenario placeholder", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      questionnaire: Option.none(),
      isRuntimeSurvey: true,
      isEventSelection: true
    })

    const component = mount(
      getComponent({scenarioId: scenariosMock[0].id, displayMode: QuestionnaireDetailMode.ScenarioRuntimeSurvey})
    )
    await actRenderer(() => wait(0))
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(ContentMissingIndicator)).toHaveLength(0)
    expect(component.find(QuestionnaireInformation)).toHaveLength(0)
    expect(component.find(SelectionDetailPlaceholder)).toHaveLength(1)
    expect(component.find(TableOfContentsContainer)).toHaveLength(1)
    expect(component.find(CreateQuestionnaireQuestionModal)).toHaveLength(0)
    expect(component.find(ContentBottomActionbar)).toHaveLength(0)
  })

  it("shows finalize button as second operation if user has claim and questionnaire is not finalized or published", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      questionnaire: Option.of<Questionnaire>({
        ...questionnairesMock[0],
        finalizedAt: null,
        publishedAt: null
      }),
      userMayFinalizeWithoutPublishing: true
    })

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).prop("secondOperationButtonConfig")).toBeDefined()
    expect(component.find(DetailViewHeader).prop("secondOperationButtonConfig")?.icon).toBe(IconName.LockOpen)
    expect(component.find(DetailViewHeader).prop("secondOperationButtonConfig")?.labelKey).toBe(
      "questionnaires__detail_header_finalize_button"
    )
  })

  it("shows no finalize button as second operation if user has no claim and questionnaire is not finalized or published", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      questionnaire: Option.of<Questionnaire>({
        ...questionnairesMock[0],
        finalizedAt: null,
        publishedAt: null
      }),
      userMayFinalizeWithoutPublishing: false
    })

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).prop("secondOperationButtonConfig")).toBeUndefined()
  })

  it("shows publish and duplicate button if questionnaire is finalized and not published", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      isQuestionnaireFinalizedOrPublished: true,
      questionnaire: Option.of<Questionnaire>({
        ...questionnairesMock[0],
        finalizedAt: "2020-08-21T12:15:48.373Z",
        publishedAt: null
      }),
      userMayFinalizeWithoutPublishing: true
    })

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).prop("secondOperationButtonConfig")).toBeDefined()
    expect(component.find(DetailViewHeader).prop("secondOperationButtonConfig")?.icon).toBe(IconName.Publish)
    expect(component.find(DetailViewHeader).prop("operationButtonConfig")).toBeDefined()
    expect(component.find(DetailViewHeader).prop("operationButtonConfig")?.labelKey).toBe(
      "questionnaires__detail_header_duplicate_button"
    )
  })
  it("shows only duplicate button if questionnaire is finalized and published", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      isQuestionnaireFinalizedOrPublished: true,
      questionnaire: Option.of<Questionnaire>({
        ...questionnairesMock[0],
        finalizedAt: "2020-08-21T12:15:48.373Z",
        publishedAt: "2020-08-21T12:15:48.373Z"
      }),
      userMayFinalizeWithoutPublishing: true
    })

    const component = mount(getComponent())
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).prop("secondOperationButtonConfig")).toBeUndefined()
    expect(component.find(DetailViewHeader).prop("operationButtonConfig")).toBeDefined()
    expect(component.find(DetailViewHeader).prop("operationButtonConfig")?.icon).toBe(IconName.Duplicate)
  })
})
