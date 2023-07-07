import React from "react"
import {useDispatch} from "react-redux"
import {SampleCompanyUpdate} from "shared/graphql/generated/globalTypes"
import {SampleCompanyFragment} from "shared/graphql/generated/SampleCompanyFragment"
import {useSampleCompany, useUpdateSampleCompany} from "shared/graphql/hooks"
import {SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {NavigationButtonConfig} from "../../../../utils"

export interface UseSampleCompanyDomainSignatureHook {
  readonly dataLoading: boolean
  readonly handleUpdateSampleCompany: (update: Partial<SampleCompanyUpdate>) => Promise<Option<SampleCompany>>
  readonly isDomainOverlayVisible: boolean
  readonly isPublished: boolean
  readonly navigateToSampleCompany: () => void
  readonly sampleCompany: Option<SampleCompany>
  readonly setDomainOverlayVisible: (isVisible: boolean) => void
}

export const useSampleCompanyDomainSignature = (
  companyId: UUID,
  navigationButtonConfig?: NavigationButtonConfig
): UseSampleCompanyDomainSignatureHook => {
  const [isDomainOverlayVisible, setDomainOverlayVisible] = React.useState<boolean>(false)

  const dispatch = useDispatch()
  const {sampleCompany, sampleCompanyLoading} = useSampleCompany(companyId)
  const {updateSampleCompany} = useUpdateSampleCompany()

  const navigateToSampleCompany = () => {
    if (navigationButtonConfig) {
      dispatch<AppAction>(navigateToRouteAction(navigationButtonConfig.route, navigationButtonConfig.payload))
    } else {
      dispatch<AppAction>(navigateToRouteAction(Route.SampleCompanyDetail, {sampleCompanyId: companyId}))
    }
  }

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

  const isPublished = sampleCompany.exists(sampleCompany => !!sampleCompany.publishedAt)

  return {
    dataLoading: sampleCompanyLoading,
    isDomainOverlayVisible,
    isPublished,
    handleUpdateSampleCompany,
    navigateToSampleCompany,
    sampleCompany,
    setDomainOverlayVisible
  }
}
