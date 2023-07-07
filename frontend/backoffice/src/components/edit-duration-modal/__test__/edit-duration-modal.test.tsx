import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Column, Columns, Label, Modal, Overlay, Paper, Text} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {EditDurationModal} from "../edit-duration-modal"

describe("edit-duration-modal", () => {
  it("renders correctly", async () => {
    const component = create(
      <EditDurationModal
        timeUnitOptions={[{label: "Minuten", value: "minutes"}]}
        maximumReceptionDelay={{entityLanguageKey: "email", delayInSeconds: 60}}
        formMethods={mockedFormMethods}
        onDismiss={jest.fn()}
        onConfirm={jest.fn()}
        areMaximumReceptionDelaysLoading={false}
        titleKey="title"
        selectLabelKey="select"
        descriptionKey="description"
      />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = shallow(
      <EditDurationModal
        timeUnitOptions={[{label: "Minuten", value: "minutes"}]}
        maximumReceptionDelay={{entityLanguageKey: "email", delayInSeconds: 60}}
        formMethods={mockedFormMethods}
        onDismiss={jest.fn()}
        onConfirm={jest.fn()}
        areMaximumReceptionDelaysLoading={false}
        titleKey="title"
        selectLabelKey="select"
        descriptionKey="description"
      />
    )
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(Columns)).toHaveLength(1)
    expect(component.find(Column)).toHaveLength(2)

    expect(component.find(Modal).prop("confirmButtonDisabled")).toBe(false)
  })

  it("has correct structure with loading reception delays", async () => {
    const component = shallow(
      <EditDurationModal
        timeUnitOptions={[{label: "Minuten", value: "minutes"}]}
        maximumReceptionDelay={{entityLanguageKey: "email", delayInSeconds: 60}}
        formMethods={mockedFormMethods}
        onDismiss={jest.fn()}
        onConfirm={jest.fn()}
        areMaximumReceptionDelaysLoading={true}
        titleKey="title"
        selectLabelKey="select"
        descriptionKey="description"
      />
    )
    expect(component.find(Overlay)).toHaveLength(1)
    const modal = component.find(Modal)
    expect(modal).toHaveLength(1)
    expect(modal.prop("confirmButtonDisabled")).toBe(true)
  })
})
