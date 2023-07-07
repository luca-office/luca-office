import * as React from "react"
import {Controller} from "react-hook-form"
import {
  Column,
  Columns,
  CustomSelect,
  FormErrorText,
  Label,
  Modal,
  Overlay,
  Paper,
  SelectableCard,
  SelectionIconType,
  Text,
  TextInput,
  Tooltip
} from "shared/components"
import {IconName, InputType, TimeUnit} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Email, EmailOpeningIntervention, InterventionWithTimeOffset} from "shared/models"
import {Flex} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {secondsToGivenTimeUnit} from "shared/utils"
import {MAX_RECEPTION_DELAY} from "../../../../scenarios/config/delays-config"
import {emailDelayModalStyles} from "./email-delay-modal.style"
import {getTimeUnitLabel} from "./email-delay-modal-utils"
import {EmailTemporalStage, useEmailDelayModal} from "./hooks/use-email-delay-modal"

export interface EmailDelayModalProps {
  readonly email: Email
  readonly emailOpeningInterventions: EmailOpeningIntervention[]
  readonly onDismiss: () => void
}

export const EmailDelayModal: React.FC<EmailDelayModalProps> = ({email, onDismiss, emailOpeningInterventions}) => {
  const {t} = useLucaTranslation()
  const {
    formMethods,
    maxFutureDelay,
    receptionDelayOptions,
    selectedTemporalStage,
    toggleTemporalStage,
    updateEmailDelay
  } = useEmailDelayModal(email, emailOpeningInterventions, onDismiss)

  const {register, handleSubmit, control, errors} = formMethods

  const directory = email.directory

  const isPresentSelected = selectedTemporalStage === EmailTemporalStage.Present
  const isFutureSelected = selectedTemporalStage === EmailTemporalStage.Future
  const isTrashOrSentDirectory = directory === EmailDirectory.Trash || directory === EmailDirectory.Sent

  const isTemporalStageSelected = (stage: EmailTemporalStage) => selectedTemporalStage === stage
  const currentDirectoryLabelKey = `email__directory_${directory.toLocaleLowerCase()}` as LucaI18nLangKey

  const onSubmit = handleSubmit(form => updateEmailDelay(form))

  return (
    <Overlay>
      <Modal
        {...{
          customStyles: emailDelayModalStyles.modal,
          confirmButtonKey: "confirm_button",
          dismissButtonKey: "cancel",
          title: t("email__reception_delay_edit_label"),
          onDismiss,
          onConfirm: onSubmit
        }}>
        <div css={Flex.column}>
          <Text customStyles={emailDelayModalStyles.instruction}>{t("email__delay_instruction")}</Text>
          <Label label={t("email__reception_delay_choose_time_label")} />
          <Columns>
            <Column>
              <SelectableCard
                customStyles={emailDelayModalStyles.selectableCard}
                selected={isTemporalStageSelected(EmailTemporalStage.Past)}
                selectionIconType={SelectionIconType.RADIO}
                onClick={() => toggleTemporalStage(EmailTemporalStage.Past)}
                title={t("email__reception_delay_choose_time_past")}
                text={t("email__reception_delay_choose_time_past_hint")}
              />
            </Column>
            <Column>
              <Tooltip
                inactive={!isTrashOrSentDirectory}
                title={t("events__delay_modal_tooltip_temporal_stage_disabled", {
                  directory: t(currentDirectoryLabelKey)
                })}>
                <SelectableCard
                  customStyles={emailDelayModalStyles.selectableCard}
                  selected={isTemporalStageSelected(EmailTemporalStage.Present)}
                  disabled={isTrashOrSentDirectory}
                  selectionIconType={SelectionIconType.RADIO}
                  onClick={() => toggleTemporalStage(EmailTemporalStage.Present)}
                  text={t("email__reception_delay_choose_time_present_hint")}
                  title={t("email__reception_delay_choose_time_present")}
                />
              </Tooltip>
            </Column>
            <Column>
              <Tooltip
                inactive={!isTrashOrSentDirectory}
                title={t("events__delay_modal_tooltip_temporal_stage_disabled", {
                  directory: t(currentDirectoryLabelKey)
                })}>
                <SelectableCard
                  customStyles={emailDelayModalStyles.selectableCard}
                  selected={isTemporalStageSelected(EmailTemporalStage.Future)}
                  disabled={isTrashOrSentDirectory}
                  selectionIconType={SelectionIconType.RADIO}
                  onClick={() => toggleTemporalStage(EmailTemporalStage.Future)}
                  text={t("email__reception_delay_choose_time_future_hint", {
                    durationInMinutes: maxFutureDelay
                      .map(delay => Math.round(secondsToGivenTimeUnit(TimeUnit.Minute, delay)))
                      .getOrElse(0)
                  })}
                  title={t("email__reception_delay_choose_time_future")}
                />
              </Tooltip>
            </Column>
          </Columns>
          <Label
            customStyles={emailDelayModalStyles.selectTimeWrapperLabel}
            label={t(getTimeUnitLabel(selectedTemporalStage))}
          />
          <Paper customStyles={emailDelayModalStyles.selectTimeWrapper}>
            <Columns>
              <Column customStyles={emailDelayModalStyles.unitSelectColumn} flexGrow={0}>
                <Controller
                  render={({onChange, value}) => (
                    <CustomSelect
                      onChange={onChange}
                      value={value}
                      customStyles={emailDelayModalStyles.unitSelect}
                      labelKey="events__delay_modal_delay_unit"
                      disabled={isPresentSelected}
                      name={"timeUnit"}
                      optionList={receptionDelayOptions.slice(0, 3)}
                    />
                  )}
                  control={control}
                  name={"timeUnit"}
                  rules={{required: true}}
                  defaultValue={TimeUnit.Second}
                />
              </Column>
              <Column>
                <TextInput
                  ref={register({
                    min: !isPresentSelected ? 1 : 0,
                    max: MAX_RECEPTION_DELAY
                  })}
                  isClearable={false}
                  name="receptionDelay"
                  icon={isPresentSelected ? IconName.LockClosed : undefined}
                  type={InputType.number}
                  labelKeyOptions={
                    maxFutureDelay.isDefined()
                      ? {
                          duration: maxFutureDelay
                            .map(delay => Math.round(secondsToGivenTimeUnit(TimeUnit.Minute, delay)))
                            .orUndefined()
                        }
                      : undefined
                  }
                  labelKey={
                    isFutureSelected ? "events__delay_modal_delay_title_future" : "events__delay_modal_delay_title"
                  }
                  disabled={isPresentSelected}
                  customStyles={emailDelayModalStyles.input}
                  customInputContainerStyles={emailDelayModalStyles.inputContainer}
                  hasValidationError={errors.receptionDelay !== undefined}
                />
              </Column>
            </Columns>
            <FormErrorText customStyles={emailDelayModalStyles.error}>{errors.receptionDelay?.message}</FormErrorText>
          </Paper>
        </div>
      </Modal>
    </Overlay>
  )
}
