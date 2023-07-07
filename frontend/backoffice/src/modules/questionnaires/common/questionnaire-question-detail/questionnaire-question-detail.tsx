import {max, sum} from "lodash-es"
import * as React from "react"
import {
  CardContent,
  CardFooter,
  CardFooterItem,
  CardHeader,
  deleteEntityButtonStyles,
  getQuestionTypeTitle,
  Heading,
  Icon,
  Label,
  OrlyButtonContainer,
  ReadonlyActionField,
  Text
} from "shared/components"
import {getQuestionTypeIconName} from "shared/components/questionnaire/questionnaire-question/questionnaire-question-helpers"
import {HeadingLevel, IconName, UploadFileType as FileType} from "shared/enums"
import {QuestionnaireQuestionUpdate, QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {UploadBinary} from "shared/models"
import {Flex, fontColor, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {exists, first, Option} from "shared/utils"
import {
  DetailViewBinary,
  InlineEditableTextareaContainer,
  OverlayEditField,
  OverlayEditFieldType,
  ResortModal
} from "../../../../components"
import {InterventionSettingsCard} from "../../../../components/intervention-setting-card/intervention-setting-card"
import {CreateRuntimeSurveyAnswerSelectionInterventionModalContainer} from "../../../scenario-interventions"
import {QuestionAnswerTable} from "../question-answer-table/question-answer-table"
import {QuestionScoringSelection} from "../question-scoring-selection/question-scoring-selection"
import {UpdateQuestionnaireQuestionTypeModal} from "../update-questionnaire-question-type-modal/update-questionnaire-question-type-modal"
import {useQuestionnaireQuestionDetail} from "./hooks/use-questionnaire-question-detail"
import {questionnaireQuestionDetailStyle as styles} from "./questionnaire-question-detail-style"

export interface QuestionnaireQuestionDetailProps {
  readonly navigateToQuestionnaire: () => void
  readonly questionnaireId: UUID
  readonly questionId: UUID
  readonly hideActions?: boolean
  readonly showScenarioSpecificSettings: boolean
  readonly readonly?: boolean
  readonly scenarioId?: UUID
  readonly showQuestionScoring?: boolean
}

/**
 * Display title, description, image and answer, TOC is rendered in parent (questionnaire-detail)
 * flexible header
 * @param props
 * @constructor
 */
export const QuestionnaireQuestionDetail: React.FunctionComponent<QuestionnaireQuestionDetailProps> = ({
  hideActions = false,
  navigateToQuestionnaire,
  questionId,
  questionnaireId,
  readonly = false,
  scenarioId,
  showQuestionScoring = false,
  showScenarioSpecificSettings
}) => {
  const {t} = useLucaTranslation()
  const {
    actionsLoading,
    createDefaultHolisticAnswer,
    dataLoading,
    deleteAnswer,
    deleteQuestion,
    handleCreateAnswer,
    isChangeQuestionTypeModalVisible,
    interventionsConfig,
    openAnswersSortOverlay,
    question: questionOption,
    repositionAnswers,
    resortModalVisible,
    setChangeQuestionTypeModalVisible,
    setResortModalVisible,
    sortableAnswers,
    toggleFreeTextAnswer,
    updateQuestionnaireAnswer,
    updateQuestionnaireQuestion
  } = useQuestionnaireQuestionDetail(questionnaireId, questionId, navigateToQuestionnaire, scenarioId)
  const isEditable = !readonly && !hideActions && !actionsLoading

  const {
    isCreateInterventionModalVisible,
    isScenarioReadOnly,
    navigateToInterventions,
    runtimeSurveyAnswerSelectionInterventions,
    scenarioMaxDurationInSeconds,
    selectedAnswerForInterventionsSetting,
    setSelectedAnswerForInterventionsSetting,
    toggleIsCreateInterventionModalVisible
  } = interventionsConfig

  return questionOption
    .map(questionnaireQuestion => {
      const hasNoneScoreSetting = questionnaireQuestion.scoringType === QuestionScoringType.None
      const displayScoring = !hasNoneScoreSetting && showQuestionScoring
      const isFreeTextQuestion = questionnaireQuestion.questionType === QuestionType.FreeText
      const questionTypeIconName = getQuestionTypeIconName(questionnaireQuestion.questionType)
      const questionnaireQuestionUpdate: QuestionnaireQuestionUpdate = {
        binaryFileId: questionnaireQuestion.binaryFileId,
        text: questionnaireQuestion.text,
        questionType: questionnaireQuestion.questionType,
        isAdditionalTextAnswerAllowed: questionnaireQuestion.isAdditionalFreeTextAnswerEnabled,
        scoringType: questionnaireQuestion.scoringType,
        score: questionnaireQuestion.score
      }
      const questionScoringValues = isFreeTextQuestion
        ? questionnaireQuestion.freetextQuestionCodingCriteria.map(answer => answer.score)
        : [questionnaireQuestion.score]

      const onDeleteBinary = () => updateQuestionnaireQuestion({...questionnaireQuestionUpdate, binaryFileId: null})
      const onBinariesSuccessfullyUploaded = (binaries: UploadBinary[]) => {
        first(binaries).map(binary =>
          updateQuestionnaireQuestion({...questionnaireQuestionUpdate, binaryFileId: binary.data.id})
        )
      }
      const onScoringTypeChange = (scoringType: QuestionScoringType) => {
        if (scoringType === questionnaireQuestionUpdate.scoringType) {
          return
        }

        updateQuestionnaireQuestion({
          ...questionnaireQuestionUpdate,
          scoringType,
          isAdditionalTextAnswerAllowed: false
        })
        if (!exists(criterion => criterion.score === 0, questionnaireQuestion.freetextQuestionCodingCriteria)) {
          createDefaultHolisticAnswer()
        }
      }

      return (
        <React.Fragment>
          <CardHeader hasGreyBackground={true} hasShadow={true} customStyles={styles.detailHeader}>
            <div css={Flex.row}>
              <Icon name={questionTypeIconName} customStyles={styles.detailHeaderIcon} />
              <Text size={TextSize.Medium}>{getQuestionTypeTitle(t, questionnaireQuestion.questionType)}</Text>
            </div>
            {!hideActions && (
              <OrlyButtonContainer
                iconColor={fontColor}
                customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
                disabled={readonly}
                onConfirm={() => deleteQuestion(questionnaireQuestion.id)}
              />
            )}
          </CardHeader>
          <CardContent customStyles={styles.content}>
            <div css={styles.columnLayout}>
              <div>
                <Label
                  label={t("question_description")}
                  icon={!hideActions ? (isEditable ? IconName.EditPencil : IconName.LockClosed) : undefined}
                />
                <OverlayEditField<QuestionnaireQuestionUpdate>
                  formFields={[
                    {
                      updateId: "text",
                      value: questionnaireQuestion.text,
                      labelKey: "question_description",
                      type: OverlayEditFieldType.TEXTAREA
                    }
                  ]}
                  dialogTitleKey={"questionnaires__edit_questions_title"}
                  onUpdate={(update: Partial<QuestionnaireQuestionUpdate>) =>
                    updateQuestionnaireQuestion({...questionnaireQuestionUpdate, text: update.text ?? ""})
                  }
                  updateLoading={actionsLoading}
                  disabled={!isEditable}
                  renderValue={() => (
                    <InlineEditableTextareaContainer
                      text={questionnaireQuestion.text}
                      readOnly={true}
                      placeholder={t("questionnaire_question__question_description_placeholder")}
                      disabled={!isEditable}
                    />
                  )}
                  customStyles={styles.inlineField}
                  displayPlain={true}
                />
              </div>
              <DetailViewBinary
                label={t("questionnaires__detail_binary")}
                onDeleteBinary={onDeleteBinary}
                readonly={readonly || hideActions}
                onBinariesSuccessfullyUploaded={onBinariesSuccessfullyUploaded}
                binaryFile={questionnaireQuestion.binaryFile || undefined}
                acceptedFileTypes={[FileType.Graphic, FileType.Video]}
                createText={t("create_button")}
                placeholderText={t("questionnaires__detail_binary_placeholder")}
                onUpdate={onBinariesSuccessfullyUploaded}
              />
            </div>
            <div css={styles.questionTypeWrapper}>
              <Text size={TextSize.Medium} customStyles={styles.questionTypeTitle}>
                {t("questionnaire_question__title")}
              </Text>
              <div css={styles.questionTypeActionFieldWrapper}>
                <ReadonlyActionField
                  disabled={!isEditable}
                  customStyles={styles.questionTypeActionField}
                  renderValue={() => (
                    <div css={styles.questionType}>
                      <Icon customStyles={styles.questionTypeIcon} name={questionTypeIconName} />
                      <Text size={TextSize.Medium} customStyles={styles.questionTypeLabel}>
                        {getQuestionTypeTitle(t, questionnaireQuestion.questionType)}
                      </Text>
                    </div>
                  )}
                  buttonLabel={t("edit_button")}
                  onClick={() => setChangeQuestionTypeModalVisible(true)}
                />
              </div>
            </div>
            {showQuestionScoring && (
              <QuestionScoringSelection
                isEditable={isEditable}
                questionnaireQuestion={questionnaireQuestion}
                onScoringTypeChange={onScoringTypeChange}
                t={t}
              />
            )}

            {(!showQuestionScoring || !isFreeTextQuestion || !hasNoneScoreSetting) && (
              <QuestionAnswerTable
                {...{
                  deleteAnswer,
                  hideActions,
                  isRuntimeSurveyAndAssignedToScenario: true,
                  interventionsConfig: showScenarioSpecificSettings
                    ? {
                        interventions: runtimeSurveyAnswerSelectionInterventions,
                        onAnswerClick: answer => setSelectedAnswerForInterventionsSetting(Option.of(answer)),
                        selectedEntityForInterventionSettings: selectedAnswerForInterventionsSetting,
                        isCreateInterventionModalVisible,
                        toggleIsCreateInterventionModalVisible,
                        scenarioId: scenarioId ?? "",
                        scenarioMaxDurationInSeconds
                      }
                    : undefined,
                  handleCreateAnswer,
                  showQuestionScoring,
                  isEditable,
                  openAnswersSortOverlay,
                  questionnaireQuestion,
                  toggleFreeTextAnswer,
                  updateQuestionnaireAnswer,
                  updateQuestionnaireQuestion,
                  readonly,
                  t
                }}
              />
            )}
          </CardContent>
          {showScenarioSpecificSettings && !isFreeTextQuestion && (
            <div css={styles.scenarioSpecificSettingsWrapper}>
              <Label label={t("scenario_setting__header_label")} />
              {selectedAnswerForInterventionsSetting
                .map(answer => (
                  <InterventionSettingsCard
                    customStyles={styles.settingsCard}
                    disabled={isScenarioReadOnly}
                    interventionsCount={
                      runtimeSurveyAnswerSelectionInterventions.filter(
                        intervention => intervention.answerId === answer.id
                      ).length
                    }
                    navigateToIntervention={navigateToInterventions}
                    onCreateClick={interventionsConfig.toggleIsCreateInterventionModalVisible}
                  />
                ))
                .getOrElse(
                  <div css={styles.scenarioSpecificSettings(true)}>
                    <div css={styles.placeholder}>
                      <Heading level={HeadingLevel.h3}>
                        {t("questionnaires__detail_questions_interventions_placeholder_title")}
                      </Heading>
                      <Text>{t("questionnaires__detail_questions_interventions_placeholder_hint")}</Text>
                    </div>
                  </div>
                )}
              {interventionsConfig?.isCreateInterventionModalVisible &&
                selectedAnswerForInterventionsSetting
                  .map(answer => (
                    <CreateRuntimeSurveyAnswerSelectionInterventionModalContainer
                      scenarioId={scenarioId ?? ""}
                      onDismiss={interventionsConfig.toggleIsCreateInterventionModalVisible}
                      questionTitle={questionnaireQuestion.text}
                      selectedAnswer={answer}
                      scenarioMaxDurationInSeconds={interventionsConfig.scenarioMaxDurationInSeconds}
                    />
                  ))
                  .orNull()}
            </div>
          )}
          {showQuestionScoring && (
            <CardFooter customStyles={styles.detailFooter}>
              <CardFooterItem
                customTextStyles={styles.detailFooterText(displayScoring)}
                text={t("questionnaire_question__scoring_footer")}
              />
              <CardFooterItem
                customTextStyles={styles.detailFooterText(displayScoring)}
                text={
                  displayScoring
                    ? t("questionnaire_question__scoring_footer_score", {
                        scoreMin: isFreeTextQuestion ? Math.min(...questionScoringValues) : 0,
                        scoreMax:
                          questionnaireQuestion.scoringType === QuestionScoringType.Holistic
                            ? max(questionScoringValues)
                            : sum(questionScoringValues)
                      })
                    : t("questionnaire_question__scoring_footer_no_score")
                }
              />
            </CardFooter>
          )}
          {isChangeQuestionTypeModalVisible && (
            <UpdateQuestionnaireQuestionTypeModal
              question={questionnaireQuestion}
              onDismiss={() => setChangeQuestionTypeModalVisible(false)}
            />
          )}
          {resortModalVisible &&
            sortableAnswers
              .map(answers => (
                <ResortModal
                  disabled={dataLoading || actionsLoading}
                  titleKey={"questionnaires__sort_answers_title"}
                  onDismiss={() => setResortModalVisible(false)}
                  onConfirm={entities => repositionAnswers(entities).then(() => setResortModalVisible(false))}
                  tableLabel={t("questionnaires__detail_questions_answers_title", {
                    count: answers.length
                  })}
                  entities={answers}
                />
              ))
              .orNull()}
        </React.Fragment>
      )
    })
    .orNull()
}
