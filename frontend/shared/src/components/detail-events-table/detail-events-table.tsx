import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import React from "react"
import {ColumnProps, Heading, TableContainer, Text} from "../../components"
import {HeadingLevel, TimeUnit} from "../../enums"
import {RuntimeSurveyResults, ScenarioQuestionnaire} from "../../models"
import {Flex, FontWeight, spacingMedium, TextSize} from "../../styles"
import {LucaI18nLangKey, LucaTFunction, useLucaTranslation} from "../../translations"
import {secondsToGivenTimeUnit} from "../../utils"

interface Props {
  readonly customPlaceholderStyles?: CSSInterpolation
  readonly onShowResults: (questionnaireId: UUID) => void
  readonly placeholderKey?: LucaI18nLangKey
  readonly runtimeSurveyResults: RuntimeSurveyResults[]
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
  readonly totalParticipants: number
}

interface ReportingEventsTableEntity {
  readonly scenarioQuestionnaire: ScenarioQuestionnaire
  readonly completedParticipantsCount: number
}

export const DetailEventsTable: React.FC<Props> = ({
  customPlaceholderStyles,
  onShowResults,
  placeholderKey,
  runtimeSurveyResults,
  scenarioQuestionnaires,
  totalParticipants
}) => {
  const entities: ReportingEventsTableEntity[] = scenarioQuestionnaires.map(scenarioQuestionnaire => ({
    scenarioQuestionnaire: scenarioQuestionnaire,
    completedParticipantsCount:
      runtimeSurveyResults.find(result => result.questionnaireId === scenarioQuestionnaire.questionnaireId)
        ?.completedParticipantIds.length ?? 0
  }))

  const {t} = useLucaTranslation()
  return (
    <TableContainer<ReportingEventsTableEntity>
      entities={entities}
      customPlaceholderStyles={customPlaceholderStyles}
      placeHolderText={placeholderKey ? t(placeholderKey) : undefined}
      entityKey={entity => entity.scenarioQuestionnaire.questionnaireId}
      columns={getColumns(t, totalParticipants, onShowResults)}
    />
  )
}

const getColumns = (
  t: LucaTFunction,
  totalParticipants: number,
  showResults: (questionnaireId: UUID) => void
): ColumnProps<ReportingEventsTableEntity>[] => {
  return [
    {
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("title")}
        </Heading>
      ),
      content: (entity: ReportingEventsTableEntity) => (
        <Text size={TextSize.Medium}>
          {`${entity.scenarioQuestionnaire.questionnaire.title} (+${secondsToGivenTimeUnit(
            TimeUnit.Minute,
            entity.scenarioQuestionnaire.activationDelayInSeconds
          )} ${t("minutes")}) `}
        </Text>
      ),
      key: "title"
    },
    {
      header: (
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("reporting_overview_detail_view_results")}
        </Heading>
      ),
      content: (entity: ReportingEventsTableEntity) => {
        return (
          <div css={styles.resultsColumn}>
            <Text size={TextSize.Medium}>{`${entity.completedParticipantsCount}
             ${t("common_of")} ${totalParticipants} `}</Text>
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
  resultsColumn: css(Flex.row, {
    justifyContent: "space-between"
  }),
  table: css({
    marginTop: spacingMedium
  }),
  button: css({
    cursor: "pointer"
  })
}
