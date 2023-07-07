import * as React from "react"
import {
  CardFooterItem,
  Content,
  DetailViewHeader,
  HeaderContentContainer,
  HeaderFooterContainer,
  LoadingIndicator,
  Text,
  WarningTooltipConfig
} from "shared/components"
import {IconName} from "shared/enums"
import {useArchiveSampleCompany, useDeleteSampleCompany} from "shared/graphql/hooks"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString, isDefined} from "shared/utils"
import {NavigationButtonConfig} from "../../../utils"
import {useSampleCompanyDetail} from "./hooks/use-sample-company-detail"
import {SampleCompanyInformation} from "./information/sample-company-information"
import {sampleCompanyDetailViewStyles as styles} from "./sample-company-detail-view.style"
import {Settings} from "./settings/settings"

export interface SelectedForScenarioConfig {
  readonly scenarioId: string
  readonly handleRemoveAssignmentClick: () => void
  readonly isReadOnly: boolean
}

export interface SampleCompanyDetailViewProps {
  readonly sampleCompanyId: UUID
  readonly disabled?: boolean
  readonly navigationButtonConfig?: NavigationButtonConfig
  readonly hideSubHeaderOperationButton?: boolean
  readonly selectedForScenarioConfig?: SelectedForScenarioConfig
  readonly hideOperationButtons?: boolean
}

