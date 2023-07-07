import {css} from "@emotion/react"
import React from "react"
import {Icon, ProgressBar, ReadonlyActionField, Text} from "../../components"
import {IconName} from "../../enums"
import {CompletedParticipantCount} from "../../models"
import {
  backgroundColorLight,
  borderRadius,
  CustomStyle,
  Flex,
  insetShadow,
  spacing,
  spacingMedium,
  spacingSmall,
  TextSize
} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {roundNumber, toPercent} from "../../utils"

interface Props extends CustomStyle {
  readonly finishedModulesCount?: number
  readonly allProjectModulesCount?: number
  readonly averageScore: number | null
  readonly maximumScore: number
  readonly completedParticipantsCount: CompletedParticipantCount
  readonly singleParticipantScore?: number
  readonly customParticipantScoreTextKey?: LucaI18nLangKey
}

export const ReportingProgressInfo: React.FC<Props> = ({
  finishedModulesCount,
  allProjectModulesCount,
  maximumScore,
  averageScore,
  singleParticipantScore,
  completedParticipantsCount,
  customParticipantScoreTextKey,
  customStyles
}) => {
  const {t} = useLucaTranslation()

  const averageScoreInPercent = toPercent(averageScore ?? 0, maximumScore)
  const participantScoreInPercent = toPercent(singleParticipantScore ?? 0, maximumScore)

  const overviewInfoColumns = (
    <div css={styles.grid}>
      {finishedModulesCount !== undefined && (
        <ReadonlyActionField
          label={t("dashboard__progress_reports_finished_modules")}
          renderValue={() => (
            <div css={styles.finishedModules}>
              <Text size={TextSize.Medium}>{`${finishedModulesCount} ${t(
                "common_of"
              )} ${allProjectModulesCount}`}</Text>
              {finishedModulesCount === allProjectModulesCount && <Icon name={IconName.Check} />}
            </div>
          )}
        />
      )}
      {singleParticipantScore === undefined && (
        <ReadonlyActionField
          label={t("dashboard__rating_attendees_finalized")}
          renderValue={() => (
            <div css={styles.finishedModules}>
              <Text size={TextSize.Medium}>
                {t("rating__finalized_label_short", {
                  count: completedParticipantsCount.numCompletedParticipants,
                  totalCount: completedParticipantsCount.totalParticipants
                })}
              </Text>
              <Icon name={IconName.Check} />
            </div>
          )}
        />
      )}
      <ReadonlyActionField
        label={t("reporting_overview_maximum_points")}
        renderValue={() => (
          <Text size={TextSize.Medium}>{`${maximumScore} ${
            maximumScore === 1 ? t("coding_models__detail_score_singular") : t("rating__scoring_unit")
          }`}</Text>
        )}
      />
      <ReadonlyActionField
        label={t("dashboard__progress_reports_survey_average")}
        renderValue={() => (
          <Text customStyles={styles.surveyAverage} size={TextSize.Medium}>{`${roundNumber(averageScore ?? 0)} ${
            averageScore === 1 ? t("coding_models__detail_score_singular") : t("rating__scoring_unit")
          }`}</Text>
        )}
      />
      {finishedModulesCount === undefined && <div />}
      {singleParticipantScore !== undefined && (
        <ReadonlyActionField
          label={t(customParticipantScoreTextKey ?? "dashboard__progress_reports_attendee_score")}
          renderValue={() => (
            <Text size={TextSize.Medium}>{`${singleParticipantScore} ${t("rating__scoring_unit")}`}</Text>
          )}
        />
      )}
    </div>
  )
  return (
    <div css={[styles.overviewInfoColumns, customStyles]}>
      <ProgressBar
        customHeight={16}
        customStyles={styles.progressBar}
        progressInPercent={singleParticipantScore ? participantScoreInPercent : averageScoreInPercent}
        verticalLinePositionInPercent={averageScoreInPercent}
        verticalLineTooltipText={t("reporting__survey_average_score", {score: averageScore ?? 0})}
      />
      {overviewInfoColumns}
    </div>
  )
}

const styles = {
  content: css({
    padding: spacingMedium
  }),
  overviewInfoColumns: css({
    padding: spacingSmall,
    boxShadow: insetShadow,
    borderRadius: borderRadius,
    backgroundColor: backgroundColorLight
  }),
  tabbedCard: css({
    marginTop: spacingMedium
  }),
  finishedModules: css(Flex.row, {
    justifyContent: "space-between"
  }),
  progressBar: css({
    margin: spacing(spacingMedium, 0)
  }),
  surveyAverage: css({
    textAlign: "right"
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: `repeat(4,1fr)`,
    gap: spacingMedium,
    marginTop: spacingMedium,
    marginBottom: spacingSmall
  })
}
