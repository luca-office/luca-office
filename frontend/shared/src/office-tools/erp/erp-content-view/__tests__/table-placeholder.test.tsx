import {shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {Text} from "../../../../components"
import {TablePlaceholder, TablePlaceholderProps} from "../table-placeholder"

const defaultProps: TablePlaceholderProps = {
  subTitle: "subTitle"
}

const getComponent = (props?: Partial<TablePlaceholderProps>) => <TablePlaceholder {...{...defaultProps, ...props}} />

describe("TablePlaceholder", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure with default props", () => {
    const component = shallow(getComponent())

    expect(component.find(Text)).toHaveLength(1)
  })

  it("renders correctly with main title", () => {
    const component = getComponent({title: "Title"})
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure with extra title", () => {
    const component = shallow(getComponent({title: "Title"}))

    expect(component.find(Text)).toHaveLength(2)
  })
})
