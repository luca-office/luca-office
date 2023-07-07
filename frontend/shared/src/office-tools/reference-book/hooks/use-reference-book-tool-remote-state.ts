import {useScenario, useScenarioReferenceBookChapters} from "../../../graphql/hooks"

export const useReferenceBookToolRemoteState = (scenarioId: UUID) => {
  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)
  const {scenario, scenarioLoading} = useScenario(scenarioId)

  return {
    scenarioReferenceBooks,
    scenario,
    scenarioReferenceBooksLoading,
    scenarioLoading
  }
}
