import {css} from "@emotion/react"
import {sumBy} from "lodash-es"
import * as React from "react"
import {CardHeader, TableOfContentsContainer, TableOfContentsEntry, Text} from "../../../components"
import {TocNode} from "../../../components/reporting-questionnaire-overlay/toc/toc-node"
import {CodingItemResultByItemId, ReportParticipantScenarioNode} from "../../../models"
import {
  borderRadius,
  CustomStyle,
  fileExplorerSelectedColor,
  flex0,
  mediumBoxShadow,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {Option} from "../../../utils"

interface Props extends CustomStyle {
  readonly codingItemResultsByItem: CodingItemResultByItemId
  readonly nodes: ReportParticipantScenarioNode[]
  readonly selectedNodeId: Option<UUID>
  readonly t: LucaTFunction
  readonly updateSelectedNodeId: (id: UUID) => void
  readonly navigateToOverview: () => void
}

export const Toc: React.FC<Props> = props => {
  const {
    t,
    customStyles,
    navigateToOverview,
    codingItemResultsByItem,
    selectedNodeId,
    nodes,
    updateSelectedNodeId
  } = props

  const header = (
    <CardHeader customStyles={styles.header} hasGreyBackground hasShadow>
      <Text size={TextSize.Medium}> {t("table_of_contents")}</Text>
      <Text size={TextSize.Medium}> {t("rating__right_side_title_table_of_contents")}</Text>
    </CardHeader>
  )

  const results = Object.values(codingItemResultsByItem)
  const score = sumBy(results, result => result.score)
  const maxScore = sumBy(results, result => result.maximumScore)

  const footer = (
    <div css={styles.footer}>
      <div>{t("rating__total_score_achieved")}:</div>
      <div>{t("rating__rating__scoring", {score, maxScore})}</div>
    </div>
  )

  return (
    <>
      <TableOfContentsContainer
        customStyles={customStyles}
        customCardStyles={styles.card}
        customFooterStyles={styles.tocFooter}
        title=""
        customHeader={header}
        actionFooter={footer}>
        <Text
          onClick={navigateToOverview}
          customStyles={styles.overviewText(selectedNodeId.isEmpty())}
          size={TextSize.Medium}>
          {t("overview")}
        </Text>
        {nodes.map(codingNode => (
          <TableOfContentsEntry
            isCollapsible
            renderCustomNodeContent={node => (
              <TocNode t={t} node={node} onClick={node => updateSelectedNodeId(node.id)} />
            )}
            key={codingNode.id}
            selectedNode={selectedNodeId}
            node={codingNode}
            selectNode={nodeOption => nodeOption.map(node => updateSelectedNodeId(node.id))}
          />
        ))}
      </TableOfContentsContainer>
    </>
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
  },
  overviewText: (isSelected: boolean) =>
    css({
      marginBottom: spacingSmall,
      padding: spacingTiny,
      cursor: "pointer",
      ...(isSelected && {backgroundColor: fileExplorerSelectedColor, borderRadius})
    })
}
