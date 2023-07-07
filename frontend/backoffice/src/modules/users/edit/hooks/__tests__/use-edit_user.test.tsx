import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {checkLoginMock} from "shared/graphql/__mocks__"
import {Salutation} from "shared/graphql/generated/globalTypes"
import {UpdateUserAccountMutationVariables} from "shared/graphql/generated/UpdateUserAccountMutation"
import {updateUserAccountMutation} from "shared/graphql/mutations"
import {checkLoginQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useEditUser} from "../use-edit-user"

const testVariables: UpdateUserAccountMutationVariables = {
  id: "123",
  update: {
    firstName: "Test",
    lastName: "Test",
    organization: "Cap3",
    salutation: Salutation.Mrs,
    mayFinalizeWithoutPublishing: false,
    mayArchive: false,
    mayAdministrateUserAccounts: false,
    mayAdministrateRScripts: false
  }
}

const getConnectedHook = () =>
  renderHook(() => useEditUser(), {
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
              query: updateUserAccountMutation,
              variables: testVariables
            },
            result: {
              data: {
                updateUserAccount: checkLoginMock
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("useEditUser", () => {
  describe("updateLoading", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateLoading).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
      // When: I fire the click event handler
      act(() => {
        result.current.updateAccount(testVariables.id, testVariables.update)
      })

      act(() => {
        wait(0)
        expect(result.current.updateLoading).toBe(true)
      })
      await act(() => wait(0))
    })
  })
})
