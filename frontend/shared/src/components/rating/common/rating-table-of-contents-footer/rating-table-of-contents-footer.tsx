import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../../../enums"
import {Flex, spacingSmall, textEllipsis, TextSize} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {Icon} from "../../../icon/icon"
import {Text} from "../../../typography/typography"

export interface RatingTableOfContentsFooterProps {
  readonly allRated: boolean
  readonly score: number
  readonly maxScore: number
  readonly averageScore?: number
  readonly showAverageScore?: boolean
}

export const RatingTableOfContentsFooter: React.FC<RatingTableOfContentsFooterProps> = ({
  allRated,
  score,
  maxScore,
  averageScore = 0,
  showAverageScore = false
}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.content}>
      <Text customStyles={textEllipsis} size={TextSize.Medium}>{`${
        showAverageScore ? t("rating__average_score_achieved") : t("rating__total_score_achieved")
      }:`}</Text>
      <div css={styles.countWrapper(showAverageScore)}>
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {t("rating__rating__scoring", {
            score: t("common_number", {number: showAverageScore ? averageScore : score}),
            maxScore
          })}
        </Text>
        {!showAverageScore && <Icon name={allRated ? IconName.Check : IconName.Sandglass} />}
      </div>
    </div>
  )
}

const styles = {
  content: css(Flex.row, {
    justifyContent: "space-between"
  }),
  countWrapper: (showAverageScore: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: showAverageScore ? "1fr" : "minmax(0, max-content) minmax(min-content, max-content)",
      gridColumnGap: spacingSmall,
      alignItems: "center",
      marginLeft: spacingSmall
    })
}
