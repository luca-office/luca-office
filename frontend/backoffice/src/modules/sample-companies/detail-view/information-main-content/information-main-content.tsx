import * as React from "react"
import {IconName} from "shared/enums"
import {SampleCompanyCreation, SampleCompanyUpdate} from "shared/graphql/generated/globalTypes"
import {SampleCompany} from "shared/models"
import {Flex, spacingHuge} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {
  InformationEntry,
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  MetaEntryTags,
  OverlayEditField,
  OverlayEditFieldType
} from "../../../../components"
import {informationMainContentStyle as styles} from "./information-main-content.style"

export interface InformationMainContentProps {
  readonly updateSampleCompany: (update: Partial<SampleCompanyUpdate>) => Promise<Option<SampleCompany>>
  readonly updateLoading: boolean
  readonly sampleCompanyOption: Option<SampleCompany>
  readonly isFinalized: boolean
  readonly isSelectedForScenario: boolean
  readonly disabled?: boolean
}

export const InformationMainContent: React.FC<InformationMainContentProps> = ({
  updateSampleCompany,
  sampleCompanyOption,
  updateLoading,
  isFinalized,
  isSelectedForScenario,
  disabled = false
}) => {
  const {t} = useLucaTranslation()

  const handleCreationNameUpdate = (name: string) => updateSampleCompany({name})
  const handleCreationDescriptionUpdate = (description: string) => updateSampleCompany({description})

  const companyDescription = (
    <OverlayEditField<SampleCompanyCreation>
      formFields={[
        {
          type: OverlayEditFieldType.TEXTAREA,
          updateId: "description",
          value: sampleCompanyOption.map(sampleCompany => sampleCompany.description).getOrElse("")
        }
      ]}
      fieldLabelKey={"description"}
      dialogTitleKey={"reference_books__edit_description"}
      onUpdate={update => handleCreationDescriptionUpdate(update.description)}
      updateLoading={updateLoading}
      disabled={isFinalized || disabled}
      renderValue={() => (
        <InlineEditableTextareaContainer
          text={sampleCompanyOption.map(sampleCompany => sampleCompany.description).getOrElse("")}
          placeholder={t("sample_companies__create_sample_company_description_placeholder")}
          readOnly={true}
          disabled={isFinalized || disabled}
        />
      )}
      displayPlain={true}
      customStyles={styles.description}
    />
  )

  return (
    <div css={styles.grid}>
      <div css={styles.content}>
        <InformationEntry
          label={t("sample_companies__detail_general_information_company_name")}
          iconName={
            !isSelectedForScenario ? (isFinalized || disabled ? IconName.LockClosed : IconName.EditPencil) : undefined
          }
          customStyles={{marginBottom: spacingHuge}}>
          <InlineEditableHeaderContainer
            customStyles={styles.companyNameLabel}
            onConfirm={handleCreationNameUpdate}
            disabled={isFinalized || disabled}
            text={sampleCompanyOption.map(sampleCompany => sampleCompany.name).getOrElse("")}
          />
        </InformationEntry>
        <InformationEntry
          label={t("sample_companies__detail_general_information_company_description")}
          iconName={
            !isSelectedForScenario ? (isFinalized || disabled ? IconName.LockClosed : IconName.EditPencil) : undefined
          }
          customStyles={styles.marginTopMedium}>
          {companyDescription}
        </InformationEntry>
      </div>
      <div css={[Flex.row, styles.marginTopLarge, styles.metaContent]}>
        <MetaEntryTags
          customStyles={styles.metaContentTags}
          disabled={isFinalized || disabled}
          tags={sampleCompanyOption.map(sampleCompany => sampleCompany.tags).getOrElse([])}
          updateLoading={updateLoading}
          handleUpdate={tags => updateSampleCompany({tags})}
        />
      </div>
    </div>
  )
}
