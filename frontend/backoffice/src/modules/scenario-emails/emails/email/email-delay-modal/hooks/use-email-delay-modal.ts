import {min} from "lodash"
import omit from "lodash-es/omit"
import * as React from "react"
import {useForm, UseFormMethods} from "react-hook-form"
import {TimeUnit} from "shared/enums"
import {useScenario} from "shared/graphql/hooks"
import {Email, EmailOpeningIntervention, SelectOption} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {Option, secondsToGivenTimeUnit} from "shared/utils"
import {MAX_RECEPTION_DELAY, receptionDelayOptionsConfig} from "../../../../../scenarios/config/delays-config"
import {useEmailUpdate} from "../../hooks/use-email-update"
import {getReceptionDelayInSeconds} from "../email-delay-modal-utils"

export enum EmailTemporalStage {
  Past = "Past",
  Present = "Present",
  Future = "Future"
}

export type EmailDelayTimeUnit = TimeUnit.Hour | TimeUnit.Minute | TimeUnit.Second
export interface EmailDelayForm {
  readonly receptionDelay: number
  readonly timeUnit: EmailDelayTimeUnit
}

export interface UseEmailDelayModalHook {
  readonly formMethods: UseFormMethods<EmailDelayForm>
  readonly maxFutureDelay: Option<number>
  readonly receptionDelayOptions: SelectOption[]
  readonly updateEmailDelay: (data: EmailDelayForm) => void
  readonly selectedTemporalStage: EmailTemporalStage
  readonly toggleTemporalStage: (stage: EmailTemporalStage) => void
}

export const useEmailDelayModal = (
  email: Email,
  emailOpeningInterventions: EmailOpeningIntervention[],
  dismiss?: () => void
): UseEmailDelayModalHook => {
  const isSendInFuture = email.receptionDelayInSeconds > 0

  const isSendImmediately = email.receptionDelayInSeconds === 0

  const defaultSelectedTemporalStage = isSendInFuture
    ? EmailTemporalStage.Future
    : isSendImmediately
    ? EmailTemporalStage.Present
    : EmailTemporalStage.Past

  const {t} = useLucaTranslation()

  const [selectedTemporalStage, setSelectedTemporalStages] = React.useState<EmailTemporalStage>(
    defaultSelectedTemporalStage
  )

  const {updateEmail} = useEmailUpdate(email)
  const {scenario} = useScenario(email.scenarioId)

  const defaultTimeUnit = getDefaultTimeUnit(email.receptionDelayInSeconds)
  const defaultReceptionDelay = Math.abs(secondsToGivenTimeUnit(defaultTimeUnit, email.receptionDelayInSeconds))
  const isFutureTemporalStageSelected = selectedTemporalStage === EmailTemporalStage.Future

  const formMethods = useForm<EmailDelayForm>({
    defaultValues: {
      receptionDelay: defaultReceptionDelay,
      timeUnit: defaultTimeUnit
    }
  })

  const maxFutureDelay = React.useMemo<Option<number>>(
    () => scenario.map(scenarioData => scenarioData.maxDurationInSeconds || 0),
    [scenario]
  )

  const minimumDelayOfEmailOpeningInterventions = min(
    emailOpeningInterventions.map(intervention => intervention.timeOffsetInSeconds)
  )

  const receptionDelayOptions = React.useMemo<SelectOption[]>(
    () => receptionDelayOptionsConfig.map(config => ({...omit(config, "labelKey"), label: t(config.labelKey)})),
    []
  )

  const toggleTemporalStage = (stage: EmailTemporalStage) => {
    if (stage === EmailTemporalStage.Present) {
      formMethods.setValue("receptionDelay", 0)
    }
    setSelectedTemporalStages(stage)
  }

  const updateEmailDelay = (form: EmailDelayForm) => {
    const receptionDelay = isFutureTemporalStageSelected
      ? getReceptionDelayInSeconds(form.timeUnit, form.receptionDelay)
      : -getReceptionDelayInSeconds(form.timeUnit, form.receptionDelay)

    if (Math.abs(receptionDelay) > MAX_RECEPTION_DELAY) {
      formMethods.setError("receptionDelay", {
        shouldFocus: true,
        message: t("validation__email_delay_max_error")
      })
    } else if (
      isFutureTemporalStageSelected &&
      minimumDelayOfEmailOpeningInterventions !== undefined &&
      receptionDelay > minimumDelayOfEmailOpeningInterventions
    ) {
      formMethods.setError("receptionDelay", {
        shouldFocus: true,
        message: t("validation__email_delay_intervention_email")
      })
    } else if (isFutureTemporalStageSelected && receptionDelay > maxFutureDelay.getOrElse(MAX_RECEPTION_DELAY)) {
      formMethods.setError("receptionDelay", {
        shouldFocus: true,
        message: t("validation__email_delay")
      })
    } else {
      updateEmail(
        {
          receptionDelayInSeconds: selectedTemporalStage === EmailTemporalStage.Present ? 0 : receptionDelay,
          ...(Math.sign(receptionDelay) === 1 ? {isInitiallyRead: false} : undefined)
        },
        dismiss
      )
    }
  }

  return {
    formMethods,
    maxFutureDelay,
    receptionDelayOptions,
    selectedTemporalStage,
    toggleTemporalStage,
    updateEmailDelay
  }
}

export const getDefaultTimeUnit = (receptionDelay: number): EmailDelayTimeUnit => {
  if (receptionDelay === 0) {
    return TimeUnit.Second
  } else {
    return receptionDelay % 3600 === 0 ? TimeUnit.Hour : receptionDelay % 60 === 0 ? TimeUnit.Minute : TimeUnit.Second
  }
}
