import {css} from "@emotion/react"
import * as React from "react"
import {Button, Column, Columns, Icon, Paper, ReadonlyActionField, Text} from "shared/components"
import {IconName, InterventionGroupType} from "shared/enums"
import {InterventionType} from "shared/graphql/generated/globalTypes"
import {Intervention, NavigationConfig, ScenarioQuestionnaire} from "shared/models"
import {Flex, fontColorDark, fontColorLight, spacing, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useNavigate} from "../../../../../../../hooks/use-navigate"
import {Route} from "../../../../../../../routes"
import {
  getGroupEntityBaseFromIntervention,
  getGroupTypeIconName,
  groupTypeToToolLabelKey,
  interventionTypeToGroupType
} from "../../../../../../scenario-interventions/utils"

export interface EmailBodyFooterInterventionPositionProps {
  readonly intervention: Intervention
  readonly navigationConfig: NavigationConfig<Route>
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
}

export const EmailBodyFooterInterventionPosition: React.FC<EmailBodyFooterInterventionPositionProps> = ({
  intervention,
  navigationConfig,
  scenarioQuestionnaires
}) => {
  const {t} = useLucaTranslation()
  const {navigate} = useNavigate()
  const interventionGroupType = interventionTypeToGroupType(intervention.interventionType)

  const groupEntityTitle = getGroupEntityBaseFromIntervention(intervention, scenarioQuestionnaires).title

  const hasEmptySubject = intervention.interventionType === InterventionType.EmailOpening && groupEntityTitle === ""
  return (
    <div>
      <Paper>
        <Text>{t("email__intervention_email_position_description")}</Text>
        <Columns customStyles={styles.columns}>
          {intervention.interventionType !== InterventionType.NotesContent && (
            <Column flexGrow={2}>
              <ReadonlyActionField
                buttonLabel={`${t(
                  interventionGroupType === InterventionGroupType.Event ? "common_to_masculinum" : "common_to"
                )} ${t(groupTypeToToolLabelKey(interventionGroupType))}`}
                onClick={() => navigate(navigationConfig)}
                customStyles={styles.actionField}
                renderValue={() => (
                  <div css={Flex.row}>
                    <Icon customStyles={styles.icon} name={getGroupTypeIconName(interventionGroupType)} />
                    <Text customStyles={styles.text(hasEmptySubject)} size={TextSize.Medium}>
                      {hasEmptySubject ? t("email__intervention_email_no_subject_placeholder") : groupEntityTitle}
                    </Text>
                  </div>
                )}
              />
            </Column>
          )}

          <Column>
            <Button
              customStyles={styles.button(intervention.interventionType === InterventionType.NotesContent)}
              icon={IconName.ArrowRight}
              onClick={() =>
                navigate({
                  route: Route.ScenarioInterventionsInterventionDetail,
                  payload: {
                    scenarioId: intervention.scenarioId,
                    groupType: interventionGroupType,
                    headerGroupType: interventionGroupType,
                    groupEntityId: getGroupEntityBaseFromIntervention(intervention, scenarioQuestionnaires).id,
                    interventionId: intervention.id
                  }
                })
              }>
              <div css={Flex.row}>{t("email__intervention_email_button_label")}</div>
            </Button>
          </Column>
        </Columns>
      </Paper>
    </div>
  )
}

const styles = {
  icon: css({
    marginRight: spacingMedium
  }),
  text: (isPlaceholder: boolean) =>
    css({
      color: !isPlaceholder ? fontColorDark : fontColorLight
    }),
  button: (isNotesIntervention: boolean) =>
    css({
      width: isNotesIntervention ? "50%" : "100%",
      margin: spacing(spacingMedium, 0, spacingSmall, 0)
    }),
  actionField: css({
    minHeight: 32,
    padding: spacing(spacingMedium, 0, spacingSmall, 0)
  }),
  columns: css({
    alignItems: "center"
  })
}
