import isEmpty from "lodash-es/isEmpty"
import {useForm, UseFormMethods} from "react-hook-form"
import {SelectOptionCustomized} from "shared/components"
import {TimeUnit} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes} from "shared/utils"

export interface EventDelayForm {
  readonly delay: string
  readonly delayUnit: string
}

export interface UseEventDelayModalHook {
  readonly formMethods: UseFormMethods<EventDelayForm>
  readonly isConfirmDisabled: boolean
  readonly unitOptions: SelectOptionCustomized[]
  readonly errorMessage?: string
}

export const useEventDelayModal = (delay?: number): UseEventDelayModalHook => {
  const {t} = useLucaTranslation()

  const formMethods = useForm<EventDelayForm>({
    defaultValues: {delay: delay ? `${convertSecondsToMinutes(delay)}` : "", delayUnit: TimeUnit.Minute}
  })

  const unitOptions = [{label: t("unit__minutes_plural"), value: TimeUnit.Minute}] // only minutes apply here
  const isConfirmDisabled = !isEmpty(formMethods.errors)

  return {
    formMethods,
    isConfirmDisabled,
    unitOptions
  }
}
