import {EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../enums"

// Sort option and config types
export interface EntityFilterConfig {
  readonly sortBy: EntitySortOption
  readonly state: EntityFilterOptionState
  readonly type: EntityFilterOptionType
  readonly search: string
}

export interface EntityFilters {
  readonly projects: EntityFilterConfig
  readonly referenceBookChapters: EntityFilterConfig
  readonly scenarioReferenceBookChaptersSelection: EntityFilterConfig
  readonly scenarioSampleCompanySelection: EntityFilterConfig
  readonly scenarioQuestionnaireSelection: EntityFilterConfig
  readonly scenarioCodingModels: EntityFilterConfig
  readonly sampleCompanies: EntityFilterConfig
  readonly questionnaires: EntityFilterConfig
  readonly events: EntityFilterConfig
  readonly scenarios: EntityFilterConfig
  readonly scenarioSelection: EntityFilterConfig
  readonly scenarioSelectionPublished: EntityFilterConfig
  readonly questionnaireSelection: EntityFilterConfig
  readonly questionnaireSelectionPublished: EntityFilterConfig
  readonly ratings: EntityFilterConfig
}

export type EntityFiltersType = keyof EntityFilters

// Sort entity (to apply sorting)
export interface AuthoredEntity {
  readonly id: string
  readonly author: {
    readonly id: string
    readonly lastName: string
    readonly firstName?: string
  }
}

export interface SortableEntity extends AuthoredEntity {
  readonly createdAt: string
  readonly title: string
  readonly name: string
  readonly maxDurationInSeconds: number | null
}

export interface CompletionStateEntity {
  readonly publishedAt: string | null
  readonly finalizedAt: string | null
  readonly isFinalized: boolean | null
}

export interface SearchableEntity extends AuthoredEntity {
  readonly description: string
  readonly name?: string
  readonly title?: string
  readonly tags?: string[]
}

export type FilterSortCompatibleEntity = AuthoredEntity & SortableEntity & CompletionStateEntity & SearchableEntity
