import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card} from "shared/components"
import {CreationBar} from "../creation-bar"

describe("creation-bar", () => {
  const mockComponent = <CreationBar title="Creation Bar" onCreate={jest.fn()} />

  it("renders correctly", () => {
    const component = mockComponent
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(mockComponent)
    expect(component).toBeDefined()
  })

  it("calls onCreate", () => {
    const mockOnCreate = jest.fn()
    const component = <CreationBar title="Creation Bar" onCreate={mockOnCreate} />
    const tree = mount(component)

    const card = tree.find(Card)
    expect(card).toHaveLength(1)

    card.props().onClick!({} as React.MouseEvent<HTMLDivElement>)
    expect(mockOnCreate).toHaveBeenCalledTimes(1)
  })
})
