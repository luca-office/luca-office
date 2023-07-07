import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {RaterMode} from "../../../../../../../enums"
import {
  checkLoginMock,
  codingDimensionsMock,
  projectModulesMockWithQuestionnaire,
  projectsMock,
  ratingsMock,
  scenariosMock,
  surveyIdMock,
  surveyInvitationIdMock,
  surveyInvitationsMock,
  surveyInvitationsProgressMock
} from "../../../../../../../graphql/__mocks__"
import {ProjectModulesHook, ProjectProps, UseCodingDimensionsLazyHook} from "../../../../../../../graphql/hooks"
import * as useCodingDimensionsLazyHook from "../../../../../../../graphql/hooks/queries/coding-models/use-coding-dimensions-lazy"
import * as useProjectHook from "../../../../../../../graphql/hooks/queries/project/use-project"
import * as useProjectModulesHook from "../../../../../../../graphql/hooks/queries/project/use-project-modules"
import {
  checkLoginQuery,
  codingDimensionsQuery,
  ratingsQuery,
  surveyInvitationsProgressQuery,
  surveyInvitationsQuery
} from "../../../../../../../graphql/queries"
import {Children} from "../../../../../../../styles"
import {Option} from "../../../../../../../utils"
import {useRatingDetailScenario} from "../use-rating-detail-scenario"

const scenario = scenariosMock[0]
const project = projectsMock[0]
const projectModules = projectModulesMockWithQuestionnaire.map(mock => ({...mock, projectId: project.id}))
const projectModule = projectModules[0]
const surveyInvitations = surveyInvitationsMock.map((surveyInvitation, index) =>
  index === 0 ? {...surveyInvitation, surveyId: surveyIdMock} : surveyInvitation
)

const projectHookDefaultValues: ProjectProps = {
  project: Option.of(project),
  projectLoading: false
}

const projectSpy = jest.spyOn(useProjectHook, "useProject")

const projectModulesHookDefaultValues: ProjectModulesHook = {
  projectModules,
  projectModulesLoading: false
}

const projectModulesSpy = jest.spyOn(useProjectModulesHook, "useProjectModules")

const codingDimensionsLazyHookValuesDefault: UseCodingDimensionsLazyHook = {
  codingDimensions: codingDimensionsMock,
  codingDimensionsLoading: false,
  getCodingDimensions: jest.fn()
}

const codingDimensionsLazySpy = jest.spyOn(useCodingDimensionsLazyHook, "useCodingDimensionsLazy")

const getConnectedHook = () =>
  renderHook(
    () =>
      useRatingDetailScenario({
        navigateTo: jest.fn(),
        navigationOverviewConfig: undefined,
        projectId: project.id,
        surveyId: surveyIdMock,
        moduleId: projectModule.id,
        surveyInvitationId: surveyInvitationIdMock,
        dimensionId: codingDimensionsMock[0].id,
        mode: RaterMode.FinalRater,
        disabled: false
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider
          mocks={[
            {
              request: {
                query: surveyInvitationsProgressQuery,
                variables: {surveyId: surveyIdMock}
              },
              result: {
                data: {
                  surveyInvitations: surveyInvitationsProgressMock
                }
              }
            },
            {
              request: {
                query: codingDimensionsQuery,
                variables: {modelId: scenario.codingModel?.id!}
              },
              result: {
                data: {
                  codingDimensions: codingDimensionsMock
                }
              }
            },
            {
              request: {
                query: ratingsQuery,
                variables: {surveyId: surveyIdMock}
              },
              result: {
                data: {
                  ratings: ratingsMock
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
            },
            {
              request: {
                query: surveyInvitationsQuery,
                variables: {surveyId: surveyIdMock}
              },
              result: {
                data: {
                  surveyInvitations: surveyInvitations
                }
              }
            }
          ]}
          addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      )
    }
  )

describe("use-rating-detail-scenario", () => {
  describe("project", () => {
    it("should default to be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.projectName).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("projectModules", () => {
    it("should be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.projectModules).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participant", () => {
    it("should be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.participant).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participants", () => {
    it("should be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.participants).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participantIndex", () => {
    it("should be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.participantIndex).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participantName", () => {
    it("should default to be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.participantName).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedEntityId", () => {
    it("should default to be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.selectedEntityId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("codingDimensions", () => {
    it("should default to be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.codingDimensions).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("ratingId", () => {
    it("should default to be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.ratingId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("scenario", () => {
    it("should default to be defined", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.scenario).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isReadonly", () => {
    it("should default to be false", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isReadonly).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isNotRatable", () => {
    it("should contain correct value", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isNotRatable).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("refreshData", () => {
    it("should be a function", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.refreshData).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isContentMissing", () => {
    it("contains correct value", async () => {
      projectSpy.mockReturnValue(projectHookDefaultValues)
      projectModulesSpy.mockReturnValue(projectModulesHookDefaultValues)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isContentMissing).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
