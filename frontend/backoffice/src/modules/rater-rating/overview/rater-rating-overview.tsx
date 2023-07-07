import {css} from "@emotion/react"
import * as React from "react"
import {LoadingIndicator} from "shared/components"
import {
  headerHeight,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingTinier,
  spacingTiny
} from "shared/styles"
import {CardOverview} from "../../../components"
import {overviewCardMinWidth, subHeaderHeight} from "../../../styles/common"
import {RaterRatingOverviewPlaceholder, RatersRatingCard} from "../common"
import {useRaterRatingOverview} from "./hooks/use-rater-rating-overview"

export const RaterRatingOverview: React.FC = () => {
  const {dataLoading, surveys, navigateToDetailview, userAccount} = useRaterRatingOverview()
  return (
    <CardOverview
      customSectionStyles={styles.containerWrapper}
      entityFilterType={"ratings"}
      searchPlaceholderKey={"rating__subheader_search_placeholder"}>
      <div css={styles.container(!dataLoading && surveys.length > 0)}>
        {dataLoading ? (
          <LoadingIndicator />
        ) : !surveys.length ? (
          <RaterRatingOverviewPlaceholder />
        ) : (
          surveys.map(survey => (
            <RatersRatingCard
              key={survey.id}
              survey={survey}
              userAccount={userAccount.safeAsSubtype()}
              onClick={navigateToDetailview}
            />
          ))
        )}
      </div>
    </CardOverview>
  )
}

const Spacing = {
  // spacing is composed of header height, sub-header height, sub-header padding top and bottom
  header: headerHeight + subHeaderHeight + spacingLarge + spacingMedium
}

const styles = {
  containerWrapper: css({
    display: "block",
    gridTemplateColumns: "initial",
    gridGap: "initial",
    height: `calc(100vh - ${Spacing.header}px)`,
    boxSizing: "border-box",
    overflow: "hidden"
  }),
  container: (showCards: boolean) =>
    css({
      ...(showCards
        ? {
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${overviewCardMinWidth}px, 1fr))`,
            gridGap: spacingMedium
          }
        : {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }),
      padding: showCards ? spacing(spacingTinier, spacingHuge, spacingTiny, spacingHuge) : spacing(0, spacingHuge),
      width: "100%",
      maxHeight: "100%",
      boxSizing: "border-box",
      overflow: "auto"
    })
}
