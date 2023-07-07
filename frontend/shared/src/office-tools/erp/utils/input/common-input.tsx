import {css} from "@emotion/react"
import {partial} from "lodash-es"
import * as React from "react"
import {Control, Controller, UseFormMethods} from "react-hook-form"
import {
  AutoCompleteInput,
  BinaryUploadInput,
  CustomSelect,
  SingleDatePicker,
  TextInput,
  Tooltip
} from "../../../../components"
import {InputType, UploadFileType} from "../../../../enums"
import {Salutation} from "../../../../graphql/generated/globalTypes"
import {BinaryFile, ErpEntity, SelectOption} from "../../../../models"
import {
  backgroundColorBright,
  fontColor,
  foreignKeyColor,
  inputHeight,
  primaryKeyColor,
  spacingTiny
} from "../../../../styles"
import {LucaTFunction} from "../../../../translations"
import {
  convertCentsToEuro,
  convertEuroToCents,
  emailRegexPattern,
  isDefined,
  parseDateString,
  roundNumber,
  serialize,
  Subject
} from "../../../../utils"
import {getSalutationLabel} from "../common"

interface GetBinaryFileIdInputParams<T extends ErpEntity> {
  readonly binaryFile?: BinaryFile
  readonly formMethods: UseFormMethods<T>
  readonly required?: boolean
  readonly disabled?: boolean
  readonly onOpenAttachment?: (binaryFileId: UUID) => void
}

export const getBinaryFileIdInput = <T extends ErpEntity>({
  binaryFile,
  formMethods,
  required = true,
  disabled = false,
  onOpenAttachment
}: GetBinaryFileIdInputParams<T>): React.ReactNode => (
  <Controller
    render={({onChange}) => (
      <BinaryUploadInput
        placeholderColor={fontColor}
        binaryFile={binaryFile}
        disabled={disabled}
        onUpload={uploadBinary => onChange(uploadBinary.data.id)}
        onDelete={() => onChange(null)}
        uploadTooltipTitleKey={"erp_dataset__file_upload_title"}
        acceptedFileTypes={[UploadFileType.PDF, UploadFileType.Graphic]}
        onOpenBinary={onOpenAttachment}
      />
    )}
    control={formMethods.control as Control<Record<string, unknown>>}
    name={"binaryFileId"}
    rules={{required}}
    defaultValue={""}
  />
)

interface GetDatePickerParams<T extends ErpEntity> {
  readonly key: keyof T
  readonly formMethods: UseFormMethods<T>
  readonly required?: boolean
  readonly disabled?: boolean
  readonly onCopyToClipboard?: (value: string | number) => void
  readonly sectionScrollSubject: Subject<void>
}

export const getDatePicker = <T extends ErpEntity>({
  key,
  formMethods,
  required = true,
  disabled = false,
  onCopyToClipboard,
  sectionScrollSubject
}: GetDatePickerParams<T>) => {
  const datePickerRef = React.createRef<HTMLDivElement>()
  const calenderRef = React.createRef<HTMLInputElement>()

  const updateCalenderPosition = () => {
    if (datePickerRef.current && calenderRef.current) {
      const {top} = datePickerRef.current.getBoundingClientRect()
      calenderRef.current.style.top = `${top + inputHeight + spacingTiny}px`
    }
  }
  sectionScrollSubject.subscribe(updateCalenderPosition)

  return (
    <Controller
      render={({onChange, value}) => (
        <SingleDatePicker
          inputColor={fontColor}
          ref={datePickerRef}
          customStyles={styles.datePicker}
          value={value ? parseDateString(value) : undefined}
          onChange={date => onChange(serialize(date))}
          disabled={disabled}
          showCopyToClipboard={true}
          showIconOnHover={true}
          onCopyToClipboard={onCopyToClipboard}
          onCalendarOpen={updateCalenderPosition}
          calenderRef={calenderRef}
          hasValidationError={formMethods.errors?.[key] !== undefined}
        />
      )}
      control={formMethods.control as Control<Record<string, unknown>>}
      name={`${String(key)}`}
      rules={{
        required,
        validate: () => {
          const dueDate = formMethods.getValues("dueDate")
          const invoiceDate = formMethods.getValues("invoiceDate")
          return isDefined(dueDate) && isDefined(invoiceDate) ? dueDate >= invoiceDate : true
        }
      }}
    />
  )
}

