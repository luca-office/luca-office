import {useQuery} from "@apollo/client"
import {ProjectModule} from "../../../../models"
import {ProjectModulesQuery, ProjectModulesQueryVariables} from "../../../generated/ProjectModulesQuery"
import {projectModulesQuery} from "../../../queries"

export interface ProjectModulesHook {
  readonly projectModules: ProjectModule[]
  readonly projectModulesLoading: boolean
}

export const useProjectModules = (projectId: UUID, skip?: boolean): ProjectModulesHook => {
  const {data, loading} = useQuery<ProjectModulesQuery, ProjectModulesQueryVariables>(projectModulesQuery, {
    variables: {projectId},
    skip
  })

  return {
    projectModules: data?.projectModules ?? [],
    projectModulesLoading: loading
  }
}
