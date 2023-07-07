import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, SelectableCard} from "shared/components"
import {IconName} from "shared/enums"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {spacingMedium, spacingTiny} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface ChooseDocumentModalProps {
  readonly disabled?: boolean
  readonly onDismiss: () => void
  readonly onConfirm: (documentType: OfficeTool) => void
  readonly defaultDocumentType: OfficeTool
  readonly isDocumentViewCriterion: boolean
  readonly sampleCompanyId?: UUID
}

export const AutomatedCriterionChooseDocumentModal: React.FC<ChooseDocumentModalProps> = ({
  disabled = false,
  onDismiss,
  onConfirm,
  defaultDocumentType,
  sampleCompanyId,
  isDocumentViewCriterion
}) => {
  const {t} = useLucaTranslation()

  const [selectedDocumentType, setSelectedDocumentType] = React.useState(defaultDocumentType) // only state, no extra container for it

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        customFooterStyles={styles.footer}
        onConfirm={() => onConfirm(selectedDocumentType)}
        confirmButtonDisabled={disabled}
        onDismiss={onDismiss}
        title={t("coding_models__automated_item_input_value_choose_document_modal_title")}
        preventDismissOnEscape={true}
        preventSubmitOnEnter={true}>
        <div css={styles.content}>
          <SelectableCard
            title={t("coding_models__automated_item_input_value_position_all_mails")}
            iconName={IconName.Email}
            text={t(
              isDocumentViewCriterion
                ? "coding_models__automated_item_document_view_choose_document_modal_mails"
                : "coding_models__automated_item_input_value_choose_document_modal_mails_text"
            )}
            selected={selectedDocumentType === OfficeTool.EmailClient}
            onClick={() => setSelectedDocumentType(OfficeTool.EmailClient)}
          />
          <SelectableCard
            title={t(
              isDocumentViewCriterion
                ? "scenario_details__settings_label_files_and_directories"
                : "scenario_details__settings_label_files_and_directories_only_spreadsheet"
            )}
            iconName={IconName.FolderStack}
            text={t(
              isDocumentViewCriterion
                ? "coding_models__automated_item_document_view_choose_document_modal_files_and_directories"
                : "coding_models__automated_item_input_value_choose_document_modal_files_and_directories_text"
            )}
            selected={
              selectedDocumentType === OfficeTool.FileBrowser || selectedDocumentType === OfficeTool.SpreadsheetEditor
            }
            onClick={() =>
              setSelectedDocumentType(isDocumentViewCriterion ? OfficeTool.FileBrowser : OfficeTool.SpreadsheetEditor)
            }
          />
          {isDocumentViewCriterion && (
            <SelectableCard
              title={t("reference_book__title")}
              iconName={IconName.Book}
              text={t("coding_models__automated_item_document_view_choose_document_modal_reference_books")}
              selected={selectedDocumentType === OfficeTool.ReferenceBookViewer}
              onClick={() => setSelectedDocumentType(OfficeTool.ReferenceBookViewer)}
            />
          )}
          {isDocumentViewCriterion ? (
            <SelectableCard
              title={t("erp__title")}
              iconName={IconName.DataSet}
              disabled={sampleCompanyId === undefined}
              text={t("coding_models__automated_item_document_view_choose_document_modal_erp")}
              selected={selectedDocumentType === OfficeTool.Erp}
              onClick={() => setSelectedDocumentType(OfficeTool.Erp)}
            />
          ) : (
            <SelectableCard
              title={t("coding_models__automated_item_input_value_position_notes")}
              iconName={IconName.Notes}
              text={t("coding_models__automated_item_input_value_choose_document_modal_notes_text")}
              selected={selectedDocumentType === OfficeTool.Notes}
              onClick={() => setSelectedDocumentType(OfficeTool.Notes)}
            />
          )}
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({
    width: 900
  }),
  content: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium,
    padding: spacingTiny
  }),
  footer: css({
    marginTop: spacingMedium
  })
}
