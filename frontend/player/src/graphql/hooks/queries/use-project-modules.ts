import {useQuery} from "@apollo/client"
import {ProjectModulesQuery, ProjectModulesQueryVariables} from "shared/graphql/generated/ProjectModulesQuery"
import {projectModulesQuery} from "shared/graphql/queries"
import {ProjectModule} from "shared/models"
import {Option} from "shared/utils"

export interface ProjectModulesHook {
  readonly projectModules: Option<ProjectModule[]>
  readonly projectModulesLoading: boolean
}

export const useProjectModules = (projectId: UUID): ProjectModulesHook => {
  const {data, loading} = useQuery<ProjectModulesQuery, ProjectModulesQueryVariables>(projectModulesQuery, {
    variables: {projectId}
  })

  return {
    projectModules: Option.of(data?.projectModules),
    projectModulesLoading: loading
  }
}
