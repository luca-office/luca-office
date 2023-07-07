import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {checkLoginQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useCreateItemModal} from "../use-create-item-modal"

const getConnectedHook = () =>
  renderHook(() => useCreateItemModal("adsölasdkölsad", "sdfkeof", "sfpiöeo"), {
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
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("useCreateItemModal", () => {
  describe("createCodingItemLoading", () => {
    it("should default to false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.actionsLoading).toBe(false)
      await act(() => wait(0))
    })
  })
  describe("selectedScoringType", () => {
    it("should default to be holistic", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedScoringType).toBe(ScoringType.Holistic)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
