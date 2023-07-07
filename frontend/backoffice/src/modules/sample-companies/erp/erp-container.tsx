import {css} from "@emotion/react"
import React from "react"
import {Content, DetailViewHeader, Overlay} from "shared/components"
import {ErpTableType} from "shared/graphql/generated/globalTypes"
import {ErpRowOpeningIntervention} from "shared/models"
import {ErpScenarioSettingsConfig, ErpView} from "shared/office-tools"
import {Flex, headerHeight, spacingMedium, subHeaderHeight} from "shared/styles"
import {Option} from "shared/utils"
import {ErpScenarioSettingsFooter} from "./erp-scenario-settings-footer/erp-scenario-settings-footer"
import {useErpContainer} from "./hooks/use-erp-container"
import {ErpPreview} from "./preview/erp-preview"

export interface ErpContainerProps {
  readonly scenarioId?: UUID
  readonly sampleCompanyId: UUID
  readonly selectedErpNode: Option<UUID>
  readonly selectedEntityId: Option<number>
  readonly disabled?: boolean
}

export const ErpContainer: React.FC<ErpContainerProps> = ({
  scenarioId,
  sampleCompanyId,
  selectedErpNode,
  selectedEntityId,
  disabled
}) => {
  const {
    navigateBack,
    sampleCompany,
    isLoading,
    isPreviewVisible,
    setIsPreviewVisible,
    isReadonly,
    scenarioMaxDurationInSeconds,
    scenario,
    interventions,
    disableInterventionCreation
  } = useErpContainer({sampleCompanyId, scenarioId, disabled})

  const header = (
    <DetailViewHeader
      labelKey={"erp__title_full"}
      navigationButtonConfig={{
        labelKey: "sample_companies__filter_title",
        onClick: navigateBack
      }}
      operationButtonConfig={
        !scenarioId
          ? {
              labelKey: "preview",
              onClick: () => setIsPreviewVisible(true)
            }
          : undefined
      }
    />
  )

  const getInterventionsCount = (rowId: number, erpTableType: ErpTableType) =>
    interventions
      .filter(intervention => intervention.__typename === "ErpRowOpeningIntervention")
      .filter(
        intervention =>
          (intervention as ErpRowOpeningIntervention).erpRowId === rowId &&
          (intervention as ErpRowOpeningIntervention).erpTableType === erpTableType
      ).length

  return (
    <Content
      subHeader={header}
      customStyles={styles.content}
      customContentContainerStyles={styles.contentContainer}
      loading={isLoading}>
      {sampleCompany
        .map(({name}) => (
          <>
            <ErpView
              customStyles={styles.erpView}
              readOnly={isReadonly}
              scenarioId={scenarioId}
              sampleCompanyId={sampleCompanyId}
              sampleCompanyName={name}
              selectedErpNode={selectedErpNode}
              selectedEntityId={selectedEntityId}
              renderDataSetOverlayFooter={scenario
                .map(({id}) => (config: ErpScenarioSettingsConfig) => (
                  <ErpScenarioSettingsFooter
                    type={config.erpType}
                    erpRowId={config.rowId}
                    scenarioMaxDurationInSeconds={scenarioMaxDurationInSeconds}
                    scenarioId={id}
                    sampleCompanyId={sampleCompanyId}
                    scenarioErpSelector={config.scenarioErpSelector}
                    disableInterventionCreation={disableInterventionCreation}
                    interventionsCount={getInterventionsCount(
                      config.rowId,
                      (config.erpType as unknown) as ErpTableType
                    )}
                  />
                ))
                .orUndefined()}
            />
            {isPreviewVisible && (
              <Overlay>
                <ErpPreview
                  onClose={() => setIsPreviewVisible(false)}
                  sampleCompanyId={sampleCompanyId}
                  sampleCompanyName={name}
                  customStyles={styles.preview}
                />
              </Overlay>
            )}
          </>
        ))
        .orNull()}
    </Content>
  )
}

const styles = {
  content: css({
    height: `calc(100vh - ${headerHeight}px)`
  }),
  contentContainer: css(Flex.column, {
    height: `calc(100% - ${subHeaderHeight}px)`,
    boxSizing: "border-box"
  }),
  erpView: css({
    height: `calc(100% - 2 * ${spacingMedium}px - ${subHeaderHeight}px)`,
    margin: 0
  }),
  preview: css({
    width: "90vw",
    height: "90vh"
  })
}
