import {css} from "@emotion/react"
import pick from "lodash-es/pick"
import * as React from "react"
import {OverviewCard, Text} from "shared/components"
import {IconName} from "shared/enums"
import {ScenarioUpdate} from "shared/graphql/generated/globalTypes"
import {useUpdateScenario} from "shared/graphql/hooks"
import {Scenario} from "shared/models"
import {fontColor, spacing, spacingCard, spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {emailRegexPattern} from "shared/utils"
import {EmailBodyMetaEntry, OverlayEditFieldType} from "../../../../../../../components"
import {ScenarioUpdateKeys} from "../../../../../../../enums"
import {MetaEntryOverlayConfig} from "../../../../../../../models"

export interface EmailBodyFooterCompletionCardProps {
  readonly scenario: Scenario
  readonly disabled?: boolean
}

export const EmailBodyFooterCompletionCard: React.FC<EmailBodyFooterCompletionCardProps> = ({disabled, scenario}) => {
  const {t} = useLucaTranslation()

  const {updateScenario, isUpdateScenarioLoading} = useUpdateScenario()

  const handleScenarioUpdate = ({completionEmailAddress}: Pick<ScenarioUpdate, "completionEmailAddress">) =>
    updateScenario(scenario.id, {
      ...pick(scenario, [
        "date",
        "name",
        "description",
        "maxDurationInSeconds",
        "introductionEmailId",
        "shouldDisplayTime",
        "shouldHideReferenceBookChapters",
        "tags",
        "sampleCompanyId"
      ]),
      completionEmailAddress
    })

  const emailAddressConfig: MetaEntryOverlayConfig<Pick<ScenarioUpdate, ScenarioUpdateKeys.CompletionEmailAddress>> = {
    dialogTitleKey: "email__completion_receiver_edit",
    onConfirm: handleScenarioUpdate,
    updateLoading: isUpdateScenarioLoading,
    formFields: [
      {
        labelKey: "email__completion_email_setting",
        value: scenario.completionEmailAddress || "",
        updateId: ScenarioUpdateKeys.CompletionEmailAddress,
        type: OverlayEditFieldType.EMAIL,
        validationRules: {
          required: true,
          pattern: {
            value: emailRegexPattern,
            message: 't("validation__email_format")'
          }
        },
        placeholderKey: "email__completion_email_setting"
      }
    ]
  }

  return (
    <OverviewCard
      customStyles={styles.card}
      content={
        <React.Fragment>
          <Text customStyles={styles.description}>{t("email__completion_email_text")}</Text>
          <div css={styles.metaEntryWrapper}>
            <EmailBodyMetaEntry
              customStyles={styles.inputContainer}
              label={scenario.completionEmailAddress || t("email__unavailable")}
              isPlaceholder={!scenario.completionEmailAddress}
              icon={IconName.Email}
              overlayConfig={emailAddressConfig}
              disabled={disabled}
            />
          </div>
        </React.Fragment>
      }
    />
  )
}

const styles = {
  inputContainer: css({
    paddingTop: spacingCard,
    flexGrow: 1,
    justifyContent: "space-between"
  }),
  card: css({
    minHeight: 0,
    cursor: "default",
    color: fontColor,
    height: "initial",
    padding: spacing(spacingSmall, spacingMedium, spacingMedium, spacingMedium),

    "&:hover": {
      transform: "none"
    }
  }),
  description: css({
    marginBottom: spacingSmall
  }),
  metaEntryWrapper: css({
    ".overlay-edit-field > div:first-of-type": {
      height: "initial",
      minHeight: "auto"
    }
  })
}
