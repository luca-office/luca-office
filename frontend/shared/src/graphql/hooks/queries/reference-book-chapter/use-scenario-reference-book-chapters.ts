import {useQuery} from "@apollo/client"
import {ReferenceBookChapter} from "../../../../models"
import {Option} from "../../../../utils/option"
import {
  ReferenceBookChaptersForScenarioQuery,
  ReferenceBookChaptersForScenarioQueryVariables
} from "../../../generated/ReferenceBookChaptersForScenarioQuery"
import {referenceBookChaptersForScenarioQuery} from "../../../queries"

export interface UseScenarioReferenceBooksHook {
  readonly scenarioReferenceBooks: Option<ReferenceBookChapter[]>
  readonly scenarioReferenceBooksLoading: boolean
}

export const useScenarioReferenceBookChapters = (scenarioId: UUID): UseScenarioReferenceBooksHook => {
  const {data, loading} = useQuery<
    ReferenceBookChaptersForScenarioQuery,
    ReferenceBookChaptersForScenarioQueryVariables
  >(referenceBookChaptersForScenarioQuery, {
    variables: {scenarioId}
  })

  return {
    scenarioReferenceBooks:
      data && data.referenceBookChaptersForScenario ? Option.of(data.referenceBookChaptersForScenario) : Option.none(),
    scenarioReferenceBooksLoading: loading
  }
}
