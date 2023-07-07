import {css} from "@emotion/react"
import * as React from "react"
import {Column, Columns, Modal, ReadonlyActionField, Text, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {CodingDimension} from "shared/models"
import {spacingMedium, textEllipsis, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useCreateSubDimensionModal} from "./hooks/use-create-sub-dimension"

interface Props {
  readonly onConfirm: () => void
  readonly onDismiss: () => void
  readonly codingModelId: UUID
  readonly parentDimension: CodingDimension
  readonly scenarioId: UUID
}

export const CreateSubDimensionModal: React.FC<Props> = ({
  onConfirm,
  onDismiss,
  codingModelId,
  parentDimension,
  scenarioId
}) => {
  const {t} = useLucaTranslation()
  const {formMethods, createSubDimension, createSubDimensionLoading} = useCreateSubDimensionModal(
    codingModelId,
    parentDimension.id,
    scenarioId
  )

  const {register, errors, handleSubmit} = formMethods

  const onSubmit = handleSubmit(({title}) => {
    createSubDimension(title).then(onConfirm)
  })

  return (
    <Modal
      confirmButtonKey="create_button"
      customStyles={styles.modal}
      title={t("coding_models__create_sub_dimension_title")}
      onDismiss={onDismiss}
      confirmButtonDisabled={createSubDimensionLoading}
      onConfirm={onSubmit}>
      <Text customStyles={styles.hint} size={TextSize.Small}>
        {t("coding_models__create_sub_dimension_hint")}
      </Text>
      <Columns>
        <Column flexGrow={2} flexShrink={0} customStyles={styles.titleColumn}>
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
        </Column>
        <Column flexGrow={1} flexShrink={0} customStyles={styles.dimensionColumn}>
          <ReadonlyActionField
            label={t("coding_models__create_sub_dimension_label_parent")}
            customStyles={styles.actionField}
            customContentStyles={styles.actionFieldContent}
            renderValue={() => (
              <Text customStyles={textEllipsis} size={TextSize.Medium}>
                {parentDimension.title}
              </Text>
            )}
          />
        </Column>
      </Columns>
    </Modal>
  )
}

const styles = {
  modal: css({width: "60vw"}),
  hint: css({
    marginBottom: spacingMedium
  }),
  dimensionColumn: css({
    width: "33.33%"
  }),
  titleColumn: css({
    width: "66.66%"
  }),
  actionField: css({
    width: "100%"
  }),
  actionFieldContent: css({
    minWidth: 0
  })
}
