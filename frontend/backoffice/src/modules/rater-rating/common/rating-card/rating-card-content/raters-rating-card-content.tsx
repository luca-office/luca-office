import {css} from "@emotion/react"
import * as React from "react"
import {CardContent, Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {Survey} from "shared/models"
import {
  backgroundColorLight,
  borderRadius,
  CustomStyle,
  insetShadow,
  spacing,
  spacingCard,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString} from "shared/utils"

export interface RatersRatingCardContentProps extends CustomStyle {
  readonly survey: Survey
}

export const RatersRatingCardContent: React.FC<RatersRatingCardContentProps> = ({customStyles, survey}) => {
  const {t} = useLucaTranslation()
  return (
    <CardContent customStyles={[styles.content, customStyles]}>
      <div css={styles.description}>
        <Text>{survey.description}</Text>
      </div>
      <div css={styles.info}>
        <Text>{`${t("rater_rating__info_box_title")}:`}</Text>
        <div css={styles.infoBox}>
          <div css={styles.infoBoxEntry}>
            <Icon name={IconName.Student} />
            <Text customStyles={styles.infoBoxEntryLabel}>
              {t("projects__surveys_details_dashboard_participants", {
                count: survey.completedParticipationsCount,
                invited: survey.invitationsCount
              })}
            </Text>
          </div>
          <div css={styles.infoBoxEntry}>
            <Icon name={IconName.Calendar} />
            <Text customStyles={styles.infoBoxEntryLabel}>
              {!survey.startsAt || !survey.endsAt
                ? t("rater_rating__survey_progress_manual")
                : t("projects__surveys_details_progress_automatic", {
                    start: formatDateFromString(survey.startsAt),
                    end: formatDateFromString(survey.endsAt)
                  })}
            </Text>
          </div>
        </div>
      </div>
    </CardContent>
  )
}

const Sizes = {
  description: 48,
  infoBox: 56
}

const styles = {
  content: css({
    display: "grid",
    gridTemplateRows: `${Sizes.description}px minmax(min-content, max-content)`,
    gridRowGap: spacingSmall,
    justifyContent: "stretch",
    padding: spacing(0, spacingCard),
    boxSizing: "border-box"
  }),
  description: css({
    overflow: "auto"
  }),
  info: css({
    display: "grid",
    gridTemplateRows: `minmax(min-content, max-content) ${Sizes.infoBox}px`,
    gridRowGap: spacingTiny
  }),
  infoBox: css({
    display: "grid",
    gridTemplateRows: "repeat(2, 1fr)",
    gridRowGap: spacingSmall,
    backgroundColor: backgroundColorLight,
    borderRadius: borderRadius - 1,
    boxShadow: insetShadow,
    padding: spacingSmall
  }),
  infoBoxEntry: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingSmall
  }),
  infoBoxEntryLabel: css(textEllipsis)
}
