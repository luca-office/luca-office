import {css} from "@emotion/react"
import * as React from "react"
import {Heading, ReportParticipantOverviewTable} from "shared/components"
import {HeadingLevel, ProjectProgressType} from "shared/enums"
import {ModuleProgress, ParticipantProjectProgress} from "shared/models"
import {
  cardBottomColor,
  CustomStyle,
  Flex,
  FontWeight,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTinier,
  subHeaderHeight
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {reportingOverviewStyles} from "../reporting-overview.style"

export interface ReportingOverviewRatingTableProps extends CustomStyle {
  readonly participantProjectProgress: Option<ParticipantProjectProgress>
  readonly projectProgress: ProjectProgressType
  readonly maximumScore: number
  readonly participantScore: number
  readonly handleClick: (module: ModuleProgress) => void
}

export const ReportingOverviewRatingTable: React.FC<ReportingOverviewRatingTableProps> = ({
  customStyles,
  participantProjectProgress: participantProjectProgressOption,
  projectProgress,
  maximumScore,
  participantScore,
  handleClick
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[reportingOverviewStyles.dataContentWrapper, customStyles]}>
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("reporting__overview_ratings_title")}
      </Heading>
      {participantProjectProgressOption
        .map(participantProjectProgress => (
          <div css={styles.tableWrapper}>
            <ReportParticipantOverviewTable
              customStyles={styles.table}
              customBodyRowStyles={styles.tableBody}
              surveyProgress={participantProjectProgress}
              projectProgressType={projectProgress}
              onClick={handleClick}
              showFinalScore={true}
              showProjectModuleCount={false}
            />
            <div css={styles.tableFooter}>
              <Heading customStyles={styles.tableFooterItem} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("reporting_participant_overview_total_points_label")}
              </Heading>
              <Heading customStyles={styles.tableFooterItem} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("reporting_participant_overview_total_points", {
                  points: participantScore,
                  maxPoints: maximumScore
                })}
              </Heading>
            </div>
          </div>
        ))
        .orNull()}
    </div>
  )
}

const styles = {
  tableWrapper: css({
    display: "grid",
    gridTemplateRows: "1fr minmax(min-content, max-content)",
    overflow: "hidden"
  }),
  tableFooter: css(Flex.row, {
    justifyContent: "space-between",
    padding: spacing(0, spacingMedium),
    backgroundColor: cardBottomColor,
    height: subHeaderHeight
  }),
  tableFooterItem: css({
    flexBasis: `calc(${100 / 3}% - ${spacingSmall + spacingTinier}px)`
  }),
  table: css({
    overflow: "hidden"
  }),
  tableBody: css({
    overflow: "auto"
  })
}
