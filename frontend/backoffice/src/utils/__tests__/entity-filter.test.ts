import {userAccountMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {EntityFilterOptionState, EntityFilterOptionType, EntitySortOption} from "../../enums"
import {EntityFilterConfig} from "../../models"
import {initialCommonUiState} from "../../redux/state/ui/common-ui-state"
import {entityFilterMock} from "../__mocks__/entity-filter-data.mock"
import {applyFilterAndSortEntities, computeFilterAndSortingForEntity} from "../entity-filter"

describe("entity-filter", () => {
  it("can computeFilterAndSortingForEntity", () => {
    const refFilters = computeFilterAndSortingForEntity(
      initialCommonUiState.entityFilters.referenceBookChapters,
      "referenceBookChapters",
      fakeTranslate
    )
    expect(refFilters).toBeDefined()
    expect(refFilters.type).toBeDefined()
    expect(refFilters.type).toEqual([
      {label: "subheader__filter_by_all_entities", selected: true, value: "all_entities"},
      {label: "subheader__filter_by_owned_entities", selected: false, value: "owned_entities"}
    ])
    expect(refFilters.search).toBeDefined()
    expect(refFilters.state).toBeDefined()
    expect(refFilters.sort).toBeDefined()

    // does not crash
    const nullFilter = computeFilterAndSortingForEntity(null as any, "wrongType" as any, fakeTranslate)
    expect(nullFilter).toBeDefined()
    expect(nullFilter.type).toBeDefined()
    expect(nullFilter.type).toEqual([
      {label: "subheader__filter_by_all_entities", selected: false, value: "all_entities"},
      {label: "subheader__filter_by_owned_entities", selected: false, value: "owned_entities"}
    ])
    expect(nullFilter.search).toBeDefined()
    expect(nullFilter.state).toBeDefined()
    expect(nullFilter.sort).toBeDefined()
    // sample companies
    const cmpFilters = computeFilterAndSortingForEntity(
      initialCommonUiState.entityFilters.sampleCompanies,
      "sampleCompanies",
      fakeTranslate
    )
    expect(cmpFilters).toBeDefined()
    expect(cmpFilters.type).toBeDefined()
    expect(cmpFilters.type).toEqual([
      {label: "subheader__filter_by_all_entities", selected: true, value: "all_entities"},
      {label: "subheader__filter_by_owned_entities", selected: false, value: "owned_entities"}
    ])
    expect(cmpFilters.search).toBeDefined()
    expect(cmpFilters.state).toBeDefined()
    expect(cmpFilters.sort).toBeDefined()
  })

  it("can applyFilterAndSortEntities > general", () => {
    const sorting: EntityFilterConfig = {
      state: EntityFilterOptionState.PUBLISHED,
      type: EntityFilterOptionType.ALL_ENTITIES,
      sortBy: EntitySortOption.BY_TITLE,
      search: ""
    }
    const author = Option.of({...userAccountMock, ...entityFilterMock[0].author})
    const sortedEntites = applyFilterAndSortEntities(sorting, entityFilterMock, author, Option.none())

    expect(sortedEntites).toBeDefined()
    expect(sortedEntites).toHaveLength(entityFilterMock.filter(entity => !!entity.publishedAt).length)
    expect(sortedEntites[0].id).toEqual(entityFilterMock[1].id)
  })

  it("can applyFilterAndSortEntities > sortBy", () => {
    const sorting: EntityFilterConfig = {
      state: EntityFilterOptionState.PUBLISHED,
      type: EntityFilterOptionType.ALL_ENTITIES,
      sortBy: EntitySortOption.BY_CREATION_DATE,
      search: ""
    }
    // sort by date
    const author = Option.of({...userAccountMock, id: entityFilterMock[0].author.id})
    const sortedEntites = applyFilterAndSortEntities(sorting, entityFilterMock, author, Option.none())

    expect(sortedEntites).toBeDefined()
    expect(sortedEntites[0].id).toEqual(entityFilterMock[0].id)
    // sort by author
    const sortedEntitesByAuthor = applyFilterAndSortEntities(
      {...sorting, sortBy: EntitySortOption.BY_AUTHOR},
      entityFilterMock,
      author,
      Option.none()
    )

    expect(sortedEntitesByAuthor).toBeDefined()
    expect(sortedEntitesByAuthor[0].id).toEqual(entityFilterMock[2].id)
  })

  it("can applyFilterAndSortEntities > type", () => {
    const sorting: EntityFilterConfig = {
      state: EntityFilterOptionState.PUBLISHED,
      type: EntityFilterOptionType.OWNED_ENTITIES,
      sortBy: EntitySortOption.BY_CREATION_DATE,
      search: ""
    }
    // filter by type with author user
    const author = Option.of({...userAccountMock, id: entityFilterMock[1].author.id})
    const sortedEntites = applyFilterAndSortEntities(sorting, entityFilterMock, author, Option.none())

    expect(sortedEntites).toBeDefined()
    expect(sortedEntites).toHaveLength(
      entityFilterMock.filter(entity => !!entity.publishedAt && entity.author.id === author.orNull()?.id).length
    )
    expect(sortedEntites[0].id).toEqual(entityFilterMock[1].id)
    // filter by type with user who has no entities assigned
    const sortedEntitesRandomUser = applyFilterAndSortEntities(
      {...sorting, sortBy: EntitySortOption.BY_AUTHOR},
      entityFilterMock,
      author.map(user => ({...user, id: "random"})),
      Option.none()
    )

    expect(sortedEntitesRandomUser).toBeDefined()
    expect(sortedEntitesRandomUser).toHaveLength(0)
    // filter by type without user and search
    const removedSort = {
      state: EntityFilterOptionState.PUBLISHED,
      type: EntityFilterOptionType.OWNED_ENTITIES,
      sortBy: EntitySortOption.BY_AUTHOR
    }
    const sortedEntitesNoUser = applyFilterAndSortEntities(
      {...removedSort, sortBy: EntitySortOption.BY_AUTHOR} as any,
      entityFilterMock,
      Option.none(),
      Option.none()
    )

    expect(sortedEntitesNoUser).toBeDefined()
    expect(sortedEntitesNoUser).toHaveLength(0)
    // filter by type with selected entities
    const sortedEntitesSelected = applyFilterAndSortEntities(
      {...sorting, type: EntityFilterOptionType.SELECTED_ENTITIES} as any,
      entityFilterMock,
      Option.none(),
      Option.of([entityFilterMock[0].id])
    )

    expect(sortedEntitesSelected).toBeDefined()
    expect(sortedEntitesSelected).toHaveLength(1)
  })
  it("can applyFilterAndSortEntities > state", () => {
    const sorting: EntityFilterConfig = {
      state: EntityFilterOptionState.UNPUBLISHED,
      type: EntityFilterOptionType.ALL_ENTITIES,
      sortBy: EntitySortOption.BY_CREATION_DATE,
      search: ""
    }
    // filter by published state
    const author = Option.of({...userAccountMock, id: entityFilterMock[1].author.id})
    const sortedEntites = applyFilterAndSortEntities(sorting, entityFilterMock, author, Option.none())

    expect(sortedEntites).toBeDefined()
    expect(sortedEntites).toHaveLength(entityFilterMock.filter(entity => !entity.publishedAt).length)
    expect(sortedEntites[0].id).toEqual(entityFilterMock[3].id)

    // filter by published state (no published state in entity
    const noPublishMock = [{id: "123", title: "name", description: "name"}]
    const sortedEntitesNoPublish = applyFilterAndSortEntities(sorting, noPublishMock, author, Option.none())

    expect(sortedEntitesNoPublish).toBeDefined()
    expect(sortedEntitesNoPublish).toHaveLength(noPublishMock.length)
  })

  it("can applyFilterAndSortEntities > search", () => {
    const sorting: EntityFilterConfig = {
      state: EntityFilterOptionState.PUBLISHED,
      type: EntityFilterOptionType.ALL_ENTITIES,
      sortBy: EntitySortOption.BY_CREATION_DATE,
      search: "Venture"
    }
    // filter by search (title)
    const author = Option.of({...userAccountMock, id: entityFilterMock[1].author.id})
    const sortedEntites = applyFilterAndSortEntities(sorting, entityFilterMock, author, Option.none())

    expect(sortedEntites).toBeDefined()
    expect(sortedEntites).toHaveLength(
      entityFilterMock.filter(entity => !!entity.publishedAt && entity.title.toLowerCase().indexOf("venture") !== -1)
        .length
    )

    // filter by search (description)
    const sortedEntitesDesc = applyFilterAndSortEntities(
      {...sorting, search: "description"},
      entityFilterMock,
      author,
      Option.none()
    )

    expect(sortedEntitesDesc).toBeDefined()
    expect(sortedEntitesDesc).toHaveLength(
      entityFilterMock.filter(
        entity => !!entity.publishedAt && entity.description.toLowerCase().indexOf("description") !== -1
      ).length
    )

    // filter by search (description)
    const sortedEntitesEmpty = applyFilterAndSortEntities(
      {...sorting, search: "random stuff"},
      entityFilterMock,
      author,
      Option.none()
    )

    expect(sortedEntitesEmpty).toBeDefined()
    expect(sortedEntitesEmpty).toHaveLength(0)

    // filter by search (author)
    const searchAuthor = {
      ...userAccountMock,
      id: entityFilterMock[3].id,
      firstName: entityFilterMock[4].author.firstName,
      lastName: entityFilterMock[4].author.lastName
    }
    const sortedEntitesAuthorFirst = applyFilterAndSortEntities(
      {...sorting, search: searchAuthor.firstName},
      entityFilterMock,
      Option.of(searchAuthor),
      Option.none()
    )

    expect(sortedEntitesAuthorFirst).toBeDefined()
    expect(sortedEntitesAuthorFirst).toHaveLength(
      entityFilterMock.filter(entity => entity.author.firstName === searchAuthor.firstName).length
    )
    const sortedEntitesAuthorLast = applyFilterAndSortEntities(
      {...sorting, search: searchAuthor.lastName},
      entityFilterMock,
      Option.of(searchAuthor),
      Option.none()
    )
    expect(sortedEntitesAuthorLast).toBeDefined()
    expect(sortedEntitesAuthorLast).toHaveLength(
      entityFilterMock.filter(entity => entity.author.lastName === searchAuthor.lastName).length
    )
  })
})
