import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {useSelector} from "react-redux"
import {IconName} from "shared/enums"
import {useCheckLogin} from "shared/graphql/hooks"
import {ButtonConfig} from "shared/models"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {EditingStatusIndicatorProps} from "../../../components"
import {EntityFilterConfig, EntityFiltersType} from "../../../models"
import {AppState} from "../../../redux/state/app-state"
import {applyFilterAndSortEntities} from "../../../utils"
import {ModuleSelection} from "./module-selection"

interface ModuleSelectionSubheaderConfig {
  readonly labelKey: LucaI18nLangKey
  readonly navigationButton: ButtonConfig
  readonly customStyles?: CSSInterpolation
  readonly entityFilterType: EntityFiltersType
  readonly customFilterHeaderStyles?: CSSInterpolation
}

interface ModuleSelectionFooterConfig {
  readonly emptySelectionKey: LucaI18nLangKey
  readonly entitySelectionKey: LucaI18nLangKey
}

export type SelectionCardStatusConfig = Pick<EditingStatusIndicatorProps, "isPublished"> &
  Pick<EditingStatusIndicatorProps, "isFinalized">

export interface ModuleSelectionContainerProps<T extends SelectionBaseEntity> {
  readonly multiSelection?: boolean
  readonly entities: T[]
  readonly alreadyAssignedEntities: T[]
  readonly renderContent: (entity: T, footer: React.ReactElement) => React.ReactNode
  readonly onSelectionConfirmed: (selectedEntities: T[]) => void
  readonly subheaderConfig: ModuleSelectionSubheaderConfig
  readonly footerConfig: ModuleSelectionFooterConfig
  readonly customCardOverviewStyles?: CSSInterpolation
  readonly renderCustomCardFooterItem?: (entity: T) => React.ReactElement
  readonly getEditingStatusConfig?: (entity: T) => SelectionCardStatusConfig
  readonly customCardCount?: number
  readonly userMayFinalizeWithoutPublishing?: boolean
}

export interface SelectionBaseEntity {
  readonly id: UUID
  readonly createdAt: string
  readonly name?: string
  readonly title?: string
  readonly author: {
    readonly firstName: string
    readonly lastName: string
    readonly id: string
  }
}

export const ModuleSelectionContainer = <T extends SelectionBaseEntity>({
  entities,
  subheaderConfig,
  alreadyAssignedEntities,
  ...rest
}: ModuleSelectionContainerProps<T>) => {
  const [selectedEntities, setSelectedEntities] = React.useState<T[]>([])
  const {account: user} = useCheckLogin()

  const {t} = useLucaTranslation()

  const deselectEntity = (entity: T) =>
    setSelectedEntities(selectedEntities.filter(selectedEntity => entity.id !== selectedEntity.id))

  const selectEntity = (entity: T) => setSelectedEntities([...selectedEntities, entity])

  const filterOptions = useSelector<AppState, EntityFilterConfig>(
    state => state.ui.common.entityFilters[subheaderConfig.entityFilterType]
  )

  const filteredAndSortedEntities = applyFilterAndSortEntities<T>(
    filterOptions,
    entities,
    user.safeAsSubtype(),
    Option.of(selectedEntities.map(entity => entity.id))
  )

  return (
    <ModuleSelection
      subheaderConfig={subheaderConfig}
      entities={filteredAndSortedEntities}
      deselectEntity={deselectEntity}
      selectEntity={selectEntity}
      selectedEntities={selectedEntities}
      alreadyAssignedEntities={alreadyAssignedEntities}
      {...rest}
      t={t}
    />
  )
}
