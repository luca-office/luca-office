import {css} from "@emotion/react"
import * as React from "react"
import {useForm} from "react-hook-form"
import {Modal, Overlay, Text, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {Flex, FontWeight, inputHeight, spacingCard, spacingMedium, spacingTinier, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {domainRegexPattern} from "shared/utils"

export interface CompanyDomainModalProps {
  readonly onConfirm: (domain: string) => void
  readonly onDismiss: () => void
  readonly domain?: string
}

export interface CompanyDomainForm {
  readonly domain: string
}

export const CompanyDomainModal: React.FC<CompanyDomainModalProps> = ({domain, onConfirm, onDismiss}) => {
  const {t} = useLucaTranslation()

  const formMethods = useForm<CompanyDomainForm>()
  const {register, handleSubmit, control, errors} = formMethods

  const onSubmit = (form: CompanyDomainForm) => {
    onConfirm(form.domain)
    onDismiss()
  }

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        confirmButtonKey={"confirm_button"}
        dismissButtonKey={"cancel"}
        title={t("sample_companies__detail_settings_email_domain_title")}
        onDismiss={onDismiss}
        onConfirm={handleSubmit(onSubmit)}>
        <div css={[Flex.column, styles.innerContainer]}>
          <Text customStyles={styles.instruction}>
            {t("sample_companies__detail_settings_email_domain_modal_desc_detail")}
          </Text>
          <Text size={TextSize.Medium} customStyles={styles.title}>
            {t("sample_companies__detail_settings_email_domain")}
          </Text>
          <div css={styles.inputContainer}>
            <TextInput
              ref={register({
                required: true,
                pattern: domainRegexPattern
              })}
              name={"domain"}
              type={InputType.text}
              hasValidationError={!!errors.domain}
              customStyles={styles.editTextInput}
              value={domain ?? ""}
            />
          </div>
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({
    width: "50vw",

    header: {
      marginBottom: spacingCard
    }
  }),
  innerContainer: css({}),
  instruction: css({
    marginBottom: spacingMedium
  }),
  title: css({
    fontWeight: FontWeight.Bold,
    marginBottom: spacingTinier
  }),
  cards: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: spacingMedium,
    marginBottom: spacingMedium
  }),
  editTextInput: css({
    flex: "1 1 auto",
    height: inputHeight,
    lineHeight: inputHeight
  }),
  inputContainer: css(Flex.row, {
    flex: "1 1 auto"
  })
}
