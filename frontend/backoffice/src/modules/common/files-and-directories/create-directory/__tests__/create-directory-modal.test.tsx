// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, TextInput} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {CreateDirectoryModal, CreateDirectoryModalProps} from "../create-directory-modal"

const getComponent = (props?: Partial<CreateDirectoryModalProps>) => (
  <CreateDirectoryModal
    onDismiss={jest.fn()}
    titleKey="files_and_directories__create_main_directory_modal_title"
    formMethods={mockedFormMethods}
    onSubmit={jest.fn()}
    createDirectoryLoading={false}
    {...props}
  />
)

describe("create-main-directory-modal", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
  })

  it("does not submit with field errors", async () => {
    const handleSubmit = jest.fn()
    const createDirectory = jest.fn()

    const component = mount(
      getComponent({
        onSubmit: createDirectory,
        formMethods: {
          ...mockedFormMethods,
          errors: {title: undefined, description: {type: "error", message: "Error at Field"}},
          handleSubmit
        }
      })
    )

    component.find(".confirm-button").last().simulate("click")
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(createDirectory).toHaveBeenCalledTimes(0)
  })
})
