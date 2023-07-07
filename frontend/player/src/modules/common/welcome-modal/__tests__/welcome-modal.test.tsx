import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Text} from "shared/components"
import {WelcomeModal, WelcomeModalProps} from "../welcome-modal"

const startSpy = jest.fn()
const defaultProps: WelcomeModalProps = {
  title: "Test Project",
  welcomeText: "Lorem Ipsum",
  onStartClicked: startSpy
}

const getComponent = (props?: Partial<WelcomeModalProps>) => <WelcomeModal {...{...defaultProps, ...props}} />

describe("welcome-modal", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = shallow(getComponent())

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Text).first().html()).toContain(defaultProps.welcomeText)
    expect(component.find(Modal).dive().find(".confirm-button")).toHaveLength(1)
    component.find(Modal).dive().find(".confirm-button").simulate("click")
    expect(startSpy).toHaveBeenCalled()
  })
})
