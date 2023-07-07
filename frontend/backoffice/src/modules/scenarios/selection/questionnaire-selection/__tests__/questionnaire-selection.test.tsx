// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {render, screen} from "@testing-library/react"
import {act} from "@testing-library/react-hooks"
import userEvent from "@testing-library/user-event"
import {mount} from "enzyme"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {checkLoginQuery, questionnairesQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {checkLoginMock, questionnairesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {ModuleSelectionContainer} from "../../../../common/module-selection/module-selection-container"
import * as useQuestionnaireSelection from "../hooks/use-questionnaire-selection"
import {UseQuestionnaireSelectionHook} from "../hooks/use-questionnaire-selection"
import {QuestionnaireSelection} from "../questionnaire-selection"

const useQuestionnaireSelectionHookDefault: UseQuestionnaireSelectionHook = {
  assignedQuestionnaires: [],
  eventQuestionnairePreviewForModal: Option.none(),
  handleBackNavigation: jest.fn(),
  loading: false,
  questionnaires: questionnairesMock,
  setEventQuestionnairePreviewForModal: jest.fn(),
  updateAssignment: jest.fn()
}

const questionnaireSelectionStateSpy = jest.spyOn(useQuestionnaireSelection, "useQuestionnaireSelection")

const component = (
  <MockedProvider
    mocks={[
      {
        request: {
          query: questionnairesQuery,
          variables: {isRuntimeSurvey: true}
        },
        result: {
          data: {
            questionnaires: questionnairesMock
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
      }
    ]}>
    <Provider store={fakeStore(initialAppState)}>
      <QuestionnaireSelection scenarioId={scenariosMock[0].id} isRuntimeSurvey />
    </Provider>
  </MockedProvider>
)

describe("questionnaire-selection", () => {
  it("renders correctly", async () => {
    questionnaireSelectionStateSpy.mockReturnValue(useQuestionnaireSelectionHookDefault)

    await act(() => wait(0))
    const wrapper = create(component)
    const tree = wrapper.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const wrapper = mount(component)

    await act(() => wait(0))

    expect(wrapper.find(ModuleSelectionContainer)).toHaveLength(1)
  })

  it("triggers action correctly", async () => {
    const setPreview = jest.fn()
    questionnaireSelectionStateSpy.mockReturnValue({
      ...useQuestionnaireSelectionHookDefault,
      setEventQuestionnairePreviewForModal: setPreview
    })

    const user = userEvent.setup()

    render(component)

    await user.click(screen.getAllByText(questionnairesMock[0].title)[0])

    expect(setPreview).toBeCalledTimes(1)
  })
})
