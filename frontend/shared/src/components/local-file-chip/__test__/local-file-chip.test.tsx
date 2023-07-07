import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Icon} from "../../icon/icon"
import {Paper} from "../../paper/paper"
import {Text} from "../../typography/typography"
import {LocalFileChip} from "../local-file-chip"

const component = <LocalFileChip onCloseClick={jest.fn()} iconName={IconName.Image} title="test" />

describe("local-file-chip", () => {
  it("renders correctly", () => {
    const tree = create(component)
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const tree = shallow(component)
    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(Icon)).toHaveLength(2)
    expect(tree.find(Text)).toHaveLength(1)
  })
})
