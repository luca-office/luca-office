import {QueryLazyOptions, useLazyQuery, useQuery} from "@apollo/client"
import {LatestStartedProjectModule} from "../../../../models"
import {parseDateString} from "../../../../utils/date"
import {Option} from "../../../../utils/option"
import {
  LatestStartedProjectModuleQuery,
  LatestStartedProjectModuleQuery_latestStartedProjectModule as LatestStartedProjectModuleModel,
  LatestStartedProjectModuleQueryVariables
} from "../../../generated/LatestStartedProjectModuleQuery"
import {latestStartedProjectModuleQuery} from "../../../queries"

export interface UseLatestStartedProjectModuleHook {
  readonly latestStartedProjectModule: Option<LatestStartedProjectModuleModel>
  readonly latestStartedProjectModuleLoading: boolean
}
export interface UseLatestStartedProjectModuleLazyHook {
  readonly latestStartedProjectModule: Option<LatestStartedProjectModule>
  readonly latestStartedProjectModuleLoading: boolean
  readonly getLatestStartedProjectModule: (
    options?: QueryLazyOptions<LatestStartedProjectModuleQueryVariables> | undefined
  ) => void
}

export const useLatestStartedProjectModule = (
  surveyId: UUID,
  onCompleted: (latestStartedModuleId: UUID | null, startDate: Date | null) => void
): UseLatestStartedProjectModuleHook => {
  const {data, loading} = useQuery<LatestStartedProjectModuleQuery, LatestStartedProjectModuleQueryVariables>(
    latestStartedProjectModuleQuery,
    {
      variables: {surveyId},
      fetchPolicy: "network-only",
      onCompleted: data =>
        onCompleted(
          data?.latestStartedProjectModule?.projectModuleId ?? null,
          data?.latestStartedProjectModule?.startedAt !== undefined
            ? parseDateString(data?.latestStartedProjectModule?.startedAt)
            : null
        )
    }
  )

  return {
    latestStartedProjectModule: Option.of(data?.latestStartedProjectModule),
    latestStartedProjectModuleLoading: loading
  }
}

export const useLatestStartedProjectModuleLazy = (
  onCompleted?: (latestStartedModuleId: UUID | null, startDate: Date | null) => void
): UseLatestStartedProjectModuleLazyHook => {
  const [getLatestStartedProjectModule, {loading, data}] = useLazyQuery<
    LatestStartedProjectModuleQuery,
    LatestStartedProjectModuleQueryVariables
  >(latestStartedProjectModuleQuery, {
    fetchPolicy: "network-only",
    onCompleted: data =>
      onCompleted?.(
        data?.latestStartedProjectModule?.projectModuleId ?? null,
        data?.latestStartedProjectModule?.startedAt !== undefined
          ? new Date(data?.latestStartedProjectModule?.startedAt)
          : null
      )
  })

  return {
    latestStartedProjectModule: Option.of<LatestStartedProjectModule>(data?.latestStartedProjectModule),
    latestStartedProjectModuleLoading: loading,
    getLatestStartedProjectModule
  }
}
