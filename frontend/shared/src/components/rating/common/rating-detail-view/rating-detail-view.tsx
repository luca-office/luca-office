import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {HeadingLevel, IconName} from "../../../../enums"
import {QuestionType} from "../../../../graphql/generated/globalTypes"
import {
  Children,
  CustomStyle,
  Flex,
  flex0,
  flex1,
  iconBackgroundColor,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  textEllipsis,
  TextSize,
  zIndex0
} from "../../../../styles"
import {Card, CardContent} from "../../../card"
import {Icon} from "../../../icon/icon"
import {LoadingIndicator} from "../../../loading-indicator/loading-indicator"
import {Heading, Text} from "../../../typography/typography"
import {RatingDetailFooter, RatingDetailFooterProps} from "../rating-detail-footer/rating-detail-footer"
import {RatingDetailHeader, RatingDetailHeaderProps} from "../rating-detail-header/rating-detail-header"

export interface RatingDetailViewProps extends RatingDetailHeaderProps, RatingDetailFooterProps, CustomStyle, Children {
  readonly customHeaderStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly label: string
  readonly participantFinishedModule: boolean
  readonly description?: string
  readonly backgroundIcon?: IconName
  readonly isRatingInProgress: boolean
  readonly isNotRatable: boolean
  readonly loading?: boolean
  readonly hideParticipantNavigationButtons?: boolean
  readonly showAverageScore?: boolean
  readonly averageScore?: number
  readonly showDataForAllParticipants?: boolean
  readonly questionType?: QuestionType
}

export const RatingDetailView: React.FC<RatingDetailViewProps> = ({
  customStyles,
  customHeaderStyles,
  customFooterStyles,
  label,
  description,
  backgroundIcon,
  navigateToNextParticipant,
  navigateToPreviousParticipant,
  participantIndex,
  participantName,
  participantsCount,
  score,
  maxScore,
  navigateToNextQuestion,
  navigateToPreviousQuestion,
  isOverviewPage,
  requiresScoring,
  participantFinishedModule,
  isRatingInProgress,
  isNotRatable,
  loading = false,
  hideParticipantNavigationButtons,
  showAverageScore,
  averageScore,
  showDataForAllParticipants = false,
  questionType,
  children
}) => (
  <Card customStyles={[styles.card, customStyles]}>
    <RatingDetailHeader
      customStyles={customHeaderStyles}
      navigateToNextParticipant={navigateToNextParticipant}
      navigateToPreviousParticipant={navigateToPreviousParticipant}
      participantIndex={participantIndex}
      participantName={participantName}
      participantsCount={participantsCount}
      hideParticipantNavigationButtons={hideParticipantNavigationButtons}
      showParticipantsCount={!showDataForAllParticipants}
    />
    <CardContent customStyles={styles.contentWrapper(loading)}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <React.Fragment>
          {backgroundIcon !== undefined && (
            <Icon customStyles={styles.backgroundIcon} color={iconBackgroundColor} name={backgroundIcon} />
          )}
          <div css={styles.cardContent}>
            <Heading customStyles={styles.label} level={HeadingLevel.h1}>
              {label}
            </Heading>
            {description !== undefined && (
              <Text customStyles={styles.description} size={TextSize.Medium}>
                {description}
              </Text>
            )}
            <div css={styles.content} className={"rating-content"}>
              {children}
            </div>
          </div>
        </React.Fragment>
      )}
    </CardContent>
    <RatingDetailFooter
      customStyles={customFooterStyles}
      score={score}
      maxScore={maxScore}
      navigateToNextQuestion={navigateToNextQuestion}
      navigateToPreviousQuestion={navigateToPreviousQuestion}
      isOverviewPage={isOverviewPage}
      requiresScoring={requiresScoring}
      participantFinishedModule={participantFinishedModule}
      isRatingInProgress={isRatingInProgress}
      isNotRatable={isNotRatable}
      showAverageScore={showAverageScore}
      averageScore={averageScore}
      questionType={questionType}
    />
  </Card>
)

const Size = {
  backgroundIcon: 129
}

const styles = {
  card: css({
    height: "auto",
    overflow: "auto"
  }),
  contentWrapper: (loading: boolean) =>
    css(Flex.column, {
      position: "relative",
      padding: spacingMedium,
      boxSizing: "border-box",
      overflow: "auto",
      ...(loading && {
        justifyContent: "center",
        alignItems: "center"
      })
    }),
  backgroundIcon: css({
    position: "absolute",
    right: spacingMedium,
    width: Size.backgroundIcon,
    height: Size.backgroundIcon
  }),
  cardContent: css({
    zIndex: zIndex0
  }),
  label: css({
    flex: flex0,
    marginBottom: spacingSmall
  }),
  description: css({
    flex: flex0,
    marginBottom: spacingLarge
  }),
  content: css({
    flex: flex1
  })
}
