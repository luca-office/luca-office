import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import {referenceBookChaptersMock} from "shared/__mocks__"
import {scenariosMock} from "shared/graphql/__mocks__"
import {referenceBookChaptersForScenarioQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import wait from "waait"
import {useReferenceBookPreview} from "../use-reference-book-preview"

const scenario = scenariosMock[0]
const getConnectedHook = () =>
  renderHook(() => useReferenceBookPreview(scenario.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: referenceBookChaptersForScenarioQuery,
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {
                referenceBookChaptersForScenario: referenceBookChaptersMock
              }
            }
          }
        ]}
        addTypename={true}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("use-reference-book-detail-preview", () => {
  describe("chapterTitle", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.chapterTitle).toBeDefined()
      expect(result.current.chapterTitle).toBeInstanceOf(Option)

      await act(() => wait(0))
    })
  })

  describe("dataLoading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      expect(typeof result.current.dataLoading).toBe("boolean")

      await act(() => wait(0))
    })
  })

  describe("referenceBookChapters", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.referenceBookChapters).toBeDefined()
      expect(result.current.referenceBookChapters).toBeInstanceOf(Option)

      await act(() => wait(0))
    })
  })

  describe("selectedArticle", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedArticle).toBeDefined()
      expect(result.current.selectedArticle).toBeInstanceOf(Option)

      await act(() => wait(0))
    })
  })

  describe("selectedChapter", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedChapter).toBeDefined()
      expect(result.current.selectedChapter).toBeInstanceOf(Option)

      await act(() => wait(0))
    })
  })

  describe("selectedElementId", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedElementId).toBeDefined()
      expect(result.current.selectedElementId).toBeInstanceOf(Option)

      await act(() => wait(0))
    })
  })
})
