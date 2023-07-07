import {Control} from "react-hook-form"
import {action} from "@storybook/addon-actions"

const mockedControl: Control = {
  fieldArrayValuesRef: {current: {}},
  isFormDirty: (...args: any) => false,
  fieldArrayDefaultValuesRef: {current: {}},
  shouldUnregister: false,
  formState: {
    isDirty: false,
    dirtyFields: {},
    isSubmitted: false,
    isSubmitSuccessful: false,
    submitCount: 0,
    touched: {},
    isSubmitting: false,
    isValid: true,
    errors: {},
    isValidating: false
  },
  formStateRef: {
    current: {
      isDirty: false,
      dirtyFields: {},
      isSubmitted: false,
      isSubmitSuccessful: false,
      submitCount: 0,
      touched: {},
      isSubmitting: false,
      isValid: true,
      errors: {},
      isValidating: false
    }
  },
  updateFormState: action("updateFormState"),
  shallowFieldsStateRef: {current: {}},
  useWatchFieldsRef: {current: {}},
  useWatchRenderFunctionsRef: {current: {}},
  updateWatchedValue: action("updateWatchedValue"),
  defaultValuesRef: {current: {}},
  fieldArrayNamesRef: {current: new Set([])},
  fieldsRef: {current: {}},
  fieldsWithValidationRef: {current: new Set([])},
  getValues: (...args: any) => ({}),
  mode: {
    isOnAll: false,
    isOnBlur: false,
    isOnChange: true,
    isOnSubmit: false,
    isOnTouch: false
  },
  reValidateMode: {
    isReValidateOnBlur: false,
    isReValidateOnChange: false
  },
  register: (ref: any) => action("register"),
  unregister: action("unregister"),
  setValue: action("setValue"),
  trigger: (name: any) => new Promise(resolve => resolve(name)),
  readFormStateRef: {
    current: {
      isDirty: false,
      dirtyFields: false,
      isSubmitting: false,
      isValid: true,
      touched: false,
      isValidating: false
    }
  },
  removeFieldEventListener: action("removeFieldEventListener"),
  resetFieldArrayFunctionRef: {current: {}},
  validateResolver: action("validateResolver"),
  validFieldsRef: {current: new Set()},
  watchInternal: action("watchInternal")
}

export const storyFormMethods: any = {
  register: action("register"),
  handleSubmit: action("handleSubmit"),
  watch: action("watch"),
  setValue: action("setValue"),
  control: mockedControl,
  errors: {title: undefined, description: undefined}
}
