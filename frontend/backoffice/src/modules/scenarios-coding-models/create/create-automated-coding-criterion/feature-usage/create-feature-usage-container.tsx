import * as React from "react"
import {FeatureType, OfficeTool} from "shared/graphql/generated/globalTypes"
import {useCreateFeatureUsageScenarioCodingAutomatedCriterion} from "shared/graphql/hooks"
import {automatedCodingCriteriaQuery, codingDimensionsQuery} from "shared/graphql/queries"
import {CreateFeatureUsageCriterion} from "./create-feature-usage-criterion"

interface Props {
  readonly codingItemId: UUID
  readonly codingModelId: UUID
  readonly onSuccess?: () => void
  readonly onDismiss: () => void
}

export const CreateFeatureUsageCriterionContainer: React.FC<Props> = ({
  codingItemId,
  codingModelId,
  onDismiss,
  onSuccess
}) => {
  const [selectedTool, setSelectedTool] = React.useState<OfficeTool | null>(null)
  const [selectedFeatureType, setSelectedFeatureType] = React.useState<FeatureType | null>(null)

  const {createFeatureUsageScenarioCodingAutomatedCriterion} = useCreateFeatureUsageScenarioCodingAutomatedCriterion([
    {query: automatedCodingCriteriaQuery, variables: {itemId: codingItemId}},
    {query: codingDimensionsQuery, variables: {modelId: codingModelId}}
  ])

  const onConfirm = () => {
    selectedTool !== null && selectedFeatureType !== null
      ? createFeatureUsageScenarioCodingAutomatedCriterion({
          itemId: codingItemId,
          officeTool: selectedTool,
          score: 0,
          featureType: selectedFeatureType
        }).then(onSuccess)
      : undefined
  }

  return (
    <CreateFeatureUsageCriterion
      onChangeFeatureType={setSelectedFeatureType}
      onChangeTool={setSelectedTool}
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      selectedFeatureType={selectedFeatureType}
      selectedTool={selectedTool}
    />
  )
}
