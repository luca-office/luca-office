import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {OfficeTool} from "shared/enums"
import {
  useDirectoriesForSampleCompanyLazy,
  useDirectoriesForScenario,
  useFilesForSampleCompanyLazy,
  useFilesForScenario
} from "shared/graphql/hooks"
import {Directory, File} from "shared/models"
import {getDownloadRoot} from "shared/office-tools/files-and-directories/utils/files-and-directories-utils"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {dependencyInitialized} from "../../../../../redux/actions/player-preview-actions"

export const useFilesAndDirectoriesSnapshotRemoteState = (scenarioId: UUID, sampleCompanyIdOption: Option<UUID>) => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const {directories: directoriesOption, directoriesLoading} = useDirectoriesForScenario(scenarioId)
  const {files: filesOption, filesLoading} = useFilesForScenario(scenarioId)

  const [isSampleCompanyFilesDownloadFinished, setIsSampleCompanyFilesDownloadFinished] = useState(false)
  const [isSampleCompanyDirectoriesDownloadFinished, setIsSampleCompanyDirectoriesDownloadFinished] = useState(false)

  const [directories, setDirectories] = useState<Directory[]>([
    ...directoriesOption.getOrElse([]),
    getDownloadRoot(scenarioId, t("files_and_directories__downloads_label"))
  ])
  const [sampleCompanyFiles, setSampleCompanyFiles] = useState<File[]>([])

  const onFilesForSampleCompanyCompleted = (data: Option<File[]>) => {
    setSampleCompanyFiles([...data.getOrElse([])])
    setIsSampleCompanyDirectoriesDownloadFinished(true)
  }

  const onDirectoriesForSampleCompanyCompleted = (data: Option<Directory[]>) => {
    setDirectories([...directories, ...data.getOrElse([])])
    setIsSampleCompanyFilesDownloadFinished(true)
  }

  const {getDirectoriesForSampleCompany, directoriesForSampleCompanyLoading} = useDirectoriesForSampleCompanyLazy(
    onDirectoriesForSampleCompanyCompleted
  )
  const {getFilesForSampleCompany, filesForSampleCompanyLoading} = useFilesForSampleCompanyLazy(
    onFilesForSampleCompanyCompleted
  )

  useEffect(() => {
    if (sampleCompanyIdOption.isDefined()) {
      sampleCompanyIdOption.forEach(id => {
        getFilesForSampleCompany(id)
        getDirectoriesForSampleCompany(id)
      })
    } else {
      // if no sample company is defined we have to set download state manually, so that  this tool is recognized as initialized
      setIsSampleCompanyDirectoriesDownloadFinished(true)
      setIsSampleCompanyFilesDownloadFinished(true)
    }
  }, [sampleCompanyIdOption.orNull()])

  useEffect(() => {
    if (
      !directoriesLoading &&
      !filesLoading &&
      isSampleCompanyDirectoriesDownloadFinished &&
      isSampleCompanyFilesDownloadFinished
    ) {
      dispatch(dependencyInitialized(OfficeTool.FileBrowser))
    }
  }, [
    directoriesLoading,
    filesLoading,
    isSampleCompanyDirectoriesDownloadFinished,
    isSampleCompanyFilesDownloadFinished
  ])

  return {
    directories,
    files: filesOption.getOrElse([]),
    sampleCompanyFiles,
    dataLoading:
      directoriesLoading || filesLoading || directoriesForSampleCompanyLoading || filesForSampleCompanyLoading
  }
}
