import * as React from "react"
import {useDispatch} from "react-redux"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {useCreateProjectModule, useLightQuestionnaires, useProject, useProjectModules} from "shared/graphql/hooks"
import {QuestionnaireLight} from "shared/models"
import {useCheckUserClaims} from "../../../../../hooks/use-check-user-claims"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {useTestSurveyDeletion} from "../../../../scenarios/selection/hooks/use-test-survey-deletion"
import {checkIsProjectFinalized} from "../../../utils"

export interface UseProjectQuestionnaireSelectionHook {
  readonly isProjectFinalized: boolean // finalized == existing survey
  readonly openSelectionDetail: (questionnaireId: UUID) => void
  readonly openProjectDetail: () => void
  readonly saveQuestionnaireAssignment: (selectedQuestionnaires: QuestionnaireLight[]) => void
  readonly alreadyAssignedQuestionnaires: QuestionnaireLight[]
  readonly questionnaires: QuestionnaireLight[]
  readonly userMayFinalizeWithoutPublishing: boolean
}

export const useProjectQuestionnaireSelection = (projectId: UUID): UseProjectQuestionnaireSelectionHook => {
  const dispatch = useDispatch()

  const {questionnaires: allQuestionnaires} = useLightQuestionnaires(false)
  const {createProjectModule} = useCreateProjectModule()
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {project, projectLoading} = useProject(projectId)
  const {userClaims, userClaimsCheckLoading} = useCheckUserClaims()
  const {deleteTestSurveys} = useTestSurveyDeletion(projectId)

  const projectQuestionnaires = React.useMemo(
    () =>
      projectModules.reduce(
        (accumulator, module) => (!module.questionnaire ? accumulator : [...accumulator, module.questionnaire]),
        [] as QuestionnaireLight[]
      ),
    [projectModulesLoading]
  )
  const isProjectFinalized = !projectLoading && checkIsProjectFinalized(project)
  const userMayFinalizeWithoutPublishing = !userClaimsCheckLoading && userClaims.mayFinalizeWithoutPublishing

  const openProjectDetail = () => dispatch(navigateToRouteAction(Route.ProjectDetail, {id: projectId}))
  const openSelectionDetail = (questionnaireId: UUID) =>
    dispatch(navigateToRouteAction(Route.QuestionnaireSelectionDetail, {id: projectId, questionnaireId}))
  const saveQuestionnaireAssignment = (selectedQuestionnaires: QuestionnaireLight[]) => {
    const selectedQuestionnaireIds = selectedQuestionnaires.map(questionnaire => questionnaire.id)
    const createdQuestionnaireIds = selectedQuestionnaireIds.filter(
      id => !projectQuestionnaires.some(questionnaire => questionnaire.id === id)
    )

    deleteTestSurveys().then(() => {
      createdQuestionnaireIds.forEach(questionnaireId =>
        createProjectModule({
          projectId,
          questionnaireId,
          moduleType: ProjectModuleType.Questionnaire
        })
      )
      openProjectDetail()
    })
  }

  return {
    alreadyAssignedQuestionnaires: projectQuestionnaires,
    isProjectFinalized,
    openProjectDetail,
    openSelectionDetail,
    questionnaires: allQuestionnaires
      .map(questionnaires =>
        questionnaires.filter(
          questionnaire =>
            (isProjectFinalized ? !!questionnaire.publishedAt : true) &&
            (!userMayFinalizeWithoutPublishing ? !questionnaire.finalizedAt : true)
        )
      )
      .getOrElse([]),
    saveQuestionnaireAssignment,
    userMayFinalizeWithoutPublishing
  }
}