interface GetSelectParams<T extends ErpEntity> {
  readonly key: keyof T
  readonly formMethods: UseFormMethods<T>
  readonly options: SelectOption[]
  readonly required?: boolean
  readonly disabled?: boolean
  readonly onCopyToClipboard?: (value: string | number) => void
}

export const getSelect = <T extends ErpEntity>({
  key,
  formMethods,
  options,
  required = true,
  disabled = false,
  onCopyToClipboard
}: GetSelectParams<T>): React.ReactNode => {
  const defaultValue = formMethods.getValues(`${String(key)}`)
  return (
    <Controller
      render={({onChange, value}) => (
        <CustomSelect
          customStyles={styles.select}
          customCopyToClipboardIconStyle={styles.inputContainer}
          onChange={onChange}
          value={value}
          optionList={options}
          disabled={disabled}
          showCopyToClipboard={true}
          showIconOnHover={true}
          hideDropdownIndicatorWhenDisabled={true}
          onCopyToClipboard={onCopyToClipboard}
        />
      )}
      control={formMethods.control as Control<Record<string, unknown>>}
      name={`${String(key)}`}
      rules={{required}}
      defaultValue={defaultValue ?? ""}
    />
  )
}

interface GetSalutationSelectParams<T extends ErpEntity> {
  readonly t: LucaTFunction
  readonly formMethods: UseFormMethods<T>
  readonly disabled?: boolean
  readonly onCopyToClipboard?: (value: string | number) => void
}

export const getSalutationSelect = <T extends ErpEntity>({
  t,
  formMethods,
  disabled,
  onCopyToClipboard
}: GetSalutationSelectParams<T>): React.ReactNode =>
  getSelect({
    key: "salutation" as keyof T,
    formMethods,
    options: [
      {
        value: Salutation.Mr,
        label: getSalutationLabel(t, Salutation.Mr)
      },
      {
        value: Salutation.Mrs,
        label: getSalutationLabel(t, Salutation.Mrs)
      },
      {
        value: Salutation.NonBinary,
        label: getSalutationLabel(t, Salutation.NonBinary)
      }
    ],
    disabled,
    onCopyToClipboard
  })

const getDefaultTextInput = <T extends ErpEntity>({
  t,
  key,
  formMethods,
  type,
  isPrimaryKey = false,
  required = true,
  disabled = false,
  navigateToEntity,
  showPrimaryKeyPlaceholder = false,
  onCopyToClipboard,
  isCreating = false,
  isFloat = false
}: Omit<GetTextInputParams<T>, "autoCompleteList">): React.ReactNode => {
  const isNumber = type === InputType.number
  const defaultValue = formMethods.getValues(`${String(key)})`)
  const isCopyToClipboardVisible = !(isCreating && isPrimaryKey)
  const handleChange = (onChange: (value: string | number) => void, evt: React.FocusEvent<HTMLInputElement>) => {
    const value =
      type === InputType.number && evt.target.value !== ""
        ? roundNumber(parseFloat(t("common_number_en", {number: evt.target.value})))
        : evt.target.value
    onChange(typeof value === "number" && !isFloat ? Math.round(value) : value)
  }

  return (
    <Controller
      render={({onChange, value}) => (
        <TextInput
          onBlur={partial(handleChange, onChange)}
          value={!showPrimaryKeyPlaceholder ? (isNumber && isDefined(value) ? `${value}` : value) : undefined}
          type={type}
          hasValidationError={!!formMethods.errors?.[key]}
          disabled={disabled || isPrimaryKey}
          showCopyToClipboard={isCopyToClipboardVisible}
          showIconOnHover={true}
          renderInputWrapper={
            navigateToEntity
              ? ({children}) => (
                  <div css={styles.inputWrapper} onClick={navigateToEntity}>
                    <Tooltip title={t("erp_dataset__navigate_to_dataset")}>{children}</Tooltip>
                  </div>
                )
              : undefined
          }
          placeholderKey={showPrimaryKeyPlaceholder ? "erp_dataset__primary_key_placeholder" : undefined}
          onCopyToClipboard={onCopyToClipboard}
          customInputStyles={[
            styles.input,
            isPrimaryKey && styles.primaryKeyInput,
            navigateToEntity && styles.foreignKeyInput
          ]}
          customInputContainerStyles={
            isPrimaryKey
              ? styles.primaryKeyInput
              : navigateToEntity
              ? styles.foreignKeyInputContainer
              : styles.inputContainer
          }
        />
      )}
      control={formMethods.control as Control<Record<string, unknown>>}
      name={`${String(key)}`}
      rules={{
        required: showPrimaryKeyPlaceholder && !isDefined(defaultValue) ? false : required,
        ...(isNumber && {min: 0})
      }}
      defaultValue={key === "id" ? undefined : defaultValue ?? ""}
    />
  )
}

