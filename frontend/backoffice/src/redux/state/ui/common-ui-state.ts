import {AppNotification} from "shared/models"
import {Option} from "shared/utils"
import {AppMode, EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../../../enums"
import {EntityFilters} from "../../../models"

export interface CommonUiState {
  readonly appMode: AppMode
  readonly isChatOpen: boolean
  readonly entityFilters: EntityFilters
  readonly notification: Option<AppNotification>
}

export const initialCommonUiState: CommonUiState = {
  appMode: AppMode.EDITOR,
  isChatOpen: false,
  notification: Option.none<AppNotification>(),
  entityFilters: {
    referenceBookChapters: {
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES,
      search: ""
    },
    scenarioReferenceBookChaptersSelection: {
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.PUBLISHED,
      type: EntityFilterOptionType.ALL_ENTITIES,
      search: ""
    },
    scenarioSampleCompanySelection: {
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.PUBLISHED,
      type: EntityFilterOptionType.ALL_ENTITIES,
      search: ""
    },
    scenarioQuestionnaireSelection: {
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES,
      search: ""
    },
    scenarioCodingModels: {
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES,
      search: ""
    },
    sampleCompanies: {
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES,
      search: ""
    },
    questionnaires: {
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES,
      search: ""
    },
    events: {
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES,
      search: ""
    },
    scenarios: {
      search: "",
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.OWNED_ENTITIES
    },
    scenarioSelection: {
      search: "",
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES
    },
    scenarioSelectionPublished: {
      search: "",
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES
    },
    projects: {
      search: "",
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES
    },
    questionnaireSelection: {
      search: "",
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES
    },
    questionnaireSelectionPublished: {
      search: "",
      sortBy: EntitySortOption.BY_CREATION_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES
    },
    ratings: {
      search: "",
      sortBy: EntitySortOption.BY_DATE,
      state: EntityFilterOptionState.SHOW_ALL,
      type: EntityFilterOptionType.ALL_ENTITIES
    }
  }
}
