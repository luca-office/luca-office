import * as React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ColumnProps,
  Heading,
  Icon,
  LoadingIndicator,
  TableContainer,
  Text
} from "../../../components"
import {HeadingLevel, IconName} from "../../../enums"
import {ReferenceBookArticle, ReferenceBookChapter as ReferenceBookChapterModel} from "../../../models"
import {CustomStyle, Flex, FontWeight, TextSize} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {Option, sortByPosition} from "../../../utils"
import {chapterStyles} from "./reference-book-chapter-style"

export interface ReferenceBookChapterProps extends CustomStyle {
  readonly chapter: Option<ReferenceBookChapterModel>
  readonly dataLoading: boolean
  readonly selectArticle: (id: Option<UUID>) => void
  readonly isBundled?: boolean
  readonly headerInfo?: string
  readonly headerChild?: React.ReactNode
}

export const ReferenceBookChapter: React.FunctionComponent<ReferenceBookChapterProps> = ({
  chapter: chapterOption,
  customStyles,
  dataLoading,
  headerChild,
  headerInfo,
  isBundled = false,
  selectArticle
}) => {
  const {t} = useLucaTranslation()

  const articleColumn: ColumnProps<ReferenceBookArticle> = {
    key: "data",
    content: (article: ReferenceBookArticle) => (
      <div css={Flex.row}>
        <Icon name={IconName.BookPage} hasSpacing /> {article.title}
      </div>
    ),
    header: (
      <div css={Flex.row}>
        <Icon name={IconName.BookPage} hasSpacing /> {t("reference_book__chapter_contents_column")}
      </div>
    )
  }
  const handleTableClick = (entity: ReferenceBookArticle) => selectArticle(Option.of(entity.id))

  return (
    <Card customStyles={[chapterStyles.card, customStyles]}>
      <CardHeader customStyles={chapterStyles.header} hasShadow hasGreyBackground>
        <div css={chapterStyles.row}>
          <Icon name={IconName.Book} hasSpacing />
          {chapterOption.map(chapter => chapter.title).getOrElse(t("reference_book__title_placeholder"))}
        </div>
        <div css={chapterStyles.row}>
          {headerInfo && (
            <Text size={TextSize.Medium} customStyles={chapterStyles.headerInfo}>
              {headerInfo}
            </Text>
          )}
          {headerChild}
        </div>
      </CardHeader>
      <CardContent customStyles={chapterStyles.scrollable}>
        {dataLoading ? (
          <LoadingIndicator customStyles={chapterStyles.loader} />
        ) : (
          chapterOption
            .map(chapter => (
              <div css={chapterStyles.content}>
                <Heading level={HeadingLevel.h1} customStyles={chapterStyles.headline}>
                  {chapter.title}
                </Heading>
                <Text size={TextSize.Medium} customStyles={chapterStyles.text(isBundled)}>
                  {chapter.description}
                </Text>
                {chapter.articles && chapter.articles.length > 0 && (
                  <React.Fragment>
                    <Heading
                      level={HeadingLevel.h3}
                      fontWeight={FontWeight.Bold}
                      customStyles={chapterStyles.label(isBundled)}>
                      {t("reference_book__chapter_contents_count", {count: chapter.articles.length})}
                    </Heading>
                    <TableContainer<ReferenceBookArticle>
                      customStyles={chapterStyles.table}
                      isBundled={isBundled}
                      entities={sortByPosition(chapter.articles)}
                      entityKey={(article: ReferenceBookArticle) => article.id}
                      columns={[articleColumn]}
                      onClick={handleTableClick}
                      placeHolderText={t("reference_books__table_of_contents_placeholder")}
                    />
                  </React.Fragment>
                )}
              </div>
            ))
            .orElse(
              Option.of(
                <div css={chapterStyles.placeholderContainer}>
                  <div>{t("reference_book__title_placeholder")}</div>
                  <div css={chapterStyles.hint}>{t("reference_book__content_placeholder")}</div>
                </div>
              )
            )
            .orNull()
        )}
      </CardContent>
      <CardFooter />
    </Card>
  )
}
