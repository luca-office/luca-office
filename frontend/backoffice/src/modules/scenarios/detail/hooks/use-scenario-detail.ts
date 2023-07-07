import * as React from "react"
import {useDispatch} from "react-redux"
import {InterventionHeaderGroupType, NotificationSeverity} from "shared/enums"
import {EmailDirectory, ScenarioUpdate, ScoringType} from "shared/graphql/generated/globalTypes"
import {
  ScenarioProps,
  useCodingDimensions,
  useDuplicateScenario,
  useEmails,
  useFilesForScenario,
  useFinalizeScenario,
  useInterventions,
  usePublishScenario,
  useSampleCompanyLazy,
  useScenario,
  useScenarioQuestionnaires,
  useScenarioReferenceBookChapters,
  useScenarioUserAccounts,
  useUpdateScenario
} from "shared/graphql/hooks"
import {AppNotification} from "shared/models"
import {isDefined, Option} from "shared/utils"
import {useDirectoriesForSampleCompanyLazy, useDirectoriesForScenario} from "../../../../graphql/hooks"
import {useCheckUserClaims} from "../../../../hooks/use-check-user-claims"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {updateNotification} from "../../../../redux/actions/ui/common-ui-action"
import {Route} from "../../../../routes"
import {createEmailsSortFn} from "../../../scenario-emails/utils/directory"
import {SettingsElementCount} from "../settings/scenario-settings"

interface CodingModelConfig {
  readonly hasNoDimension: boolean
  readonly hasDimensionWithoutItem: boolean
  readonly hasItemsWithoutCriteria: boolean
  readonly hasHolisticItemsWithLessThanTwoCriteria: boolean
}

export interface UseScenarioDetailHook extends ScenarioProps {
  readonly canBeDuplicated: boolean
  readonly canBeFinalized: boolean
  readonly codingModelConfig: CodingModelConfig
  readonly duplicateScenario: () => void
  readonly duplicateScenarioLoading: boolean
  readonly finalizeScenario: () => void
  readonly isFinalized: boolean
  readonly isPublished: boolean
  readonly isFinalizeScenarioLoading: boolean
  readonly isPublishScenarioLoading: boolean
  readonly navigateToCodingModels: () => void
  readonly navigateToEmails: () => void
  readonly navigateToEvents: () => void
  readonly navigateToFilesAndDirectories: () => void
  readonly navigateToOverview: () => void
  readonly navigateToReferenceBookChapters: () => void
  readonly navigateToSampleCompaniesSelection: () => void
  readonly navigateToSelection: () => void
  readonly navigateToInterventions: () => void
  readonly navigateToPreview: () => void
  readonly settingsCounts: SettingsElementCount
  readonly scenarioContributorsCount: number
  readonly updateInProgress: boolean
  readonly updateScenario: (id: string, update: ScenarioUpdate) => void
  readonly userMayFinalizeWithoutPublishing: boolean
  readonly userMayArchive: boolean
  readonly publishScenario: () => void
}

interface UseScenarioDetailParams {
  readonly scenarioId: UUID
  readonly projectId?: UUID
}

