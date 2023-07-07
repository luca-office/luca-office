import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {directoriesMock} from "shared/__mocks__"
import {filesMock} from "shared/graphql/__mocks__"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import wait from "waait"
import {useMoveOverlay} from "../use-move-overlay"

const getConnectedHook = () =>
  renderHook(() => useMoveOverlay(Option.none(), Option.none(), jest.fn(), directoriesMock, filesMock), {
    wrapper: ({children}: Children) => <MockedProvider>{children as any}</MockedProvider>
  })

describe("useMoveOverlay", () => {
  describe("selectedTargetDirectory", () => {
    it("should default to empty Option", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedTargetDirectory.isEmpty()).toBe(true)
      await act(() => wait(0))
    })
  })
})
