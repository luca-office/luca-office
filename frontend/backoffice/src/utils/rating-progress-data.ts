import {Data} from "react-minimal-pie-chart/types/commonTypes"
import {chartCompleteColor, chartIncompleteColor} from "shared/styles"
import {LucaI18nLangKey, LucaTFunction} from "shared/translations"

interface GetRatingProgressDataParams {
  readonly t: LucaTFunction
  readonly ongoingCount: number
  readonly finishedCount: number
  readonly ongoingCaptionKey?: LucaI18nLangKey
  readonly finishedCaptionKey?: LucaI18nLangKey
}

export const getRatingProgressData = ({
  t,
  ongoingCount,
  finishedCount,
  ongoingCaptionKey = "dashboard__progress_chart_rating_ongoing" as LucaI18nLangKey,
  finishedCaptionKey = "dashboard__progress_chart_rating_finished" as LucaI18nLangKey
}: GetRatingProgressDataParams): Data => [
  {
    color: chartIncompleteColor,
    key: "ongoing",
    title: t(ongoingCaptionKey),
    value: ongoingCount
  },
  {
    color: chartCompleteColor,
    key: "finished",
    title: t(finishedCaptionKey),
    value: finishedCount
  }
]
