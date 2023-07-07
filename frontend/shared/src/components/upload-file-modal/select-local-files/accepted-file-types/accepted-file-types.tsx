import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel, UploadFileType as FileType} from "../../../../enums"
import {
  CustomStyle,
  Flex,
  fontColorLight,
  shadowedCard,
  spacingCard,
  spacingHuge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {getAcceptedFileExtensions, getIconNameFromFileType, getLanguageKeyFromFileType} from "../../../../utils"
import {Icon} from "../../../icon/icon"
import {Heading, Text} from "../../../typography/typography"

interface Props extends CustomStyle {
  readonly fileTypes: FileType[]
  readonly isLimitedToSingleItem?: boolean
}

export const AcceptedFileTypes: React.FC<Props> = ({fileTypes, isLimitedToSingleItem = false, customStyles}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={customStyles}>
      <Text customStyles={{marginBottom: spacingTiny}} size={TextSize.Small}>
        {isLimitedToSingleItem
          ? t("files_and_directories__upload_modal_file_typ_text_singular")
          : t("files_and_directories__upload_modal_file_typ_text_plural")}
      </Text>
      <div css={[shadowedCard, styles.wrapper]}>
        {fileTypes.map(fileType => (
          <div key={fileType} css={[Flex.row, styles.fileType]}>
            <Icon customStyles={[styles.icon]} name={getIconNameFromFileType(fileType)} />
            <Heading customStyles={styles.title} level={HeadingLevel.h3}>
              {t(getLanguageKeyFromFileType(fileType))}
            </Heading>
            <Heading customStyles={styles.subTitle} level={HeadingLevel.h3}>
              {/* TODO LUCA-2757 fix mime type */}
              {`(${Object.values(getAcceptedFileExtensions(fileType)).join(", ")})`}
            </Heading>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrapper: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: spacingMedium,
    paddingTop: spacingSmall,
    flexWrap: "wrap"
  }),
  fileType: css({justifyContent: "center", marginRight: spacingHuge, marginTop: spacingSmall}),
  icon: css({marginRight: spacingTiny}),
  text: css({
    padding: spacingCard,
    paddingTop: 0
  }),
  title: css(textEllipsis),
  subTitle: css(textEllipsis, {
    color: fontColorLight,
    marginLeft: spacingSmall
  })
}
