import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Card, CardHeader} from "../../card"
import {Icon} from "../../icon/icon"
import {Heading} from "../../typography/typography"
import {SelectableCard, SelectableCardProps, SelectionIconType} from "../selectable-card"

const onClickSpy = jest.fn()
const defaultProps: SelectableCardProps = {
  title: "Title",
  iconName: IconName.Add,
  text: "Text",
  selected: false,
  onClick: onClickSpy
}

const getComponent = (props?: Partial<SelectableCardProps>) => <SelectableCard {...{...defaultProps, ...props}} />

describe("selectable-card", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)
    const html = tree.html()

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(html).toContain("Title")
    expect(html).toContain("Text")
  })

  it("onClick is triggered on click of Card Component", () => {
    const component = getComponent()
    const tree = shallow(component)

    const card = tree.find(Card)
    card.simulate("click")

    expect(onClickSpy).toHaveBeenCalledTimes(1)
  })

  it("has correct structure with selection", () => {
    const component = getComponent({selectionIconType: SelectionIconType.CHECK})
    const tree = shallow(component)

    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Icon).prop("name")).toEqual(IconName.Add)

    expect(onClickSpy).toHaveBeenCalledTimes(1)
  })
})
