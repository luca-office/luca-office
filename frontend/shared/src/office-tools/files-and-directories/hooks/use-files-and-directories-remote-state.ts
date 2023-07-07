import {useEffect, useState} from "react"
import {
  useDirectoriesForSampleCompanyLazy,
  useDirectoriesForScenario,
  useFilesForSampleCompanyLazy,
  useFilesForScenario
} from "../../../graphql/hooks"
import {Directory, File} from "../../../models"
import {useLucaTranslation} from "../../../translations"
import {Option} from "../../../utils"
import {getDownloadRoot} from "../utils/files-and-directories-utils"

export const useFilesAndDirectoriesRemoteState = (scenarioId: UUID, sampleCompanyIdOption: Option<UUID>) => {
  const {t} = useLucaTranslation()

  const {directories: directoriesOption, directoriesLoading} = useDirectoriesForScenario(scenarioId)
  const {files: filesOption, filesLoading} = useFilesForScenario(scenarioId)

  useEffect(() => {
    // needed for survey resumption, if files and directories was last opened tool -> not all directories were shown
    directoriesOption.forEach(dirs => {
      setDirectories([getDownloadRoot(scenarioId, t("files_and_directories__downloads_label")), ...dirs])
    })
  }, [directoriesLoading])

  const [directories, setDirectories] = useState<Directory[]>([])

  const [sampleCompanyFiles, setSampleCompanyFiles] = useState<File[]>([])

  const onFilesForSampleCompanyCompleted = (data: Option<File[]>) => {
    setSampleCompanyFiles([...data.getOrElse([])])
  }

  const onDirectoriesForSampleCompanyCompleted = (data: Option<Directory[]>) =>
    setDirectories([...directories, ...data.getOrElse([])])

  const {getDirectoriesForSampleCompany, directoriesForSampleCompanyLoading} = useDirectoriesForSampleCompanyLazy(
    onDirectoriesForSampleCompanyCompleted
  )
  const {getFilesForSampleCompany, filesForSampleCompanyLoading} = useFilesForSampleCompanyLazy(
    onFilesForSampleCompanyCompleted
  )

  useEffect(() => {
    sampleCompanyIdOption.forEach(id => {
      getFilesForSampleCompany(id)
      getDirectoriesForSampleCompany(id)
    })
  }, [sampleCompanyIdOption.orNull()])

  return {
    directories,
    files: filesOption.getOrElse([]),
    sampleCompanyFiles,
    dataLoading:
      directoriesLoading || filesLoading || directoriesForSampleCompanyLoading || filesForSampleCompanyLoading
  }
}
