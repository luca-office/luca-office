import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {CodingDimensionCreation} from "shared/graphql/generated/globalTypes"
import {useCreateCodingDimension} from "shared/graphql/hooks"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface CreateMainDimensionForm {
  readonly title: string
}

export interface UseCreateSubDimensionHook {
  readonly createSubDimension: (title: string) => Promise<void>
  readonly createSubDimensionLoading: boolean
  readonly formMethods: UseFormMethods<CreateMainDimensionForm>
}

export const useCreateSubDimensionModal = (
  codingModelId: UUID,
  parentDimensionId: UUID,
  scenarioId: UUID
): UseCreateSubDimensionHook => {
  const {createCodingDimension, createCodingDimensionLoading} = useCreateCodingDimension(codingModelId, scenarioId)

  const formMethods = useForm<CreateMainDimensionForm>()

  const dispatch = useDispatch()

  const handleCreateSubDimension = (title: string) => {
    const creation: CodingDimensionCreation = {
      codingModelId,
      description: "",
      title,
      parentDimensionId
    }
    return createCodingDimension(creation).then(response => {
      response.forEach(codingDimension =>
        dispatch(
          navigateToRouteAction(Route.ScenarioCodingDimensionDetail, {
            scenarioId,
            codingModelId,
            dimensionId: codingDimension.id
          })
        )
      )
      return Promise.resolve()
    })
  }

  return {
    createSubDimension: handleCreateSubDimension,
    createSubDimensionLoading: createCodingDimensionLoading,
    formMethods
  }
}
