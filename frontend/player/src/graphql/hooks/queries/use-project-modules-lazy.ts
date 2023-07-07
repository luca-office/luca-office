import {useLazyQuery} from "@apollo/client"
import {ApolloError} from "@apollo/client/errors"
import {ProjectModulesQuery, ProjectModulesQueryVariables} from "shared/graphql/generated/ProjectModulesQuery"
import {projectModulesQuery} from "shared/graphql/queries"
import {ProjectModule} from "shared/models"
import {Option} from "shared/utils"

export interface ProjectModulesLazyHook {
  readonly getProjectModules: (projectId: UUID) => void
  readonly projectModules: Option<ProjectModule[]>
  readonly projectModulesLoading: boolean
  readonly projectModulesCalled: boolean
}

interface ProjectModulesLazyParams {
  readonly onCompleted?: (data: ProjectModulesQuery) => void
  readonly onError?: (error: ApolloError) => void
}

export const useProjectModulesLazy = (params?: ProjectModulesLazyParams): ProjectModulesLazyHook => {
  const [getProjectModules, {data, loading, called}] = useLazyQuery<ProjectModulesQuery, ProjectModulesQueryVariables>(
    projectModulesQuery,
    params
      ? {
          ...(params.onCompleted && {onCompleted: params.onCompleted}),
          ...(params.onError && {onError: params.onError})
        }
      : undefined
  )

  return {
    getProjectModules: (projectId: UUID) => getProjectModules({variables: {projectId}}),
    projectModules: Option.of(data?.projectModules),
    projectModulesLoading: loading,
    projectModulesCalled: called
  }
}
