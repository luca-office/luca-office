// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CustomSelect, Heading, SettingsFooterCard, Text} from "shared/components"
import {fileMock} from "shared/graphql/__mocks__"
import {InterventionSettingsCard} from "../../../../../../components/intervention-setting-card/intervention-setting-card"
import {FileDetailFooter} from "../file-detail-footer"

const detailFileFooter = (
  <FileDetailFooter
    navigateToIntervention={jest.fn()}
    interventionCount={0}
    onCreateInterventionClick={jest.fn()}
    disabled={false}
    file={fileMock}
    updateFile={jest.fn()}
  />
)

describe("file-detail-footer", () => {
  it("renders correctly", async () => {
    const component = create(detailFileFooter)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = shallow(detailFileFooter)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(SettingsFooterCard)).toHaveLength(1)
    expect(component.find(InterventionSettingsCard)).toHaveLength(1)
    expect(component.find(CustomSelect)).toHaveLength(1)
  })

  it("shows correct intervention title - plural", async () => {
    const component = mount(
      <FileDetailFooter
        navigateToIntervention={jest.fn()}
        interventionCount={5}
        onCreateInterventionClick={jest.fn()}
        disabled={false}
        file={fileMock}
        updateFile={jest.fn()}
      />
    )
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Text).first().prop("children")).toContain("5 files_and_directories__intervention_plural")
  })
  it("shows correct intervention title - singular", async () => {
    const component = mount(
      <FileDetailFooter
        navigateToIntervention={jest.fn()}
        interventionCount={1}
        onCreateInterventionClick={jest.fn()}
        disabled={false}
        file={fileMock}
        updateFile={jest.fn()}
      />
    )
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Text).first().prop("children")).toContain("1 files_and_directories__intervention_singular")
  })
})
