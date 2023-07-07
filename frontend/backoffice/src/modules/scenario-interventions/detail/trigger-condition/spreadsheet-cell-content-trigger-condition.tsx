import * as React from "react"
import {Label} from "shared/components"
import {TagsOnCards} from "shared/components/tags-on-card/tags-on-cards"
import {NotesContentInterventionUpdate} from "shared/graphql/generated/globalTypes"
import {useLucaTranslation} from "shared/translations"
import {OverlayEditField, OverlayEditFieldType} from "../../../../components"

interface Props {
  readonly tags: string[]
  readonly isReadOnly: boolean
  readonly onConfirm: (value: string) => void
}

export const SpreadsheetCellContentTriggerCondition: React.FC<Props> = ({onConfirm, isReadOnly, tags}) => {
  const {t} = useLucaTranslation()
  return (
    <>
      <Label label={t("interventions__interventions_check_notes_value_label")} />
      <OverlayEditField<NotesContentInterventionUpdate>
        buttonLabelKey="edit_button"
        disabled={isReadOnly}
        dialogTitleKey="interventions__interventions_check_spreadsheet_edit_overlay_title"
        dialogDescriptionKey="interventions__interventions_check_notes_value_label_update_description"
        formFields={[
          {
            updateId: "value",
            value: tags.join(";"),
            type: OverlayEditFieldType.TEXTAREA
          }
        ]}
        updateLoading={false}
        onUpdate={value => onConfirm(value.value)}
        renderValue={() => <TagsOnCards maxTags={10} tags={tags} />}
      />
    </>
  )
}
