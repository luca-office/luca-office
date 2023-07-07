// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {CreateProjectModal} from "../create-project-modal"
import * as createProjectModalHook from "../hooks/use-create-project-modal"
import {UseCreateProjectHook} from "../hooks/use-create-project-modal"

const hookValuesDefault: UseCreateProjectHook = {
  createProject: jest.fn(),
  createProjectLoading: false,
  formMethods: mockedFormMethods,
  dismissModal: jest.fn()
}

const stateSpy = jest.spyOn(createProjectModalHook, "useCreateProjectModal")

describe("create-project-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<CreateProjectModal />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault})

    const component = shallow(<CreateProjectModal />)
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
      createProject,
      formMethods: {...mockedFormMethods, handleSubmit} as any
    })

    const component = mount(<CreateProjectModal />)
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
      createProject,
      formMethods: {
        ...mockedFormMethods,
        errors: {title: undefined, description: {type: "error", message: "Error at Field"}},
        handleSubmit
      } as any
    })

    const component = mount(<CreateProjectModal />)

    component.find(".confirm-button").last().simulate("click")
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(createProject).toHaveBeenCalledTimes(0)
  })
})
