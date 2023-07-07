import omit from "lodash-es/omit"
import * as React from "react"
import {SampleCompanyCreation} from "shared/graphql/generated/globalTypes"
import {useCreateSampleCompany} from "shared/graphql/hooks"
import {SampleCompany} from "shared/models"
import {Option, uploadBinary} from "shared/utils"

export interface CompanyCreation extends Omit<SampleCompanyCreation, "profileBinaryFileId" | "logoBinaryFileId"> {
  readonly logoFile: Option<File>
  readonly logoBase64: Option<string>
}

export interface CreateSampleCompanyProps {
  readonly createSampleCompany: (creation: CompanyCreation) => Promise<Option<SampleCompany>>
  readonly isCreateSampleCompanyLoading: boolean
}

export const useHandleSampleCompanyCreation = (): CreateSampleCompanyProps => {
  const [isCreateSampleCompanyLoading, setIsCreateSampleCompanyLoading] = React.useState<boolean>(false)

  const {createSampleCompany} = useCreateSampleCompany()
  return {
    createSampleCompany: (creation: CompanyCreation) =>
      new Promise<Option<SampleCompany>>((resolve, reject) => {
        if (creation.logoFile.isEmpty()) {
          reject(new Error("No logo file was provided."))
          return
        }
        setIsCreateSampleCompanyLoading(true)
        creation.logoFile.forEach(file =>
          uploadBinary(file)
            .then(binary => {
              createSampleCompany({
                ...omit(creation, ["logoFile", "logoBase64"])
              })
                .then(resolve)
                .catch(reject)
            })
            .catch(reject)
            .finally(() => setIsCreateSampleCompanyLoading(false))
        )
      }),
    isCreateSampleCompanyLoading
  }
}
