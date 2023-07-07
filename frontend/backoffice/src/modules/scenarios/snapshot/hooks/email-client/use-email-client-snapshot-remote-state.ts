import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {OfficeTool} from "shared/enums"
import {useFilesForScenario, useScenario} from "shared/graphql/hooks"
import {EmailClientRemoteState} from "shared/office-tools"
import {EmailClientRemoteStateHookProps} from "shared/office-tools/email-client/hook/use-email-client-remote-state"
import {dependencyInitialized} from "../../../../../redux/actions/player-preview-actions"

export const useEmailClientSnapshotRemoteState = ({
  scenarioId
}: EmailClientRemoteStateHookProps): EmailClientRemoteState => {
  const dispatch = useDispatch()

  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId)
  const {files: filesOption, filesLoading} = useFilesForScenario(scenarioId, scenarioId === "")

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isInitialized) return

    if (!scenarioLoading && !filesLoading) {
      setIsInitialized(true)
      dispatch(dependencyInitialized(OfficeTool.EmailClient))
    }
  }, [scenarioLoading, filesLoading])

  return {
    scenarioOption,
    filesOption,
    isLoading: scenarioLoading || filesLoading
  }
}
