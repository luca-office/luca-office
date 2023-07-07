import {isEmpty} from "lodash-es"
import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {SampleCompanyUpdate} from "shared/graphql/generated/globalTypes"
import {SampleCompanyFragment} from "shared/graphql/generated/SampleCompanyFragment"
import {
  SampleCompanyProps,
  useDuplicateSampleCompany,
  usePublishSampleCompany,
  useSampleCompany,
  useUpdateSampleCompany
} from "shared/graphql/hooks"
import {AppNotification, SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {useCheckUserClaims} from "../../../../hooks/use-check-user-claims"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {updateNotification} from "../../../../redux/actions/ui/common-ui-action"
import {Route} from "../../../../routes"
import {NavigationButtonConfig} from "../../../../utils"

export interface SampleCompanyDetailForm {
  readonly name: string
  readonly description: string
  readonly usageField: string
  readonly audience: string
}

export interface UseSampleCompanyDetailHook extends Pick<SampleCompanyProps, "sampleCompany"> {
  readonly dataLoading: boolean
  readonly duplicateSampleCompany: () => void
  readonly duplicateSampleCompanyLoading: boolean
  readonly canBePublished: boolean
  readonly publishSampleCompany: (id: string) => void
  readonly publishSampleCompanyLoading: boolean
  readonly isPublished: boolean
  readonly formMethods: UseFormMethods<SampleCompanyDetailForm>
  readonly navigateToOverview: () => void
  readonly updateSampleCompany: (update: Partial<SampleCompanyUpdate>) => Promise<Option<SampleCompany>>
  readonly userMayArchive: boolean
}

export const useSampleCompanyDetail = (
  companyId: UUID,
  navigationButtonConfig?: NavigationButtonConfig
): UseSampleCompanyDetailHook => {
  const dispatch = useDispatch()
  const {sampleCompany, sampleCompanyLoading} = useSampleCompany(companyId)
  const {userClaims, userClaimsCheckLoading} = useCheckUserClaims(
    sampleCompany.map(sampleCompany => sampleCompany.authorId)
  )
  const {updateSampleCompany} = useUpdateSampleCompany()
  const {publishSampleCompany, isPublishSampleCompanyLoading} = usePublishSampleCompany()
  const {duplicateSampleCompany, duplicateSampleCompanyLoading} = useDuplicateSampleCompany()
  const formMethods = useForm<SampleCompanyDetailForm>()
  const navigateToOverview = () =>
    dispatch(
      navigateToRouteAction(navigationButtonConfig?.route ?? Route.SampleCompanies, navigationButtonConfig?.payload)
    )

  const handleUpdateSampleCompany = (update: Partial<SampleCompanyUpdate>) =>
    sampleCompany
      .map<Promise<Option<SampleCompany>>>(company => {
        const sampleCompanyUpdate: SampleCompanyUpdate = {
          description: update.description !== undefined ? update.description : company.description,
          name: update.name !== undefined ? update.name : company.name,
          tags: update.tags !== undefined ? update.tags : company.tags,
          emailSignature: update.emailSignature !== undefined ? update.emailSignature : company.emailSignature,
          domain: update.domain !== undefined ? update.domain : company.domain,
          logoFileId: update.logoFileId !== undefined ? update.logoFileId : company.logoFile?.id,
          profileFileId: update.profileFileId !== undefined ? update.profileFileId : company.profileFileId
        }
        return updateSampleCompany(companyId, sampleCompanyUpdate)
      })
      .getOrElse(Promise.resolve(Option.none<SampleCompanyFragment>()))

  const handleDuplicateSampleCompany = () => {
    duplicateSampleCompany(companyId)
      .then(duplicateOption =>
        duplicateOption.forEach(duplicate =>
          dispatch(navigateToRouteAction(Route.SampleCompanyDetail, {sampleCompanyId: duplicate.id}))
        )
      )
      .then(() =>
        dispatch(
          updateNotification(
            Option.of<AppNotification>({
              messageKey: "sample_companies__duplicate_success",
              severity: NotificationSeverity.Success
            })
          )
        )
      )
  }

  const isPublished = sampleCompany.exists(sampleCompany => sampleCompany.publishedAt !== null)
  const canBePublished = sampleCompany.exists(
    sampleCompany =>
      sampleCompany.profileFileId !== null && sampleCompany.logoFileId !== null && !isEmpty(sampleCompany.description)
  )

  return {
    dataLoading: sampleCompanyLoading,
    duplicateSampleCompany: handleDuplicateSampleCompany,
    duplicateSampleCompanyLoading: duplicateSampleCompanyLoading,
    canBePublished,
    publishSampleCompany,
    publishSampleCompanyLoading: isPublishSampleCompanyLoading,
    isPublished,
    formMethods,
    navigateToOverview,
    sampleCompany,
    updateSampleCompany: handleUpdateSampleCompany,
    userMayArchive: !userClaimsCheckLoading && userClaims.mayArchive
  }
}
