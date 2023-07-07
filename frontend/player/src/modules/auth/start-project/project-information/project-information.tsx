import * as React from "react"
import {Button, Checkbox, Heading, Paper, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {
  FontWeight,
  primaryColor,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

interface Props {
  readonly durationInMinutes: number
  readonly isStartLoading: boolean
  readonly isPrivacyPolicyChecked: boolean
  readonly updateIsPrivacyPolicyChecked: (value: boolean) => void
  readonly onStartClicked: () => void
}

export const ProjectInformation: React.FC<Props> = props => {
  const {
    onStartClicked,
    durationInMinutes,
    isStartLoading,
    isPrivacyPolicyChecked,
    updateIsPrivacyPolicyChecked
  } = props
  const {t} = useLucaTranslation()

  return (
    <div css={styles.startProject}>
      <Heading customStyles={styles.heading} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("project__start_confirm")}
      </Heading>

      <Paper>
        <Text size={TextSize.Medium}>{t("project__start_dialog_text_1", {durationInMinutes})}</Text>

        <Text size={TextSize.Medium} customStyles={styles.privacyPolicyHint}>
          <label css={styles.privacyPolicyHintLabel}>
            <Checkbox
              customStyles={styles.privacyPolicyHintCheckbox}
              checked={isPrivacyPolicyChecked}
              onChange={event => updateIsPrivacyPolicyChecked(event.target.checked)}
            />
            <div>
              {t("project__start_privacy_policy_hint_text_1")}
              &nbsp;
              <a css={styles.primaryTextColor} href={linkUrl1} target="_blank">
                {t("project__start_privacy_policy_hint_link_1")}
              </a>
              {t("project__start_privacy_policy_hint_text_2")}
              &nbsp;
              <a css={styles.primaryTextColor} href={linkUrl2} target="_blank">
                {t("project__start_privacy_policy_hint_link_2")}
              </a>
              &nbsp;
              {t("project__start_privacy_policy_hint_text_3")}
              &nbsp;
              <a css={styles.primaryTextColor} href={linkUrl3} target="_blank">
                {t("project__start_privacy_policy_hint_link_3")}
              </a>
              &nbsp;
              {t("project__start_privacy_policy_hint_text_4")}
            </div>
          </label>
        </Text>

        <Button
          customStyles={styles.button}
          isLoading={isStartLoading}
          disabled={!isPrivacyPolicyChecked}
          onClick={onStartClicked}>
          {t(isStartLoading ? "project__start_loading" : "project__start_now")}
        </Button>
      </Paper>
    </div>
  )
}

const linkUrl1 = "https://luca-office.de/datenschutz-und-nutzungsbedingungen/"
const linkUrl2 = "https://luca-office.de/datenschutz-und-nutzungsbedingungen/"
const linkUrl3 = "https://luca-office.de/datenschutz-und-nutzungsbedingungen/"

const styles = {
  startProject: {
    marginTop: spacingHuge
  },
  heading: {
    marginBottom: spacingTiny
  },
  privacyPolicyHint: {
    marginTop: spacingMedium
  },
  privacyPolicyHintLabel: {
    display: "flex",
    gap: spacingSmall,
    alignItems: "flex-start",
    cursor: "pointer"
  },
  privacyPolicyHintCheckbox: {
    flex: "0 0 auto"
  },
  primaryTextColor: {
    color: primaryColor
  },
  button: {
    width: "50%",
    maxWidth: 300,
    margin: "0 auto",
    marginTop: spacingLarge
  }
}
