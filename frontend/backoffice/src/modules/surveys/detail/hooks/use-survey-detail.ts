import {pick} from "lodash-es"
import {useState} from "react"
import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {SurveyUpdate} from "shared/graphql/generated/globalTypes"
import {
  ProjectProps,
  SurveyProps,
  useProject,
  useRatings,
  useSurvey,
  useSurveyResultsOverview,
  useSurveyUserAccounts,
  useUpdateSurvey
} from "shared/graphql/hooks"
import {CompletedParticipantCount, SurveyResultsOverview} from "shared/models"
import {Route as SharedRoute} from "shared/routes"
import {find, getCompletedParticipantsCount, isDefined, Option} from "shared/utils"
import {isSurveyFinished} from "shared/utils/survey-finished"
import {SurveyTiming} from "../../../../enums"
import {UserAccount} from "../../../../models"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {getManualSurveyTimingStatus, getSurveyTimingStatus} from "../../../../utils"
import {surveyPollingRate} from "../../../monitoring/config/config"
import {isManualSurvey} from "../../utils/common"

export interface SurveyDetailForm {
  readonly title: string
  readonly description: string
}

export interface UseSurveyDetailHook extends Pick<SurveyProps, "survey">, Pick<ProjectProps, "project"> {
  readonly author: Option<UserAccount>
  readonly dataLoading: boolean
  readonly formMethods: UseFormMethods<SurveyDetailForm>
  readonly inviteAttendeesModalVisible: boolean
  readonly isEditable: boolean
  readonly isInvitationEnabled: boolean
  readonly navigateToDashboard: () => void
  readonly navigateToProjectDetail: () => void
  readonly navigateToSurveyUpdate: () => void
  readonly toggleInviteAttendeesModal: () => void
  readonly navigateToRatingOverview: () => void
  readonly navigateToReportingOverview: () => void
  readonly updateInProgress: boolean
  readonly updateSurvey: (id: string, update: SurveyDetailForm) => void
  readonly surveyResultsOverview: Option<SurveyResultsOverview>
  readonly isRatingFinalized: boolean
  readonly raters: UserAccount[]
  readonly completedParticipantsCount: CompletedParticipantCount
}

export const useSurveyDetail = (projectId: UUID, surveyId: UUID): UseSurveyDetailHook => {
  const dispatch = useDispatch()
  const [showInviteAttendeesModal, setShowInviteAttendeesModal] = useState(false)

  const {updateSurvey, updateSurveyLoading} = useUpdateSurvey()
  const {survey: surveyOption, surveyLoading} = useSurvey(surveyId)
  const {project: projectOption, projectLoading} = useProject(projectId)
  const {ratings: allRatings, ratingsLoading} = useRatings(surveyId)
  const {surveyResultsOverview, surveyResultsOverviewLoading} = useSurveyResultsOverview(
    surveyId,
    false,
    surveyOption.exists(survey => isSurveyFinished(survey)) ? undefined : surveyPollingRate
  )
  const {surveyUserAccounts: raters} = useSurveyUserAccounts(surveyId)

  const isManualSurveyExecutionType = isManualSurvey(surveyOption.map(survey => survey.executionType))

  const isRatingFinalized = find(({isFinalScore}) => isFinalScore, allRatings).exists(({finalizedAt}) =>
    isDefined(finalizedAt)
  )

  const formMethods = useForm<SurveyDetailForm>()

  const {isEditable, isInvitationEnabled} = surveyOption
    .map(survey => {
      const surveyTimingStatus = isManualSurveyExecutionType
        ? getManualSurveyTimingStatus(survey)
        : getSurveyTimingStatus(survey.startsAt, survey.endsAt)
      return {
        isEditable: surveyTimingStatus === SurveyTiming.Future && !survey.isCompleted,
        isInvitationEnabled:
          (surveyTimingStatus === SurveyTiming.Present || surveyTimingStatus === SurveyTiming.Future) &&
          !survey.isCompleted
      }
    })
    .getOrElse({isEditable: false, isInvitationEnabled: false})

  const navigateToProjectDetail = () => dispatch(navigateToRouteAction(Route.ProjectDetail, {id: projectId}))
  const navigateToSurveyUpdate = () => dispatch(navigateToRouteAction(Route.SurveyEdit, {id: projectId, surveyId}))
  const navigateToDashboard = () =>
    dispatch(
      navigateToRouteAction(SharedRoute.SurveyMonitoring, {
        projectId,
        surveyId
      })
    )
  const navigateToRatingOverview = () => dispatch(navigateToRouteAction(Route.SurveyScoring, {projectId, surveyId}))
  const navigateToReportingOverview = () =>
    dispatch(navigateToRouteAction(Route.SurveyReporting, {projectId, surveyId}))

  const handleUpdate = (id: UUID, update: SurveyDetailForm) => {
    updateSurvey(id, ({
      ...surveyOption
        .map(survey =>
          pick(survey, "startsAt", "endsAt", "authenticationType", "isOpenParticipationEnabled", "executionType")
        )
        .orUndefined(),
      ...update
    } as unknown) as SurveyUpdate).then(response =>
      response.forEach(entity =>
        dispatch(navigateToRouteAction(Route.SurveyDetail, {id: projectId, surveyId: entity.id}))
      )
    )
  }

  const completedParticipantsCount = surveyResultsOverview.map(getCompletedParticipantsCount).getOrElse({
    numCompletedParticipants: 0,
    totalParticipants: 0
  })

  return {
    isEditable,
    isInvitationEnabled,
    author: projectOption.map(project => project.author),
    dataLoading: projectLoading || ratingsLoading || surveyLoading || surveyResultsOverviewLoading,
    formMethods,
    navigateToDashboard,
    navigateToProjectDetail,
    navigateToSurveyUpdate,
    navigateToRatingOverview,
    navigateToReportingOverview,
    survey: surveyOption,
    project: projectOption,
    updateInProgress: updateSurveyLoading,
    updateSurvey: handleUpdate,
    inviteAttendeesModalVisible: showInviteAttendeesModal,
    toggleInviteAttendeesModal: () => setShowInviteAttendeesModal(!showInviteAttendeesModal),
    surveyResultsOverview,
    isRatingFinalized,
    raters,
    completedParticipantsCount
  }
}
