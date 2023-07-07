import * as React from "react"
import {CustomSelect, SettingsFooterCard} from "shared/components"
import {ErpType} from "shared/enums"
import {InterventionType, Relevance} from "shared/graphql/generated/globalTypes"
import {Email, EmailOpeningIntervention, ErpRowOpeningIntervention, Intervention, Scenario} from "shared/models"
import {CustomStyle, Flex} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {InterventionSettingsCard} from "../../../../../../components/intervention-setting-card/intervention-setting-card"
import {
  getGroupEntityBaseFromIntervention,
  interventionTypeToGroupType
} from "../../../../../scenario-interventions/utils"
import {routingConfigForInterventionGroupEntity} from "../../../../../scenario-interventions/utils/routing"
import {useEmailUpdate} from "../../hooks/use-email-update"
import {emailBodyFooterStyle as styles} from "./email-body-footer.style"
import {EmailBodyFooterCompletionCard} from "./email-body-footer-completion-card/email-body-footer-completion-card"
import {EmailBodyFooterInterventionPosition} from "./email-body-footer-intervention-position/email-body-footer-intervention-position"
import {useEmailBodyFooter} from "./hooks/use-email-body-footer"

export interface EmailBodyFooterProps extends CustomStyle {
  readonly associatedIntervention: Option<Intervention>
  readonly disabled?: boolean
  readonly email: Email
  readonly emailOpeningInterventions: EmailOpeningIntervention[]
  readonly isIntroductionEmail: boolean
  readonly navigateToIntervention: () => void
  readonly onCreateInterventionClick: () => void
  readonly scenario: Option<Scenario>
}

export const EmailBodyFooter: React.FC<EmailBodyFooterProps> = ({
  associatedIntervention,
  customStyles,
  disabled = false,
  email,
  emailOpeningInterventions,
  isIntroductionEmail,
  onCreateInterventionClick,
  navigateToIntervention,
  scenario
}) => {
  const {t} = useLucaTranslation()
  const {relevanceOptions, scenarioQuestionnaires} = useEmailBodyFooter(scenario.map(s => s.id).getOrElse(""))
  const {updateEmail} = useEmailUpdate(email)

  const isInterventionEmail = associatedIntervention.isDefined()

  const isErpInterventionAssociated = associatedIntervention.exists(
    intervention => intervention.interventionType === InterventionType.ErpRowOpening
  )

  const interventionCount = emailOpeningInterventions.length

  const getErpConfig = (intervention: Intervention) => {
    if (isErpInterventionAssociated) {
      const erpIntervention = intervention as ErpRowOpeningIntervention
      return {
        erpType: (erpIntervention.erpTableType as unknown) as ErpType,
        rowId: Option.of(erpIntervention.erpRowId)
      }
    } else {
      // eslint-disable-next-line consistent-return
      return undefined
    }
  }

  return (
    <div css={[Flex.column, styles.content, customStyles]}>
      <div css={styles.label}>
        {isIntroductionEmail
          ? t("email__completion_email_setting")
          : isInterventionEmail
          ? t("email__intervention_email_position_label")
          : `${t("email__additional_settings")}:`}
      </div>
      <div css={[styles.cards, !isIntroductionEmail && !isInterventionEmail && styles.cardsGrid]}>
        {isIntroductionEmail ? (
          scenario.map(s => <EmailBodyFooterCompletionCard scenario={s} disabled={disabled} />).orNull()
        ) : associatedIntervention.isDefined() ? (
          associatedIntervention
            .map(intervention => (
              <EmailBodyFooterInterventionPosition
                intervention={intervention}
                scenarioQuestionnaires={scenarioQuestionnaires}
                navigationConfig={routingConfigForInterventionGroupEntity(
                  getGroupEntityBaseFromIntervention(intervention, scenarioQuestionnaires),
                  interventionTypeToGroupType(intervention.interventionType),
                  {
                    scenarioId: scenario.map(scenario => scenario.id).getOrElse(""),
                    emailDirectory:
                      intervention.__typename === "EmailOpeningIntervention"
                        ? (intervention as EmailOpeningIntervention).email.directory
                        : undefined,
                    sampleCompanyId: isErpInterventionAssociated
                      ? (intervention as ErpRowOpeningIntervention).sampleCompanyId
                      : undefined,
                    erpConfig: getErpConfig(intervention)
                  }
                )}
              />
            ))
            .orNull()
        ) : (
          <React.Fragment>
            <SettingsFooterCard
              customStyles={styles.settingsFooterCard}
              label={t("email__relevance_label")}
              text={t("email__relevance_text")}>
              <CustomSelect
                optionList={relevanceOptions}
                customStyles={styles.dropdownWrapper}
                value={email.relevance}
                disabled={disabled}
                onChange={value => updateEmail({relevance: value as Relevance})}
              />
            </SettingsFooterCard>
            <InterventionSettingsCard
              navigateToIntervention={navigateToIntervention}
              onCreateClick={onCreateInterventionClick}
              disabled={disabled}
              interventionsCount={interventionCount}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
