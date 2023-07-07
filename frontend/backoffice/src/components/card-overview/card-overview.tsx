import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Children, CustomStyle, spacingMedium} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {EntityFilterOption} from "../../enums"
import {EntityFilterConfig, EntityFiltersType} from "../../models"
import {updateEntitySortingAndFilters} from "../../redux/actions/ui/common-ui-action"
import {AppState} from "../../redux/state/app-state"
import {overviewCardMinWidth} from "../../styles/common"
import {computeFilterAndSortingForEntity} from "../../utils"
import {CreationCard, SubHeaderFilter} from ".."

interface Props extends CustomStyle, Children {
  readonly advancedFilters?: boolean
  readonly create?: () => void
  readonly creationText?: string
  readonly customSectionStyles?: CSSInterpolation
  readonly customSubheaderStyles?: CSSInterpolation
  readonly entityFilterType: EntityFiltersType
  readonly minCardWidth?: number
  readonly searchPlaceholderKey?: LucaI18nLangKey
  readonly selectionCount?: number
  readonly userMayFinalizeWithoutPublishing?: boolean
}

export const CardOverview: React.FC<Props> = ({
  advancedFilters = false,
  children,
  create,
  creationText,
  customSectionStyles,
  customStyles,
  customSubheaderStyles,
  entityFilterType,
  minCardWidth = overviewCardMinWidth,
  searchPlaceholderKey,
  selectionCount,
  userMayFinalizeWithoutPublishing
}) => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()
  const handleFilterChange = (type: EntityFilterOption, value: string) => {
    dispatch(updateEntitySortingAndFilters(entityFilterType, {[type]: value} as Partial<EntityFilterConfig>))
  }
  // this might need a debounce and a state in the future
  const handleSearch = (search: string) => {
    handleFilterChange(EntityFilterOption.SEARCH, search)
  }
  const activeFilters = useSelector<AppState, EntityFilterConfig>(
    state => state.ui.common.entityFilters[entityFilterType]
  )

  const filterOptions = computeFilterAndSortingForEntity(
    activeFilters,
    entityFilterType,
    t,
    selectionCount,
    userMayFinalizeWithoutPublishing
  )

  return (
    <React.Fragment>
      <SubHeaderFilter
        advancedFilters={advancedFilters}
        customSubheaderStyles={customSubheaderStyles}
        searchPlaceholderKey={searchPlaceholderKey}
        onChange={handleFilterChange}
        onSearchTextChange={handleSearch}
        typeOptions={filterOptions.type}
        sortOptions={filterOptions.sort}
        stateOptions={filterOptions.state}
        searchText={filterOptions.search}
      />
      <div css={customStyles}>
        <section css={[getStyles(minCardWidth), customSectionStyles]}>
          {!!create && !!creationText && <CreationCard onClick={create} text={creationText} />}
          {children}
        </section>
      </div>
    </React.Fragment>
  )
}

const getStyles = (minCardWidth: number) =>
  css({
    display: "grid",
    padding: `${spacingMedium}px 0`,
    gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px,1fr))`,
    gridGap: spacingMedium
  })
