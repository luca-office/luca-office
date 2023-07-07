import {CSSInterpolation} from "@emotion/serialize"
import React from "react"
import {Heading, RatingOverviewTable, Text} from "../../../components"
import {TableEntity} from "../../../components/rating/models"
import {HeadingLevel} from "../../../enums"
import {flex1, spacingMedium, TextSize} from "../../../styles"
import {LucaI18nLangKey, LucaTFunction} from "../../../translations"

interface Props {
  readonly onClick: (id: UUID) => void
  readonly t: LucaTFunction
  readonly entities: TableEntity[]
  readonly entityLabelKey: LucaI18nLangKey
  readonly description: string
  readonly title: string
}

export const CommonDetailView: React.FC<Props> = ({entityLabelKey, onClick, entities, description, title, t}) => {
  return (
    <div css={styles.wrapper}>
      <Heading level={HeadingLevel.h2}>{title}</Heading>
      <Text customStyles={styles.spacingTop} size={TextSize.Medium}>
        {description}
      </Text>
      <RatingOverviewTable
        customStyles={styles.table}
        customTableWrapperStyles={styles.tableWrapper}
        entities={entities}
        onClick={onClick}
        scoringName={t("rating_scenario__scoring_label")}
        entityName={t(entityLabelKey)}
        enumerate={true}
        title={t("title")}
        isReadonly={true}
        isNotRatable={false}
        showStatusIcons={false}
        showAverageScore={false}
      />
    </div>
  )
}

const styles: Record<string, CSSInterpolation> = {
  table: {
    marginTop: spacingMedium,
    display: "flex",
    flexDirection: "column",
    flex: flex1,
    overflow: "auto"
  },
  spacingTop: {
    marginTop: spacingMedium
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column"
  },
  tableWrapper: {
    display: "flex",
    flex: "1 1 0",
    overflow: "auto",
    flexDirection: "column"
  }
}
