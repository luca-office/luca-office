import * as React from "react"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {RScriptUpdate} from "shared/graphql/generated/globalTypes"
import {
  useArchiveRScript,
  useCheckLogin,
  useCreateRScript,
  useDeleteRScript,
  useRScripts,
  useUpdateRScript
} from "shared/graphql/hooks"
import {AppNotification} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {find, Option} from "shared/utils"
import {navigateToRouteAction} from "../../redux/actions/navigation-action"
import {updateNotification} from "../../redux/actions/ui/common-ui-action"
import {Route} from "../../routes"
import {RScripts} from "./r-scripts"

interface Props {
  readonly rScriptId: Option<UUID>
}

export const RScriptsContainer: React.FC<Props> = ({rScriptId: selectedRScriptId}) => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()
  const {rScripts, rScriptsLoading} = useRScripts()
  const {createRScript} = useCreateRScript()
  const {updateRScript, updateRScriptLoading} = useUpdateRScript()
  const {deleteEntity: deleteRScript} = useDeleteRScript()
  const {archiveRScript} = useArchiveRScript()
  const selectedRScript = find(rScript => selectedRScriptId.contains(rScript.id), rScripts)

  const selectRScript = (id: UUID) => dispatch(navigateToRouteAction(Route.RScriptsDetail, {rScriptId: id}))

  const deselectRScript = () => dispatch(navigateToRouteAction(Route.RScripts))
  const {account, checkLoginLoading} = useCheckLogin()

  if (account.exists(user => !user.mayAdministrateRScripts) && !checkLoginLoading) {
    dispatch(navigateToRouteAction(Route.Scenarios))
    dispatch(
      updateNotification(
        Option.of<AppNotification>({
          messageKey: "user_management__missing_claims",
          severity: NotificationSeverity.Error
        })
      )
    )
  }

  const handleCreateRScript = () =>
    createRScript({title: "", description: "", version: "", gitCommitHash: ""}).then(rScriptOption =>
      rScriptOption.forEach(rScript => selectRScript(rScript.id))
    )

  const handleUpdateRScript = (update: RScriptUpdate) =>
    selectedRScriptId.map(rScriptId => updateRScript(rScriptId, update)).getOrElse(Promise.reject())

  const handleDeleteRScript = () =>
    selectedRScriptId.forEach(rScriptId => {
      deselectRScript()
      deleteRScript(rScriptId)
    })

  const handleArchiveRScript = () =>
    selectedRScriptId.forEach(rScriptId => {
      deselectRScript()
      archiveRScript(rScriptId)
    })

  return (
    <RScripts
      t={t}
      rScripts={rScripts.filter(script => script.archivedAt === null)}
      isLoading={rScriptsLoading}
      isUpdateLoading={updateRScriptLoading}
      selectedRScript={selectedRScript}
      selectRScript={selectRScript}
      createRScript={handleCreateRScript}
      updateRScript={handleUpdateRScript}
      deleteRScript={handleDeleteRScript}
      archiveRScript={handleArchiveRScript}
    />
  )
}
