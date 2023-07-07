import * as React from "react"
import {DeleteEntityHook, NavigationConfig} from "shared/models"
import {LucaI18nLangKey, LucaTFunction, useLucaTranslation} from "shared/translations"
import {useNavigate} from "../../../../../hooks/use-navigate"
import {Route} from "../../../../../routes"
import {CommonCodingModelUpdate} from "../../overview/coding-model-detail-overview-container"
import {CodingModelCommonDetailView} from "./coding-model-common-detail-view"

export interface CodingModelCommonDetailViewComponentProps extends CodingModelCommonDetailViewContainerProps {
  readonly navigate: (navigationConfig: NavigationConfig<Route>) => void
  readonly t: LucaTFunction
}

export interface CodingModelCommonDetailViewContainerProps {
  readonly description: string
  readonly descriptionPlaceholderKey: LucaI18nLangKey
  readonly isReadOnly: boolean
  readonly handleUpdate: (update: CommonCodingModelUpdate) => void
  readonly headerTitleKey: LucaI18nLangKey
  readonly editDescriptionDialogTitleKey: LucaI18nLangKey
  readonly maxScore: number
  readonly headerDeleteButtonConfig?: {
    readonly entityId: UUID
    readonly deleteEntityHook: DeleteEntityHook
    readonly navigateTo: NavigationConfig<Route>
  }
  readonly renderCustomContent?: () => JSX.Element
  readonly title: string
}

export const CodingModelCommonDetailViewContainer = (props: CodingModelCommonDetailViewContainerProps) => {
  const {navigate} = useNavigate()

  const {t} = useLucaTranslation()
  return <CodingModelCommonDetailView t={t} navigate={navigate} {...props} />
}
