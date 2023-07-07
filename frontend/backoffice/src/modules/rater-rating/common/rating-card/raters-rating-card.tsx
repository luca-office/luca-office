import {css} from "@emotion/react"
import * as React from "react"
import {Card, Tooltip} from "shared/components"
import {Survey, UserAccount} from "shared/models"
import {headerBoxShadow, spacing, spacingMedium, spacingTinier, spacingTiny} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {useRatersRatingCard} from "./hooks/use-raters-rating-card"
import {RatersRatingCardContent} from "./rating-card-content/raters-rating-card-content"
import {RatersRatingCardFooter} from "./rating-card-footer/raters-rating-card-footer"
import {RatersRatingCardHeader} from "./rating-card-header/raters-rating-card-header"

export interface RatersRatingCardProps {
  readonly survey: Survey
  readonly userAccount: Option<UserAccount>
  readonly onClick?: (surveyId: UUID) => void
}

export const RatersRatingCard: React.FC<RatersRatingCardProps> = ({survey, userAccount, onClick}) => {
  const {ratingStatus, ratingPercentage, totalEntitiesCount, ratedEntitiesCount} = useRatersRatingCard(
    survey,
    userAccount
  )

  const {t} = useLucaTranslation()

  return (
    <Card customStyles={styles.card} onClick={onClick ? () => onClick(survey.id) : undefined}>
      <RatersRatingCardHeader title={survey.title} status={ratingStatus} />
      <RatersRatingCardContent customStyles={styles.content} survey={survey} />
      <Tooltip withPortal title={t("rater_rating__status_rating_progress_tooltip")}>
        <RatersRatingCardFooter
          status={ratingStatus}
          ratingPercentage={ratingPercentage}
          totalEntitiesCount={totalEntitiesCount}
          ratedEntitiesCount={ratedEntitiesCount}
        />
      </Tooltip>
    </Card>
  )
}

const styles = {
  card: css({
    cursor: "pointer",

    "&, &:hover": {
      boxShadow: headerBoxShadow
    },
    "&:hover": {
      transform: `translate(0px,-${spacingTinier}px)`
    }
  }),
  content: css({
    margin: spacing(spacingTiny, 0, spacingMedium, 0)
  })
}