export const useScenarioDetail = ({scenarioId, projectId}: UseScenarioDetailParams): UseScenarioDetailHook => {
  const dispatch = useDispatch()

  const {scenario, scenarioLoading} = useScenario(scenarioId)
  const {userClaims, userClaimsCheckLoading} = useCheckUserClaims(scenario.map(scenario => scenario.authorId))
  const {sampleCompany, sampleCompanyLoading, getSampleCompany} = useSampleCompanyLazy()
  const {
    directoriesForSampleCompany,
    directoriesForSampleCompanyLoading,
    getDirectoriesForSampleCompany
  } = useDirectoriesForSampleCompanyLazy()
  const {directories, directoriesLoading} = useDirectoriesForScenario(scenarioId)
  const {emails, emailsLoading} = useEmails(scenarioId)
  const {files, filesLoading} = useFilesForScenario(scenarioId)
  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)
  const {codingDimensions, codingDimensionsLoading} = useCodingDimensions(
    scenario.map(s => s.codingModel?.id ?? "").getOrElse(""),
    scenario.exists(s => s.codingModel === null) || scenarioLoading
  )

  const {
    scenarioQuestionnaires: scenarioQuestionnairesOption,
    scenarioQuestionnairesLoading
  } = useScenarioQuestionnaires(scenarioId)

  const {interventions: interventionsOption, interventionsLoading} = useInterventions(scenarioId)

  const {scenarioContributors} = useScenarioUserAccounts(scenarioId)

  const {updateScenario, isUpdateScenarioLoading} = useUpdateScenario()
  const {finalizeScenario, isFinalizeScenarioLoading} = useFinalizeScenario()
  const {publishScenario, isPublishScenarioLoading} = usePublishScenario()

  const {duplicateScenario, duplicateScenarioLoading} = useDuplicateScenario()

  const isFinalized = scenario.exists(s => isDefined(s.finalizedAt))
  const isPublished = scenario.exists(s => isDefined(s.publishedAt))

  const hasNoDimension = scenario.exists(scenario => scenario.codingModel?.dimensionsCount === 0)
  const hasDimensionWithoutItem = codingDimensions.some(
    dimension => dimension.items.length === 0 && dimension.parentDimensionId !== null
  )
  const hasItemsWithoutCriteria = codingDimensions.some(dimension =>
    dimension.items.some(item => item.criteriaCount === 0)
  )
  const hasHolisticItemsWithLessThanTwoCriteria = codingDimensions.some(dimension =>
    dimension.items.some(item => item.scoringType === ScoringType.Holistic && item.criteriaCount < 2)
  )

  const hasSampleCompanyAssigned = scenario.exists(s => s.sampleCompanyId !== null)

  const canBeFinalized = React.useMemo<boolean>(
    () =>
      !isFinalizeScenarioLoading &&
      !isUpdateScenarioLoading &&
      !hasNoDimension &&
      !hasDimensionWithoutItem &&
      !hasItemsWithoutCriteria &&
      !hasHolisticItemsWithLessThanTwoCriteria &&
      scenario
        .map(
          s =>
            !isFinalized &&
            isDefined(s.introductionEmailId) &&
            isDefined(s.completionEmailAddress) &&
            s.maxDurationInSeconds !== null &&
            s.maxDurationInSeconds >= 60
        )
        .getOrElse(false),
    [scenario, isFinalized, isFinalizeScenarioLoading, isUpdateScenarioLoading]
  )

  const canBeDuplicated = (isFinalized || isPublished) && !duplicateScenarioLoading
  const scenarioHasCodingModel = scenario.exists(scenarioValue => scenarioValue.codingModel !== null)

  const sampleCompanyFilesCount = sampleCompany.map(({filesCount}) => filesCount).getOrElse(0)
  const filesCount = files.map(values => values.length).getOrElse(0)

  const sampleCompanyDirectoriesCount = directoriesForSampleCompany.map(values => values.length).getOrElse(0)
  const directoriesCount = directories.map(values => values.length).getOrElse(0)

  const navigateToOverview = () => dispatch(navigateToRouteAction(Route.Scenarios))

  const navigateToInterventions = () =>
    dispatch(
      navigateToRouteAction(Route.ScenarioInterventions, {
        scenarioId,
        headerGroupType: InterventionHeaderGroupType.AllGroups
      })
    )

  const navigateToSampleCompaniesSelection = () =>
    hasSampleCompanyAssigned
      ? sampleCompany.forEach(company =>
          dispatch(
            navigateToRouteAction(Route.ScenarioAssignedSampleCompanyDetail, {
              scenarioId,
              sampleCompanyId: company.id
            })
          )
        )
      : dispatch(navigateToRouteAction(Route.ScenarioSampleCompanySelectionPlaceholder, {scenarioId}))

  const navigateToFilesAndDirectories = () =>
    dispatch(
      navigateToRouteAction(Route.ScenarioFiles, {
        scenarioId
      })
    )

  const navigateToCodingModels = () => {
    if (scenarioHasCodingModel) {
      dispatch<AppAction>(
        navigateToRouteAction(Route.ScenarioCodingModelDetail, {
          scenarioId,
          codingModelId: scenario.map(scenarioValue => scenarioValue.codingModel?.id).getOrElse("")
        })
      )
    } else {
      dispatch<AppAction>(navigateToRouteAction(Route.ScenarioCodingModelSelection, {scenarioId}))
    }
  }

  const navigateToSelection = () => dispatch<AppAction>(navigateToRouteAction(Route.ScenarioSelection, {id: projectId}))
  const navigateToEvents = () =>
    scenarioQuestionnairesOption.forEach(questionnaires =>
      dispatch<AppAction>(
        navigateToRouteAction(Route.ScenarioQuestionnaireDetail, {
          scenarioId,
          ...(questionnaires.length ? {questionnaireId: questionnaires[0].questionnaireId} : {})
        })
      )
    )
  const navigateToEmails = () => {
    const mails = emails
      .getOrElse([])
      .filter(mail => mail.directory === EmailDirectory.Inbox)
      .sort(
        createEmailsSortFn(
          EmailDirectory.Inbox,
          scenario.map(scenarioData => scenarioData.introductionEmailId).orNull()
        )
      )

    dispatch(
      navigateToRouteAction(Route.ScenarioEmails, {
        scenarioId,
        directory: EmailDirectory.Inbox,
        ...(mails.length ? {emailId: mails[0].id} : {})
      })
    )
  }

  const navigateToReferenceBookChapters = () =>
    dispatch(navigateToRouteAction(Route.ScenarioReferenceBookChapters, {scenarioId}))

  const navigateToScenarioDetails = (scenarioId: UUID) =>
    dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId}))

  const navigateToPreview = () => dispatch(navigateToRouteAction(Route.ScenarioPreview, {scenarioId}))

  const handleUpdateScenario = (id: string, update: ScenarioUpdate) => {
    updateScenario(id, update).then(response => response.forEach(scenario => navigateToScenarioDetails(scenario.id)))
  }
  const handleFinalizeScenario = () => {
    finalizeScenario(scenarioId)
  }
  const handlePublishScenario = () => {
    publishScenario(scenarioId)
  }

  const handleDuplicateScenario = () => {
    duplicateScenario(scenarioId)
      .then(response => response.forEach(scenario => navigateToScenarioDetails(scenario.id)))
      .then(() =>
        dispatch(
          updateNotification(
            Option.of<AppNotification>({
              messageKey: "scenario_details__duplicate_success",
              severity: NotificationSeverity.Success
            })
          )
        )
      )
  }

  React.useEffect(() => {
    scenario.forEach(({sampleCompanyId}) => {
      if (sampleCompanyId) {
        getSampleCompany(sampleCompanyId)
        getDirectoriesForSampleCompany(sampleCompanyId)
      }
    })
  }, [scenarioLoading])

  return {
    isFinalized,
    isPublished,
    canBeFinalized,
    codingModelConfig: {
      hasDimensionWithoutItem,
      hasHolisticItemsWithLessThanTwoCriteria,
      hasItemsWithoutCriteria,
      hasNoDimension
    },
    finalizeScenario: handleFinalizeScenario,
    navigateToFilesAndDirectories,
    isFinalizeScenarioLoading,
    isPublishScenarioLoading,
    navigateToEmails,
    navigateToReferenceBookChapters,
    navigateToOverview,
    navigateToSelection,
    navigateToEvents,
    navigateToCodingModels,
    navigateToSampleCompaniesSelection,
    navigateToInterventions,
    navigateToPreview,
    scenario,
    scenarioLoading:
      directoriesForSampleCompanyLoading ||
      directoriesLoading ||
      emailsLoading ||
      filesLoading ||
      sampleCompanyLoading ||
      scenarioLoading ||
      scenarioReferenceBooksLoading ||
      interventionsLoading ||
      codingDimensionsLoading ||
      scenarioQuestionnairesLoading,
    updateInProgress: isUpdateScenarioLoading,
    updateScenario: handleUpdateScenario,
    userMayFinalizeWithoutPublishing: !userClaimsCheckLoading && userClaims.mayFinalizeWithoutPublishing,
    userMayArchive: !userClaimsCheckLoading && userClaims.mayArchive,
    settingsCounts: {
      directories: directoriesCount + sampleCompanyDirectoriesCount,
      emails: emails.map(values => values.length).getOrElse(0),
      files: filesCount + sampleCompanyFilesCount,
      scenarioReferenceBooks: scenarioReferenceBooks.map(values => values.length).getOrElse(0),
      filesSampleCompany: sampleCompanyFilesCount,
      events: scenarioQuestionnairesOption.map(values => values.length).getOrElse(0),
      codingDimensions: scenario.map(scenarioValue => scenarioValue.codingModel?.dimensionsCount ?? 0).getOrElse(0),
      interventions: interventionsOption.getOrElse([]).length,
      erpRowCount: sampleCompany.map(sampleCompany => sampleCompany.erpRowsCount).getOrElse(0)
    },
    scenarioContributorsCount: scenarioContributors.length,
    duplicateScenarioLoading,
    canBeDuplicated,
    duplicateScenario: handleDuplicateScenario,
    publishScenario: handlePublishScenario
  }
}
