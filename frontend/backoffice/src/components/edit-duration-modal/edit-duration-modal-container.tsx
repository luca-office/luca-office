import {maxBy, omit} from "lodash-es"
import * as React from "react"
import {useForm} from "react-hook-form"
import {TimeUnit} from "shared/enums"
import {
  useEmails,
  useInterventions,
  useScenario,
  useScenarioQuestionnaires,
  useUpdateScenario
} from "shared/graphql/hooks"
import {SelectOption} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes} from "shared/utils"
import {InterventionUpdateWithTimeoffset} from "../../modules/scenario-interventions/detail/intervention/intervention-detail-view-container"
import {MAX_RECEPTION_DELAY, scenarioDurationOptionsConfig} from "../../modules/scenarios/config/delays-config"
import {EditDurationModal, ReceptionDelayConfig} from "./edit-duration-modal"

interface Props {
  readonly scenarioDurationInSeconds: number
  readonly scenarioId: UUID
  readonly onConfirm: () => void
  readonly onDismiss: () => void
}

export interface EditDurationForm {
  readonly timeUnit: TimeUnit
  readonly duration: number
}

export const EditDurationModalContainer: React.FC<Props> = ({
  scenarioDurationInSeconds,
  scenarioId,
  onConfirm,
  onDismiss
}) => {
  const {t} = useLucaTranslation()

  const {emails: emailsOption, emailsLoading} = useEmails(scenarioId)
  const {scenario: scenarioOption} = useScenario(scenarioId)
  const {interventions: interventionsOption, interventionsLoading} = useInterventions(scenarioId)
  const {updateScenario} = useUpdateScenario()
  const {
    scenarioQuestionnaires: scenarioQuestionnairesOption,
    scenarioQuestionnairesLoading
  } = useScenarioQuestionnaires(scenarioId)

  const [receptionDelays, setReceptionDelays] = React.useState<ReceptionDelayConfig[]>([])

  React.useEffect(() => {
    const emailWithMaximumReceptionDelay = emailsOption.map(emails =>
      maxBy(emails, email => email.receptionDelayInSeconds)
    )
    const interventionWithMaximumReceptionDelay = interventionsOption.map(interventions =>
      maxBy(
        interventions.filter(intervention => intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention"),
        intervention => (intervention as InterventionUpdateWithTimeoffset).timeOffsetInSeconds
      )
    )
    const eventWithMaximumReceptionDelay = scenarioQuestionnairesOption.map(questionnaires =>
      maxBy(questionnaires, questionnaire => questionnaire.activationDelayInSeconds)
    )

    emailWithMaximumReceptionDelay.forEach(mail =>
      setReceptionDelays([
        ...receptionDelays,
        {
          delayInSeconds: mail?.receptionDelayInSeconds ?? MAX_RECEPTION_DELAY,
          entityLanguageKey: "email_short"
        }
      ])
    )

    interventionWithMaximumReceptionDelay.forEach(intervention =>
      setReceptionDelays([
        ...receptionDelays,
        {
          delayInSeconds:
            (intervention as InterventionUpdateWithTimeoffset)?.timeOffsetInSeconds ?? MAX_RECEPTION_DELAY,
          entityLanguageKey: "interventions__detail_view_header_label_singular"
        }
      ])
    )
    eventWithMaximumReceptionDelay.forEach(event =>
      setReceptionDelays([
        ...receptionDelays,
        {
          delayInSeconds: event?.activationDelayInSeconds ?? MAX_RECEPTION_DELAY,
          entityLanguageKey: "questionnaires__detail_header_event"
        }
      ])
    )
  }, [emailsOption.isDefined(), scenarioQuestionnairesOption.isDefined()])

  const formMethods = useForm<EditDurationForm>({
    defaultValues: {
      duration: convertSecondsToMinutes(scenarioDurationInSeconds),
      timeUnit: TimeUnit.Minute
    }
  })

  const timeUnitOptions: SelectOption[] = scenarioDurationOptionsConfig.map(config => ({
    ...omit(config, "labelKey"),
    label: t(config.labelKey)
  }))

  const maximumReceptionDelay = maxBy(receptionDelays, delay => delay.delayInSeconds)

  const handleSubmit = (timeInSeconds: number) => {
    scenarioOption.forEach(scenario => {
      updateScenario(scenario.id, {
        description: scenario.description,
        name: scenario.name,
        shouldDisplayTime: scenario.shouldDisplayTime,
        shouldHideReferenceBookChapters: scenario.shouldHideReferenceBookChapters,
        tags: scenario.tags,
        completionEmailAddress: scenario.completionEmailAddress,
        date: scenario.date,
        introductionEmailId: scenario.introductionEmailId,
        sampleCompanyId: scenario.sampleCompanyId,
        maxDurationInSeconds: timeInSeconds
      }).then(onConfirm)
    })
  }

  return (
    <EditDurationModal
      onConfirm={handleSubmit}
      areMaximumReceptionDelaysLoading={emailsLoading || scenarioQuestionnairesLoading || interventionsLoading}
      onDismiss={onDismiss}
      maximumReceptionDelay={maximumReceptionDelay}
      timeUnitOptions={timeUnitOptions}
      formMethods={formMethods}
      titleKey="scenario_details__edit_duration_modal_title"
      descriptionKey="scenario_details__edit_duration_modal_text"
      selectLabelKey="scenario_details__edit_duration_modal_label"
    />
  )
}
