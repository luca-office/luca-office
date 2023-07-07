import {css} from "@emotion/react"
import * as React from "react"
import {Controller} from "react-hook-form"
import {CustomSelect, Modal, Overlay, Text, TextInput, Tooltip} from "shared/components"
import {InputType} from "shared/enums"
import {borderRadius, FontWeight, headerBoxShadow, spacing, spacingLarge, spacingMedium, TextSize} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {convertMinutesToSeconds} from "shared/utils"
import {useEventDelayModal} from "./hooks/use-event-delay-modal"

export interface EventDelayModalProps {
  readonly maxScenarioDuration: number
  readonly existingDurations: number[]
  readonly onDismiss: () => void
  readonly onSubmit: (activationDelayInSeconds: number) => void
  readonly delayInSeconds?: number
}

export const EventDelayModal: React.FC<EventDelayModalProps> = ({
  onSubmit,
  onDismiss,
  delayInSeconds,
  maxScenarioDuration,
  existingDurations
}) => {
  const {t} = useLucaTranslation()
  const {formMethods, unitOptions, isConfirmDisabled} = useEventDelayModal(delayInSeconds)
  const {register, handleSubmit, errors, control} = formMethods

  const handleUpdate = () => {
    const {delay} = control.getValues()

    onSubmit(convertMinutesToSeconds(delay))
    onDismiss()
  }
  const validationMaxRule = maxScenarioDuration > 0 ? {max: maxScenarioDuration} : {}
  const validateExistingEventAtTime = (time: string) =>
    !existingDurations.some(duration => duration === parseInt(time, 10))

  const getErrorKey = (): LucaI18nLangKey | undefined => {
    if (!errors || !errors.delay) {
      return undefined
    }

    // eslint-disable-next-line consistent-return
    return errors.delay.type !== "required" ? "validation__event_delay" : "validation__required"
  }

  const unitSelect = (
    <Controller
      render={({onChange, value}) => (
        <CustomSelect
          customStyles={styles.selectWrapper}
          name="delayUnit"
          onChange={onChange}
          value={value}
          optionList={unitOptions}
          labelKey={"events__delay_modal_delay_unit"}
          disabled={true} // locked, only minutes are valid here
        />
      )}
      control={control}
      rules={{required: true}}
      name="delayUnit"
      defaultValue={unitOptions[0].value}
    />
  )

  const delayAmountInput = (
    <TextInput
      ref={register({
        required: true,
        pattern: {
          value: /^[0-9]{1,7}$/i,
          message: t("validation__event_delay")
        },
        ...validationMaxRule,
        validate: validateExistingEventAtTime
      })}
      name="delay"
      errorKey={getErrorKey()}
      hasValidationError={!!errors?.delay}
      type={InputType.number}
      labelKey={"events__delay_modal_delay_title"}
      labelKeyOptions={{duration: maxScenarioDuration}}
      customErrorStyles={styles.errorMessage}
    />
  )

  return (
    <Overlay>
      <Modal
        customStyles={styles.modal}
        confirmButtonKey="create_button"
        dismissButtonKey="cancel"
        title={t("events__delay_modal_title")}
        onDismiss={onDismiss}
        confirmButtonDisabled={isConfirmDisabled}
        onConfirm={handleSubmit(handleUpdate)}>
        <div>
          <Text>
            {maxScenarioDuration > 0
              ? t("events__delay_modal_text", {duration: maxScenarioDuration})
              : t("events__delay_modal_text_no_max_duration")}
          </Text>
          <div css={styles.container}>
            <Text customStyles={styles.label}>{t("events__delay_modal_delay_section_title")}</Text>
            <div css={[styles.row, styles.grid, styles.innerContainer]}>
              <Tooltip title={t("events__delay_modal_tooltip")}>{unitSelect}</Tooltip>
              <div>{delayAmountInput}</div>
            </div>
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
  label: css({
    marginTop: spacingLarge,
    fontSize: TextSize.Small,
    fontWeight: FontWeight.Bold
  }),
  container: css({
    marginBottom: spacingLarge
  }),
  innerContainer: css({
    boxShadow: headerBoxShadow,
    padding: spacing(spacingLarge, spacingMedium),
    borderRadius: borderRadius,
    marginTop: 0
  }),
  errorMessage: css({
    textAlign: "right",
    width: "200%",
    marginLeft: "-100%"
  })
}
