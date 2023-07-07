import isEmpty from "lodash-es/isEmpty"
import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {SelectOptionCustomized} from "shared/components"
import {EmailDirectory, Relevance} from "shared/graphql/generated/globalTypes"
import {useCreateEmail, useScenario, useUpdateScenario} from "shared/graphql/hooks"
import {Email, NavigationConfig, Scenario} from "shared/models"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {isOutgoingEmail} from "../../utils/directory"
import {cleanEmailDelay} from "../../utils/timing"

export interface EmailCreationForm {
  readonly directory: EmailDirectory
  readonly receptionDelayInSeconds: string
  readonly senderOrRecipient: string
}

export interface UseEmailCreateModalHook {
  readonly formMethods: UseFormMethods<EmailCreationForm>
  readonly createEmail: (data: EmailCreationForm) => void
  readonly createEmailLoading: boolean
  readonly dismissModal: () => void
  readonly directoryOptions: SelectOptionCustomized[]
  readonly senderOrRecipientInputLabelKey: LucaI18nLangKey
  readonly isConfirmDisabled: boolean
}

export const useEmailCreateModal = (
  scenarioId: UUID,
  navigationConfig: NavigationConfig<Route>,
  isIntroductionEmail: boolean,
  routeToEmailAfterCreation: boolean,
  defaultDirectory: EmailDirectory
): UseEmailCreateModalHook => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const {scenario: scenarioOption} = useScenario(scenarioId)
  const {createEmail, createEmailLoading} = useCreateEmail()
  const {updateScenario, isUpdateScenarioLoading} = useUpdateScenario()

  const formMethods = useForm<EmailCreationForm>({
    defaultValues: {directory: defaultDirectory, receptionDelayInSeconds: "0"}
  })

  const directoryOptions = [
    {value: EmailDirectory.Inbox, label: t("email__directory_inbox")},
    {value: EmailDirectory.Sent, label: t("email__directory_sent")},
    {value: EmailDirectory.Trash, label: t("email__directory_trash")}
  ]

  const selectedDirectory = formMethods.watch<keyof Pick<EmailCreationForm, "directory">, EmailDirectory>("directory")
  const senderOrRecipientInputLabelKey = isOutgoingEmail(selectedDirectory)
    ? "email__directory_recipient"
    : "email__directory_sender"

  const isConfirmDisabled = createEmailLoading || isUpdateScenarioLoading || !isEmpty(formMethods.errors)

  const dismissModal = () => {
    dispatch(navigateToRouteAction(navigationConfig.route, navigationConfig.payload))
  }

  const onCreationSuccess = (createdEmail: Option<Email>) =>
    routeToEmailAfterCreation && createdEmail.isDefined()
      ? createdEmail.forEach(mail => {
          dispatch(
            navigateToRouteAction(Route.ScenarioEmails, {scenarioId, emailId: mail.id, directory: mail.directory})
          )
        })
      : dismissModal()

  const checkAndUpdateScenarioMailSettings = (email: Option<Email>) =>
    isIntroductionEmail
      ? email
          .flatMap(({id: emailId, sender}) =>
            scenarioOption.map<Promise<Option<Scenario> | void>>((scenario: Scenario) =>
              updateScenario(scenario.id, {
                date: scenario.date,
                name: scenario.name,
                description: scenario.description,
                maxDurationInSeconds: scenario.maxDurationInSeconds,
                introductionEmailId: emailId,
                shouldDisplayTime: scenario.shouldDisplayTime,
                tags: scenario.tags,
                // LUCA-307 automatically map intro sender to completion sender if not already present
                completionEmailAddress: scenario.completionEmailAddress ? scenario.completionEmailAddress : sender,
                shouldHideReferenceBookChapters: scenario.shouldHideReferenceBookChapters,
                sampleCompanyId: scenario.sampleCompanyId
              })
            )
          )
          .getOrElse(Promise.resolve())
          .then(() => email)
      : email

  const handleEmailCreation = ({senderOrRecipient, directory, receptionDelayInSeconds}: EmailCreationForm) => {
    createEmail({
      sender: isOutgoingEmail(directory) ? null : senderOrRecipient,
      recipient: isOutgoingEmail(directory) ? senderOrRecipient : null,
      ccRecipients: [],
      subject: "",
      directory,
      receptionDelayInSeconds: cleanEmailDelay(parseInt(receptionDelayInSeconds, 10), directory),
      isInitiallyRead: directory !== EmailDirectory.Inbox,
      relevance: Relevance.PotentiallyHelpful,
      message: "",
      scenarioId
    })
      .then(checkAndUpdateScenarioMailSettings)
      .then(onCreationSuccess)
  }

  return {
    formMethods,
    createEmail: handleEmailCreation,
    createEmailLoading: createEmailLoading || isUpdateScenarioLoading,
    dismissModal,
    directoryOptions,
    senderOrRecipientInputLabelKey,
    isConfirmDisabled
  }
}
