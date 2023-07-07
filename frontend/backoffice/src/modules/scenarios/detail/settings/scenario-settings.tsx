import * as React from "react"
import {CardHeader, DetailViewCard} from "shared/components"
import {Scenario} from "shared/models"
import {cardDecorativeBorder, CustomStyle} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SettingsFooter} from "../settings-footer/settings-footer"
import {CodingModelsCard} from "./cards/coding-model-card"
import {EmailsCard} from "./cards/emails-card"
import {EventsCard} from "./cards/events-card"
import {FilesAndFolderCard} from "./cards/files-and-folder-card"
import {InterventionsCard} from "./cards/interventions-card"
import {ReferenceBooksCard} from "./cards/reference-books-card"
import {SampleCompanyCard} from "./cards/sample-company-card"
import {settingStyles as styles} from "./scenario-settings.style"

export interface SettingsElementCount {
  readonly codingDimensions: number
  readonly directories: number
  readonly emails: number
  readonly events: number
  readonly files: number
  readonly filesSampleCompany: number
  readonly interventions: number
  readonly scenarioReferenceBooks: number
  readonly erpRowCount: number
}

export interface ScenarioSettingsProps extends CustomStyle {
  readonly isReadOnly: boolean
  readonly navigateToCodingModels: () => void
  readonly navigateToEmails: () => void
  readonly navigateToEvents: () => void
  readonly navigateToFilesAndDirectories: () => void
  readonly navigateToInterventions: () => void
  readonly navigateToReferenceBookChapters: () => void
  readonly navigateToSampleCompaniesSelection: () => void
  readonly scenario: Scenario
  readonly settingsCount: SettingsElementCount
}

export const ScenarioSettings: React.FC<ScenarioSettingsProps> = ({
  customStyles,
  isReadOnly,
  navigateToEmails,
  navigateToFilesAndDirectories,
  navigateToReferenceBookChapters,
  navigateToSampleCompaniesSelection,
  navigateToCodingModels,
  navigateToEvents,
  navigateToInterventions,
  settingsCount,
  scenario
}) => {
  const {t} = useLucaTranslation()

  const content = (
    <div css={styles.cards}>
      <SampleCompanyCard
        isAssigned={!!scenario.sampleCompanyId}
        isFinalized={isReadOnly}
        filesCount={settingsCount.filesSampleCompany}
        navigateToSampleCompaniesSelection={navigateToSampleCompaniesSelection}
      />
      <EmailsCard isFinalized={isReadOnly} navigateToEmails={navigateToEmails} emailsCount={settingsCount.emails} />
      <FilesAndFolderCard
        isFinalized={isReadOnly}
        navigateToFilesAndDirectories={navigateToFilesAndDirectories}
        filesCount={settingsCount.files}
        directoriesCount={settingsCount.directories}
      />
      <ReferenceBooksCard
        isFinalized={isReadOnly}
        bookCount={settingsCount.scenarioReferenceBooks}
        navigateToReferenceBookChapters={navigateToReferenceBookChapters}
      />
      <InterventionsCard
        interventionsCount={settingsCount.interventions}
        navigateToInterventions={navigateToInterventions}
        isReadOnly={isReadOnly}
      />
      <CodingModelsCard
        scenarioHasCodingModel={scenario.codingModel !== null}
        dimensionsCount={settingsCount.codingDimensions}
        navigateToCodingModels={navigateToCodingModels}
        isFinalized={isReadOnly}
      />
      <EventsCard isFinalized={isReadOnly} eventsCount={settingsCount.events} navigateToEvents={navigateToEvents} />
    </div>
  )

  return (
    <DetailViewCard
      customStyles={[styles.settings, customStyles]}
      label={`${t("scenario_details__settings_label")}`}
      content={content}
      customContentStyles={styles.content}
      cardHeader={<CardHeader hasShadow={true} hasGreyBackground={true} customStyles={cardDecorativeBorder} />}
      footer={<SettingsFooter settingsCount={settingsCount} isPreviewDisabled={isReadOnly} />}
    />
  )
}
