import {useDeleteSurvey, useSurveys} from "shared/graphql/hooks"

export interface UseTestSurveyDeletionHook {
  readonly deleteTestSurveys: () => Promise<void[]>
}

export const useTestSurveyDeletion = (projectId: UUID): UseTestSurveyDeletionHook => {
  const {surveys} = useSurveys(projectId)
  const {deleteEntity: deleteSurvey} = useDeleteSurvey(projectId)

  const deleteTestSurveys = () => {
    return Promise.all(surveys.filter(survey => survey.isTestSurvey).map(({id}) => deleteSurvey(id)))
  }

  return {
    deleteTestSurveys
  }
}
