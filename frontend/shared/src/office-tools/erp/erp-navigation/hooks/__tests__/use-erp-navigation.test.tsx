import {act, renderHook} from "@testing-library/react-hooks"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {ErpEntry} from "../../../../../models"
import {Option} from "../../../../../utils"
import {getStaticErpStructure} from "../../static-erp-structure"
import {useErpNavigation} from "../use-erp-navigation"

const getConnectedHook = (navigationEntries: Array<ErpEntry>) =>
  renderHook(() => useErpNavigation(navigationEntries, Option.none()))
const navigationEntries = getStaticErpStructure("Test Company", fakeTranslate)

describe("UseErpNavigation", () => {
  describe("selectedNode", () => {
    it("should be default to be defined", () => {
      const {result} = getConnectedHook(navigationEntries)
      expect(result.current.selectedNode).toBeDefined()
    })
  })

  describe("setSelectedNode", () => {
    it("should be default to be defined", () => {
      const {result} = getConnectedHook(navigationEntries)
      expect(result.current.setSelectedNode).toBeDefined()
    })
  })

  describe("hideLockedEntries", () => {
    it("should be default to be false", () => {
      const {result} = getConnectedHook(navigationEntries)
      expect(result.current.hideLockedEntries).toBe(false)
    })
  })

  describe("toggleHideLockedEntries", () => {
    it("should be default to be defined", () => {
      const {result} = getConnectedHook(navigationEntries)
      expect(result.current.toggleHideLockedEntries).toBeDefined()
    })
  })

  describe("expandedNodeIds", () => {
    it("should be defined if provided default selected node", () => {
      const {result} = renderHook(() => useErpNavigation(navigationEntries, Option.of("PhoneIntegration")))
      expect(result.current.expandedNodeIds).toEqual(["PhoneIntegration", "Office"])
    })
  })

  describe("baseNodes", () => {
    it("should be default to be defined", () => {
      const {result} = getConnectedHook(navigationEntries)
      expect(result.current.baseNodes).toBeDefined()
    })

    it("should have the correct length (default)", () => {
      const {result} = getConnectedHook(navigationEntries)
      expect(result.current.baseNodes).toHaveLength(navigationEntries.length)
    })

    it("should have the correct length (readonly mode)", () => {
      const {result} = getConnectedHook(navigationEntries)

      act(() => {
        result.current.toggleHideLockedEntries()
      })

      expect(result.current.baseNodes).toHaveLength(navigationEntries.filter(entry => !entry.isLocked).length)
    })
  })
})
