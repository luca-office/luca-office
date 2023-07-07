import {EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../../../enums"

export const questionnairesSortOptions = [
  EntitySortOption.BY_TITLE,
  EntitySortOption.BY_CREATION_DATE,
  EntitySortOption.BY_AUTHOR
]

export const questionnairesFilterOptions = [
  EntityFilterOptionState.SHOW_ALL,
  EntityFilterOptionState.IN_PROGRESS,
  EntityFilterOptionState.DONE,
  EntityFilterOptionState.PUBLISHED
]

export const questionnairesTypeFilterOptions = [
  EntityFilterOptionType.ALL_ENTITIES,
  EntityFilterOptionType.OWNED_ENTITIES
]
