import React from "react"
import {Icon, Text} from "shared/components"
import {QuestionScoringType} from "shared/graphql/generated/globalTypes"
import {ReportParticipantsQuestionnaireNode} from "shared/models"
import {Flex, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {toPercent} from "shared/utils"

interface Props {
  readonly t: LucaTFunction
  readonly node: ReportParticipantsQuestionnaireNode
  readonly onClick: (node: ReportParticipantsQuestionnaireNode) => void
}

export const ReportParticipantsQuestionnaireTocNode = ({t, node, onClick}: Props) => (
  <div css={styles.node} onClick={() => onClick(node)}>
    <div css={Flex.row}>
      {node.iconName && <Icon hasSpacing name={node.iconName} />}
      <Text size={TextSize.Medium}>{node.name}</Text>
    </div>
    <Text>
      {node.scoringType === QuestionScoringType.None ? (
        t("rater_rating_details__project_module_no_rating")
      ) : (
        <>
          {toPercent(node.averageScore, node.maxScore)}
          {t("rating__rating__trailing_percent")}
        </>
      )}
    </Text>
  </div>
)

const styles = {
  node: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1
  }
}
