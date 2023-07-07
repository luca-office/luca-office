import {useForm, UseFormMethods} from "react-hook-form"
import {CodingDimensionCreation} from "../../../graphql/generated/globalTypes"
import {useCreateCodingDimension} from "../../../graphql/hooks"
import {CodingDimension} from "../../../models"

export interface CreateMainDimensionForm {
  readonly title: string
}

export interface UseCreateMainDimensionHook {
  readonly createMainDimension: (title: string) => void
  readonly createMainDimensionLoading: boolean
  readonly formMethods: UseFormMethods<CreateMainDimensionForm>
}

export const useCreateMainDimensionModal = (
  codingModelId: UUID,
  scenarioId: UUID,
  onCreate?: (codingDimension: CodingDimension) => void
): UseCreateMainDimensionHook => {
  const {createCodingDimension, createCodingDimensionLoading} = useCreateCodingDimension(codingModelId, scenarioId)

  const formMethods = useForm<CreateMainDimensionForm>()

  const handleCreateMainDimensionModal = (title: string) => {
    const creation: CodingDimensionCreation = {
      codingModelId,
      description: "",
      title,
      parentDimensionId: null
    }
    createCodingDimension(creation).then(response => response.forEach(codingDimension => onCreate?.(codingDimension)))
  }

  return {
    createMainDimension: handleCreateMainDimensionModal,
    createMainDimensionLoading: createCodingDimensionLoading,
    formMethods
  }
}
