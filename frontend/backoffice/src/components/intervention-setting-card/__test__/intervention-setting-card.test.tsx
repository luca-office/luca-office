// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Icon, ReadonlyActionField, SettingsFooterCard, Text} from "shared/components"
import {InterventionSettingsCard} from "../intervention-setting-card"

const interventionSettingsCard = (
  <InterventionSettingsCard
    disabled={false}
    interventionsCount={3}
    navigateToIntervention={jest.fn()}
    onCreateClick={jest.fn()}
  />
)

describe("intervention-setting-card", () => {
  it("renders correctly", async () => {
    const component = create(interventionSettingsCard)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = mount(interventionSettingsCard)
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
    expect(component.find(SettingsFooterCard)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Text)).toHaveLength(1)
  })

  it("has correct structure - no interventions", async () => {
    const component = mount(
      <InterventionSettingsCard
        disabled={false}
        interventionsCount={0}
        navigateToIntervention={jest.fn()}
        onCreateClick={jest.fn()}
      />
    )
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
    expect(component.find(SettingsFooterCard)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
  })
  it("triggers action correctly - 0 intervention", async () => {
    const handleCreate = jest.fn()
    const handleNavigation = jest.fn()

    const component = shallow(
      <InterventionSettingsCard
        disabled={false}
        interventionsCount={0}
        navigateToIntervention={handleNavigation}
        onCreateClick={handleCreate}
      />
    )
    component.find(ReadonlyActionField).simulate("click")
    expect(handleCreate).toHaveBeenCalledTimes(1)
    component.find(Button).simulate("click")
    expect(handleCreate).toHaveBeenCalledTimes(2)
  })
})
