import {
  useEmails,
  useFilesForSampleCompany,
  useFilesForScenario,
  useScenarioReferenceBookChapters
} from "shared/graphql/hooks"
import {DocumentViewScenarioCodingAutomatedCriterion} from "shared/models"
import {useLucaTranslation} from "shared/translations"

export interface UseErpContainerHook {
  readonly titleForId: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string
  readonly isLoading: boolean
}

export const useTitlesForDocumentViewAutomatedCriterion = (
  scenarioId: UUID,
  sampleCompanyId?: UUID
): UseErpContainerHook => {
  const {files, filesLoading} = useFilesForScenario(scenarioId)
  const {emails, emailsLoading} = useEmails(scenarioId)
  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)
  const {files: filesForSampleCompany, filesLoading: filesForSampleCompanyLoading} = useFilesForSampleCompany(
    sampleCompanyId ?? "",
    sampleCompanyId === undefined
  )

  const {t} = useLucaTranslation()

  const getTitleForGivenId = (criterion: DocumentViewScenarioCodingAutomatedCriterion) => {
    let title = undefined

    if (criterion.fileId !== null) {
      title = [...files.getOrElse([]), ...filesForSampleCompany.getOrElse([])].find(
        file => file.id === criterion.fileId
      )?.name
    } else if (criterion.emailId) {
      title = emails.getOrElse([]).find(email => email.id === criterion.emailId)?.sender
    } else if (criterion.referenceBookArticleId) {
      title = scenarioReferenceBooks
        .getOrElse([])
        .flatMap(chapter => chapter.articles)
        .find(article => article.id === criterion.referenceBookArticleId)?.title
    }
    if (title === null || title === undefined) {
      return t("email__files_placeholder_error")
    } else {
      return title
    }
  }

  return {
    titleForId: getTitleForGivenId,
    isLoading: filesLoading || emailsLoading || scenarioReferenceBooksLoading || filesForSampleCompanyLoading
  }
}
