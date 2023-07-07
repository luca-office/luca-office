import {sum} from "lodash-es"
import * as React from "react"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ChatWindow,
  Icon,
  LabelledCard,
  LoadingIndicator,
  Overlay,
  ReadonlyActionField,
  ReportingProgressInfo,
  ReportParticipantOverviewTable,
  Text,
  Tooltip
} from "shared/components"
import {IconName, ProjectProgressType} from "shared/enums"
import {ProjectModuleProgressType, Salutation} from "shared/graphql/generated/globalTypes"
import {useLucaClipboard} from "shared/hooks"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {isDefined, salutationToLanguageKey} from "shared/utils"
import {useSupervisorChat} from "../../monitoring/dashboard/hooks/use-supervisor-chat"
import {finalScoreCount} from "../utils/participant-overview"
import {useParticipantOverview} from "./hooks/use-participant-overview"
import {participantOverviewStyle as styles} from "./participant-overview.style"

export interface ParticipantOverviewProps {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly surveyInvitationId: UUID
  readonly navigateToScenarioDetail: (scenarioId: UUID) => void
  readonly navigateToQuestionnaireDetail: (questionnaireId: UUID) => void
}

export const ParticipantOverview: React.FunctionComponent<ParticipantOverviewProps> = ({
  projectId,
  surveyId,
  surveyInvitationId,
  navigateToScenarioDetail,
  navigateToQuestionnaireDetail
}) => {
  const {t} = useLucaTranslation()

  const {copy: copyToClipboard} = useLucaClipboard()

  const {
    surveyProgress,
    dataLoading,
    projectProgress,
    projectModuleScores,
    participantIndex,
    surveyResultsOverview,
    navigateToModule,
    completedParticipantsCount
  } = useParticipantOverview(
    projectId,
    surveyId,
    surveyInvitationId,
    navigateToScenarioDetail,
    navigateToQuestionnaireDetail
  )

  const {
    isChatVisible,
    openChat,
    closeChat,
    setChatParticipantsIds,
    chatParticipants,
    messages,
    sendSupervisorMessage,
    isChatAccessible,
    navigateBackToDashboard,
    isChatEnabledForSurvey
  } = useSupervisorChat(surveyId, projectId, surveyProgress.map(progress => [progress]).getOrElse([]))

  const chatParticipant = chatParticipants[0]

  React.useEffect(() => {
    setChatParticipantsIds([surveyInvitationId])
  }, [surveyInvitationId])

  return dataLoading ? (
    <div css={styles.loadingIndicator}>
      <LoadingIndicator />
    </div>
  ) : (
    <>
      {surveyProgress
        .map(progress => (
          <div css={styles.content}>
            <Card>
              <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={styles.cardHeader}>
                <div css={Flex.row}>
                  <Icon name={IconName.Student} hasSpacing customStyles={styles.cardHeaderIcon} />
                  {progress.displayName}
                </div>
                {isChatEnabledForSurvey && (
                  <Button
                    css={styles.headerButton}
                    icon={IconName.SpeechBubble}
                    onClick={() => openChat()}
                    disabled={projectProgress !== ProjectProgressType.SurveyInProgress}>
                    {t("reporting_participant_overview_header_messages", {count: messages.length})}
                  </Button>
                )}
              </CardHeader>
              <CardContent customStyles={styles.contentCard}>
                <LabelledCard label={t("dashboard__attendee_information_title")}>
                  <Card customStyles={styles.informationCard}>
                    <ReadonlyActionField
                      renderValue={() => t(salutationToLanguageKey(progress.salutation as Salutation))}
                      disabled={true}
                      label={t("dashboard__attendee_salutation_label")}
                    />
                    <ReadonlyActionField
                      renderValue={() => progress.displayName}
                      disabled={true}
                      label={t("dashboard__attendee_attendee_label")}
                    />
                    <ReadonlyActionField
                      renderValue={() => participantIndex}
                      disabled={true}
                      label={t("dashboard__attendee_attendee_index")}
                    />
                    <ReadonlyActionField
                      renderValue={() => (
                        <Tooltip
                          customStyles={styles.tokenWrapper}
                          title={t("clipboard__copy")}
                          onWrapperClick={() => copyToClipboard(progress.token)}>
                          <Text size={TextSize.Medium}>{progress.token}</Text>
                          <Icon customStyles={styles.tokenCopyIcon} className={"copy-icon"} name={IconName.Duplicate} />
                        </Tooltip>
                      )}
                      disabled={true}
                      label={t("dashboard__attendee_attendee_token")}
                    />
                  </Card>
                </LabelledCard>
                {projectProgress === ProjectProgressType.RatingCompleted && (
                  <ReportingProgressInfo
                    averageScore={surveyResultsOverview.map(results => results.averageScore).orNull()}
                    maximumScore={sum(projectModuleScores.map(module => module.maxScore ?? 0))}
                    singleParticipantScore={sum(projectModuleScores.map(module => module.score ?? 0))}
                    completedParticipantsCount={completedParticipantsCount}
                  />
                )}
                <LabelledCard
                  label={
                    projectProgress === ProjectProgressType.RatingInProgress ||
                    projectProgress === ProjectProgressType.RatingCompleted
                      ? t("dashboard__attendee__scoring_progress_title", {
                          count: projectModuleScores.filter(module => module.score !== null).length,
                          total: projectModuleScores.length
                        })
                      : t("dashboard__attendee_progress_title", {
                          count: surveyProgress
                            .map(
                              progress =>
                                progress.moduleProgress.filter(
                                  module => module.status === ProjectModuleProgressType.Completed
                                ).length
                            )
                            .getOrElse(0),
                          total: surveyProgress.map(progress => progress.moduleProgress.length).getOrElse(0)
                        })
                  }>
                  <Card>
                    <ReportParticipantOverviewTable
                      surveyProgress={progress}
                      projectProgressType={projectProgress}
                      onClick={({moduleType, moduleId}) => navigateToModule(moduleType, moduleId)}
                    />
                    {projectProgress !== ProjectProgressType.NotStarted &&
                    projectProgress !== ProjectProgressType.SurveyInProgress ? (
                      <CardFooter>
                        <div css={styles.footerItem}>{t("reporting_participant_overview_total_points_label")}</div>
                        <div css={styles.footerItem} />
                        <div css={styles.footerItem}>
                          {projectProgress === ProjectProgressType.RatingCompleted
                            ? t("reporting_participant_overview_total_points", {
                                points: sum(projectModuleScores.map(module => module.score ?? 0)),
                                maxPoints: sum(projectModuleScores.map(module => module.maxScore ?? 0))
                              })
                            : t("reporting_participant_overview_final_score_count", {
                                count: finalScoreCount(projectModuleScores),
                                total: projectModuleScores.length
                              })}
                        </div>
                        <Icon
                          name={
                            projectProgress === ProjectProgressType.RatingInProgress
                              ? IconName.Sandglass
                              : IconName.Check
                          }
                          hasSpacing
                          customStyles={[styles.lastFooterItem, styles.footerIcon]}
                        />
                      </CardFooter>
                    ) : (
                      <CardFooter customStyles={styles.emptyFooter} />
                    )}
                  </Card>
                </LabelledCard>
              </CardContent>
              <CardFooter customStyles={styles.emptyFooter} />
            </Card>
            {isChatVisible && isDefined(chatParticipant) && (
              <Overlay>
                <ChatWindow
                  chatTitle={chatParticipant.displayName}
                  messages={messages}
                  onClose={closeChat}
                  onMessageSend={sendSupervisorMessage}
                  headerButtonConfig={{
                    icon: IconName.Student,
                    textKey: "chat__supervisor_back",
                    onBackNavigation: navigateBackToDashboard
                  }}
                  isChatAccessible={isChatAccessible}
                  instructionTitle={t("chat__instruction_reporting_attendee", {name: chatParticipant.displayName})}
                />
              </Overlay>
            )}
          </div>
        ))
        .orNull()}
    </>
  )
}
