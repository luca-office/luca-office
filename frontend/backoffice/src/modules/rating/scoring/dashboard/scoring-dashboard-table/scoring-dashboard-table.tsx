import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Button, ColumnProps, Heading, Icon, TableContainer, Text, Tooltip} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {
  borderRadius,
  boxHeightSmall,
  CustomStyle,
  Flex,
  FontWeight,
  radius,
  ratingIndicatorFinalized,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {find} from "shared/utils"
import {ParticipantRatingProgressBar} from "../../../common"
import {ScoringDashboardTablePlaceholder} from "../scoring-dashboard-table-placeholder/rating-overview-table-placeholder"

export interface ParticipantRatingCounts {
  readonly ratableProjectModulesCount: number
  readonly finalRatedProjectModulesCount: number
}

export interface ParticipantTableEntity {
  readonly id: UUID
  readonly name: string
  readonly index: number
  readonly isFinalScore: boolean
  readonly isRatingCompleted: boolean
  readonly isRatingOfMainRater: boolean
  readonly ratingCounts: ParticipantRatingCounts
  readonly isRatingOfAllModulesPossible: boolean
  readonly isRatingOfSomeModulePossible: boolean
}

export interface ScoringDashboardTableProps extends CustomStyle {
  readonly customHeaderStyles?: CSSInterpolation
  readonly customTableStyles?: CSSInterpolation
  readonly surveyId: UUID
  readonly participantTableEntities: ParticipantTableEntity[]
  readonly navigateToParticipantRating: (id: UUID) => void
  readonly navigateToParticipantProgress: (id: UUID) => void
  readonly selfInvited: boolean
  readonly selfInvitedRatingFinished: boolean
  readonly isFinalRatingCompleted: boolean
}

export const ScoringDashboardTable: React.FC<ScoringDashboardTableProps> = ({
  customStyles,
  customHeaderStyles,
  customTableStyles,
  surveyId,
  participantTableEntities,
  navigateToParticipantRating,
  navigateToParticipantProgress,
  selfInvited,
  selfInvitedRatingFinished,
  isFinalRatingCompleted
}) => {
  const {t} = useLucaTranslation()

  const showRatingPlaceholder =
    (selfInvited && !selfInvitedRatingFinished) ||
    find(({isRatingOfMainRater}) => isRatingOfMainRater, participantTableEntities).exists(
      ({isRatingCompleted, isFinalScore}) => !isFinalScore && !isRatingCompleted
    )

  const handleIconClick = (entityId: UUID) => (evt: React.MouseEvent<HTMLElement>) => {
    evt.stopPropagation()
    navigateToParticipantRating(entityId)
  }

  const columns: ColumnProps<ParticipantTableEntity>[] = [
    {
      key: "name",
      sortConfig: {
        isSortable: true,
        key: "name"
      },
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating__participant")}
        </Heading>
      ),
      content: entity => {
        return (
          <div css={Flex.row}>
            <Text size={TextSize.Medium}>{entity.name}</Text>
            {!entity.isRatingOfAllModulesPossible && (
              <Tooltip
                title={t(
                  entity.isRatingOfSomeModulePossible
                    ? "rating__partly_not_possible_tooltip"
                    : "rating__not_possible_tooltip"
                )}>
                <Text customStyles={styles.marginLeft} size={TextSize.Medium}>
                  {`(${t(
                    entity.isRatingOfSomeModulePossible ? "rating__partly_not_possible" : "rating__not_possible"
                  )})`}
                </Text>
              </Tooltip>
            )}
          </div>
        )
      }
    },
    {
      key: "index",
      sortConfig: {
        isSortable: true,
        key: "index"
      },
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating__participant_index")}
        </Heading>
      ),
      content: entity => entity.index
    },
    {
      key: "finalize",
      sortConfig: {
        isSortable: true,
        key: "isRatingCompleted"
      },
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating__table_column_completed")}
        </Heading>
      ),
      customStyles: styles.finalizeColumn,
      content: entity => {
        const canBeFinalized =
          (entity.isFinalScore && !entity.isRatingCompleted && !entity.isRatingOfMainRater) ||
          (entity.isFinalScore && !entity.isRatingCompleted && entity.isRatingOfMainRater) ||
          (!entity.isFinalScore && entity.isRatingCompleted && entity.isRatingOfMainRater) ||
          (!entity.isFinalScore && !entity.isRatingCompleted && !entity.isRatingOfMainRater) ||
          (!entity.isFinalScore && entity.isRatingCompleted && !entity.isRatingOfMainRater)

        const finalRatedProjectModulesCount = entity.ratingCounts.finalRatedProjectModulesCount
        const projectModulesCount = entity.ratingCounts.ratableProjectModulesCount

        const isFullyRated = entity.isFinalScore && finalRatedProjectModulesCount === projectModulesCount
        const ratingPossible = entity.isRatingOfSomeModulePossible

        return (
          <div css={styles.finalizeContainer}>
            <ParticipantRatingProgressBar
              progressCount={finalRatedProjectModulesCount}
              overallCount={projectModulesCount}
              t={t}
            />

            {!isFinalRatingCompleted &&
              (isFullyRated || !ratingPossible ? (
                <Tooltip
                  title={
                    canBeFinalized
                      ? ratingPossible
                        ? t("rating__final_score_available")
                        : t("rating__final_score_set_not_possible")
                      : t("rating__final_score_disabled")
                  }>
                  <Icon
                    css={styles.pointer}
                    className={"participant-finalized"}
                    name={ratingPossible ? IconName.Check : IconName.Close}
                    color={ratingIndicatorFinalized}
                    onClick={handleIconClick(entity.id)}
                  />
                </Tooltip>
              ) : (
                <Button
                  onClick={handleIconClick(entity.id)}
                  customStyles={styles.smallButton}
                  variant={ButtonVariant.Secondary}>
                  {t("rating__final_score_set_alt")}
                </Button>
              ))}
          </div>
        )
      }
    }
  ]

  return (
    <div css={[styles.container, customStyles]}>
      <Heading customStyles={customHeaderStyles} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("rating_overview__attendees_list_label", {count: participantTableEntities.length})}
      </Heading>
      <TableContainer<ParticipantTableEntity>
        customStyles={[styles.table, customTableStyles]}
        customHeaderRowStyles={[styles.table, styles.tableHeader]}
        customTableFooterStyles={styles.tableFooter}
        entityKey={entity => entity.id}
        onClick={entity => navigateToParticipantProgress(entity.id)}
        entities={!showRatingPlaceholder ? participantTableEntities : []}
        columns={columns}
        showFooter={true}
        customPlaceholder={
          <ScoringDashboardTablePlaceholder
            surveyId={surveyId}
            {...(!showRatingPlaceholder && {
              title: t("common__no_data"),
              description: t("rating_participant_list_no_data_placeholder_description"),
              showNavigationButton: false
            })}
          />
        }
      />
    </div>
  )
}

const Size = {
  tableHeader: 48
}

const styles = {
  container: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  pointer: css({
    cursor: "pointer"
  }),
  finalizeColumn: css({
    flex: "2 1 0"
  }),
  finalizeContainer: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall
  }),
  table: css({
    borderRadius: radius(borderRadius, borderRadius, 0, 0)
  }),
  tableHeader: css({
    height: Size.tableHeader
  }),
  tableFooter: css({
    height: "initial"
  }),
  marginLeft: {
    marginLeft: spacingSmall
  },
  smallButton: css({
    fontSize: TextSize.Small,
    minHeight: boxHeightSmall,
    width: "auto"
  })
}
