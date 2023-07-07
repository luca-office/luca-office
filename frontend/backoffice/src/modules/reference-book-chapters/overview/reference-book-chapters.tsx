import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem, ContentLoadingIndicator, Icon, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString, isDefined} from "shared/utils"
import {CardOverview} from "../../../components"
import {cardOverview} from "../../../styles/common"
import {useReferenceBookChapters} from "./hooks/use-reference-book-chapters"

export const ReferenceBookChapters: React.FC = () => {
  const {t} = useLucaTranslation()

  const {
    referenceBookChapters,
    referenceBooksLoading,
    navigateToCreation,
    navigateToDetail
  } = useReferenceBookChapters()

  return (
    <CardOverview
      customStyles={cardOverview}
      entityFilterType={"referenceBookChapters"}
      create={navigateToCreation}
      creationText={t("reference_books__create_reference_book")}>
      {referenceBooksLoading ? (
        <ContentLoadingIndicator />
      ) : (
        referenceBookChapters.map(referenceBookChapter => {
          const articleLength = referenceBookChapter.articles.length

          return (
            <OverviewCard
              onClick={() => navigateToDetail(referenceBookChapter.id)}
              key={referenceBookChapter.id}
              text={referenceBookChapter.description}
              headerText={referenceBookChapter.title}
              headerIcon={IconName.Book}
              footer={
                <CardFooter customStyles={styles.cardFooter}>
                  <CardFooterItem
                    title={t("detail_card__title_createdAt")}
                    icon={IconName.Calendar}
                    text={formatDateFromString(referenceBookChapter.createdAt)}
                  />
                  <CardFooterItem
                    title={t("detail_card__title_author")}
                    icon={IconName.Profile}
                    text={`${referenceBookChapter.author.firstName} ${referenceBookChapter.author.lastName}`}
                  />
                  <CardFooterItem
                    icon={IconName.BookPage}
                    text={`${articleLength} ${
                      articleLength === 1 ? t("reference_books__card_article") : t("reference_books__card_articles")
                    }`}
                  />
                  <Icon name={isDefined(referenceBookChapter.publishedAt) ? IconName.Publish : IconName.EditBordered} />
                </CardFooter>
              }
            />
          )
        })
      )}
    </CardOverview>
  )
}

const Sizes = {
  footerStatus: 16
}

const styles = {
  cardFooter: css({
    display: "grid",
    gridTemplateColumns: `1fr 1fr 1fr ${Sizes.footerStatus}px`
  })
}
