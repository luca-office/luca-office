import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../../../../enums"
import {QuestionScoringType} from "../../../../../graphql/generated/globalTypes"
import {flex0, fontColorLight, primaryColor, spacingSmall, textEllipsis, TextSize} from "../../../../../styles"
import {LucaTFunction} from "../../../../../translations"
import {roundNumber} from "../../../../../utils"
import {Icon} from "../../../../icon/icon"
import {ColumnProps} from "../../../../table/table"
import {Text} from "../../../../typography/typography"
import {TableEntity} from "../../../models"

interface GetRatingOverviewTableColumnsParams {
  readonly t: LucaTFunction
  readonly title: string
  readonly scoringName: string
  readonly iconName?: IconName
  readonly enumerate?: boolean
  readonly isReadonly: boolean
  readonly isNotRatable: boolean
  readonly showStatusIcons?: boolean
  readonly showAverageScore?: boolean
}

export const getRatingOverviewTableColumns = <T extends TableEntity>({
  t,
  title,
  scoringName,
  iconName,
  enumerate,
  isReadonly,
  isNotRatable,
  showStatusIcons = true,
  showAverageScore = false
}: GetRatingOverviewTableColumnsParams): ColumnProps<T>[] => [
  {
    key: "title",
    header: (
      <div css={styles.titleContent}>
        {iconName && <Icon name={iconName} />}
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {title}
        </Text>
      </div>
    ),
    content: (entity, index) => (
      <div css={styles.titleContent}>
        {entity.iconName && <Icon name={entity.iconName} />}
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {`${index !== undefined && enumerate ? `${index + 1}. ` : ""}${entity.title}`}
        </Text>
      </div>
    )
  },
  {
    key: "score",
    header: (
      <Text customStyles={textEllipsis} size={TextSize.Medium}>
        {scoringName}
      </Text>
    ),
    content: entity => {
      const requiresScoring = !entity.rated
      const isEmpty = entity.isEmptyDimension ?? false
      return (
        <div css={styles.scoreContent(showStatusIcons)}>
          <Text customStyles={styles.scoreLabel(requiresScoring, isReadonly)} size={TextSize.Medium}>
            {entity.scoringType === QuestionScoringType.None
              ? t("rater_rating_details__project_module_no_rating")
              : t("rating__rating__scoring", {
                  score: showAverageScore ? roundNumber(entity.averageScore) : !isNotRatable ? entity.score : 0,
                  maxScore: entity.maxScore
                })}
          </Text>
          {showStatusIcons && entity.scoringType !== QuestionScoringType.None && (
            <Icon
              name={!isNotRatable && (!requiresScoring || isEmpty) ? IconName.Check : IconName.ProgressCheck}
              color={isReadonly || isNotRatable || !requiresScoring ? fontColorLight : primaryColor}
            />
          )}
        </div>
      )
    },
    customStyles: styles.scoreColumn
  }
]

const styles = {
  titleContent: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  scoreContent: (showStatusIcons: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: showStatusIcons ? "1fr minmax(min-content, max-content)" : "1fr",
      gridColumnGap: spacingSmall,
      alignItems: "center"
    }),
  scoreLabel: (requiresScoring: boolean, isReadonly: boolean) =>
    css(textEllipsis, {
      color: !requiresScoring || isReadonly ? fontColorLight : primaryColor
    }),
  scoreColumn: css({
    flex: flex0
  })
}
