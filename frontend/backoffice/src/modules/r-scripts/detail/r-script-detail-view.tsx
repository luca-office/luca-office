import {css} from "@emotion/react"
import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  deleteEntityButtonStyles,
  Label,
  OrlyButtonContainer,
  TextInput
} from "shared/components"
import {IconName, InputType} from "shared/enums"
import {RScriptUpdate} from "shared/graphql/generated/globalTypes"
import {RScript} from "shared/models"
import {CustomStyle, spacingLarge, spacingMedium, spacingSmall} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  OverlayEditCompositeFieldConfig,
  OverlayEditField,
  OverlayEditFieldType
} from "../../../components"
import {RScriptForm} from "./r-script-detail-view-container"

export interface Props {
  readonly t: LucaTFunction
  readonly rScript: RScript
  readonly isUpdateLoading: boolean
  readonly updateRScript: (update: RScriptUpdate) => Promise<unknown>
  readonly deleteRScript: () => void
  readonly archiveRScript: () => void
  readonly formMethods: UseFormMethods<RScriptForm>
}

export const RScriptDetailView: React.FC<Props & CustomStyle> = props => {
  const {t, rScript, isUpdateLoading, updateRScript, deleteRScript, archiveRScript, formMethods, customStyles} = props
  const isEditable = rScript.isEditable
  const rScriptUpdate: RScriptUpdate = {
    title: rScript.title,
    description: rScript.description,
    gitCommitHash: rScript.gitCommitHash,
    version: rScript.version
  }
  const descriptionField: OverlayEditCompositeFieldConfig = {
    updateId: "description",
    value: rScript.description,
    labelKey: "description",
    type: OverlayEditFieldType.TEXTAREA
  }

  const {register, handleSubmit, errors} = formMethods

  const onBlur = handleSubmit(({gitCommitHash, version}) => updateRScript({...rScriptUpdate, gitCommitHash, version}))

  return (
    <Card customStyles={customStyles}>
      <CardHeader hasShadow hasGreyBackground customStyles={styles.header}>
        {rScript.title !== "" ? rScript.title : t("r_scripts__title_placeholder")}
        <OrlyButtonContainer
          iconColor="white"
          iconName={isEditable ? IconName.Trash : IconName.Archive}
          customButtonStyles={deleteEntityButtonStyles.trashButton}
          modalTitleKey={isEditable ? undefined : "dialog__archive_element_title"}
          modalTextKey={isEditable ? undefined : "dialog__archive_element_text"}
          confirmButtonKey={isEditable ? undefined : "dialog__archive_element_title"}
          onConfirm={isEditable ? deleteRScript : archiveRScript}
        />
      </CardHeader>
      <CardContent customStyles={styles.content}>
        <Label label={t("title")} icon={isEditable ? IconName.EditPencil : IconName.LockClosed} />
        <InlineEditableHeaderContainer
          onConfirm={title => updateRScript({...rScriptUpdate, title})}
          customInnerInputStyles={styles.inlineFieldPlaceholder}
          text={rScript.title}
          disabled={!isEditable}
          customStyles={styles.inlineField}
          placeholder={t("r_scripts__title_placeholder")}
        />
        <Label
          label={t("description")}
          icon={isEditable ? IconName.EditPencil : IconName.LockClosed}
          customStyles={styles.spacedLabel}
        />
        <OverlayEditField<RScriptUpdate>
          formFields={[descriptionField]}
          fieldLabelKey="description"
          dialogTitleKey="description"
          onUpdate={(update: Partial<RScriptUpdate>) => updateRScript({...rScriptUpdate, ...update})}
          updateLoading={isUpdateLoading}
          disabled={!isEditable}
          renderValue={() => (
            <InlineEditableTextareaContainer
              customWrappedTextareaStyles={{minHeight: 0}}
              text={rScript.description}
              readOnly={true}
              disabled={!isEditable}
            />
          )}
          customStyles={rScript.description !== "" ? styles.inlineField : undefined}
          displayPlain={true}
          placeholderKey={"r_scripts__description_placeholder"}
          displayPlaceholder={rScript.description === ""}
        />
        <TextInput
          labelKey="r_scripts__details_version_label"
          disabled={!isEditable}
          customStyles={styles.marginTopMedium}
          customInputContainerStyles={styles.marginTop0}
          isClearable={false}
          name="version"
          placeholderKey="r_scripts__details_version_label"
          ref={register({required: true})}
          hasValidationError={!!errors.version}
          type={InputType.text}
          onBlur={onBlur}
        />
        <TextInput
          labelKey="r_scripts__details_hash_label"
          placeholderKey="r_scripts__details_hash_label_placeholder"
          disabled={!isEditable}
          customStyles={styles.marginTopMedium}
          customInputContainerStyles={styles.marginTop0}
          name="gitCommitHash"
          hasValidationError={!!errors.gitCommitHash}
          isClearable={false}
          ref={register({required: true})}
          type={InputType.text}
          onBlur={onBlur}
        />
      </CardContent>
      <CardFooter />
    </Card>
  )
}

const styles = {
  header: css({
    justifyContent: "space-between"
  }),
  content: css({
    padding: spacingLarge,
    boxSizing: "border-box",
    justifyContent: "flex-start"
  }),
  inlineField: css({
    marginLeft: -spacingSmall,
    flexGrow: 0
  }),
  inlineFieldPlaceholder: css({
    "::placeholder": {
      fontSize: 20
    }
  }),
  spacedLabel: css({
    marginTop: spacingLarge,
    overflow: "initial"
  }),
  marginTopMedium: css({
    marginTop: spacingMedium
  }),
  marginTop0: css({
    marginTop: 0
  }),
  textArea: css({
    resize: "none",
    display: "flex",
    flexGrow: 0
  })
}