const getAutoCompleteInput = <T extends ErpEntity>({
  t,
  key,
  formMethods,
  type,
  required = true,
  disabled = false,
  showPrimaryKeyPlaceholder = false,
  autoCompleteList,
  onCopyToClipboard,
  isFloat = false
}: Omit<GetTextInputParams<T>, "navigateToEntity">): React.ReactNode => {
  const defaultValue = formMethods.getValues(`${String(key)}`)
  const handleChange = (onChange: (value: string | number) => void, text: string) => {
    const value =
      type === InputType.number && text !== "" ? roundNumber(parseFloat(t("common_number_en", {number: text}))) : text
    onChange(typeof value === "number" && !isFloat ? Math.round(value) : value)
  }
  return (
    <Controller
      render={({onChange, value}) => (
        <AutoCompleteInput
          onChange={partial(handleChange, onChange)}
          value={
            !showPrimaryKeyPlaceholder
              ? type === InputType.number && isDefined(value)
                ? `${value}`
                : value
              : undefined
          }
          items={autoCompleteList ?? []}
          hasValidationError={!!formMethods.errors?.[key]}
          disabled={disabled || showPrimaryKeyPlaceholder}
          showCopyToClipboard={true}
          placeholderKey={showPrimaryKeyPlaceholder ? "erp_dataset__primary_key_placeholder" : undefined}
          onCopyToClipboard={onCopyToClipboard}
          showAllResultsForEmptySearch={true}
        />
      )}
      control={formMethods.control as Control<Record<string, unknown>>}
      name={`${String(key)}`}
      rules={{required: showPrimaryKeyPlaceholder && !isDefined(defaultValue) ? false : required}}
      defaultValue={defaultValue ?? ""}
    />
  )
}

interface GetTextInputParams<T extends ErpEntity> {
  readonly t: LucaTFunction
  readonly key: keyof T
  readonly formMethods: UseFormMethods<T>
  readonly type: InputType
  readonly isPrimaryKey?: boolean
  readonly required?: boolean
  readonly disabled?: boolean
  readonly navigateToEntity?: () => void
  readonly autoCompleteList?: string[]
  readonly showPrimaryKeyPlaceholder?: boolean
  readonly onCopyToClipboard?: (value: string | number) => void
  readonly isCreating?: boolean
  readonly isFloat?: boolean
}

export const getTextInput = <T extends ErpEntity>({
  autoCompleteList,
  ...params
}: GetTextInputParams<T>): React.ReactNode =>
  autoCompleteList ? getAutoCompleteInput({autoCompleteList, ...params}) : getDefaultTextInput(params)

