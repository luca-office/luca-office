import {sumBy} from "lodash"
import {getQuestionTypeIconName} from "../components"
import {BookArticleContentType, IconName, NodeType} from "../enums"
import {QuestionScoringType, QuestionType} from "../graphql/generated/globalTypes"
import {
  BaseNode,
  CodingDimension,
  CodingItem,
  CodingItemResult,
  CodingItemResultByItemId,
  CodingItemResultsByItemId,
  Questionnaire,
  QuestionnaireAnswer,
  QuestionnaireNode,
  QuestionnaireQuestion,
  QuestionResultsByQuestionId,
  ReportParticipantQuestionnaireNode,
  ReportParticipantScenarioNode,
  ReportParticipantsQuestionnaireNode,
  TocArticle,
  TocChapter
} from "../models"
import {LucaTFunction} from "../translations"
import {first, isAutomatedCodingItem, isDefined, isEmpty} from "."
import {mapQuestionTypeToName} from "./questionnaire"
import {sortByPosition} from "./sort"

interface BuildQuestionnaireTreeParams {
  readonly questionnaire: Questionnaire
  readonly isRuntimeSurvey: boolean
  readonly t: LucaTFunction
  readonly displayAnswers?: boolean
  readonly filterQuestionsByScoringType?: boolean
}

/**
 * Uses the Questionnaire object to construct a tree containing all questions as children of the root
 * questionnaire object. If displayAnswers is true, answers to each question is added as it's children.
 * Differentation of Events and Questionnaires is done via the isRuntimeSurvey parameter.
 *
 * @param params
 * @returns root node of the tree as BaseNode object
 */
export const buildQuestionnaireTree = ({
  questionnaire,
  isRuntimeSurvey,
  t,
  displayAnswers = false,
  filterQuestionsByScoringType = true
}: BuildQuestionnaireTreeParams): BaseNode => {
  const questions = filterQuestionsByScoringType
    ? questionnaire.questions.filter(question => question.scoringType !== QuestionScoringType.None)
    : questionnaire.questions

  const questionnaireQuestions: BaseNode[] = sortByPosition(questions).map((question: QuestionnaireQuestion) => ({
    id: question.id,
    parentId: questionnaire.id,
    name: mapQuestionTypeToName(question.questionType, t),
    type: NodeType.QuestionnaireQuestion,
    iconName:
      question.questionType === QuestionType.FreeText
        ? IconName.SpeechBubble
        : question.questionType === QuestionType.MultipleChoice
        ? IconName.MultipleChoice
        : IconName.SingleChoice,
    scoringType: question.scoringType,
    children: displayAnswers
      ? question.answers.map((answer: QuestionnaireAnswer) => ({
          id: answer.id,
          parentId: question.id,
          name: answer.text,
          type: NodeType.QuestionnaireQuestion,
          iconName: IconName.Questions,
          children: questionnaireQuestions
        }))
      : []
  }))

  return {
    id: questionnaire.id,
    parentId: null,
    name: questionnaire.title,
    type: NodeType.Questionnaire,
    iconName: isRuntimeSurvey ? IconName.Event : IconName.Questionnaire,
    children: questionnaireQuestions
  }
}

interface BuildRatingQuestionnaireTreeParams {
  readonly questionnaire: Questionnaire
  readonly isRuntimeSurvey: boolean
  readonly t: LucaTFunction
  readonly displayAnswers?: boolean
  readonly isRated: (question: QuestionnaireQuestion) => boolean
}

interface BuildParticipantReportingQuestionnaireTreeParams {
  readonly questionnaire: Questionnaire
  readonly questionResultsByQuestion: QuestionResultsByQuestionId
  readonly t: LucaTFunction
}

