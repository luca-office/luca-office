import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Column, Modal, Paper, Text, TextInput} from "shared/components"
import {IconName} from "shared/enums"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {CreateInterventionModal, CreateInterventionModalProps} from "../../.."
import {TriggerCondition} from "../../../detail/trigger-condition/trigger-condition"

const defaultProps: CreateInterventionModalProps = {
  creationIsLoading: false,
  formMethods: mockedFormMethods,
  onConfirm: jest.fn(),
  onDismiss: jest.fn(),
  timeOffsetDescription: "description",
  titleKey: "title",
  triggerConditionConfig: {descriptionKey: "description", icon: IconName.Add, titleKey: "title"}
}

const getComponent = (props?: Partial<CreateInterventionModalProps>) => (
  <CreateInterventionModal {...{...defaultProps, ...props}} />
)

describe("create-intervention-modal", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Modal)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(3)
    expect(tree.find(TextInput)).toHaveLength(4)
    expect(tree.find(Paper)).toHaveLength(2)
    expect(tree.find(TriggerCondition)).toHaveLength(1)
    expect(tree.find(Column)).toHaveLength(4)
  })

  it("does not submit with field errors", async () => {
    const handleConfirm = jest.fn()

    const component = shallow(
      getComponent({
        onConfirm: handleConfirm,
        formMethods: {
          ...mockedFormMethods,
          errors: {title: undefined, description: {type: "error", message: "Error at Field"}}
        } as any
      })
    )

    component.find(Modal).dive().find(".confirm-button").last().simulate("click")
    expect(handleConfirm).toHaveBeenCalledTimes(0)
  })
})
