import {isEmpty} from "lodash-es"
import * as React from "react"
import {
  Button,
  Card,
  Content,
  DetailViewHeader,
  TableOfContentsContainer,
  TableOfContentsEntry
} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {ButtonConfig, NavigationConfig} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {buildQuestionnaireTree} from "shared/utils"
import {ResortModal} from "../../../components"
import {QuestionnaireDetailMode} from "../../../enums"
import {Route} from "../../../routes"
import {
  CreateQuestionnaireQuestionModal,
  DeleteScenarioQuestionnaireButton,
  QuestionnaireInformation,
  QuestionnaireQuestionDetail
} from "../common"
import {
  getQuestionnaireDetailDeleteButtonConfig,
  getQuestionnaireDetailOperationButtonConfig,
  getQuestionnaireSecondOperationButtonConfig
} from "../config"
import {QuestionnairePreview} from "../preview/questionnaire-preview"
import {useQuestionnaireDetail} from "./hooks/use-questionnaire-detail"
import {questionnaireDetailStyles as styles} from "./questionnaire-detail.style"
import {QuestionnaireDetailActionBar} from "./questionnaire-detail-action-bar/questionnaire-detail-action-bar"
import {SelectionDetailPlaceholder} from "./selection-detail-placeholder/selection-detail-placeholder"

export interface QuestionnaireDetailsProps {
  readonly questionnaireId: UUID
  readonly questionId?: UUID
  readonly scenarioId?: UUID
  readonly displayMode?: QuestionnaireDetailMode
  readonly navigationQuestionConfig?: NavigationConfig<Route>
  readonly navigationDetailsConfig?: NavigationConfig<Route>
  readonly navigationOverviewConfig?: NavigationConfig<Route>
}

