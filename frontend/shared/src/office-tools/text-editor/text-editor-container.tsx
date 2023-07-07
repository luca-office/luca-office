import {css} from "@emotion/react"
import {isEqual, throttle} from "lodash-es"
import React from "react"
import {FileType} from "../../enums"
import {useFilesForSampleCompany, useFilesForScenario} from "../../graphql/hooks"
import {LocalTextDocument, TextDocumentFile, UpdateTextDocumentContentEventPayload} from "../../models"
import {TextDocumentsState} from "../../redux/state/data"
import {backgroundColorDarker, CustomStyle, Flex} from "../../styles"
import {Option} from "../../utils"
import {TextEditor} from "./text-editor"

export interface TextDocumentsContainerStateActions {
  readonly updateTextDocument: (textDocumentId: UUID, value: string) => void
  readonly initializeLocalTextDocument: (textDocument: LocalTextDocument) => void
}

export interface TextDocumentsContainerState {
  readonly textDocuments: TextDocumentsState
  readonly selectedTextDocumentId: UUID | null
}

export interface TextDocumentSurveyEvents {
  sendUpdateTextDocumentEvent: (payload: UpdateTextDocumentContentEventPayload) => void
  sendCloseTextDocumentEvent: (textDocumentId: UUID) => void
}

export interface TextEditorContainerProps extends CustomStyle {
  readonly useState: () => TextDocumentsContainerState
  readonly useStateActions: () => TextDocumentsContainerStateActions
  readonly useSurveyEvents: () => TextDocumentSurveyEvents
  readonly scenarioId: UUID
  readonly sampleCompanyIdOption: Option<UUID>
  readonly onClose: () => void
  readonly onMinimize: () => void
}

export const TextEditorContainer: React.FC<TextEditorContainerProps> = ({
  useState,
  useStateActions,
  useSurveyEvents,
  customStyles,
  scenarioId,
  sampleCompanyIdOption,
  onClose,
  onMinimize
}) => {
  const {textDocuments, selectedTextDocumentId} = useState()
  const {updateTextDocument, initializeLocalTextDocument} = useStateActions()
  const {sendUpdateTextDocumentEvent, sendCloseTextDocumentEvent} = useSurveyEvents()
  const {files: filesForScenarioOption, filesLoading: filesForScenarioLoading} = useFilesForScenario(scenarioId)
  const {files: filesForSampleCompanyOption, filesLoading: filesForSampleCompanyLoading} = useFilesForSampleCompany(
    sampleCompanyIdOption.getOrElse(""),
    sampleCompanyIdOption.isEmpty()
  )

  const sendUpdateTextDocumentEventThrottled = React.useCallback(
    throttle((content: string) => {
      if (selectedTextDocumentId) {
        sendUpdateTextDocumentEvent({
          textDocumentId: selectedTextDocumentId,
          fileId: selectedTextDocument.flatMap(({fileId}) => Option.of(fileId)).getOrElse(""),
          content,
          scenarioId
        })
      }
    }, 1000),
    []
  )

  const files = [...filesForScenarioOption.getOrElse([]), ...filesForSampleCompanyOption.getOrElse([])]
  const selectedFile = Option.of(
    files
      .filter(f => f.fileType === FileType.TextDocument)
      .find(f => (f as TextDocumentFile).textDocumentId === selectedTextDocumentId)
  )

  const selectedTextDocument = selectedFile
    .map(
      (f): LocalTextDocument => {
        return {
          content: (f as TextDocumentFile).textDocument.content,
          id: (f as TextDocumentFile).textDocumentId,
          fileId: f.id,
          title: f.name
        }
      }
    )
    .map(file => {
      if (file.id in textDocuments) {
        return textDocuments[file.id]
      } else {
        return file
      }
    })

  const textDocumentsRef = React.useRef(textDocuments)
  if (!isEqual(textDocumentsRef.current, textDocuments)) {
    textDocumentsRef.current = textDocuments
  }

  React.useEffect(() => {
    selectedTextDocument.forEach(document => {
      if (!(document.id in textDocuments)) initializeLocalTextDocument(document)
    })
  }, [selectedTextDocument.orUndefined()?.id, textDocumentsRef.current])

  const onChange = (content: string) => {
    if (selectedTextDocumentId) {
      updateTextDocument(selectedTextDocumentId, content)
      sendUpdateTextDocumentEventThrottled(content)
    }
  }

  const handleClose = () => {
    selectedTextDocumentId && sendCloseTextDocumentEvent(selectedTextDocumentId)
    onClose()
  }

  return (
    <TextEditor
      isLoading={filesForSampleCompanyLoading || filesForScenarioLoading}
      textDocument={selectedTextDocument}
      onChange={onChange}
      onClose={handleClose}
      onMinimize={onMinimize}
      customStyles={[styles.container, customStyles]}
    />
  )
}

const styles = {
  container: css(Flex.column, {
    position: "absolute",
    width: "100%",
    height: "100%",
    margin: "auto",
    background: backgroundColorDarker
  })
}
