import {CSSInterpolation} from "@emotion/serialize"
import {sumBy} from "lodash-es"
import * as React from "react"
import {CardHeader, TableOfContentsContainer, TableOfContentsEntry, Text} from "shared/components"
import {
  Questionnaire,
  QuestionnaireSurveyResultsForParticipant,
  QuestionResultsByQuestionId,
  ReportParticipantsQuestionnaireNode
} from "shared/models"
import {CustomStyle, flex0, mediumBoxShadow, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {buildParticipantsReportingQuestionnaireTree, first, Option, roundNumber} from "shared/utils"
import {ReportParticipantsQuestionnaireTocNode} from "./toc-node"

interface Props extends CustomStyle {
  readonly questionnaire: Questionnaire
  readonly questionnaireSurveyResultsForParticipants: QuestionnaireSurveyResultsForParticipant[]
  readonly selectedNodeId: UUID
  readonly t: LucaTFunction
  readonly updateSelectedNode: (id: UUID) => void
  readonly customTocBodyStyles?: CSSInterpolation
}

export const Toc: React.FC<Props> = props => {
  const {
    t,
    customStyles,
    questionnaire,
    questionnaireSurveyResultsForParticipants,
    selectedNodeId,
    updateSelectedNode,
    customTocBodyStyles
  } = props

  const header = (
    <CardHeader customStyles={styles.header} hasGreyBackground hasShadow>
      <Text size={TextSize.Medium}> {t("table_of_contents")}</Text>
      <Text size={TextSize.Medium}> {t("rating__right_side_title_table_of_contents")}</Text>
    </CardHeader>
  )

  const questionResults = first(questionnaireSurveyResultsForParticipants).map(result => result.questionResults)
  const averageScore = roundNumber(
    questionResults.map(results => sumBy(results, result => result.averageScore)).getOrElse(0)
  )
  const maxScore = questionResults.map(results => sumBy(results, result => result.maximumScore)).getOrElse(0)

  const questionResultsByQuestion = questionResults
    .getOrElse([])
    .reduce<QuestionResultsByQuestionId>((results, current) => ({...results, [current.questionId]: current}), {})

  const footer = (
    <div css={styles.footer}>
      <div>{t("rating__average_score_label")}:</div>
      <div>{t("rating__rating__scoring", {score: averageScore, maxScore})}</div>
    </div>
  )

  const tree = buildParticipantsReportingQuestionnaireTree({
    questionnaire,
    questionResultsByQuestion,
    t
  })

  return (
    <TableOfContentsContainer
      customStyles={customStyles}
      customCardStyles={styles.card}
      customFooterStyles={styles.tocFooter}
      customCardContentStyles={customTocBodyStyles}
      title=""
      customHeader={header}
      actionFooter={footer}>
      <TableOfContentsEntry<ReportParticipantsQuestionnaireNode>
        key={questionnaire.id}
        node={tree}
        renderCustomNodeContent={node => (
          <ReportParticipantsQuestionnaireTocNode t={t} node={node} onClick={() => updateSelectedNode(node.id)} />
        )}
        selectNode={nodeOption => nodeOption.forEach(node => updateSelectedNode(node.id))}
        selectedNode={Option.of(selectedNodeId)}
        isCollapsible={false}
        indentChildren={false}
      />
    </TableOfContentsContainer>
  )
}

const styles = {
  card: {
    boxShadow: mediumBoxShadow,

    "&:hover": {
      boxShadow: mediumBoxShadow
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flex: flex0
  },
  footer: {
    display: "flex",
    justifyContent: "space-between"
  },
  tocFooter: {
    flex: flex0,
    justifyContent: "center"
  }
}
