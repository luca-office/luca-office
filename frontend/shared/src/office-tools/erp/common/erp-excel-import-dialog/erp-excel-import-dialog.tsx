import * as React from "react"
import {Button, ContentLoadingIndicator, FileDropzone, Icon, Modal, Overlay, Paper, Text} from "../../../../components"
import {IconName, UploadFileType} from "../../../../enums"
import {errorColor, TextSize} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {baseUrl, getAcceptedFileExtensions, getIconNameFromFileType} from "../../../../utils"
import {erpExcelImportDialogStyles as styles} from "./erp-excel-import-dialog.styles"
import {useErpExcelImportDialog} from "./hooks/use-erp-excel-import-dialog"

export interface ErpExcelImportDialogProps {
  readonly sampleCompanyId: UUID
  readonly onDismiss: () => void
}

export const ErpExcelImportDialog: React.FC<ErpExcelImportDialogProps> = ({sampleCompanyId, onDismiss}) => {
  const {t} = useLucaTranslation()
  const {
    file: fileOption,
    selectFile,
    deselectFile,
    uploading,
    uploadSuccessful,
    uploadFile,
    fileUploaded,
    uploadError
  } = useErpExcelImportDialog(sampleCompanyId, onDismiss)

  const didUploadFail = fileUploaded && !uploadSuccessful
  const confirmButtonDisabled = fileOption.isEmpty() || uploading || fileUploaded

  const dropzoneDescription = (
    <div css={styles.fileDropZoneDescription} className={"erp-excel-import-upload-description"}>
      <Text>{t("erp_excel_import__modal_upload_description")}</Text>
      <Text>{t("erp_excel_import__modal_upload_description_hint")}</Text>
    </div>
  )

  const dropzoneLoadingIndicator = (
    <div css={styles.fileDropZoneDescription} className={"erp-excel-import-upload-indicator"}>
      <Text>{t("erp_excel_import__modal_upload_check")}</Text>
      <ContentLoadingIndicator customLoadingIndicatorStyles={styles.fileDropZoneLoadingIndicator} />
    </div>
  )

  const fileDropzone = (
    <FileDropzone
      customStyles={styles.fileDropZone}
      accept={getAcceptedFileExtensions(UploadFileType.TableCalculation)}
      onFilesAccepted={selectFile}
      multiple={false}
      description={uploading ? dropzoneLoadingIndicator : dropzoneDescription}
      hideSelectButton={uploading}
    />
  )

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        customHeaderStyles={styles.header}
        onDismiss={onDismiss}
        onConfirm={uploadFile}
        title={t("erp_excel_import__modal_title")}
        confirmButtonDisabled={confirmButtonDisabled}
        confirmButtonKey={"add_button"}>
        <div css={styles.content} className={"erp-excel-import-content"}>
          <Text>{t("erp_excel_import__modal_description")}</Text>
          <div css={styles.warning} className={"erp-excel-import-warning"}>
            <Icon color={errorColor} name={IconName.Alert} />
            <Text customStyles={styles.warningText}>{t("erp_excel_import__modal_warning")}</Text>
          </div>
          <div css={styles.downloadButtonWrapper}>
            <a css={styles.downloadLink} data-testid="download-link" href={`${baseUrl}/binary/erp/template`}>
              <Button customStyles={styles.downloadButton} icon={IconName.Download}>
                {t("erp_excel_import__modal_download")}
              </Button>
            </a>
          </div>
          <div css={styles.fileContent} className={"erp-excel-import-file-content"}>
            <Text customStyles={styles.fileContentLabel} size={TextSize.Medium}>
              {t("erp_excel_import__modal_upload_title")}
            </Text>
            <div css={styles.fileDropZoneWrapper(fileUploaded, uploadSuccessful)}>
              {uploading
                ? fileDropzone
                : fileOption
                    .map(file => (
                      <Paper customStyles={styles.fileChip(didUploadFail)}>
                        <Icon name={getIconNameFromFileType(UploadFileType.TableCalculation)} />
                        <Text customStyles={styles.fileChipText} size={TextSize.Medium}>
                          {file.name}
                        </Text>
                        {didUploadFail && (
                          <Text customStyles={styles.fileChipText} size={TextSize.Medium}>
                            {t("erp_excel_import__modal_file_chip_error")}
                          </Text>
                        )}
                        <Icon
                          customStyles={styles.fileChipRemoveIcon}
                          name={IconName.Close}
                          onClick={() => deselectFile()}
                        />
                      </Paper>
                    ))
                    .getOrElse(fileDropzone)}
            </div>
          </div>
          {uploadError !== null && (
            <div css={styles.uploadErrorWrapper} className={"erp-excel-import-upload-error"}>
              <Text customStyles={styles.warningText} size={TextSize.Small}>
                {`${t("erp_excel_import__modal_upload_error")}: ${uploadError}`}
              </Text>
            </div>
          )}
        </div>
      </Modal>
    </Overlay>
  )
}
