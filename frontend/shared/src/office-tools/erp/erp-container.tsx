import {css} from "@emotion/react"
import React from "react"
import {OfficeWindow} from "../../components"
import {ViewerToolsType} from "../../enums"
import {ErpSurveyEvents} from "../../models"
import {CustomStyle, Flex} from "../../styles"
import {Option} from "../../utils"
import {ErpView} from "."

export interface ErpContainerProps extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize: () => void
  readonly sampleCompanyId: Option<UUID>
  readonly sampleCompanyName: Option<string>
  readonly scenarioId: UUID
  readonly useSurveyEvents: () => ErpSurveyEvents
}

export const ErpContainer: React.FC<ErpContainerProps> = ({
  sampleCompanyId,
  sampleCompanyName,
  onClose,
  onMinimize,
  customStyles,
  scenarioId,
  useSurveyEvents
}) => {
  const surveyEvents = useSurveyEvents()

  return (
    <OfficeWindow
      toolType={ViewerToolsType.Erp}
      onClose={onClose}
      onMinimize={onMinimize}
      customStyles={[styles.window, customStyles]}>
      {sampleCompanyId
        .flatMap(id =>
          sampleCompanyName.map(name => (
            <ErpView
              selectedEntityId={Option.none()}
              selectedErpNode={Option.none()}
              readOnly={true}
              sampleCompanyName={name}
              scenarioId={scenarioId}
              sampleCompanyId={id}
              surveyEvents={surveyEvents}
            />
          ))
        )
        .orNull()}
    </OfficeWindow>
  )
}

const styles = {
  window: css(Flex.column, {justifyContent: "space-between"})
}