export const buildRatingQuestionnaireTree = ({
  questionnaire,
  isRuntimeSurvey,
  t,
  displayAnswers = false,
  isRated
}: BuildRatingQuestionnaireTreeParams): QuestionnaireNode => {
  const scorableQuestions = questionnaire.questions
  const sortedQuestions: QuestionnaireNode[] = sortByPosition(scorableQuestions).map(
    (question: QuestionnaireQuestion) => ({
      id: question.id,
      parentId: questionnaire.id,
      name: mapQuestionTypeToName(question.questionType, t),
      isRated: isRated(question),
      type: NodeType.QuestionnaireQuestion,
      iconName:
        question.questionType === QuestionType.FreeText
          ? IconName.SpeechBubble
          : question.questionType === QuestionType.MultipleChoice
          ? IconName.MultipleChoice
          : IconName.SingleChoice,
      scoringType: question.scoringType,
      children: displayAnswers
        ? sortByPosition(question.answers).map((answer: QuestionnaireAnswer) => ({
            id: answer.id,
            parentId: question.id,
            name: answer.text,
            type: NodeType.QuestionnaireQuestion,
            iconName: IconName.Questions,
            children: sortedQuestions
          }))
        : [],
      questionType: question.questionType
    })
  )
  return {
    id: questionnaire.id,
    questionType: QuestionType.MultipleChoice,
    parentId: null,
    name: questionnaire.title,
    type: NodeType.Questionnaire,
    iconName: isRuntimeSurvey ? IconName.Event : IconName.Questionnaire,
    children: sortedQuestions
  }
}

export const buildParticipantReportingQuestionnaireTree = ({
  questionnaire,
  questionResultsByQuestion,
  t
}: BuildParticipantReportingQuestionnaireTreeParams): ReportParticipantQuestionnaireNode => {
  const scorableQuestions = questionnaire.questions
  const questionResults = Object.values(questionResultsByQuestion)
  const sumMaxScore = sumBy(questionResults, question => question.maximumScore)
  const sumScore = sumBy(questionResults, question => question.score)

  const sortedQuestions: ReportParticipantQuestionnaireNode[] = sortByPosition(scorableQuestions).map(
    (question: QuestionnaireQuestion) => ({
      id: question.id,
      parentId: null,
      name: mapQuestionTypeToName(question.questionType, t),
      type: NodeType.QuestionnaireQuestion,
      iconName: getQuestionTypeIconName(question.questionType),
      scoringType: question.scoringType,
      questionType: question.questionType,
      maxScore: questionResultsByQuestion[question.id].maximumScore,
      score: questionResultsByQuestion[question.id].score
    })
  )

  return {
    id: questionnaire.id,
    parentId: null,
    name: t("overview"),
    type: NodeType.OverviewNode,
    children: sortedQuestions,
    maxScore: sumMaxScore,
    score: sumScore
  }
}

export const buildParticipantsReportingQuestionnaireTree = ({
  questionnaire,
  questionResultsByQuestion,
  t
}: BuildParticipantReportingQuestionnaireTreeParams): ReportParticipantsQuestionnaireNode => {
  const questionResults = Object.values(questionResultsByQuestion)

  const sumMaxScore = sumBy(questionResults, question => question.maximumScore)
  const sumAverageScore = sumBy(questionResults, question => question.averageScore)

  const sortedQuestions: ReportParticipantsQuestionnaireNode[] = sortByPosition(questionnaire.questions).map(
    (question: QuestionnaireQuestion) => ({
      id: question.id,
      parentId: null,
      name: mapQuestionTypeToName(question.questionType, t),
      type: NodeType.QuestionnaireQuestion,
      iconName: getQuestionTypeIconName(question.questionType),
      scoringType: question.scoringType,
      questionType: question.questionType,
      maxScore: questionResultsByQuestion[question.id].maximumScore,
      averageScore: questionResultsByQuestion[question.id].averageScore
    })
  )

  return {
    id: questionnaire.id,
    parentId: null,
    name: t("overview"),
    type: NodeType.OverviewNode,
    children: sortedQuestions,
    maxScore: sumMaxScore,
    averageScore: sumAverageScore
  }
}

/**
 * Uses the Chapter object to construct a tree containing all articles as children of the root
 * chapter object. If isArticleContentVisible is true, articleContent for each arcitle is added as it's children.
 *
 * @param chapter
 * @param t
 * @param isArticleContentVisible
 * @returns root node of the tree as BaseNode object
 */
