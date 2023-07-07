import {css} from "@emotion/react"
import React from "react"
import {ColumnProps, Heading, ProgressBar, TableContainer, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {ParticipantResultBase} from "shared/models"
import {Flex, FontWeight, spacingSmall, TextSize} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {toPercent} from "shared/utils"

interface ReportingParticipantsTableProps<T extends ParticipantResultBase> {
  readonly participantResults: T[]
  readonly averageScore: number | null
  readonly maximumScore: number
  readonly navigateToParticipantOverview: (surveyInvitationId: UUID) => void
}

export const ReportingParticipantsTable = <T extends ParticipantResultBase>({
  participantResults,
  averageScore,
  maximumScore,
  navigateToParticipantOverview
}: ReportingParticipantsTableProps<T>) => {
  const {t} = useLucaTranslation()

  const handleClick = (entity: ParticipantResultBase) => navigateToParticipantOverview(entity.surveyInvitationId)

  const participantsColumns = getParticipantsResultsColumns(t, averageScore ?? 0, maximumScore)

  return (
    <TableContainer<T>
      entities={participantResults}
      entityKey={entity => `${entity.participantName ?? ""} ${entity.score}`}
      columns={participantsColumns}
      customStyles={styles.projectModulesTable}
      onClick={handleClick}
    />
  )
}

export const getParticipantsResultsColumns = (
  t: LucaTFunction,
  averageScore: number,
  maximumScore: number
): ColumnProps<ParticipantResultBase>[] => {
  return [
    {
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("name")}
        </Heading>
      ),
      content: (entity: ParticipantResultBase) => <Text size={TextSize.Medium}>{entity.participantName}</Text>,
      key: "name"
    },
    {
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating__participant_index")}
        </Heading>
      ),
      content: (entity: ParticipantResultBase, index) => {
        return <Text size={TextSize.Medium}>{index ?? 0 + 1}</Text>
      },
      key: "index"
    },
    {
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("reporting_overview_reached_points")}
        </Heading>
      ),
      content: (entity: ParticipantResultBase) => {
        const averageScoreInPercent = toPercent(averageScore, maximumScore)
        const entityScore = toPercent(entity.score ?? 0, maximumScore)

        return (
          <div css={Flex.row}>
            <ProgressBar
              customStyles={styles.progress}
              progressInPercent={entityScore}
              verticalLinePositionInPercent={averageScoreInPercent}
            />
            <Text size={TextSize.Medium}>{`${entity.score ?? 0} ${
              entity.score === 1 ? t("coding_models__detail_score_singular") : t("rating__scoring_unit")
            }`}</Text>
          </div>
        )
      },
      key: "averagePoints"
    }
  ]
}

const styles = {
  progress: css({
    flexGrow: 1,
    marginRight: spacingSmall
  }),
  projectModulesTable: css({
    marginTop: spacingSmall
  })
}
