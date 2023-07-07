import {EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../../../../../enums"
import {EntityFilterConfig} from "../../../../../models"

export const entityFilterConfigMock: EntityFilterConfig = {
  sortBy: EntitySortOption.BY_NAME,
  state: EntityFilterOptionState.SHOW_ALL,
  type: EntityFilterOptionType.ALL_ENTITIES,
  search: ""
}
