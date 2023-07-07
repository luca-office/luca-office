import {Dispatch, SetStateAction, useState} from "react"
import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {
  AutomatedCodingItemCreation,
  AutomatedCodingItemRule,
  ManualCodingItemCreation,
  ScoringType
} from "shared/graphql/generated/globalTypes"
import {useCreateAutomatedCodingItem, useCreateManualCodingItem} from "shared/graphql/hooks"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface CreateItemForm {
  readonly title: string
  readonly scoringType: ScoringType
}

export interface UseCreateSubDimensionHook {
  readonly createManualCodingItem: (creation: CreateItemForm) => Promise<void>
  readonly createAutomatedCodingItem: (creation: CreateItemForm) => Promise<void>
  readonly actionsLoading: boolean
  readonly formMethods: UseFormMethods<CreateItemForm>
  readonly isAutomatedRatingSelected: boolean
  readonly isSecondStepActive: boolean
  readonly selectedScoringType: ScoringType
  readonly selectedRule: AutomatedCodingItemRule
  readonly setIsAutomatedRatingSelected: Dispatch<SetStateAction<boolean>>
  readonly setIsSecondStepActive: Dispatch<SetStateAction<boolean>>
  readonly setSelectedScoringType: Dispatch<SetStateAction<ScoringType>>
  readonly setSelectedRule: Dispatch<SetStateAction<AutomatedCodingItemRule>>
}

export const useCreateItemModal = (
  parentDimensionId: UUID,
  scenarioId: UUID,
  codingModelId: UUID
): UseCreateSubDimensionHook => {
  const {createManualCodingItem, createManualCodingItemLoading} = useCreateManualCodingItem(parentDimensionId)
  const {createAutomatedCodingItem, createAutomatedCodingItemLoading} = useCreateAutomatedCodingItem(parentDimensionId)

  const [selectedScoringType, setSelectedScoringType] = useState(ScoringType.Holistic)
  const [isAutomatedRatingSelected, setIsAutomatedRatingSelected] = useState(false)
  const [isSecondStepActive, setIsSecondStepActive] = useState(false)
  const [selectedRule, setSelectedRule] = useState<AutomatedCodingItemRule>(AutomatedCodingItemRule.DocumentView)

  const formMethods = useForm<CreateItemForm>()

  const dispatch = useDispatch()

  const handleCreateManualItem = (creation: CreateItemForm) => {
    const creationValues: ManualCodingItemCreation = {
      dimensionId: parentDimensionId,
      scoringType: creation.scoringType,
      title: creation.title,
      description: ""
    }
    return createManualCodingItem(creationValues).then(response =>
      response.forEach(codingItem =>
        dispatch(
          navigateToRouteAction(Route.ScenarioCodingItemDetail, {
            scenarioId,
            codingModelId,
            dimensionId: codingItem.dimensionId,
            itemId: codingItem.id
          })
        )
      )
    )
  }
  const handleCreateAutomatedItem = (creation: CreateItemForm) => {
    const creationValues: AutomatedCodingItemCreation = {
      dimensionId: parentDimensionId,
      rule: selectedRule,
      title: creation.title,
      description: ""
    }
    return createAutomatedCodingItem(creationValues).then(response =>
      response.forEach(codingItem =>
        dispatch(
          navigateToRouteAction(Route.ScenarioCodingItemDetail, {
            scenarioId,
            codingModelId,
            dimensionId: codingItem.dimensionId,
            itemId: codingItem.id
          })
        )
      )
    )
  }

  return {
    createManualCodingItem: handleCreateManualItem,
    createAutomatedCodingItem: handleCreateAutomatedItem,
    actionsLoading: createManualCodingItemLoading || createAutomatedCodingItemLoading,
    formMethods,
    isAutomatedRatingSelected,
    isSecondStepActive,
    selectedRule,
    selectedScoringType,
    setIsAutomatedRatingSelected,
    setIsSecondStepActive,
    setSelectedRule,
    setSelectedScoringType
  }
}
