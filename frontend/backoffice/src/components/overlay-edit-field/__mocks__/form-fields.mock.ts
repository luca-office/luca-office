import {OverlayEditCompositeFieldConfig, OverlayEditFieldType} from "../overlay-edit-field"

export const multipleFields: OverlayEditCompositeFieldConfig[] = [
  {
    updateId: "nameId",
    value: "Vorname",
    type: OverlayEditFieldType.TEXT,
    labelKey: "button_edit"
  },
  {
    updateId: "surnameId",
    value: "Nachname",
    type: OverlayEditFieldType.TEXT,
    labelKey: "button_edit" as any
  },
  {
    updateId: "emailId",
    value: "E-mail",
    type: OverlayEditFieldType.PASSWORD,
    labelKey: "label_key" as any
  }
]

export const optionField: OverlayEditCompositeFieldConfig[] = [
  {
    updateId: "optionId",
    value: "E-mail",
    type: OverlayEditFieldType.SELECT,
    labelKey: "label_key" as any,
    options: [
      {label: "option 1", value: "option1"},
      {label: "option 2", value: "option2"}
    ]
  }
]

export const textareaField: OverlayEditCompositeFieldConfig[] = [
  {
    updateId: "optionId",
    value: "sample description",
    type: OverlayEditFieldType.TEXTAREA,
    labelKey: "label_key" as any
  }
]
