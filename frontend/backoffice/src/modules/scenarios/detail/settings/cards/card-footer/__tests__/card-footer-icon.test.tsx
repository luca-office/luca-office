import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CardFooterItem} from "shared/components"
import {IconName} from "shared/enums"
import {CardFooterIcon, CardFooterIconProps} from "../card-footer-icon"

const defaultProps: CardFooterIconProps = {
  isFinalized: false
}

const getComponent = (props?: Partial<CardFooterIconProps>) => <CardFooterIcon {...{...defaultProps, ...props}} />

describe("card-footer-icon", () => {
  it("renders correctly (finalized)", () => {
    const component = getComponent({isFinalized: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (not finalized)", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (finalized)", () => {
    const component = getComponent({isFinalized: true})
    const tree = shallow(component)

    const footerItem = tree.find(CardFooterItem)
    expect(footerItem).toHaveLength(1)
    expect(footerItem.prop("icon")).toEqual(IconName.LockClosed)
  })
  it("has correct structure (not finalized)", () => {
    const component = getComponent()
    const tree = shallow(component)

    const footerItem = tree.find(CardFooterItem)
    expect(footerItem).toHaveLength(1)
    expect(footerItem.prop("icon")).toEqual(IconName.EditBordered)
  })
})
