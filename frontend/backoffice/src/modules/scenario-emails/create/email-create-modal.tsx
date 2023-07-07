import {css} from "@emotion/react"
import * as React from "react"
import {Controller} from "react-hook-form"
import {CustomSelect, Modal, Overlay, Text, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {NavigationConfig} from "shared/models"
import {Flex, spacingLarge, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {emailRegexPattern} from "shared/utils"
import {Route} from "../../../routes"
import {useEmailCreateModal} from "./hooks/use-email-create-modal"

export interface CreateEmailModalProps {
  readonly scenarioId: UUID
  readonly navigationConfig: NavigationConfig<Route>
  readonly directory?: EmailDirectory
  readonly isIntroductionEmail?: boolean
  readonly routeToEmailAfterCreation?: boolean
}

export const EmailCreateModal: React.FC<CreateEmailModalProps> = ({
  scenarioId,
  navigationConfig,
  directory = EmailDirectory.Inbox,
  isIntroductionEmail = false,
  routeToEmailAfterCreation = false
}) => {
  const {t} = useLucaTranslation()
  const {
    formMethods,
    createEmail,
    dismissModal,
    isConfirmDisabled,
    directoryOptions,
    senderOrRecipientInputLabelKey
  } = useEmailCreateModal(scenarioId, navigationConfig, isIntroductionEmail, routeToEmailAfterCreation, directory)
  const {register, handleSubmit, errors, control} = formMethods

  const directorySelect = (
    <Controller
      render={({onChange, value}) => (
        <CustomSelect
          customStyles={styles.selectWrapper}
          name="directory"
          onChange={onChange}
          disabled={isIntroductionEmail}
          value={value}
          optionList={directoryOptions}
          labelKey={"email__directory"}
        />
      )}
      control={control}
      rules={{required: true}}
      name="directory"
    />
  )

  const emailInput = (
    <TextInput
      ref={register({
        required: true,
        pattern: {
          value: emailRegexPattern,
          message: t("validation__email_format")
        }
      })}
      name="senderOrRecipient"
      hasValidationError={!!errors?.senderOrRecipient}
      type={InputType.email}
      labelKey={senderOrRecipientInputLabelKey}
      placeholder={t("email__create_placeholder")}
    />
  )

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        confirmButtonKey="create_button"
        dismissButtonKey="cancel"
        title={t("email__create_email")}
        onDismiss={dismissModal}
        onConfirm={handleSubmit(createEmail)}
        confirmButtonDisabled={isConfirmDisabled}>
        <div>
          <Text>{t("email__create_hint")}</Text>
          <div css={[styles.row, styles.grid]}>
            <div css={styles.inputWrapper}>{emailInput}</div>
            {directorySelect}
          </div>
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({
    width: "50vw"
  }),
  row: css({
    marginTop: spacingLarge
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium
  }),
  selectWrapper: css({
    width: "100%"
  }),
  inputWrapper: css({
    "> div": css(Flex.column),

    input: {
      width: "100%"
    }
  })
}
