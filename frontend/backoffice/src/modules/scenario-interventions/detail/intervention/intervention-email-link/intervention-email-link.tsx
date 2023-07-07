import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Label, Paper, ReadonlyActionField, Text} from "shared/components"
import {IconName} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Intervention, NavigationConfig} from "shared/models"
import {cardBottomColor, Flex, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes} from "shared/utils"
import {Route} from "../../../../../routes"
import {isRuntimeSurveyIntervention} from "../../../utils/common"

export interface InterventionEmailLinkProps {
  readonly intervention: Intervention
  readonly navigate: (navigationConfig: NavigationConfig<Route>) => void
}

export const InterventionEmailLink: React.FC<InterventionEmailLinkProps> = ({intervention, navigate}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.wrapper}>
      <Label label={t("interventions__interventions_detail_email_label")} />
      <Paper>
        <Text customStyles={styles.description}>{t("interventions__interventions_detail_email_hint")}</Text>
        <ReadonlyActionField
          onClick={() =>
            navigate({
              route: Route.ScenarioEmails,
              payload: {
                scenarioId: intervention.scenarioId,
                directory: EmailDirectory.Inbox,
                emailId: intervention.interventionEmailId
              }
            })
          }
          customStyles={styles.actionField}
          buttonLabel={t("interventions__interventions_detail_email_button")}
          renderValue={() => (
            <div css={Flex.row}>
              <Icon name={IconName.Email} customStyles={styles.icon} />
              <Text size={TextSize.Medium}>
                {`${intervention.interventionEmail.sender} ${
                  !isRuntimeSurveyIntervention(intervention)
                    ? t("interventions__interventions_detail_email_delay", {
                        delayInMinutes: convertSecondsToMinutes(intervention.timeOffsetInSeconds)
                      })
                    : `(${t("interventions__interventions_table_time_offset_after_event")})`
                }`}
              </Text>
            </div>
          )}
        />
      </Paper>
    </div>
  )
}

const styles = {
  wrapper: css({
    padding: spacingMedium,
    backgroundColor: cardBottomColor
  }),
  actionField: css({
    width: "50%"
  }),
  description: css({
    marginBottom: spacingMedium
  }),
  icon: css({
    marginRight: spacingSmall
  })
}
