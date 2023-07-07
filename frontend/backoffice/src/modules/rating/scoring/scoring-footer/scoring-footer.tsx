import * as React from "react"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {Rating, UserAccount} from "shared/models"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {RatingActionButton} from "../../common"
import {styles} from "../dashboard/scoring-dashboard.style"
import {useScoringFooter} from "./hooks/use-scoring-footer"

export interface ScoringFooterProps {
  readonly surveyId: UUID
  readonly raters: UserAccount[]
  readonly ratings: Rating[]
  readonly totalCount: number
}

export const ScoringFooter: React.FC<ScoringFooterProps> = ({surveyId, raters, ratings, totalCount}) => {
  const {t} = useLucaTranslation()

  const {participantsFullyRatedCount, completedRatingsCount} = useScoringFooter(raters, ratings, surveyId)
  return (
    <div css={styles.footer}>
      <div css={[styles.footerTextContainer, styles.withMargin]}>
        <Icon customStyles={styles.footerIcon} name={IconName.PaperCorrection} />
        <Text size={TextSize.Medium}>
          {t("rating__completed_label", {
            count: completedRatingsCount,
            totalCount: raters.length
          })}
        </Text>
      </div>
      <div css={[styles.footerTextContainer, styles.growing]}>
        <div css={Flex.row}>
          <Icon customStyles={styles.footerIcon} name={IconName.PaperComplete} />
          <Text size={TextSize.Medium}>
            {t("rating__finalized_label", {
              count: participantsFullyRatedCount,
              totalCount
            })}
          </Text>
        </div>
        <RatingActionButton surveyId={surveyId} />
      </div>
    </div>
  )
}
