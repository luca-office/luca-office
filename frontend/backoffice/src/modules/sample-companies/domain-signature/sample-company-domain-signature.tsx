import * as React from "react"
import {
  Content,
  DetailViewHeader,
  HeaderContentContainer,
  Icon,
  LoadingIndicator,
  ReadonlyActionField,
  Text
} from "shared/components"
import {IconName} from "shared/enums"
import {SampleCompanyUpdate} from "shared/graphql/generated/globalTypes"
import {Flex, fontColorLight, textEllipsis, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {
  InformationEntry,
  InlineEditableTextareaContainer,
  OverlayEditField,
  OverlayEditFieldType
} from "../../../components"
import {NavigationButtonConfig} from "../../../utils"
import {CompanyDomainModal} from "./company-domain-modal/company-domain-modal"
import {useSampleCompanyDomainSignature} from "./hooks/use-sample-company-domain-signature"
import {SampleCompanyDomainSignatureStyles as styles} from "./sample-company-domain-signature.style"

export interface SampleCompanyDomainSignatureProps {
  readonly sampleCompanyId: UUID
  readonly disabled?: boolean
  readonly navigationButtonConfig?: NavigationButtonConfig
}

export const SampleCompanyDomainSignature: React.FC<SampleCompanyDomainSignatureProps> = ({
  sampleCompanyId,
  disabled = false,
  navigationButtonConfig
}) => {
  const {t} = useLucaTranslation()

  const {
    dataLoading,
    sampleCompany,
    isPublished,
    handleUpdateSampleCompany,
    navigateToSampleCompany,
    isDomainOverlayVisible,
    setDomainOverlayVisible
  } = useSampleCompanyDomainSignature(sampleCompanyId, navigationButtonConfig)

  const emailSignature = sampleCompany.map(comp => comp.emailSignature).orUndefined()
  const domain = sampleCompany.map(comp => comp.domain).orUndefined()

  const header = (
    <DetailViewHeader
      labelKey={"sample_companies__detail_settings_email_signature"}
      navigationButtonConfig={{
        labelKey: navigationButtonConfig?.labelKey ?? "sample_companies__filter_title",
        onClick: navigateToSampleCompany
      }}
    />
  )

  const companyDescription = (
    <OverlayEditField<SampleCompanyUpdate>
      customStyles={styles.fullHeight}
      customWrapperStyles={styles.fullHeight}
      customModalStyles={styles.modal}
      formFields={[
        {
          labelKey: "sample_companies__detail_settings_email_signature_input",
          type: OverlayEditFieldType.TEXTAREA,
          updateId: "emailSignature",
          value: emailSignature ?? ""
        }
      ]}
      fieldLabelKey={"sample_companies__detail_settings_email_signature_input_edit"}
      dialogTitleKey={"sample_companies__detail_settings_email_signature_input_edit"}
      onUpdate={handleUpdateSampleCompany}
      updateLoading={dataLoading}
      disabled={isPublished || disabled}
      renderValue={() => (
        <InlineEditableTextareaContainer
          text={emailSignature ?? ""}
          placeholder={t("sample_companies__detail_settings_email_signature_input_placeholder")}
          readOnly={true}
          disabled={isPublished || disabled}
        />
      )}
      displayPlain={true}
    />
  )

  const signatureContainer = (
    <HeaderContentContainer
      headerTitleKey={"sample_companies__detail_settings_email_signature_title"}
      headerIconName={IconName.AlignmentLeft}
      onConfirm={() => handleUpdateSampleCompany({emailSignature: ""})}
      buttonModalTitleKey={"sample_companies__detail_clear_modal_title"}
      buttonModalTextKey={"sample_companies__detail_clear_modal_text"}
      buttonModalConfirmKey={"sample_companies__detail_clear_button_confirm"}
      disabled={isPublished || !emailSignature || disabled}>
      <div css={styles.content}>
        <Text size={TextSize.Medium}>{t("sample_companies__detail_settings_email_signature_desc_detail")}</Text>
        <InformationEntry
          customStyles={styles.informationEntry}
          label={t("sample_companies__detail_settings_email_signature_input")}
          iconName={isPublished || disabled ? IconName.LockClosed : IconName.EditPencil}>
          {companyDescription}
        </InformationEntry>
      </div>
    </HeaderContentContainer>
  )

  const domainContainer = (
    <HeaderContentContainer
      headerTitleKey={"sample_companies__detail_settings_email_domain_title"}
      headerIconName={IconName.EmailAt}
      onConfirm={() => handleUpdateSampleCompany({domain: ""})}
      buttonModalTitleKey={"sample_companies__detail_clear_modal_title"}
      buttonModalTextKey={"sample_companies__detail_clear_modal_text"}
      buttonModalConfirmKey={"sample_companies__detail_clear_button_confirm"}
      disabled={isPublished || !domain || disabled}>
      <div css={styles.content}>
        <Text size={TextSize.Medium}>{t("sample_companies__detail_settings_email_domain_desc_detail")}</Text>
        <div css={[styles.informationEntry, styles.domainControllers]}>
          <ReadonlyActionField
            label={t("sample_companies__detail_settings_email_domain_title")}
            labelIconName={isPublished || disabled ? IconName.LockClosed : IconName.EditPencil}
            buttonLabel={t("email__reception_delay_button_edit")}
            onClick={() => setDomainOverlayVisible(true)}
            disabled={isPublished || disabled}
            renderValue={() => (
              <div css={Flex.row}>
                <div css={[textEllipsis, styles.label, !domain && styles.placeholderText]}>
                  {domain ? domain : t("sample_companies__detail_settings_email_signature_input_placeholder_example")}
                </div>
              </div>
            )}
          />

          <Icon color={fontColorLight} customStyles={styles.arrowIcon} name={IconName.ArrowLeft} />

          <ReadonlyActionField
            label={t("sample_companies__detail_settings_email_domain_generated")}
            disabled={true}
            renderValue={() => (
              <div css={Flex.row}>
                <div css={[textEllipsis, styles.label, styles.placeholderText]}>
                  {domain
                    ? t("sample_companies__detail_settings_email_domain_generated_filled", {domain})
                    : t("sample_companies__detail_settings_email_domain_generated_example")}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </HeaderContentContainer>
  )

  return (
    <div css={styles.container}>
      {dataLoading ? (
        <div css={styles.placeholderGeneral}>
          <LoadingIndicator />
        </div>
      ) : (
        <Content customContentContainerStyles={styles.contentContainer} loading={dataLoading} subHeader={header}>
          {signatureContainer}
          {domainContainer}
        </Content>
      )}
      {isDomainOverlayVisible && (
        <CompanyDomainModal
          domain={domain ?? undefined}
          onConfirm={domain => handleUpdateSampleCompany({domain})}
          onDismiss={() => setDomainOverlayVisible(false)}
        />
      )}
    </div>
  )
}
