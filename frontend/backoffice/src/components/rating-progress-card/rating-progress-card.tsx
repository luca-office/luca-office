import {css} from "@emotion/react"
import * as React from "react"
import {Heading} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {CSSInterpolation} from "@emotion/serialize"
import {
  backgroundColorBright,
  borderRadius,
  CustomStyle,
  FontWeight,
  insetShadow,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {ratingOverviewSizes} from "../../modules/rating/scoring/dashboard/scoring-dashboard.style"
import {getRatingProgressData} from "../../utils"
import {DonutChartWithLegend} from "../index"
import {useRatingProgressCard} from "./hooks/use-rating-progress-card"

export interface RatingProgressCardProps extends CustomStyle {
  readonly customChartStyles?: CSSInterpolation
  readonly surveyId: UUID
  readonly headerKey?: LucaI18nLangKey
  readonly showHeader?: boolean
  readonly legendLabelKey?: LucaI18nLangKey
  readonly inProgressCaptionKey?: LucaI18nLangKey
  readonly finishedCaptionKey?: LucaI18nLangKey
}

export const RatingProgressCard: React.FC<RatingProgressCardProps> = ({
  customStyles,
  customChartStyles,
  surveyId,
  headerKey = "rating_overview__rating_progress" as LucaI18nLangKey,
  showHeader = true,
  legendLabelKey = "rating__chart_title" as LucaI18nLangKey,
  inProgressCaptionKey,
  finishedCaptionKey
}) => {
  const {t} = useLucaTranslation()

  const {ratersInProgressCount, finishedRatersCount} = useRatingProgressCard(surveyId)

  return (
    <div css={[styles.container(showHeader), customStyles]}>
      {showHeader && (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t(headerKey)}
        </Heading>
      )}
      <DonutChartWithLegend
        customStyles={[styles.donutChart, customChartStyles]}
        customLegendEntryStyles={styles.chartLegend}
        customLegendMarkerStyles={styles.chartLegendMarker}
        legendLabel={t(legendLabelKey)}
        data={getRatingProgressData({
          t,
          ongoingCount: ratersInProgressCount,
          finishedCount: finishedRatersCount,
          ongoingCaptionKey: inProgressCaptionKey,
          finishedCaptionKey
        })}
        chartIcon={IconName.PaperCorrection}
      />
    </div>
  )
}

const Size = {
  marker: 16
}

const styles = {
  container: (showHeader: boolean) =>
    css({
      display: "grid",
      gridTemplateRows: showHeader ? "minmax(min-content, max-content) 1fr" : "1fr",
      gridRowGap: spacingTiny
    }),
  donutChart: css({
    backgroundColor: backgroundColorBright,
    boxShadow: insetShadow,
    borderRadius: borderRadius,
    padding: spacingMedium,
    height: ratingOverviewSizes.topContentHeight,
    boxSizing: "border-box"
  }),
  chartLegend: css({
    gridTemplateColumns: "minmax(min-content, max-content) 1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall
  }),
  chartLegendMarker: css({
    width: Size.marker,
    height: Size.marker
  })
}
