import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {ProjectModule} from "../../../../models"
import {ProjectModulesQuery, ProjectModulesQueryVariables} from "../../../generated/ProjectModulesQuery"
import {projectModulesQuery} from "../../../queries"

export interface UseProjectModulesLazyHook {
  readonly projectModulesLoading: boolean
  readonly projectModules: ProjectModule[]
  readonly getProjectModules: (projectId: UUID) => Promise<ProjectModule[]>
}

export const useProjectModulesLazy = (): UseProjectModulesLazyHook => {
  const client = useApolloClient()

  const [projectModulesLoading, setProjectModulesLoading] = React.useState(false)
  const [projectModules, setProjectModules] = React.useState<ProjectModule[]>([])

  const getProjectModules = (projectId: UUID) => {
    setProjectModulesLoading(true)

    return new Promise<ProjectModule[]>((resolve, reject) =>
      client
        .query<ProjectModulesQuery, ProjectModulesQueryVariables>({query: projectModulesQuery, variables: {projectId}})
        .then(result => {
          setProjectModulesLoading(false)

          const data = result.data?.projectModules ?? []
          setProjectModules(data)
          resolve(data)
        })
        .catch(error => {
          setProjectModulesLoading(false)
          setProjectModules([])
          reject(error)
        })
    )
  }

  return {
    projectModulesLoading,
    projectModules,
    getProjectModules
  }
}
