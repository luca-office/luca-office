// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {CreateReferenceBookModal} from "../create-reference-book-modal"
import * as createProjectModalHook from "../hooks/use-create-reference-book-modal"
import {UseCreateReferenceBookHook} from "../hooks/use-create-reference-book-modal"

const hookValuesDefault: UseCreateReferenceBookHook = {
  createReferenceBook: jest.fn(),
  createReferenceBookLoading: false,
  formMethods: mockedFormMethods,
  dismissModal: jest.fn()
}

const stateSpy = jest.spyOn(createProjectModalHook, "useCreateReferenceBookModal")

describe("create-reference-book-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<CreateReferenceBookModal />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault})

    const component = shallow(<CreateReferenceBookModal />)
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(TextArea)).toHaveLength(1)
  })

  it("triggers dismiss correctly", async () => {
    const dismissModal = jest.fn()
    const createProject = jest.fn()
    const handleSubmit = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      dismissModal,
      createReferenceBook: createProject,
      formMethods: {...mockedFormMethods, handleSubmit} as any
    })

    const component = mount(<CreateReferenceBookModal />)
    const onDismissHandler = component.find(Modal).prop("onDismiss")
    if (onDismissHandler) {
      onDismissHandler()
      expect(dismissModal).toHaveBeenCalledTimes(1)
    }
  })

  it("does not submit with field errors", async () => {
    const handleSubmit = jest.fn()
    const createProject = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      createReferenceBook: createProject,
      formMethods: {
        ...mockedFormMethods,
        errors: {title: undefined, description: {type: "error", message: "Error at Field"}},
        handleSubmit
      } as any
    })

    const component = mount(<CreateReferenceBookModal />)

    component.find(".confirm-button").last().simulate("click")
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(createProject).toHaveBeenCalledTimes(0)
  })
})
