import * as React from "react"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {useCreateToolUsageScenarioCodingAutomatedCriterion} from "shared/graphql/hooks"
import {automatedCodingCriteriaQuery, codingDimensionsQuery} from "shared/graphql/queries"
import {CreateToolUsageCriterion} from "./create-tool-usage-criterion"

interface Props {
  readonly codingItemId: UUID
  readonly codingModelId: UUID
  readonly onSuccess?: () => void
  readonly alreadyUsedTools: OfficeTool[]
  readonly onDismiss: () => void
}

export const CreateToolUsageCriterionContainer: React.FC<Props> = ({
  codingItemId,
  codingModelId,
  alreadyUsedTools,
  onDismiss,
  onSuccess
}) => {
  const [selectedTool, setSelectedTool] = React.useState<OfficeTool | null>(null)

  const {createToolUsageScenarioCodingAutomatedCriterion} = useCreateToolUsageScenarioCodingAutomatedCriterion([
    {query: automatedCodingCriteriaQuery, variables: {itemId: codingItemId}},
    {query: codingDimensionsQuery, variables: {modelId: codingModelId}}
  ])

  const onConfirm = () => {
    selectedTool
      ? createToolUsageScenarioCodingAutomatedCriterion({
          itemId: codingItemId,
          officeTool: selectedTool,
          score: 0
        }).then(onSuccess)
      : undefined
  }

  return (
    <CreateToolUsageCriterion
      onDismiss={onDismiss}
      alreadyUsedTools={alreadyUsedTools}
      onChangeTool={setSelectedTool}
      onConfirm={onConfirm}
      selectedTool={selectedTool}
    />
  )
}
