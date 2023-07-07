import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {UploadFileType as FileType} from "../../../../../enums"
import {Icon} from "../../../../icon/icon"
import {Heading, Text} from "../../../../typography/typography"
import {AcceptedFileTypes} from "../accepted-file-types"

const component = <AcceptedFileTypes fileTypes={[FileType.Video]} />

describe("accepted-file-types", () => {
  it("renders correctly", () => {
    const tree = create(component)
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const tree = shallow(component)
    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(2)
  })
})
