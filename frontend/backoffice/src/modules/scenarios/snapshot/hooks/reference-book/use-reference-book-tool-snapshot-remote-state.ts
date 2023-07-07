import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {OfficeTool} from "shared/enums"
import {useScenario, useScenarioReferenceBookChapters} from "shared/graphql/hooks"
import {dependencyInitialized} from "../../../../../redux/actions/player-preview-actions"

export const useReferenceBookToolSnapshotRemoteState = (scenarioId: UUID) => {
  const dispatch = useDispatch()
  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)
  const {scenario, scenarioLoading} = useScenario(scenarioId)

  useEffect(() => {
    if (!scenarioReferenceBooksLoading && !scenarioLoading) {
      dispatch(dependencyInitialized(OfficeTool.ReferenceBookViewer))
    }
  }, [scenarioReferenceBooksLoading, scenarioLoading])

  return {
    scenarioReferenceBooks,
    scenario,
    scenarioReferenceBooksLoading,
    scenarioLoading
  }
}
