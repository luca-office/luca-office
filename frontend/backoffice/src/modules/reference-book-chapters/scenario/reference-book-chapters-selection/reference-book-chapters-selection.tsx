import * as React from "react"
import {Button, CardFooter, Content, ContentLoadingIndicator, DetailViewHeader, Text} from "shared/components"
import {shadowedCard} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {exists} from "shared/utils"
import {CardOverview} from "../../../../components"
import {ReferenceBookCard} from "../.."
import {styles} from "../../reference-book-chapters.style"
import {useReferenceBooksSelection} from "./hooks/use-reference-books-selection"

export interface ReferenceBooksSelectionProps {
  readonly scenarioId: UUID
}
export const ReferenceBookChaptersSelection: React.FC<ReferenceBooksSelectionProps> = ({scenarioId}) => {
  const {t} = useLucaTranslation()
  const {
    referenceBookChapters,
    selectedReferenceBookIds,
    scenarioReferenceBookIds,
    deselectReferenceBook,
    selectReferenceBook,
    actionLoading,
    loading,
    openReferenceBookOverview,
    openReferenceBook,
    createReferenceBookScenarios
  } = useReferenceBooksSelection(scenarioId)

  // get the amount of selected that are not already assigned to the scenario
  const amountOfSelectedReferenceBooks = selectedReferenceBookIds.filter(
    (id: string) => !exists((pId: string) => pId === id, scenarioReferenceBookIds)
  ).length

  const cardOverview = (
    <CardOverview
      customStyles={styles.cardOverview}
      entityFilterType="scenarioReferenceBookChaptersSelection"
      advancedFilters={true}
      customSubheaderStyles={styles.subheader}
      selectionCount={selectedReferenceBookIds.length}>
      {loading ? (
        <ContentLoadingIndicator />
      ) : (
        referenceBookChapters.map(referenceBookChapter => {
          const isReferenceBookAssigned = scenarioReferenceBookIds.includes(referenceBookChapter.id)
          const isReferenceBookSelected = selectedReferenceBookIds.includes(referenceBookChapter.id)

          return (
            <ReferenceBookCard
              key={referenceBookChapter.id}
              actionLoading={actionLoading}
              deselectReferenceBook={deselectReferenceBook}
              openReferenceBook={openReferenceBook}
              referenceBookChapter={referenceBookChapter}
              isReferenceBookAssigned={isReferenceBookAssigned}
              isReferenceBookSelected={isReferenceBookSelected}
              selectReferenceBook={selectReferenceBook}
            />
          )
        })
      )}
    </CardOverview>
  )

  const subHeader = (
    <DetailViewHeader
      labelKey={"reference_books__scenario_add_chapter"}
      navigationButtonConfig={{
        labelKey: "reference_books__header_label",
        onClick: openReferenceBookOverview
      }}
      customStyles={styles.header}
    />
  )

  const contentFooter = amountOfSelectedReferenceBooks > 0 && (
    <CardFooter customStyles={[styles.fullWidth, styles.footerWithText, shadowedCard]}>
      <Text customStyles={[styles.footerText, styles.selectedText]}>
        {t("reference_books__scenario_amount_selected_chapters_label", {
          count: amountOfSelectedReferenceBooks
        })}
      </Text>
      <Button onClick={createReferenceBookScenarios} disabled={actionLoading} customStyles={styles.addButton}>
        {t("reference_books__scenario_add_selected_label", {
          count: amountOfSelectedReferenceBooks
        })}
      </Button>
    </CardFooter>
  )

  return (
    <Content
      customStyles={styles.contentOverwrite}
      customContentContainerStyles={styles.contentContainer}
      subHeader={subHeader}
      actionBar={contentFooter}>
      {cardOverview}
    </Content>
  )
}
