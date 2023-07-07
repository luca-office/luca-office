import {css} from "@emotion/react"
import * as React from "react"
import {Button, Card, CardContent, EntityKey, LabelledCard, TableContainer, Text} from "shared/components"
import {useLucaClipboard} from "shared/hooks"
import {ParticipantProjectProgress, ProjectModule, Survey} from "shared/models"
import {cardBottomColor, Flex, flex1, spacingMedium, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {Option} from "shared/utils"
import {ProjectModuleManualSurvey} from "../../../redux/state/ui/synchron-survey-state"
import {getProgressTableColumns} from "../../dashboard/config"
import {InviteSurveyAttendeesModalContainer} from "../../surveys/detail/invite-attendees/invite-survey-attendees-modal-container"
import {isManualSurvey} from "../../surveys/utils/common"
import {OpenParticipationPlaceholder} from "./open-participation-placeholder/open-participation-placeholder"
import {ProgressTableManualSurveyContainer} from "./progress-table-manual-survey/progress-table-manual-survey-container"

export interface ProgressTableProps {
  readonly activeModuleOfSynchronSurvey: Option<ProjectModuleManualSurvey>
  readonly lastProjectModuleOfSurvey: Option<ProjectModule>
  readonly navigateToParticipantDashboard: (id: UUID) => void
  readonly onParticipantSelectionChange?: (ids: UUID[]) => void
  readonly projectId: UUID
  readonly questionnaireId?: UUID
  readonly questionsCount?: number
  readonly scenarioId?: UUID
  readonly selectedModuleId: Option<UUID>
  readonly survey: Option<Survey>
  readonly surveyId: UUID
  readonly surveyProgress: ParticipantProjectProgress[]
  readonly onOpenChat: (id: UUID) => void
  readonly t: LucaTFunction
}

export const ProgressTable: React.FunctionComponent<ProgressTableProps> = ({
  activeModuleOfSynchronSurvey,
  lastProjectModuleOfSurvey,
  navigateToParticipantDashboard,
  onParticipantSelectionChange,
  projectId,
  questionnaireId,
  questionsCount,
  scenarioId,
  selectedModuleId,
  survey,
  surveyId,
  surveyProgress,
  onOpenChat,
  t
}) => {
  const [invitationModalVisible, setInvitationModalVisible] = React.useState(false)
  const {copy} = useLucaClipboard()

  const moduleCount = surveyProgress.length ? surveyProgress[0].moduleProgress.length : 0
  const documentCount =
    surveyProgress.length && surveyProgress[0].moduleProgress.length
      ? surveyProgress[0].moduleProgress[0].documentsCount
      : 0

  const openParticipationPlayerUrl = survey.map(s => s.openParticipationPlayerUrl).orUndefined()

  const isManualSurveyExecutionType = isManualSurvey(survey.map(survey => survey.executionType))

  const isOpenParticipationEnabled = survey.exists(survey => survey.isOpenParticipationEnabled)

  const placeholder = isOpenParticipationEnabled ? (
    <OpenParticipationPlaceholder copy={copy} openParticipationPlayerUrl={openParticipationPlayerUrl} />
  ) : (
    <React.Fragment>
      <Text size={TextSize.Medium}>{t("dashboard__project_table_placeholder_title")}</Text>
      <Button onClick={() => setInvitationModalVisible(true)} customStyles={styles.button}>
        {t("dashboard__project_table_placeholder_button")}
      </Button>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <LabelledCard customStyles={styles.labelledCard} label={t("dashboard__project_table_title")}>
        <Card customStyles={styles.card}>
          <CardContent customStyles={styles.content}>
            {isManualSurveyExecutionType ? (
              <ProgressTableManualSurveyContainer
                activeModuleOfSynchronSurvey={activeModuleOfSynchronSurvey}
                documentCount={documentCount}
                lastProjectModuleOfSurvey={lastProjectModuleOfSurvey}
                moduleCount={moduleCount}
                navigateToParticipantDashboard={navigateToParticipantDashboard}
                openParticipationPlayerUrl={openParticipationPlayerUrl}
                questionnaireId={questionnaireId}
                scenarioId={scenarioId}
                selectedModuleId={selectedModuleId}
                questionsCount={questionsCount}
                survey={survey}
                surveyId={surveyId}
                onSelectionChange={(entityIds: EntityKey[]) => {
                  onParticipantSelectionChange?.(entityIds as UUID[])
                }}
                surveyProgress={surveyProgress}
                placeholderClosedParticipation={placeholder}
                onOpenChat={onOpenChat}
                t={t}
              />
            ) : (
              <TableContainer<ParticipantProjectProgress>
                entityKey={progress => progress.id}
                entities={surveyProgress}
                onClick={entity => navigateToParticipantDashboard(entity.id)}
                columns={getProgressTableColumns({
                  participantCount: surveyProgress.length,
                  moduleCount,
                  t,
                  questionsCount,
                  documentCount,
                  questionnaireId,
                  scenarioId,
                  lastProjectModuleOfSurvey
                })}
                customPlaceholder={placeholder}
                customPlaceholderStyles={styles.placeholder}
                {...{
                  ...(isManualSurveyExecutionType
                    ? {
                        isSelectionEnabled: true,
                        selectionStyle: "radio",
                        onSelectionChange: (entityIds: EntityKey[]) =>
                          onParticipantSelectionChange?.(entityIds as UUID[])
                      }
                    : {isSelectionEnabled: false})
                }}
              />
            )}
          </CardContent>
        </Card>
      </LabelledCard>
      {invitationModalVisible && (
        <InviteSurveyAttendeesModalContainer
          surveyId={surveyId}
          projectId={projectId}
          onDismiss={() => setInvitationModalVisible(false)}
        />
      )}
    </React.Fragment>
  )
}

const styles = {
  card: css({
    height: "auto",
    backgroundColor: cardBottomColor,
    flex: flex1
  }),
  labelledCard: css(Flex.column, {
    flex: flex1
  }),
  content: css({
    paddingBottom: spacingMedium
  }),
  placeholder: css(Flex.column, {
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  }),
  button: css({
    width: 400,
    marginTop: spacingMedium
  })
}
