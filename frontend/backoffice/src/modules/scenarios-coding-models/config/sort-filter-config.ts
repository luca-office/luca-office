import {EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../../../enums"

export const scenarioCodingModelsSortOptions = [
  EntitySortOption.BY_TITLE,
  EntitySortOption.BY_CREATION_DATE,
  EntitySortOption.BY_AUTHOR
]

export const scenarioCodingModelTypeFilterOptions = [
  EntityFilterOptionType.ALL_ENTITIES,
  EntityFilterOptionType.OWNED_ENTITIES
]

export const scenarioCodingModelStateFilterOptions = [
  EntityFilterOptionState.SHOW_ALL,
  EntityFilterOptionState.IN_PROGRESS,
  EntityFilterOptionState.DONE
]
