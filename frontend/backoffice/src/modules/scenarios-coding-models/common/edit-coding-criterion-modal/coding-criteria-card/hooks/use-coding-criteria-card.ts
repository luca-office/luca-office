import * as React from "react"
import {
  DocumentViewScenarioCodingAutomatedCriterionUpdate,
  FeatureUsageScenarioCodingAutomatedCriterionUpdate,
  InputValueScenarioCodingAutomatedCriterionUpdate,
  RScriptScenarioCodingAutomatedCriterionUpdate,
  ToolUsageScenarioCodingAutomatedCriterionUpdate
} from "shared/graphql/generated/globalTypes"
import {
  useDeleteAutomatedCodingCriterion,
  useDeleteCodingCriterion,
  useUpdateCodingCriterion,
  useUpdateDocumentViewScenarioCodingAutomatedCriterion,
  useUpdateFeatureUsageScenarioCodingAutomatedCriterion,
  useUpdateInputValueScenarioCodingAutomatedCriterion,
  useUpdateRScriptScenarioCodingAutomatedCriterion,
  useUpdateToolUsageScenarioCodingAutomatedCriterion
} from "shared/graphql/hooks"
import {codingItemQuery} from "shared/graphql/queries"
import {AutomatedCodingCriterion, CodingCriterion, CodingItem, DeleteEntityHook} from "shared/models"
import {find, Option} from "shared/utils"

export type AutomatedCodingCriterionUpdateType =
  | Partial<ToolUsageScenarioCodingAutomatedCriterionUpdate>
  | Partial<InputValueScenarioCodingAutomatedCriterionUpdate>
  | Partial<DocumentViewScenarioCodingAutomatedCriterionUpdate>
  | Partial<FeatureUsageScenarioCodingAutomatedCriterionUpdate>
  | Partial<RScriptScenarioCodingAutomatedCriterionUpdate>

export interface UseCodingCriteriaCardHook {
  readonly selectedCriterion: Option<CodingCriterion | AutomatedCodingCriterion>
  readonly score: string
  readonly description: string
  readonly onScoreChange: (value: string) => void
  readonly onDescriptionChange: (value: string) => void
  readonly updateScore: () => void
  readonly updateDescription: () => void
  readonly updateAutomatedCriterionUpdate: (
    criterion: AutomatedCodingCriterion,
    update: AutomatedCodingCriterionUpdateType
  ) => Promise<unknown>
  readonly deleteHook: () => DeleteEntityHook
}

export interface Params {
  readonly codingItem: Option<CodingItem>
  readonly codingModelId: UUID
  readonly selectedCriterionId: Option<UUID>
  readonly codingCriteria: CodingCriterion[]
  readonly automatedCodingCriteria: AutomatedCodingCriterion[]
  readonly deselectCriterion: () => void
}

