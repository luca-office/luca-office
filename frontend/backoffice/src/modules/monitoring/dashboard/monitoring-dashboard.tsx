import * as React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardFooterItem,
  CardHeader,
  Heading,
  Icon,
  Label,
  LabelledCard,
  LoadingIndicator,
  Overlay,
  Text
} from "shared/components"
import {DetailEventsTable} from "shared/components/detail-events-table/detail-events-table"
import {HeadingLevel, IconName} from "shared/enums"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ScenarioInfo} from "shared/graphql/hooks"
import {Questionnaire, Scenario} from "shared/models"
import {Flex, flex1, shadowedCard, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString, getProjectModuleIcon, last, Option, sortByPosition} from "shared/utils"
import {CardDurationInfo, DonutChartWithLegend} from "../../../components"
import {
  getDashBoardCardData,
  getDashBoardCardLabel,
  getManualSynchronSurveyData,
  getSurveyProgressData
} from "../../dashboard/utils"
import {QuestionnaireResults} from "../../reporting/questionnaire-results/questionnaire-results"
import {isManualSurvey} from "../../surveys/utils/common"
import {ProjectProgressNavigation} from "../progress-navigation/project-progress-navigation"
import {ProgressTable} from "../progress-table/progress-table"
import {useMonitoringDashboard} from "./hooks/use-monitoring-dashboard"
import {useSupervisorChat} from "./hooks/use-supervisor-chat"
import {monitoringDashboardStyle as styles} from "./monitoring-dashboard.style"

export interface MonitoringDashboardProps {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly moduleId?: UUID
}

