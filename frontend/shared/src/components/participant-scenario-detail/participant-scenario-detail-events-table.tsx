import {css} from "@emotion/react"
import React from "react"
import {ColumnProps, Heading, TableContainer, Text} from "../../components"
import {HeadingLevel, TimeUnit} from "../../enums"
import {ScenarioQuestionnaire} from "../../models"
import {backgroundColorBright, Flex, FontWeight, spacingHuger, TextSize} from "../../styles"
import {LucaI18nLangKey, LucaTFunction, useLucaTranslation} from "../../translations"
import {secondsToGivenTimeUnit} from "../../utils"
import {useParticipantScenarioDetailEventsTable} from "./hooks/use-participant-scenario-detail-events-table"

interface ParticipantScenarioDetailEventsTableProps {
  readonly surveyId: UUID
  readonly surveyInvitationId: UUID
  readonly scenarioQuestionnaires: Array<ScenarioQuestionnaire>
  readonly onShowResults: (questionnaireId: UUID) => void
}

interface ParticipantScenarioDetailEventsTableEntity {
  readonly scenarioQuestionnaire: ScenarioQuestionnaire
}

export const ParticipantScenarioDetailEventsTable: React.FC<ParticipantScenarioDetailEventsTableProps> = ({
  surveyId,
  surveyInvitationId,
  scenarioQuestionnaires,
  onShowResults
}) => {
  const {t} = useLucaTranslation()

  const {getStatusLabelKey} = useParticipantScenarioDetailEventsTable({
    surveyId,
    surveyInvitationId,
    scenarioQuestionnaires
  })

  const entities: Array<ParticipantScenarioDetailEventsTableEntity> = scenarioQuestionnaires.map(questionnaire => ({
    scenarioQuestionnaire: questionnaire
  }))

  return (
    <TableContainer<ParticipantScenarioDetailEventsTableEntity>
      entities={entities}
      entityKey={entity => entity.scenarioQuestionnaire.questionnaireId}
      columns={getColumns(t, onShowResults, getStatusLabelKey)}
      customHeaderRowStyles={styles.tableHeaderRow}
      customEntityWrapperStyles={styles.tableEntityWrapper}
    />
  )
}

const getColumns = (
  t: LucaTFunction,
  showResults: (questionnaireId: UUID) => void,
  getStatusLabelKey: (questionnaireId: UUID) => LucaI18nLangKey
): ColumnProps<ParticipantScenarioDetailEventsTableEntity>[] => {
  return [
    {
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("title")}
        </Heading>
      ),
      content: (entity: ParticipantScenarioDetailEventsTableEntity) => (
        <Text size={TextSize.Medium}>
          {`${entity.scenarioQuestionnaire.questionnaire.title} (+${secondsToGivenTimeUnit(
            TimeUnit.Minute,
            entity.scenarioQuestionnaire.activationDelayInSeconds
          )} ${t("minutes")})`}
        </Text>
      ),
      key: "title"
    },
    {
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("dashboard__attendee_status_header")}
        </Heading>
      ),
      content: (entity: ParticipantScenarioDetailEventsTableEntity) => {
        return (
          <div css={styles.statusColumn}>
            <Text size={TextSize.Medium}>{t(getStatusLabelKey(entity.scenarioQuestionnaire.questionnaireId))}</Text>
            <Heading
              customStyles={styles.button}
              fontWeight={FontWeight.Bold}
              level={HeadingLevel.h3}
              onClick={() => showResults(entity.scenarioQuestionnaire.questionnaireId)}
              color="primary">
              {t("reporting_overview_detail_view_results_button")}
            </Heading>
          </div>
        )
      },
      key: "results"
    }
  ]
}

const styles = {
  button: css({
    cursor: "pointer"
  }),
  statusColumn: css(Flex.row, {
    justifyContent: "space-between"
  }),
  tableHeaderRow: css({
    height: spacingHuger
  }),
  tableEntityWrapper: css({
    backgroundColor: backgroundColorBright
  })
}
