import {css} from "@emotion/react"
import * as React from "react"
import {Button, Checkbox, ColumnProps, Icon, TableContainer, Text} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {AutomatedCodingCriterion} from "shared/models"
import {CustomStyle, Flex, spacingHuger, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface AutomatedCodingCriterionCommonTableProps<T extends AutomatedCodingCriterion> extends CustomStyle {
  readonly entities: T[]
  readonly placeholder?: JSX.Element
  readonly onEntityClick: (entity: T) => void
  readonly customMiddleColumns: ColumnProps<T>[]
  readonly onAddClick?: () => void
  readonly onEditClick?: () => void
  readonly isReadOnly: boolean
}

export const AutomatedCodingCriterionCommonTable = <T extends AutomatedCodingCriterion>({
  customStyles,
  entities,
  placeholder,
  customMiddleColumns,
  onEntityClick,
  onAddClick,
  onEditClick,
  isReadOnly
}: AutomatedCodingCriterionCommonTableProps<T>) => {
  const {t} = useLucaTranslation()

  const columns: ColumnProps<T>[] = [
    {
      header: <Icon name={IconName.MultipleChoice} />,
      key: "selection",
      customHeaderStyles: styles.columns.header,
      customStyles: styles.columns.checkbox,
      content: () => <Checkbox disabled />
    },
    ...customMiddleColumns,
    {
      header: (
        <div css={Flex.row}>
          <Button
            disabled={isReadOnly}
            onClick={onEditClick}
            variant={ButtonVariant.IconOnly}
            icon={IconName.EditBordered}
            customStyles={styles.icon}
          />
          <Button disabled={isReadOnly} onClick={onAddClick} variant={ButtonVariant.IconOnly} icon={IconName.Add} />
        </div>
      ),
      key: "score",
      customStyles: styles.columns.selection,
      content: entity => (
        <Text size={TextSize.Medium}>{`${entity.score} ${t(
          entity.score === 1 ? "coding_models__detail_score_singular" : "coding_models__detail_score"
        )}`}</Text>
      )
    }
  ]

  return (
    <div className="coding-criterion-common-table" css={customStyles}>
      <TableContainer<T>
        entities={entities}
        entityKey={entity => entity.id}
        showFooter
        customPlaceholder={placeholder}
        onClick={!isReadOnly ? onEntityClick : undefined}
        customStyles={styles.table}
        placeHolderText={t("coding_models__detail_item_criteria_placeholder")}
        customHeaderRowStyles={styles.headerRow}
        columns={columns}
      />
    </div>
  )
}

const styles = {
  headerRow: css({
    padding: spacingSmall
  }),

  columns: {
    trash: css({
      display: "flex",
      justifyContent: "flex-end"
    }),
    selection: css({
      flexGrow: 0,
      flexBasis: 70
    }),
    checkbox: css({
      flexGrow: 0,
      flexBasis: 45
    }),
    header: css({
      display: "flex",
      justifyContent: "center"
    })
  },
  table: css({
    minHeight: 300 + spacingHuger
  }),
  icon: css({
    marginRight: spacingSmall
  })
}
