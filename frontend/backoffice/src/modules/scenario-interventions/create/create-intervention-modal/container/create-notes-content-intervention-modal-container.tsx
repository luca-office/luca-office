import {css} from "@emotion/react"
import * as React from "react"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {Icon, Label, TextInput, Tooltip} from "shared/components"
import {IconName, InputType, TimeUnit} from "shared/enums"
import {EmailDirectory, NotesContentInterventionCreation} from "shared/graphql/generated/globalTypes"
import {useCreateEmail, useCreateNotesContentIntervention} from "shared/graphql/hooks"
import {emailsQuery} from "shared/graphql/queries"
import {Flex, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {secondsToGivenTimeUnit} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {getReceptionDelayInSeconds} from "../../../../scenario-emails/emails/email/email-delay-modal/email-delay-modal-utils"
import {doesNotContainEmptyValues} from "../../../../scenario-interventions/utils/common"
import {CreateInterventionModal, InterventionCreationBaseFormType} from "../create-intervention-modal"
import {emailCreationValues} from "../util/email-creation"

interface Props {
  readonly onDismiss: () => void
  readonly scenarioId: UUID
  readonly scenarioMaxDurationInSeconds: number
}

export const CreateNotesContentInterventionModalContainer = ({
  scenarioMaxDurationInSeconds,
  onDismiss,
  scenarioId
}: Props) => {
  const formMethods = useForm<InterventionCreationBaseFormType>()
  const {t} = useLucaTranslation()

  const [value, setValue] = React.useState("")

  const {createNotesContentIntervention, createNotesContentInterventionLoading} =
    useCreateNotesContentIntervention(scenarioId)
  const {createEmail, createEmailLoading} = useCreateEmail([{query: emailsQuery, variables: {scenarioId}}])

  const dispatch = useDispatch()

  const triggerCondition = () => (
    <>
      <div css={Flex.row}>
        <Label label={t("interventions__interventions_check_notes_value_label")} />
        <Tooltip
          title={t("interventions__interventions_check_notes_value_label")}
          icon={IconName.Information}
          text={t("interventions__interventions_check_notes_value_label_tooltip")}>
          <Icon customStyles={styles.icon} name={IconName.Information} />
        </Tooltip>
      </div>
      <TextInput
        placeholderKey="coding_models__automated_item_input_value_choose_document_modal_notes_text_placeholder"
        onChange={setValue}
        value={value}
        type={InputType.text}
        name="content"
        hasValidationError={!!formMethods.errors.content}
        ref={formMethods.register({
          required: true,
          validate: doesNotContainEmptyValues
        })}
      />
    </>
  )

  const handleCreateIntervention = (creation: InterventionCreationBaseFormType) => {
    const timeOffsetInSeconds = getReceptionDelayInSeconds(creation.timeUnit, creation.timeOffset)
    if (timeOffsetInSeconds > scenarioMaxDurationInSeconds) {
      formMethods.setError("timeOffset", {message: t("email__future_email_error")})
    } else {
      const getCreationValues = (emailId: UUID): NotesContentInterventionCreation => ({
        interventionEmailId: emailId,
        scenarioId,
        timeOffsetInSeconds: timeOffsetInSeconds,
        title: creation.title,
        value
      })

      createEmail(emailCreationValues(timeOffsetInSeconds, scenarioId, creation.sender)).then(emailOption =>
        emailOption.forEach(email =>
          createNotesContentIntervention(getCreationValues(email.id)).then(() =>
            dispatch(
              navigateToRouteAction(Route.ScenarioEmails, {
                scenarioId,
                directory: EmailDirectory.Inbox,
                emailId: email.id
              })
            )
          )
        )
      )
    }
  }

  return (
    <CreateInterventionModal
      creationIsLoading={createNotesContentInterventionLoading || createEmailLoading}
      timeOffsetDescription={t("interventions__interventions_create_modal_time_hint", {
        durationInMinutes: secondsToGivenTimeUnit(TimeUnit.Minute, scenarioMaxDurationInSeconds)
      })}
      titleKey="interventions__interventions_create_modal_title_notes"
      formMethods={formMethods}
      onConfirm={handleCreateIntervention}
      onDismiss={onDismiss}
      triggerConditionConfig={{
        descriptionKey: "interventions__interventions_check_notes_value_description",
        titleKey: "interventions__interventions_check_notes_value",
        icon: IconName.Notes,
        renderCondition: triggerCondition
      }}
    />
  )
}

const styles = {
  icon: css({
    marginLeft: spacingSmall
  })
}
