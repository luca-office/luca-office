import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import pick from "lodash-es/pick"
import * as React from "react"
import {referenceBookChapterMock} from "shared/__mocks__"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {createReferenceBookChapterMutation} from "shared/graphql/mutations"
import {checkLoginQuery, referenceBookChaptersQuery} from "shared/graphql/queries"
import {ReferenceBookChapter} from "shared/models"
import {Children} from "shared/styles"
import wait from "waait"
import {useReferenceBookChapters} from "../use-reference-book-chapters"

const referenceBookChapter: ReferenceBookChapter = {
  ...referenceBookChapterMock(),
  __typename: "ReferenceBookChapter"
}

const getConnectedHook = () =>
  renderHook(() => useReferenceBookChapters(), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
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
              query: createReferenceBookChapterMutation,
              variables: {
                creation: pick(referenceBookChapter, ["title", "description"])
              }
            },
            result: {
              data: {
                createReferenceBook: referenceBookChapter
              }
            }
          },
          {
            request: {
              query: referenceBookChaptersQuery
            },
            result: {
              data: {
                referenceBookChapters: [referenceBookChapter]
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-reference-books", () => {
  describe("referenceBookChapters", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.referenceBookChapters).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("referenceBooksLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.referenceBooksLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
