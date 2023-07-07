import * as React from "react"
import {Card, CardContent, CardFooter, Heading, Text} from "shared/components"
import {HeadingLevel, ProjectProgressType} from "shared/enums"
import {ModuleProgress, ParticipantProjectProgress, SurveyLight} from "shared/models"
import {TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {reportingOverviewStyles as styles} from "./reporting-overview.style"
import {ReportingOverviewCardHeader} from "./reporting-overview-card-header/reporting-overview-card-header"
import {ReportingOverviewMetadata} from "./reporting-overview-metadata/reporting-overview-metadata"
import {ReportingOverviewRatingTable} from "./reporting-overview-rating-table/reporting-overview-rating-table"

export interface ReportingOverviewProps {
  readonly survey: Option<SurveyLight>
  readonly participantName: Option<string>
  readonly averageScore: number
  readonly maximumScore: number
  readonly participantScore: number
  readonly participantProjectProgress: Option<ParticipantProjectProgress>
  readonly projectProgress: ProjectProgressType
  readonly onTableEntityClick: (module: ModuleProgress) => void
}

export const ReportingOverview: React.FC<ReportingOverviewProps> = ({
  survey: surveyOption,
  participantName: participantNameOption,
  averageScore,
  maximumScore,
  participantScore,
  participantProjectProgress: participantProjectProgressOption,
  projectProgress,
  onTableEntityClick
}) => {
  const {t} = useLucaTranslation()

  return surveyOption
    .map(survey => (
      <Card css={styles.card}>
        <ReportingOverviewCardHeader participantName={participantNameOption} />
        <CardContent customStyles={styles.cardContent}>
          <Heading level={HeadingLevel.h1}>{survey.title}</Heading>
          <Text size={TextSize.Medium}>{survey.description}</Text>
          <ReportingOverviewMetadata
            customStyles={styles.metadata}
            averageScore={averageScore}
            maximumScore={maximumScore}
            participantScore={participantScore}
          />
          <ReportingOverviewRatingTable
            customStyles={styles.rating}
            participantProjectProgress={participantProjectProgressOption}
            projectProgress={projectProgress}
            maximumScore={maximumScore}
            handleClick={onTableEntityClick}
            participantScore={participantScore}
          />
        </CardContent>
        <CardFooter customStyles={styles.cardFooter} />
      </Card>
    ))
    .getOrElse(
      <div css={styles.placeholder}>
        <Text customStyles={styles.placeholderLabel} size={TextSize.Medium}>
          {t("reporting__overview_no_data_placeholder")}
        </Text>
      </div>
    )
}
