import * as React from "react"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {useUpdateReferenceBookContent} from "shared/graphql/hooks"
import {AppNotification} from "shared/models"
import {Option, uploadBinary} from "shared/utils"
import {updateNotification, UpdateNotificationAction} from "../../../../../redux/actions/ui/common-ui-action"

export interface UseReferenceBookImageHook {
  readonly hideUpdateModal: () => void
  readonly isDeleteOrlyVisible: boolean
  readonly operationLoading: boolean
  readonly setIsDeleteOrlyVisible: (isVisible: boolean) => void
  readonly setViewerModalVisible: (isVisible: boolean) => void
  readonly showUpdateModal: () => void
  readonly updateImage: (file: File) => void
  readonly updateModalVisible: boolean
  readonly viewerModalVisible: boolean
}

export const useReferenceBookImage = (referenceBookChapterId: UUID, contentId: UUID): UseReferenceBookImageHook => {
  const dispatch = useDispatch()

  const [isDeleteOrlyVisible, setIsDeleteOrlyVisible] = React.useState<boolean>(false)
  const [updateModalVisible, setUpdateModalVisible] = React.useState<boolean>(false)
  const [viewerModalVisible, setViewerModalVisible] = React.useState<boolean>(false)
  const [uploadingImage, setUploadingImage] = React.useState<boolean>(false)

  const showUpdateModal = () => setUpdateModalVisible(true)
  const hideUpdateModal = () => setUpdateModalVisible(false)

  const {updateReferenceBookContent, updateReferenceBookContentLoading} = useUpdateReferenceBookContent(
    referenceBookChapterId
  )

  const updateImage = (file: File) => {
    setUploadingImage(true)
    uploadBinary(file)
      .then(binary =>
        updateReferenceBookContent(contentId, {
          imageBinaryFileId: binary.data.id
        })
      )
      .then(() => hideUpdateModal())
      .catch(() =>
        dispatch<UpdateNotificationAction>(
          updateNotification(
            Option.of<AppNotification>({
              severity: NotificationSeverity.Error,
              messageKey: "file__swap_file_type_image_failed"
            })
          )
        )
      )
      .finally(() => setUploadingImage(false))
  }

  return {
    hideUpdateModal,
    isDeleteOrlyVisible,
    operationLoading: updateReferenceBookContentLoading || uploadingImage,
    setIsDeleteOrlyVisible,
    showUpdateModal,
    updateImage,
    updateModalVisible,
    setViewerModalVisible,
    viewerModalVisible
  }
}
