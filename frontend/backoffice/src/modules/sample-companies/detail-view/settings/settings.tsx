import * as React from "react"
import {CardFooter, CardFooterItem, Heading, OverviewCard} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {SampleCompany} from "shared/models"
import {CustomStyle, fontColor, FontWeight, primaryColor} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {isDefined, Option} from "shared/utils"
import {useSettings} from "./hooks/use-settings"
import {settingsStyle as styles} from "./settings.style"

export interface SettingsProps extends CustomStyle {
  readonly sampleCompany: Option<SampleCompany>
  readonly isSelectedForScenario: boolean
  readonly scenarioId?: UUID
}

export const Settings: React.FC<SettingsProps> = ({customStyles, sampleCompany, isSelectedForScenario, scenarioId}) => {
  const {t} = useLucaTranslation()
  const {navigateToDocuments, navigateToDomainSignature, navigateToErp} = useSettings({sampleCompany, scenarioId})
  const isPublished = sampleCompany.exists(sampleCompany => isDefined(sampleCompany.publishedAt))

  const renderCardFooterItem = (isPublished: boolean) =>
    isSelectedForScenario ? (
      <Heading level={HeadingLevel.h3} customStyles={styles.cardFooterItemLabel} fontWeight={FontWeight.Bold}>
        {t("sample_companies__detail_settings_scenario_label")}
      </Heading>
    ) : (
      <CardFooterItem
        icon={isPublished ? IconName.LockClosed : IconName.EditBordered}
        iconColor={isPublished ? fontColor : primaryColor}
      />
    )

  return sampleCompany
    .map(sampleCompany => (
      <div css={[styles.cards, customStyles]}>
        <OverviewCard
          data-testid="overview-card"
          onClick={navigateToDocuments}
          customStyles={[sampleCompany.filesCount && styles.cardHighlighted]}
          headerText={t("sample_companies__detail_settings_company_files")}
          text={t("sample_companies__detail_settings_company_files_desc")}
          footer={
            <CardFooter customStyles={styles.cardFooter}>
              <CardFooterItem
                customStyles={styles.cardFooterItem}
                icon={IconName.File}
                text={`${sampleCompany.filesCount ?? 0} ${t("sample_companies__detail_settings_files")}`}
              />
              {renderCardFooterItem(isPublished)}
            </CardFooter>
          }
        />
        <OverviewCard
          onClick={navigateToErp}
          customStyles={sampleCompany.erpRowsCount > 0 ? styles.cardHighlighted : undefined}
          text={t("sample_companies__detail_settings_erp_desc")}
          headerText={t("sample_companies__detail_settings_erp")}
          footer={
            <CardFooter customStyles={styles.cardFooter}>
              <CardFooterItem
                customStyles={styles.cardFooterItem}
                icon={IconName.DataSet}
                text={`${sampleCompany.erpRowsCount} ${t("sample_companies__detail_settings_rows_count")}`}
              />
              {renderCardFooterItem(isPublished)}
            </CardFooter>
          }
        />
        <OverviewCard
          onClick={navigateToDomainSignature}
          customStyles={[(sampleCompany.emailSignature || sampleCompany.domain) && styles.cardHighlighted]}
          text={t("sample_companies__detail_settings_email_signature_desc")}
          headerText={t("sample_companies__detail_settings_email_signature")}
          footer={
            <CardFooter customStyles={styles.cardFooter}>
              <CardFooterItem
                customStyles={styles.cardFooterItem}
                icon={IconName.AlignmentLeft}
                text={t(
                  sampleCompany.emailSignature
                    ? "sample_companies__detail_settings_email_signature_available"
                    : "sample_companies__detail_settings_email_signature_unavailable"
                )}
              />
              <CardFooterItem
                customStyles={styles.cardFooterItem}
                icon={IconName.EmailAt}
                text={t(
                  sampleCompany.domain
                    ? "sample_companies__detail_settings_email_domain_available"
                    : "sample_companies__detail_settings_email_domain_unavailable"
                )}
              />
              <CardFooterItem />
            </CardFooter>
          }
        />
      </div>
    ))
    .orNull()
}
