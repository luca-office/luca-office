// importing from direct file because of issues of babel loader and spyOn
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {Modal, Overlay, TextInput} from "shared/components"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {
  CreateReferenceBookArticleModal,
  CreateReferenceBookArticleModalProps
} from "../create-reference-book-article-modal"
import * as createProjectModalHook from "../hooks/use-create-reference-book-article-modal"
import {UseCreateReferenceBookHook} from "../hooks/use-create-reference-book-article-modal"

const hookValuesDefault: UseCreateReferenceBookHook = {
  createReferenceBookArticle: jest.fn(),
  dataLoading: false,
  formMethods: mockedFormMethods,
  dismissModal: jest.fn()
}

const defaultProps: CreateReferenceBookArticleModalProps = {
  referenceBookChapterId: referenceBookChapterMock().id
}

const getComponent = (props?: CreateReferenceBookArticleModalProps) => (
  <CreateReferenceBookArticleModal {...defaultProps} {...props} />
)
const stateSpy = jest.spyOn(createProjectModalHook, "useCreateReferenceBookArticleModal")

describe("create-reference-book-article-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault})

    const component = shallow(getComponent())
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
  })

  it("triggers dismiss correctly", async () => {
    const dismissModal = jest.fn()
    const create = jest.fn()
    const handleSubmit = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      dismissModal,
      createReferenceBookArticle: create,
      formMethods: {...mockedFormMethods, handleSubmit} as any
    })

    const component = mount(getComponent())
    const onDismissHandler = component.find(Modal).prop("onDismiss")
    onDismissHandler!()
    expect(dismissModal).toHaveBeenCalledTimes(1)
  })

  it("does not submit with field errors", async () => {
    const handleSubmit = jest.fn()
    const create = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      createReferenceBookArticle: create,
      formMethods: {
        ...mockedFormMethods,
        errors: {title: {type: "error", message: "Error at Field"}},
        handleSubmit
      } as any
    })

    const component = mount(getComponent())

    component.find(".confirm-button").last().simulate("click")
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(create).toHaveBeenCalledTimes(0)
  })
})
