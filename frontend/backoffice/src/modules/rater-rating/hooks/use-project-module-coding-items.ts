import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {getCodingItemsFromCodingDimensions} from "shared/components/rating/utils"
import {CodingDimensionsQuery, CodingDimensionsQueryVariables} from "shared/graphql/generated/CodingDimensionsQuery"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {codingDimensionsQuery} from "shared/graphql/queries"
import {AutomatedCodingItem, ManualCodingItem, ProjectModule} from "shared/models"

export interface ProjectModuleCodingItemsMap {
  readonly [projectModuleId: string]: Array<ManualCodingItem | AutomatedCodingItem>
}

export interface UseProjectModuleCodingItemsHook {
  readonly projectModuleCodingItemsLoading: boolean
  readonly projectModuleCodingItems: ProjectModuleCodingItemsMap
  readonly getProjectModuleCodingItems: (projectModules: ProjectModule[]) => void
}

export const useProjectModuleCodingItems = (): UseProjectModuleCodingItemsHook => {
  const client = useApolloClient()

  const isMounted = React.useRef(false)

  const [projectModuleCodingItemsLoading, setProjectModuleCodingItemsLoading] = React.useState(false)
  const [projectModuleCodingItems, setProjectModuleCodingItems] = React.useState<ProjectModuleCodingItemsMap>({})

  const getProjectModuleCodingItems = (projectModules: ProjectModule[]) => {
    setProjectModuleCodingItemsLoading(true)

    const modules = projectModules.filter(
      projectModule =>
        projectModule.moduleType === ProjectModuleType.Scenario && projectModule.scenario?.codingModel?.id !== undefined
    )
    Promise.all(
      modules.map(module =>
        client
          .query<CodingDimensionsQuery, CodingDimensionsQueryVariables>({
            query: codingDimensionsQuery,
            variables: {modelId: `${module.scenario?.codingModel?.id}`}
          })
          .then(result => result.data?.codingDimensions ?? [])
          .then(dimensions => ({
            projectModuleId: module.id,
            codingItems: getCodingItemsFromCodingDimensions(dimensions)
          }))
      )
    )
      .then(results => {
        const projectModuleCodingItems = results.reduce(
          (accumulator, result) => ({
            ...accumulator,
            [result.projectModuleId]: result.codingItems
          }),
          {} as ProjectModuleCodingItemsMap
        )

        if (isMounted.current) {
          setProjectModuleCodingItems(projectModuleCodingItems)
          setProjectModuleCodingItemsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setProjectModuleCodingItems({})
          setProjectModuleCodingItemsLoading(false)
        }
      })
  }

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {projectModuleCodingItemsLoading, projectModuleCodingItems, getProjectModuleCodingItems}
}
