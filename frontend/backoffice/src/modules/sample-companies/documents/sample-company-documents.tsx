import {css} from "@emotion/react"
import {noop} from "lodash-es"
import * as React from "react"
import {
  ContentLoadingIndicator,
  DetailViewHeader,
  FileExplorer,
  FilesAndDirectoriesDetailEmpty
} from "shared/components"
import {Flex, headerHeight, spacing, spacingHuge, spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {CreateDirectoryModal} from "./create-directory/create-directory-modal"
import {DirectoryDetail} from "./directory-detail/directory-detail"
import {FileDetail} from "./file-detail/file-detail"
import {SubRouteConfig, useSampleCompanyDocuments} from "./hooks/use-sample-company-documents"

export interface SampleCompanyDocumentProps {
  readonly sampleCompanyId: UUID
  readonly fileId?: UUID
  readonly directoryId?: UUID
  readonly scenarioId?: UUID
  readonly subRouteConfig?: SubRouteConfig
}

export const SampleCompanyDocuments: React.FC<SampleCompanyDocumentProps> = ({
  sampleCompanyId,
  fileId,
  directoryId,
  scenarioId,
  subRouteConfig
}) => {
  const {t} = useLucaTranslation()

  const {
    expandedDirectoryIds,
    filesInSelectedDirectory,
    getParentDirectory,
    hideCreateDirectoryModal,
    introFileId,
    isCreateDirectoryModalVisible,
    isFileDisabled,
    isRootDirectorySelected,
    loading,
    logoFileId,
    navigateToPrevious,
    onSelectNode,
    selectedDirectory,
    selectedFile,
    showCreateDirectoryModal,
    subDirectories,
    tree: treeOption
  } = useSampleCompanyDocuments(sampleCompanyId, directoryId, fileId, scenarioId, subRouteConfig)
  const checkIsIntro = (fileId: UUID) => introFileId.map(id => id === fileId).getOrElse(false)
  const checkIsLogo = (fileId: UUID) => logoFileId.map(id => id === fileId).getOrElse(false)
  return (
    <div css={styles.wrapper}>
      <DetailViewHeader
        labelKey={"sample_companies_files__title"}
        navigationButtonConfig={{
          labelKey: "sample_companies_files__navigate_back",
          onClick: navigateToPrevious
        }}
      />
      {loading ? (
        <ContentLoadingIndicator />
      ) : (
        <div css={styles.content}>
          {treeOption
            .map(tree => (
              <FileExplorer
                customStyles={{card: styles.card, cardContent: styles.cardContent}}
                tree={tree}
                isLoading={loading}
                expandedDirectoryIds={expandedDirectoryIds}
                selectedNodeId={selectedFile.map(({id}) => id).orElse(selectedDirectory.map(({id}) => id))}
                onSelectNode={onSelectNode}
                onExpandDirectory={noop}
                isCreateDirectoryButtonVisible={false}
                onCreateDirectory={showCreateDirectoryModal}
                shouldToggleDirectory={true}
                renderCustomFileSuffix={node =>
                  checkIsIntro(node.id)
                    ? t("sample_company_details__intro_suffix")
                    : checkIsLogo(node.id)
                    ? t("sample_company_details__logo_suffix")
                    : ""
                }
              />
            ))
            .orNull()}
          {selectedFile
            .map(file => (
              <FileDetail
                disabled={false}
                parentDirectory={getParentDirectory(file.id)}
                sampleCompanyId={sampleCompanyId}
                file={file}
                customStyles={styles.card}
                customContentStyles={styles.cardContent}
                scenarioId={scenarioId}
                isIntroFile={checkIsIntro(file.id)}
                isLogoFile={checkIsLogo(file.id)}
              />
            ))
            .getOrElse(
              selectedDirectory
                .map(directory => (
                  <DirectoryDetail
                    customStyles={styles.card}
                    customContentStyles={styles.cardContent}
                    isRootDirectorySelected={isRootDirectorySelected}
                    sampleCompanyId={sampleCompanyId}
                    scenarioId={scenarioId}
                    parentDirectory={getParentDirectory(directory.id)}
                    directory={directory}
                    subdirectories={subDirectories.getOrElse([])}
                    files={filesInSelectedDirectory.getOrElse([])}
                  />
                ))
                .getOrElse(<FilesAndDirectoriesDetailEmpty t={t} />)
            )}
        </div>
      )}
      {isCreateDirectoryModalVisible && (
        <CreateDirectoryModal
          parentDirectoryId={Option.none()}
          sampleCompanyId={sampleCompanyId}
          onConfirm={hideCreateDirectoryModal}
          onDismiss={hideCreateDirectoryModal}
          titleKey="sample_company_details__create_directory_modal_title"
        />
      )}
    </div>
  )
}

const Spacing = {
  // The card spacing consists of the header, the sub-header and its padding and the padding of the content
  card: 2 * headerHeight + 2 * spacingSmall + 2 * spacingMedium
}

const styles = {
  wrapper: css(Flex.column, {
    height: `calc(100vh - ${headerHeight}px)`
  }),
  content: css({
    flex: "1 1 auto",
    display: "grid",
    gap: spacingMedium,
    gridTemplateColumns: "350px minmax(0, 3fr)",
    padding: spacing(spacingMedium, spacingHuge)
  }),
  card: css({
    maxHeight: `calc(100vh - ${Spacing.card}px)`
  }),
  cardContent: css({
    overflow: "auto"
  })
}
