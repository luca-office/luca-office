import * as React from "react"
import {FormFieldLabel, ReadonlyActionField} from "shared/components"
import {DirectoryNode} from "shared/models"
import {CustomStyle} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {PathActionField} from "../../../../common/files-and-directories/file-detail/path-action-field/path-action-field"
import {detailViewStyles} from "../../detail-styles"
import {EmailFileDetailAction} from "./email-file-detail-action"

interface Props extends CustomStyle {
  readonly disabled: boolean
  readonly parentDirectory: Option<DirectoryNode>
  readonly scenarioId: UUID
  readonly emailId: UUID | null
  readonly sampleCompanyId?: UUID
  readonly tooltipTitleKey: LucaI18nLangKey
  readonly navigateToSampleCompany: () => void
  readonly setIsUpdateDirectoryOverlayVisible: (isVisible: boolean) => void
}

export const FileDetailAction: React.FC<Props> = ({
  disabled,
  parentDirectory,
  scenarioId,
  sampleCompanyId,
  tooltipTitleKey,
  emailId,
  setIsUpdateDirectoryOverlayVisible,
  navigateToSampleCompany
}) => {
  const {t} = useLucaTranslation()

  if (emailId !== null) {
    return <EmailFileDetailAction scenarioId={scenarioId} emailId={emailId} />
  }

  return (
    <>
      <FormFieldLabel
        textKey={
          sampleCompanyId
            ? "files_and_directories__sample_company_label"
            : "files_and_directories__move_directory_label"
        }
      />
      <ReadonlyActionField
        customStyles={detailViewStyles.actionField}
        renderValue={() =>
          sampleCompanyId ? (
            parentDirectory.map(dir => dir.name).getOrElse("")
          ) : (
            <PathActionField
              disabled={disabled}
              tooltipLabel={t(tooltipTitleKey)}
              onMoveClick={() => setIsUpdateDirectoryOverlayVisible(true)}
              t={t}
              parentDirectory={parentDirectory}
            />
          )
        }
        disabled={!sampleCompanyId && disabled}
        onClick={sampleCompanyId ? () => navigateToSampleCompany() : undefined}
        buttonLabel={sampleCompanyId ? t("files_and_directories__sample_company_button") : undefined}
      />
    </>
  )
}
