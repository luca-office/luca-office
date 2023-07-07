import {css} from "@emotion/react"
import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {Modal, Overlay, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {spacingMedium, spacingSmall} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"

export interface DirectoryCreationForm {
  readonly name: string
}

export interface CreateDirectoryModalProps {
  readonly onDismiss: () => void
  readonly titleKey: LucaI18nLangKey
  readonly formMethods: UseFormMethods<DirectoryCreationForm>
  readonly onSubmit: (formValues: DirectoryCreationForm) => void
  readonly createDirectoryLoading: boolean
}

export const CreateDirectoryModal: React.FC<CreateDirectoryModalProps> = ({
  onDismiss,
  titleKey,
  onSubmit,
  formMethods,
  createDirectoryLoading
}) => {
  const {t} = useLucaTranslation()
  const {register, handleSubmit, errors} = formMethods

  return (
    <Overlay>
      <Modal
        title={t(titleKey)}
        onDismiss={onDismiss}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}
        confirmButtonDisabled={createDirectoryLoading}>
        <div css={styles.inputWrapper}>
          <TextInput
            ref={register({
              required: true
            })}
            placeholderKey="files_and_directories__create_main_directory_modal_name_placeholder"
            customStyles={styles.input}
            name="name"
            hasValidationError={!!errors?.name}
            type={InputType.text}
            labelKey={"files_and_directories__create_main_directory_modal_name_title"}
            autoFocus={true}
          />
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({width: 600}),
  inputWrapper: css({
    marginTop: spacingMedium
  }),
  input: css({
    width: "100%",
    marginBottom: spacingSmall
  })
}
