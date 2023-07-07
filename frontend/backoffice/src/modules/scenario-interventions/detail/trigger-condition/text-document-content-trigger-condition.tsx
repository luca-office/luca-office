import * as React from "react"
import {Label} from "shared/components"
import {TagsOnCards} from "shared/components/tags-on-card/tags-on-cards"
import {TextDocumentContentInterventionUpdate} from "shared/graphql/generated/globalTypes"
import {useLucaTranslation} from "shared/translations"
import {OverlayEditField, OverlayEditFieldType} from "../../../../components"
import {doesNotContainEmptyValues} from "../../utils/common"

interface Props {
  readonly value: string
  readonly isReadOnly: boolean
  readonly onConfirm: (value: string) => void
}

export const TextDocumentContentTriggerCondition: React.FC<Props> = ({onConfirm, isReadOnly, value}) => {
  const {t} = useLucaTranslation()

  return (
    <>
      <Label label={t("interventions__interventions_check_notes_value_label")} />
      <OverlayEditField<TextDocumentContentInterventionUpdate>
        buttonLabelKey="edit_button"
        disabled={isReadOnly}
        dialogTitleKey="interventions__interventions_check_text_document_value_label_update_title"
        dialogDescriptionKey="interventions__interventions_check_notes_value_label_update_description"
        formFields={[
          {
            updateId: "value",
            value: value,
            validationRules: {
              required: true,
              validate: doesNotContainEmptyValues
            },
            type: OverlayEditFieldType.TEXT
          }
        ]}
        updateLoading={false}
        onUpdate={value => onConfirm(value.value)}
        renderValue={() => <TagsOnCards maxTags={10} tags={value.split(";")} />}
      />
    </>
  )
}
