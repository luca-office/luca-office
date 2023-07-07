import * as React from "react"
import {CardContent, Column, Columns, Icon, Label, ReadonlyActionField, Text} from "shared/components"
import {IconName} from "shared/enums"
import {ProjectUpdate, ScenarioUpdate} from "shared/graphql/generated/globalTypes"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes, formatDate} from "shared/utils"
import {
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  MetaEntryTags,
  OverlayEditCompositeFieldConfig,
  OverlayEditField,
  OverlayEditFieldType
} from "../../../../components"
import {EditDurationModalContainer} from "../../../../components/edit-duration-modal/edit-duration-modal-container"
import {InviteScenarioContributorsModalContainer} from "../invite-contributors/scenario-invite-contributors-container"
import {EditScenarioDateModalContainer} from "./edit-date-modal/edit-date-modal-container"
import {informationStyles as styles} from "./information.style"
import {InformationContainerProps} from "./information-container"
import {MetaContributors} from "./meta-entries/meta-contributors"
import {MetaEmail} from "./meta-entries/meta-email"

export interface InformationProps extends InformationContainerProps {
  readonly toggleIsEditDateModalVisible: () => void
  readonly toggleIsEditDurationModalVisible: () => void
  readonly toggleIsInviteContributorsModalVisible: () => void
  readonly isInviteContributorsModalVisible: boolean
  readonly isEditDateModalVisible: boolean
  readonly isEditDurationModalVisible: boolean
}

export const Information: React.FC<InformationProps> = ({
  scenario,
  updateInProgress,
  isFinalizeScenarioLoading,
  isPublishScenarioLoading,
  isInviteContributorsModalVisible,
  isEditDateModalVisible,
  isEditDurationModalVisible,
  duplicateScenarioLoading,
  scenarioContributorsCount,
  updateScenario,
  readonly,
  toggleIsInviteContributorsModalVisible,
  toggleIsEditDateModalVisible,
  toggleIsEditDurationModalVisible
}) => {
  const {t} = useLucaTranslation()
  const isEditable = !readonly
  const fieldIcon = !isEditable ? IconName.LockClosed : IconName.EditPencil
  const canHandleUpdate =
    isEditable &&
    !updateInProgress &&
    !isFinalizeScenarioLoading &&
    !isPublishScenarioLoading &&
    !duplicateScenarioLoading

  const descriptionField: OverlayEditCompositeFieldConfig = {
    updateId: "description",
    value: scenario.description,
    labelKey: "description",
    type: OverlayEditFieldType.TEXTAREA
  }

  const handleUpdate = (update: Partial<ScenarioUpdate>) => {
    if (!canHandleUpdate) {
      return
    }
    updateScenario(scenario.id, {
      name: update.name ? update.name : scenario.name,
      description: update.description ? update.description : scenario.description,
      tags: update.tags ? update.tags : scenario.tags,
      maxDurationInSeconds: scenario.maxDurationInSeconds,
      shouldDisplayTime: true, // this is not implemented in UI in MVP,
      shouldHideReferenceBookChapters: scenario.shouldHideReferenceBookChapters,
      introductionEmailId: scenario.introductionEmailId,
      completionEmailAddress: scenario.completionEmailAddress,
      sampleCompanyId: scenario.sampleCompanyId,
      date: scenario.date
    })
  }

  return (
    <React.Fragment>
      <CardContent>
        <Columns customStyles={styles.titleAndTime}>
          <Column flexGrow={3}>
            <Label label={t("title")} icon={fieldIcon} />
            <InlineEditableHeaderContainer
              onConfirm={name => handleUpdate({name})}
              text={scenario.name}
              customStyles={styles.detailHeaderName}
              disabled={!isEditable}
            />
          </Column>
          <Column>
            <ReadonlyActionField
              buttonLabel={t("edit_button")}
              customStyles={styles.detailHeaderTime}
              onClick={isEditable ? toggleIsEditDurationModalVisible : undefined}
              label={t("projects__detail_time_label")}
              disabled={!isEditable}
              renderValue={() => (
                <Text size={TextSize.Medium} customStyles={styles.noTime}>
                  <Icon name={IconName.Clock} customStyles={styles.noTimeIcon} />
                  {scenario.maxDurationInSeconds === null
                    ? t("placeholder__no_entry")
                    : `${convertSecondsToMinutes(scenario.maxDurationInSeconds)} ${t("unit__minutes_short")}`}
                </Text>
              )}
            />
          </Column>
        </Columns>

        <React.Fragment>
          <Column customStyles={styles.descriptionColumn}>
            <Label label={t("description")} icon={fieldIcon} />
            <OverlayEditField<ProjectUpdate>
              formFields={[descriptionField]}
              fieldLabelKey={"description"}
              dialogTitleKey={"scenario__overlay_update_description"}
              onUpdate={handleUpdate}
              updateLoading={
                updateInProgress || isFinalizeScenarioLoading || isPublishScenarioLoading || duplicateScenarioLoading
              }
              disabled={!isEditable}
              renderValue={() => (
                <InlineEditableTextareaContainer text={scenario.description} readOnly={true} disabled={!isEditable} />
              )}
              displayPlain={true}
              customStyles={styles.description}
            />
          </Column>
          <div css={[Flex.column, styles.metadataWrapper]}>
            <MetaEntryTags
              tags={scenario.tags}
              updateLoading={updateInProgress}
              handleUpdate={tags => handleUpdate({tags})}
              disabled={!isEditable}
            />

            <Columns customStyles={styles.metadataRowMarginTop}>
              <Column>
                <MetaEmail isEditable={isEditable} scenario={scenario} />
              </Column>
              <Column>
                <ReadonlyActionField
                  label={t("scenario_details__date")}
                  buttonLabel={isEditable ? t("edit_button") : undefined}
                  onClick={isEditable ? toggleIsEditDateModalVisible : undefined}
                  renderValue={() => (
                    <div css={Flex.row}>
                      <Icon name={IconName.Calendar} />
                      <Text customStyles={styles.smallPaddingLeft} size={TextSize.Medium}>
                        {scenario.date !== null
                          ? `${formatDate(new Date(scenario.date))} (${t("scenario_details__fictive_date")})`
                          : `${t("scenario_details__actual_date")}`}
                      </Text>
                    </div>
                  )}
                />
              </Column>
              <Column customStyles={styles.smallPaddingLeft}>
                <MetaContributors
                  disabled={!isEditable}
                  onClick={toggleIsInviteContributorsModalVisible}
                  scenarioContributorsCount={scenarioContributorsCount}
                />
              </Column>
            </Columns>
          </div>
        </React.Fragment>
      </CardContent>
      {isInviteContributorsModalVisible && (
        <InviteScenarioContributorsModalContainer
          scenarioId={scenario.id}
          onDismiss={toggleIsInviteContributorsModalVisible}
        />
      )}
      {isEditDateModalVisible && (
        <EditScenarioDateModalContainer
          scenario={scenario}
          onConfirm={toggleIsEditDateModalVisible}
          onDismiss={toggleIsEditDateModalVisible}
        />
      )}
      {isEditDurationModalVisible && (
        <EditDurationModalContainer
          onDismiss={toggleIsEditDurationModalVisible}
          onConfirm={toggleIsEditDurationModalVisible}
          scenarioId={scenario.id}
          scenarioDurationInSeconds={scenario.maxDurationInSeconds ?? 0}
        />
      )}
    </React.Fragment>
  )
}
