import {css} from "@emotion/react"
import {groupBy} from "lodash"
import * as React from "react"
import {
  Column,
  ColumnProps,
  Columns,
  deleteEntityButtonStyles,
  Heading,
  Label,
  OrlyButtonContainer,
  TableContainer,
  Text
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {ErpRowOpeningIntervention} from "shared/models"
import {
  CustomStyle,
  Flex,
  fontColorLight,
  FontWeight,
  spacingHuger,
  spacingSmall,
  textEllipsis,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface ErpDatasetsTableProps extends CustomStyle {
  readonly interventions: ErpRowOpeningIntervention[]
  readonly placeholder?: JSX.Element
  readonly onEntityClick: (entity: ErpDatasetTableEntity) => void
  readonly onDeleteEntityClick: (entity: ErpDatasetTableEntity) => void
  readonly isReadOnly: boolean
}

interface ErpDatasetTableEntity {
  readonly rowId: number
  readonly interventionsCount: number
}

export const ErpDatasetsTable: React.FC<ErpDatasetsTableProps> = ({
  customStyles,
  interventions,
  placeholder,
  onEntityClick,
  onDeleteEntityClick,
  isReadOnly
}) => {
  const {t} = useLucaTranslation()

  const groupedInterventions = groupBy(interventions, intervention => intervention.erpRowId)

  const columns: ColumnProps<ErpDatasetTableEntity>[] = [
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("interventions__interventions_erp_datasets_table_primary_key")}
          </Heading>
        </div>
      ),
      key: "title",
      customStyles: styles.titleColumnHeader,
      content: entity => (
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {entity.rowId}
        </Text>
      )
    },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("interventions__detail_view_header_label")}
          </Heading>
        </div>
      ),
      key: "interventions",
      customStyles: styles.titleColumnHeader,
      content: entity => (
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {interventions.filter(intervention => intervention.erpRowId === entity.rowId).length}
        </Text>
      )
    },
    {
      header: <div></div>,
      key: "delete",
      customStyles: styles.deleteRow,
      content: entity => (
        <Columns>
          <Column customStyles={styles.columns.trash}>
            <OrlyButtonContainer
              customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
              customModalStyles={styles.modal}
              iconColor={fontColorLight}
              stopEventPropagation={true}
              stopEventPropagationOnOverlayClick={true}
              iconName={IconName.Trash}
              disabled={isReadOnly}
              onConfirm={() => onDeleteEntityClick(entity)}
              modalTitleKey="interventions__interventions_detail_delete_modal_erp_dataset_title"
              modalTextKey="interventions__interventions_detail_delete_position_modal_description"
            />
          </Column>
        </Columns>
      )
    }
  ]

  return (
    <div className="dimension-table" css={customStyles}>
      <Label label={t("interventions__detail_view_table_of_contents_title_erp")} />
      <TableContainer
        entities={Object.keys(groupedInterventions).map(rowId => ({
          interventionsCount: groupedInterventions[rowId].length,
          rowId: parseInt(rowId)
        }))}
        entityKey={entity => entity.rowId}
        showFooter
        customPlaceholder={placeholder}
        onClick={onEntityClick}
        customStyles={styles.table}
        placeHolderText={t("interventions__interventions_table_time_placeholder")}
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
  addRow: css([
    Flex.row,
    {
      justifyContent: "flex-end"
    }
  ]),
  deleteRow: css({
    flexGrow: 1
  }),
  columns: {
    trash: css({
      display: "flex",
      justifyContent: "flex-end"
    })
  },
  table: css({
    minHeight: 300 + spacingHuger
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  titleColumnHeader: css({
    flexGrow: 2
  }),
  addButton: css(Flex.row, {
    justifyContent: "flex-end"
  }),
  modal: css({
    minHeight: "15vh"
  })
}