export const SampleCompanyDetailView: React.FC<SampleCompanyDetailViewProps> = ({
  sampleCompanyId,
  disabled,
  navigationButtonConfig,
  hideSubHeaderOperationButton,
  selectedForScenarioConfig,
  hideOperationButtons
}) => {
  const {t} = useLucaTranslation()
  const isSelectedForScenario = isDefined(selectedForScenarioConfig)

  const {
    dataLoading,
    duplicateSampleCompany,
    duplicateSampleCompanyLoading,
    canBePublished: canBeFinalized,
    publishSampleCompany: finalizeSampleCompany,
    publishSampleCompanyLoading: finalizeSampleCompanyLoading,
    isPublished: isFinalized,
    sampleCompany: sampleCompanyOption,
    updateSampleCompany,
    navigateToOverview,
    userMayArchive
  } = useSampleCompanyDetail(sampleCompanyId, navigationButtonConfig)

  const hasProfile = sampleCompanyOption.exists(sampleCompany => isDefined(sampleCompany.profileFileId))
  const hasLogo = sampleCompanyOption.exists(sampleCompany => isDefined(sampleCompany.logoFileId))
  const hasDescription = sampleCompanyOption.exists(sampleCompany => !!sampleCompany.description)

  const getTooltipWarningConfig = () => {
    if (canBeFinalized) {
      return undefined
    }

    const tooltipWarningConfig: WarningTooltipConfig[] = []

    if (!hasProfile) {
      tooltipWarningConfig.push({label: t("sample_companies__header_button_finalize_tooltip_missing_profile")})
    }

    if (!hasLogo) {
      tooltipWarningConfig.push({label: t("sample_companies__header_button_finalize_tooltip_missing_logo")})
    }

    if (!hasDescription) {
      tooltipWarningConfig.push({label: t("sample_companies__header_button_finalize_tooltip_missing_description")})
    }

    // eslint-disable-next-line consistent-return
    return tooltipWarningConfig
  }

  const header = (
    <DetailViewHeader
      labelKey={"sample_companies__selection_back_button"}
      navigationButtonConfig={{
        labelKey: navigationButtonConfig?.labelKey ?? "sample_companies__detail_header_navigate_back_label",
        onClick: navigateToOverview
      }}
      {...(!hideOperationButtons && {
        operationButtonConfig: !isSelectedForScenario
          ? isFinalized
            ? {
                labelKey: "sample_companies__header_duplicate_label",
                icon: IconName.Duplicate,
                disabled: (!isFinalized && !canBeFinalized) || duplicateSampleCompanyLoading,
                loading: duplicateSampleCompanyLoading,
                hide: !!hideSubHeaderOperationButton,
                onClick: duplicateSampleCompany
              }
            : {
                labelKey: "sample_companies__header_publish_label",
                icon: IconName.Publish,
                disabled: !isFinalized && !canBeFinalized,
                hide: !!hideSubHeaderOperationButton,
                loading: finalizeSampleCompanyLoading,
                onClick: () => sampleCompanyOption.forEach(sampleCompany => finalizeSampleCompany(sampleCompany.id)),
                orlyConfirmKey: "sample_companies__header_orly_publish_button",
                orlyTextKey: "sample_companies__header_orly_publish_text",
                orlyTitleKey: "sample_companies__header_orly_publish_title",
                tooltipConfig: {
                  labelKey: "sample_companies__header_button_publish_tooltip",
                  warningConfig: getTooltipWarningConfig()
                }
              }
          : undefined,
        deleteOrArchiveButtonConfig: !isSelectedForScenario
          ? {
              entityId: sampleCompanyId,
              deleteHook: !isFinalized ? useDeleteSampleCompany : undefined,
              archiveHook: isFinalized ? useArchiveSampleCompany : undefined,
              invisible: !userMayArchive && isFinalized,
              onSuccess: navigateToOverview
            }
          : undefined
      })}
    />
  )

  const footer = sampleCompanyOption
    .map(sampleCompany => (
      <div css={styles.footerContainer}>
        <div css={Flex.row}>
          <CardFooterItem icon={IconName.Calendar} text={formatDateFromString(sampleCompany.createdAt)} />
          <CardFooterItem
            customStyles={styles.author}
            icon={IconName.Profile}
            text={`${sampleCompany.author.firstName} ${sampleCompany.author.lastName}`}
          />
        </div>
        <CardFooterItem
          customStyles={styles.author}
          icon={isFinalized ? IconName.Publish : IconName.EditBordered}
          text={!isFinalized ? t("subheader__filter_by_in_progress") : t("subheader__filter_by_published")}
        />
      </div>
    ))
    .orNull()

  const companyContent = (
    <>
      <SampleCompanyInformation
        disabled={disabled}
        selectedForScenarioConfig={selectedForScenarioConfig}
        updateLoading={dataLoading}
        sampleCompany={sampleCompanyOption}
        isFinalized={isFinalized}
        updateSampleCompany={updateSampleCompany}
      />
      <div css={isSelectedForScenario && styles.selectedForScenarioSpacing}>
        <Text size={TextSize.Medium} customStyles={styles.label}>
          {t("sample_companies__detail_settings_label")}
        </Text>
        <HeaderFooterContainer
          customStyles={styles.settingsContainer}
          customContentContainerStyles={styles.settingsContent}>
          <Settings
            isSelectedForScenario={isSelectedForScenario}
            sampleCompany={sampleCompanyOption}
            scenarioId={selectedForScenarioConfig?.scenarioId}
          />
        </HeaderFooterContainer>
      </div>
    </>
  )

  const renderCompanyContent = () =>
    !isSelectedForScenario ? (
      <HeaderFooterContainer customStyles={styles.container} customContentContainerStyles={styles.headerFooterContent}>
        {companyContent}
      </HeaderFooterContainer>
    ) : (
      <HeaderContentContainer
        hasFooterBar
        customStyles={styles.container}
        customContentContainerStyles={styles.headerFooterContent}
        headerTitleKey={"sample_companies__selection_selected"}
        headerIconName={IconName.AlignmentLeft}
        onConfirm={selectedForScenarioConfig?.handleRemoveAssignmentClick}
        disabled={selectedForScenarioConfig?.isReadOnly || disabled}>
        {companyContent}
      </HeaderContentContainer>
    )

  return (
    <div>
      {dataLoading ? (
        <div css={styles.placeholderGeneral}>
          <LoadingIndicator />
        </div>
      ) : (
        <Content
          customContentContainerStyles={styles.contentContainer}
          loading={dataLoading}
          subHeader={header}
          actionBar={footer}>
          {sampleCompanyOption
            .map(renderCompanyContent)
            .getOrElse(
              <div css={[styles.placeholderGeneral, styles.placeholder]}>
                {t("sample_company_details__placeholder_not_found")}.
              </div>
            )}
        </Content>
      )}
    </div>
  )
}
