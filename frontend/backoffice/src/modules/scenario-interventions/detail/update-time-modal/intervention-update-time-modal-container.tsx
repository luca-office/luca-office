import {omit} from "lodash-es"
import * as React from "react"
import {useForm} from "react-hook-form"
import {TimeUnit} from "shared/enums"
import {InterventionType} from "shared/graphql/generated/globalTypes"
import {useEmails, useScenario} from "shared/graphql/hooks"
import {Intervention, InterventionWithTimeOffset, SelectOption} from "shared/models"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes, secondsToGivenTimeUnit} from "shared/utils"
import {EditDurationModal} from "../../../../components/edit-duration-modal/edit-duration-modal"
import {getDefaultTimeUnit} from "../../../scenario-emails/emails/email/email-delay-modal/hooks/use-email-delay-modal"
import {interventionTimeOptions} from "../../config/time"
import {InterventionUpdateWithTimeoffset} from "../intervention/intervention-detail-view-container"

interface Props {
  readonly scenarioId: UUID
  readonly handleUpdate: (
    update: Partial<InterventionUpdateWithTimeoffset>,
    interventionType: InterventionType
  ) => Promise<unknown>
  readonly onConfirm: () => void
  readonly onDismiss: () => void
  readonly intervention: InterventionWithTimeOffset
}

interface DescriptionConfig {
  readonly key: LucaI18nLangKey
  readonly langOptions?: Record<string, unknown>
}

export interface EditDurationForm {
  readonly timeUnit: TimeUnit
  readonly duration: number
}

export const InterventionUpdateTimeModalContainer: React.FC<Props> = ({
  handleUpdate,
  onConfirm,
  intervention,
  onDismiss,
  scenarioId
}) => {
  const {t} = useLucaTranslation()

  const {scenario} = useScenario(scenarioId)

  const {emails} = useEmails(scenarioId, intervention.interventionType !== InterventionType.EmailOpening)

  const associatedEmailFromEmailOpeningIntervention =
    intervention.__typename === "EmailOpeningIntervention"
      ? emails.getOrElse([]).find(email => email.id === intervention.emailId)
      : undefined

  const formMethods = useForm<EditDurationForm>({
    defaultValues: {
      duration: secondsToGivenTimeUnit(
        getDefaultTimeUnit(intervention.timeOffsetInSeconds),
        intervention.timeOffsetInSeconds
      ),
      timeUnit: getDefaultTimeUnit(intervention.timeOffsetInSeconds)
    }
  })

  const timeUnitOptions: SelectOption[] = interventionTimeOptions.map(config => ({
    ...omit(config, "labelKey"),
    label: t(config.labelKey)
  }))

  const handleSubmit = (timeInSeconds: number) =>
    handleUpdate({timeOffsetInSeconds: timeInSeconds}, intervention.interventionType).then(onConfirm)

  const scenarioDurationInSeconds = scenario.map(s => s.maxDurationInSeconds || 0).getOrElse(0)

  const associatedEmailReceptionDelayInMinutes = associatedEmailFromEmailOpeningIntervention
    ? convertSecondsToMinutes(associatedEmailFromEmailOpeningIntervention.receptionDelayInSeconds)
    : undefined

  const getDescriptionConfig = (): DescriptionConfig => {
    switch (intervention.interventionType) {
      case InterventionType.EmailOpening:
        return {
          key:
            associatedEmailReceptionDelayInMinutes ?? 0 > 0
              ? "interventions__interventions_create_modal_time_hint_email_future_mail"
              : "interventions__interventions_create_modal_time_hint_email",
          langOptions: {
            durationInMinutes: convertSecondsToMinutes(scenarioDurationInSeconds),
            emailReceptionInMinutes: associatedEmailReceptionDelayInMinutes
          }
        }

      default:
        return {
          key: "interventions__interventions_detail_edit_tim_modal_description",
          langOptions: {durationInMinutes: convertSecondsToMinutes(scenarioDurationInSeconds)}
        }
    }
  }

  const descriptionConfig = getDescriptionConfig()

  return (
    <EditDurationModal
      onConfirm={handleSubmit}
      areMaximumReceptionDelaysLoading={false}
      onDismiss={onDismiss}
      timeUnitOptions={timeUnitOptions}
      moduleDuration={scenarioDurationInSeconds}
      minDurationInSeconds={
        intervention.interventionType === InterventionType.EmailOpening &&
        associatedEmailFromEmailOpeningIntervention !== undefined
          ? associatedEmailFromEmailOpeningIntervention.receptionDelayInSeconds
          : undefined
      }
      formMethods={formMethods}
      titleKey="interventions__interventions_detail_edit_tim_modal_title"
      descriptionKey={descriptionConfig.key}
      descriptionLangOptions={descriptionConfig.langOptions}
      selectLabelKey="interventions__interventions_detail_edit_tim_modal_label"
    />
  )
}
