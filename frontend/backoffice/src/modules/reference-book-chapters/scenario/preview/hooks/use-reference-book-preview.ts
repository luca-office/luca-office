import {useState} from "react"
import {useScenarioReferenceBookChapters} from "shared/graphql/hooks/queries"
import {ReferenceBookArticle, ReferenceBookChapter, TocChapter} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {
  convertReferenceBookChaptersToChapters,
  findSelectedReferenceBookArticle,
  findSelectedReferenceBookChapter,
  getSelectedReferenceBookChapterTitle,
  Option,
  searchReferenceBookChapters
} from "shared/utils"

export interface ReferenceBookPreviewHook {
  readonly chapterTitle: Option<string>
  readonly dataLoading: boolean
  readonly onSearch: (value: string) => void
  readonly referenceBookChapters: Option<TocChapter[]>
  readonly selectedArticle: Option<ReferenceBookArticle>
  readonly selectedChapter: Option<ReferenceBookChapter>
  readonly selectedElementId: Option<UUID>
  readonly selectElementId: (id: Option<UUID>) => void
}

export const useReferenceBookPreview = (scenarioId: UUID): ReferenceBookPreviewHook => {
  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)
  const allReferenceBookChapters = scenarioReferenceBooks.map(chapters => chapters as ReferenceBookChapter[])

  const [searchPhrase, setSearchPhrase] = useState("")
  const [selectedElementId, setSelectedElementId] = useState<Option<UUID>>(Option.none())

  const {t} = useLucaTranslation()

  const filteredReferenceBookChapters =
    searchPhrase && !scenarioReferenceBooksLoading
      ? Option.of(searchReferenceBookChapters(allReferenceBookChapters.getOrElse([]), searchPhrase, false))
      : allReferenceBookChapters

  const selectedChapter = findSelectedReferenceBookChapter(filteredReferenceBookChapters, selectedElementId)
  const selectedArticle = findSelectedReferenceBookArticle(filteredReferenceBookChapters, selectedElementId)

  const bookChapters = filteredReferenceBookChapters.map(books => convertReferenceBookChaptersToChapters(t, books))

  const selectedChapterTitle = getSelectedReferenceBookChapterTitle(
    allReferenceBookChapters,
    selectedChapter,
    selectedArticle
  )

  return {
    chapterTitle: selectedChapterTitle,
    dataLoading: scenarioReferenceBooksLoading,
    onSearch: setSearchPhrase,
    referenceBookChapters: bookChapters,
    selectedArticle: selectedArticle,
    selectedChapter: selectedChapter,
    selectedElementId,
    selectElementId: setSelectedElementId
  }
}
