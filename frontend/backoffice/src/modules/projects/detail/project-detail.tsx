import {sum} from "lodash-es"
import * as React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Content,
  CustomSelect,
  DetailViewCard,
  DetailViewHeader,
  DetailViewHeaderDeleteOrArchiveButtonConfig,
  Icon,
  Label,
  ReadonlyActionField,
  Text
} from "shared/components"
import {IconName} from "shared/enums"
import {ProjectUpdate, UsageField} from "shared/graphql/generated/globalTypes"
import {useDeleteProject} from "shared/graphql/hooks"
import {cardDecorativeBorder, Flex} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {
  CardDurationInfo,
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  OverlayEditField,
  OverlayEditFieldType,
  ResortModal
} from "../../../components"
import {CreateProjectModuleModal} from "../common/create-project-module-modal/create-project-module-modal"
import {getUsageFieldSelectOptions} from "../config/field-config"
import {useProjectDetail} from "./hooks/use-project-detail"
import {InviteProjectUsersModalContainer} from "./invite-users/invite-project-users-modal-container"
import {projectDetailStyles as styles} from "./project-detail.style"
import {ProjectDetailCardFooter} from "./project-detail-card-footer/project-detail-card-footer"
import {ProjectDetailTabbedCard} from "./project-detail-tabbed-card/project-detail-tabbed-card"

interface Props {
  readonly projectId: UUID
}

