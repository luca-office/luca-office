import {EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../../../enums"

export const sampleCompanySortOptions = [
  EntitySortOption.BY_TITLE,
  EntitySortOption.BY_CREATION_DATE,
  EntitySortOption.BY_AUTHOR
]

export const sampleCompanyFilterOptions = [
  EntityFilterOptionState.SHOW_ALL,
  EntityFilterOptionState.IN_PROGRESS,
  EntityFilterOptionState.PUBLISHED
]

export const sampleCompanyTypeFilterOptions = [
  EntityFilterOptionType.ALL_ENTITIES,
  EntityFilterOptionType.SELECTED_ENTITIES
]
