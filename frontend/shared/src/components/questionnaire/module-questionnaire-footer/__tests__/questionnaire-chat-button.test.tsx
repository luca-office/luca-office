import {shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {Text} from "../../../../components"
import {QuestionnaireChatButton, QuestionnaireChatButtonProps} from "../questionnaire-chat-button"

const defaultProps: QuestionnaireChatButtonProps = {
  isDisabled: false,
  onClick: jest.fn(),
  newMessagesCount: 0
}

const getComponent = (props?: Partial<QuestionnaireChatButtonProps>) => (
  <QuestionnaireChatButton {...{...defaultProps, ...props}} />
)

describe("QuestionnaireChatButton", () => {
  it("renders correctly with default props", () => {
    const component = create(getComponent())
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("should trigger if chat is enabled", () => {
    const onClick = jest.fn()
    const component = shallow(getComponent({onClick}))

    component.simulate("click")
    expect(onClick).toBeCalledTimes(1)
  })

  it("should NOT trigger if chat is disabled", () => {
    const onClick = jest.fn()
    const component = shallow(getComponent({isDisabled: true, onClick}))

    component.simulate("click")
    expect(onClick).toBeCalledTimes(0)
  })

  it("should have correct structure (default props)", () => {
    const component = shallow(getComponent())

    expect(component.find(Text)).toHaveLength(0)
  })
})
