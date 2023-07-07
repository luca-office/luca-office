import {UploadBinary} from "../models"

export const baseUrl = "/backend"

interface UploadExcelFileResponse {
  readonly message: string
  readonly status: number
}

export const uploadExcelFile = (sampleCompanyId: UUID, file: File): Promise<void> => {
  const formData = new FormData()
  formData.append("file", file)
  return new Promise<void>((resolve, reject) =>
    fetch(`${baseUrl}/binary/erp/sample-company/${sampleCompanyId}`, {
      method: "POST",
      body: formData,
      credentials: "same-origin",
      headers: {Accept: "application/json"}
    })
      .then(
        response =>
          new Promise<UploadExcelFileResponse>((resolveResponse, rejectResponse) =>
            response
              .text()
              .then(text => resolveResponse({message: text, status: response.status}))
              .catch(rejectResponse)
          )
      )
      .then(({message, status}) => {
        if (status >= 400 && status < 600) {
          throw new Error(message ?? "Failed to upload excel file")
        }
        resolve()
      })
      .catch(reject)
  )
}

export const uploadBinary = (file: File): Promise<UploadBinary> => {
  const formData = new FormData()
  formData.append("file", file)
  return fetch(`${baseUrl}/binary`, {
    method: "POST",
    body: formData,
    credentials: "same-origin",
    headers: {Accept: "application/json"}
  }).then(response => response.json())
}
