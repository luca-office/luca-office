import {css} from "@emotion/react"
import * as React from "react"
import {
  Card,
  CardHeader,
  Column,
  Columns,
  deleteEntityButtonStyles,
  Heading,
  Icon,
  indexToCellName,
  Label,
  OrlyButtonContainer,
  ReadonlyActionField,
  Text
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {InterventionType, RuntimeSurveyAnswerSelectionInterventionUpdate} from "shared/graphql/generated/globalTypes"
import {
  Intervention,
  NavigationConfig,
  NotesContentIntervention,
  RuntimeSurveyAnswerSelectionIntervention,
  SpreadsheetCellContentIntervention,
  TextDocumentContentIntervention
} from "shared/models"
import {Flex, fontColorLight, spacing, spacingLarge, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getReceptionDelayLabel} from "shared/utils"
import {InlineEditableHeaderContainer} from "../../../../components"
import {Route} from "../../../../routes"
import {
  getGroupTypeIconName,
  interventionTypeToDescriptionLanguageKey,
  interventionTypeToGroupType,
  interventionTypeToLanguageKey
} from "../../utils"
import {isRuntimeSurveyIntervention} from "../../utils/common"
import {NotesContentTriggerCondition} from "../trigger-condition/notes-content-trigger-condition"
import {SpreadsheetCellContentTriggerCondition} from "../trigger-condition/spreadsheet-cell-content-trigger-condition"
import {
  RuntimeSurveyAnswerSelectionState,
  SurveyEventAnswerSelectionTriggerCondition
} from "../trigger-condition/survey-event-answer-selection-trigger-condition"
import {TextDocumentContentTriggerCondition} from "../trigger-condition/text-document-content-trigger-condition"
import {TriggerCondition} from "../trigger-condition/trigger-condition"
import {InterventionUpdateTimeModalContainer} from "../update-time-modal/intervention-update-time-modal-container"
import {InterventionUpdateWithTimeoffset} from "./intervention-detail-view-container"
import {InterventionEmailLink} from "./intervention-email-link/intervention-email-link"

export interface InterventionDetailViewProps {
  readonly handleDeleteIntervention: () => void
  readonly handleUpdateOfInterventionsWithTimeoffset: (
    update: Partial<InterventionUpdateWithTimeoffset>,
    interventionType: InterventionType
  ) => Promise<unknown>
  readonly handleUpdateRuntimeSurveyAnswerSelectionIntervention: (
    update: Partial<RuntimeSurveyAnswerSelectionInterventionUpdate>
  ) => Promise<unknown>
  readonly intervention: Intervention
  readonly isEditTimeModalVisible: boolean
  readonly isReadOnly: boolean
  readonly navigate: (navigationConfig: NavigationConfig<Route>) => void
  readonly questionTitle?: string
  readonly toggleIsEditTimeModalVisible: () => void
}

export const InterventionDetailView: React.FC<InterventionDetailViewProps> = ({
  handleDeleteIntervention,
  handleUpdateOfInterventionsWithTimeoffset,
  handleUpdateRuntimeSurveyAnswerSelectionIntervention,
  intervention,
  isEditTimeModalVisible,
  isReadOnly,
  navigate,
  questionTitle,
  toggleIsEditTimeModalVisible
}) => {
  const {t} = useLucaTranslation()

  const isRuntimeSurveyEventAnswerSelection = isRuntimeSurveyIntervention(intervention)

  const renderTriggerCondition = () => {
    switch (intervention.interventionType) {
      case InterventionType.RuntimeSurveyAnswerSelection: {
        const runtimeSurveyEventAnswerSelectionIntervention = intervention as RuntimeSurveyAnswerSelectionIntervention
        return (
          <SurveyEventAnswerSelectionTriggerCondition
            selectedAnswer={runtimeSurveyEventAnswerSelectionIntervention.answer}
            onChange={value =>
              handleUpdateRuntimeSurveyAnswerSelectionIntervention({
                isNegated: value === RuntimeSurveyAnswerSelectionState.WasNotSelected
              })
            }
            questionTitle={questionTitle ?? ""}
            isNegated={runtimeSurveyEventAnswerSelectionIntervention.isNegated}
          />
        )
      }

      case InterventionType.NotesContent: {
        const notesContentIntervention = intervention as NotesContentIntervention
        return (
          <NotesContentTriggerCondition
            isReadOnly={isReadOnly}
            onConfirm={value =>
              handleUpdateOfInterventionsWithTimeoffset(
                {value: value.length > 0 ? value : undefined},
                InterventionType.NotesContent
              )
            }
            value={notesContentIntervention.value}
          />
        )
      }
      case InterventionType.TextDocumentContent: {
        const textDocumentContentintervention = intervention as TextDocumentContentIntervention
        return (
          <TextDocumentContentTriggerCondition
            isReadOnly={isReadOnly}
            onConfirm={value =>
              handleUpdateOfInterventionsWithTimeoffset(
                {value: value.length > 0 ? value : undefined},
                InterventionType.TextDocumentContent
              )
            }
            value={textDocumentContentintervention.value}
          />
        )
      }
      case InterventionType.SpreadsheetCellContent: {
        const spreadsheetCellContentIntervention = intervention as SpreadsheetCellContentIntervention
        return (
          <SpreadsheetCellContentTriggerCondition
            isReadOnly={isReadOnly}
            onConfirm={value =>
              handleUpdateOfInterventionsWithTimeoffset({value}, InterventionType.SpreadsheetCellContent)
            }
            tags={spreadsheetCellContentIntervention.value.split(";")}
          />
        )
      }
      default:
        // eslint-disable-next-line consistent-return
        return undefined
    }
  }

  return (
    <Card customStyles={styles.card}>
      <CardHeader customStyles={styles.header} hasGreyBackground hasShadow>
        <Heading level={HeadingLevel.h3}>{t("interventions__detail_view_header_label")}</Heading>
        <OrlyButtonContainer
          disabled={isReadOnly}
          customStyles={styles.deleteEntityButton}
          iconColor={fontColorLight}
          onConfirm={handleDeleteIntervention}
          customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
          modalTitleKey="interventions__interventions_detail_delete_modal_title"
          modalTextKey="interventions__interventions_detail_delete_modal_description"
        />
      </CardHeader>
      <div css={styles.content}>
        <Columns customStyles={styles.columns}>
          <Column flexGrow={2}>
            <div css={styles.title}>
              <Label
                label={t("interventions__interventions_detail_title_label")}
                icon={isReadOnly ? IconName.LockClosed : IconName.EditPencil}
              />
              <InlineEditableHeaderContainer
                onConfirm={title => handleUpdateOfInterventionsWithTimeoffset({title}, intervention.interventionType)}
                text={intervention.title}
                disabled={isReadOnly}
                customStyles={styles.inlineField}
              />
            </div>
          </Column>
          <Column>
            <ReadonlyActionField
              buttonLabel={t("edit_button")}
              customStyles={styles.detailHeaderTime}
              onClick={!isReadOnly && !isRuntimeSurveyEventAnswerSelection ? toggleIsEditTimeModalVisible : undefined}
              label={t("interventions__interventions_table_time_offset")}
              disabled={isReadOnly || isRuntimeSurveyEventAnswerSelection}
              renderValue={() => (
                <Text size={TextSize.Medium} customStyles={styles.noTime}>
                  <Icon name={IconName.Clock} customStyles={styles.noTimeIcon} />
                  {`${
                    intervention.__typename === "RuntimeSurveyAnswerSelectionIntervention"
                      ? t("interventions__interventions_table_time_offset_after_event")
                      : getReceptionDelayLabel(t, intervention.timeOffsetInSeconds)
                  }`}
                </Text>
              )}
            />
          </Column>
        </Columns>
        <TriggerCondition
          titleKey={interventionTypeToLanguageKey(
            intervention.interventionType,
            intervention.__typename === "SpreadsheetCellContentIntervention" ? intervention.isNegated : undefined
          )}
          titleKeyOptions={
            intervention.__typename === "SpreadsheetCellContentIntervention"
              ? {
                  cellName: indexToCellName({
                    columnIndex: intervention.spreadsheetColumnIndex,
                    rowIndex: intervention.spreadsheetRowIndex
                  })
                }
              : undefined
          }
          descriptionKey={interventionTypeToDescriptionLanguageKey(intervention.interventionType)}
          icon={getGroupTypeIconName(interventionTypeToGroupType(intervention.interventionType))}
          renderCondition={renderTriggerCondition}
        />
      </div>
      <InterventionEmailLink navigate={navigate} intervention={intervention} />
      {isEditTimeModalVisible && intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention" && (
        <InterventionUpdateTimeModalContainer
          onConfirm={toggleIsEditTimeModalVisible}
          onDismiss={toggleIsEditTimeModalVisible}
          intervention={intervention}
          handleUpdate={handleUpdateOfInterventionsWithTimeoffset}
          scenarioId={intervention.scenarioId}
        />
      )}
    </Card>
  )
}

const styles = {
  header: css({
    justifyContent: "space-between"
  }),
  card: css({
    overflowY: "auto"
  }),
  content: css({
    padding: spacing(spacingLarge, spacingMedium),
    height: "100%",
    overflowY: "auto"
  }),
  title: css({
    marginBottom: spacingLarge
  }),
  deleteEntityButton: css({
    cursor: "pointer"
  }),
  inlineField: css({
    marginLeft: -spacingSmall
  }),
  noTime: css(Flex.row, {
    marginRight: spacingMedium
  }),
  spacedLabel: css({
    marginTop: spacingLarge,
    overflow: "auto"
  }),
  noTimeIcon: css({
    marginRight: spacingSmall
  }),
  detailHeaderTime: css({
    flexGrow: 1
  }),
  columns: css({
    alignItems: "baseline",
    marginBottom: spacingLarge
  })
}
