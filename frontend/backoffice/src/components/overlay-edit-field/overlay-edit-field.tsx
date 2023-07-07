import {css} from "@emotion/react"
import isEqual from "lodash-es/isEqual"
import * as React from "react"
import {ReactNode} from "react"
import {RegisterOptions, useForm, ValidationRule} from "react-hook-form"
import {CustomSelect, Modal, ReadonlyActionField, Text, TextArea, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {SelectOption} from "shared/models"
import {CustomStyle, spacingMedium, spacingSmall, spacingTiny} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {some} from "shared/utils"
import {CSSInterpolation} from "@emotion/serialize"

export enum OverlayEditFieldType {
  TEXT,
  SELECT,
  PASSWORD,
  TEXTAREA,
  EMAIL
  // this might be extended by checkboxes- none needed atm
}

export interface OverlayEditFieldConfig {
  readonly value: string
  readonly updateId: string
  readonly options?: SelectOption[] // for usage in <select>
  readonly labelKey?: LucaI18nLangKey
  readonly placeholderKey?: LucaI18nLangKey
  readonly validationRules?: RegisterOptions
  readonly onChangeHandler?: (value: string) => void
  readonly customStyles?: CSSInterpolation
  readonly renderHeader?: () => React.ReactNode
  readonly ref?: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>
}

interface OverlayTextAreaEditFieldConfig {
  readonly customStyleOnlyTextArea?: CSSInterpolation
}

export type OverlayEditCompositeFieldConfig = (
  | ({type: OverlayEditFieldType.TEXTAREA} & OverlayTextAreaEditFieldConfig)
  | {type: Exclude<OverlayEditFieldType, OverlayEditFieldType.TEXTAREA>}
) &
  OverlayEditFieldConfig

export interface OverlayEditFieldProps<T> extends CustomStyle {
  readonly renderValue: () => JSX.Element | ReactNode
  readonly dialogTitleKey: LucaI18nLangKey
  readonly updateLoading: boolean
  readonly formFields: OverlayEditCompositeFieldConfig[]
  readonly onUpdate: (update: T) => void
  readonly customModalStyles?: CSSInterpolation
  readonly customModalContentStyles?: CSSInterpolation
  readonly customWrapperStyles?: CSSInterpolation
  readonly buttonLabelKey?: LucaI18nLangKey
  readonly dialogDescriptionKey?: LucaI18nLangKey
  readonly disabled?: boolean
  readonly displayPlaceholder?: boolean
  readonly displayPlain?: boolean
  readonly fieldLabelKey?: LucaI18nLangKey
  readonly modalFooter?: JSX.Element
  readonly overlayFormDisabled?: boolean
  readonly placeholderKey?: LucaI18nLangKey
}

export function OverlayEditField<T>({
  customStyles,
  buttonLabelKey = "edit_button",
  dialogTitleKey,
  dialogDescriptionKey,
  fieldLabelKey,
  renderValue,
  updateLoading,
  formFields,
  onUpdate,
  displayPlain, //do not render special styling like box or shadow
  disabled,
  customModalStyles,
  customModalContentStyles,
  customWrapperStyles,
  displayPlaceholder,
  modalFooter,
  placeholderKey,
  overlayFormDisabled
}: OverlayEditFieldProps<T>) {
  const [dialogVisible, setDialogVisible] = React.useState(false)
  const [fields, updateFields] = React.useState(formFields)
  const {t} = useLucaTranslation()

  const formMethods = useForm()
  const {register, handleSubmit, errors} = formMethods

  const prevFields = React.useRef<OverlayEditCompositeFieldConfig[]>(formFields)
  const preventEnterSubmit = fields?.some(field => field.type === OverlayEditFieldType.TEXTAREA)
  const autoFocus = fields.length === 1

  React.useEffect(() => {
    if (!isEqual(fields, formFields)) {
      updateFields(formFields)
    }
  }, [formFields])

  const showDialog = () => {
    prevFields.current = fields
    setDialogVisible(true)
  }
  const handleDialogDismiss = () => {
    setDialogVisible(false)
    updateFields(prevFields.current)
  }

  const confirmHandler = () => {
    const update: {[key: string]: string | boolean} = {}

    fields.forEach(field => {
      let updateValue = field.value

      if (typeof field.value === "string") {
        updateValue = field.value.trim()
      }

      update[field.updateId] = updateValue
    })
    onUpdate(update as unknown as T)
    setDialogVisible(false)
  }

  const renderField = (formField: OverlayEditCompositeFieldConfig) => {
    const setRef = (ref: HTMLInputElement | HTMLTextAreaElement | null) => {
      if (formField.type !== OverlayEditFieldType.SELECT && formField.ref !== undefined) {
        formField.ref.current = ref
      }
    }

    const changeHandler = (value: string) => {
      const update = [...fields].map(field => {
        if (field.onChangeHandler) {
          field.onChangeHandler(value)
        }
        return {...field, ...(field.updateId === formField.updateId ? {value} : {})}
      })
      updateFields(update)
    }

    switch (formField.type) {
      case OverlayEditFieldType.SELECT:
        return formField.options ? (
          <CustomSelect
            labelKey={formField.labelKey}
            value={formField.value}
            onChange={changeHandler}
            key={`${formField.updateId}-${formField.labelKey}`}
            optionList={formField.options}
            disabled={disabled || overlayFormDisabled}
            customStyles={[styles.field, formField.customStyles]}
          />
        ) : null
      case OverlayEditFieldType.TEXTAREA:
        return (
          <TextArea
            ref={ref => {
              register(formField.validationRules)(ref)
              setRef(ref)
            }}
            labelKey={formField.labelKey}
            placeholder={formField.placeholderKey ? t(formField.placeholderKey) : undefined}
            value={formField.value}
            onChange={evt => changeHandler(evt.currentTarget.value)}
            key={`${formField.updateId}-${formField.labelKey}`}
            disabled={disabled || overlayFormDisabled}
            rows={5}
            name={`${formField.updateId}-${formField.labelKey}`}
            customStyles={[styles.field, formField.customStyles]}
            customStyleOnlyTextArea={[styles.fieldTextArea, formField.customStyleOnlyTextArea]}
            autoFocus={autoFocus}
            renderHeader={formField.renderHeader}
          />
        )

      case OverlayEditFieldType.EMAIL:
        return (
          <TextInput
            ref={ref => {
              register(formField.validationRules)(ref)
              setRef(ref)
            }}
            name="email"
            hasValidationError={!!errors?.email}
            type={InputType.email}
            labelKey={formField.labelKey}
            placeholderKey={formField.placeholderKey}
            value={formField.value}
            onChange={changeHandler}
            key={`${formField.updateId}-${formField.labelKey}`}
            disabled={disabled || overlayFormDisabled}
            customStyles={[styles.field, formField.customStyles]}
            autoFocus={autoFocus}
          />
        )
      case OverlayEditFieldType.TEXT:
      case OverlayEditFieldType.PASSWORD:
      default:
        const inputKey = `${formField.updateId}-${formField.labelKey}`
        return (
          <TextInput
            ref={ref => {
              register(formField.validationRules)(ref)
              setRef(ref)
            }}
            type={formField.type === OverlayEditFieldType.TEXT ? InputType.text : InputType.password}
            labelKey={formField.labelKey}
            placeholderKey={formField.placeholderKey}
            hasValidationError={!!errors[inputKey]}
            value={formField.value}
            onChange={changeHandler}
            key={inputKey}
            name={inputKey}
            disabled={disabled || overlayFormDisabled}
            customStyles={[styles.field, formField.customStyles]}
            autoFocus={autoFocus}
          />
        )
    }
  }

  return (
    <div css={customWrapperStyles} className="overlay-edit-field">
      <ReadonlyActionField
        buttonLabel={!displayPlain ? t(buttonLabelKey) : undefined}
        label={!displayPlain && !!fieldLabelKey ? t(fieldLabelKey) : undefined}
        onClick={!disabled ? showDialog : undefined}
        renderValue={renderValue}
        renderPlaceholder={displayPlaceholder}
        placeholderKey={displayPlaceholder ? placeholderKey : undefined}
        customStyles={customStyles}
        displayPlain={displayPlain}
      />
      {dialogVisible && (
        <Modal
          customStyles={[styles.modal, dialogDescriptionKey && styles.modalWithDescription, customModalStyles]}
          customContentStyles={customModalContentStyles}
          title={t(dialogTitleKey)}
          confirmButtonDisabled={updateLoading}
          hideFooter={overlayFormDisabled}
          onConfirm={
            some(field => field.type === OverlayEditFieldType.EMAIL || field.validationRules !== undefined, fields)
              ? handleSubmit(confirmHandler)
              : confirmHandler
          }
          onDismiss={handleDialogDismiss}
          preventSubmitOnEnter={preventEnterSubmit}>
          {dialogDescriptionKey && <Text customStyles={styles.description}>{t(dialogDescriptionKey)}</Text>}
          <div css={[styles.fields, fields.length > 1 && styles.fieldGrid]} className={"fields"}>
            {fields.map(renderField)}
          </div>

          {!!modalFooter && <div css={styles.modalFooter}>{modalFooter}</div>}
        </Modal>
      )}
    </div>
  )
}

const styles = {
  modal: css({
    width: 600
  }),
  modalWithDescription: css({
    header: {
      marginBottom: spacingTiny
    }
  }),
  description: css({
    marginBottom: spacingMedium
  }),
  fields: css({
    input: {
      width: "100%"
    },
    textarea: {
      width: "100%"
    }
  }),
  fieldGrid: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, 270px)",
    gridColumnGap: spacingMedium
  }),
  field: css({
    marginBottom: spacingSmall,
    width: "100%",
    resize: "none",
    textIndent: 0
  }),
  fieldTextArea: css({
    // default margin bottom of 48 (40 + 8 from field above)
    marginBottom: 40
  }),
  modalFooter: css({
    width: "100%",
    marginBottom: spacingMedium
  })
}
