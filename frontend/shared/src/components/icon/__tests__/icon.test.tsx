import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Icon} from "../icon"

describe("Icon", () => {
  it("renders correctly", () => {
    const component = <Icon name={IconName.LucaLogo} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(<Icon name={IconName.Add} width={100} height={200} />)

    expect(component).toBeDefined()
  })
})
