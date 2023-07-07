import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {referenceBookChapterMock} from "shared/__mocks__"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {createReferenceBookArticleMutation, duplicateReferenceBookMutation} from "shared/graphql/mutations"
import {checkLoginQuery, referenceBookChapterQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useReferenceBookDetail} from "../use-reference-book-detail"

const book = referenceBookChapterMock()

const getConnectedHook = () =>
  renderHook(() => useReferenceBookDetail({referenceBookChapterId: book.id}), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: referenceBookChapterQuery,
              variables: {id: book.id}
            },
            result: {
              data: {
                referenceBookChapter: book
              }
            }
          },
          {
            request: {
              query: checkLoginQuery
            },
            result: {
              data: {
                checkLogin: checkLoginMock
              }
            }
          },
          {
            request: {
              query: createReferenceBookArticleMutation,
              variables: {creation: {description: "test", title: "test"}}
            },
            result: {
              data: {
                createReferenceBookArticle: book.articles[0]
              }
            }
          },
          {
            request: {
              query: duplicateReferenceBookMutation,
              variables: {id: book.id}
            },
            result: {
              data: {
                duplicateReferenceBook: book
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-reference-book-detail", () => {
  describe("bookChapters", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.bookChapters).toBeDefined()
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
  describe("referenceBookChapter", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.referenceBookChapter).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedEntityId", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedEntityId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
