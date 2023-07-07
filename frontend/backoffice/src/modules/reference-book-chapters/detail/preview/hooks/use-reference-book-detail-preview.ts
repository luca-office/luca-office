import {useState} from "react"
import {useReferenceBookChapter} from "shared/graphql/hooks"
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

export interface UseReferenceBookDetailPreviewHook {
  readonly chapterTitle: Option<string>
  readonly dataLoading: boolean
  readonly onSearch: (value: string) => void
  readonly referenceBookChapters: Option<TocChapter[]>
  readonly selectedArticle: Option<ReferenceBookArticle>
  readonly selectedChapter: Option<ReferenceBookChapter>
  readonly selectedElementId: Option<UUID>
  readonly selectElementId: (id: Option<UUID>) => void
}

export const useReferenceBookDetailPreview = (referenceBookChapterId: UUID): UseReferenceBookDetailPreviewHook => {
  const {t} = useLucaTranslation()

  const {referenceBookChapter, referenceBookLoading} = useReferenceBookChapter(referenceBookChapterId)

  const allReferenceBookChapters = referenceBookChapter.map(chapter => [chapter] as ReferenceBookChapter[])

  const [searchPhrase, setSearchPhrase] = useState("")
  const [selectedElementId, setSelectedElementId] = useState<Option<UUID>>(Option.none())

  const filteredReferenceBookChapters =
    searchPhrase && !referenceBookLoading
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
    dataLoading: referenceBookLoading,
    onSearch: setSearchPhrase,
    referenceBookChapters: bookChapters,
    selectedArticle: selectedArticle,
    selectedChapter: selectedChapter,
    selectedElementId,
    selectElementId: setSelectedElementId
  }
}
