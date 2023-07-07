import * as React from "react"
import {
  Card,
  CardContent,
  Content,
  DetailViewHeader,
  Heading,
  Icon,
  Label,
  ReadonlyActionField,
  Text
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {ProjectUpdate} from "shared/graphql/generated/globalTypes"
import {useDeleteSurvey} from "shared/graphql/hooks"
import {useLucaClipboard} from "shared/hooks"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  OverlayEditCompositeFieldConfig,
  OverlayEditField,
  OverlayEditFieldType
} from "../../../components"
import {HintText} from "../../../components/hint-text/hint-text"
import {getManualSurveyTimingHeadline, getSurveyTimingHeadline, isSurveyDeletable} from "../../../utils"
import {DashboardActionFooter, SurveyProgress} from "../../dashboard/common"
import {SynchronousActionFooterLocation} from "../../dashboard/common/synchronous-action-footer/synchronous-action-footer"
import {SynchronousActionFooterContainer} from "../../dashboard/common/synchronous-action-footer/synchronous-action-footer-container"
import {isManualSurvey, isManualSynchronousSurvey} from "../utils/common"
import {SurveyDetailForm, useSurveyDetail} from "./hooks/use-survey-detail"
import {InviteSurveyAttendeesModalContainer} from "./invite-attendees/invite-survey-attendees-modal-container"
import {surveyDetailStyles as styles} from "./survey-detail.style"
import {SurveyDetailDataDownload} from "./survey-detail-data-download/survey-detail-data-download"
import {SurveyDetailSettings} from "./survey-detail-settings/survey-detail-settings"

interface Props {
  readonly projectId: UUID
  readonly surveyId: UUID
}

