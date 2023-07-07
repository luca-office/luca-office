import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel} from "../../../../enums"
import {FontWeight, gradientPrimary, spacingSmall, spacingTiny, textEllipsis, TextSize} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {getPercentage} from "../../../../utils"
import {Paper} from "../../../paper/paper"
import {ProgressBarColumn} from "../../../progress-bar-column/progress-bar-column"
import {Heading, Text} from "../../../typography/typography"

export interface EvaluationParticipationBarProps {
  readonly finishedRaters: number
  readonly totalRaters: number
}

export const EvaluationParticipationBar: React.FC<EvaluationParticipationBarProps> = ({
  finishedRaters,
  totalRaters
}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.container}>
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("rating__evaluation_participation_title")}
      </Heading>
      <Paper customStyles={styles.progressBarWrapper}>
        <ProgressBarColumn
          customProgressBarStyles={styles.progressBar}
          barColor={gradientPrimary}
          displayLabel={false}
          displayCompleteIcon={false}
          progressCount={finishedRaters}
          overallCount={totalRaters}
        />
        <Text customStyles={textEllipsis} size={TextSize.Medium}>{`${
          totalRaters === 0 ? t("percentage", {percentage: 0}) : getPercentage(t, finishedRaters, totalRaters)
        } ${t("rating__evaluation_participation_score_label", {finished: finishedRaters, total: totalRaters})}`}</Text>
      </Paper>
    </div>
  )
}

const styles = {
  container: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  progressBarWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  progressBar: css({
    margin: 0
  })
}
