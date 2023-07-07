import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem, ContentLoadingIndicator, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {spacing, spacingHeader, spacingLarge, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDate} from "shared/utils"
import {CardDurationInfo, CardOverview, EditingStatusIndicator} from "../../../components"
import {cardOverview} from "../../../styles/common"
import {useScenarioOverview} from "./hooks/use-scenario-overview"

export const ScenarioOverview: React.FC = () => {
  const {t} = useLucaTranslation()
  const {loading, scenarios, navigateToDetails, onCreateClicked, mayFinalizeWithoutPublishing} = useScenarioOverview()

  return (
    <CardOverview
      customStyles={cardOverview}
      entityFilterType="scenarios"
      create={onCreateClicked}
      customSubheaderStyles={styles.subheader}
      userMayFinalizeWithoutPublishing={mayFinalizeWithoutPublishing}
      creationText={t("scenario_create_scenario")}>
      {loading ? (
        <ContentLoadingIndicator />
      ) : (
        scenarios.map(scenario => (
          <OverviewCard
            onClick={() => navigateToDetails(scenario.id)}
            key={scenario.id}
            headerText={scenario.name}
            headerInfo={<CardDurationInfo maxDurationInSeconds={scenario.maxDurationInSeconds} t={t} />}
            text={scenario.description}
            tags={scenario.tags}
            footer={
              <CardFooter customStyles={styles.cardFooter}>
                <CardFooterItem icon={IconName.Calendar} text={formatDate(new Date(scenario.createdAt))} />
                <CardFooterItem
                  icon={IconName.Profile}
                  text={`${scenario.author.firstName} ${scenario.author.lastName} `}
                />
                <EditingStatusIndicator
                  isPublished={!!scenario.publishedAt}
                  isFinalized={!!scenario.finalizedAt}
                  t={t}
                />
              </CardFooter>
            }
          />
        ))
      )}
    </CardOverview>
  )
}

const Sizes = {
  footerStatus: 16
}

const styles = {
  cardFooter: css({
    display: "grid",
    gridTemplateColumns: `1fr 1fr ${Sizes.footerStatus}px`
  }),
  subheader: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 3fr",
    padding: spacing(spacingLarge, spacingHeader, spacingMedium, spacingHeader),
    gap: spacingMedium
  })
}
