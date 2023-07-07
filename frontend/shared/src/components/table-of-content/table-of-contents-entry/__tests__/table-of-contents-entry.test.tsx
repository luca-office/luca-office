import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName, NodeType} from "../../../../enums"
import {BaseNode} from "../../../../models"
import {Option} from "../../../../utils"
import {Icon, TableOfContentsEntry, TableOfContentsEntryProps, Text} from "../../.."
import {childrenMock} from "../__mocks__/toc-content.mock"

const selectSpy = jest.fn()
const defaultProps: TableOfContentsEntryProps<BaseNode> = {
  selectNode: selectSpy,
  selectedNode: Option.none(),
  node: {
    id: "Test_Id",
    parentId: null,
    name: "Test_Node",
    type: NodeType.Chapter
  }
}

const getComponent = (props?: Partial<TableOfContentsEntryProps<BaseNode>>) => (
  <TableOfContentsEntry {...{...defaultProps, ...props}} />
)

describe("table-of-contents-entry", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly faded", () => {
    const component = getComponent({fadeParent: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(Icon)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(1)
  })
  it("has correct structure with icon", () => {
    const component = shallow(
      getComponent({
        node: {
          id: "Test_Id",
          parentId: null,
          name: "Test_Node",
          type: NodeType.Chapter,
          iconName: IconName.Add
        }
      })
    )
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
  })
  it("has correct structure: selected", () => {
    const component = shallow(getComponent({selectedNode: Option.of(defaultProps.node.id)}))
    expect(component.find(Icon)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(1)
    component.find(".toc-entry-text").first().simulate("click")
    expect(selectSpy).toHaveBeenCalledTimes(1)
  })
  it("has correct structure: hidden", () => {
    const component = shallow(getComponent({hideParent: true}))
    expect(component.find(".toc-entry")).toHaveLength(0)
    expect(component.find(Icon)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(0)
    expect(component.find(TableOfContentsEntry)).toHaveLength(0)
  })
  it("has correct structure: faded", () => {
    const component = shallow(getComponent({fadeParent: true}))
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
  })
  it("handles expanding", () => {
    const component = shallow(getComponent({fadeParent: true, isCollapsible: true, children: childrenMock}))
    expect(component.find(TableOfContentsEntry)).toHaveLength(0)

    component.find(".toc-entry-text").simulate("click")
    expect(selectSpy).toHaveBeenCalledTimes(2)
  })
})
