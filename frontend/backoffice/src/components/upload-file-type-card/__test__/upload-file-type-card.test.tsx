import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Card, CardHeader, Heading, Icon} from "shared/components"
import {IconName, UploadFileType as FileType} from "shared/enums"
import {UploadFileTypeCard, UploadFileTypeCardProps} from "../upload-file-type-card"

const defaultProps: UploadFileTypeCardProps = {
  fileType: FileType.Graphic,
  onCloseClick: jest.fn(),
  title: "",
  hasPreviewButton: false,
  openBinaryPreview: jest.fn()
}

const useComponent = (props?: Partial<UploadFileTypeCardProps>) => <UploadFileTypeCard {...defaultProps} {...props} />

describe("fileTypeCard", () => {
  it("renders correctly", () => {
    const component = useComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure - without preview button", () => {
    const component = shallow(useComponent())

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(0)
  })
  it("has correct structure - with preview", () => {
    const component = shallow(useComponent({hasPreviewButton: true}))

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(1)
  })

  it("shows correct icon for PDF", () => {
    const component = shallow(
      useComponent({
        fileType: FileType.PDF
      })
    )
    const icon = component.find(Icon).first()
    expect(icon.prop("name")).toBe(IconName.File)
  })

  it("triggers close correctly", () => {
    const onClose = jest.fn()
    const component = shallow(
      useComponent({
        onCloseClick: onClose,
        hasCloseButton: true
      })
    )
    component.find(Icon).last().simulate("click")
    expect(onClose).toBeCalledTimes(1)
  })
})
