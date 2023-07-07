import {css} from "@emotion/react"
import * as React from "react"
import {
  Button,
  Column,
  ColumnProps,
  Columns,
  deleteEntityButtonStyles,
  DeleteOrArchiveEntityButton,
  Heading,
  Label,
  TableContainer,
  Text,
  Tooltip
} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {DeleteEntityHook, NavigationConfig} from "shared/models"
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
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {isEmpty, toPercent} from "shared/utils"
import {Route} from "../../../../../routes"
import {useDimensionsTable} from "./hooks/use-dimensions-table"

interface Props extends CustomStyle {
  readonly entities: DimensionTableEntity[]
  readonly labelKey: LucaI18nLangKey
  readonly maximumScore: number
  readonly placeholder?: JSX.Element
  readonly disabled?: boolean
  readonly isItemsTable?: boolean
  readonly onAddClick: () => void
  readonly onSortClick: () => void
  readonly onEntityClick: (id: UUID) => void
  readonly deleteEntityConfig: {
    readonly deleteEntityHook: DeleteEntityHook
    readonly navigateTo: NavigationConfig<Route>
  }
  readonly isReadOnly: boolean
}

export interface DimensionTableEntity {
  readonly id: string
  readonly title: string
  readonly itemsCount?: number
  readonly maxScore: number
  readonly scoringType?: ScoringType
  readonly position?: number
}

export const DimensionsTable: React.FC<Props> = ({
  customStyles,
  entities,
  labelKey,
  maximumScore,
  placeholder,
  disabled,
  isItemsTable,
  onEntityClick,
  onAddClick,
  isReadOnly,
  deleteEntityConfig,
  onSortClick
}) => {
  const {t} = useLucaTranslation()

  const {navigate} = useDimensionsTable()

  const scoringTypeColumn: ColumnProps<DimensionTableEntity> = {
    header: (
      <div css={Flex.row}>
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("coding_models__detail_items_scoring_type")}
        </Heading>
      </div>
    ),
    key: "scoringType",
    content: entity => (
      <Column>
        {entity.scoringType === ScoringType.Analytical
          ? t("coding_models__detail_items_scoring_type_analytic")
          : t("coding_models__detail_items_scoring_type_holistic")}
      </Column>
    )
  }

  const columns: ColumnProps<DimensionTableEntity>[] = [
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("reorder__table_column_title")}
          </Heading>
        </div>
      ),
      key: "title",
      customStyles: {flexGrow: 2},

      content: entity => (
        <Column>
          <Text
            customStyles={[textEllipsis, {cursor: "pointer"}]}
            onClick={() => onEntityClick(entity.id)}
            size={TextSize.Medium}>
            {entity.title}
          </Text>
        </Column>
      )
    },
    isItemsTable
      ? scoringTypeColumn
      : {
          header: (
            <div css={Flex.row}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("coding_models__detail_items_label")}
              </Heading>
            </div>
          ),
          key: "items",
          content: entity => <Column>{entity.itemsCount}</Column>
        },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("coding_models__detail_maximum_score")}
          </Heading>
        </div>
      ),
      key: "score",
      content: entity => {
        const itemScore = entity.maxScore
        return (
          <Column>
            {itemScore} {itemScore > 0 || maximumScore > 0 ? `(${toPercent(itemScore, maximumScore)}%)` : ""}
          </Column>
        )
      }
    },
    {
      header: (
        <div css={[Flex.row, {justifyContent: "flex-end"}]}>
          <Tooltip title={t("scenario_details__header_button_is_finalized")} inactive={!isReadOnly}>
            <Button
              customStyles={{marginRight: spacingSmall}}
              disabled={disabled || isEmpty(entities) || isReadOnly}
              variant={ButtonVariant.IconOnly}
              onClick={onSortClick}
              icon={IconName.Sort}
            />
          </Tooltip>
          <Tooltip title={t("scenario_details__header_button_is_finalized")} inactive={!isReadOnly}>
            <Button
              onClick={onAddClick}
              variant={ButtonVariant.IconOnly}
              disabled={disabled || isReadOnly}
              icon={IconName.Add}
            />
          </Tooltip>
        </div>
      ),
      key: "delete",
      content: entity => (
        <Columns>
          <Column customStyles={styles.columns.trash}>
            <DeleteOrArchiveEntityButton
              customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
              iconColor={fontColorLight}
              disabled={isReadOnly}
              onSuccess={() => navigate(deleteEntityConfig.navigateTo)}
              useDeleteHook={() => deleteEntityConfig.deleteEntityHook}
              entityId={entity.id}
            />
          </Column>
        </Columns>
      )
    }
  ]

  return (
    <div className="dimension-table" css={customStyles}>
      <Label label={`${t(labelKey)} (${entities.length})`} />
      <TableContainer<DimensionTableEntity>
        entities={entities}
        entityKey={entity => entity.id}
        showFooter
        customPlaceholder={placeholder}
        customStyles={styles.table}
        placeHolderText={t("coding_models__detail_table_placeholder")}
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
    trash: css({display: "flex", justifyContent: "flex-end"})
  },
  table: css({
    minHeight: 300 + spacingHuger
  })
}
