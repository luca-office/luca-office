import {css} from "@emotion/react"
import * as React from "react"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {CreateMainDimensionModal, Text, Tooltip} from "shared/components"
import {ScenarioCodingModelTableOfContents} from "shared/components/scenario-coding-model-table-of-contents/scenario-coding-model-table-of-contents"
import {IconName, NodeType} from "shared/enums"
import {BaseNode, ButtonConfig, CodingDimension, CodingItem, CodingModel, CodingNode} from "shared/models"
import {
  boxHeightLarge,
  Flex,
  fontColorLight,
  spacing,
  spacingHuge,
  spacingMedium,
  spacingTiny,
  textEllipsis,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {languageKeyForAutomatedRule, Option} from "shared/utils"
import {buildCodingModelTree} from "shared/utils/scenario-coding-model"
import {SubHeaderDetailContainer} from "../../../components"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {CodingItemDetailViewContainer} from "./coding-item/coding-item-detail-view-container"
import {MainDimensionDetailView} from "./coding-main-dimension/main-dimension-detail-view"
import {SubDimensionDetailViewContainer} from "./coding-sub-dimension/sub-dimension-detail-view-container"
import {CodingModelDetailOverviewContainer} from "./overview/coding-model-detail-overview-container"

export interface CodingModelDetailViewProps {
  readonly codingDimension: Option<CodingDimension>
  readonly codingItem: Option<CodingItem>
  readonly allCodingDimensions: CodingDimension[]
  readonly codingModel: CodingModel
  readonly scenarioId: UUID
  readonly selectedNodeId: Option<UUID>
  readonly isReadOnly: boolean
  readonly handleSelectNode: (node: Option<BaseNode>) => void
  readonly removeCodingModel: () => void
  readonly expandedNodeIds: UUID[]
  readonly navigateToOverview: () => void
}

export const CodingModelDetailView: React.FC<CodingModelDetailViewProps> = ({
  codingDimension,
  codingItem,
  allCodingDimensions,
  scenarioId,
  codingModel,
  selectedNodeId,
  handleSelectNode,
  removeCodingModel,
  isReadOnly,
  expandedNodeIds,
  navigateToOverview
}) => {
  const dispatch = useDispatch()
  const {t} = useLucaTranslation()

  const isCodingItemDefined = codingItem.isDefined()
  const isCodingDimensionDefined = codingDimension.isDefined()
  const [isCreateMainDimensionModalVisible, setIsCreateMainDimensionModalVisible] = useState(false)

  const onCreate = (codingDimension: CodingDimension) =>
    dispatch(
      navigateToRouteAction(Route.ScenarioCodingDimensionDetail, {
        codingModelId: codingDimension.codingModelId,
        dimensionId: codingDimension.id,
        scenarioId
      })
    )

  const allCodingNotes = allCodingDimensions
    .filter(dimension => dimension.parentDimensionId === null)
    .map((parentDimension, index) =>
      buildCodingModelTree({
        parentDimension,
        allDimensions: allCodingDimensions,
        mainDimensionIndex: index,
        scenarioCodingItemRatings: [],
        ratings: []
      })
    )

  const buttonConfig: ButtonConfig = {
    icon: IconName.Add,
    disabled: isReadOnly,
    labelKey: "coding_models__create_main_dimension_title",
    onClick: () => setIsCreateMainDimensionModalVisible(true)
  }

  const renderModal = () => (
    <CreateMainDimensionModal
      scenarioId={scenarioId}
      onConfirm={() => setIsCreateMainDimensionModalVisible(false)}
      onDismiss={() => setIsCreateMainDimensionModalVisible(false)}
      codingModelId={codingModel.id}
      onCreate={onCreate}
    />
  )

  const renderDetailContent = () => {
    if (isCodingDimensionDefined && !isCodingItemDefined) {
      //  render dimension detail view
      return codingDimension
        .map(dimension =>
          dimension.parentDimensionId === null ? (
            <MainDimensionDetailView
              isReadOnly={isReadOnly}
              allCodingDimensions={allCodingDimensions}
              scenarioId={scenarioId}
              codingDimension={dimension}
            />
          ) : (
            <SubDimensionDetailViewContainer
              isReadOnly={isReadOnly}
              scenarioId={scenarioId}
              codingDimension={dimension}
            />
          )
        )
        .orNull()
    } else if (isCodingItemDefined) {
      // render item detail view
      return codingItem
        .map(item => (
          <CodingItemDetailViewContainer
            codingModelId={codingModel.id}
            isReadOnly={isReadOnly}
            codingItem={item}
            scenarioId={scenarioId}
          />
        ))
        .orNull()
    } else {
      // render general overview
      return <CodingModelDetailOverviewContainer codingModel={codingModel} codingDimensions={allCodingDimensions} />
    }
  }

  const customItemNode = (node: CodingNode, onClick: () => void) =>
    node.type === NodeType.CodingModelAutomatedItem || node.type === NodeType.CodingModelManualItem ? (
      <div onClick={onClick} css={[Flex.row, styles.customNode]}>
        <Text customStyles={textEllipsis} size={TextSize.Medium}>
          {node.name}
        </Text>
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title={t(languageKeyForAutomatedRule(node.automatedCodingItemRule!))}
          inactive={node.type === NodeType.CodingModelManualItem || node.automatedCodingItemRule === undefined}>
          <Text size={TextSize.Medium} customStyles={styles.itemText}>
            {t(
              node.type === NodeType.CodingModelAutomatedItem
                ? "coding_models__table_of_contents_item_automated"
                : "coding_models__table_of_contents_item_manual"
            )}
          </Text>
        </Tooltip>
      </div>
    ) : null

  return (
    <div>
      <SubHeaderDetailContainer
        deleteButtonConfig={{
          onConfirm: removeCodingModel,
          tooltipConfig: {
            labelKey: isReadOnly
              ? "scenario_details__header_button_is_finalized"
              : "coding_models__detail_header_delete_tooltip"
          },
          t,
          modalTitleKey: "coding_models__detail_header_delete_orly_title",
          modalTextKey: "coding_models__detail_header_delete_orly_text",
          disabled: isReadOnly,
          confirmButtonKey: "remove_button"
        }}
        title={t("coding_models__detail_header")}
        returnTo={{route: Route.ScenarioDetail, params: {scenarioId}, text: t("scenario_details__header_label")}}
      />
      <div css={styles.content}>
        <ScenarioCodingModelTableOfContents
          expandedNodeIds={expandedNodeIds}
          isReadOnly={isReadOnly}
          selectedNodeId={selectedNodeId}
          handleSelectNode={handleSelectNode}
          allCodingNodes={allCodingNotes}
          renderCustomNodeContent={customItemNode}
          navigateToOverview={navigateToOverview}
          buttonConfig={buttonConfig}
          isModalVisible={isCreateMainDimensionModalVisible}
          renderModal={renderModal}
        />
        {renderDetailContent()}
      </div>
    </div>
  )
}

const styles = {
  content: css({
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)",
    gap: spacingMedium,
    padding: spacing(spacingMedium, spacingHuge),
    height: `calc(100vh - ${boxHeightLarge + 3 * spacingMedium}px)`
  }),
  itemText: css({
    color: fontColorLight,
    margin: spacing(0, spacingTiny)
  }),
  customNode: css({
    justifyContent: "space-between",
    width: "100%",
    overflow: "auto"
  })
}
