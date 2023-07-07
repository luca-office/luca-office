import {EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../../../enums"

// please note that this config is currently being reused in projects module!
export const scenarioSortOptions = [
  EntitySortOption.BY_TITLE,
  EntitySortOption.BY_CREATION_DATE,
  EntitySortOption.BY_AUTHOR,
  EntitySortOption.BY_DURATION
]

export const scenarioStateFilterOptions = [
  EntityFilterOptionState.SHOW_ALL,
  EntityFilterOptionState.IN_PROGRESS,
  EntityFilterOptionState.DONE,
  EntityFilterOptionState.PUBLISHED
]

export const scenarioSelectionTypeFilterOptions = [
  EntityFilterOptionType.ALL_ENTITIES,
  EntityFilterOptionType.OWNED_ENTITIES,
  EntityFilterOptionType.SELECTED_ENTITIES
]

export const scenarioSelectionStateFilterOptions = [
  EntityFilterOptionState.SHOW_ALL,
  EntityFilterOptionState.IN_PROGRESS,
  EntityFilterOptionState.DONE,
  EntityFilterOptionState.PUBLISHED
]
