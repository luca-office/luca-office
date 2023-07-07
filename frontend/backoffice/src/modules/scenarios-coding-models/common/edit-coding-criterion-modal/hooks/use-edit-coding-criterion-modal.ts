import {orderBy} from "lodash-es"
import * as React from "react"
import {RScriptScenarioCodingAutomatedCriterionUpdate} from "shared/graphql/generated/globalTypes"
import {useCodingCriteria, useCodingItem} from "shared/graphql/hooks"
import {CodingCriterion, CodingItem, DocumentViewScenarioCodingAutomatedCriterion, RScript} from "shared/models"
import {Option} from "shared/utils"
import {useTitlesForDocumentViewAutomatedCriterion} from "../../../detail/coding-item/hooks/use-titles-for-document-view-automated-criterion"

export interface UseEditCodingCriterionModalHook {
  readonly dataLoading: boolean
  readonly codingItem: Option<CodingItem>
  readonly codingCriteria: CodingCriterion[]
  readonly selectedCriterionId: Option<UUID>
  readonly selectCriterion: (criterionId: UUID) => void
  readonly deselectCriterion: () => void
  readonly getTitleForDocumentViewCodingCriterion: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string
  readonly getAssociatedRScriptForRScriptCodingCriterion: (
    criterion: RScriptScenarioCodingAutomatedCriterionUpdate
  ) => Option<RScript>
}

export const useEditCodingCriterionModal = (
  codingItemId: UUID,
  defaultSelectedCodingCriterionId: Option<UUID>,
  scenarioId: UUID,
  rScripts: RScript[],
  sampleCompanyId?: UUID
): UseEditCodingCriterionModalHook => {
  const [selectedCriterionId, setSelectedCriterionId] = React.useState<Option<UUID>>(defaultSelectedCodingCriterionId)

  const {codingItem, codingItemLoading} = useCodingItem(codingItemId)
  const {codingCriteria, codingCriteriaLoading} = useCodingCriteria(codingItemId)

  const selectCriterion = (criterionId: UUID) => {
    setSelectedCriterionId(Option.of(criterionId))
  }
  const deselectCriterion = () => {
    setSelectedCriterionId(Option.none())
  }

  const {titleForId} = useTitlesForDocumentViewAutomatedCriterion(scenarioId, sampleCompanyId)

  return {
    dataLoading: codingCriteriaLoading || codingItemLoading,
    codingCriteria: orderBy(codingCriteria, criterion => criterion.score, "desc"),
    codingItem,
    selectedCriterionId,
    selectCriterion,
    deselectCriterion,
    getTitleForDocumentViewCodingCriterion: titleForId,
    getAssociatedRScriptForRScriptCodingCriterion: criterion =>
      Option.of(rScripts.find(script => script.id === criterion.rScriptId))
  }
}
