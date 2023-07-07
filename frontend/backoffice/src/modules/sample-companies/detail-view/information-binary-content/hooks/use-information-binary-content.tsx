import {Dispatch, SetStateAction, useState} from "react"
import {FileUsageType, Relevance, SampleCompanyUpdate} from "shared/graphql/generated/globalTypes"
import {useCreateFile, useDeleteFileFromSampleCompany} from "shared/graphql/hooks"
import {SampleCompany, UploadBinary} from "shared/models"
import {useLucaTranslation, WithLucaTranslation} from "shared/translations"
import {first, Option, uploadBinary} from "shared/utils"

export interface UseInformationBinaryContentHook extends WithLucaTranslation {
  readonly showUploadIntroModal: boolean
  readonly showEditIntroModal: boolean
  readonly showViewIntroModal: boolean
  readonly setShowUploadIntroModal: Dispatch<SetStateAction<boolean>>
  readonly setShowEditIntroModal: Dispatch<SetStateAction<boolean>>
  readonly setShowViewIntroModal: Dispatch<SetStateAction<boolean>>
  readonly createLogo: (binaries: UploadBinary[]) => void
  readonly createIntro: (binaries: UploadBinary[]) => void
  readonly updateIntro: (file: File) => void
  readonly deleteLogo: (fileId: UUID) => void
  readonly deleteIntro: (fileId: UUID) => void
}

export const useInformationBinaryContent = (
  sampleCompanyOption: Option<SampleCompany>,
  updateSampleCompany: (update: Partial<SampleCompanyUpdate>) => Promise<Option<SampleCompany>>
): UseInformationBinaryContentHook => {
  const [showUploadIntroModal, setShowUploadIntroModal] = useState(false)
  const [showEditIntroModal, setShowEditIntroModal] = useState(false)
  const [showViewIntroModal, setShowViewIntroModal] = useState(false)
  const {t} = useLucaTranslation()
  const {createFile} = useCreateFile(sampleCompanyOption.map(({id}) => ({sampleCompanyId: id})).orUndefined())
  const {deleteEntity: deleteFileFromSampleCompany} = useDeleteFileFromSampleCompany(
    sampleCompanyOption.map(sampleCompany => sampleCompany.id).getOrElse("")
  )

  const handleCreateFile = (
    binaries: UploadBinary[],
    sampleCompanyUpdateFieldKey: keyof Pick<SampleCompanyUpdate, "profileFileId" | "logoFileId">
  ) => {
    first(binaries).map(binary =>
      sampleCompanyOption.forEach(sampleCompany =>
        createFile({
          binaryFileId: binary.data.id,
          name: binary.data.filename,
          relevance: Relevance.PotentiallyHelpful,
          tags: [],
          usageType: FileUsageType.FileSystem,
          directoryId: sampleCompany.directoryId
        }).then(fileOption =>
          fileOption.forEach(file => {
            updateSampleCompany({[sampleCompanyUpdateFieldKey]: file.id})
            setShowUploadIntroModal(false)
            setShowEditIntroModal(false)
          })
        )
      )
    )
  }

  const handleCreateLogo = (binaries: UploadBinary[]) => handleCreateFile(binaries, "logoFileId")
  const handleCreateIntro = (binaries: UploadBinary[]) => handleCreateFile(binaries, "profileFileId")

  const deleteLogo = (fileId: UUID) => {
    updateSampleCompany({logoFileId: null}).then(() => deleteFileFromSampleCompany(fileId))
  }

  const deleteIntro = (fileId: UUID) => {
    updateSampleCompany({profileFileId: null}).then(() => deleteFileFromSampleCompany(fileId))
  }

  const updateIntro = (file: File) => {
    uploadBinary(file).then(binary => handleCreateFile([binary], "profileFileId"))
  }
  return {
    createIntro: handleCreateIntro,
    createLogo: handleCreateLogo,
    deleteIntro,
    deleteLogo,
    setShowEditIntroModal,
    setShowUploadIntroModal,
    setShowViewIntroModal,
    showEditIntroModal,
    showUploadIntroModal,
    showViewIntroModal,
    t,
    updateIntro
  }
}
