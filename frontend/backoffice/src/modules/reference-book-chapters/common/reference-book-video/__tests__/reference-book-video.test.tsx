import {MockedProvider} from "@apollo/client/testing"
import {act, render, screen} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {referenceBookChapterMock} from "shared/__mocks__"
import {VideoViewer} from "shared/components"
import {videoBinariesMock} from "shared/components/binary-viewer/__mocks__/binaries.mock"
import {MimeType} from "shared/graphql/generated/globalTypes"
import {deleteReferenceBookContentMutation} from "shared/graphql/mutations"
import {BinaryFile} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {BinaryUpdateModal} from "../../../../../components"
import * as useReferenceBookVideoHook from "../hooks/use-reference-book-video"
import {UseReferenceBookVideoHook} from "../hooks/use-reference-book-video"
import {ReferenceBookVideo, ReferenceBookVideoProps} from "../reference-book-video"
import "@testing-library/jest-dom"

const referenceBookChapter = referenceBookChapterMock()
const referenceBookArticle = referenceBookChapter.articles[0]
const referenceBookContent = {
  ...referenceBookArticle.contents[0],
  imageBinaryFileId: null,
  videoBinaryFileId: "a39fcd97-942b-4750-a5a8-05e82565b0f2",
  videoUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/3dd596c7-b766-4fb2-9a8d-7b4a0a318c0e",
  imageBinaryFile: null,
  videoBinaryFile: {
    __typename: "BinaryFile",
    id: "a39fcd97-942b-4750-a5a8-05e82565b0f2",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    filename: "mov_bbb",
    fileSize: 1,
    mimeType: MimeType.VideoMp4,
    url: "https://luca-develop.s3.eu-central-1.amazonaws.com/3dd596c7-b766-4fb2-9a8d-7b4a0a318c0e"
  }
}

const defaultProps: ReferenceBookVideoProps = {
  contentId: referenceBookContent.id,
  videoUrl: referenceBookContent.videoUrl ?? "",
  readonly: false,
  referenceBookChapterId: referenceBookChapter.id,
  videoFile: Option.of(videoBinariesMock[0] as unknown as BinaryFile)
}

const hookValuesDefault: UseReferenceBookVideoHook = {
  hideUpdateModal: jest.fn(),
  operationLoading: false,
  showUpdateModal: jest.fn(),
  updateVideo: jest.fn(),
  updateModalVisible: false,
  isDeleteOrlyVisible: false,
  setIsDeleteOrlyVisible: jest.fn(),
  viewerModalVisible: false,
  setViewerModalVisible: jest.fn
}

const stateSpy = jest.spyOn(useReferenceBookVideoHook, "useReferenceBookVideo")

const getComponent = (props?: Partial<ReferenceBookVideoProps>) => (
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
    <ReferenceBookVideo {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("reference-book-video", () => {
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
    render(getComponent())
    await act(() => wait(0))

    const referenceBookVideo = tree.find(ReferenceBookVideo)
    const content = referenceBookVideo.dive()

    const video = screen.getByRole("video") as HTMLVideoElement

    expect(video).toBeInTheDocument()
    expect(video.src).toContain(defaultProps.videoUrl)

    expect(content.find(".edit-overlay")).toHaveLength(1)
    expect(content.find(BinaryUpdateModal)).toHaveLength(0)
  })
  it("has correct structure (readonly)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent({readonly: true}))

    await act(() => wait(0))

    const referenceBookVideo = tree.find(ReferenceBookVideo)
    const content = referenceBookVideo.dive()

    expect(content.find(".edit-overlay")).toHaveLength(1)
    expect(content.find(BinaryUpdateModal)).toHaveLength(0)
  })
  it("has correct structure (update-modal visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, updateModalVisible: true})
    const tree = shallow(getComponent())

    await act(() => wait(0))

    const referenceBookVideo = tree.find(ReferenceBookVideo)
    const content = referenceBookVideo.dive()

    expect(content.find(".edit-overlay")).toHaveLength(1)
    expect(content.find(BinaryUpdateModal)).toHaveLength(1)
  })
  it("has correct structure (viewer-modal visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, viewerModalVisible: true})
    const tree = shallow(getComponent({readonly: true}))

    await act(() => wait(0))

    const referenceBookVideo = tree.find(ReferenceBookVideo)
    const content = referenceBookVideo.dive()

    expect(content.find(".edit-overlay")).toHaveLength(1)
    expect(content.find(VideoViewer)).toHaveLength(1)
  })
})
