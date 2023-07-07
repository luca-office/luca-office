import {css} from "@emotion/react"
import * as React from "react"
import {Button, Heading, Label, OverviewCard, Text} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {boxSize, CustomStyle, Flex, FontWeight, spacingMedium, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface ResultsCardProps extends CustomStyle {
  readonly navigateToScoring: () => void
  readonly showScoringOverlay: () => void
  readonly maxScore?: number
  readonly finalScore?: number
  readonly disableFinalScoreButton: boolean
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  navigateToScoring,
  showScoringOverlay,
  finalScore,
  maxScore,
  disableFinalScoreButton,
  customStyles
}) => {
  const {t} = useLucaTranslation()

  return (
    <OverviewCard
      customStyles={customStyles}
      headerIcon={IconName.PaperComplete}
      noAnimationOnHover={true}
      footer={
        <div css={styles.finalScoreWrapper}>
          <div>
            <Label label={t("reporting_overview_reached_points")} />
            <Text size={TextSize.Medium}>
              {finalScore !== undefined && maxScore !== undefined
                ? `${finalScore} ${t("common_of")} ${maxScore} ${t("rating__scoring_unit")}`
                : t("reporting_overview_final_score_not_set")}
            </Text>
          </div>
          {finalScore !== undefined ? (
            <Heading
              customStyles={styles.resultFooterButton}
              fontWeight={FontWeight.Bold}
              level={HeadingLevel.h3}
              onClick={showScoringOverlay}
              color="primary">
              {t("show_button")}
            </Heading>
          ) : (
            <Button
              variant={ButtonVariant.IconOnly}
              icon={IconName.PaperComplete}
              onClick={navigateToScoring}
              customStyles={styles.button}
              disabled={disableFinalScoreButton}
            />
          )}
        </div>
      }
      text={t("reporting_overview_detail_view_final_score_description")}
      headerText={t("reporting_overview_detail_view_final_score")}
    />
  )
}
const styles = {
  finalScoreWrapper: css(Flex.row, {
    padding: spacingMedium,
    paddingTop: 0,
    justifyContent: "space-between"
  }),
  resultFooterButton: css({
    padding: spacingMedium,
    textAlign: "right"
  }),
  button: css({
    height: boxSize,
    width: boxSize
  })
}
