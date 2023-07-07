import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {ProjectProgressType} from "../../enums"
import {ModuleProgress, ParticipantProjectProgress} from "../../models"
import {CustomStyle, subHeaderHeight} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {TableContainer} from "../table/table-container"
import {getReportParticipantOverviewTableColumns} from "./report-participant-overview-table.config"

export interface ReportParticipantOverviewTableProps extends CustomStyle {
  readonly customBodyRowStyles?: CSSInterpolation
  readonly surveyProgress: ParticipantProjectProgress
  readonly projectProgressType: ProjectProgressType
  readonly onClick: (moduleProgress: ModuleProgress) => void
  readonly showFinalScore?: boolean
  readonly showProjectModuleCount?: boolean
}

export const ReportParticipantOverviewTable: React.FC<ReportParticipantOverviewTableProps> = ({
  customStyles,
  customBodyRowStyles,
  surveyProgress,
  projectProgressType,
  onClick,
  showFinalScore = false,
  showProjectModuleCount = true
}) => {
  const {t} = useLucaTranslation()

  return (
    <TableContainer<ModuleProgress>
      customStyles={customStyles}
      customHeaderRowStyles={styles.headerRow}
      customBodyRowStyles={customBodyRowStyles}
      onClick={moduleProgress => moduleProgress.status !== undefined && onClick(moduleProgress)}
      entities={surveyProgress.moduleProgress}
      columns={getReportParticipantOverviewTableColumns({
        t,
        entityCount: surveyProgress.moduleProgress.length,
        projectProgress: projectProgressType,
        showFinalScore,
        showProjectModuleCount
      })}
      entityKey={entity => entity.moduleId}
    />
  )
}

const styles = {
  headerRow: css({
    height: subHeaderHeight
  })
}
