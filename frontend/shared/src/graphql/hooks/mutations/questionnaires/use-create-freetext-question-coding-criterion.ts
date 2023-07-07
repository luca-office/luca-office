import {useMutation} from "@apollo/client"
import {FreetextQuestionCodingCriterion} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateFreetextQuestionCodingCriterionMutation,
  CreateFreetextQuestionCodingCriterionMutationVariables
} from "../../../generated/CreateFreetextQuestionCodingCriterionMutation"
import {FreetextQuestionCodingCriterionCreation} from "../../../generated/globalTypes"
import {createFreetextCodingCriterionMutation} from "../../../mutations"
import {questionnaireQuestionQuery} from "../../../queries"

export interface CreateFreetextQuestionCodingCriterionProps {
  readonly createFreetextQuestionCodingCriterion: (
    creation: FreetextQuestionCodingCriterionCreation
  ) => Promise<Option<FreetextQuestionCodingCriterion>>
  readonly createFreetextQuestionCodingCriterionLoading: boolean
}

export const useCreateFreetextQuestionCodingCriterion = (): CreateFreetextQuestionCodingCriterionProps => {
  const [createFreetextQuestionCodingCriterion, {loading}] = useMutation<
    CreateFreetextQuestionCodingCriterionMutation,
    CreateFreetextQuestionCodingCriterionMutationVariables
  >(createFreetextCodingCriterionMutation)

  return {
    createFreetextQuestionCodingCriterion: (creation: FreetextQuestionCodingCriterionCreation) =>
      new Promise<Option<FreetextQuestionCodingCriterion>>((resolve, reject) => {
        createFreetextQuestionCodingCriterion({
          variables: {creation},
          refetchQueries: [{query: questionnaireQuestionQuery, variables: {id: creation.questionId}}]
        })
          .then(result => resolve(Option.of(result.data?.createFreetextQuestionCodingCriterion)))
          .catch(reject)
      }),
    createFreetextQuestionCodingCriterionLoading: loading
  }
}