export const useCodingCriteriaCard = ({
  automatedCodingCriteria,
  codingItem,
  codingModelId,
  selectedCriterionId,
  codingCriteria,
  deselectCriterion
}: Params): UseCodingCriteriaCardHook => {
  const [score, setScore] = React.useState<string>("0")
  const [description, setDescription] = React.useState<string>("")

  const codingItemRefetchQuery = codingItem
    .map(item => [{query: codingItemQuery, variables: {id: item.id}}])
    .orUndefined()

  const {updateCodingCriterion} = useUpdateCodingCriterion(codingItemRefetchQuery)
  const {updateToolUsageScenarioCodingAutomatedCriterion} = useUpdateToolUsageScenarioCodingAutomatedCriterion(
    codingItemRefetchQuery
  )
  const {updateInputValueScenarioCodingAutomatedCriterion} = useUpdateInputValueScenarioCodingAutomatedCriterion(
    codingItemRefetchQuery
  )
  const {updateDocumentViewScenarioCodingAutomatedCriterion} = useUpdateDocumentViewScenarioCodingAutomatedCriterion(
    codingItemRefetchQuery
  )
  const {updateFeatureUsageScenarioCodingAutomatedCriterion} = useUpdateFeatureUsageScenarioCodingAutomatedCriterion(
    codingItemRefetchQuery
  )
  const {updateRScriptScenarioCodingAutomatedCriterion} = useUpdateRScriptScenarioCodingAutomatedCriterion(
    codingItemRefetchQuery
  )

  const {
    deleteEntity: deleteCodingCriterion,
    deleteEntityLoading: deleteCodingCriterionLoading
  } = useDeleteCodingCriterion(codingItem.map(item => item.id).getOrElse("-1"), codingModelId)

  const {
    deleteEntity: deleteScenarioAutomatedCodingCriterion,
    deleteEntityLoading: deleteScenarioAutomatedCodingCriterionLoading
  } = useDeleteAutomatedCodingCriterion(codingItem.map(item => item.id).getOrElse(""), codingModelId)

  const selectedCriterion = selectedCriterionId.flatMap(criterionId =>
    find(criterion => criterion.id === criterionId, [...codingCriteria, ...automatedCodingCriteria])
  )

  const criterion = selectedCriterion.orUndefined()
  const prevCriterion = React.useRef<CodingCriterion>()

  React.useEffect(() => {
    const hasCriterionChanged = prevCriterion.current?.id !== criterion?.id

    const isManualCodingCriterion = criterion?.__typename === "CodingCriterion"

    if (hasCriterionChanged || prevCriterion.current?.score !== criterion?.score) {
      setScore(criterion?.score ? `${criterion.score}` : "0")
    }

    if (isManualCodingCriterion) {
      const manualCodingCriterion = criterion as CodingCriterion

      if (hasCriterionChanged || prevCriterion.current?.description !== manualCodingCriterion?.description) {
        setDescription(manualCodingCriterion.description ?? "")
      }
      prevCriterion.current = manualCodingCriterion
    }
  }, [criterion])

  const updateScore = () =>
    selectedCriterion.forEach(criterion => {
      return handleUpdateScore(criterion)
    })

  const updateDescription = () =>
    selectedCriterion.forEach(criterion => {
      if (criterion.__typename === "CodingCriterion") {
        updateCodingCriterion(criterion.id, {
          description,
          score: criterion.score
        })
      }
    })

  const deleteCriterion = () =>
    new Promise<void>((resolve, reject) => {
      selectedCriterion
        .map(criterion =>
          criterion.__typename === "CodingCriterion"
            ? deleteCodingCriterion(criterion.id).then(deselectCriterion)
            : deleteScenarioAutomatedCodingCriterion(criterion.id)
        )
        .map(resolve)
        .getOrElse(reject())
    })

  const handleUpdateScore = (criterion: CodingCriterion | AutomatedCodingCriterion) => {
    let scoreToBeUpdated = parseInt(score, 10)
    if (scoreToBeUpdated < 0) {
      scoreToBeUpdated = 0
      setScore("0")
    } else if (scoreToBeUpdated > 99) {
      scoreToBeUpdated = 99
      setScore("99")
    }

    if (criterion.score !== scoreToBeUpdated) {
      if (criterion.__typename === "CodingCriterion") {
        return updateCodingCriterion(criterion.id, {
          description: criterion.description,
          score: scoreToBeUpdated
        })
      } else {
        return handleUpdateAutomatedCriterionUpdate(criterion, {score: scoreToBeUpdated})
      }
    }
    return undefined
  }

  const handleUpdateAutomatedCriterionUpdate = (
    criterion: AutomatedCodingCriterion,
    update: AutomatedCodingCriterionUpdateType
  ) => {
    switch (criterion.__typename) {
      case "ToolUsageScenarioCodingAutomatedCriterion": {
        const toolUsageUpdate = update as Partial<ToolUsageScenarioCodingAutomatedCriterionUpdate>

        return updateToolUsageScenarioCodingAutomatedCriterion(criterion.id, {
          score: toolUsageUpdate.score ?? criterion.score,
          officeTool: toolUsageUpdate.officeTool ?? criterion.officeTool
        })
      }

      case "InputValueScenarioCodingAutomatedCriterion": {
        const inputValueUpdate = update as Partial<InputValueScenarioCodingAutomatedCriterionUpdate>
        return updateInputValueScenarioCodingAutomatedCriterion(criterion.id, {
          score: inputValueUpdate.score ?? criterion.score,
          officeTool: inputValueUpdate.officeTool ?? criterion.officeTool,
          value: inputValueUpdate.value ?? criterion.value,
          spreadsheetColumnIndex: inputValueUpdate.spreadsheetColumnIndex ?? criterion.spreadsheetColumnIndex,
          spreadsheetRowIndex: inputValueUpdate.spreadsheetRowIndex ?? criterion.spreadsheetRowIndex,
          fileId: inputValueUpdate.fileId ?? criterion.fileId
        })
      }

      case "FeatureUsageScenarioCodingAutomatedCriterion": {
        const featureUsageUpdate = update as Partial<FeatureUsageScenarioCodingAutomatedCriterionUpdate>
        return updateFeatureUsageScenarioCodingAutomatedCriterion(criterion.id, {
          score: featureUsageUpdate.score ?? criterion.score,
          officeTool: featureUsageUpdate.officeTool ?? criterion.officeTool,
          featureType: featureUsageUpdate.featureType ?? criterion.featureType
        })
      }
      case "DocumentViewScenarioCodingAutomatedCriterion": {
        const documentViewUpdate = update as Partial<DocumentViewScenarioCodingAutomatedCriterionUpdate>
        return updateDocumentViewScenarioCodingAutomatedCriterion(criterion.id, {
          score: documentViewUpdate.score ?? criterion.score,
          fileId: documentViewUpdate.fileId === undefined ? criterion.fileId : documentViewUpdate.fileId,
          emailId: documentViewUpdate.emailId === undefined ? criterion.emailId : documentViewUpdate.emailId,
          erpRowId: documentViewUpdate.erpRowId === undefined ? criterion.erpRowId : documentViewUpdate.erpRowId,
          erpTableType:
            documentViewUpdate.erpTableType === undefined ? criterion.erpTableType : documentViewUpdate.erpTableType,
          referenceBookArticleId:
            documentViewUpdate.referenceBookArticleId === undefined
              ? criterion.referenceBookArticleId
              : documentViewUpdate.referenceBookArticleId,
          sampleCompanyId:
            documentViewUpdate.sampleCompanyId === undefined
              ? criterion.sampleCompanyId
              : documentViewUpdate.sampleCompanyId
        })
      }
      case "RScriptScenarioCodingAutomatedCriterion": {
        const rScriptUpdate = update as Partial<RScriptScenarioCodingAutomatedCriterionUpdate>
        return updateRScriptScenarioCodingAutomatedCriterion(criterion.id, {
          score: rScriptUpdate.score ?? criterion.score,
          rScriptId: rScriptUpdate.rScriptId ?? criterion.rScriptId
        })
      }

      default:
        return Promise.resolve()
    }
  }

  return {
    selectedCriterion,
    score,
    description,
    onScoreChange: setScore,
    onDescriptionChange: setDescription,
    updateScore,
    updateDescription,
    updateAutomatedCriterionUpdate: handleUpdateAutomatedCriterionUpdate,
    deleteHook: () => ({
      deleteEntity: () => deleteCriterion(),
      deleteEntityLoading: deleteCodingCriterionLoading || deleteScenarioAutomatedCodingCriterionLoading
    })
  }
}
