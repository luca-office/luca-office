import {css} from "@emotion/react"
import * as React from "react"
import {ButtonVariant, IconName} from "../../../../enums"
import {QuestionType} from "../../../../graphql/generated/globalTypes"
import {
  boxHeightMediumLarge,
  CustomStyle,
  Flex,
  flex1,
  fontColor,
  fontColorLight,
  primaryColor,
  spacingMedium,
  spacingSmall,
  spacingSmaller,
  textEllipsis,
  TextSize
} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {roundNumber} from "../../../../utils"
import {Button} from "../../../button/button"
import {CardFooter} from "../../../card"
import {Icon} from "../../../icon/icon"
import {ProgressBar} from "../../../progress-bar/progress-bar"
import {Text} from "../../../typography/typography"

export interface RatingDetailFooterProps extends CustomStyle {
  readonly score: number
  readonly maxScore: number
  readonly participantFinishedModule: boolean
  readonly navigateToNextQuestion?: () => void
  readonly navigateToPreviousQuestion?: () => void
  readonly isOverviewPage?: boolean
  readonly requiresScoring?: boolean
  readonly isRatingInProgress: boolean
  readonly isNotRatable: boolean
  readonly showAverageScore?: boolean
  readonly averageScore?: number
  readonly questionType?: QuestionType
}

export const RatingDetailFooter: React.FunctionComponent<RatingDetailFooterProps> = ({
  customStyles,
  score,
  maxScore,
  participantFinishedModule,
  navigateToNextQuestion,
  navigateToPreviousQuestion,
  isOverviewPage = false,
  requiresScoring = false,
  isRatingInProgress,
  isNotRatable,
  showAverageScore,
  averageScore,
  questionType
}) => {
  const {t} = useLucaTranslation()

  const isManuallyRated = questionType === QuestionType.FreeText || questionType === undefined

  const scoreInPercent = roundNumber((score / maxScore) * 100)

  const averageScoreInPercent = averageScore !== undefined ? roundNumber((averageScore / maxScore) * 100) : 0
  return (
    <CardFooter customStyles={[styles.wrapper, customStyles]}>
      <div css={styles.infoContainer}>
        <div css={styles.infoContentContainer}>
          <Text size={TextSize.Medium}>
            {t(
              isOverviewPage
                ? "rating__rating__rating_global_score"
                : isManuallyRated
                ? "rating__rating__rating_score"
                : "rating__rating__rating_global_score_automatic"
            )}
          </Text>

          <div css={styles.scoringWrapper(true)}>
            <Text
              customStyles={[
                textEllipsis,
                isNotRatable ? styles.disabledColor : undefined,
                participantFinishedModule && requiresScoring ? styles.scoringResult : undefined
              ]}
              size={TextSize.Medium}>
              {t("rating__rating__scoring", {
                score,
                maxScore
              })}
            </Text>

            <Icon
              color={isNotRatable ? fontColorLight : requiresScoring ? primaryColor : fontColor}
              name={isNotRatable ? IconName.InProgressCheck : isRatingInProgress ? IconName.Sandglass : IconName.Check}
            />
          </div>
        </div>
        <ProgressBar
          progressInPercent={scoreInPercent}
          progressBarColor={primaryColor}
          {...{
            ...(showAverageScore && {
              verticalLinePositionInPercent: averageScoreInPercent,
              verticalLineTooltipText: t("reporting_scoring__overlay_mean_tooltip", {
                mean: t("common_number", {number: averageScore ?? 0})
              })
            })
          }}
        />
      </div>
      <div css={styles.buttons}>
        <Button
          onClick={navigateToPreviousQuestion}
          icon={IconName.TriangleUpLined}
          variant={ButtonVariant.IconOnly}
          disabled={!navigateToPreviousQuestion}
        />
        <Button
          onClick={navigateToNextQuestion}
          icon={IconName.TriangleDownLined}
          variant={ButtonVariant.IconOnly}
          disabled={!navigateToNextQuestion}
        />
      </div>
    </CardFooter>
  )
}

const styles = {
  disabledColor: css({
    color: fontColorLight
  }),
  wrapper: css(Flex.row, {
    justifyContent: "center",
    height: boxHeightMediumLarge,
    boxSizing: "border-box",

    // this is necessary to overwrite the default styling
    "> *:not(:last-child)": {
      marginRight: spacingMedium
    }
  }),
  infoContainer: css(Flex.column, {
    width: "100%"
  }),
  infoContentContainer: css(Flex.row, {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: spacingSmaller
  }),
  scoringWrapper: (showStatusIcon: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: showStatusIcon ? "minmax(0, max-content) minmax(min-content, max-content)" : "1fr",
      gridColumnGap: spacingSmall,
      alignItems: "center"
    }),
  scoringResult: css({
    color: primaryColor
  }),
  buttons: css({
    marginLeft: "auto",
    display: "grid",
    gridColumnGap: spacingSmall,
    gridTemplateColumns: "1fr 1fr"
  }),
  noRatingWrapper: css(Flex.row, {
    justifyContent: "flex-end",
    flex: flex1
  })
}
