import * as React from "react"
import {Icon, ReadonlyActionField, SettingsFooterCard} from "shared/components"
import {IconName} from "shared/enums"
import {CustomStyle, Flex, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes} from "shared/utils"
import {EventDelayModal} from "./event-delay-modal/event-delay-modal"
import {useQuestionDetailBodyFooter} from "./hooks/use-question-detail-body-footer"
import {emailBodyFooterStyle as styles} from "./question-detail-body-footer.style"

export interface QuestionDetailBodyFooterProps {
  readonly scenarioId: UUID
  readonly questionnaireId: UUID
  readonly disabled?: boolean
}

export const QuestionDetailBodyFooter: React.FC<QuestionDetailBodyFooterProps & CustomStyle> = ({
  customStyles,
  questionnaireId,
  scenarioId,
  disabled = false
}) => {
  const {
    displayEventDelayModal,
    setDisplayEventDelayModal,
    loading,
    activationDelaySeconds,
    onUpdateDelay,
    maxScenarioDuration,
    existingDurations
  } = useQuestionDetailBodyFooter(questionnaireId, scenarioId)
  const {t} = useLucaTranslation()

  return (
    <div css={[Flex.column, styles.content, customStyles]}>
      <div css={styles.label}>{`${t("email__additional_settings")}:`}</div>
      <div css={[styles.cards, styles.cardsGrid]}>
        <SettingsFooterCard customStyles={styles.settingsFooterCard} label={t("events__delay_settings_title")}>
          <ReadonlyActionField
            buttonLabel={t("select")}
            customStyles={styles.intervention}
            disabled={disabled || loading}
            onClick={() => setDisplayEventDelayModal(true)}
            renderValue={() => (
              <div css={styles.interventionPlaceholder}>
                <Icon name={IconName.Clock} customStyles={{marginRight: spacingSmall}} />
                {t("events__intervention_delay_title", {
                  delay: convertSecondsToMinutes(activationDelaySeconds)
                })}
              </div>
            )}
          />
        </SettingsFooterCard>
        {displayEventDelayModal && (
          <EventDelayModal
            onDismiss={() => setDisplayEventDelayModal(false)}
            onSubmit={onUpdateDelay}
            delayInSeconds={activationDelaySeconds}
            maxScenarioDuration={maxScenarioDuration}
            existingDurations={existingDurations}
          />
        )}
      </div>
    </div>
  )
}
