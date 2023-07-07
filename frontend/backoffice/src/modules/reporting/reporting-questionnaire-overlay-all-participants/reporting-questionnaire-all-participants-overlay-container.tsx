import * as React from "react"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {LoadingIndicator, Overlay} from "shared/components"
import {
  useQuestionnaire,
  useQuestionnaireSurveyResultsForParticipants,
  useSurveyInvitations
} from "shared/graphql/hooks"
import {useFreetextQuestionCodingCriteriaForQuestionnaire} from "shared/graphql/hooks/queries/ratings/use-freetext-question-coding-criteria"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {NavigationConfig} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {ReportingQuestionnaireAllParticipantsOverlay} from "./reporting-questionnaire-all-participants-overlay"

interface Props {
  readonly surveyId: UUID
  readonly questionnaireId: UUID
  readonly backRouteConfig?: NavigationConfig<Route>
  readonly onClose?: () => void
}

export const ReportingQuestionnaireAllParticipantsOverlayContainer: React.FC<Props> = props => {
  const {t} = useLucaTranslation()
  const {surveyId, questionnaireId, backRouteConfig, onClose} = props
  const [selectedNodeId, updateSelectedNodeId] = useState(Option.none<string>())

  const dispatch = useDispatch()

  const {survey: surveyOption} = useSurveyLight(surveyId)
  const {questionnaire: questionnaireOption} = useQuestionnaire(questionnaireId)
  const {
    questionnaireSurveyResultsForParticipants,
    questionnaireSurveyResultsForParticipantsLoading
  } = useQuestionnaireSurveyResultsForParticipants(questionnaireId, surveyId)
  const {freetextQuestionCodingCriteria} = useFreetextQuestionCodingCriteriaForQuestionnaire(questionnaireId)

  const {surveyInvitations, surveyInvitationsLoading} = useSurveyInvitations(surveyId)

  const handleCloseOverlay = () =>
    backRouteConfig !== undefined
      ? dispatch(navigateToRouteAction(backRouteConfig.route, backRouteConfig.payload))
      : onClose?.()

  return (
    <Overlay>
      {surveyOption
        .flatMap(survey =>
          questionnaireOption.map(questionnaire =>
            !questionnaireSurveyResultsForParticipantsLoading && !surveyInvitationsLoading ? (
              <ReportingQuestionnaireAllParticipantsOverlay
                t={t}
                project={survey.project}
                survey={survey}
                surveyInvitations={surveyInvitations}
                questionnaire={questionnaire}
                questionnaireSurveyResultsForParticipants={questionnaireSurveyResultsForParticipants}
                freetextQuestionCodingCriteriaForQuestionnaire={freetextQuestionCodingCriteria}
                onCloseOverlay={handleCloseOverlay}
                selectedNodeId={selectedNodeId.getOrElse(questionnaire.id)}
                updateSelectedNodeId={id => updateSelectedNodeId(Option.of(id))}
              />
            ) : (
              <LoadingIndicator />
            )
          )
        )
        .getOrElse(<LoadingIndicator />)}
    </Overlay>
  )
}
