import {css} from "@emotion/react"
import * as React from "react"
import {TableContainer} from "shared/components"
import {SurveyInvitationLight} from "shared/models"
import {spacingSmall} from "shared/styles"
import {IndexedSurveyInvitation, RatingProjectModule} from "../../../../models"
import {useRaterRatingParticipantTable} from "./hooks/use-rater-rating-participant-table"

export interface RaterRatingParticipantTableProps {
  readonly surveyInvitations: SurveyInvitationLight[]
  readonly ratingProjectModules: RatingProjectModule[]
}

export const RaterRatingParticipantTable: React.FC<RaterRatingParticipantTableProps> = ({
  surveyInvitations,
  ratingProjectModules
}) => {
  const {indexedSurveyInvitations, columns, navigateToParticipantRatingOverview} = useRaterRatingParticipantTable({
    surveyInvitations,
    ratingProjectModules
  })
  return (
    <TableContainer<IndexedSurveyInvitation>
      customHeaderRowStyles={styles.headerRow}
      entities={indexedSurveyInvitations}
      columns={columns}
      entityKey={({id}) => id}
      onClick={navigateToParticipantRatingOverview}
    />
  )
}

const styles = {
  headerRow: css({
    padding: spacingSmall
  })
}
