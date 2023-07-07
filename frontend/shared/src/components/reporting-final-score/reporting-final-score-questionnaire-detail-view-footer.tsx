import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {round} from "lodash"
import React from "react"
import {spacingSmaller, TextSize} from "../../styles"
import {LucaI18nLangKey, LucaTFunction} from "../../translations"
import {roundNumber, toPercent} from "../../utils"
import {ProgressBar, Text} from ".."

interface DetailViewFooterProps {
  readonly score: number
  readonly maxScore: number
  readonly averageScore: number
  readonly t: LucaTFunction
  readonly showAverageScoreAsProgress: boolean
  readonly customLabelKey?: LucaI18nLangKey
}

export const DetailViewFooter: React.FC<DetailViewFooterProps> = ({
  score,
  maxScore,
  t,
  averageScore,
  showAverageScoreAsProgress,
  customLabelKey
}) => {
  return (
    <React.Fragment>
      <div css={styles.footerText}>
        <Text size={TextSize.Medium}>{t(customLabelKey ?? "rating_scenario__scoring_label")}</Text>
        <Text size={TextSize.Medium}>
          {t("rating__rating__scoring", {
            score: showAverageScoreAsProgress ? roundNumber(averageScore) : score,
            maxScore
          })}
        </Text>
      </div>
      <ProgressBar
        customStyles={styles.footerProgressBar}
        progressInPercent={toPercent(showAverageScoreAsProgress ? averageScore : score, maxScore)}
        verticalLinePositionInPercent={toPercent(averageScore, maxScore)}
        verticalLineTooltipText={t("reporting_scoring__overlay_mean_tooltip", {
          mean: round(averageScore, 2)
        })}
      />
    </React.Fragment>
  )
}
const styles: Record<string, CSSInterpolation> = {
  footerText: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: spacingSmaller
  },
  footerProgressBar: {
    flex: "1 1 auto"
  }
}