export const MonitoringDashboard: React.FunctionComponent<MonitoringDashboardProps> = ({
  projectId,
  surveyId,
  moduleId
}) => {
  const {t} = useLucaTranslation()

  const {
    activeModule,
    activeModuleIndex,
    currentModuleOfSynchronSurvey,
    dataLoading,
    navigateToParticipantOverview,
    selectedQuestionnaireId,
    setSelectedQuestionnaireId,
    project: projectOption,
    projectModules,
    questionnaireCount,
    runtimeSurveyResults,
    scenarioCount,
    survey: surveyOption,
    surveyProgress,
    onlineCount,
    scenarioQuestionnaires
  } = useMonitoringDashboard(projectId, surveyId, moduleId)

  const {openChat, setChatParticipantsIds} = useSupervisorChat(surveyId, projectId, surveyProgress)

  const onOpenChat = (id: UUID) => {
    setChatParticipantsIds([id])
    openChat(id)
  }

  const isManualExecutionTypeSurvey = isManualSurvey(surveyOption.map(survey => survey.executionType))

  const modulesCount = questionnaireCount + scenarioCount
  const cardInfo = getDashBoardCardData(projectOption, activeModule)
  const cardLabel = getDashBoardCardLabel(activeModuleIndex, modulesCount, t)

  const activeModuleQuestionnaire = activeModule.map(module =>
    module.moduleType === ProjectModuleType.Questionnaire ? module.questionnaire : null
  ) as Option<Questionnaire>

  const activeModuleScenario = activeModule.map(module =>
    module.moduleType === ProjectModuleType.Scenario ? module.scenario : null
  ) as Option<Scenario>

  const lastProjectModuleOfSurvey = last(sortByPosition(projectModules))

  const scenarioInfo: ScenarioInfo = {
    projectName: projectOption.map(project => project.name).getOrElse(""),
    scenarioName: activeModuleScenario.map(scenario => scenario.name).getOrElse(""),
    surveyTitle: surveyOption.map(survey => survey.title).getOrElse(""),
    participantCount: surveyOption.map(survey => survey.invitationsCount).getOrElse(0)
  }

  return dataLoading ? (
    <div css={styles.loadingIndicator}>
      <LoadingIndicator />
    </div>
  ) : (
    <>
      <div css={styles.content}>
        <Card customStyles={{flex: flex1}}>
          <ProjectProgressNavigation
            {...{projectId, projectModules, surveyId, moduleId, moduleIndex: activeModuleIndex, activeModule}}
          />
          <CardContent customStyles={styles.contentCard}>
            <div css={styles.topGrid}>
              {cardInfo
                .map(info => (
                  <LabelledCard label={cardLabel} customStyles={styles.flexCard}>
                    <Card hasShadow={true} customStyles={styles.topCard}>
                      <CardHeader customStyles={styles.projectHeader}>
                        <Heading level={HeadingLevel.h3} customStyles={styles.projectHeaderHeading}>
                          {info.moduleType && <Icon name={getProjectModuleIcon(info.moduleType)} hasSpacing={true} />}
                          <span css={styles.projectTitle}>{info.title}</span>
                        </Heading>
                        <Heading level={HeadingLevel.h3} customStyles={styles.projectHeaderDuration}>
                          <CardDurationInfo
                            t={t}
                            placeholder={"-"}
                            showIconBeforeText={true}
                            maxDurationInSeconds={info.maxDurationInSeconds}
                          />
                        </Heading>
                      </CardHeader>
                      <CardContent customStyles={styles.projectCardContent}>
                        <Text customStyles={styles.projectCardText}>{info.description}</Text>
                        {info.showModules && (
                          <React.Fragment>
                            <Text customStyles={[styles.projectCardText, styles.moduleLabel]}>
                              {t("dashboard__project_table_progress_header", {count: modulesCount})}
                            </Text>
                            <div css={[shadowedCard, styles.modulesGrid]}>
                              <div css={Flex.row}>
                                <Icon name={IconName.Monitor} hasSpacing />
                                <Text>
                                  {!scenarioCount
                                    ? t("dashboard__scenario_none")
                                    : scenarioCount === 1
                                    ? t("dashboard__scenario_count")
                                    : t("dashboard__scenarios_count", {count: scenarioCount})}
                                </Text>
                              </div>
                              <div css={Flex.row}>
                                <Icon name={IconName.Questionnaire} hasSpacing customSpacing={spacingSmall} />
                                <Text>
                                  {!questionnaireCount
                                    ? t("dashboard__questionnaire_none")
                                    : questionnaireCount === 1
                                    ? t("dashboard__questionnaire_count")
                                    : t("dashboard__questionnaires_count", {count: questionnaireCount})}
                                </Text>
                              </div>
                            </div>
                          </React.Fragment>
                        )}
                      </CardContent>
                      <CardFooter customStyles={styles.projectCardFooter}>
                        <CardFooterItem
                          title={t("detail_card__title_createdAt")}
                          icon={IconName.Calendar}
                          text={formatDateFromString(info.createdAt)}
                        />

                        {info.author
                          .map(author => (
                            <CardFooterItem
                              title={t("detail_card__title_author")}
                              icon={IconName.Profile}
                              text={`${author.firstName} ${author.lastName}`}
                            />
                          ))
                          .orNull()}
                        {info.questionsCount >= 0 && (
                          <CardFooterItem
                            title={t("questions")}
                            icon={IconName.Questions}
                            text={t("questionnaires__selection_questions_count", {count: info.questionsCount})}
                          />
                        )}
                      </CardFooter>
                    </Card>
                  </LabelledCard>
                ))
                .orNull()}
              {surveyOption
                .map(survey => (
                  <LabelledCard
                    label={t(
                      activeModule.isDefined()
                        ? "dashboard__project_chart_title_module_selected"
                        : "dashboard__project_chart_title"
                    )}>
                    <Card customStyles={[shadowedCard, styles.topCard]} animateOnHover={false}>
                      <CardContent customStyles={styles.chartContent}>
                        <DonutChartWithLegend
                          legendLabel={t("dashboard__progress_chart_legend_abbr", {count: survey.invitationsCount})}
                          data={
                            isManualExecutionTypeSurvey
                              ? getManualSynchronSurveyData(
                                  survey,
                                  t,
                                  activeModule.map(module => module.id),
                                  onlineCount
                                )
                              : getSurveyProgressData(
                                  survey,
                                  activeModule.map(module => module.id),
                                  t
                                )
                          }
                          chartIcon={IconName.PaperEdit}
                        />
                      </CardContent>
                    </Card>
                  </LabelledCard>
                ))
                .orNull()}
            </div>

            {activeModuleScenario.isDefined() && (
              <div css={styles.eventsTableWrapper}>
                <Label label={t("navigation__events")} />
                <DetailEventsTable
                  scenarioQuestionnaires={scenarioQuestionnaires}
                  totalParticipants={surveyProgress.length}
                  runtimeSurveyResults={runtimeSurveyResults}
                  placeholderKey={"dashboard__project_project_events_placeholder"}
                  customPlaceholderStyles={styles.eventsTable.placeholder}
                  onShowResults={questionnaireId => setSelectedQuestionnaireId(questionnaireId)}
                />
              </div>
            )}

            <ProgressTable
              activeModuleOfSynchronSurvey={currentModuleOfSynchronSurvey}
              selectedModuleId={activeModule.map(module => module.id)}
              surveyProgress={surveyProgress}
              survey={surveyOption}
              t={t}
              surveyId={surveyId}
              projectId={projectId}
              navigateToParticipantDashboard={navigateToParticipantOverview}
              onParticipantSelectionChange={(ids: UUID[]) => setChatParticipantsIds(ids)}
              lastProjectModuleOfSurvey={lastProjectModuleOfSurvey}
              onOpenChat={onOpenChat}
              {...{
                ...activeModuleQuestionnaire
                  .map(questionnaire => ({
                    questionnaireId: questionnaire.id,
                    questionsCount: questionnaire.questions.length
                  }))
                  .orUndefined(),
                ...activeModuleScenario
                  .map(scenario => ({
                    scenarioId: scenario.id
                  }))
                  .orUndefined()
              }}
            />
          </CardContent>
        </Card>
      </div>
      {selectedQuestionnaireId !== null && (
        <Overlay>
          <QuestionnaireResults
            onClose={() => setSelectedQuestionnaireId(null)}
            questionnaires={scenarioQuestionnaires}
            results={runtimeSurveyResults}
            selectedQuestionnaireId={Option.of(selectedQuestionnaireId)}
            scenarioInfo={scenarioInfo}
            surveyId={surveyId}
          />
        </Overlay>
      )}
    </>
  )
}
