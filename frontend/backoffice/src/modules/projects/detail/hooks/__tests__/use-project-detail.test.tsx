import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {projectModulesMockWithQuestionnaire, projectsMock, surveysMock, userAccountMock} from "shared/graphql/__mocks__"
import {ProjectUpdate, UsageField} from "shared/graphql/generated/globalTypes"
import {updateProjectMutation} from "shared/graphql/mutations"
import {projectModulesQuery, projectQuery, projectUserAccountsQuery, surveysQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useProjectDetail} from "../use-project-detail"

const projectId = projectsMock[0].id
const updateMock: ProjectUpdate = {
  description: "345",
  audience: "test",
  name: "test",
  usageField: UsageField.Research,
  welcomeText: "test"
}
const getConnectedHook = () =>
  renderHook(() => useProjectDetail(projectId), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: projectQuery,
              variables: {id: projectId}
            },
            result: {
              data: {
                project: projectsMock[0]
              }
            }
          },
          {
            request: {
              query: projectModulesQuery,
              variables: {projectId}
            },
            result: {
              data: {
                projectModules: projectModulesMockWithQuestionnaire
              }
            }
          },
          {
            request: {
              query: updateProjectMutation,
              variables: {id: projectId, update: updateMock}
            },
            result: {
              data: {
                updateProject: projectsMock[0]
              }
            }
          },
          {
            request: {
              query: surveysQuery,
              variables: {projectId}
            },
            result: {
              data: {
                surveys: surveysMock
              }
            }
          },
          {
            request: {
              query: projectUserAccountsQuery,
              variables: {projectId}
            },
            result: {
              data: {
                userAccountsForProject: [userAccountMock]
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-project-detail", () => {
  describe("dataLoading", () => {
    it("should default to be true", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      expect(result.current.dataLoading).toBe(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
      expect(result.current.dataLoading).toBe(false)
    })
  })
  describe("updateInProgress", () => {
    it("should default to be false and trigger correctly", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateInProgress).toBeDefined()
      await act(() => wait(0))
      expect(result.current.updateInProgress).toBe(false)
    })
  })
  describe("setCreateModuleModalVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.createModuleModalVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("resort actions", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.resortModalVisible).toBeDefined()
      expect(result.current.sortableModules).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("invitation props", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.inviteUserModalVisible).toBeDefined()
      expect(result.current.projectUsersCount).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selected tab props", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.defaultSelectedListTabIndex).toEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