export const buildReferenceBookChapterTree = (
  chapter: TocChapter,
  t: LucaTFunction,
  isArticleContentVisible = false
): BaseNode => {
  const articleChildren: BaseNode[] = sortByPosition(chapter.articles).map((article: TocArticle) => ({
    id: article.id,
    parentId: chapter.id,
    name: article.title,
    type: NodeType.Article,
    iconName: IconName.BookPage,
    children: isArticleContentVisible
      ? article.contents?.map(content => ({
          id: content.id,
          parentId: content.id,
          name:
            content.type !== BookArticleContentType.Text
              ? content.title
              : content.title
              ? t("reference_books__text")
              : "",
          isScrollable: true,
          iconName:
            content.type === BookArticleContentType.Image
              ? IconName.Image
              : content.type === BookArticleContentType.Text
              ? IconName.AlignmentLeft
              : content.type === BookArticleContentType.Pdf
              ? IconName.PDF
              : IconName.Film,
          type: NodeType.ArticleContent
        }))
      : []
  }))

  return {
    id: chapter.id,
    parentId: null,
    name: chapter.title,
    type: NodeType.Chapter,
    iconName: IconName.Book,
    children: articleChildren
  }
}

interface BuildParticipantReportingScenarioTreeParams {
  readonly parentDimension: CodingDimension
  readonly allDimensions: CodingDimension[]
  readonly mainDimensionIndex: number
  readonly codingItemsResultById: CodingItemResultByItemId
}

export const buildParticipantScenarioReportingTree = ({
  parentDimension,
  allDimensions,
  mainDimensionIndex,
  codingItemsResultById
}: BuildParticipantReportingScenarioTreeParams): ReportParticipantScenarioNode => {
  const subDimensions: ReportParticipantScenarioNode[] = allDimensions
    .filter(dimension => dimension.parentDimensionId === parentDimension.id)
    .map((dimension: CodingDimension, subDimensionIndex) => ({
      id: dimension.id,
      parentId: dimension.parentDimensionId,
      name: `${createNumbering(mainDimensionIndex, subDimensionIndex)} ${dimension.title}`,
      type: NodeType.CodingModelSubDimension,
      score: dimension.items.reduce((acc, current) => acc + codingItemsResultById[current.id].score, 0),
      maxScore: dimension.items.reduce((acc, current) => acc + codingItemsResultById[current.id].maximumScore, 0),
      codingItem: null,
      codingDimension: dimension,
      children: sortByPosition(dimension.items).map((item, index) =>
        itemToNode({
          mainDimensionIndex,
          subDimensionIndex,
          itemResult: codingItemsResultById[item.id]
        })(item, index)
      )
    }))

  const tree: ReportParticipantScenarioNode = {
    id: parentDimension.id,
    score: isEmpty(parentDimension.items)
      ? sumBy(subDimensions, dimension => dimension.score)
      : parentDimension.items.reduce((acc, current) => acc + codingItemsResultById[current.id].score, 0),
    maxScore: isEmpty(parentDimension.items)
      ? sumBy(subDimensions, dimension => dimension.maxScore)
      : parentDimension.items.reduce((acc, current) => acc + codingItemsResultById[current.id].maximumScore, 0),
    parentId: null,
    codingItem: null,
    codingDimension: parentDimension,
    name: `${createNumbering(mainDimensionIndex)} ${parentDimension.title}`,
    type: NodeType.CodingModelMainDimension,
    children: isEmpty(parentDimension.items)
      ? subDimensions
      : sortByPosition(parentDimension.items).map((item, index) =>
          itemToNode({mainDimensionIndex, itemResult: codingItemsResultById[item.id]})(item, index)
        )
  }

  return tree
}

interface BuildParticipantsReportingScenarioTreeParams {
  readonly parentDimension: CodingDimension
  readonly allDimensions: CodingDimension[]
  readonly mainDimensionIndex: number
  readonly codingItemResultsByItemId: CodingItemResultsByItemId
}

