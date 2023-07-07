import {useMutation} from "@apollo/client"
import {TextDocument} from "../../../../models"
import {Option} from "../../../../utils"
import {CreateTextDocument, CreateTextDocumentVariables} from "../../../generated/CreateTextDocument"
import {TextDocumentCreation} from "../../../generated/globalTypes"
import {createTextDocumentMutation} from "../../../mutations"
import {filesForSampleCompanyQuery, filesForScenarioQuery} from "../../../queries"

export interface CreateTextDocumentProps {
  createTextDocument: (creation: TextDocumentCreation) => Promise<Option<TextDocument>>
  createTextDocumentLoading: boolean
}

interface UseCreateTextDocumentParams {
  readonly scenarioId?: UUID
  readonly sampleCompanyId?: UUID
}

export const useCreateTextDocument = (params?: UseCreateTextDocumentParams): CreateTextDocumentProps => {
  const [createTextDocument, {loading}] = useMutation<CreateTextDocument, CreateTextDocumentVariables>(
    createTextDocumentMutation
  )

  return {
    createTextDocument: (creation: TextDocumentCreation) =>
      new Promise<Option<TextDocument>>((resolve, reject) => {
        createTextDocument({
          variables: {creation},
          ...(params !== undefined && {
            ...(params.scenarioId && {
              refetchQueries: [{query: filesForScenarioQuery, variables: {scenarioId: params.scenarioId}}]
            }),
            ...(params.sampleCompanyId && {
              refetchQueries: [
                {query: filesForSampleCompanyQuery, variables: {sampleCompanyId: params.sampleCompanyId}}
              ]
            })
          })
        })
          .then(result => resolve(Option.of<TextDocument>(result.data?.createTextDocument)))
          .catch(reject)
      }),
    createTextDocumentLoading: loading
  }
}
