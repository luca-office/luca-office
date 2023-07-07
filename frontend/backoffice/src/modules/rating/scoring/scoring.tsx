import {css} from "@emotion/react"
import * as React from "react"
import {Content} from "shared/components"
import {boxHeightLarge, Children, Flex, headerHeight, spacingMedium, spacingSmall, spacingTiny} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SubHeaderDetailContainer, SubHeaderDetailContainerProps} from "../../../components"
import {Route} from "../../../routes"
import {ScoringFooter} from "./scoring-footer/scoring-footer"
import {useScoring} from "./use-scoring"

export interface ScoringProps extends Children {
  readonly surveyId: UUID
  readonly projectId: UUID
  readonly headerConfig?: Partial<Omit<SubHeaderDetailContainerProps, "customStyles" | "deleteButtonConfig">>
}

export const Scoring: React.FC<ScoringProps> = ({surveyId, projectId, headerConfig, children}) => {
  const {t} = useLucaTranslation()
  const {loading, participantTableEntities, raters, allRatings} = useScoring(surveyId, projectId)

  return (
    <Content
      loading={loading}
      customContentContainerStyles={styles.container}
      subHeader={
        <SubHeaderDetailContainer
          returnTo={{
            text: t("projects__survey_details_header_label"),
            route: Route.SurveyDetail,
            params: {id: projectId, surveyId}
          }}
          title={t("dashboard__progress_scoring_title")}
          {...headerConfig}
        />
      }
      actionBar={
        <ScoringFooter
          surveyId={surveyId}
          raters={raters}
          ratings={allRatings}
          totalCount={participantTableEntities.length}
        />
      }>
      {children}
    </Content>
  )
}

const spacings = {
  // header height - sub-header height (+ padding) - content padding - footer height (+ padding)
  wrapper: 2 * headerHeight + 2 * spacingSmall + 2 * spacingMedium + boxHeightLarge + 2 * spacingTiny
}

export const styles = {
  container: css(Flex.column, {
    overflow: "hidden",
    maxHeight: `calc(100vh - ${spacings.wrapper}px)`
  })
}
