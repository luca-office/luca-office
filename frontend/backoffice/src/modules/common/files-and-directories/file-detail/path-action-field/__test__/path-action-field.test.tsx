import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {NodeType} from "shared/enums/node-type"
import {DirectoryNode} from "shared/models"
import {Option} from "shared/utils"
import {PathActionField, PathActionFieldProps} from "../path-action-field"

const defaultProps: PathActionFieldProps = {
  parentDirectory: Option.none(),
  t: jest.fn(),
  disabled: false,
  onMoveClick: jest.fn()
}

const useComponent = (props?: Partial<PathActionFieldProps>) => <PathActionField {...defaultProps} {...props} />

describe("PathActionField", () => {
  it("renders correctly", () => {
    const component = useComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(useComponent())

    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(2)
  })

  it("renders correct icon without parentId", () => {
    const component = shallow(useComponent())

    expect(component.find(Icon).prop("name")).toEqual(IconName.HardDrive)
  })

  it("renders correct icon with parentId", () => {
    const component = shallow(
      useComponent({
        parentDirectory: Option.of<DirectoryNode>({
          children: [],
          id: "fsdfijsdf",
          name: "test",
          parentId: null,
          type: NodeType.Directory
        })
      })
    )

    expect(component.find(Icon).prop("name")).toEqual(IconName.Folder)
  })
})
