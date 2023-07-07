import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, ColumnProps, Heading, Icon, TableContainer, Tooltip} from "../../../../components"
import {HeadingLevel, IconName} from "../../../../enums"
import {Relevance} from "../../../../graphql/generated/globalTypes"
import {CustomStyle, Flex, FontWeight, spacingHuger, spacingSmall, spacingTiny, textEllipsis} from "../../../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../../../translations"
import {Option} from "../../../../utils"

export type EmailBodyFile = {
  id: UUID
  title: string
  relevance: Option<Relevance>
  iconName: IconName
}

export interface AddEmailFilesProps extends CustomStyle {
  readonly files: EmailBodyFile[]
  readonly columns: ColumnProps<EmailBodyFile>[]
  readonly tooltipText?: LucaI18nLangKey
  readonly showFooter?: boolean
}

export const AddEmailFiles: React.FC<AddEmailFilesProps> = ({
  files,
  columns,
  tooltipText,
  showFooter = false,
  customStyles
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[Flex.column, styles.files, customStyles]}>
      <div css={[Flex.column, styles.column]}>
        <div css={[styles.labelWrapper]} className="label">
          <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>{`${t(
            "email__files_label"
          )} (${files.length})`}</Heading>
          <Tooltip
            title={t("email__files_label")}
            text={t(tooltipText ?? "email__files_tooltip")}
            icon={IconName.Information}>
            <Icon name={IconName.Information} />
          </Tooltip>
        </div>

        <TableContainer
          entities={files}
          entityKey={entity => entity.id}
          customHeaderRowStyles={styles.header}
          customEntityWrapperStyles={styles.content}
          customStyles={styles.tableContainer}
          columns={columns}
          placeHolderText={t("email__files_placeholder")}
          customPlaceholderStyles={styles.tablePlaceholder}
        />
        {showFooter && <CardFooter customStyles={styles.contentFooter} />}
      </div>
    </div>
  )
}

const Size = {
  label: 20,
  filesContent: 200,
  filesContentMax: 350,
  placeholderHeight: 175
}

export const styles = {
  files: css({
    position: "relative"
  }),
  column: css({
    overflow: "auto",
    display: "flex",
    flexDirection: "column"
  }),
  labelWrapper: css({
    display: "grid",
    gridTemplateColumns: "minmax(0, max-content) minmax(min-content, max-content)",
    gridColumnGap: spacingTiny,
    alignItems: "center",
    marginBottom: spacingTiny
  }),
  label: css(textEllipsis, {
    letterSpacing: 0.15
  }),
  tablePlaceholder: css({
    minHeight: "auto",
    marginTop: spacingSmall,
    marginBottom: spacingSmall
  }),
  tableContainer: css({
    overflow: "auto"
  }),
  header: css({
    height: spacingHuger
  }),
  content: css({
    height: Size.filesContent,
    maxHeight: Size.filesContentMax,
    overflowY: "scroll"
  }),
  contentFooter: css({
    height: 0,
    borderBottomLeftRadius: spacingTiny,
    borderBottomRightRadius: spacingTiny
  })
}
