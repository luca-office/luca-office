// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import * as createSampleCompanyModal from "../hooks/use-create-sample-company-modal"
import {UseCreateSampleCompanyHook} from "../hooks/use-create-sample-company-modal"
import {CreateSampleCompaniesModal} from "../sample-companies-create-modal"

const hookValuesDefault: UseCreateSampleCompanyHook = {
  createSampleCompany: jest.fn(),
  createSampleCompanyLoading: false,
  formMethods: mockedFormMethods,
  dismissModal: jest.fn()
}

const stateSpy = jest.spyOn(createSampleCompanyModal, "useCreateSampleCompanyModal")

describe("create-sample-company-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<CreateSampleCompaniesModal />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault})

    const component = shallow(<CreateSampleCompaniesModal />)
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(TextArea)).toHaveLength(1)
  })

  it("triggers dismiss correctly", async () => {
    const dismissModal = jest.fn()
    const createSampleCompany = jest.fn()
    const handleSubmit = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      dismissModal,
      createSampleCompany: createSampleCompany,
      formMethods: {...mockedFormMethods, handleSubmit} as any
    })

    const component = mount(<CreateSampleCompaniesModal />)
    const onDismissHandler = component.find(Modal).prop("onDismiss")
    if (onDismissHandler) {
      onDismissHandler()
      expect(dismissModal).toHaveBeenCalledTimes(1)
    }
  })

  it("does not submit with field errors", async () => {
    const handleSubmit = jest.fn()
    const createSampleCompany = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      createSampleCompany: createSampleCompany,
      formMethods: {
        ...mockedFormMethods,
        errors: {title: undefined, description: {type: "error", message: "Error at Field"}},
        handleSubmit
      } as any
    })

    const component = mount(<CreateSampleCompaniesModal />)

    component.find(".confirm-button").last().simulate("click")
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(createSampleCompany).toHaveBeenCalledTimes(0)
  })
})
