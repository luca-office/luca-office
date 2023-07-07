import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "shared/models"
import {deleteIdEntityFromCache} from "../../../cache"
import {DeleteDirectoryMutation, DeleteDirectoryMutationVariables} from "../../../generated/DeleteDirectoryMutation"
import {
  DirectoriesForSampleCompanyQuery,
  DirectoriesForSampleCompanyQueryVariables
} from "../../../generated/DirectoriesForSampleCompanyQuery"
import {
  DirectoriesForScenarioQuery,
  DirectoriesForScenarioQueryVariables
} from "../../../generated/DirectoriesForScenarioQuery"
import {DirectoryFragment} from "../../../generated/DirectoryFragment"
import {deleteDirectoryMutation} from "../../../mutations"
import {directoriesForSampleCompanyQuery, directoriesForScenarioQuery} from "../../../queries"

export const useDeleteDirectoryFromScenario = (scenarioId: UUID): DeleteEntityHook => {
  const [deleteDirectory, {loading: deleteEntityLoading}] = useMutation<
    DeleteDirectoryMutation,
    DeleteDirectoryMutationVariables
  >(deleteDirectoryMutation)

  const deleteEntity = (id: UUID) =>
    new Promise<void>((resolve, reject) => {
      deleteDirectory({
        variables: {id},
        update: deleteIdEntityFromCache<
          DirectoriesForScenarioQuery,
          DeleteDirectoryMutation,
          DirectoriesForScenarioQueryVariables,
          DirectoryFragment
        >(directoriesForScenarioQuery, "directoriesForScenario", id, {scenarioId})
      })
        .then(() => resolve())
        .catch(reject)
    })

  return {
    deleteEntity,
    deleteEntityLoading
  }
}

export const useDeleteDirectoryFromSampleCompany = (sampleCompanyId: UUID): DeleteEntityHook => {
  const [deleteDirectory, {loading: deleteEntityLoading}] = useMutation<
    DeleteDirectoryMutation,
    DeleteDirectoryMutationVariables
  >(deleteDirectoryMutation)

  const deleteEntity = (id: UUID) =>
    new Promise<void>((resolve, reject) => {
      deleteDirectory({
        variables: {id},
        update: deleteIdEntityFromCache<
          DirectoriesForSampleCompanyQuery,
          DeleteDirectoryMutation,
          DirectoriesForSampleCompanyQueryVariables,
          DirectoryFragment
        >(directoriesForSampleCompanyQuery, "directoriesForSampleCompany", id, {sampleCompanyId})
      })
        .then(() => resolve())
        .catch(reject)
    })

  return {
    deleteEntity,
    deleteEntityLoading
  }
}
