import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {MarkdownEditor, Modal} from "shared/components"
import {MarkdownTextUpdateModal, MarkdownTextUpdateModalProps} from "../markdown-text-update-modal"

const defaultProps: MarkdownTextUpdateModalProps = {
  onConfirm: jest.fn(),
  onDismiss: jest.fn(),
  text: "Test Text",
  title: "Test Title"
}

const getComponent = (props?: Partial<React.PropsWithChildren<MarkdownTextUpdateModalProps>>) => (
  <MarkdownTextUpdateModal {...{...defaultProps, ...props}} />
)

describe("markdown-test-update-modal", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Modal)).toHaveLength(1)
    expect(tree.find(MarkdownEditor)).toHaveLength(1)
  })
})
