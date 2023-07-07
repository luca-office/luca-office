import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ReadonlyActionField} from "shared/components/readonly-action-field/readonly-action-field"
import {CustomSelect} from "shared/components/select/custom-select"
import {SettingsFooterCard} from "shared/components/settings-footer-card/settings-footer-card"
import {Heading} from "shared/components/typography/typography"
import {ErpType} from "shared/enums"
import {ScenarioErpEntity} from "shared/models"
import {Option} from "shared/utils"
import {sampleCompanyIdMock, scenarioErpComponentsMock, scenarioIdMock} from "sharedTests/__mocks__"
import {CreateErpRowOpeningInterventionModalContainer} from "../../../../scenario-interventions"
import {ErpScenarioSettingsFooter, ErpScenarioSettingsFooterProps} from "../erp-scenario-settings-footer"
import * as useErpScenarioSettingsFooterHook from "../hooks/use-erp-scenario-settings-footer"
import {UseErpScenarioSettingsFooterHook} from "../hooks/use-erp-scenario-settings-footer"

const sampleCompanyId = sampleCompanyIdMock
const scenarioId = scenarioIdMock
const scenarioErpComponent = scenarioErpComponentsMock[0]

const hookValuesDefault: UseErpScenarioSettingsFooterHook = {
  isCreateInterventionModalVisible: false,
  toggleIsCreateInterventionModalVisible: jest.fn(),
  dataLoading: false,
  actionLoading: false,
  scenarioErpEntity: Option.of<ScenarioErpEntity>({
    selector: {componentId: scenarioErpComponent.componentId},
    scenarioId,
    sampleCompanyId,
    relevance: scenarioErpComponent.relevance
  }),
  onRelevanceUpdate: jest.fn()
}

const stateSpy = jest.spyOn(useErpScenarioSettingsFooterHook, "useErpScenarioSettingsFooter")

const defaultProps: ErpScenarioSettingsFooterProps = {
  scenarioId,
  sampleCompanyId,
  erpRowId: 50,
  scenarioMaxDurationInSeconds: 600,
  type: ErpType.Component,
  scenarioErpSelector: {componentId: scenarioErpComponent.componentId},
  interventionsCount: 0,
  disableInterventionCreation: false
}

const getComponent = (props?: ErpScenarioSettingsFooterProps) => (
  <ErpScenarioSettingsFooter {...{...defaultProps, ...props}} />
)

describe("erp-scenario-settings-footer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = shallow(getComponent())

    expect(component.find(Heading)).toHaveLength(1)

    const settingsFooterCards = component.find(SettingsFooterCard)
    expect(settingsFooterCards).toHaveLength(2)

    expect(settingsFooterCards.at(0).find(CustomSelect)).toHaveLength(1)
    expect(settingsFooterCards.at(1).find(ReadonlyActionField)).toHaveLength(1)
    expect(component.find(CreateErpRowOpeningInterventionModalContainer)).toHaveLength(0)
  })

  it("has correct structure with create intervention modal", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isCreateInterventionModalVisible: true})
    const component = shallow(getComponent())

    expect(component.find(Heading)).toHaveLength(1)

    const settingsFooterCards = component.find(SettingsFooterCard)
    expect(settingsFooterCards).toHaveLength(2)

    expect(settingsFooterCards.at(0).find(CustomSelect)).toHaveLength(1)
    expect(settingsFooterCards.at(1).find(ReadonlyActionField)).toHaveLength(1)
    expect(component.find(CreateErpRowOpeningInterventionModalContainer)).toHaveLength(1)
  })
})
