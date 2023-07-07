import {useQuery} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {interventionsQuery} from "../../../queries/interventions"

export interface UseInterventionsHook {
  readonly interventions: Option<Intervention[]>
  readonly interventionsLoading: boolean
}

export const useInterventions = (scenarioId: UUID, skip?: boolean): UseInterventionsHook => {
  const {data, loading} = useQuery<InterventionsQuery, InterventionsQueryVariables>(interventionsQuery, {
    variables: {scenarioId},
    skip
  })

  return {
    interventions: Option.of<Intervention[]>(data?.interventions),
    interventionsLoading: loading
  }
}
