import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {ContentImage, ImageViewer} from "shared/components"
import {imageBinariesMock} from "shared/components/binary-viewer/__mocks__/binaries.mock"
import {deleteReferenceBookContentMutation} from "shared/graphql/mutations"
import {BinaryFile} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {BinaryUpdateModal} from "../../../../../components"
import * as useReferenceBookImageHook from "../hooks/use-reference-book-image"
import {UseReferenceBookImageHook} from "../hooks/use-reference-book-image"
import {ReferenceBookImage, ReferenceBookImageProps} from "../reference-book-image"

const referenceBookChapter = referenceBookChapterMock()
const referenceBookArticle = referenceBookChapter.articles[0]
const referenceBookContent = referenceBookArticle.contents[0]

const defaultProps: ReferenceBookImageProps = {
  contentId: referenceBookContent.id,
  imageUrl: `${referenceBookContent.imageUrl}`,
  readonly: false,
  referenceBookChapterId: referenceBookChapter.id,
  imageFile: Option.of((imageBinariesMock[0] as unknown) as BinaryFile)
}

const hookValuesDefault: UseReferenceBookImageHook = {
  hideUpdateModal: jest.fn(),
  operationLoading: false,
  showUpdateModal: jest.fn(),
  updateImage: jest.fn(),
  updateModalVisible: false,
  isDeleteOrlyVisible: false,
  setIsDeleteOrlyVisible: jest.fn(),
  viewerModalVisible: false,
  setViewerModalVisible: jest.fn
}

const stateSpy = jest.spyOn(useReferenceBookImageHook, "useReferenceBookImage")

const getComponent = (props?: Partial<ReferenceBookImageProps>) => (
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
    <ReferenceBookImage {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("reference-book-image", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent())

    await act(() => wait(0))

    const referenceBookImage = tree.find(ReferenceBookImage)
    const content = referenceBookImage.dive()

    const image = content.find(ContentImage)
    expect(image).toHaveLength(1)
    expect(image.prop("imageUrl")).toContain(defaultProps.imageUrl)
    expect(content.find(".edit-overlay")).toHaveLength(1)
    expect(content.find(BinaryUpdateModal)).toHaveLength(0)
  })
  it("has correct structure (readonly)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent({readonly: true}))

    await act(() => wait(0))

    const referenceBookImage = tree.find(ReferenceBookImage)
    const content = referenceBookImage.dive()

    const image = content.find(ContentImage)
    expect(image).toHaveLength(1)
    expect(image.prop("imageUrl")).toContain(defaultProps.imageUrl)
    expect(content.find(".edit-overlay")).toHaveLength(1)
    expect(content.find(BinaryUpdateModal)).toHaveLength(0)
  })
  it("has correct structure (update-modal visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, updateModalVisible: true})
    const tree = shallow(getComponent())

    await act(() => wait(0))

    const referenceBookImage = tree.find(ReferenceBookImage)
    const content = referenceBookImage.dive()

    const image = content.find(ContentImage)
    expect(image).toHaveLength(1)
    expect(image.prop("imageUrl")).toContain(defaultProps.imageUrl)
    expect(content.find(".edit-overlay")).toHaveLength(1)
    expect(content.find(BinaryUpdateModal)).toHaveLength(1)
  })
  it("has correct structure (viewer visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, viewerModalVisible: true})
    const tree = shallow(getComponent({readonly: true}))

    await act(() => wait(0))

    const referenceBookImage = tree.find(ReferenceBookImage)
    const content = referenceBookImage.dive()

    const image = content.find(ContentImage)
    expect(image).toHaveLength(1)
    expect(image.prop("imageUrl")).toContain(defaultProps.imageUrl)
    expect(content.find(".edit-overlay")).toHaveLength(1)
    expect(content.find(ImageViewer)).toHaveLength(1)
  })
})
