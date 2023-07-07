import {css} from "@emotion/react"
import * as React from "react"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyInvitation} from "shared/models"
import {spacingHuge} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes, Option, sendBaseSurveyEvent} from "shared/utils"
import {ReportingLoginCard} from "../../reporting"
import {ProjectMetadata} from "../login/project-metadata/project-metadata"
import {UserMetadata} from "../login/user-metadata/user-metadata"
import {useStartProject} from "./hooks/use-start-project"
import {ProjectInformation} from "./project-information/project-information"
import {StartProjectConfirmModal} from "./start-project-confirm-modal/start-project-confirm-modal"

export interface StartProjectProps {
  readonly surveyInvitationData: Option<SurveyInvitation>
}

export const StartProject: React.FC<StartProjectProps> = ({surveyInvitationData}) => {
  const {t} = useLucaTranslation()
  const {
    loadProjectModules,
    loading,
    participantData: participantDataOption,
    isStartProjectConfirmModalVisible,
    setIsStartProjectConfirmModalVisible,
    isSurveyCompleted,
    isSurveyParticipationCompleted,
    isOpenParticipation,
    surveyId: surveyIdOption,
    token: tokenOption,
    isPrivacyPolicyChecked,
    updateIsPrivacyPolicyChecked
  } = useStartProject()

  const startProject = (invitationData: SurveyInvitation) => {
    setIsStartProjectConfirmModalVisible(false)
    sendBaseSurveyEvent({
      surveyId: invitationData.survey.id,
      invitationId: invitationData.id,
      eventType: SurveyEventType.StartProject
    })
    loadProjectModules(invitationData.survey.project.id)
  }

  return surveyInvitationData
    .map(invitationData => {
      return isSurveyCompleted || isSurveyParticipationCompleted
        ? surveyIdOption
            .flatMap(surveyId =>
              tokenOption.map(token => (
                <React.Fragment>
                  <ProjectMetadata
                    t={t}
                    metadata={{
                      endsAt: invitationData.survey.endsAt,
                      startsAt: invitationData.survey.startsAt,
                      maxDurationInSeconds: invitationData.survey.project.maxDurationInSeconds,
                      projectName: invitationData.survey.project.name
                    }}
                  />
                  <ReportingLoginCard
                    customStyles={styles.reportingCard}
                    surveyId={surveyId}
                    token={!isOpenParticipation ? token : undefined}
                  />
                </React.Fragment>
              ))
            )
            .orNull()
        : participantDataOption
            .map(participantData => (
              <React.Fragment>
                <ProjectMetadata
                  t={t}
                  metadata={{
                    endsAt: invitationData.survey.endsAt,
                    startsAt: invitationData.survey.startsAt,
                    maxDurationInSeconds: invitationData.survey.project.maxDurationInSeconds,
                    projectName: invitationData.survey.project.name
                  }}
                />
                <UserMetadata t={t} participantData={participantData} />
                <ProjectInformation
                  durationInMinutes={convertSecondsToMinutes(invitationData.survey.project.maxDurationInSeconds)}
                  isStartLoading={loading}
                  isPrivacyPolicyChecked={isPrivacyPolicyChecked}
                  updateIsPrivacyPolicyChecked={updateIsPrivacyPolicyChecked}
                  onStartClicked={() => setIsStartProjectConfirmModalVisible(true)}
                />
                {isStartProjectConfirmModalVisible && (
                  <StartProjectConfirmModal
                    surveyInvitation={invitationData}
                    onConfirm={() => startProject(invitationData)}
                    onDismiss={() => setIsStartProjectConfirmModalVisible(false)}
                  />
                )}
              </React.Fragment>
            ))
            .orNull()
    })
    .orNull()
}

const styles = {
  reportingCard: css({
    marginTop: spacingHuge
  })
}
