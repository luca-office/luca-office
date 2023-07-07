import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardFooter, CustomSelect, OverviewCard, SettingsFooterCard} from "shared/components"
import {fileMock, scenarioSampleCompanyFilesMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {selectOptionsMock} from "../../../../../../components/email/email-body-setting-selection/__mocks__/select-options.mock"
import {InterventionSettingsCard} from "../../../../../../components/intervention-setting-card/intervention-setting-card"
import {FileDetailFooter, FileDetailFooterProps} from "../file-detail-footer"
import * as useFileDetailFooterHook from "../hooks/use-file-detail-footer"
import {UseFileDetailFooterHook} from "../hooks/use-file-detail-footer"

const scenarioSampleCompanyFile = scenarioSampleCompanyFilesMock[0]

const hookValuesDefault: UseFileDetailFooterHook = {
  scenarioSampleCompanyFile: Option.of(scenarioSampleCompanyFile),
  relevanceOptions: selectOptionsMock,
  updateRelevance: jest.fn(),
  interventionCount: 0,
  isCreateInterventionModalVisible: false,
  navigateToIntervention: jest.fn(),
  onCreateInterventionClick: jest.fn(),
  scenarioDurationInSeconds: 600,
  toggleIsCreateInterventionModalVisible: jest.fn()
}

const stateSpy = jest.spyOn(useFileDetailFooterHook, "useFileDetailFooter")

const defaultProps: FileDetailFooterProps = {
  scenarioId: scenarioSampleCompanyFile.scenarioId,
  file: fileMock,
  disabled: false,
  isScenarioPublished: false
}

const getComponent = (props?: Partial<FileDetailFooterProps>) => <FileDetailFooter {...{...defaultProps, ...props}} />

describe("file-detail-footer", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)

    const cardFooter = tree.find(CardFooter)
    expect(cardFooter).toHaveLength(1)

    const settingsFooterCards = cardFooter.dive().find(SettingsFooterCard)
    expect(settingsFooterCards).toHaveLength(1)

    const firstOverviewCard = settingsFooterCards.at(0).dive().find(OverviewCard)
    expect(firstOverviewCard).toHaveLength(1)
    const firstOverviewCardContent = firstOverviewCard.dive().find(Card)
    expect(firstOverviewCardContent).toHaveLength(1)
    const customSelect = firstOverviewCardContent.dive().find(CustomSelect)
    expect(customSelect).toHaveLength(1)

    const interventionsSettingsCard = cardFooter.dive().find(InterventionSettingsCard)
    expect(interventionsSettingsCard).toHaveLength(1)
  })
})
