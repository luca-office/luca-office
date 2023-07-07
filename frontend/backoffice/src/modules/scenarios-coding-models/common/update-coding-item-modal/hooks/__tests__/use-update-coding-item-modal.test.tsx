import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {manualCodingItemMock} from "shared/graphql/__mocks__"
import {updateManualCodingItemMutation} from "shared/graphql/mutations"
import {codingItemQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {UpdateCodingItemType, useUpdateCodingItemModal} from "../use-update-coding-item-modal"

const getConnectedHook = () =>
  renderHook(() => useUpdateCodingItemModal(manualCodingItemMock.id, UpdateCodingItemType.Type), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: codingItemQuery,
              variables: {id: manualCodingItemMock.id}
            },
            result: {
              data: {
                codingItem: manualCodingItemMock
              }
            }
          },
          {
            request: {
              query: updateManualCodingItemMutation,
              variables: {
                id: manualCodingItemMock.id,
                update: pick(manualCodingItemMock, ["title", "description", "scoringType"])
              }
            },
            result: {
              data: {
                updateCodingItem: manualCodingItemMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-update-coding-item-modal", () => {
  describe("selectedIndex", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedIndex).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
