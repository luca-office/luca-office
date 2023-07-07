import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {spacingHuge} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {CardDurationInfo, CardOverview, SubHeaderDetailContainer} from "../../../components"
import {Route} from "../../../routes"
import {useCodingModelOverviewHook} from "./hooks/use-coding-models-overview"

interface Props {
  readonly scenarioId: UUID
}

export const CodingModelsOverview: React.FC<Props> = ({scenarioId}) => {
  const {t} = useLucaTranslation()
  const {scenariosWithCodingModel, onCreateClicked, onCodingModelCardClicked} = useCodingModelOverviewHook(scenarioId)

  return (
    <div>
      <SubHeaderDetailContainer
        title={t("coding_models__overview_subheader_title")}
        returnTo={{route: Route.ScenarioDetail, text: t("scenario_details__header_label"), params: {scenarioId}}}
      />
      <CardOverview
        create={onCreateClicked}
        entityFilterType={"scenarioCodingModels"}
        creationText={t("coding_models__create")}
        customStyles={styles.overviewWrapper}>
        {scenariosWithCodingModel.map(scenarioExtendedWithCodingModel => (
          <OverviewCard
            onClick={() => onCodingModelCardClicked(scenarioExtendedWithCodingModel.codingModel)}
            key={scenarioExtendedWithCodingModel.id}
            headerText={scenarioExtendedWithCodingModel.name}
            headerIcon={IconName.Monitor}
            headerInfo={
              <CardDurationInfo maxDurationInSeconds={scenarioExtendedWithCodingModel.maxDurationInSeconds} t={t} />
            }
            text={scenarioExtendedWithCodingModel.description}
            footer={
              <CardFooter customStyles={{justifyContent: "space-between"}}>
                <CardFooterItem
                  icon={IconName.PaperCorrection}
                  text={scenarioExtendedWithCodingModel.codingModel.title}
                />
                <CardFooterItem
                  icon={
                    scenarioExtendedWithCodingModel.finalizedAt !== null ||
                    scenarioExtendedWithCodingModel.publishedAt !== null
                      ? IconName.LockClosed
                      : IconName.EditBordered
                  }
                />
              </CardFooter>
            }
          />
        ))}
      </CardOverview>
    </div>
  )
}

const styles = {
  overviewWrapper: css({
    paddingLeft: spacingHuge,
    paddingRight: spacingHuge
  })
}
