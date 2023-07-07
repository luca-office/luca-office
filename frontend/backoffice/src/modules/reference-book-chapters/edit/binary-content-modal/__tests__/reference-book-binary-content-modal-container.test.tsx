import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {ReferenceBookContentType} from "shared/enums"
import {Option} from "shared/utils"
import {UploadFileModal} from "../../../../../components"
import {ReferenceBookBinaryContentModalContainer, ReferenceBookBinaryContentModalContainerProps} from "../.."

const referenceBookChapter = referenceBookChapterMock()
const defaultProps: ReferenceBookBinaryContentModalContainerProps = {
  contentType: ReferenceBookContentType.ImageContent,
  onDismiss: jest.fn(),
  onSuccess: jest.fn(),
  referenceBookChapterId: referenceBookChapter.id,
  selectedArticleId: Option.none(),
  createReferenceBookContent: jest.fn()
}

describe("content-type-dialog", () => {
  const getMockComponent = (props = {}) => <ReferenceBookBinaryContentModalContainer {...{...defaultProps, ...props}} />

  it("renders correctly", () => {
    const tree = create(getMockComponent()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getMockComponent())
    expect(component).toBeDefined()
    expect(component.find(UploadFileModal)).toHaveLength(1)
  })
})
