import * as React from "react"
import {Button, CardFooter, CardFooterItem, OverviewCard, Tooltip} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {ReferenceBookChapter} from "shared/models"
import {CustomStyle} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString} from "shared/utils"
import {styles} from "../reference-book-chapters.style"

interface ReferenceBookCardProps {
  readonly actionLoading: boolean
  readonly deselectReferenceBook: (referenceBookChapterId: UUID) => void
  readonly openReferenceBook: (referenceBookChapterId: UUID) => void
  readonly referenceBookChapter: ReferenceBookChapter
  readonly isReferenceBookAssigned: boolean
  readonly isReferenceBookSelected: boolean
  readonly selectReferenceBook: (referenceBookChapterId: UUID) => void
  readonly hideButton?: boolean
}

export const ReferenceBookCard: React.FC<ReferenceBookCardProps & CustomStyle> = ({
  actionLoading,
  deselectReferenceBook,
  customStyles,
  hideButton = false,
  openReferenceBook,
  referenceBookChapter,
  isReferenceBookAssigned,
  isReferenceBookSelected,
  selectReferenceBook
}) => {
  const {t} = useLucaTranslation()
  const tooltipText = isReferenceBookSelected
    ? t("placeholder__remove_from_selection")
    : isReferenceBookAssigned
    ? t("placeholder__already_assigned")
    : t("placeholder__add_to_selection")

  const stopEventPropagation = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => evt.stopPropagation()

  const handleSelect = () =>
    isReferenceBookSelected
      ? deselectReferenceBook(referenceBookChapter.id)
      : selectReferenceBook(referenceBookChapter.id)
  const cardFooter = (
    <CardFooter customStyles={styles.footerWithText} onClick={stopEventPropagation}>
      <CardFooterItem text={formatDateFromString(referenceBookChapter.createdAt)} icon={IconName.Calendar} />
      <CardFooterItem
        text={`${referenceBookChapter.author.firstName} ${referenceBookChapter.author.lastName}`}
        icon={IconName.User}
      />
      <CardFooterItem
        text={`${referenceBookChapter.articles.length} ${t("reference_books__card_article")}`}
        icon={IconName.BookPage}
      />
      <Tooltip title={tooltipText}>
        {!hideButton && (
          <Button
            disabled={actionLoading || isReferenceBookAssigned}
            icon={isReferenceBookAssigned || isReferenceBookSelected ? IconName.Close : IconName.Add}
            variant={ButtonVariant.IconOnly}
            customStyles={isReferenceBookSelected && styles.deleteButton}
            onClick={handleSelect}
          />
        )}
      </Tooltip>
    </CardFooter>
  )

  return (
    <OverviewCard
      customCardStyles={customStyles}
      key={referenceBookChapter.id}
      headerText={referenceBookChapter.title}
      headerIcon={IconName.Book}
      text={referenceBookChapter.description}
      footer={cardFooter}
      customStyles={styles.card}
      noAnimationOnHover={true}
      onClick={() => openReferenceBook(referenceBookChapter.id)}
    />
  )
}
