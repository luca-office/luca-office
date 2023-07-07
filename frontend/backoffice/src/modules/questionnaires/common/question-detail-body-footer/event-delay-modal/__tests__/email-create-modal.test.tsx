import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {Controller} from "react-hook-form"
import {create} from "react-test-renderer"
import {CustomSelect, Modal, Overlay, TextInput} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import wait from "waait"
import {EventDelayModal, EventDelayModalProps} from "../event-delay-modal"
import * as useEventDelayModalHook from "../hooks/use-event-delay-modal"
import {UseEventDelayModalHook} from "../hooks/use-event-delay-modal"

const unitOptions = [{label: "TestLabel", value: "TestValue"}]
const defaultProps: EventDelayModalProps = {
  maxScenarioDuration: 30,
  onDismiss: jest.fn(),
  onSubmit: jest.fn(),
  existingDurations: [5],
  delayInSeconds: 10
}

const hookValuesDefault: UseEventDelayModalHook = {
  formMethods: mockedFormMethods,
  unitOptions,
  isConfirmDisabled: false
}

const stateSpy = jest.spyOn(useEventDelayModalHook, "useEventDelayModal")

describe("events-delay-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<EventDelayModal {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EventDelayModal {...defaultProps} />)

    await act(() => wait(0))

    const overlay = tree.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(Controller)).toHaveLength(1)
    expect(modalContent.find(Controller).dive().find(CustomSelect)).toHaveLength(1)
    expect(modalContent.find(TextInput)).toHaveLength(1)
  })
})
