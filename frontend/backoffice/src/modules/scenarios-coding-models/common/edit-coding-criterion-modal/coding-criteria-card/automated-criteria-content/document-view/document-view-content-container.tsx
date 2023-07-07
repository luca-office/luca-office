import * as React from "react"
import {DocumentViewScenarioCodingAutomatedCriterion} from "shared/models"
import {DocumentViewContent} from "./document-view-content"

interface Props {
  readonly criterion: DocumentViewScenarioCodingAutomatedCriterion
  readonly scenarioId: UUID
  readonly codingModelId: UUID
  readonly titleForDocumentViewCodingCriterion: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string
}

export const DocumentViewContentContainer: React.FC<Props> = ({...rest}) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = React.useState(false)
  return (
    <DocumentViewContent
      isUpdateModalVisible={isUpdateModalVisible}
      setIsUpdateModalVisible={setIsUpdateModalVisible}
      {...rest}
    />
  )
}
