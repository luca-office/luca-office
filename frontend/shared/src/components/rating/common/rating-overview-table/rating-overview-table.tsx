import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {noop} from "lodash-es"
import * as React from "react"
import {HeadingLevel, IconName} from "../../../../enums"
import {
  CustomStyle,
  FontWeight,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {Option} from "../../../../utils"
import {Table} from "../../../table/table"
import {Heading} from "../../../typography/typography"
import {TableEntity} from "../../models"
import {getRatingOverviewTableColumns} from "./config"

export interface RatingOverviewTableProps<T extends TableEntity> extends CustomStyle {
  readonly entities: T[]
  readonly entityName: string
  readonly scoringName: string
  readonly title: string
  readonly onClick?: (entityId: UUID) => void
  readonly enumerate?: boolean
  readonly iconName?: IconName
  readonly isReadonly: boolean
  readonly isNotRatable: boolean
  readonly showStatusIcons?: boolean
  readonly showAverageScore?: boolean
  readonly customTableWrapperStyles?: CSSInterpolation
}

export const RatingOverviewTable = <T extends TableEntity>({
  customStyles,
  customTableWrapperStyles,
  entities,
  entityName,
  scoringName,
  title,
  onClick,
  enumerate,
  iconName,
  isReadonly,
  isNotRatable,
  showStatusIcons,
  showAverageScore
}: RatingOverviewTableProps<T>) => {
  const {t} = useLucaTranslation()
  const columns = getRatingOverviewTableColumns<T>({
    t,
    title,
    scoringName,
    iconName,
    enumerate,
    isReadonly,
    isNotRatable,
    showStatusIcons,
    showAverageScore
  })

  return (
    <div css={customStyles}>
      <Heading customStyles={styles.heading} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {entityName}
      </Heading>
      <div css={customTableWrapperStyles}>
        <Table<T>
          customHeaderRowStyles={styles.tableHeader}
          customStyles={styles.table}
          onSortIconClicked={noop}
          sortInfo={Option.none()}
          sortedEntities={entities}
          columns={columns}
          entityKey={entity => entity.id}
          onClick={entity => onClick?.(entity.id)}
          showFooter={true}
        />
      </div>
    </div>
  )
}

const styles = {
  heading: css(textEllipsis, {
    marginBottom: spacingTiny
  }),
  tableHeader: css({
    padding: spacing(spacingSmall, spacingMedium)
  }),
  table: {
    overflow: "auto"
  }
}
