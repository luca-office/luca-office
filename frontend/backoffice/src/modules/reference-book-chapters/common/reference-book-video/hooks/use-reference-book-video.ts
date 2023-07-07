import * as React from "react"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {useUpdateReferenceBookContent} from "shared/graphql/hooks"
import {AppNotification} from "shared/models"
import {Option, uploadBinary} from "shared/utils"
import {updateNotification, UpdateNotificationAction} from "../../../../../redux/actions/ui/common-ui-action"

export interface UseReferenceBookVideoHook {
  readonly hideUpdateModal: () => void
  readonly isDeleteOrlyVisible: boolean
  readonly operationLoading: boolean
  readonly setIsDeleteOrlyVisible: (isVisible: boolean) => void
  readonly setViewerModalVisible: (isVisible: boolean) => void
  readonly showUpdateModal: () => void
  readonly updateModalVisible: boolean
  readonly updateVideo: (file: File) => void
  readonly viewerModalVisible: boolean
}

export const useReferenceBookVideo = (referenceBookChapterId: UUID, contentId: UUID): UseReferenceBookVideoHook => {
  const dispatch = useDispatch()

  const [isDeleteOrlyVisible, setIsDeleteOrlyVisible] = React.useState<boolean>(false)
  const [updateModalVisible, setUpdateModalVisible] = React.useState<boolean>(false)
  const [viewerModalVisible, setViewerModalVisible] = React.useState<boolean>(false)
  const [uploadingVideo, setUploadingVideo] = React.useState<boolean>(false)

  const showUpdateModal = () => setUpdateModalVisible(true)
  const hideUpdateModal = () => setUpdateModalVisible(false)

  const {updateReferenceBookContent, updateReferenceBookContentLoading} = useUpdateReferenceBookContent(
    referenceBookChapterId
  )

  const updateVideo = (file: File) => {
    setUploadingVideo(true)
    uploadBinary(file)
      .then(binary =>
        updateReferenceBookContent(contentId, {
          videoBinaryFileId: binary.data.id
        })
      )
      .then(() => hideUpdateModal())
      .catch(() =>
        dispatch<UpdateNotificationAction>(
          updateNotification(
            Option.of<AppNotification>({
              severity: NotificationSeverity.Error,
              messageKey: "file__swap_file_type_video_failed"
            })
          )
        )
      )
      .finally(() => setUploadingVideo(false))
  }

  return {
    hideUpdateModal,
    isDeleteOrlyVisible,
    operationLoading: updateReferenceBookContentLoading || uploadingVideo,
    setIsDeleteOrlyVisible,
    setViewerModalVisible,
    showUpdateModal,
    updateModalVisible,
    updateVideo,
    viewerModalVisible
  }
}
