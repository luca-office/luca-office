export enum EntityFilterOption {
  TYPE = "type",
  SORT_BY = "sortBy",
  STATE = "state",
  SEARCH = "search"
}

export enum EntityFilterOptionType {
  ALL_ENTITIES = "all_entities",
  OWNED_ENTITIES = "owned_entities",
  SELECTED_ENTITIES = "selected_entities"
}

export enum EntitySortOption {
  BY_NAME = "name",
  BY_TITLE = "title",
  BY_CREATION_DATE = "creation_date",
  BY_AUTHOR = "author",
  BY_DURATION = "duration",
  BY_DATE = "date"
}

export enum EntityFilterOptionState {
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished",
  SHOW_ALL = "show_all",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  RATING_DONE = "rating_done"
}
