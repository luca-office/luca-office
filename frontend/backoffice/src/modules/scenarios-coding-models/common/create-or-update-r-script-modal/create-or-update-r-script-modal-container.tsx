import * as React from "react"
import {
  useCreateRScriptScenarioCodingAutomatedCriterion,
  useRScripts,
  useUpdateRScriptScenarioCodingAutomatedCriterion
} from "shared/graphql/hooks"
import {automatedCodingCriteriaQuery, codingDimensionsQuery, rScriptsQuery} from "shared/graphql/queries"
import {RScriptScenarioCodingAutomatedCriterion} from "shared/models"
import {Option} from "shared/utils"
import {CreateOrUpdateRScriptModal} from "./create-or-update-r-script-modal"

export interface ChooseRScriptModalProps {
  readonly codingItemId: UUID
  readonly codingModelId: UUID
  readonly criterion: Option<RScriptScenarioCodingAutomatedCriterion>
  readonly displayMode: RScriptCriterionDisplayMode
  readonly onDismiss: () => void
  readonly onSuccess: () => void
}

export enum RScriptCriterionDisplayMode {
  Create = "Create",
  Update = "Update"
}

export const CreateOrUpdateRScriptModalContainer: React.FC<ChooseRScriptModalProps> = ({
  displayMode,
  codingItemId,
  codingModelId,
  criterion,
  onSuccess,
  ...rest
}) => {
  const [searchValue, setSearchValue] = React.useState("")
  const [selectedRScriptId, setSelectedRScriptId] = React.useState<Option<UUID>>(Option.none())
  const {rScripts} = useRScripts()

  const {
    createRScriptScenarioCodingAutomatedCriterion,
    createRScriptScenarioCodingAutomatedCriterionLoading
  } = useCreateRScriptScenarioCodingAutomatedCriterion([
    {query: automatedCodingCriteriaQuery, variables: {itemId: codingItemId}},
    {query: rScriptsQuery},
    {query: codingDimensionsQuery, variables: {modelId: codingModelId}}
  ])

  const {
    updateRScriptScenarioCodingAutomatedCriterion,
    updateRScriptScenarioCodingAutomatedCriterionLoading
  } = useUpdateRScriptScenarioCodingAutomatedCriterion()

  React.useEffect(() => {
    setSelectedRScriptId(Option.none())
  }, [searchValue])

  const handleConfirm = (rScriptId: UUID) => {
    if (displayMode === RScriptCriterionDisplayMode.Create) {
      createRScriptScenarioCodingAutomatedCriterion({itemId: codingItemId, rScriptId, score: 0}).then(onSuccess)
    } else {
      criterion.forEach(criterion =>
        updateRScriptScenarioCodingAutomatedCriterion(criterion.id, {score: criterion.score, rScriptId}).then(onSuccess)
      )
    }
  }

  const activeRScripts = rScripts.filter(script => script.archivedAt === null)

  return (
    <CreateOrUpdateRScriptModal
      selectedRScriptId={selectedRScriptId}
      isConfirmButtonLoading={
        createRScriptScenarioCodingAutomatedCriterionLoading || updateRScriptScenarioCodingAutomatedCriterionLoading
      }
      rScripts={activeRScripts.filter(
        script =>
          script.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          script.description.toLowerCase().includes(searchValue.toLowerCase())
      )}
      onConfirm={handleConfirm}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      setSelectedRScriptId={setSelectedRScriptId}
      {...rest}
    />
  )
}
