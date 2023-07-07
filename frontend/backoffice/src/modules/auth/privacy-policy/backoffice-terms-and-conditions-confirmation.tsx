import {css} from "@emotion/react"
import * as React from "react"
import {Checkbox, Text} from "shared/components"
import {primaryColor, spacingHuge, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {authStyles as styles} from "../auth.style"

interface Props {
  readonly hasConfirmedBackofficeTermsAndConditions: boolean
  readonly onHasConfirmedBackofficeTermsAndConditionsChanged: (newValue: boolean) => void
}
export const BackofficeTermsAndConditionsConfirmation = ({
  hasConfirmedBackofficeTermsAndConditions,
  onHasConfirmedBackofficeTermsAndConditionsChanged
}: Props) => {
  const {t} = useLucaTranslation()

  return (
    <Text size={TextSize.Medium} customStyles={styles.formText}>
      <label css={privacyStyles.termsAndConditionsHintLabel}>
        <Checkbox
          customStyles={privacyStyles.termsAndConditionsHintCheckbox}
          checked={hasConfirmedBackofficeTermsAndConditions}
          onChange={event => onHasConfirmedBackofficeTermsAndConditionsChanged(event.target.checked)}
        />
        <div css={privacyStyles.termsAndConditionsHintLabelTextWrapper}>
          {t("register_backoffice_terms_and_conditions_hint_text_1")}
          &nbsp;
          <a css={privacyStyles.primaryTextColor} href={linkUrl1} target="_blank">
            {t("register_backoffice_terms_and_conditions_hint_link_1")}
          </a>
          {t("register_backoffice_terms_and_conditions_hint_text_2")}
          &nbsp;
          <a css={privacyStyles.primaryTextColor} href={linkUrl2} target="_blank">
            {t("register_backoffice_terms_and_conditions_hint_link_2")}
          </a>
          &nbsp;
          {t("register_backoffice_terms_and_conditions_hint_text_3")}
          &nbsp;
          <a css={privacyStyles.primaryTextColor} href={linkUrl3} target="_blank">
            {t("register_backoffice_terms_and_conditions_hint_link_3")}
          </a>
          &nbsp;
          {t("register_backoffice_terms_and_conditions_hint_text_4")}
        </div>
      </label>
    </Text>
  )
}

const linkUrl1 = "https://luca-office.de/datenschutz-und-nutzungsbedingungen/"
const linkUrl2 = "https://luca-office.de/datenschutz-und-nutzungsbedingungen/"
const linkUrl3 = "https://luca-office.de/datenschutz-und-nutzungsbedingungen/"

const privacyStyles = {
  termsAndConditionsHint: css({
    width: "100%",
    marginTop: spacingHuge
  }),
  termsAndConditionsHintLabel: css({
    display: "flex",
    gap: spacingSmall,
    alignItems: "flex-start",
    cursor: "pointer"
  }),
  termsAndConditionsHintLabelTextWrapper: css({
    display: "flex",
    flexWrap: "wrap"
  }),
  termsAndConditionsHintCheckbox: css({
    flex: "0 0 auto"
  }),
  primaryTextColor: css({
    color: primaryColor
  })
}