export const SurveyDetail: React.FunctionComponent<Props> = ({projectId, surveyId}) => {
  const {t} = useLucaTranslation()
  const {copy: copyToClipboard} = useLucaClipboard()
  const {
    isEditable,
    isInvitationEnabled,
    dataLoading,
    survey: surveyOption,
    navigateToProjectDetail,
    navigateToSurveyUpdate,
    updateInProgress,
    updateSurvey,
    inviteAttendeesModalVisible,
    toggleInviteAttendeesModal,
    navigateToDashboard,
    navigateToRatingOverview,
    navigateToReportingOverview,
    project: projectOption,
    surveyResultsOverview: surveyResultsOverviewOption,
    isRatingFinalized,
    raters,
    completedParticipantsCount
  } = useSurveyDetail(projectId, surveyId)

  const isManualExecutionType = isManualSurvey(surveyOption.map(survey => survey.executionType))
  const isManualSynchronExecutionType = isManualSynchronousSurvey(surveyOption.map(survey => survey.executionType))

  const handleUpdate = (update: Partial<SurveyDetailForm>) =>
    surveyOption.forEach(survey => {
      if (!updateInProgress && survey.id) {
        updateSurvey(survey.id, {
          title: update.title ? update.title : survey.title,
          description: typeof update.description !== "undefined" ? update.description : survey.description
        })
      }
    })
  const header = (
    <DetailViewHeader
      labelKey={"projects__survey_details_header_label"}
      navigationButtonConfig={{
        labelKey: "projects__survey_details_header_navigate_back_label",
        onClick: navigateToProjectDetail
      }}
      deleteOrArchiveButtonConfig={surveyOption
        .map(survey => ({
          deleteHook: () => useDeleteSurvey(projectId),
          disabled: !isSurveyDeletable(survey),
          entityId: survey.id,
          onSuccess: () => navigateToProjectDetail()
        }))
        .orUndefined()}
      customStyles={styles.indexed}
    />
  )
  const footer = isManualExecutionType ? (
    <SynchronousActionFooterContainer
      isAsynchronousSurvey={!isManualSynchronExecutionType}
      location={SynchronousActionFooterLocation.SurveyDetail}
      surveyId={surveyId}
      projectOption={projectOption}
      projectId={projectId}
    />
  ) : (
    <DashboardActionFooter
      surveyId={surveyId}
      projectId={projectId}
      hideNavigationButton={surveyOption.map(survey => survey.isTestSurvey).getOrElse(true)}
    />
  )

  return (
    <Content
      subHeader={header}
      loading={dataLoading}
      customStyles={styles.content}
      customFooterStyles={styles.indexed}
      customContentContainerStyles={styles.contentContainer}
      isContentMissing={!dataLoading && (surveyOption.isEmpty() || surveyResultsOverviewOption.isEmpty())}
      actionBar={footer}>
      {surveyOption
        .map(survey => {
          const descriptionField: OverlayEditCompositeFieldConfig = {
            updateId: "description",
            value: survey.description,
            labelKey: "description",
            type: OverlayEditFieldType.TEXTAREA
          }

          return (
            <>
              <Card customStyles={survey.isTestSurvey && styles.cardTestSurvey} hasShadow={survey.isTestSurvey}>
                <CardContent customStyles={[styles.cardContent, survey.isTestSurvey && styles.cardContentTestSurvey]}>
                  {survey.isTestSurvey && (
                    <HintText
                      text={t("projects__surveys_details_test_survey_info")}
                      customStyles={styles.testInfoLine}
                    />
                  )}
                  <div css={styles.headlineWrapper}>
                    <div>
                      <Label label={t("title")} icon={isEditable ? IconName.EditPencil : IconName.LockClosed} />
                      <InlineEditableHeaderContainer
                        disabled={!isEditable}
                        onConfirm={title => handleUpdate({title})}
                        text={survey.title}
                        customStyles={styles.inlineField}
                      />
                    </div>
                    <Heading level={HeadingLevel.h1} customStyles={styles.timingHeadline}>
                      {isManualExecutionType
                        ? getManualSurveyTimingHeadline(t, survey)
                        : getSurveyTimingHeadline(t, survey.startsAt, survey.endsAt, survey.isCompleted)}
                    </Heading>
                  </div>
                  <Label label={t("description")} icon={isEditable ? IconName.EditPencil : IconName.LockClosed} />
                  <OverlayEditField<ProjectUpdate>
                    formFields={[descriptionField]}
                    fieldLabelKey={"description"}
                    dialogTitleKey={"projects__survey_overlay_update_description"}
                    onUpdate={handleUpdate}
                    updateLoading={updateInProgress}
                    disabled={!isEditable}
                    renderValue={() => (
                      <InlineEditableTextareaContainer
                        text={survey.description}
                        readOnly={true}
                        disabled={!isEditable}
                      />
                    )}
                    customStyles={styles.inlineField}
                    displayPlain={true}
                  />
                  <div css={styles.infoWrapper}>
                    {survey.isOpenParticipationEnabled ? (
                      <ReadonlyActionField
                        renderValue={() => (
                          <Text customStyles={[Flex.row, styles.actionFieldInvitation]} size={TextSize.Medium}>
                            <Icon name={IconName.Link} customStyles={styles.actionFieldIcon} />
                            <span>{survey.openParticipationPlayerUrl}</span>
                          </Text>
                        )}
                        buttonLabel={t("copy")}
                        customStyles={styles.participationWrapper}
                        onClick={() => copyToClipboard(survey.openParticipationPlayerUrl)}
                        disabled={!isInvitationEnabled}
                        label={t("projects__surveys_details_participants_link")}
                      />
                    ) : (
                      <ReadonlyActionField
                        renderValue={() => (
                          <Text customStyles={Flex.row} size={TextSize.Medium}>
                            <Icon name={IconName.Student} customStyles={styles.actionFieldIcon} />
                            {t("projects__surveys_details_participants_value", {count: survey.invitationsCount})}
                          </Text>
                        )}
                        buttonLabel={t("invite_button")}
                        customStyles={styles.participationWrapper}
                        onClick={toggleInviteAttendeesModal}
                        disabled={!isInvitationEnabled}
                        label={t("projects__surveys_details_participants_label")}
                      />
                    )}

                    <ReadonlyActionField
                      renderValue={() => (
                        <Text customStyles={styles.actionFieldProject} size={TextSize.Medium}>
                          <span>{projectOption.map(project => project.name).orNull()}</span>
                        </Text>
                      )}
                      buttonLabel={t("show_button")}
                      customStyles={styles.participationWrapper}
                      onClick={navigateToProjectDetail}
                      label={t("projects__surveys_details_project_label")}
                    />
                  </div>
                  <div css={styles.cardWrapperParent}>
                    <div css={styles.cardWrapper}>
                      <SurveyDetailSettings
                        isEditable={isEditable}
                        survey={survey}
                        t={t}
                        customStyles={styles.detailSettingsCard}
                        navigateToSurveyUpdate={navigateToSurveyUpdate}
                      />
                      <SurveyDetailDataDownload survey={survey} />
                      <div css={styles.surveyProgressWrapper}>
                        <SurveyProgress
                          navigateToProjectDashboard={navigateToDashboard}
                          navigateToRatingOverview={navigateToRatingOverview}
                          navigateToReportingOverview={navigateToReportingOverview}
                          survey={survey}
                          raters={raters}
                          surveyResultsOverview={surveyResultsOverviewOption}
                          isRatingFinalized={isRatingFinalized}
                          completedParticipantsCount={completedParticipantsCount}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {inviteAttendeesModalVisible && (
                <InviteSurveyAttendeesModalContainer
                  onDismiss={toggleInviteAttendeesModal}
                  projectId={survey.projectId}
                  surveyId={survey.id}
                />
              )}
            </>
          )
        })
        .orNull()}
    </Content>
  )
}