export const buildParticipantsScenarioReportingTree = ({
  parentDimension,
  allDimensions,
  mainDimensionIndex,
  codingItemResultsByItemId
}: BuildParticipantsReportingScenarioTreeParams): ReportParticipantScenarioNode => {
  // we can always take the first of the results, cause we only the average score, and it is the same on all results of codingItemResultsByItemId
  const subDimensions: ReportParticipantScenarioNode[] = allDimensions
    .filter(dimension => dimension.parentDimensionId === parentDimension.id)
    .map((dimension: CodingDimension, subDimensionIndex) => ({
      id: dimension.id,
      parentId: dimension.parentDimensionId,
      name: `${createNumbering(mainDimensionIndex, subDimensionIndex)} ${dimension.title}`,
      type: NodeType.CodingModelSubDimension,
      score: dimension.items.reduce(
        (acc, current) =>
          acc +
          first(codingItemResultsByItemId?.[current.id] ?? [])
            .map(result => result.averageScore)
            .getOrElse(0),
        0
      ),
      maxScore: dimension.items.reduce(
        (acc, current) =>
          acc +
          first(codingItemResultsByItemId[current.id] ?? [])
            .map(result => result.maximumScore)
            .getOrElse(0),
        0
      ),
      codingItem: null,
      codingDimension: dimension,
      children: sortByPosition(dimension.items).map((item, index) =>
        itemToNode({
          mainDimensionIndex,
          subDimensionIndex,
          itemResult: first(codingItemResultsByItemId?.[item.id] ?? []).orUndefined()
        })(item, index)
      )
    }))

  const tree: ReportParticipantScenarioNode = {
    id: parentDimension.id,
    score: isEmpty(parentDimension.items)
      ? sumBy(subDimensions, dimension => dimension.score)
      : parentDimension.items.reduce(
          (acc, current) =>
            acc +
            first(codingItemResultsByItemId?.[current.id] ?? [])
              .map(result => result.averageScore)
              .getOrElse(0),
          0
        ),
    maxScore: isEmpty(parentDimension.items)
      ? sumBy(subDimensions, dimension => dimension.maxScore)
      : parentDimension.items.reduce(
          (acc, current) =>
            acc +
            first(codingItemResultsByItemId[current.id] ?? [])
              .map(result => result.maximumScore)
              .getOrElse(0),
          0
        ),
    parentId: null,
    codingItem: null,
    codingDimension: parentDimension,
    name: `${createNumbering(mainDimensionIndex)} ${parentDimension.title}`,
    type: NodeType.CodingModelMainDimension,
    children: isEmpty(parentDimension.items)
      ? subDimensions
      : sortByPosition(parentDimension.items).map((item, index) =>
          itemToNode({mainDimensionIndex, itemResult: first(codingItemResultsByItemId?.[item.id] ?? []).orUndefined()})(
            item,
            index
          )
        )
  }

  return tree
}

interface ItemToNodeParams {
  readonly mainDimensionIndex: number
  readonly subDimensionIndex?: number
  readonly itemResult: CodingItemResult | undefined
}

const itemToNode = ({mainDimensionIndex, subDimensionIndex, itemResult}: ItemToNodeParams) => (
  item: CodingItem,
  index: number
): ReportParticipantScenarioNode => {
  const isAutomatedItem = isAutomatedCodingItem(item)
  return {
    id: item.id,
    name: `${createNumbering(mainDimensionIndex, subDimensionIndex, index)} ${item.title}`,
    type: isAutomatedItem ? NodeType.CodingModelAutomatedItem : NodeType.CodingModelManualItem,
    parentId: item.dimensionId,
    score: itemResult?.score ?? 0,
    maxScore: itemResult?.maximumScore ?? 0,
    codingItem: item,
    codingDimension: null
  }
}

const createNumbering = (mainDimensionIndex: number, subDimensionIndex?: number, itemIndex?: number) =>
  [mainDimensionIndex, subDimensionIndex, itemIndex]
    .filter(index => isDefined(index))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map(definedIndex => definedIndex! + 1)
    .join(".")
