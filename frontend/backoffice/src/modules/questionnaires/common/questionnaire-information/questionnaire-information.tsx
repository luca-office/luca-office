import * as React from "react"
import {CardContent, CardHeader, Icon, Label, ReadonlyActionField, TableContainer, Text} from "shared/components"
import {IconName, UploadFileType as FileType} from "shared/enums"
import {ProjectUpdate, QuestionnaireType, QuestionnaireUpdate} from "shared/graphql/generated/globalTypes"
import {NavigationConfig, Questionnaire, QuestionnaireQuestion, UploadBinary} from "shared/models"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes, first, sortByPosition} from "shared/utils"
import {
  DetailViewBinary,
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  OverlayEditField
} from "../../../../components"
import {EditQuestionnaireDurationModalContainer} from "../../../../components/edit-duration-modal/edit-questionnaire-duration-modal-container"
import {Route} from "../../../../routes"
import {QuestionDetailBodyFooter} from "../question-detail-body-footer/question-detail-body-footer"
import {useQuestionnaireInformation} from "./hooks/use-questionnaire-information"
import {questionnaireInformationStyle as styles} from "./questionnaire-information.style"

export interface QuestionnaireInformationProps {
  readonly actionsLoading: boolean
  readonly deleteQuestion: (id: UUID) => void
  readonly navigationQuestionConfig: NavigationConfig<Route>
  readonly openQuestionCreation: () => void
  readonly openQuestionsSortOverlay: () => void
  readonly questionnaire: Questionnaire
  readonly showQuestionnaireTitle: boolean
  readonly updateQuestionnaire: (update: QuestionnaireUpdate) => void
  readonly hideActions?: boolean //hiding icons for editing texts and table actions
  readonly readonly?: boolean
  readonly renderRightHeaderChild?: () => React.ReactNode
  readonly showQuestionScoring?: boolean
  readonly scenarioId?: UUID
}

/**
 * Display title, description, image and questions
 * flexible header and footer
 * used in questionnaire selection and questionnaire detail as well as events detail
 * @param props
 * @constructor
 */
