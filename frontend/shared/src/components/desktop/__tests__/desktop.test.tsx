import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {AppHeader, LoadingIndicator} from "../../../components"
import {scenariosMock} from "../../../graphql/__mocks__"
import {Option} from "../../../utils"
import {ModuleStartOverlay} from "../../module-start-overlay/module-start-overlay"
import {binaryViewerWindows, officeToolWindows} from "../config"
import {Desktop, DesktopProps} from "../desktop"
import {ProjectModuleTimeElapsedModal} from "../scenario-time-up-modal"

const props: DesktopProps = {
  scenario: scenariosMock[0],
  isScenarioDurationExpired: false,
  confirmScenarioTimeUpModal: jest.fn(),
  sendCompletionMail: jest.fn(),
  openedWindows: [],
  closeWindow: jest.fn(),
  minimizeWindow: jest.fn(),
  isScenarioLoading: false,
  interventions: [],
  minimizedWindows: [],
  availableWindows: officeToolWindows.concat(binaryViewerWindows).map(window => window.tool),
  closeQuestionnaireEvent: jest.fn(),
  currentQuestionnaireId: Option.none(),
  isFinishModalVisible: false,
  abortScenarioFinishModal: jest.fn(),
  confirmScenarioFinishModal: jest.fn(),
  isStartModalVisible: false,
  onStartScenario: jest.fn(),
  taskbar: <div>Taskbar</div>,
  renderTool: jest.fn(),
  onClipboardEvent: jest.fn()
}

const getComponent = (customProps?: Partial<DesktopProps>) => <Desktop {...props} {...customProps} />

describe("desktop", () => {
  it("renders correctly", () => {
    const tree = create(getComponent()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = shallow(getComponent())
    expect(component.find(AppHeader)).toHaveLength(1)
    expect(component.find(ModuleStartOverlay)).toHaveLength(0)
  })

  it("has correct structure: scenarioLoading", async () => {
    const component = shallow(getComponent({isScenarioLoading: true}))
    expect(component.find(AppHeader)).toHaveLength(1)
    expect(component.find(LoadingIndicator)).toHaveLength(1)
  })

  it("has correct structure: show Modal and scenario not loading", async () => {
    const component = shallow(
      getComponent({isScenarioLoading: false, isStartModalVisible: true, isScenarioDurationExpired: false})
    )
    expect(component.find(AppHeader)).toHaveLength(1)
    expect(component.find(ProjectModuleTimeElapsedModal)).toHaveLength(0)
    expect(component.find(ModuleStartOverlay)).toHaveLength(1)
  })

  it("has correct structure: scenario expired", async () => {
    const component = shallow(getComponent({isScenarioLoading: false, isScenarioDurationExpired: true}))
    expect(component.find(AppHeader)).toHaveLength(1)
    expect(component.find(ProjectModuleTimeElapsedModal)).toHaveLength(1)
  })
})
