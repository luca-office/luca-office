import {MutationUpdaterFn, useMutation} from "@apollo/client"
import {Option, removeTypename} from "shared/utils"
import {Directory} from "../../../../models"
import {createEntityInCache} from "../../../cache"
import {CreateDirectoryMutation, CreateDirectoryMutationVariables} from "../../../generated/CreateDirectoryMutation"
import {
  DirectoriesForSampleCompanyQuery,
  DirectoriesForSampleCompanyQueryVariables
} from "../../../generated/DirectoriesForSampleCompanyQuery"
import {
  DirectoriesForScenarioQuery,
  DirectoriesForScenarioQueryVariables
} from "../../../generated/DirectoriesForScenarioQuery"
import {DirectoryCreation} from "../../../generated/globalTypes"
import {createDirectoryMutation} from "../../../mutations"
import {directoriesForSampleCompanyQuery, directoriesForScenarioQuery} from "../../../queries"

export interface UseCreateDirectoryHook {
  readonly createDirectory: (creation: DirectoryCreation) => Promise<Option<Directory>>
  readonly createDirectoryLoading: boolean
}

const useCreateDirectory = (update: MutationUpdaterFn<CreateDirectoryMutation>): UseCreateDirectoryHook => {
  const [createDirectory, {loading}] = useMutation<CreateDirectoryMutation, CreateDirectoryMutationVariables>(
    createDirectoryMutation
  )

  const createDirectoryHandler = (creation: DirectoryCreation) =>
    new Promise<Option<Directory>>((resolve, reject) =>
      createDirectory({variables: {creation}, update})
        .then(result => resolve(Option.of(result.data?.createDirectory).map(removeTypename)))
        .catch(reject)
    )

  return {
    createDirectory: createDirectoryHandler,
    createDirectoryLoading: loading
  }
}

export const useCreateScenarioDirectory = (scenarioId: UUID): UseCreateDirectoryHook => {
  const update = createEntityInCache<
    DirectoriesForScenarioQuery,
    CreateDirectoryMutation,
    DirectoriesForScenarioQueryVariables
  >(directoriesForScenarioQuery, "directoriesForScenario", query => query.directoriesForScenario, "createDirectory", {
    scenarioId
  })

  return useCreateDirectory(update)
}

export const useCreateSampleCompanyDirectory = (sampleCompanyId: UUID): UseCreateDirectoryHook => {
  const update = createEntityInCache<
    DirectoriesForSampleCompanyQuery,
    CreateDirectoryMutation,
    DirectoriesForSampleCompanyQueryVariables
  >(
    directoriesForSampleCompanyQuery,
    "directoriesForSampleCompany",
    query => query.directoriesForSampleCompany,
    "createDirectory",
    {sampleCompanyId}
  )

  return useCreateDirectory(update)
}
