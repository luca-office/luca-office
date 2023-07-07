import {css} from "@emotion/react"
import React from "react"
import {Button, ColumnProps, Heading, Icon} from "../../../components"
import {ButtonVariant, HeadingLevel, IconName} from "../../../enums"
import {
  buttonBackgroundDanger,
  errorColor,
  FontWeight,
  inputHeight,
  spacingHuge,
  spacingSmall,
  textEllipsis
} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {EmailBodyFile} from "../email-details/email-files"

export const getEmailFilesColumns = (
  t: LucaTFunction,
  disabled: boolean,
  onAddFile: () => void,
  onDeleteFile: (file: EmailBodyFile) => void
): ColumnProps<EmailBodyFile>[] => {
  return [
    {
      key: "icon-title",
      customStyles: styles.iconTitleColumn,
      header: (
        <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
          {t("email__files_table_column_file")}
        </Heading>
      ),
      content: entity => (
        <div css={styles.nameColumnContent}>
          <Icon name={entity.iconName} />
          {entity.title}
        </div>
      )
    },
    {
      key: "create-file",
      customStyles: [styles.deleteColumn],
      header: (
        <Button
          disabled={disabled}
          icon={IconName.Add}
          customStyles={styles.addButton}
          customIconStyles={styles.addButtonIcon}
          onClick={onAddFile}
        />
      ),
      content: entity => (
        <Button
          disabled={disabled}
          onClick={() => onDeleteFile(entity)}
          icon={IconName.Trash}
          variant={ButtonVariant.IconOnly}
          customIconStyles={styles.deleteButtonIcon}
          customStyles={[styles.deleteButton]}
          stopEventPropagation={true}
        />
      )
    }
  ]
}

export const styles = {
  iconTitleColumn: css({
    flexBasis: "90%"
  }),
  deleteColumn: css({
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 0,
    minWidth: inputHeight
  }),
  addButton: css({
    width: inputHeight,
    height: inputHeight
  }),
  addButtonIcon: css({
    margin: 0
  }),
  nameColumnContent: css(textEllipsis, {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridGap: spacingSmall,
    alignItems: "center"
  }),
  deleteButton: css({
    marginRight: spacingSmall,
    minWidth: spacingHuge,
    background: buttonBackgroundDanger,
    borderColor: errorColor
  }),
  deleteButtonIcon: css({
    marginRight: 0
  })
}
