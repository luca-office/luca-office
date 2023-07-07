import {css} from "@emotion/react"
import {sortBy} from "lodash"
import * as React from "react"
import {
  Button,
  Column,
  ColumnProps,
  Columns,
  deleteEntityButtonStyles,
  Heading,
  Icon,
  indexToCellName,
  Label,
  OrlyButtonContainer,
  TableContainer,
  Text
} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {Intervention} from "shared/models"
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
import {convertSecondsToMinutes} from "shared/utils"
import {interventionTypeToLanguageKey} from "../../../utils"
import {isRuntimeSurveyIntervention} from "../../../utils/common"

export interface InterventionsTableProps extends CustomStyle {
  readonly entities: Intervention[]
  readonly placeholder?: JSX.Element
  readonly onEntityClick: (entity: Intervention) => void
  readonly onDeleteEntityClick: (intervention: Intervention) => void
  readonly onAddClick?: () => void
  readonly isReadOnly: boolean
}

export const InterventionsTable: React.FC<InterventionsTableProps> = ({
  customStyles,
  entities,
  placeholder,
  onEntityClick,
  onAddClick,
  onDeleteEntityClick,
  isReadOnly
}) => {
  const {t} = useLucaTranslation()

  const columns: ColumnProps<Intervention>[] = [
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("reorder__table_column_title")}
          </Heading>
        </div>
      ),
      key: "title",
      customStyles: styles.titleColumnHeader,
      content: entity => (
        <div css={Flex.row}>
          <Icon customStyles={styles.icon} name={IconName.Pin} />
          <Text customStyles={textEllipsis} size={TextSize.Medium}>
            {entity.title}
          </Text>
        </div>
      )
    },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("interventions__interventions_table_time_offset")}
          </Heading>
        </div>
      ),
      key: "timeOffsetInSeconds",
      content: entity => {
        return (
          <Column>
            <Text size={TextSize.Medium}>
              {isRuntimeSurveyIntervention(entity)
                ? t("interventions__interventions_table_time_offset_after_event")
                : `+ ${convertSecondsToMinutes(entity.timeOffsetInSeconds)} min`}
            </Text>
          </Column>
        )
      }
    },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("interventions__interventions_table_trigger_condition")}
          </Heading>
        </div>
      ),
      key: "triggerCondition",
      customStyles: [styles.titleColumnHeader, textEllipsis],
      content: entity => {
        return (
          <Column flexGrow={3}>
            <Text customStyles={textEllipsis} size={TextSize.Medium}>
              {t(
                interventionTypeToLanguageKey(
                  entity.interventionType,
                  entity.__typename === "SpreadsheetCellContentIntervention" ||
                    entity.__typename === "RuntimeSurveyAnswerSelectionIntervention"
                    ? entity.isNegated
                    : undefined
                ),
                entity.__typename === "SpreadsheetCellContentIntervention"
                  ? {
                      cellName: indexToCellName({
                        columnIndex: entity.spreadsheetColumnIndex,
                        rowIndex: entity.spreadsheetRowIndex
                      })
                    }
                  : undefined
              )}
            </Text>
          </Column>
        )
      }
    },
    {
      header: (
        <div css={styles.addRow}>
          {onAddClick && <Button variant={ButtonVariant.IconOnly} onClick={onAddClick} icon={IconName.Add} />}
        </div>
      ),
      key: "delete",
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
              modalTitleKey="interventions__interventions_detail_delete_modal_title"
              modalTextKey="interventions__interventions_detail_delete_modal_description"
            />
          </Column>
        </Columns>
      )
    }
  ]

  const sortedInterventions = sortBy(entities, intervention =>
    intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention"
      ? intervention.timeOffsetInSeconds
      : intervention.title
  )

  return (
    <div className="dimension-table" css={customStyles}>
      <Label label={t("interventions__detail_view_header_label")} />
      <TableContainer<Intervention>
        entities={sortedInterventions}
        entityKey={entity => entity.id}
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
    flexGrow: 3
  }),
  addButton: css(Flex.row, {
    justifyContent: "flex-end"
  }),
  modal: css({
    minHeight: "15vh"
  })
}
