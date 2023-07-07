import * as React from "react"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ChatWindow,
  Heading,
  Icon,
  LabelledCard,
  LoadingIndicator,
  Overlay,
  ReportingProgressInfo,
  Text
} from "../../components"
import {HeadingLevel, IconName, ProgressIndicatorStatus, RatingStatus} from "../../enums"
import {ProjectModuleProgressType} from "../../graphql/generated/globalTypes"
import {
  CompletedParticipantCount,
  DisplayChatMessage,
  ParticipantProjectProgress,
  ProjectModuleScore
} from "../../models"
import {boxHeightSmall, Flex, FontWeight, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {isDefined, Option} from "../../utils"
import {ModuleProgressIndicator} from "../module-progress-indicator/module-progress-indicator"
import {participantQuestionnaireDetailStyle as styles} from "./participant-questionnaire-detail.style"
import {ResultsCard} from "./results-card/results-card"

interface ChatContainer {
  readonly isChatVisible: boolean
  readonly chatParticipants: ParticipantProjectProgress[]
  readonly messages: DisplayChatMessage[]
  readonly isChatAccessible: boolean
  readonly navigateBackToDashboard: () => void
  readonly setChatParticipantsIds: (ids: UUID[]) => void
  readonly sendSupervisorMessage: (message: string) => void
  readonly openChat: () => void
  readonly closeChat: () => void
  readonly newParticipantMessages: number
  readonly isChatEnabledForSurvey: boolean
}

export interface ParticipantQuestionnaireDetailProps {
  readonly surveyInvitationId: UUID
  readonly surveyProgress: Option<ParticipantProjectProgress>
  readonly ratingStatus: RatingStatus
  readonly moduleStatus: ProjectModuleProgressType
  readonly questionnaireProgress: ProgressIndicatorStatus[]
  readonly questionnaireDescription: string
  readonly questionnaireTitle: string
  readonly chat?: ChatContainer
  readonly questionnaireScore: ProjectModuleScore[]
  readonly index: Option<number>
  readonly averageScore: Option<number>
  readonly navigateBack: () => void
  readonly showScoringOverlay: () => void
  readonly completedParticipantsCount: CompletedParticipantCount
  readonly isLoading: boolean
  readonly isOfficeReporting?: boolean
}

export const ParticipantQuestionnaireDetail: React.FC<ParticipantQuestionnaireDetailProps> = ({
  surveyInvitationId,
  surveyProgress,
  ratingStatus,
  questionnaireProgress,
  questionnaireDescription,
  questionnaireTitle,
  chat,
  questionnaireScore,
  index: indexOption,
  averageScore,
  moduleStatus,
  navigateBack,
  showScoringOverlay,
  completedParticipantsCount,
  isLoading,
  isOfficeReporting
}) => {
  const {t} = useLucaTranslation()

  const chatParticipant = chat?.chatParticipants[0]
  React.useEffect(() => {
    chat?.setChatParticipantsIds([surveyInvitationId])
  }, [surveyInvitationId])

  const maximumScore = questionnaireScore[0]?.maxScore ?? undefined
  const score = questionnaireScore[0]?.score ?? undefined

  return indexOption
    .map(index =>
      surveyProgress
        .map(progress => (
          <>
            <Card>
              <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={styles.cardHeader}>
                <div css={[Flex.row, styles.attendeeName]} onClick={navigateBack}>
                  <Icon name={IconName.ArrowLeft} hasSpacing customStyles={styles.cardHeaderIcon} />
                  {t("dashboard__attendee_questionnaire_back_to_overview", {participantName: progress.displayName})}
                </div>
                {chat && chat.isChatEnabledForSurvey && (
                  <Button css={styles.headerButton} icon={IconName.SpeechBubble} onClick={chat.openChat}>
                    {t("reporting_participant_overview_header_messages", {count: chat.messages.length})}
                  </Button>
                )}
              </CardHeader>
              {isLoading ? (
                <div css={styles.loadingIndicatorContainer}>
                  <LoadingIndicator />
                </div>
              ) : (
                <>
                  <CardContent customStyles={styles.content}>
                    <div css={styles.heading}>
                      <div css={styles.headingRow}>
                        <div css={Flex.row}>
                          <Icon width={boxHeightSmall} height={boxHeightSmall} name={IconName.Questionnaire} />
                          <Heading customStyles={styles.headingText} level={HeadingLevel.h1}>
                            {t("dashboard__attendee_questionnaires_title", {
                              index: index,
                              questionnaireName: questionnaireTitle
                            })}
                          </Heading>
                        </div>
                        {ratingStatus !== RatingStatus.Completed && (
                          <Heading level={HeadingLevel.h2}>
                            {moduleStatus === ProjectModuleProgressType.InProgress
                              ? t("dashboard__attendee_questionnaires_status_in_progress")
                              : t("dashboard__attendee_questionnaires_status_finished")}
                          </Heading>
                        )}
                      </div>
                      <Text size={TextSize.Medium}>{questionnaireDescription}</Text>
                    </div>
                    {ratingStatus === RatingStatus.Completed && questionnaireScore.length > 0 && (
                      <ReportingProgressInfo
                        averageScore={averageScore.orNull()}
                        maximumScore={maximumScore ?? 0}
                        singleParticipantScore={score ?? 0}
                        completedParticipantsCount={completedParticipantsCount}
                        customStyles={styles.reportingProgressInfo}
                        customParticipantScoreTextKey={
                          isOfficeReporting ? "reporting__overview_participant_score" : undefined
                        }
                      />
                    )}
                    {!isOfficeReporting && (
                      <LabelledCard label={t("dashboard__attendee_questionnaires_progress")} customStyles={styles.card}>
                        <Card hasShadow={true} customStyles={styles.innerCard}>
                          <Heading
                            level={HeadingLevel.h3}
                            fontWeight={FontWeight.Bold}
                            customStyles={styles.headingQuestionsProgress}>
                            {t("dashboard__attendee_questionnaires_answered_questions")}
                          </Heading>
                          <Card hasShadow={true} css={styles.progressCard}>
                            <ModuleProgressIndicator progressEntities={questionnaireProgress} />
                          </Card>
                        </Card>
                      </LabelledCard>
                    )}

                    <LabelledCard label={t("dashboard__attendee_questionnaires_results")} customStyles={styles.card}>
                      <Card hasShadow={true} customStyles={styles.innerCard}>
                        <ResultsCard
                          maxScore={maximumScore}
                          finalScore={score}
                          showScoringOverlay={showScoringOverlay}
                          disableFinalScoreButton={ratingStatus === RatingStatus.SurveyInProgress}
                        />
                      </Card>
                    </LabelledCard>
                  </CardContent>
                </>
              )}
              <CardFooter customStyles={styles.emptyFooter} />
            </Card>
            {chat && chat.isChatVisible && isDefined(chatParticipant) && (
              <Overlay>
                <ChatWindow
                  chatTitle={chatParticipant.displayName}
                  messages={chat.messages}
                  onClose={chat.closeChat}
                  onMessageSend={chat.sendSupervisorMessage}
                  headerButtonConfig={{
                    icon: IconName.Student,
                    textKey: "chat__supervisor_back",
                    onBackNavigation: chat.navigateBackToDashboard
                  }}
                  isChatAccessible={chat.isChatAccessible}
                  instructionTitle={t("chat__instruction_reporting_attendee", {name: chatParticipant.displayName})}
                />
              </Overlay>
            )}
          </>
        ))
        .orNull()
    )
    .orNull()
}
