import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {DeleteOrArchiveEntityButton, Icon, Text} from "shared/components"
import {deleteReferenceBookContentMutation} from "shared/graphql/mutations"
import {Option} from "shared/utils"
import {PdfBar, PdfBarContainerProps} from "../pdf-bar"

const referenceBookChapter = referenceBookChapterMock()
const referenceBookArticle = referenceBookChapter.articles[1]
const referenceBookContent = {
  ...referenceBookArticle.contents[3]
}
const props: PdfBarContainerProps = {
  readonly: false,
  title: referenceBookContent.pdfBinaryFile!.filename,
  referenceBookChapterId: referenceBookChapter.id,
  pdfFile: Option.of(referenceBookContent.pdfBinaryFile),
  contentId: referenceBookContent.pdfBinaryFileId!
}

describe("content-type-dialog", () => {
  const getComponent = () => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: deleteReferenceBookContentMutation,
            variables: {
              id: referenceBookContent.id
            }
          },
          result: {
            data: {
              deleteReferenceBookContent: referenceBookContent.id
            }
          }
        }
      ]}
      addTypename={true}>
      <PdfBar
        {...props}
        deleteOrlyVisible={false}
        setViewerModalVisible={jest.fn()}
        viewerModalVisible={false}
        setDeleteOrlyVisible={jest.fn()}
      />
    </MockedProvider>
  )

  it("renders correctly", () => {
    const tree = create(getComponent()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const tree = shallow(getComponent()).find(PdfBar).dive()
    const icon = tree.find(Icon)
    expect(icon).toHaveLength(1)
    const text = tree.find(Text)
    expect(text).toHaveLength(1)
    const deleteButton = tree.find(DeleteOrArchiveEntityButton)
    expect(deleteButton).toHaveLength(1)
  })
})
