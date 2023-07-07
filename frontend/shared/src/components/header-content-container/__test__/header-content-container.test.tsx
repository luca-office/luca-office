import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Card, CardHeader, Text} from "../.."
import {OrlyButtonContainer} from "../../orly-button/orly-button"
import {HeaderContentContainer, HeaderContentContainerProps} from "../header-content-container"

const onConfrmSpy = jest.fn()
const defaultProps: HeaderContentContainerProps = {
  headerTitleKey: "placeholder",
  headerIconName: IconName.AlignmentLeft,
  disabled: false
}

const getComponent = (props?: Partial<React.PropsWithChildren<HeaderContentContainerProps>>) => (
  <HeaderContentContainer {...{...defaultProps, ...props}} />
)

describe("header-content-container", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("renders structure correctly (no onConfirm)", () => {
    const component = getComponent({children: <Text>Test</Text>})
    const tree = shallow(component)

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(OrlyButtonContainer)).toHaveLength(0)
  })

  it("renders structure correctly (with onConfirm)", () => {
    const component = getComponent({children: <Text>Test</Text>, onConfirm: onConfrmSpy})
    const tree = shallow(component)

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(OrlyButtonContainer)).toHaveLength(1)
  })
})
