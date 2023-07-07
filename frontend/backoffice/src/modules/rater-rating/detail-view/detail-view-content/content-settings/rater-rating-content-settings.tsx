import {css} from "@emotion/react"
import * as React from "react"
import {Paper, Text} from "shared/components"
import {AuthenticationType} from "shared/graphql/generated/globalTypes"
import {SurveyLight} from "shared/models"
import {
  CustomStyle,
  FontWeight,
  mediumBoxShadow,
  spacingMedium,
  spacingTiny,
  textEllipsis,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString} from "shared/utils"

export interface RaterRatingContentSettingsProps extends CustomStyle {
  readonly survey: SurveyLight
}

export const RaterRatingContentSettings: React.FC<RaterRatingContentSettingsProps> = ({customStyles, survey}) => {
  const {t} = useLucaTranslation()

  const conditionLabel = survey.isOpenParticipationEnabled
    ? t("projects__surveys_table_open_participation")
    : t("projects__surveys_table_closed_participation")
  const authenticationLabel =
    survey.authenticationType === AuthenticationType.OnlyAnonymous
      ? t("rater_rating_details__survey_authentication_anonymous_only")
      : survey.authenticationType === AuthenticationType.OnlyRegistered
      ? t("rater_rating_details__survey_authentication_registered_only")
      : t("rater_rating_details__survey_authentication_anonymous_allowed")

  return (
    <div css={[styles.contentWrapper, customStyles]}>
      <Text customStyles={styles.label} size={TextSize.Medium}>
        {t("rater_rating_details__settings")}
      </Text>
      <Paper customStyles={styles.settingsPaper}>
        <div css={styles.contentWrapper}>
          <Text customStyles={styles.label} size={TextSize.Medium}>
            {t("rater_rating_details__settings_conditions_of_participation")}
          </Text>
          <Text size={TextSize.Medium}>{`${conditionLabel} (${authenticationLabel})`}</Text>
        </div>
        <div css={styles.contentWrapper}>
          <Text customStyles={styles.label} size={TextSize.Medium}>
            {t("rater_rating_details__settings_survey_procedure")}
          </Text>
          <Text size={TextSize.Medium}>
            {!survey.startsAt || !survey.endsAt
              ? t("rater_rating__survey_progress_manual")
              : t("projects__surveys_details_progress_automatic", {
                  start: formatDateFromString(survey.startsAt),
                  end: formatDateFromString(survey.endsAt)
                })}
          </Text>
        </div>
      </Paper>
    </div>
  )
}

const styles = {
  contentWrapper: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  label: css(textEllipsis, {
    fontWeight: FontWeight.Bold
  }),
  settingsPaper: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: spacingMedium,
    padding: spacingMedium,
    boxShadow: mediumBoxShadow
  })
}