interface GetCentInputParams<T extends ErpEntity> {
  readonly t: LucaTFunction
  readonly key: keyof T
  readonly formMethods: UseFormMethods<T>
  readonly required?: boolean
  readonly disabled?: boolean
  readonly onCopyToClipboard?: (value: string | number) => void
  readonly isFloat?: boolean
}

export const getCentInput = <T extends ErpEntity>({
  t,
  key,
  formMethods,
  required = true,
  disabled = false,
  onCopyToClipboard,
  isFloat = false
}: GetCentInputParams<T>): React.ReactNode => {
  const defaultValue = formMethods.getValues(`${String(key)}`)
  const handleChange = (onChange: (cents: string | number) => void, evt: React.FocusEvent<HTMLInputElement>) => {
    const cents = evt.target.value
      ? convertEuroToCents(parseFloat(t("common_number_en", {number: evt.target.value})))
      : evt.target.value
    onChange(typeof cents === "number" && !isFloat ? Math.round(cents) : cents)
  }
  return (
    <Controller
      render={({onChange, value}) => (
        <TextInput
          onBlur={partial(handleChange, onChange)}
          value={isDefined(value) ? t("common_number", {number: convertCentsToEuro(value)}) : value}
          type={InputType.text}
          hasValidationError={!!formMethods.errors?.[key]}
          disabled={disabled}
          showCopyToClipboard={true}
          onCopyToClipboard={onCopyToClipboard}
          showIconOnHover={true}
          customInputStyles={styles.input}
          customInputContainerStyles={styles.inputContainer}
          useValueChangeCount={false}
        />
      )}
      control={formMethods.control as Control<Record<string, unknown>>}
      name={`${String(key)}`}
      rules={{required, min: 0}}
      defaultValue={defaultValue ?? ""}
    />
  )
}

interface GetEmailInputParams<T extends ErpEntity> {
  readonly t: LucaTFunction
  readonly key: keyof T
  readonly formMethods: UseFormMethods<T>
  readonly required?: boolean
  readonly disabled?: boolean
  readonly onCopyToClipboard?: (value: string | number) => void
}

export const getEmailInput = <T extends ErpEntity>({
  t,
  key,
  formMethods,
  required = true,
  disabled = false,
  onCopyToClipboard
}: GetEmailInputParams<T>): React.ReactNode => {
  const defaultValue = formMethods.getValues(`${String(key)}`)
  return (
    <Controller
      render={({onChange, value}) => (
        <TextInput
          onChange={onChange}
          value={value}
          type={InputType.text}
          hasValidationError={!!formMethods.errors?.[key]}
          disabled={disabled}
          showCopyToClipboard={true}
          onCopyToClipboard={onCopyToClipboard}
          showIconOnHover={true}
          customInputStyles={styles.input}
          customInputContainerStyles={styles.inputContainer}
        />
      )}
      control={formMethods.control as Control<Record<string, unknown>>}
      name={`${String(key)}`}
      rules={{
        required,
        validate: value => {
          if (!required && (!isDefined(value) || value === "")) {
            return true
          }
          return emailRegexPattern.test(value)
        }
      }}
      defaultValue={defaultValue ?? ""}
    />
  )
}

const styles = {
  select: css({
    width: "100%",

    ".single-value": {
      color: fontColor
    }
  }),
  datePicker: css({
    ".react-calendar": {
      position: "fixed"
    },
    ".react-date-picker": {
      width: "100%",
      height: inputHeight
    },
    ".react-date-picker__wrapper": {
      height: "100%",
      boxSizing: "border-box",
      padding: spacingTiny
    }
  }),
  inputWrapper: css({
    width: "100%",

    "&, input": {
      cursor: "pointer"
    }
  }),
  inputContainer: css({
    backgroundColor: backgroundColorBright
  }),
  input: css({
    color: fontColor,
    backgroundColor: "initial"
  }),
  primaryKeyInput: css({
    backgroundColor: primaryKeyColor
  }),
  foreignKeyInputContainer: css({
    backgroundColor: foreignKeyColor
  }),
  foreignKeyInput: css({
    pointerEvents: "none"
  })
}
