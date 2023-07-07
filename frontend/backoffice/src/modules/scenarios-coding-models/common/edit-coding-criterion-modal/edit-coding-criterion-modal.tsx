import {isEmpty, noop} from "lodash-es"
import * as React from "react"
import {ContentLoadingIndicator, Modal, Overlay, Text} from "shared/components"
import {AutomatedCodingCriterion, RScript} from "shared/models"
import {TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {isAutomatedCodingItem, Option} from "shared/utils"
import {CodingCriteriaCard} from "./coding-criteria-card/coding-criteria-card"
import {CodingCriteriaList} from "./coding-criteria-list/coding-criteria-list"
import {CodingItemMetaCard} from "./coding-item-meta-card/coding-item-meta-card"
import {editCodingCriterionModalStyles as styles} from "./edit-coding-criterion-modal.styles"
import {useEditCodingCriterionModal} from "./hooks/use-edit-coding-criterion-modal"

export interface EditCodingCriterionModalProps {
  readonly codingItemId: UUID
  readonly codingModelId: UUID
  readonly scenarioId: UUID
  readonly onDismiss: () => void
  readonly selectedCodingCriterionId: Option<UUID>
  readonly automatedCodingCriteria?: AutomatedCodingCriterion[]
  readonly rScripts?: RScript[]
  readonly sampleCompanyId?: UUID
}

export const EditCodingCriterionModal: React.FC<EditCodingCriterionModalProps> = ({
  codingItemId,
  codingModelId,
  onDismiss,
  scenarioId,
  selectedCodingCriterionId,
  automatedCodingCriteria,
  rScripts,
  sampleCompanyId
}) => {
  const {t} = useLucaTranslation()

  const {
    dataLoading,
    codingItem,
    codingCriteria,
    selectedCriterionId,
    selectCriterion,
    deselectCriterion,
    getTitleForDocumentViewCodingCriterion,
    getAssociatedRScriptForRScriptCodingCriterion
  } = useEditCodingCriterionModal(codingItemId, selectedCodingCriterionId, scenarioId, rScripts ?? [], sampleCompanyId)

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        customHeaderStyles={styles.modalHeader}
        customContentStyles={styles.modalContent}
        onConfirm={noop}
        onDismiss={onDismiss}
        title={t("coding_criteria__edit_title")}
        preventDismissOnEscape={false}
        preventSubmitOnEnter={true}
        hideFooter={true}>
        <div css={styles.contentWrapper}>
          {dataLoading ? (
            <ContentLoadingIndicator />
          ) : (
            <div css={[styles.content, styles.labeledContent]}>
              <Text size={TextSize.Medium} customStyles={styles.textLabel}>
                {t("coding_criteria__item_meta_data_label")}
              </Text>
              <div css={styles.infoWrapper}>
                <CodingItemMetaCard codingItem={codingItem} />
                <div css={styles.criteriaWrapper}>
                  <CodingCriteriaList
                    codingItem={codingItem}
                    scenarioId={scenarioId}
                    codingModelId={codingModelId}
                    automatedCodingCriteria={
                      codingItem.exists(item => isAutomatedCodingItem(item))
                        ? Option.of(automatedCodingCriteria)
                        : Option.none()
                    }
                    customStyles={styles.codingCriteriaList}
                    codingItemId={codingItemId}
                    codingCriteria={codingCriteria}
                    selectedCriterionId={selectedCriterionId}
                    selectCriterion={selectCriterion}
                    titleForDocumentViewCriterion={getTitleForDocumentViewCodingCriterion}
                    titleForRScriptCriterion={criterion =>
                      getAssociatedRScriptForRScriptCodingCriterion(criterion)
                        .map(rScript => rScript.title)
                        .filter(title => !isEmpty(title))
                        .getOrElse(t("r_scripts__title_placeholder"))
                    }
                  />
                  <CodingCriteriaCard
                    getAssociatedRScriptForRScriptCodingCriterion={getAssociatedRScriptForRScriptCodingCriterion}
                    titleForDocumentViewCodingCriterion={getTitleForDocumentViewCodingCriterion}
                    scenarioId={scenarioId}
                    codingItem={codingItem}
                    codingModelId={codingModelId}
                    selectedCriterionId={selectedCriterionId}
                    codingCriteria={codingCriteria}
                    automatedCodingCriteria={automatedCodingCriteria ?? []}
                    deselectCriterion={deselectCriterion}
                  />
                </div>
              </div>
            </div>
          )}
          <div css={styles.footer} />
        </div>
      </Modal>
    </Overlay>
  )
}