export const QuestionnaireInformation: React.FunctionComponent<QuestionnaireInformationProps> = ({
  actionsLoading,
  deleteQuestion,
  hideActions = false,
  openQuestionCreation,
  openQuestionsSortOverlay,
  questionnaire,
  scenarioId,
  readonly = false,
  renderRightHeaderChild,
  showQuestionnaireTitle,
  showQuestionScoring = false,
  updateQuestionnaire,
  navigationQuestionConfig
}) => {
  const {t} = useLucaTranslation()

  const {
    isEditable,
    descriptionField,
    questionnaireUpdate,
    questionsColumns,
    navigateToQuestionDetails,
    isEditDurationModalVisible,
    toggleIsEditDurationModalVisible
  } = useQuestionnaireInformation({
    navigationQuestionConfig,
    readonly,
    questionnaire,
    openQuestionsSortOverlay,
    openQuestionCreation,
    deleteQuestion,
    showQuestionScoring,
    hideActions
  })

  const isRuntimeSurvey = questionnaire.questionnaireType === QuestionnaireType.RuntimeSurvey

  const onDeleteBinary = () => updateQuestionnaire({...questionnaireUpdate, binaryFileId: null})
  const onBinariesSuccessfullyUploaded = (binaries: UploadBinary[]) => {
    first(binaries).map(binary => updateQuestionnaire({...questionnaireUpdate, binaryFileId: binary.data.id}))
  }

  return (
    <React.Fragment>
      <CardHeader hasGreyBackground={true} hasShadow={true} customStyles={styles.header}>
        <div css={Flex.row}>
          {showQuestionnaireTitle && <Icon name={IconName.Event} customStyles={styles.headerIcon} />}
          <Text size={TextSize.Medium}>
            {showQuestionnaireTitle ? questionnaire.title : t("questionnaires__detail_title")}
          </Text>
        </div>
        {renderRightHeaderChild && renderRightHeaderChild()}
      </CardHeader>
      <CardContent customStyles={styles.content(!scenarioId)}>
        <div css={styles.columnLayout}>
          <div>
            <Label
              label={t("title")}
              icon={!hideActions ? (isEditable ? IconName.EditPencil : IconName.LockClosed) : undefined}
            />
            <InlineEditableHeaderContainer
              onConfirm={title =>
                new Promise<void>(resolve => {
                  updateQuestionnaire({...questionnaireUpdate, title})
                  resolve()
                })
              }
              text={questionnaire.title}
              disabled={!isEditable}
              customStyles={styles.inlineField}
            />
            <Label
              label={t("description")}
              icon={!hideActions ? (isEditable ? IconName.EditPencil : IconName.LockClosed) : undefined}
              customStyles={styles.spacedLabel}
            />
            <OverlayEditField<ProjectUpdate>
              formFields={[descriptionField]}
              fieldLabelKey={"description"}
              dialogTitleKey={
                !showQuestionnaireTitle
                  ? "questionnaires__detail_overlay_update_description"
                  : "events__detail_overlay_update_description"
              }
              onUpdate={(update: Partial<ProjectUpdate>) => updateQuestionnaire({...questionnaireUpdate, ...update})}
              updateLoading={actionsLoading}
              disabled={!isEditable}
              renderValue={() => (
                <InlineEditableTextareaContainer
                  text={questionnaire.description}
                  readOnly={true}
                  disabled={!isEditable}
                />
              )}
              customStyles={styles.inlineField}
              displayPlain={true}
            />
          </div>
          <div>
            {!isRuntimeSurvey && (
              <ReadonlyActionField
                buttonLabel={t("edit_button")}
                customStyles={styles.detailHeaderTime}
                onClick={isEditable ? toggleIsEditDurationModalVisible : undefined}
                label={t("projects__detail_time_label")}
                disabled={!isEditable}
                renderValue={() => (
                  <Text size={TextSize.Medium} customStyles={styles.noTime}>
                    <Icon name={IconName.Clock} customStyles={styles.noTimeIcon} />
                    {questionnaire.maxDurationInSeconds === null
                      ? t("placeholder__no_entry")
                      : `${convertSecondsToMinutes(questionnaire.maxDurationInSeconds)} ${t("unit__minutes_short")}`}
                  </Text>
                )}
              />
            )}

            <DetailViewBinary
              label={t("questionnaires__detail_binary")}
              onDeleteBinary={onDeleteBinary}
              readonly={!isEditable}
              onBinariesSuccessfullyUploaded={onBinariesSuccessfullyUploaded}
              binaryFile={questionnaire.binaryFile || undefined}
              acceptedFileTypes={[FileType.Graphic, FileType.Video]}
              createText={t("create_button")}
              placeholderText={t("questionnaires__detail_binary_placeholder")}
              onUpdate={onBinariesSuccessfullyUploaded}
            />
          </div>
        </div>
        <Label
          label={t("questionnaires__detail_questions_title", {count: questionnaire.questions.length})}
          customStyles={styles.spacedLabel}
        />
        <TableContainer<QuestionnaireQuestion>
          customStyles={styles.table}
          entities={sortByPosition<QuestionnaireQuestion>(questionnaire.questions)}
          columns={questionsColumns}
          entityKey={question => question.id}
          customHeaderRowStyles={styles.tableHeader}
          onClick={question => navigateToQuestionDetails(question.id)}
        />
      </CardContent>
      {scenarioId && (
        <QuestionDetailBodyFooter scenarioId={scenarioId} questionnaireId={questionnaire.id} disabled={readonly} />
      )}
      {isEditDurationModalVisible && (
        <EditQuestionnaireDurationModalContainer
          onDismiss={toggleIsEditDurationModalVisible}
          onConfirm={toggleIsEditDurationModalVisible}
          questionnaire={questionnaire}
        />
      )}
    </React.Fragment>
  )
}
