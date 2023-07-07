import * as React from "react"
import {Heading, Icon, Overlay, PdfViewer, ReadonlyActionField, Text, VideoViewer} from "shared/components"
import {HeadingLevel, UploadFileType as FileType} from "shared/enums"
import {MimeType} from "shared/graphql/generated/globalTypes"
import {BinaryFile, SampleCompany} from "shared/models"
import {Flex, fontColor, FontWeight, TextSize} from "shared/styles"
import {LucaI18nLangKey} from "shared/translations"
import {getLanguageKeyFromMimeType, iconForMimeType, Option, toBinaryType} from "shared/utils"
import {BinaryUpdateModal, DetailViewBinary, UploadFileModal} from "../../../../components"
import {CompanyCreation} from "../../hooks"
import {useInformationBinaryContent} from "./hooks/use-information-binary-content"
import {informationBinaryContentStyle as styles} from "./information-binary-content.style"

export interface InformationBinaryContentProps {
  readonly sampleCompany: Option<SampleCompany>
  readonly isFinalized: boolean
  readonly updateSampleCompany: (update: Partial<CompanyCreation>) => Promise<Option<SampleCompany>>
  readonly disabled?: boolean
}

export const InformationBinaryContent: React.FC<InformationBinaryContentProps> = ({
  sampleCompany: sampleCompanyOption,
  isFinalized,
  updateSampleCompany,
  disabled = false
}) => {
  const {
    createIntro,
    createLogo,
    deleteIntro,
    deleteLogo,
    setShowEditIntroModal,
    setShowUploadIntroModal,
    setShowViewIntroModal,
    showEditIntroModal,
    showUploadIntroModal,
    showViewIntroModal,
    t,
    updateIntro
  } = useInformationBinaryContent(sampleCompanyOption, updateSampleCompany)

  const hasIntro = sampleCompanyOption.exists(sampleCompany => sampleCompany.profileFile !== null)

  const introPlaceholder = (
    <div css={[Flex.row, {justifyContent: "space-between"}]}>
      <Text size={TextSize.Medium}>{t("sample_companies__detail_general_information_company_upload_placeholder")}</Text>
      {!isFinalized && !disabled && (
        <Heading
          onClick={() => setShowUploadIntroModal(true)}
          level={HeadingLevel.h3}
          fontWeight={FontWeight.Bold}
          customStyles={styles.intro.textButton}>
          {t("create_button")}
        </Heading>
      )}
    </div>
  )

  const getIntroButtonKey = (): LucaI18nLangKey => {
    if (hasIntro) {
      return isFinalized || disabled ? "scenario_details__button_show" : "edit_button"
    }
    return "create_button"
  }

  const handleIntroClick = () => {
    if (hasIntro) {
      isFinalized || disabled ? setShowViewIntroModal(true) : setShowEditIntroModal(true)
    } else {
      setShowUploadIntroModal(true)
    }
  }

  const existingIntro = (
    <div css={[Flex.row, {justifyContent: "space-between"}]}>
      <div css={[Flex.row]}>
        {sampleCompanyOption
          .map(sampleCompany => (
            <>
              <Icon
                customStyles={styles.metaContentIcon}
                name={iconForMimeType(sampleCompany.profileFile?.binaryFile?.mimeType ?? MimeType.VideoMp4)}
                color={fontColor}
              />

              <Text size={TextSize.Medium}>
                {t(getLanguageKeyFromMimeType(sampleCompany.profileFile?.binaryFile?.mimeType ?? MimeType.VideoMp4))}
              </Text>
            </>
          ))
          .orNull()}
      </div>
      <Heading
        onClick={handleIntroClick}
        level={HeadingLevel.h3}
        fontWeight={FontWeight.Bold}
        customStyles={styles.intro.textButton}>
        {t(getIntroButtonKey())}
      </Heading>
    </div>
  )

  const renderViewerToolForIntro = (binaryFile: BinaryFile) => (
    <Overlay>
      {binaryFile?.mimeType === MimeType.VideoMp4 ? (
        <VideoViewer
          customStyles={styles.binaryViewer}
          onClose={() => setShowViewIntroModal(false)}
          binaries={[{id: binaryFile.id, path: binaryFile.url}]}
        />
      ) : (
        <PdfViewer
          customStyles={styles.binaryViewer}
          onClose={() => setShowViewIntroModal(false)}
          closeBinary={() => {}}
          selectedBinaryId={Option.of(binaryFile.id)}
          binaries={[{id: binaryFile.id, path: binaryFile.url}]}
        />
      )}
    </Overlay>
  )
  const logo = sampleCompanyOption
    .map(com =>
      com.logoFile
        ? {
            id: com.logoFile.id,
            createdAt: new Date(2021, 1, 1).toISOString(),
            modifiedAt: new Date(2021, 1, 1).toISOString(),
            filename: com.logoFile.name,
            fileSize: 0,
            url: com.logoFile.binaryFileUrl || "",
            mimeType: MimeType.ImagePng,
            __typename: "BinaryFile" as const
          }
        : undefined
    )
    .orUndefined()

  return (
    <div css={styles.grid}>
      <div css={styles.logoContainer}>
        <DetailViewBinary
          label={t("sample_companies__logo_label")}
          onDeleteBinary={deleteLogo}
          readonly={isFinalized || disabled}
          onBinariesSuccessfullyUploaded={createLogo}
          acceptedFileTypes={[FileType.Graphic]}
          placeholderText={t("sample_companies__detail_general_information_binary_placeholder")}
          createText={t("create_button")}
          binaryFile={logo}
        />
      </div>
      <div css={[styles.marginTopLarge, styles.metaContent, styles.contentWidth]}>
        <ReadonlyActionField
          disabled={isFinalized || disabled}
          renderValue={() => (hasIntro ? existingIntro : introPlaceholder)}
          label={t("sample_companies__detail_general_information_company_intro")}
        />
      </div>
      {showUploadIntroModal && (
        <UploadFileModal
          isLimitedToSingleItem
          disabled={isFinalized || disabled}
          titleKey="sample_companies__detail_general_information_company_upload_intro"
          onDismiss={() => setShowUploadIntroModal(false)}
          acceptedFileTypes={[FileType.PDF, FileType.Video]}
          onBinariesSuccessfullyUploaded={createIntro}
        />
      )}
      {showEditIntroModal &&
        sampleCompanyOption
          .map(
            sampleCompany =>
              sampleCompany.profileFile?.binaryFile?.mimeType && (
                <BinaryUpdateModal
                  titleKey="sample_companies__detail_general_information_company_intro_edit"
                  deleteButtonKey="sample_companies__detail_general_information_company_intro_delete"
                  onDelete={() => sampleCompany.profileFileId && deleteIntro(sampleCompany.profileFileId)}
                  onConfirm={updateIntro}
                  src={sampleCompany.profileFile.binaryFile.url}
                  onDismiss={() => setShowEditIntroModal(false)}
                  type={toBinaryType(sampleCompany.profileFile.binaryFile.mimeType)}
                />
              )
          )
          .orNull()}
      {showViewIntroModal &&
        sampleCompanyOption
          .map(
            sampleCompany =>
              sampleCompany.profileFile?.binaryFile?.mimeType &&
              renderViewerToolForIntro(sampleCompany.profileFile.binaryFile)
          )
          .orNull()}
    </div>
  )
}
