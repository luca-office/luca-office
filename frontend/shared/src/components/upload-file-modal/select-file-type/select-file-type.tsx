import {css} from "@emotion/react"
import * as React from "react"
import {IconName, UploadFileType as FileType} from "../../../enums"
import {spacingHuge, spacingMedium} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {getLanguageKeyFromFileType, Option} from "../../../utils"
import {FeatureDisabledMarker} from "../../feature-disabled-marker/feature-disabled-marker"
import {SelectableCard} from "../../selectable-card/selectable-card"
import {UploadSection} from "../upload-section/upload-section"

export interface SelectFileTypeProps {
  readonly selectedFileType: Option<FileType>
  readonly onTypeSelected: (fileType: FileType) => void
}

export const SelectFileType: React.FC<SelectFileTypeProps> = ({selectedFileType, onTypeSelected}) => {
  const {t} = useLucaTranslation()

  const isSelectedCard = (fileType: FileType) => selectedFileType.exists(value => value === fileType)

  return (
    <UploadSection customStyles={styles.spacerBottom} heading={t("files_and_directories__upload_modal_file_typ")}>
      <div css={styles.wrapperSelectFileType}>
        <SelectableCard
          onClick={() => onTypeSelected(FileType.TableCalculation)}
          selected={isSelectedCard(FileType.TableCalculation)}
          title={t(getLanguageKeyFromFileType(FileType.TableCalculation))}
          iconName={IconName.TableCalculation}
        />
        <SelectableCard
          title={t(getLanguageKeyFromFileType(FileType.PDF))}
          onClick={() => onTypeSelected(FileType.PDF)}
          selected={isSelectedCard(FileType.PDF)}
          iconName={IconName.PDF}
        />
        <FeatureDisabledMarker>
          <SelectableCard
            title={t(getLanguageKeyFromFileType(FileType.Text))}
            onClick={() => onTypeSelected(FileType.Text)}
            selected={isSelectedCard(FileType.Text)}
            iconName={IconName.TextEditor}
          />
        </FeatureDisabledMarker>
        <SelectableCard
          title={t(getLanguageKeyFromFileType(FileType.Video))}
          onClick={() => onTypeSelected(FileType.Video)}
          selected={isSelectedCard(FileType.Video)}
          iconName={IconName.Play}
        />
        <SelectableCard
          title={t(getLanguageKeyFromFileType(FileType.Graphic))}
          onClick={() => onTypeSelected(FileType.Graphic)}
          selected={isSelectedCard(FileType.Graphic)}
          iconName={IconName.Image}
        />
      </div>
    </UploadSection>
  )
}

const styles = {
  spacerBottom: css({
    marginBottom: spacingHuge
  }),
  wrapperSelectFileType: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: spacingMedium
  })
}
