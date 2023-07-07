import {css} from "@emotion/react"
import partial from "lodash-es/partial"
import * as React from "react"
import {ContentImage, DeleteOrArchiveEntityButton, Icon, ImageViewer, Overlay} from "shared/components"
import {BinaryType, IconName} from "shared/enums"
import {useDeleteReferenceBookContent} from "shared/graphql/hooks"
import {BinaryFile} from "shared/models"
import {Flex, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {BinaryUpdateModal} from "../../../../components"
import {useReferenceBookImage} from "./hooks/use-reference-book-image"

export interface ReferenceBookImageProps {
  readonly contentId: UUID
  readonly imageUrl: string
  readonly imageFile: Option<BinaryFile>
  readonly readonly?: boolean
  readonly referenceBookChapterId: UUID
  readonly scrollId?: string
}

export const ReferenceBookImage: React.FC<ReferenceBookImageProps> = ({
  contentId,
  imageUrl,
  imageFile,
  readonly = false,
  referenceBookChapterId,
  scrollId
}) => {
  const {t} = useLucaTranslation()
  const {
    hideUpdateModal,
    operationLoading,
    showUpdateModal,
    updateImage,
    updateModalVisible,
    isDeleteOrlyVisible,
    setIsDeleteOrlyVisible,
    viewerModalVisible,
    setViewerModalVisible
  } = useReferenceBookImage(referenceBookChapterId, contentId)

  return (
    <React.Fragment>
      <ContentImage scrollId={scrollId} imageUrl={imageUrl} wrapperStyle={!isDeleteOrlyVisible && styles.wrapper}>
        {!readonly ? (
          <div className={"edit-overlay"} css={styles.editOverlay} onClick={showUpdateModal}>
            <Icon customStyles={styles.control} color={"white"} name={IconName.EditBordered} />
            <div>{t("edit__image")}</div>
            <DeleteOrArchiveEntityButton
              customStyles={styles.control}
              stopEventPropagation={true}
              entityId={contentId}
              useDeleteHook={partial(useDeleteReferenceBookContent, referenceBookChapterId)}
              modalTitleKey={"reference_books__delete_dialog_title_image"}
              modalTextKey={"reference_books__delete_dialog_text_image"}
              isConfirmDialogVisible={isDeleteOrlyVisible}
              toggleIsConfirmDialogVisible={setIsDeleteOrlyVisible}
              stopEventPropagationOnOverlayClick={true}
            />
          </div>
        ) : (
          <div
            className={"edit-overlay"}
            css={[styles.editOverlay, styles.previewOverlay]}
            onClick={() => setViewerModalVisible(true)}>
            <div>{t("preview__image")}</div>
          </div>
        )}
        {updateModalVisible && (
          <BinaryUpdateModal
            type={BinaryType.Image}
            src={imageUrl}
            onConfirm={updateImage}
            onDismiss={hideUpdateModal}
            disabled={operationLoading}
          />
        )}
      </ContentImage>
      {viewerModalVisible &&
        imageFile
          .map(image => (
            <Overlay>
              <ImageViewer
                binaries={[{id: image.id, title: image.filename, path: imageUrl}]}
                onClose={() => setViewerModalVisible(false)}
                customStyles={styles.viewer}
              />
            </Overlay>
          ))
          .orNull()}
    </React.Fragment>
  )
}

const styles = {
  wrapper: css({
    "&:not(:hover) > .edit-overlay": {
      display: "none"
    }
  }),
  editOverlay: css(Flex.column, {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(46, 48, 50, 0.48)",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer"
  }),
  previewOverlay: css({
    justifyContent: "center"
  }),
  viewer: css({
    width: "75vw",
    height: "90vh"
  }),
  control: css({
    alignSelf: "flex-end",
    margin: spacingSmall
  })
}
