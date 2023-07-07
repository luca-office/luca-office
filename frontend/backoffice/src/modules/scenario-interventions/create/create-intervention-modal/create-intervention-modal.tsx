import {css} from "@emotion/react"
import {omit} from "lodash-es"
import * as React from "react"
import {Controller, UseFormMethods} from "react-hook-form"
import {Column, Columns, CustomSelect, FormErrorText, Label, Modal, Paper, Text, TextInput} from "shared/components"
import {IconName, InputType, TimeUnit} from "shared/enums"
import {SelectOption} from "shared/models"
import {
  boxHeightSmaller,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {emailRegexPattern} from "shared/utils"
import {interventionTimeOptions} from "../../config/time"
import {TriggerCondition} from "../../detail/trigger-condition/trigger-condition"

export interface CreateInterventionModalProps {
  readonly creationIsLoading: boolean
  readonly formMethods: UseFormMethods<InterventionCreationBaseFormType>
  readonly onConfirm: (creation: InterventionCreationBaseFormType) => void
  readonly onDismiss: () => void
  readonly timeOffsetDescription: string
  readonly titleKey: LucaI18nLangKey
  readonly triggerConditionConfig: TriggerConditionConfig
  readonly hideTimeOffset?: boolean
  readonly customDescriptionKey?: LucaI18nLangKey
}

export interface TriggerConditionConfig {
  readonly descriptionKey: LucaI18nLangKey
  readonly icon: IconName
  readonly renderCondition?: () => JSX.Element
  readonly titleKey: LucaI18nLangKey
  readonly titleKeyOptions?: Record<string, any>
}

export interface InterventionCreationBaseFormType {
  readonly title: string
  readonly timeOffset: number
  readonly timeUnit: TimeUnit
  readonly sender: string
  readonly content: string
}

export const CreateInterventionModal = ({
  creationIsLoading,
  customDescriptionKey,
  onConfirm,
  onDismiss,
  formMethods,
  hideTimeOffset,
  triggerConditionConfig,
  timeOffsetDescription,
  titleKey
}: CreateInterventionModalProps) => {
  const {t} = useLucaTranslation()

  const {register, errors, handleSubmit, control} = formMethods

  const onSubmit = handleSubmit(creation => {
    onConfirm(creation)
  })

  const timeUnitOptions: SelectOption[] = interventionTimeOptions.map(config => ({
    ...omit(config, "labelKey"),
    label: t(config.labelKey)
  }))

  return (
    <Modal
      confirmButtonKey="interventions__interventions_create_modal_confirm_button"
      customStyles={styles.modal}
      customButtonStyles={styles.confirmButton}
      customHeaderStyles={styles.contentPadding}
      customContentStyles={[styles.content, styles.contentPadding]}
      customFooterStyles={[styles.footer, styles.contentPadding]}
      title={t(titleKey)}
      onDismiss={onDismiss}
      isConfirmButtonLoading={creationIsLoading}
      confirmButtonDisabled={creationIsLoading}
      onConfirm={onSubmit}>
      <Text customStyles={styles.hint} size={TextSize.Small}>
        {t(customDescriptionKey ?? "interventions__interventions_create_modal_description")}
      </Text>

      <TextInput
        name="title"
        ref={register({
          required: true
        })}
        labelKey="interventions__interventions_create_modal_title"
        hasValidationError={errors.title !== undefined}
        placeholderKey="title"
        type={InputType.text}
      />
      {!hideTimeOffset && (
        <>
          <Label customStyles={styles.label} label={t("interventions__interventions_table_time_offset")} />
          <Paper customStyles={[styles.text, styles.paper]}>
            <Text>{timeOffsetDescription}</Text>
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
                    required: true
                  })}
                  isClearable={false}
                  name="timeOffset"
                  type={InputType.number}
                  hasValidationError={!!errors.timeOffset}
                />
                <FormErrorText customStyles={styles.formErrorText}>{errors.timeOffset?.message}</FormErrorText>
              </Column>
            </Columns>
          </Paper>
        </>
      )}

      <TriggerCondition
        customStyles={styles.trigger}
        titleKey={triggerConditionConfig.titleKey}
        titleKeyOptions={triggerConditionConfig.titleKeyOptions}
        descriptionKey={triggerConditionConfig.descriptionKey}
        renderCondition={triggerConditionConfig.renderCondition}
        icon={triggerConditionConfig.icon}
      />
      <Label customStyles={styles.label} label={t("interventions__interventions_create_modal_new_mail_label")} />
      <Paper customStyles={[styles.text, styles.paper]}>
        <Text>{t("interventions__interventions_create_modal_new_mail_description")}</Text>
        <Columns customStyles={styles.interventionMailColumn}>
          <Column>
            <TextInput
              labelKey="email__directory_sender"
              isClearable={false}
              placeholderKey="email__directory_sender"
              name="sender"
              ref={register({
                required: true,
                pattern: {
                  value: emailRegexPattern,
                  message: t("validation__email_format")
                }
              })}
              type={InputType.text}
              hasValidationError={!!errors.sender}
            />
          </Column>
          <Column>
            <TextInput
              labelKey="email__directory"
              isClearable={false}
              icon={IconName.LockClosed}
              disabled={true}
              type={InputType.text}
              value={t("email__directory_inbox")}
            />
          </Column>
        </Columns>
      </Paper>
    </Modal>
  )
}

const styles = {
  modal: css({
    width: "60vw",
    maxHeight: "80vh",
    padding: spacing(spacingMedium, 0)
  }),
  confirmButton: css({
    padding: spacing(spacingSmall, spacingMedium),
    boxSizing: "border-box"
  }),
  contentPadding: css({
    padding: spacing(0, spacingLarge),
    boxSizing: "border-box"
  }),
  content: css({
    overflowY: "auto"
  }),
  footer: css({
    marginTop: spacingMedium
  }),
  hint: css({
    marginBottom: spacingMedium
  }),
  selectWrapper: css({
    width: "100%"
  }),
  trigger: css({
    marginBottom: spacingMedium,
    marginTop: spacingMedium
  }),
  label: css({
    marginTop: spacingMedium
  }),
  interventionMailColumn: css({
    marginBottom: spacingMedium,
    marginTop: spacingSmall
  }),
  columns: css({
    paddingTop: spacingMedium,
    paddingBottom: spacingTiny,
    alignItems: "baseline"
  }),
  formErrorText: css({
    height: boxHeightSmaller
  }),
  text: css({
    marginBottom: spacingLarge
  }),
  paper: css({
    paddingBottom: spacingTiny
  }),
  select: css({
    width: "100%"
  })
}
