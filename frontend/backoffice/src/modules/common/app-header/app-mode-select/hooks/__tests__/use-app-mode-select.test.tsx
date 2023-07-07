import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {checkLoginQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {AppMode} from "../../../../../../enums"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useAppModeSelect} from "../use-app-mode-select"

const getConnectedHook = () =>
  renderHook(() => useAppModeSelect(), {
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
          }
        ]}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("useAppModeSelect", () => {
  describe("isMenuVisible", () => {
    it("should default to false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isMenuVisible).toBe(false)
      await act(() => wait(0))
    })
  })
  describe("toggleMenu", () => {
    it("toggle menu visibility - isMenuVisible", async () => {
      // Given: a state with no parameters
      const {result} = getConnectedHook()
      expect(result.current.isMenuVisible).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
      // When: I fire the toggle handler
      act(() => {
        result.current.toggleMenu()
      })
      // Then: I expect the menu visibility to toggle
      expect(result.current.isMenuVisible).toBe(true)
      // When: I fire the toggle handler again
      act(() => {
        result.current.toggleMenu()
      })
      // Then: I expect the menu visibility to toggle back to false
      expect(result.current.isMenuVisible).toBe(false)
    })
  })
  describe("appMode", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.appMode).toBe(AppMode.EDITOR)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
