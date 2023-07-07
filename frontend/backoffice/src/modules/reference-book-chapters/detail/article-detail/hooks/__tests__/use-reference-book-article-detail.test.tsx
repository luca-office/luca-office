import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import pick from "lodash-es/pick"
import * as React from "react"
import {referenceBookChapterMock} from "shared/__mocks__"
import {
  createReferenceBookContentMutation,
  repositionReferenceBookArticleMutation,
  repositionReferenceBookContentMutation,
  updateReferenceBookArticleMutation,
  updateReferenceBookContentMutation,
  updateReferenceBookMutation
} from "shared/graphql/mutations"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import wait from "waait"
import {useReferenceBookArticleDetail} from "../use-reference-book-article-detail"

const referenceBookChapter = referenceBookChapterMock()
const referenceBookArticle = referenceBookChapter.articles[0]
const referenceBookContent = referenceBookArticle.contents[0]
const getConnectedHook = () =>
  renderHook(() => useReferenceBookArticleDetail(referenceBookChapter, Option.none(), jest.fn()), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateReferenceBookMutation,
              variables: {
                id: referenceBookChapter.id,
                update: pick(referenceBookChapter, ["title", "description"])
              }
            },
            result: {
              data: {
                updateReferenceBook: referenceBookChapter
              }
            }
          },
          {
            request: {
              query: updateReferenceBookArticleMutation,
              variables: {
                id: referenceBookArticle.id,
                update: pick(referenceBookArticle, ["title"])
              }
            },
            result: {
              data: {
                updateReferenceBookArticle: referenceBookArticle
              }
            }
          },
          {
            request: {
              query: updateReferenceBookContentMutation,
              variables: {
                id: referenceBookContent.id,
                update: pick(referenceBookContent, ["text", "imageBinaryFileId", "videoBinaryFileId"])
              }
            },
            result: {
              data: {
                updateReferenceBookContent: referenceBookContent
              }
            }
          },
          {
            request: {
              query: createReferenceBookContentMutation,
              variables: {
                creation: pick(referenceBookContent, [
                  "contentType",
                  "text",
                  "imageBinaryFileId",
                  "videoBinaryFileId",
                  "referenceBookArticleId"
                ])
              }
            },
            result: {
              data: {
                createReferenceBookContent: referenceBookContent
              }
            }
          },
          {
            request: {
              query: repositionReferenceBookArticleMutation,
              variables: {
                id: referenceBookChapter.articles[1],
                predecessorId: referenceBookArticle.id
              }
            },
            result: {
              data: {
                repositionReferenceBookArticle: referenceBookChapter.articles[1]
              }
            }
          },
          {
            request: {
              query: repositionReferenceBookContentMutation,
              variables: {
                id: referenceBookChapter.articles[1].contents[0].id,
                predecessorId: referenceBookChapter.articles[1].contents[1].id
              }
            },
            result: {
              data: {
                repositionReferenceBookContent: referenceBookChapter.articles[1].contents[0]
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-reference-book-article-detail", () => {
  describe("articles", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.articles).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("articleTableProps", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.articleTableProps).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("contentTypeModalVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.contentTypeModalVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedEntityIsAnArticle", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedEntityIsAnArticle).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isFinalized", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isPublished).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedArticle", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedArticle).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedContentType", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedContentType).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("title", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.title).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("updateDescriptionModalVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateDescriptionModalVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sortModalVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sortModalVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sortableArticleContents", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sortableArticleContents).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("repositionReferenceBookContentLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.repositionReferenceBookContentLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
