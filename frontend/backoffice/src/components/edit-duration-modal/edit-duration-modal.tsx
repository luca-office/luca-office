import {css} from "@emotion/react"
import {inRange} from "lodash"
import * as React from "react"
import {Controller, UseFormMethods} from "react-hook-form"
import {
  Column,
  Columns,
  CustomSelect,
  FormErrorText,
  Label,
  Modal,
  Overlay,
  Paper,
  Text,
  TextInput
} from "shared/components"
import {InputType, TimeUnit} from "shared/enums"
import {SelectOption} from "shared/models"
import {Flex, inputHeight, spacingLarge, spacingSmall, spacingTiny} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes} from "shared/utils"
import {getReceptionDelayInSeconds} from "../../modules/scenario-emails/emails/email/email-delay-modal/email-delay-modal-utils"
import {EditDurationForm} from "./edit-duration-modal-container"

export interface ReceptionDelayConfig {
  readonly entityLanguageKey: LucaI18nLangKey
  readonly delayInSeconds: number
}

interface Props {
  readonly formMethods: UseFormMethods<EditDurationForm>
  readonly timeUnitOptions: SelectOption[]
  readonly onDismiss: () => void
  readonly areMaximumReceptionDelaysLoading: boolean
  readonly maximumReceptionDelay?: ReceptionDelayConfig
  readonly minDurationInSeconds?: number
  readonly moduleDuration?: number
  readonly onConfirm: (durationInSeconds: number) => void
  readonly titleKey: LucaI18nLangKey
  readonly descriptionKey: LucaI18nLangKey
  readonly descriptionLangOptions?: Record<string, unknown>
  readonly selectLabelKey: LucaI18nLangKey
}

const MAX_AMOUNT_OF_SECONDS = Math.pow(2, 32)

export const EditDurationModal: React.FC<Props> = ({
  formMethods,
  timeUnitOptions,
  areMaximumReceptionDelaysLoading,
  onDismiss,
  maximumReceptionDelay,
  minDurationInSeconds = 0,
  titleKey,
  descriptionKey,
  descriptionLangOptions,
  selectLabelKey,
  moduleDuration = MAX_AMOUNT_OF_SECONDS,
  onConfirm
}) => {
  const {control, errors, register, handleSubmit, setError} = formMethods

  const {t} = useLucaTranslation()

  const onSubmit = handleSubmit(({duration, timeUnit}) => {
    const delayInSeconds = getReceptionDelayInSeconds(timeUnit, duration)
    if (!inRange(delayInSeconds, minDurationInSeconds, moduleDuration)) {
      setError("duration", {
        shouldFocus: true,
        message: t("scenario_details__edit_duration_modal_error_text_maximum_duration")
      })
    } else if (maximumReceptionDelay && maximumReceptionDelay?.delayInSeconds > delayInSeconds) {
      // delays of other entities like email...
      setError("duration", {
        shouldFocus: true,
        message: t("scenario_details__edit_duration_modal_error_text", {
          entity: t(maximumReceptionDelay?.entityLanguageKey),
          durationInMinutes: convertSecondsToMinutes(maximumReceptionDelay?.delayInSeconds ?? 0)
        })
      })
    } else {
      onConfirm(delayInSeconds)
    }
  })

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "e") {
      // since e = exponential, it is usually allowed in number input, but not wanted in this case
      return evt.preventDefault()
    }
  }

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        onDismiss={onDismiss}
        confirmButtonDisabled={areMaximumReceptionDelaysLoading}
        title={t(titleKey)}
        onConfirm={onSubmit}>
        <Text customStyles={styles.text}>{t(descriptionKey, descriptionLangOptions)}</Text>
        <Label label={t(selectLabelKey)} />
        <Paper customStyles={[styles.text, styles.paper]}>
          <Columns customStyles={styles.columns}>
            <Column>
              <Controller
                render={({onChange, value}) => (
                  <CustomSelect
                    customStyles={styles.select}
                    onChange={onChange}
                    value={value}
                    name="timeUnit"
                    optionList={timeUnitOptions}
                  />
                )}
                control={control}
                name="timeUnit"
                rules={{required: true}}
                defaultValue={TimeUnit.Minute}
              />
            </Column>
            <Column>
              <TextInput
                ref={register({
                  min: 1,
                  required: true,
                  maxLength: {
                    value: 12,
                    message: t("scenario_details__edit_duration_modal_error_text_maximum_duration")
                  }
                })}
                customInputContainerStyles={styles.textInputContainer}
                customInputStyles={styles.textInput}
                isClearable={false}
                name="duration"
                onKeyDown={handleKeyDown}
                type={InputType.number}
                hasValidationError={!!errors.duration}
              />
              <FormErrorText customStyles={styles.formErrorText(errors?.duration?.message !== undefined)}>
                {errors?.duration?.message}
              </FormErrorText>
            </Column>
          </Columns>
        </Paper>
      </Modal>
    </Overlay>
  )
}
const styles = {
  modal: css({
    width: "50vw"
  }),
  columns: css(Flex.row, {
    alignItems: "flex-start",
    padding: spacingSmall,
    paddingBottom: spacingTiny
  }),
  formErrorText: (hasError: boolean) =>
    css({
      marginTop: hasError ? spacingTiny : "initial"
    }),
  text: css({
    marginBottom: spacingLarge
  }),
  paper: css({
    paddingBottom: spacingTiny
  }),
  select: css({
    width: "100%"
  }),
  textInputContainer: css({
    height: "initial"
  }),
  textInput: css({
    height: inputHeight
  })
}
