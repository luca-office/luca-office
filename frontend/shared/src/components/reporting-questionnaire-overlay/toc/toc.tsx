import {CSSInterpolation} from "@emotion/serialize"
import {sumBy} from "lodash-es"
import * as React from "react"
import {CardHeader, TableOfContentsContainer, TableOfContentsEntry, Text} from "../../../components"
import {Questionnaire, QuestionResultsByQuestionId, ReportParticipantQuestionnaireNode} from "../../../models"
import {CustomStyle, flex0, mediumBoxShadow, TextSize} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {buildParticipantReportingQuestionnaireTree, Option} from "../../../utils"
import {TocNode} from "./toc-node"

interface Props extends CustomStyle {
  readonly questionnaire: Questionnaire
  readonly questionResultsByQuestion: QuestionResultsByQuestionId
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
    questionResultsByQuestion,
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

  const questionResults = Object.values(questionResultsByQuestion)
  const score = sumBy(questionResults, result => result.score)
  const maxScore = sumBy(questionResults, result => result.maximumScore)

  const footer = (
    <div css={styles.footer}>
      <div>{t("rating__total_score_achieved")}:</div>
      <div>{t("rating__rating__scoring", {score, maxScore})}</div>
    </div>
  )

  const tree = buildParticipantReportingQuestionnaireTree({
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
      <TableOfContentsEntry<ReportParticipantQuestionnaireNode>
        key={questionnaire.id}
        node={tree}
        renderCustomNodeContent={node => <TocNode t={t} node={node} onClick={() => updateSelectedNode(node.id)} />}
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
