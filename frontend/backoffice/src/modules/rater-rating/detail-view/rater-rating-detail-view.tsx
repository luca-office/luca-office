import {css} from "@emotion/react"
import * as React from "react"
import {DetailViewHeader, LoadingIndicator} from "shared/components"
import {Flex, headerHeight, zIndex1} from "shared/styles"
import {RaterRatingDetailViewContent} from "./detail-view-content/rater-rating-detail-view-content"
import {RaterRatingDetailViewFooter} from "./detail-view-footer/rater-rating-detail-view-footer"
import {useRaterRatingDetailView} from "./hooks/use-rater-rating-detail-view"

export interface RaterRatingDetailViewProps {
  readonly surveyId: UUID
}

export const RaterRatingDetailView: React.FC<RaterRatingDetailViewProps> = ({surveyId}) => {
  const {
    dataLoading,
    ratingPercentage,
    totalEntitiesCount,
    ratedEntitiesCount,
    userAccount,
    navigateToOverview
  } = useRaterRatingDetailView(surveyId)

  return (
    <div css={styles.detailView(dataLoading)}>
      <DetailViewHeader
        customStyles={styles.detailViewHeader}
        labelKey={"rater_rating_details__header_label"}
        navigationButtonConfig={{
          labelKey: "rater_rating_details__header_navigation_label",
          onClick: navigateToOverview
        }}
      />
      {dataLoading ? (
        <div css={styles.loadingIndicatorWrapper}>
          <LoadingIndicator />
        </div>
      ) : (
        userAccount
          .map(({id}) => (
            <React.Fragment>
              <RaterRatingDetailViewContent userAccountId={id} surveyId={surveyId} />
              <RaterRatingDetailViewFooter
                surveyId={surveyId}
                userAccountId={id}
                disabled={dataLoading}
                ratingPercentage={ratingPercentage}
                totalEntitiesCount={totalEntitiesCount}
                ratedEntitiesCount={ratedEntitiesCount}
              />
            </React.Fragment>
          ))
          .orNull()
      )}
    </div>
  )
}

const styles = {
  detailViewHeader: css({
    zIndex: zIndex1
  }),
  detailView: (loading: boolean) =>
    css({
      display: "grid",
      gridTemplateRows: loading
        ? "minmax(min-content, max-content) 1fr"
        : "minmax(min-content, max-content) 1fr minmax(min-content, max-content)",
      height: `calc(100vh - ${headerHeight}px)`
    }),
  loadingIndicatorWrapper: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center"
  })
}
