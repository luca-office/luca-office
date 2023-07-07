import {css} from "@emotion/react"
import * as React from "react"
import {
  Button,
  Content,
  DetailViewHeader,
  Icon,
  TableOfContentsContainer,
  TableOfContentsEntry
} from "shared/components"
import {ButtonVariant, IconName, NodeType} from "shared/enums"
import {RScriptUpdate} from "shared/graphql/generated/globalTypes"
import {BaseNode, RScript} from "shared/models"
import {spacingMedium} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {Option, sort} from "shared/utils"
import {EmptyRScriptDetailView} from "./detail/empty-r-script-detail-view"
import {RScriptDetailViewContainer} from "./detail/r-script-detail-view-container"

export interface Props {
  readonly t: LucaTFunction
  readonly rScripts: RScript[]
  readonly isLoading: boolean
  readonly isUpdateLoading: boolean
  readonly selectedRScript: Option<RScript>
  readonly selectRScript: (id: UUID) => void
  readonly createRScript: () => void
  readonly updateRScript: (update: RScriptUpdate) => Promise<unknown>
  readonly deleteRScript: () => void
  readonly archiveRScript: () => void
}

interface RScriptNode extends BaseNode {
  readonly isEditable: boolean
}

export const RScripts: React.FC<Props> = ({
  t,
  rScripts,
  isLoading,
  isUpdateLoading,
  selectedRScript,
  selectRScript,
  createRScript,
  updateRScript,
  deleteRScript,
  archiveRScript
}) => {
  const rScriptNodes = sort(rScript => rScript.title, rScripts).map(rScript => ({
    id: rScript.id,
    type: NodeType.RScript,
    name: rScript.title,
    parentId: null,
    isEditable: rScript.isEditable
  }))

  const header = <DetailViewHeader labelKey="r_scripts__header_label" />

  const createButton = (
    <Button
      variant={ButtonVariant.Primary}
      icon={IconName.Add}
      customStyles={styles.createButton}
      onClick={createRScript}>
      {t("r_scripts__button_create")}
    </Button>
  )

  const renderNode = (node: RScriptNode) => (
    <div css={styles.node} onClick={() => selectRScript(node.id)}>
      {node.name !== "" ? node.name : t("r_scripts__title_placeholder")}
      <Icon name={node.isEditable ? IconName.EditBordered : IconName.LockClosed} />
    </div>
  )

  return (
    <Content subHeader={header} loading={isLoading} customContentContainerStyles={styles.content}>
      <div css={styles.columns}>
        <TableOfContentsContainer
          title={`${t("r_scripts__list_title")} (${rScriptNodes.length})`}
          showPlaceHolder={rScriptNodes.length === 0}
          placeholderHeadline={t("r_scripts__list_placeholder_title")}
          placeholderHint={t("r_scripts__list_placeholder_text")}
          actionFooter={createButton}>
          {rScriptNodes.map(node => (
            <TableOfContentsEntry
              key={node.id}
              node={node}
              selectNode={node => node.forEach(rScriptNode => selectRScript(rScriptNode.id))}
              selectedNode={selectedRScript.map(rScript => rScript.id)}
              renderCustomNodeContent={renderNode}
            />
          ))}
        </TableOfContentsContainer>

        {selectedRScript
          .map(rScript => (
            <RScriptDetailViewContainer
              t={t}
              rScript={rScript}
              isUpdateLoading={isUpdateLoading}
              updateRScript={updateRScript}
              deleteRScript={deleteRScript}
              archiveRScript={archiveRScript}
              customStyles={styles.detailView}
            />
          ))
          .getOrElse(<EmptyRScriptDetailView t={t} customStyles={styles.detailView} />)}
      </div>
    </Content>
  )
}

const styles = {
  content: css({
    display: "flex"
  }),
  columns: css({
    flex: "1 1 auto",
    display: "flex",
    gap: spacingMedium
  }),
  detailView: css({
    flex: "1 1 auto"
  }),
  createButton: css({
    width: "100%"
  }),
  node: css({
    width: "100%",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between"
  })
}
