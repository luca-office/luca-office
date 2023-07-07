import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Button, Icon, ReadonlyActionField, SettingsFooterCard, Text, Tooltip} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {CustomStyle, Flex, flex1, fontColorLight, spacingSmall, TextSize} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"

interface Props extends CustomStyle {
  readonly disabled: boolean
  readonly interventionsCount: number
  readonly navigateToIntervention?: () => void
  readonly onCreateClick: () => void
  readonly toolTipTitleKey?: LucaI18nLangKey
  readonly customTextKey?: LucaI18nLangKey
  readonly customTextStyles?: CSSInterpolation
}

export const InterventionSettingsCard: React.FC<Props> = ({
  disabled,
  interventionsCount,
  navigateToIntervention,
  onCreateClick,
  toolTipTitleKey,
  customTextKey,
  customStyles,
  customTextStyles
}) => {
  const {t} = useLucaTranslation()
  return (
    <SettingsFooterCard
      customStyles={customStyles}
      label={t("email__intervention_label")}
      customTextStyles={customTextStyles}
      text={t(customTextKey ?? "email__intervention_text")}>
      <div css={styles.interventionWrapper}>
        <ReadonlyActionField
          disabled={disabled}
          customStyles={styles.intervention}
          onClick={interventionsCount > 0 && navigateToIntervention ? navigateToIntervention : onCreateClick}
          buttonLabel={interventionsCount > 0 && navigateToIntervention ? t("show_button") : undefined}
          renderValue={() => (
            <div css={styles.interventionPlaceholder}>
              {interventionsCount > 0 ? (
                <div css={Flex.row}>
                  <Icon customStyles={styles.icon} name={IconName.Pin} />
                  <Text size={TextSize.Medium}>
                    {`${interventionsCount} ${t(
                      interventionsCount === 1
                        ? "files_and_directories__intervention_singular"
                        : "files_and_directories__intervention_plural"
                    )}`}
                  </Text>
                </div>
              ) : (
                <Text size={TextSize.Medium}>{t("email__intervention_placeholder")}</Text>
              )}
            </div>
          )}
        />
        <Tooltip title={t(toolTipTitleKey ?? "files_and_directories__disabled_tooltip")} inactive={!disabled}>
          <Button onClick={onCreateClick} disabled={disabled} variant={ButtonVariant.IconOnly} icon={IconName.Add} />
        </Tooltip>
      </div>
    </SettingsFooterCard>
  )
}

const styles = {
  icon: css({
    marginRight: spacingSmall
  }),
  interventionWrapper: css(Flex.row, {
    flex: flex1,
    justifyContent: "space-between"
  }),
  intervention: css({
    height: "initial",
    minHeight: "auto",
    flex: flex1,
    marginRight: spacingSmall
  }),
  interventionPlaceholder: css({
    color: fontColorLight
  })
}
