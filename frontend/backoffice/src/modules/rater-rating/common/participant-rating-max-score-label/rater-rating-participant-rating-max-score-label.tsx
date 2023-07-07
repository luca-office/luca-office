import * as React from "react"
import {Text} from "shared/components"
import {CodingDimension} from "shared/models"
import {textEllipsis, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useProjectModuleMaxScore} from "../../hooks"
import {RatingProjectModule} from "../../models"

export interface RaterRatingParticipantRatingMaxScoreLabelProps {
  readonly ratingProjectModule: RatingProjectModule
  readonly codingDimensions: CodingDimension[]
}

export const RaterRatingParticipantRatingMaxScoreLabel: React.FC<RaterRatingParticipantRatingMaxScoreLabelProps> = ({
  ratingProjectModule,
  codingDimensions
}) => {
  const {t} = useLucaTranslation()
  const {maxScore} = useProjectModuleMaxScore(ratingProjectModule, codingDimensions)
  return (
    <Text customStyles={textEllipsis} size={TextSize.Medium}>
      {maxScore === 1
        ? t("coding_criteria__criterion_list_score_singular", {score: maxScore})
        : t("coding_criteria__criterion_list_score", {score: maxScore})}
    </Text>
  )
}
