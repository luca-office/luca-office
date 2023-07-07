import {shallow} from "enzyme"
import * as React from "react"
import {act} from "react-dom/test-utils"
import {Controller} from "react-hook-form"
import {act as actRenderer, create} from "react-test-renderer"
import {
  Column,
  Columns,
  FormErrorText,
  Modal,
  Overlay,
  SelectableCard,
  Text,
  TextInput,
  Tooltip
} from "shared/components"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import wait from "waait"
import {emailsMock} from "../../../hooks/__mocks__/emails.mock"
import {EmailDelayModal, EmailDelayModalProps} from "../email-delay-modal"
import * as useEmailDelayModalHook from "../hooks/use-email-delay-modal"
import {EmailTemporalStage, UseEmailDelayModalHook} from "../hooks/use-email-delay-modal"

const options = [
  {value: "1", label: "a"},
  {value: "2", label: "b"},
  {value: "3", label: "c"}
]
const email = emailsMock[0]

const defaultProps: EmailDelayModalProps = {
  email,
  onDismiss: jest.fn(),
  emailOpeningInterventions: []
}

const hookValuesDefault: UseEmailDelayModalHook = {
  formMethods: mockedFormMethods,
  receptionDelayOptions: options,
  updateEmailDelay: jest.fn(() => Promise.resolve(Option.of(email))),
  maxFutureDelay: Option.of(120),
  selectedTemporalStage: EmailTemporalStage.Present,
  toggleTemporalStage: jest.fn()
}

const stateSpy = jest.spyOn(useEmailDelayModalHook, "useEmailDelayModal")

describe("email-delay-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<EmailDelayModal {...defaultProps} />)
    await actRenderer(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EmailDelayModal {...defaultProps} />)

    await act(() => wait(0))

    const overlay = tree.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const content = modal.dive()
    expect(content.find(Text)).toHaveLength(1)
    expect(content.find(Columns)).toHaveLength(2)
    expect(content.find(Column)).toHaveLength(5)
    expect(content.find(SelectableCard)).toHaveLength(3)
    expect(content.find(Tooltip)).toHaveLength(2)
    expect(content.find(FormErrorText)).toHaveLength(1)
    expect(content.find(TextInput)).toHaveLength(1)
    expect(content.find(Controller)).toHaveLength(1)
  })
  it("has correct structure past selected", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, selectedTemporalStage: EmailTemporalStage.Past})
    const tree = shallow(<EmailDelayModal {...defaultProps} />)

    await act(() => wait(0))

    expect(tree.find(SelectableCard).first().prop("selected")).toBe(true)
    expect(tree.find(SelectableCard).at(1).prop("selected")).toBe(false)
    expect(tree.find(SelectableCard).at(2).prop("selected")).toBe(false)
  })
  it("shows tooltip for disabled card if trash or sent", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EmailDelayModal {...defaultProps} email={{...email, directory: EmailDirectory.Trash}} />)

    await act(() => wait(0))

    expect(tree.find(Tooltip).first().prop("inactive")).toBe(false)
    expect(tree.find(Tooltip).last().prop("inactive")).toBe(false)
  })
  it("shows no tooltip in inbox", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(<EmailDelayModal {...defaultProps} email={{...email, directory: EmailDirectory.Inbox}} />)

    await act(() => wait(0))

    expect(tree.find(Tooltip).first().prop("inactive")).toBe(true)
    expect(tree.find(Tooltip).last().prop("inactive")).toBe(true)
  })
})
