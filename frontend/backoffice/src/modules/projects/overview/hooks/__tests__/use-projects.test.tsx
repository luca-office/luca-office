import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {checkLoginMock, projectsMock} from "shared/graphql/__mocks__"
import {checkLoginQuery, projectsQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useProjects} from "../use-projects"

const getConnectedHook = () =>
  renderHook(() => useProjects(), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: projectsQuery
            },
            result: {
              data: {
                projects: projectsMock
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
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-projects", () => {
  describe("projects", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.projects).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("projectsLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.projectsLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
