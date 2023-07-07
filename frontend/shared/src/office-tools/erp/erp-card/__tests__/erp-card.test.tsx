import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ErpCard, ErpCardProps} from "../erp-card"

const defaultProps: ErpCardProps = {
  title: "Angebotsübersicht",
  onChangeSearch: jest.fn()
}

const getComponent = (props?: Partial<React.PropsWithChildren<ErpCardProps>>) => (
  <ErpCard {...{...defaultProps, ...props}} />
)

describe("ErpCard", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders children correctly", () => {
    const component = getComponent({children: <div className={"erp-card-child"} />})
    const tree = shallow(component)

    const child = tree.find(".erp-card-child")
    expect(child).toHaveLength(1)
  })
})
