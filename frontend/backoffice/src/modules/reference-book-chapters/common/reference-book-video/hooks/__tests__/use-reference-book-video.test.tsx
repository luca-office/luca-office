import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {referenceBookChapterMock} from "shared/__mocks__"
import {updateReferenceBookContentMutation} from "shared/graphql/mutations"
import {Children} from "shared/styles"
import wait from "waait"
import {useReferenceBookVideo} from "../use-reference-book-video"

const referenceBookChapter = referenceBookChapterMock()
const referenceBookArticle = referenceBookChapter.articles[0]
const referenceBookContent = referenceBookArticle.contents[0]
const getConnectedHook = () =>
  renderHook(() => useReferenceBookVideo(referenceBookChapter.id, referenceBookContent.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateReferenceBookContentMutation,
              variables: {
                id: referenceBookContent.id,
                update: {imageBinaryFileId: "359b028a-bdd8-4c0b-a6af-edaaf058a315"}
              }
            },
            result: {
              data: {
                updateReferenceBookContent: referenceBookContent
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-reference-book-image", () => {
  describe("hideUpdateModal", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.hideUpdateModal).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("operationLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.operationLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("updateModalVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateModalVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isDeleteOrlyVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isDeleteOrlyVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("viewerModalVisible", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.viewerModalVisible).toBeDefined()
      expect(result.current.viewerModalVisible).toBeFalsy()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
