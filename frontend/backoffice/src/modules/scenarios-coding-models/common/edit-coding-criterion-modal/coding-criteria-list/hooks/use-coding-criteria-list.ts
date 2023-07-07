import React from "react"
import {useCreateCodingCriterion} from "shared/graphql/hooks"
import {Option} from "shared/utils"
import {CodingCriterionCreationModalVisibility} from "../../../../detail/coding-item/coding-item-detail-view-container"

export interface UseCodingCriteriaListHook {
  readonly createCodingCriterion: () => void
  readonly visibleCreateCriterionModal: Option<CodingCriterionCreationModalVisibility>
  readonly setVisibleCreateCriterionModal: React.Dispatch<
    React.SetStateAction<Option<CodingCriterionCreationModalVisibility>>
  >
}

export const useCodingCriteriaList = (codingItemId: UUID, codingModelId: UUID): UseCodingCriteriaListHook => {
  const {createCodingCriterion} = useCreateCodingCriterion(codingItemId, codingModelId)

  const [visibleCreateCriterionModal, setVisibleCreateCriterionModal] = React.useState<
    Option<CodingCriterionCreationModalVisibility>
  >(Option.none())

  const handleCodingCriterionCreation = () => {
    createCodingCriterion({
      description: "",
      score: 0,
      itemId: codingItemId
    })
  }

  return {
    createCodingCriterion: handleCodingCriterionCreation,
    visibleCreateCriterionModal,
    setVisibleCreateCriterionModal
  }
}
