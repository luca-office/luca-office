import {useMutation} from "@apollo/client"
import {Survey} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {CreateSurveyMutation, CreateSurveyMutationVariables} from "../../../generated/CreateSurveyMutation"
import {GetSurveysQuery, GetSurveysQueryVariables} from "../../../generated/GetSurveysQuery"
import {SurveyCreation} from "../../../generated/globalTypes"
import {createSurveyMutation} from "../../../mutations"
import {projectQuery, surveysQuery} from "../../../queries"

export interface CreateSurveyProps {
  readonly createSurvey: (creation: SurveyCreation) => Promise<Option<Survey>>
  readonly isCreateSurveyLoading: boolean
}

export const useCreateSurvey = (): CreateSurveyProps => {
  const [createSurvey, {loading}] = useMutation<CreateSurveyMutation, CreateSurveyMutationVariables>(
    createSurveyMutation
  )

  return {
    createSurvey: (creation: SurveyCreation) =>
      new Promise<Option<Survey>>((resolve, reject) => {
        createSurvey({
          variables: {creation},
          update: createEntityInCache<GetSurveysQuery, CreateSurveyMutation, GetSurveysQueryVariables>(
            surveysQuery,
            "surveys",
            query => query.surveys,
            "createSurvey",
            {projectId: creation.projectId}
          ),
          refetchQueries: [{query: projectQuery, variables: {id: creation.projectId}}]
        })
          .then(result => resolve(Option.of(result.data?.createSurvey)))
          .catch(reject)
      }),
    isCreateSurveyLoading: loading
  }
}
