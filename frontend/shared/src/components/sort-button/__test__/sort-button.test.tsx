// importing from direct file because of issues of babel loader and spyOn
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Option} from "../../../utils"
import {Icon} from "../../icon/icon"
import {Tooltip} from "../../tooltip/tooltip"
import {SortButton} from "../sort-button"

const sortButton = <SortButton onClick={jest.fn()} tableSortState={Option.none()} toolTipText="text" />

describe("sort-button", () => {
  it("renders correctly", async () => {
    const component = create(sortButton)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = shallow(sortButton)

    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Tooltip)).toHaveLength(1)
  })
  it("triggers action correctly", async () => {
    const handleClick = jest.fn()
    const component = shallow(<SortButton onClick={handleClick} tableSortState={Option.none()} toolTipText="text" />)

    component.find(Icon).simulate("click")
    expect(handleClick).toBeCalledTimes(1)
  })
})
