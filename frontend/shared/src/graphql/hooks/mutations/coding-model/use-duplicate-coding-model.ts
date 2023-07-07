import {PureQueryOptions, RefetchQueriesFunction, useMutation} from "@apollo/client"
import {CodingModel} from "../../../../models"
import {Option} from "../../../../utils"
import {
  DuplicateCodingModelMutation,
  DuplicateCodingModelMutationVariables
} from "../../../generated/DuplicateCodingModelMutation"
import {duplicateCodingModelMutation} from "../../../mutations"

export interface DuplicateCodingModelProps {
  readonly duplicateCodingModel: (id: UUID, targetScenarioId: UUID) => Promise<Option<CodingModel>>
  readonly duplicateCodingModelLoading: boolean
}

export const useDuplicateCodingModel = (
  refetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction | undefined
): DuplicateCodingModelProps => {
  const [duplicateCodingModel, {loading}] = useMutation<
    DuplicateCodingModelMutation,
    DuplicateCodingModelMutationVariables
  >(duplicateCodingModelMutation)

  return {
    duplicateCodingModel: (id: UUID, targetScenarioId: UUID) =>
      new Promise<Option<CodingModel>>((resolve, reject) => {
        duplicateCodingModel({
          variables: {
            id,
            targetScenarioId
          },
          refetchQueries
        })
          .then(result => resolve(Option.of<CodingModel>(result?.data?.duplicateCodingModel)))
          .catch(reject)
      }),
    duplicateCodingModelLoading: loading
  }
}
