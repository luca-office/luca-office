import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {fontColorLight, spacingSmall} from "../../styles"
import {LucaTFunction} from "../../translations"
import {FilesAndDirectoriesDetailView, Heading} from ".."

interface Props {
  readonly t: LucaTFunction
}

export const FilesAndDirectoriesDetailEmpty: React.FC<Props> = ({t}) => (
  <FilesAndDirectoriesDetailView
    headerIcon={IconName.Folder}
    customCardContentStyles={styles.cardContent}
    headerTitle={t("files_and_directories__detail__empty__title")}>
    <div css={styles.content}>
      <Heading level={HeadingLevel.h3}>{t("files_and_directories__detail__empty__heading")}</Heading>
      <Heading level={HeadingLevel.h3} customStyles={styles.text}>
        {t("files_and_directories__detail__empty__text")}
      </Heading>
    </div>
  </FilesAndDirectoriesDetailView>
)

const styles = {
  content: css({
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }),
  text: css({
    marginTop: spacingSmall,
    color: fontColorLight
  }),
  cardContent: css({
    overflow: "auto"
  })
}