export const QuestionnaireDetail: React.FunctionComponent<QuestionnaireDetailsProps> = ({
  questionnaireId,
  questionId,
  scenarioId,
  displayMode = QuestionnaireDetailMode.Default,
  navigationOverviewConfig,
  navigationDetailsConfig,
  navigationQuestionConfig
}) => {
  const {
    actionsLoading,
    dataLoading,
    deleteQuestion,
    handleBackNavigation,
    handleEventsNavigation,
    handleOperation,
    handlePublish,
    handleFinalize,
    navigateToQuestion,
    isEventSelection,
    isScenarioReadOnly,
    isRuntimeSurvey,
    isProjectQuestionnaire,
    isQuestionnaireFinalizedOrPublished,
    navigateToQuestionnaire,
    questionCreationVisible,
    questionnaire: questionnaireOption,
    setQuestionCreationVisible,
    updateQuestionnaire,
    selectedEntityId,
    selectEntityId,
    scenarioQuestionnaires,
    resortModalVisible,
    setResortModalVisible,
    repositionQuestions,
    sortableQuestions,
    isPreviewVisible,
    setIsPreviewVisible,
    userMayArchive,
    userMayFinalizeWithoutPublishing
  } = useQuestionnaireDetail({
    displayMode,
    questionnaireId,
    questionId,
    scenarioId,
    navigationQuestionConfig,
    navigationDetailsConfig,
    navigationOverviewConfig
  })
  const {t} = useLucaTranslation()

  const headerLabelKey = isEventSelection
    ? "questionnaires__selection_details_label"
    : isRuntimeSurvey
    ? "events__header_details_label"
    : "questionnaires__header_details_label"

  const headerNavigationButtonLabel = isEventSelection
    ? "questionnaires__selection_header_navigate_back_label"
    : isRuntimeSurvey
    ? "events__detail_header_navigate_back_label"
    : "questionnaires__detail_header_navigate_back_label"

  const hasSecondOperationButton =
    userMayFinalizeWithoutPublishing &&
    !isRuntimeSurvey &&
    questionnaireOption.exists(questionnaire => questionnaire.publishedAt === null)

  const hasDescription = questionnaireOption.exists(questionnaire => !isEmpty(questionnaire.description))

  const header = (
    <DetailViewHeader
      labelKey={headerLabelKey}
      navigationButtonConfig={{
        labelKey: navigationOverviewConfig?.labelKey ?? headerNavigationButtonLabel,
        onClick: handleBackNavigation
      }}
      operationButtonConfig={getQuestionnaireDetailOperationButtonConfig(
        questionnaireOption,
        isRuntimeSurvey,
        isEventSelection,
        isProjectQuestionnaire,
        handleOperation,
        actionsLoading || !hasDescription,
        t
      )}
      secondOperationButtonConfig={questionnaireOption
        .map(questionnaire =>
          hasSecondOperationButton
            ? getQuestionnaireSecondOperationButtonConfig(
                questionnaire,
                isQuestionnaireFinalizedOrPublished,
                handlePublish,
                handleFinalize,
                actionsLoading || !hasDescription,
                t
              )
            : undefined
        )
        .orUndefined()}
      deleteOrArchiveButtonConfig={getQuestionnaireDetailDeleteButtonConfig(
        isEventSelection || isProjectQuestionnaire,
        questionnaireOption,
        handleBackNavigation,
        userMayArchive,
        actionsLoading
      )}
    />
  )

  const addToolTipScenario = isScenarioReadOnly ? "questionnaires__scenario_disabled_tooltip" : undefined
  const addToolTipDetail = isRuntimeSurvey
    ? "questionnaires_event__disabled_tooltip"
    : "questionnaires__disabled_tooltip"

  const addButtonConfig: ButtonConfig = {
    labelKey: isEventSelection ? "questionnaires__selection_add_questionnaire" : "questionnaires__add_question",
    onClick: () => (isEventSelection ? handleEventsNavigation() : setQuestionCreationVisible(true)),
    disabled: (!isEventSelection && isQuestionnaireFinalizedOrPublished) || isScenarioReadOnly || actionsLoading,
    tooltipKey: !isEventSelection && isQuestionnaireFinalizedOrPublished ? addToolTipDetail : addToolTipScenario
  }
  const actionBar = (
    <QuestionnaireDetailActionBar
      questionnaire={questionnaireOption}
      openPreview={() => setIsPreviewVisible(true)}
      t={t}
    />
  )

  return (
    <Content
      customContentContainerStyles={styles.contentContainer}
      subHeader={header}
      actionBar={!isEventSelection && !isProjectQuestionnaire ? actionBar : undefined}>
      <div css={styles.gridWrapper}>
        <div css={styles.grid}>
          <TableOfContentsContainer
            customCardStyles={styles.tableOfContent}
            title={t(isEventSelection ? "questionnaires__selection_details_label" : "table_of_contents")}
            placeholderHeadline={isEventSelection ? t("questionnaires__selection_nothing_assigned") : undefined}
            placeholderHint={isEventSelection ? t("questionnaires__selection_nothing_assigned_hint") : undefined}
            loading={dataLoading}
            showPlaceHolder={isEventSelection && !scenarioQuestionnaires.getOrElse([]).length}
            readonly={isProjectQuestionnaire}
            headerButtons={
              !isProjectQuestionnaire && !isEventSelection
                ? [
                    <Button
                      icon={IconName.Sort}
                      variant={ButtonVariant.IconOnly}
                      key={"sort-content"}
                      disabled={isQuestionnaireFinalizedOrPublished}
                      onClick={() => setResortModalVisible(true)}
                    />
                  ]
                : undefined
            }
            addButtonConfig={addButtonConfig}>
            {!isEventSelection
              ? questionnaireOption
                  .map(questionnaire => (
                    <TableOfContentsEntry
                      key={questionnaire.id}
                      node={buildQuestionnaireTree({
                        questionnaire,
                        isRuntimeSurvey,
                        t,
                        filterQuestionsByScoringType: false
                      })}
                      selectNode={nodeOption => selectEntityId(nodeOption.map(node => node.id))}
                      selectedNode={selectedEntityId}
                      isCollapsible={false}
                    />
                  ))
                  .orNull()
              : scenarioQuestionnaires
                  .getOrElse([])
                  .map(({questionnaire}) => (
                    <TableOfContentsEntry
                      key={questionnaire.id}
                      node={buildQuestionnaireTree({questionnaire, isRuntimeSurvey, t})}
                      selectNode={nodeOption => selectEntityId(nodeOption.map(node => node.id))}
                      isCollapsible={true}
                      selectedNode={selectedEntityId}
                    />
                  ))}
          </TableOfContentsContainer>
          <Card customStyles={styles.detailCard}>
            {questionId ? (
              <QuestionnaireQuestionDetail
                showScenarioSpecificSettings={displayMode === QuestionnaireDetailMode.ScenarioRuntimeSurvey}
                questionId={questionId}
                scenarioId={scenarioId}
                navigateToQuestionnaire={navigateToQuestionnaire}
                showQuestionScoring={!isProjectQuestionnaire && !isEventSelection && !isRuntimeSurvey}
                questionnaireId={questionnaireId}
                hideActions={isProjectQuestionnaire || isEventSelection}
                readonly={isScenarioReadOnly || isQuestionnaireFinalizedOrPublished || isProjectQuestionnaire}
              />
            ) : (
              questionnaireOption
                .map(questionnaire => (
                  <QuestionnaireInformation
                    actionsLoading={actionsLoading}
                    questionnaire={questionnaire}
                    scenarioId={scenarioId}
                    showQuestionnaireTitle={isRuntimeSurvey}
                    updateQuestionnaire={updateQuestionnaire}
                    deleteQuestion={deleteQuestion}
                    readonly={isProjectQuestionnaire || isScenarioReadOnly}
                    openQuestionCreation={() => setQuestionCreationVisible(true)}
                    openQuestionsSortOverlay={() => setResortModalVisible(true)}
                    showQuestionScoring={!isRuntimeSurvey && !isEventSelection}
                    hideActions={isEventSelection || isProjectQuestionnaire}
                    renderRightHeaderChild={
                      scenarioId && questionnaireId && isEventSelection
                        ? () => (
                            <DeleteScenarioQuestionnaireButton
                              questionnaireId={questionnaireId}
                              scenarioId={scenarioId}
                              disabled={isScenarioReadOnly}
                            />
                          )
                        : undefined
                    }
                    navigationQuestionConfig={
                      navigationQuestionConfig || {
                        route: isRuntimeSurvey ? Route.EventDetailQuestion : Route.QuestionnaireDetailQuestion,
                        payload: isRuntimeSurvey ? {eventId: questionnaireId} : {questionnaireId}
                      }
                    }
                  />
                ))
                .getOrElse(<SelectionDetailPlaceholder />)
            )}
          </Card>
        </div>
      </div>
      {questionCreationVisible &&
        questionnaireOption
          .map(questionnaire => (
            <CreateQuestionnaireQuestionModal
              questionnaireId={questionnaire.id}
              onDismiss={() => setQuestionCreationVisible(false)}
              navigateToQuestion={questionId => navigateToQuestion(questionnaireId, questionId)}
            />
          ))
          .orNull()}
      {resortModalVisible &&
        sortableQuestions
          .map(questions => (
            <ResortModal
              disabled={dataLoading || actionsLoading}
              titleKey={"questionnaires__sort_questions_title"}
              onDismiss={() => setResortModalVisible(false)}
              onConfirm={questions => repositionQuestions(questions).then(() => setResortModalVisible(false))}
              tableLabel={t("questionnaires__detail_questions_title", {
                count: questions.length
              })}
              entities={questions}
            />
          ))
          .orNull()}
      {isPreviewVisible && (
        <QuestionnairePreview
          displayMode={displayMode}
          questionnaire={questionnaireOption}
          hidePreview={() => setIsPreviewVisible(false)}
        />
      )}
    </Content>
  )
}
