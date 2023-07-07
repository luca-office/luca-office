import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {act} from "react-test-renderer"
import {referenceBookChaptersForScenarioMock} from "shared/__mocks__"
import {directoriesMock} from "shared/__mocks__/directories.mock"
import {
  checkLoginMock,
  codingDimensionsMock,
  filesMock,
  sampleCompaniesMock,
  scenarioQuestionnairesMock,
  scenariosMock,
  userAccountsMock
} from "shared/graphql/__mocks__"
import {
  deleteScenarioMutation,
  duplicateScenarioMutation,
  finalizeScenarioMutation,
  updateScenarioMutation
} from "shared/graphql/mutations"
import {
  checkLoginQuery,
  codingDimensionsQuery,
  emailsQuery,
  filesForScenarioQuery,
  referenceBookChaptersForScenarioQuery,
  sampleCompanyQuery,
  scenarioQuery,
  scenarioQuestionnairesQuery,
  userAccountsForScenarioQuery
} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {Children} from "shared/styles"
import wait from "waait"
import {directoriesForScenarioMock} from "../../../../../graphql/__mocks__"
import {directoriesForSampleCompanyQuery, directoriesForScenarioQuery} from "../../../../../graphql/queries"
import {emailsMock} from "../../../../scenario-emails/emails/hooks/__mocks__/emails.mock"
import {useScenarioDetail} from "../use-scenario-detail"

const scenarioId = scenariosMock[0].id
const getConnectedHook = () =>
  renderHook(() => useScenarioDetail({scenarioId}), {
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
              query: scenarioQuery,
              variables: {id: scenarioId}
            },
            result: {
              data: {
                scenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: directoriesForScenarioQuery,
              variables: {scenarioId}
            },
            result: {
              data: {
                directoriesForScenario: directoriesForScenarioMock
              }
            }
          },
          {
            request: {
              query: emailsQuery,
              variables: {scenarioId}
            },
            result: {
              data: {
                emails: emailsMock
              }
            }
          },
          {
            request: {
              query: filesForScenarioQuery,
              variables: {scenarioId}
            },
            result: {
              data: {
                filesForScenario: filesMock
              }
            }
          },
          {
            request: {
              query: referenceBookChaptersForScenarioQuery,
              variables: {scenarioId: scenarioId}
            },
            result: {
              data: {
                referenceBookChaptersForScenario: referenceBookChaptersForScenarioMock
              }
            }
          },
          {
            request: {
              query: updateScenarioMutation,
              variables: {
                id: scenarioId,
                update: pick(scenariosMock, ["name", "description", "maxDurationInSeconds", "tags"])
              }
            },
            result: {
              data: {
                updateScenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: finalizeScenarioMutation,
              variables: {
                id: scenarioId
              }
            },
            result: {
              data: {
                finalizeScenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: deleteScenarioMutation,
              variables: {
                id: scenarioId
              }
            },
            result: {
              data: {
                deleteScenario: scenarioId
              }
            }
          },
          {
            request: {
              query: duplicateScenarioMutation,
              variables: {
                id: scenarioId
              }
            },
            result: {
              data: {
                duplicateScenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: sampleCompanyQuery,
              variables: {
                id: sampleCompaniesMock[0].id
              }
            },
            result: {
              data: {
                sampleCompany: sampleCompaniesMock[0]
              }
            }
          },
          {
            request: {
              query: codingDimensionsQuery,
              variables: {modelId: scenariosMock[0].codingModel?.id!}
            },
            result: {
              data: {
                codingDimensions: codingDimensionsMock
              }
            }
          },
          {
            request: {
              query: scenarioQuestionnairesQuery,
              variables: {
                scenarioId: scenariosMock[0].id
              }
            },
            result: {
              data: {
                scenarioQuestionnaires: scenarioQuestionnairesMock
              }
            }
          },
          {
            request: {
              query: interventionsQuery,
              variables: {
                scenarioId: scenariosMock[0].id
              }
            },
            result: {
              data: {
                interventions: []
              }
            }
          },
          {
            request: {
              query: userAccountsForScenarioQuery,
              variables: {
                scenarioId: scenariosMock[0].id
              }
            },
            result: {
              data: {
                userAccountsForScenario: userAccountsMock
              }
            }
          },
          {
            request: {
              query: directoriesForSampleCompanyQuery,
              variables: {
                sampleCompanyId: sampleCompaniesMock[0].id
              }
            },
            result: {
              data: {
                directoriesForSampleCompany: directoriesMock
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-scenario-detail", () => {
  describe("scenario", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenario).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("scenarioLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenarioLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isFinalizeScenarioLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isFinalizeScenarioLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("canBeFinalized", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.canBeFinalized).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("settingsCounts", () => {
    it("should default to be defined and deliver", async () => {
      const {result} = getConnectedHook()
      expect(result.current.settingsCounts).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
      expect(result.current.settingsCounts.emails).toEqual(emailsMock.length)
    })
  })
  describe("duplicateScenarioLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.duplicateScenarioLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("canBeDuplicated", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.canBeDuplicated).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isPublished", () => {
    it("should be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isPublished).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("userMayFinalizeWithoutPublishing", () => {
    it("should be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.userMayFinalizeWithoutPublishing).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
