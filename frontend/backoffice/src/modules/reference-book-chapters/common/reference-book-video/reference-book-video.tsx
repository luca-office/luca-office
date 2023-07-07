import {css} from "@emotion/react"
import partial from "lodash-es/partial"
import * as React from "react"
import {DeleteOrArchiveEntityButton, Icon, Overlay, VideoViewer} from "shared/components"
import {BinaryType, IconName} from "shared/enums"
import {useDeleteReferenceBookContent} from "shared/graphql/hooks"
import {BinaryFile} from "shared/models"
import {backgroundColorDarker, Flex, spacing, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {BinaryUpdateModal} from "../../../../components"
import {useReferenceBookVideo} from "./hooks/use-reference-book-video"

export interface ReferenceBookVideoProps {
  readonly contentId: UUID
  readonly readonly?: boolean
  readonly referenceBookChapterId: UUID
  readonly scrollId?: string
  readonly videoUrl: string
  readonly videoFile: Option<BinaryFile>
}

export const ReferenceBookVideo: React.FC<ReferenceBookVideoProps> = ({
  contentId,
  readonly,
  referenceBookChapterId,
  scrollId,
  videoUrl,
  videoFile
}) => {
  const {t} = useLucaTranslation()
  const {
    hideUpdateModal,
    operationLoading,
    showUpdateModal,
    updateVideo,
    updateModalVisible,
    isDeleteOrlyVisible,
    setIsDeleteOrlyVisible,
    setViewerModalVisible,
    viewerModalVisible
  } = useReferenceBookVideo(referenceBookChapterId, contentId)

  return (
    <React.Fragment>
      <div css={styles.container(isDeleteOrlyVisible)} data-scroll={scrollId}>
        <div css={styles.videoWrapper}>
          <video role="video" css={styles.video} src={videoUrl} controls={false} />
        </div>
        {!readonly ? (
          <div className={"edit-overlay"} css={styles.editOverlay} onClick={showUpdateModal}>
            <Icon customStyles={styles.control} color={"white"} name={IconName.EditBordered} />
            <div>{t("edit__video")}</div>
            <DeleteOrArchiveEntityButton
              customStyles={styles.control}
              stopEventPropagation={true}
              entityId={contentId}
              useDeleteHook={partial(useDeleteReferenceBookContent, referenceBookChapterId)}
              modalTitleKey={"reference_books__delete_dialog_title_video"}
              modalTextKey={"reference_books__delete_dialog_text_video"}
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
            <div>{t("preview__video")}</div>
          </div>
        )}
        {updateModalVisible && (
          <BinaryUpdateModal
            type={BinaryType.Video}
            src={videoUrl}
            onConfirm={updateVideo}
            onDismiss={hideUpdateModal}
            disabled={operationLoading}
          />
        )}
      </div>
      {viewerModalVisible &&
        videoFile
          .map(video => (
            <Overlay>
              <VideoViewer
                binaries={[{id: video.id, title: video.filename, path: videoUrl}]}
                onClose={() => setViewerModalVisible(false)}
                customStyles={styles.viewer}
              />
            </Overlay>
          ))
          .orNull()}
    </React.Fragment>
  )
}

const Size = {
  video: 144
}

const styles = {
  container: (isDeleteOrlyVisible: boolean) =>
    css({
      position: "relative",
      display: "inline-block",
      width: Size.video,
      height: Size.video,
      margin: spacing(0, spacingSmall, spacingSmall, 0),
      backgroundColor: backgroundColorDarker,
      overflow: "hidden",

      ...(!isDeleteOrlyVisible && {
        "&:not(:hover) > .edit-overlay": {
          display: "none"
        }
      })
    }),
  videoWrapper: css(Flex.row, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }),
  video: css({
    maxWidth: "100%",
    maxHeight: "100%"
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
