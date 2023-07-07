import * as React from "react"
import {Card, CardContent, CardHeader, LoadingIndicator} from "shared/components"
import {cardDecorativeBorder} from "shared/styles"
import {RatingProgressCard} from "../../../../components"
import {RatersCard} from "../../common"
import {useScoringDashboard} from "./hooks/use-scoring-dashboard"
import {styles} from "./scoring-dashboard.style"
import {ScoringDashboardTable} from "./scoring-dashboard-table/scoring-dashboard-table"

export interface ScoringDashboardProps {
  readonly surveyId: UUID
  readonly projectId: UUID
}

export const ScoringDashboard: React.FC<ScoringDashboardProps> = ({surveyId, projectId}) => {
  const {
    loading,
    navigateToParticipantRating,
    navigateToParticipantProgress,
    participantTableEntities,
    selfInvited,
    selfInvitedRatingFinished,
    isFinalRatingCompleted
  } = useScoringDashboard(surveyId, projectId)

  return (
    <Card hasShadow={true} customStyles={styles.contentCard}>
      <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={cardDecorativeBorder} />
      <CardContent customStyles={styles.cardContent}>
        {loading ? (
          <div css={styles.loadingIndicatorContainer}>
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <div css={styles.contentTop}>
              <RatersCard customStyles={styles.ratersCard} surveyId={surveyId} />
              <RatingProgressCard surveyId={surveyId} />
            </div>
            <ScoringDashboardTable
              customStyles={styles.contentBottom}
              customHeaderStyles={styles.tableHeader}
              customTableStyles={styles.tableContent}
              surveyId={surveyId}
              isFinalRatingCompleted={isFinalRatingCompleted}
              participantTableEntities={participantTableEntities}
              navigateToParticipantRating={navigateToParticipantRating}
              navigateToParticipantProgress={navigateToParticipantProgress}
              selfInvited={selfInvited}
              selfInvitedRatingFinished={selfInvitedRatingFinished}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
