import * as React from "react"
import {DocumentViewScenarioCodingAutomatedCriterionUpdate, OfficeTool} from "shared/graphql/generated/globalTypes"
import {
  useCreateDocumentViewScenarioCodingAutomatedCriterion,
  useScenario,
  useUpdateDocumentViewScenarioCodingAutomatedCriterion
} from "shared/graphql/hooks"
import {automatedCodingCriteriaQuery, codingDimensionsQuery} from "shared/graphql/queries"
import {AutomatedCodingCriterion, DocumentViewScenarioCodingAutomatedCriterion, SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {CreateOrUpdateDocumentViewCriterion} from "./create-or-update-document-view-criterion"

export type DocumentViewPreviewTools =
  | OfficeTool.FileBrowser
  | OfficeTool.EmailClient
  | OfficeTool.ReferenceBookViewer
  | OfficeTool.Erp

export enum DocumentViewCriterionDisplayMode {
  Create = "Create",
  Update = "Update"
}

interface Props {
  readonly criterion: Option<DocumentViewScenarioCodingAutomatedCriterion>
  readonly codingItemId: UUID
  readonly displayMode: DocumentViewCriterionDisplayMode
  readonly scenarioId: UUID
  readonly codingModelId: UUID
  readonly onSuccess?: () => void
  readonly onDismiss: () => void
}

export const CreateOrUpdateDocumentViewCriterionContainer: React.FC<Props> = ({
  criterion,
  scenarioId,
  codingItemId,
  displayMode,
  onSuccess,
  onDismiss,
  codingModelId,
  ...rest
}) => {
  const [visibleTool, setVisibleTool] = React.useState<Option<DocumentViewPreviewTools>>(Option.none())
  const [isChooseDocumentModalVisible, setIsChooseDocumentModalVisible] = React.useState(true)

  const {scenario} = useScenario(scenarioId)

  const {updateDocumentViewScenarioCodingAutomatedCriterion} = useUpdateDocumentViewScenarioCodingAutomatedCriterion()
  const {createDocumentViewScenarioCodingAutomatedCriterion} = useCreateDocumentViewScenarioCodingAutomatedCriterion([
    {query: automatedCodingCriteriaQuery, variables: {itemId: codingItemId}},
    {query: codingDimensionsQuery, variables: {modelId: codingModelId}}
  ])

  const handleUpdateAutomatedCriterionUpdate = (
    criterion: AutomatedCodingCriterion,
    documentViewUpdate: Partial<DocumentViewScenarioCodingAutomatedCriterionUpdate>
  ) => {
    if (criterion.__typename === "DocumentViewScenarioCodingAutomatedCriterion") {
      return updateDocumentViewScenarioCodingAutomatedCriterion(criterion.id, {
        score: documentViewUpdate.score ?? criterion.score,
        fileId: documentViewUpdate.fileId === undefined ? criterion.fileId : documentViewUpdate.fileId,
        emailId: documentViewUpdate.emailId === undefined ? criterion.emailId : documentViewUpdate.emailId,
        erpRowId: documentViewUpdate.erpRowId === undefined ? criterion.erpRowId : documentViewUpdate.erpRowId,
        erpTableType:
          documentViewUpdate.erpTableType === undefined ? criterion.erpTableType : documentViewUpdate.erpTableType,
        referenceBookArticleId:
          documentViewUpdate.referenceBookArticleId === undefined
            ? criterion.referenceBookArticleId
            : documentViewUpdate.referenceBookArticleId,
        sampleCompanyId:
          documentViewUpdate.sampleCompanyId === undefined
            ? criterion.sampleCompanyId
            : documentViewUpdate.sampleCompanyId
      }).then(onSuccess)
    } else {
      // eslint-disable-next-line consistent-return
      return undefined
    }
  }

  const handleCreateDocumentViewScenarioCodingAutomatedCriterion = (
    id: Partial<DocumentViewScenarioCodingAutomatedCriterionUpdate>
  ) => {
    return createDocumentViewScenarioCodingAutomatedCriterion({
      score: 0,
      itemId: codingItemId,
      ...getDocumentViewUpdate(id)
    }).then(onSuccess)
  }

  const handleDocumentConfirmClick = (officeTool: OfficeTool) => {
    setIsChooseDocumentModalVisible(false)
    setVisibleTool(Option.of<DocumentViewPreviewTools>(officeTool as DocumentViewPreviewTools))
  }

  const getDocumentViewUpdate = (
    id: Partial<DocumentViewScenarioCodingAutomatedCriterionUpdate>
  ): Partial<DocumentViewScenarioCodingAutomatedCriterionUpdate> => ({
    referenceBookArticleId: null,
    emailId: null,
    fileId: null,
    erpTableType: null,
    erpRowId: null,
    sampleCompanyId: null,
    ...id
  })

  const isUpdate = displayMode === DocumentViewCriterionDisplayMode.Update

  const sampleCompany = scenario.exists(s => s.sampleCompany === null)
    ? Option.none<SampleCompany>()
    : scenario.map<SampleCompany>(s => s.sampleCompany!)

  const handleUpdateOrCreation = (updatedIds: Partial<DocumentViewScenarioCodingAutomatedCriterionUpdate>) => {
    isUpdate
      ? criterion.forEach(criterion =>
          handleUpdateAutomatedCriterionUpdate(criterion, getDocumentViewUpdate(updatedIds))
        )
      : handleCreateDocumentViewScenarioCodingAutomatedCriterion(updatedIds)
  }

  return (
    <CreateOrUpdateDocumentViewCriterion
      onDismiss={onDismiss}
      onEntityIdSelected={handleUpdateOrCreation}
      criterion={criterion}
      isChooseDocumentModalVisible={isChooseDocumentModalVisible}
      sampleCompanyId={sampleCompany.map(company => company.id).orUndefined()}
      sampleCompanyName={sampleCompany.map(company => company.name).orUndefined()}
      scenarioId={scenarioId}
      handleDocumentConfirmClick={handleDocumentConfirmClick}
      visibleTool={visibleTool}
      setVisibleTool={setVisibleTool}
      {...rest}
    />
  )
}
