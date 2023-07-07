import {useMutation} from "@apollo/client"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {useSurveyParticipationInfoLazy} from "shared/graphql/hooks"
import {ParticipantData, SurveyInvitation} from "shared/models"
import {updateParticipantDataAction} from "shared/redux/actions/data-action"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {isDefined, Option, sendBaseSurveyEvent, useErrorHandler} from "shared/utils"
import {
  UserAccountSurveyParticipationMutation,
  UserAccountSurveyParticipationMutationVariables
} from "../../../../graphql/generated/UserAccountSurveyParticipationMutation"
import {userAccountSurveyParticipationMutation} from "../../../../graphql/mutations"
import {navigateToRouteAction} from "../../../../redux/actions/routing-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"

export type LoginParticipantData = Omit<ParticipantData, "__typename">

export interface UseLoginHook {
  readonly login: (email: string, password: string) => void
  readonly anonymousLogin: (data: LoginParticipantData) => void
  readonly loginLoading: boolean
  readonly showSignUpModal: boolean
  readonly surveyInvitationData: Option<SurveyInvitation>
  readonly surveyInvitationLoading: boolean
  readonly isOpenParticipationSurvey: boolean
  readonly t: LucaTFunction
  readonly toggleShowSignUpModal: () => void
  readonly navigateToResumption: () => void
}

export const useLogin = (): UseLoginHook => {
  const dispatch = useDispatch()
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const token = useSelector<AppState, Option<string>>(state => state.data.surveyInvitation.token)

  const {
    surveyParticipationInfoLoading,
    surveyParticipationInfo,
    getSurveyParticipationInfo
  } = useSurveyParticipationInfoLazy()
  const handleError = useErrorHandler()
  const {t} = useLucaTranslation()

  const [participate, {loading: participateLoading}] = useMutation<
    UserAccountSurveyParticipationMutation,
    UserAccountSurveyParticipationMutationVariables
  >(userAccountSurveyParticipationMutation, {
    errorPolicy: "all"
  })

  const surveyInvitationData = surveyParticipationInfo.map(({surveyInvitation}) => surveyInvitation)

  const toggleShowSignUpModal = () => setShowSignUpModal(!showSignUpModal)

  const startProject = (surveyData: SurveyInvitation, participantData?: LoginParticipantData) => {
    dispatch(navigateToRouteAction({routeType: Route.StartProject}))

    if (participantData) {
      sendBaseSurveyEvent({
        surveyId: surveyData.survey.id,
        invitationId: surveyData.id,
        eventType: SurveyEventType.StoreParticipantData,
        data: participantData
      })
    }
  }

  const loginHandler = (email: string, password: string) => {
    surveyInvitationData.forEach(({id}) => {
      participate({
        variables: {surveyInvitationId: id, email, password}
      }).then(({data, errors}) => {
        if (errors === undefined) {
          if (
            data &&
            isDefined(data.userAccountSurveyParticipation?.userAccountId) &&
            isDefined(data.userAccountSurveyParticipation?.userAccount)
          ) {
            const {__typename, ...participantData} = data.userAccountSurveyParticipation?.userAccount

            dispatch(
              updateParticipantDataAction({
                ...participantData,
                __typename: "ParticipantData"
              })
            )

            surveyInvitationData.forEach(surveyData => startProject(surveyData, participantData))
          }
        } else {
          errors.forEach(error => handleError(error))
        }
      })
    })
  }

  const anonLoginHandler = (participantData: LoginParticipantData) => {
    if (participantData) {
      dispatch(
        updateParticipantDataAction({
          ...participantData,
          __typename: "ParticipantData"
        })
      )

      surveyInvitationData.forEach(surveyData => {
        startProject(surveyData, participantData)
      })
    }
  }

  const navigateToResumption = () => dispatch(navigateToRouteAction({routeType: Route.ResumeProject}))

  useEffect(() => {
    token.forEach(invitationToken => getSurveyParticipationInfo(invitationToken))
  }, [token])

  return {
    t,
    surveyInvitationData: surveyInvitationData,
    login: loginHandler,
    anonymousLogin: anonLoginHandler,
    loginLoading: participateLoading,
    showSignUpModal,
    toggleShowSignUpModal: toggleShowSignUpModal,
    surveyInvitationLoading: surveyParticipationInfoLoading,
    navigateToResumption,
    isOpenParticipationSurvey: surveyInvitationData.exists(data => data.survey.isOpenParticipationEnabled)
  }
}
