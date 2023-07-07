import * as React from "react"
import {Card, DeleteOrArchiveEntityButton, Text, TextArea, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingItem,
  DocumentViewScenarioCodingAutomatedCriterion,
  RScript,
  RScriptScenarioCodingAutomatedCriterion,
  ToolUsageScenarioCodingAutomatedCriterion
} from "shared/models"
import {TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {featureUsageMap, first, Option} from "shared/utils"
import {DocumentViewContentContainer} from "./automated-criteria-content/document-view/document-view-content-container"
import {FeatureUsageContent} from "./automated-criteria-content/feature-usage/feature-usage-content"
import {UpdateInputValueContentContainer} from "./automated-criteria-content/input-value/update-input-value-content-container"
import {RScriptContentContainer} from "./automated-criteria-content/r-script/r-script-content-container"
import {UpdateToolUsageContent} from "./automated-criteria-content/tool-usage/update-tool-usage-content"
import {codingCriteriaCardStyles as styles} from "./coding-criteria-card.styles"
import {AutomatedCodingCriterionUpdateType, useCodingCriteriaCard} from "./hooks/use-coding-criteria-card"

export interface CodingCriteriaCardProps {
  readonly codingItem: Option<CodingItem>
  readonly codingModelId: UUID
  readonly selectedCriterionId: Option<UUID>
  readonly codingCriteria: CodingCriterion[]
  readonly automatedCodingCriteria: AutomatedCodingCriterion[]
  readonly scenarioId: UUID
  readonly deselectCriterion: () => void
  readonly titleForDocumentViewCodingCriterion: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string
  readonly getAssociatedRScriptForRScriptCodingCriterion: (
    criterion: RScriptScenarioCodingAutomatedCriterion
  ) => Option<RScript>
}

export const CodingCriteriaCard: React.FC<CodingCriteriaCardProps> = ({
  automatedCodingCriteria,
  codingItem,
  selectedCriterionId,
  codingCriteria,
  codingModelId,
  deselectCriterion,
  scenarioId,
  titleForDocumentViewCodingCriterion,
  getAssociatedRScriptForRScriptCodingCriterion
}) => {
  const {t} = useLucaTranslation()

  const {
    selectedCriterion,
    score,
    description,
    onScoreChange,
    onDescriptionChange,
    updateScore,
    updateDescription,
    deleteHook,
    updateAutomatedCriterionUpdate
  } = useCodingCriteriaCard({
    codingItem,
    selectedCriterionId,
    codingCriteria,
    automatedCodingCriteria,
    deselectCriterion,
    codingModelId
  })

  const hasAutomatedCriteria = automatedCodingCriteria.length > 0

  return (
    <div css={styles.card}>
      <div css={styles.header}>
        <div css={styles.headerLabel}>
          {selectedCriterion
            .map(() => t("coding_criteria__criterion_edit_title"))
            .getOrElse(t("coding_criteria__criterion_edit_placeholder_label_main"))}
        </div>
        {selectedCriterion
          .map(() => (
            <DeleteOrArchiveEntityButton
              entityId={selectedCriterion.map(({id}) => id).getOrElse("")}
              useDeleteHook={deleteHook}
              customButtonStyles={styles.headerButton}
            />
          ))
          .orNull()}
      </div>
      <div css={styles.content}>
        {selectedCriterion
          .map(criterion => (
            <div css={styles.contentWrapper}>
              <div css={styles.labeledContent}>
                <Text size={TextSize.Medium} customStyles={styles.textLabel}>
                  {codingItem
                    .map(item =>
                      item.scoringType === ScoringType.Holistic
                        ? t("coding_criteria__criterion_scoring_label_holistic")
                        : t("coding_criteria__criterion_scoring_label_analytical")
                    )
                    .getOrElse(t("coding_criteria__criterion_scoring_label_default"))}
                </Text>
                <Card customStyles={styles.pointsCard} hasShadow={true}>
                  <Text>
                    {t(
                      codingItem.exists(item => item.scoringType === ScoringType.Holistic)
                        ? "rating__holistic_description"
                        : "coding_item_update__selection_card_type_analytical_description"
                    )}
                  </Text>
                  <div css={styles.pointInputWrapper}>
                    <TextInput
                      customStyles={styles.pointInput}
                      type={InputType.number}
                      value={score}
                      max={99}
                      min={0}
                      onChange={onScoreChange}
                      onBlur={updateScore}
                    />
                    <div css={styles.pointInputLabel}>{t("coding_criteria__criterion_scoring_input_label")}</div>
                  </div>
                </Card>
              </div>

              {!hasAutomatedCriteria ? (
                <div css={styles.labeledContent}>
                  <Text size={TextSize.Medium} customStyles={styles.textLabel}>
                    {t("coding_criteria__criterion_description_label")}
                  </Text>
                  <TextArea
                    customStyles={styles.descriptionTextArea}
                    value={description}
                    onChange={evt => onDescriptionChange(evt.currentTarget?.value ?? "")}
                    onBlur={updateDescription}
                  />
                </div>
              ) : (
                criterion.__typename !== "CodingCriterion" &&
                renderCustomAutomatedCriterionContent(
                  automatedCodingCriteria,
                  criterion,
                  updateAutomatedCriterionUpdate,
                  scenarioId,
                  titleForDocumentViewCodingCriterion,
                  getAssociatedRScriptForRScriptCodingCriterion,
                  codingModelId
                )
              )}
            </div>
          ))
          .getOrElse(
            <div css={styles.placeholder}>
              <div css={styles.placeholderLabel}>{t("coding_criteria__criterion_edit_placeholder_label_main")}</div>
              <div css={styles.placeholderSubLabel}>{t("coding_criteria__criterion_edit_placeholder_label_sub")}</div>
            </div>
          )}
      </div>
      <div css={styles.footer}>
        <div css={styles.footerContent}>
          {selectedCriterion
            .map(criterion => (
              <div css={styles.footerContentWrapper}>
                <div css={styles.footerContentText}>{t("coding_criteria__criterion_scoring_label")}</div>
                <div css={[styles.footerContentText, styles.footerContentPoints]}>
                  {t("coding_criteria__criterion_list_score", {score: criterion.score})}
                </div>
              </div>
            ))
            .orNull()}
        </div>
      </div>
    </div>
  )
}
const renderCustomAutomatedCriterionContent = (
  automatedCodingCriteria: AutomatedCodingCriterion[],
  criterion: AutomatedCodingCriterion,
  handleUpdate: (criterion: AutomatedCodingCriterion, update: AutomatedCodingCriterionUpdateType) => Promise<unknown>,
  scenarioId: UUID,
  titleForDocumentViewCodingCriterion: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string,
  getAssociatedRScriptForRScriptCodingCriterion: (
    criterion: RScriptScenarioCodingAutomatedCriterion
  ) => Option<RScript>,
  codingModelId: UUID
) => {
  switch (criterion.__typename) {
    case "ToolUsageScenarioCodingAutomatedCriterion":
      return (
        <UpdateToolUsageContent
          alreadyUsedTools={automatedCodingCriteria
            .filter(codingCriterion => codingCriterion.__typename === "ToolUsageScenarioCodingAutomatedCriterion")
            .map(criterion => (criterion as ToolUsageScenarioCodingAutomatedCriterion).officeTool)}
          criterion={criterion}
          onChangeTool={tool => handleUpdate(criterion, {officeTool: tool})}
        />
      )
    case "InputValueScenarioCodingAutomatedCriterion":
      return (
        <UpdateInputValueContentContainer
          criterion={criterion}
          scenarioId={scenarioId}
          onChangeInputValue={value => handleUpdate(criterion, {value})}
          codingItemId={criterion.itemId}
          codingModelId={codingModelId}
        />
      )
    case "DocumentViewScenarioCodingAutomatedCriterion": {
      return (
        <DocumentViewContentContainer
          scenarioId={scenarioId}
          criterion={criterion}
          titleForDocumentViewCodingCriterion={titleForDocumentViewCodingCriterion}
          codingModelId={codingModelId}
        />
      )
    }
    case "FeatureUsageScenarioCodingAutomatedCriterion": {
      return (
        <FeatureUsageContent
          onChangeTool={tool =>
            handleUpdate(criterion, {
              officeTool: tool,
              featureType: first(featureUsageMap.get(tool) ?? [])
                .map(info => info.featureType)
                .orUndefined()
            })
          }
          onChangeFeatureType={featureType => handleUpdate(criterion, {featureType})}
          criterion={criterion}
        />
      )
    }
    case "RScriptScenarioCodingAutomatedCriterion": {
      return getAssociatedRScriptForRScriptCodingCriterion(criterion)
        .map(rScript => (
          <RScriptContentContainer
            criterion={criterion}
            codingItemId={criterion.itemId}
            rScript={rScript}
            codingModelId={codingModelId}
          />
        ))
        .orNull()
    }

    default:
      return <></>
  }
}
