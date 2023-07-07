import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {Controller} from "react-hook-form"
import {create} from "react-test-renderer"
import {CustomSelect, Modal, Overlay, TextInput} from "shared/components"
import {scenariosMock} from "shared/graphql/__mocks__"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import wait from "waait"
import {Route} from "../../../../routes"
import {CreateEmailModalProps, EmailCreateModal} from "../email-create-modal"
import * as useEmailCreateModalHook from "../hooks/use-email-create-modal"
import {UseEmailCreateModalHook} from "../hooks/use-email-create-modal"

const scenarioId = scenariosMock[0].id
const directoryOptions = [
  {value: EmailDirectory.Inbox, label: "email__directory_inbox"},
  {value: EmailDirectory.Sent, label: "email__directory_sent"},
  {value: EmailDirectory.Trash, label: "email__directory_trash"}
]

const defaultProps: CreateEmailModalProps = {
  scenarioId,
  directory: EmailDirectory.Inbox,
  navigationConfig: {
    route: Route.ScenarioEmails,
    payload: {scenarioId, directory: EmailDirectory.Inbox}
  },
  isIntroductionEmail: false
}

const hookValuesDefault: UseEmailCreateModalHook = {
  formMethods: mockedFormMethods,
  createEmail: jest.fn(),
  createEmailLoading: false,
  dismissModal: jest.fn(),
  directoryOptions,
  senderOrRecipientInputLabelKey: "email__directory_sender",
  isConfirmDisabled: false
}

const stateSpy = jest.spyOn(useEmailCreateModalHook, "useEmailCreateModal")

describe("email-create-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<EmailCreateModal {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EmailCreateModal {...defaultProps} />)

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
  it("has correct structure for introduction mail", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EmailCreateModal {...defaultProps} isIntroductionEmail={true} />)

    await act(() => wait(0))

    const overlay = tree.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(Controller)).toHaveLength(1)
    expect(modalContent.find(Controller).dive().find(CustomSelect)).toHaveLength(1)
    expect(modalContent.find(Controller).dive().find(CustomSelect).prop("disabled")).toBeTruthy()
    expect(modalContent.find(TextInput)).toHaveLength(1)
  })
})