export const ProjectDetail: React.FunctionComponent<Props> = ({projectId}) => {
  const {t} = useLucaTranslation()
  const projectDetailHookProps = useProjectDetail(projectId)
  const {
    createModuleModalVisible,
    dataLoading,
    inviteUserModalVisible,
    navigateToOverview,
    project: projectOption,
    projectModules,
    projectUsersCount,
    repositionProjectModules,
    resortModalVisible,
    setCreateModuleModalVisible,
    setInviteUserModalVisible,
    setResortModalVisible,
    sortableModules,
    updateInProgress,
    updateProject
  } = projectDetailHookProps

  const handleUpdate = (update: Partial<ProjectUpdate>) =>
    projectOption.forEach(project => {
      if (!updateInProgress && project.id) {
        updateProject(project.id, {
          name: update.name ? update.name : project.name,
          description: update.description ? update.description : project.description,
          usageField: update.usageField ? update.usageField : project.usageField,
          audience: update.audience !== undefined && update.audience !== null ? update.audience : project.audience,
          welcomeText:
            update.welcomeText !== undefined && update.welcomeText !== null ? update.welcomeText : project.welcomeText
        })
      }
    })
  const deleteButtonConfig: DetailViewHeaderDeleteOrArchiveButtonConfig = {
    deleteHook: useDeleteProject,
    entityId: projectId,
    disabled: updateInProgress || dataLoading || projectOption.map(project => project.isFinalized).getOrElse(false),
    onSuccess: navigateToOverview
  }
  const header = (
    <DetailViewHeader
      customStyles={styles.header}
      labelKey={"projects__header_details_label"}
      navigationButtonConfig={{
        labelKey: "projects__detail_header_navigate_back_label",
        onClick: navigateToOverview
      }}
      deleteOrArchiveButtonConfig={deleteButtonConfig}
    />
  )
  const footer = projectOption
    .map(project => (
      <ProjectDetailCardFooter
        author={Option.of(project.author)}
        createdAt={project.createdAt}
        isFinalized={project.isFinalized}
        hideFooterWrapper={true}
      />
    ))
    .orNull()

  return (
    <Content
      isContentMissing={!dataLoading && projectOption.isEmpty()}
      loading={dataLoading}
      subHeader={header}
      customStyles={styles.content}
      actionBar={footer}>
      {projectOption
        .map(project => {
          const fieldIcon = project.isFinalized ? IconName.LockClosed : IconName.EditPencil
          return (
            <React.Fragment>
              <Card>
                <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={cardDecorativeBorder} />
                <CardContent customStyles={styles.informationContent}>
                  <div css={styles.informationHeader}>
                    <div>
                      <Label label={t("title")} icon={fieldIcon} customStyles={styles.label} />
                      <InlineEditableHeaderContainer
                        onConfirm={name => handleUpdate({name})}
                        text={project.name}
                        disabled={project.isFinalized}
                        customStyles={styles.description}
                      />
                    </div>
                    <ReadonlyActionField
                      renderValue={() => (
                        <CardDurationInfo
                          t={t}
                          maxDurationInSeconds={project.maxDurationInSeconds ?? 0}
                          showIconBeforeText={true}
                        />
                      )}
                      disabled={true}
                      label={t("projects__detail_time_label")}
                    />
                  </div>
                  <Label label={t("description")} icon={fieldIcon} customStyles={[styles.fieldLabel, styles.label]} />
                  <OverlayEditField<ProjectUpdate>
                    formFields={[
                      {
                        updateId: "description",
                        value: project.description,
                        type: OverlayEditFieldType.TEXTAREA
                      }
                    ]}
                    fieldLabelKey={"description"}
                    dialogTitleKey={"projects__overlay_update_description"}
                    onUpdate={handleUpdate}
                    updateLoading={updateInProgress}
                    renderValue={() => (
                      <InlineEditableTextareaContainer
                        text={project.description}
                        readOnly={true}
                        disabled={project.isFinalized}
                      />
                    )}
                    displayPlain={true}
                    disabled={project.isFinalized}
                    customStyles={styles.description}
                  />
                  <div css={styles.fieldWrapper}>
                    <OverlayEditField
                      buttonLabelKey={
                        !project.isFinalized ? (project.welcomeText ? "edit_button" : "create_button") : "show_button"
                      }
                      fieldLabelKey={"projects__overlay_label_welcome_field"}
                      renderValue={() => (
                        <span>
                          {t(`placeholder__data_${project.welcomeText ? "present" : "unavailable"}` as LucaI18nLangKey)}
                        </span>
                      )}
                      overlayFormDisabled={project.isFinalized}
                      dialogTitleKey={
                        project.isFinalized
                          ? "projects__overlay_label_welcome_headline_finalized"
                          : "projects__overlay_label_welcome_headline"
                      }
                      dialogDescriptionKey={"projects__overlay_label_welcome_description"}
                      updateLoading={updateInProgress}
                      formFields={[
                        {
                          updateId: "welcomeText",
                          labelKey: "projects__overlay_label_welcome_field_content",
                          value: project.welcomeText,
                          type: OverlayEditFieldType.TEXTAREA,
                          placeholderKey: "projects__overlay_label_welcome_field_placeholder"
                        }
                      ]}
                      placeholderKey={"placeholder__data_unavailable"}
                      displayPlaceholder={!project.welcomeText}
                      onUpdate={handleUpdate}
                      customModalStyles={project.isFinalized ? styles.welcomeModalFinalized : styles.welcomeModal}
                    />
                    <CustomSelect
                      optionList={getUsageFieldSelectOptions(project.usageField, t)}
                      disabled={project.isFinalized}
                      labelKey={"projects__overlay_label_usage_field"}
                      value={project.usageField}
                      customStyles={styles.selectField}
                      onChange={usageField => handleUpdate({usageField: usageField as UsageField})}
                    />
                    <OverlayEditField
                      fieldLabelKey={"projects__overlay_label_target"}
                      renderValue={() => <span>{project.audience}</span>}
                      dialogTitleKey={"projects__overlay_target"}
                      updateLoading={updateInProgress}
                      displayPlaceholder={project.audience.length === 0}
                      placeholderKey={"projects__overlay_label_target"}
                      disabled={project.isFinalized}
                      formFields={[
                        {
                          updateId: "audience",
                          labelKey: "projects__overlay_label_target",
                          value: project.audience,
                          type: OverlayEditFieldType.TEXT,
                          placeholderKey: "projects__overlay_label_target"
                        }
                      ]}
                      onUpdate={handleUpdate}
                    />
                    <ReadonlyActionField
                      renderValue={() => (
                        <div css={Flex.row}>
                          <Icon name={IconName.User} hasSpacing={true} />
                          {t("projects__surveys_details_accounts_value", {count: projectUsersCount})}
                        </div>
                      )}
                      label={t("projects__surveys_details_accounts_label")}
                      buttonLabel={t("invite_button")}
                      onClick={() => setInviteUserModalVisible(true)}
                    />
                  </div>
                  <ProjectDetailTabbedCard {...projectDetailHookProps} t={t} />
                </CardContent>
                <CardFooter customStyles={styles.cardDecorativeBorder} />
              </Card>
              {createModuleModalVisible && (
                <CreateProjectModuleModal onDismiss={() => setCreateModuleModalVisible(false)} projectId={projectId} />
              )}
              {inviteUserModalVisible && (
                <InviteProjectUsersModalContainer
                  onDismiss={() => setInviteUserModalVisible(false)}
                  projectId={projectId}
                />
              )}
              {resortModalVisible && (
                <ResortModal
                  disabled={dataLoading}
                  titleKey={"projects__modules_sort_title"}
                  onDismiss={() => setResortModalVisible(false)}
                  onConfirm={questions => repositionProjectModules(questions).then(() => setResortModalVisible(false))}
                  tableLabel={t("projects__scenarios_title", {
                    count: sortableModules.length
                  })}
                  entities={sortableModules}
                  isProject={true}
                />
              )}
            </React.Fragment>
          )
        })
        .getOrElse(
          <DetailViewCard label={t("information")} content={<Text>{t("projects__detail_no_project")}</Text>} />
        )}
    </Content>
  )
}
