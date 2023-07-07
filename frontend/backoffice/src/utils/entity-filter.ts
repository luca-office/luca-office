/* eslint-disable max-lines */
import {parseJSON} from "date-fns"
import {sortBy} from "lodash-es"
import {SelectOptionCustomized} from "shared/components"
import {IconName, IconPosition} from "shared/enums"
import {SelectOption} from "shared/models"
import {LucaI18nLangKey, LucaTFunction} from "shared/translations"
import {isDefined, now, Option} from "shared/utils"
import {EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../enums"
import {
  AuthoredEntity,
  CompletionStateEntity,
  EntityFilterConfig,
  EntityFiltersType,
  FilterSortCompatibleEntity,
  SearchableEntity,
  SortableEntity,
  UserAccount
} from "../models"
import {
  questionnairesFilterOptions,
  questionnairesSortOptions,
  questionnairesTypeFilterOptions,
  ratingSortOptions,
  ratingStateFilterOptions,
  sampleCompanyFilterOptions,
  sampleCompanySortOptions
} from "../modules"
import {referenceBookChapterFilterOptions} from "../modules/reference-book-chapters/config/sort-filter-config"
import {
  scenarioSelectionStateFilterOptions,
  scenarioSelectionTypeFilterOptions,
  scenarioSortOptions,
  scenarioStateFilterOptions
} from "../modules/scenarios/config/sort-filter-config"
import {
  scenarioCodingModelsSortOptions,
  scenarioCodingModelStateFilterOptions,
  scenarioCodingModelTypeFilterOptions
} from "../modules/scenarios-coding-models/config/sort-filter-config"

const defaultTypeFilters = [EntityFilterOptionType.ALL_ENTITIES, EntityFilterOptionType.OWNED_ENTITIES]
const defaultSortOptions = [EntitySortOption.BY_TITLE, EntitySortOption.BY_CREATION_DATE, EntitySortOption.BY_AUTHOR]
const defaultStateFilters = [
  EntityFilterOptionState.SHOW_ALL,
  EntityFilterOptionState.PUBLISHED,
  EntityFilterOptionState.UNPUBLISHED
]

/**
 * Construct translation key for filter options in subheader
 * @param isFilter - prefix for filter
 * @param key - actual sorting key
 */
const getTranslationKey = (isFilter: boolean, key: string) =>
  isFilter ? `subheader__filter_by_${key}` : `subheader__sort_by_${key}`

/**
 * Compute select value, label and selected state for subheader filter menu
 * @param displayedFilters - actual options that should be visible
 * @param entityTitleKey - added to translation for type filter
 * @param isFilterOption - used to determine correct translation keys
 * @param t - translate Fn
 * @param activeValue - current selection
 * @param selectionCount - selected entities count
 */
const computeFilterAndSortingOptions = (
  displayedFilters: (EntityFilterOptionType | EntityFilterOptionState | EntitySortOption)[],
  entityTitleKey: LucaI18nLangKey,
  isFilterOption: boolean,
  t: LucaTFunction,
  activeValue?: EntityFilterOptionType | EntityFilterOptionState | EntitySortOption,
  selectionCount?: number
): SelectOptionCustomized[] =>
  displayedFilters
    ? displayedFilters.map(filter => ({
        label: t((getTranslationKey(isFilterOption, filter as string) as unknown) as LucaI18nLangKey, {
          entity: t(entityTitleKey),
          count: selectionCount
        }),
        value: filter,
        selected: !!activeValue && activeValue === filter,
        ...getOptionIcons(filter)
      }))
    : []

const getOptionIcons = (
  displayedFilter: EntityFilterOptionType | EntityFilterOptionState | EntitySortOption
): Partial<SelectOptionCustomized> | Record<string, unknown> => {
  switch (displayedFilter) {
    case EntityFilterOptionState.IN_PROGRESS:
      return {
        iconPosition: IconPosition.RightAlign,
        iconName: IconName.EditBordered
      }
    case EntityFilterOptionState.DONE:
      return {
        iconPosition: IconPosition.RightAlign,
        iconName: IconName.LockClosed
      }
    case EntityFilterOptionState.PUBLISHED:
      return {
        iconPosition: IconPosition.RightAlign,
        iconName: IconName.Publish
      }
    case EntityFilterOptionState.RATING_DONE:
      return {
        iconPosition: IconPosition.RightAlign,
        iconName: IconName.Check
      }
    default:
      return {}
  }
}

/**
 * Compute select value, label and selected state for all fields in subheader filter menu
 * @param activeConfig - currently selection options plus search
 * @param entityFiltersType - entityKey to determine correct options and translation
 * @param t - translate Fn
 * @param selectionCount - number of selected elements
 * @param userMayFinalizeWithoutPublishing - if user has the corresponding claim
 */
export const computeFilterAndSortingForEntity = (
  activeConfig: EntityFilterConfig,
  entityFiltersType: EntityFiltersType,
  t: LucaTFunction,
  selectionCount?: number,
  userMayFinalizeWithoutPublishing?: boolean
): {sort: SelectOption[]; search: string; type: SelectOption[]; state: SelectOption[]} => {
  let sortOptions = defaultSortOptions
  let stateFilterOptions = defaultStateFilters
  let typeFilterOptions = defaultTypeFilters
  let titleKey: LucaI18nLangKey = "subheader__filter_default_title"

  switch (entityFiltersType) {
    case "referenceBookChapters": {
      titleKey = "reference_books__filter_title"
      stateFilterOptions = referenceBookChapterFilterOptions
      break
    }
    case "scenarioReferenceBookChaptersSelection": {
      titleKey = "reference_books__filter_title"
      stateFilterOptions = []
      break
    }
    case "scenarioSampleCompanySelection": {
      titleKey = "sample_companies__filter_title"
      sortOptions = sampleCompanySortOptions
      stateFilterOptions = []
      break
    }
    case "scenarioQuestionnaireSelection": {
      titleKey = "questionnaires__selection_details_label"
      sortOptions = questionnairesSortOptions
      stateFilterOptions = []
      break
    }
    case "sampleCompanies": {
      titleKey = "sample_companies__filter_title"
      stateFilterOptions = sampleCompanyFilterOptions
      break
    }
    case "questionnaires": {
      titleKey = "questionnaires__filter_title"
      sortOptions = questionnairesSortOptions
      stateFilterOptions = !userMayFinalizeWithoutPublishing
        ? questionnairesFilterOptions.filter(withoutDoneState)
        : questionnairesFilterOptions
      typeFilterOptions = questionnairesTypeFilterOptions
      break
    }
    case "events": {
      titleKey = "events__filter_title"
      sortOptions = questionnairesSortOptions
      stateFilterOptions = questionnairesFilterOptions.filter(withoutDoneState)
      typeFilterOptions = questionnairesTypeFilterOptions
      break
    }
    case "scenarios": {
      titleKey = "scenario__filter_title"
      sortOptions = scenarioSortOptions
      stateFilterOptions = !userMayFinalizeWithoutPublishing
        ? scenarioStateFilterOptions.filter(withoutDoneState)
        : scenarioStateFilterOptions
      break
    }
    case "scenarioSelection": {
      titleKey = "scenario__filter_title"
      sortOptions = scenarioSortOptions
      typeFilterOptions = scenarioSelectionTypeFilterOptions
      stateFilterOptions = !userMayFinalizeWithoutPublishing
        ? scenarioSelectionStateFilterOptions.filter(withoutDoneState)
        : scenarioSelectionStateFilterOptions
      break
    }
    case "scenarioSelectionPublished": {
      titleKey = "scenario__filter_title"
      sortOptions = scenarioSortOptions
      stateFilterOptions = []
      typeFilterOptions = scenarioSelectionTypeFilterOptions
      break
    }
    case "questionnaireSelection": {
      titleKey = "questionnaires__filter_title"
      sortOptions = questionnairesSortOptions
      stateFilterOptions = !userMayFinalizeWithoutPublishing
        ? scenarioSelectionStateFilterOptions.filter(withoutDoneState)
        : scenarioSelectionStateFilterOptions
      typeFilterOptions = scenarioSelectionTypeFilterOptions
      break
    }
    case "questionnaireSelectionPublished": {
      titleKey = "questionnaires__filter_title"
      sortOptions = questionnairesSortOptions
      stateFilterOptions = []
      typeFilterOptions = scenarioSelectionTypeFilterOptions
      break
    }
    case "scenarioCodingModels": {
      titleKey = "coding_models__filter_title"
      sortOptions = scenarioCodingModelsSortOptions
      typeFilterOptions = scenarioCodingModelTypeFilterOptions
      stateFilterOptions = scenarioCodingModelStateFilterOptions
      break
    }
    case "projects": {
      titleKey = "project__filter_title"
      sortOptions = scenarioSortOptions // same options for now
      stateFilterOptions = scenarioStateFilterOptions // same options for now
      break
    }
    case "ratings": {
      titleKey = "rating__filter_title"
      sortOptions = ratingSortOptions
      typeFilterOptions = scenarioCodingModelTypeFilterOptions
      stateFilterOptions = ratingStateFilterOptions
      break
    }
    // extend by scenarios and so on, place the filter options config in modules/xy/config pls
  }

  return {
    search: activeConfig?.search || "",
    sort: computeFilterAndSortingOptions(sortOptions, titleKey, false, t, activeConfig?.sortBy),
    state: computeFilterAndSortingOptions(stateFilterOptions, titleKey, true, t, activeConfig?.state),
    type: computeFilterAndSortingOptions(typeFilterOptions, titleKey, true, t, activeConfig?.type, selectionCount)
  }
}

/**
 * Sort entities by given criteria of EntitySortOption
 * @param filterOptions - selected sort option
 * @param entities - current entities (pre-filtered list usually)
 */
const applySorting = (filterOptions: EntityFilterConfig, entities: Partial<SortableEntity>[]) => {
  switch (filterOptions.sortBy) {
    case EntitySortOption.BY_DATE:
    case EntitySortOption.BY_CREATION_DATE:
      return sortBy(entities, _ => now().getTime() - (_.createdAt ? parseJSON(_.createdAt).getTime() : 0))
    case EntitySortOption.BY_AUTHOR:
      return sortBy(entities, _ => _.author?.lastName)
    case EntitySortOption.BY_TITLE:
      return sortBy(entities, _ => _.title?.toLowerCase())
    case EntitySortOption.BY_NAME:
      return sortBy(entities, _ => _.name?.toLowerCase())
    case EntitySortOption.BY_DURATION:
      return sortBy(entities, _ => _.maxDurationInSeconds || 99999)
  }
}

/**
 * Check if certain entities keys match a given search word (one of any)
 * @param filterOptions - typein search
 * @param entity - entity of list to be filtered
 */
const applySearch = (filterOptions: EntityFilterConfig, entity: Partial<SearchableEntity>) => {
  const searchInputWithRemovedWhitespace = filterOptions.search?.toLowerCase().replace(/\s/g, "")

  return filterOptions.search
    ? entity.title?.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        entity.name?.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        entity.description?.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        entity.tags?.filter(tag => tag.toLowerCase().includes(filterOptions.search.toLowerCase())).length ||
        entity.author?.lastName.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        entity.author?.firstName?.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        `${entity.author?.firstName?.toLowerCase()}${entity.author?.lastName?.toLowerCase()}`.includes(
          searchInputWithRemovedWhitespace
        )
    : true
}

/**
 * Check if entity matches type filter criteria (EntityFilterOptionType)
 * @param filterOptions - selected type criteria, specifically
 * @param entity - entity of list to be filtered
 * @param user - user account to check for authorship by id
 * @param selectedIds - selected entities
 */
const applyTypeFilter = (
  filterOptions: EntityFilterConfig,
  entity: Partial<AuthoredEntity>,
  user: Option<UserAccount>,
  selectedIds: Option<UUID[]>
) => {
  switch (filterOptions.type) {
    case EntityFilterOptionType.ALL_ENTITIES:
      return true
    case EntityFilterOptionType.OWNED_ENTITIES:
      return user.map(user => entity.author?.id === user.id).getOrElse(false)
    case EntityFilterOptionType.SELECTED_ENTITIES:
      return entity.id && selectedIds.getOrElse([]).includes(entity.id)
  }
}

/**
 * Check if entity matches type filter criteria (EntityFilterOptionState)
 * @param filterOptions - selected state criteria, specifically
 * @param entity - entity of list to be filtered
 */
const applyStateFilter = (filterOptions: EntityFilterConfig, entity: Partial<CompletionStateEntity>) => {
  if ("publishedAt" in entity) {
    switch (filterOptions.state) {
      case EntityFilterOptionState.PUBLISHED:
        return isDefined(entity.publishedAt)
      case EntityFilterOptionState.UNPUBLISHED:
        return !isDefined(entity.publishedAt)
      case EntityFilterOptionState.IN_PROGRESS:
        return !isDefined(entity.publishedAt) && !isDefined(entity.finalizedAt)
    }
  }

  if ("finalizedAt" in entity) {
    switch (filterOptions.state) {
      case EntityFilterOptionState.DONE:
        return isDefined(entity.finalizedAt) && !isDefined(entity.publishedAt)
      case EntityFilterOptionState.SHOW_ALL:
        return entity
      case EntityFilterOptionState.IN_PROGRESS:
        return !isDefined(entity.finalizedAt) && !isDefined(entity.publishedAt)
      case EntityFilterOptionState.RATING_DONE:
        return isDefined(entity.finalizedAt)
    }
  }

  if ("isFinalized" in entity) {
    switch (filterOptions.state) {
      case EntityFilterOptionState.DONE:
        return entity.isFinalized
      case EntityFilterOptionState.SHOW_ALL:
        return entity
      case EntityFilterOptionState.IN_PROGRESS:
        return !entity.isFinalized
    }
  }

  return true
}

/**
 * sort any list of given entities in overviews of modules, e.g. sample companies
 * @param filterOptions - selected filter options and search
 * @param entities - list to sort
 * @param user - logged in user to e.g. filter by author
 * @param selectedIds - selected entities
 */
export function applyFilterAndSortEntities<T extends Partial<FilterSortCompatibleEntity>>(
  filterOptions: EntityFilterConfig,
  entities: T[],
  user: Option<UserAccount>,
  selectedIds: Option<UUID[]>
): T[] {
  const filteredEntities = entities.filter(
    entity =>
      applySearch(filterOptions, entity) &&
      applyStateFilter(filterOptions, entity) &&
      applyTypeFilter(filterOptions, entity, user, selectedIds)
  )

  return applySorting(filterOptions, filteredEntities) as T[]
}

const withoutDoneState = (option: EntityFilterOptionState) => option !== EntityFilterOptionState.DONE
