import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DetailViewCard} from "shared/components"
import {scenariosMock} from "shared/graphql/__mocks__"
import {SettingsFooter} from "../../settings-footer/settings-footer"
import {CodingModelsCard} from "../cards/coding-model-card"
import {EventsCard} from "../cards/events-card"
import {FilesAndFolderCard} from "../cards/files-and-folder-card"
import {InterventionsCard} from "../cards/interventions-card"
import {ReferenceBooksCard} from "../cards/reference-books-card"
import {SampleCompanyCard} from "../cards/sample-company-card"
import {ScenarioSettings, ScenarioSettingsProps} from "../scenario-settings"

const defaultProps: ScenarioSettingsProps = {
  scenario: scenariosMock[0],
  navigateToFilesAndDirectories: jest.fn(),
  navigateToSampleCompaniesSelection: jest.fn(),
  navigateToCodingModels: jest.fn(),
  isReadOnly: false,
  navigateToEmails: jest.fn,
  navigateToReferenceBookChapters: jest.fn,
  navigateToInterventions: jest.fn,
  settingsCount: {
    directories: 5,
    emails: 12,
    files: 3,
    scenarioReferenceBooks: 5,
    filesSampleCompany: 10,
    interventions: 0,
    events: 12,
    codingDimensions: 3,
    erpRowCount: 1
  },
  navigateToEvents: jest.fn
}

const getComponent = (props?: Partial<ScenarioSettingsProps>) => <ScenarioSettings {...{...defaultProps, ...props}} />

describe("scenario-settings", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = mount(getComponent())
    expect(component.find(SampleCompanyCard)).toHaveLength(1)
    expect(component.find(FilesAndFolderCard)).toHaveLength(1)
    expect(component.find(ReferenceBooksCard)).toHaveLength(1)
    expect(component.find(InterventionsCard)).toHaveLength(1)
    expect(component.find(CodingModelsCard)).toHaveLength(1)
    expect(component.find(EventsCard)).toHaveLength(1)
    expect(component.find(DetailViewCard)).toHaveLength(1)
    expect(component.find(SettingsFooter)).toHaveLength(1)
  })
  it("renders correctly with finalized", () => {
    const component = mount(getComponent({isReadOnly: true}))
    expect(component.find(SampleCompanyCard)).toHaveLength(1)
    expect(component.find(FilesAndFolderCard)).toHaveLength(1)
    expect(component.find(ReferenceBooksCard)).toHaveLength(1)
    expect(component.find(InterventionsCard)).toHaveLength(1)
    expect(component.find(CodingModelsCard)).toHaveLength(1)
    expect(component.find(EventsCard)).toHaveLength(1)
    expect(component.find(DetailViewCard)).toHaveLength(1)
    expect(component.find(SettingsFooter)).toHaveLength(1)
  })
})
