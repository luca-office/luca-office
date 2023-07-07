import {Control} from "react-hook-form"

const mockedControl: Control = {
  fieldArrayValuesRef: {current: {}},
  isFormDirty: jest.fn(),
  fieldArrayDefaultValuesRef: {current: {}},
  shouldUnregister: false,
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
  updateFormState: jest.fn(),
  shallowFieldsStateRef: {current: {}},
  useWatchFieldsRef: {current: {}},
  useWatchRenderFunctionsRef: {current: {}},
  updateWatchedValue: jest.fn(),
  defaultValuesRef: {current: {}},
  fieldArrayNamesRef: {current: new Set([])},
  fieldsRef: {current: {}},
  fieldsWithValidationRef: {current: new Set([])},
  getValues: jest.fn(),
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
  register: jest.fn(),
  unregister: jest.fn(),
  setValue: jest.fn(),
  trigger: jest.fn(),
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
  removeFieldEventListener: jest.fn(),
  resetFieldArrayFunctionRef: {current: {}},
  validateResolver: jest.fn(),
  validFieldsRef: {current: new Set()},
  watchInternal: jest.fn()
}

export const mockedFormMethods: any = {
  register: jest.fn(),
  handleSubmit: jest.fn(),
  watch: jest.fn(),
  setValue: jest.fn(),
  control: mockedControl,
  errors: {title: undefined, description: undefined},
  getValues: jest.fn()
}
