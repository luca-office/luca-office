import {useMutation} from "@apollo/client"
import {css} from "@emotion/react"
import {useState} from "react"
import {Button, Column, Columns, Heading, InfoColumnContainer, Text} from "shared/components"
import {ButtonVariant, HeadingLevel} from "shared/enums"
import {
  ConfirmBackofficeTermsAndConditionsMutation,
  ConfirmBackofficeTermsAndConditionsMutationVariables
} from "shared/graphql/generated/ConfirmBackofficeTermsAndConditionsMutation"
import {confirmBackofficeTermsAndConditionsMutation} from "shared/graphql/mutations"
import {spacingMedium, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {applicationVersion} from "../../constants"
import {useLogout} from "../../graphql/hooks"
import {authStyles} from "./auth.style"
import {BackofficeTermsAndConditionsConfirmation} from "./privacy-policy/backoffice-terms-and-conditions-confirmation"

export const AccountNeedsBackofficeTermsAndConditionsConfirmation = () => {
  const {t} = useLucaTranslation()

  const [confirmBackofficeTermsAndConditions] = useMutation<
    ConfirmBackofficeTermsAndConditionsMutation,
    ConfirmBackofficeTermsAndConditionsMutationVariables
  >(confirmBackofficeTermsAndConditionsMutation)
  const {logout} = useLogout()

  const [hasConfirmedBackofficeTermsAndConditions, setHasConfirmedBackofficeTermsAndConditions] = useState(false)
  return (
    <Columns customStyles={authStyles.content}>
      <InfoColumnContainer footerText={applicationVersion} />
      <Column flexGrow={4}>
        <div css={styles.formWrapper}>
          <Heading level={HeadingLevel.h1} customStyles={authStyles.formHeader}>
            {t("privacy_policy_confirmation_required__heading")}
          </Heading>
          <Text customStyles={authStyles.formText} size={TextSize.Medium}>
            {t("privacy_policy_confirmation_required__text")}
          </Text>
          <BackofficeTermsAndConditionsConfirmation
            hasConfirmedBackofficeTermsAndConditions={hasConfirmedBackofficeTermsAndConditions}
            onHasConfirmedBackofficeTermsAndConditionsChanged={setHasConfirmedBackofficeTermsAndConditions}
          />

          <Button
            customStyles={[authStyles.button, authStyles.buttonFirst]}
            onClick={() =>
              confirmBackofficeTermsAndConditions({
                variables: {hasConfirmedBackofficeTermsAndConditions: hasConfirmedBackofficeTermsAndConditions}
              })
            }
            isLoading={false}
            disabled={!hasConfirmedBackofficeTermsAndConditions}>
            {t("privacy_policy_confirmation_required__confirm_button")}
          </Button>
          <Button variant={ButtonVariant.Ghost} onClick={logout} customStyles={authStyles.button}>
            {t("logout_button")}
          </Button>
        </div>
      </Column>
    </Columns>
  )
}
const styles = {
  heading: css({
    marginBottom: spacingMedium
  }),
  text: css({
    fontSize: TextSize.Medium,
    marginBottom: spacingMedium
  }),
  formWrapper: css({width: "50%", margin: "0 auto"})
}
