import {css} from "@emotion/react"
import * as React from "react"
import {InputType} from "../../enums"
import {CodingDimension} from "../../models"
import {spacingMedium, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {TextInput} from "../input"
import {Modal} from "../modal/modal"
import {Text} from "../typography/typography"
import {useCreateMainDimensionModal} from "./hooks/use-create-main-dimension"

interface Props {
  readonly onConfirm: () => void
  readonly onDismiss: () => void
  readonly codingModelId: UUID
  readonly scenarioId: UUID
  readonly onCreate?: (codingDimension: CodingDimension) => void
}

export const CreateMainDimensionModal: React.FC<Props> = ({
  onConfirm,
  onDismiss,
  codingModelId,
  scenarioId,
  onCreate
}) => {
  const {t} = useLucaTranslation()
  const {formMethods, createMainDimension, createMainDimensionLoading} = useCreateMainDimensionModal(
    codingModelId,
    scenarioId,
    onCreate
  )

  const {register, errors, handleSubmit} = formMethods

  const onSubmit = handleSubmit(({title}) => {
    createMainDimension(title)
    onConfirm()
  })

  return (
    <Modal
      confirmButtonKey="create_button"
      customStyles={styles.modal}
      title={t("coding_models__create_main_dimension_title")}
      onDismiss={onDismiss}
      confirmButtonDisabled={createMainDimensionLoading}
      onConfirm={onSubmit}>
      <Text customStyles={styles.hint} size={TextSize.Small}>
        {t("coding_models__create_main_dimension_hint")}
      </Text>
      <TextInput
        name="title"
        ref={register({
          required: true
        })}
        labelKey="title"
        hasValidationError={errors.title !== undefined}
        placeholderKey="title"
        type={InputType.text}
        autoFocus={true}
      />
    </Modal>
  )
}

const styles = {
  modal: css({width: "60vw"}),
  hint: css({
    marginBottom: spacingMedium
  })
}
