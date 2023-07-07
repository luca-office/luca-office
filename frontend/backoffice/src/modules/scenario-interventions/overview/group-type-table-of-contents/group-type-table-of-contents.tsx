import {css} from "@emotion/react"
import {groupBy} from "lodash"
import * as React from "react"
import {
  HeaderCarouselBaseElement,
  HeaderCarouselContainer,
  Icon,
  TableOfContentsContainer,
  TableOfContentsEntry,
  Text
} from "shared/components"
import {ErpType, IconName, InterventionHeaderGroupType, NodeType} from "shared/enums"
import {
  BaseNode,
  ErpRowOpeningIntervention,
  Intervention,
  InterventionNode,
  NotesContentIntervention,
  ScenarioQuestionnaire,
  SpreadsheetCellContentIntervention
} from "shared/models"
import {Flex, flex1, spacingSmall, textEllipsis, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {getGroupEntityBaseFromIntervention} from "../../utils"
import {buildInterventionErpTree, buildInterventionGroupTypeTree, buildInterventionNotesTree} from "../../utils/tree"

export interface GroupTypeToCProps {
  readonly handleSelectNode: (nodeOption: Option<InterventionNode>) => void
  readonly filteredAndGroupedInterventions: {[index: string]: Intervention[]}
  readonly isLoading: boolean
  readonly notesContentInterventions: NotesContentIntervention[]
  readonly spreadsheetCellContentInterventions: SpreadsheetCellContentIntervention[]
  readonly erpOpeningInterventions: ErpRowOpeningIntervention[]
  readonly navigateToHeaderGroupType: (headerGroupType: InterventionHeaderGroupType) => void
  readonly scenarioId: UUID
  readonly selectedNodeId: Option<UUID>
  readonly selectedHeaderGroupType: InterventionHeaderGroupType
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
}

interface InterventionHeaderCarouselElement extends HeaderCarouselBaseElement {
  readonly headerGroupType: InterventionHeaderGroupType
}

export const InterventionsGroupTypeTableOfContents: React.FC<GroupTypeToCProps> = ({
  handleSelectNode,
  filteredAndGroupedInterventions,
  isLoading,
  erpOpeningInterventions,
  selectedHeaderGroupType,
  notesContentInterventions,
  navigateToHeaderGroupType,
  scenarioId,
  selectedNodeId,
  scenarioQuestionnaires,
  spreadsheetCellContentInterventions
}) => {
  const {t} = useLucaTranslation()

  const showNotesInterventions =
    selectedHeaderGroupType === InterventionHeaderGroupType.AllGroups ||
    selectedHeaderGroupType === InterventionHeaderGroupType.Notes

  const showErpOpeningInterventions =
    selectedHeaderGroupType === InterventionHeaderGroupType.AllGroups ||
    selectedHeaderGroupType === InterventionHeaderGroupType.Erp

  const renderCustomNode = (node: BaseNode, onClick: () => void) => (
    <div
      onClick={onClick}
      data-testid="custom-intervention-node"
      className="custom-intervention-node"
      css={styles.customNode}>
      <div css={[Flex.row, textEllipsis]}>
        {node.iconName && <Icon customStyles={styles.nodeIcon} name={node.iconName} />}
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {node.name}
        </Text>
      </div>
      {node.type === NodeType.InterventionGroupType && (
        <Text size={TextSize.Medium}>{`(${node.children?.length})`}</Text>
      )}
    </div>
  )

  const headerCarouselElements: InterventionHeaderCarouselElement[] = [
    {
      label: t("interventions__detail_view_table_of_contents_title_all"),
      headerGroupType: InterventionHeaderGroupType.AllGroups
    },
    {
      label: t("interventions__detail_view_table_of_contents_title_files"),
      icon: IconName.File,
      count: Object.keys(filteredAndGroupedInterventions).length + spreadsheetCellContentInterventions.length,
      headerGroupType: InterventionHeaderGroupType.File
    },
    {
      label: t("interventions__detail_view_table_of_contents_title_mail"),
      icon: IconName.Email,
      count: Object.keys(filteredAndGroupedInterventions).length,
      headerGroupType: InterventionHeaderGroupType.Email
    },
    {
      label: t("interventions__detail_view_table_of_contents_title_erp"),
      icon: IconName.Database,
      count: erpOpeningInterventions.length,
      headerGroupType: InterventionHeaderGroupType.Erp
    },
    {
      label: t("interventions__detail_view_table_of_contents_title_notes"),
      icon: IconName.Notes,
      count: notesContentInterventions.length,
      headerGroupType: InterventionHeaderGroupType.Notes
    },
    {
      label: t("interventions__detail_view_table_of_contents_title_event"),
      icon: IconName.Event,
      count: Object.keys(filteredAndGroupedInterventions).length,
      headerGroupType: InterventionHeaderGroupType.Event
    }
  ]

  const defaultSelectedHeaderCarouselElement = headerCarouselElements.find(
    elements => elements.headerGroupType === selectedHeaderGroupType
  )

  const notesNode = (
    <TableOfContentsEntry
      expandedNodeIds={[]}
      isCollapsible
      renderCustomNodeContent={renderCustomNode}
      selectedNode={selectedNodeId}
      selectNode={handleSelectNode}
      node={buildInterventionNotesTree(notesContentInterventions, scenarioId, t)}
    />
  )

  const erpNodes = () => {
    const groupedByErpTable = groupBy(erpOpeningInterventions, intervention => intervention.erpTableType)
    return Object.keys(groupedByErpTable).map(erpTable => (
      <TableOfContentsEntry
        expandedNodeIds={[]}
        key={erpTable}
        isCollapsible
        renderCustomNodeContent={renderCustomNode}
        selectedNode={selectedNodeId}
        selectNode={handleSelectNode}
        node={buildInterventionErpTree(groupedByErpTable[erpTable], scenarioId, erpTable as ErpType, t)}
      />
    ))
  }

  return (
    <TableOfContentsContainer
      customCardContentStyles={styles.overflowAuto}
      customCardStyles={styles.overflowAuto}
      customHeader={
        <HeaderCarouselContainer<InterventionHeaderCarouselElement>
          onChange={element => navigateToHeaderGroupType(element.headerGroupType)}
          elements={headerCarouselElements}
          defaultSelectedElement={defaultSelectedHeaderCarouselElement}
        />
      }
      loading={isLoading}
      showPlaceHolder={
        Object.keys(filteredAndGroupedInterventions).length === 0 &&
        !showNotesInterventions &&
        erpOpeningInterventions.length === 0
      }
      placeholderHint={t("interventions__detail_view_table_of_contents_placeholder_hint")}
      placeholderHeadline={t("interventions__detail_view_table_of_contents_placeholder_title")}
      title={t("interventions__detail_view_table_of_contents_title_all")}>
      <>
        {Object.keys(filteredAndGroupedInterventions).map(groupEntityId => (
          <TableOfContentsEntry<InterventionNode>
            expandedNodeIds={[]}
            isCollapsible
            key={groupEntityId}
            renderCustomNodeContent={renderCustomNode}
            selectedNode={selectedNodeId}
            node={buildInterventionGroupTypeTree(
              filteredAndGroupedInterventions[groupEntityId],
              scenarioId,
              getGroupEntityBaseFromIntervention(
                filteredAndGroupedInterventions[groupEntityId][0],
                scenarioQuestionnaires
              ),
              filteredAndGroupedInterventions[groupEntityId][0].interventionType
            )}
            selectNode={handleSelectNode}
          />
        ))}
        {showErpOpeningInterventions && erpNodes()}
        {showNotesInterventions && notesNode}
      </>
    </TableOfContentsContainer>
  )
}

const styles = {
  overflowAuto: css({
    overflowY: "auto"
  }),
  customNode: css(Flex.row, textEllipsis, {
    justifyContent: "space-between",
    flex: flex1
  }),
  nodeIcon: css({
    marginRight: spacingSmall
  })
}
