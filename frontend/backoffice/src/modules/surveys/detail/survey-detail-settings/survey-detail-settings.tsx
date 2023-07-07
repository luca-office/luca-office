import * as React from "react"
import {Button, Card, CardContent, LabelledCard, Text} from "shared/components"
import {AuthenticationType, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {Survey} from "shared/models"
import {CustomStyle, TextSize} from "shared/styles"
import {WithLucaTranslation} from "shared/translations"
import {formatDateFromString} from "shared/utils"
import {InformationEntry} from "../../../../components"
import {surveyDetailStyles as styles} from "../survey-detail.style"

export interface SurveyDetailSettingsProps extends WithLucaTranslation, CustomStyle {
  readonly isEditable: boolean
  readonly survey: Survey
  readonly navigateToSurveyUpdate: () => void
}

export const SurveyDetailSettings: React.FunctionComponent<SurveyDetailSettingsProps> = ({
  isEditable,
  navigateToSurveyUpdate,
  survey,
  customStyles,
  t
}) => {
  return (
    <LabelledCard label={t("projects__survey_details_settings_label")} customStyles={customStyles}>
      <Card hasShadow>
        <CardContent>
          <div css={styles.metaInfoContainer}>
            <InformationEntry label={t("projects__surveys_details_participation_label")}>
              <Text size={TextSize.Medium}>
                {survey.isOpenParticipationEnabled
                  ? t("projects__survey_overlay_open_participation")
                  : t("projects__survey_overlay_closed_participation")}
                {survey.authenticationType === AuthenticationType.RegisteredOrAnonymous &&
                  ` (${t("projects__survey_overlay_anonym_participation")})`}
              </Text>
            </InformationEntry>
            <InformationEntry label={t("projects__surveys_progress_section_label")}>
              <Text size={TextSize.Medium}>
                {survey.executionType === SurveyExecutionType.AutomaticAsynchronous
                  ? t("projects__surveys_details_progress_automatic", {
                      start: survey.startsAt
                        ? formatDateFromString(survey.startsAt)
                        : t("projects__surveys_details_progress_no_date"),
                      end: survey.endsAt
                        ? formatDateFromString(survey.endsAt)
                        : t("projects__surveys_details_progress_no_date")
                    })
                  : survey.executionType === SurveyExecutionType.ManualAsynchronous
                  ? t("projects__surveys_details_progress_manual_asynchron")
                  : t("projects__surveys_details_progress_manual_synchron")}
              </Text>
            </InformationEntry>
          </div>
          <Button
            customStyles={styles.editButton}
            disabled={!isEditable}
            onClick={!isEditable ? undefined : navigateToSurveyUpdate}>
            {t("edit_button")}
          </Button>
        </CardContent>
      </Card>
    </LabelledCard>
  )
}
