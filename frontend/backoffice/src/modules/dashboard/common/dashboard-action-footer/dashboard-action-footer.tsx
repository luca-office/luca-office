import {css} from "@emotion/react"
import * as React from "react"
import {Button, Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {
  backgroundColorLight,
  Flex,
  primaryColor,
  shadowedCard,
  spacing,
  spacingHuger,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getSurveyDurationLabel, getSurveyParticipantsLabel, getSurveyTimingStatus} from "../../../../utils"
import {useDashboardActionFooter} from "./hooks/use-dashboard-action-footer"

export interface DashboardActionFooterProps {
  readonly surveyId: UUID
  readonly projectId: UUID
  readonly hideNavigationButton?: boolean
}

export const DashboardActionFooter: React.FunctionComponent<DashboardActionFooterProps> = ({
  surveyId,
  projectId,
  hideNavigationButton = false
}) => {
  const {t} = useLucaTranslation()
  const {project: projectOption, survey: surveyOption, onNavigate} = useDashboardActionFooter(projectId, surveyId)

  return projectOption
    .map(() =>
      surveyOption
        .map(survey => {
          const status = getSurveyTimingStatus(survey.startsAt, survey.endsAt)
          return (
            <div data-testid="survey-dashboard-footer" className="survey-dashboard-footer" css={styles.container}>
              <div css={styles.footerEntry}>
                <Icon customStyles={styles.icon} name={IconName.Clock} />
                <Text size={TextSize.Medium}>{getSurveyDurationLabel(t, survey.startsAt, survey.endsAt)}</Text>
              </div>
              <div css={styles.footerEntry}>
                <Icon customStyles={styles.icon} name={IconName.Student} />
                <Text size={TextSize.Medium}>
                  {getSurveyParticipantsLabel(t, status, survey.invitationsCount, survey.completedParticipationsCount)}
                </Text>
                {!hideNavigationButton && (
                  <Button onClick={onNavigate} customStyles={styles.button}>
                    {t(
                      survey.isCompleted ? "dashboard__footer_navigate_scoring" : "dashboard__footer_navigate_dashboard"
                    )}
                  </Button>
                )}
              </div>
            </div>
          )
        })
        .orNull()
    )
    .orNull()
}
const Sizes = {
  firstColumn: 300,
  button: 227
}
const styles = {
  container: css({
    display: "grid",
    gridTemplateColumns: `${Sizes.firstColumn}px 1fr auto`,
    gridColumnGap: spacingMedium,
    width: "100%",
    alignItems: "center"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  footerEntry: css(shadowedCard, Flex.row, {
    padding: spacing(0, spacingMedium),
    height: spacingHuger
  }),
  button: css({
    marginLeft: "auto",
    justifySelf: "flex-end",
    background: backgroundColorLight,
    color: primaryColor,
    width: Sizes.button,
    border: `1px solid ${primaryColor}`
  })
}
