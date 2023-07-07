import {css} from "@emotion/react"
import {isBefore} from "date-fns"
import * as React from "react"
import {Controller, UseFormMethods} from "react-hook-form"
import {
  Card,
  CardContent,
  CardHeader,
  DateRangePicker,
  Heading,
  Icon,
  Paper,
  RadioButton,
  Text
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {
  backgroundColorBright,
  errorColor,
  FontWeight,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  successColor
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {isDefined} from "shared/utils"
import {SurveyForm} from "../../../models"
import {createSurveyStyles} from "../../survey-form-modal.style"

export interface SurveyPeriodSelectionProps {
  readonly formMethods: UseFormMethods<SurveyForm>
}

export const SurveyPeriodSelection: React.FC<SurveyPeriodSelectionProps> = ({formMethods}) => {
  const {t} = useLucaTranslation()
  const {errors, control} = formMethods

  return (
    <div css={[styles.container, styles.contentWrapper]}>
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("projects__surveys_progress_section_label")}
      </Heading>
      <Controller
        control={control}
        name={"isAutomaticStartEnabled"}
        render={({onChange: isAutomaticStartEnabledOnChange, value: isAutomaticStartEnabledValue}) => {
          const isAutomaticStartEnabled = isAutomaticStartEnabledValue === true
          return (
            <div css={styles.inputWrapper}>
              <Card
                isSelected={isAutomaticStartEnabled}
                onClick={() => isAutomaticStartEnabledOnChange(true)}
                hasShadow={true}>
                <CardHeader customStyles={[createSurveyStyles.cardHeader, styles.periodSelectionCardHeader]}>
                  <div>
                    <RadioButton
                      labelLevel={HeadingLevel.h3}
                      selected={isAutomaticStartEnabled}
                      label={t("projects__surveys_progress_automatic_label")}
                    />
                    <Text customStyles={[createSurveyStyles.progressHint, styles.periodSelectionProgressHint]}>
                      {t("projects__surveys_progress_automatic_hint")}
                    </Text>
                  </div>
                  {isAutomaticStartEnabled && <Icon name={IconName.Check} color={successColor} />}
                </CardHeader>
                <CardContent customStyles={createSurveyStyles.cardContent} disabled={!isAutomaticStartEnabled}>
                  <Controller
                    control={control}
                    name="dateRange"
                    render={({onChange: dateRangeOnChange, value: dateRangeValue}) => (
                      <DateRangePicker
                        label={t("projects__survey_overlay_timerange_label")}
                        value={dateRangeValue}
                        required={true}
                        minDate={new Date()}
                        onChange={dateRangeOnChange}
                        customStyles={styles.datePicker(!!errors.dateRange)}
                        name="dateRange"
                      />
                    )}
                    rules={{
                      required: true,
                      validate: (range: Date[]) => range.filter(isDefined).length === 2 && isBefore(range[0], range[1])
                    }}
                  />
                  <div css={styles.contentWrapper}>
                    <Heading level={HeadingLevel.h3} customStyles={styles.triggerLabel}>
                      {t("projects__surveys_trigger_asynchronous_label")}
                    </Heading>
                    <Text>{t("projects__surveys_trigger_asynchronous_hint")}</Text>
                  </div>
                </CardContent>
              </Card>

              <Card
                isSelected={!isAutomaticStartEnabled}
                onClick={() => isAutomaticStartEnabledOnChange(false)}
                hasShadow={true}>
                <CardHeader customStyles={[createSurveyStyles.cardHeader, styles.periodSelectionCardHeader]}>
                  <div>
                    <RadioButton
                      labelLevel={HeadingLevel.h3}
                      selected={!isAutomaticStartEnabled}
                      label={t("projects__surveys_progress_manual_label")}
                    />
                    <Text customStyles={[createSurveyStyles.progressHint, styles.periodSelectionProgressHint]}>
                      {t("projects__surveys_progress_manual_hint")}
                    </Text>
                  </div>
                  {!isAutomaticStartEnabled && <Icon name={IconName.Check} color={successColor} />}
                </CardHeader>
                <CardContent customStyles={createSurveyStyles.cardContent} disabled={isAutomaticStartEnabled}>
                  <Controller
                    control={control}
                    name={"isManualAsynchronous"}
                    render={({onChange: isManualAsynchronousOnChange, value: isManualAsynchronousValue}) => {
                      const isManualAsynchronous = isManualAsynchronousValue === true
                      return (
                        <div css={styles.manualSelectionWrapper}>
                          <Paper customStyles={styles.contentWrapper}>
                            <RadioButton
                              labelLevel={HeadingLevel.h3}
                              selected={isManualAsynchronous}
                              onChange={() => isManualAsynchronousOnChange(true)}
                              label={t("projects__surveys_progress_manual_asynchronous_label")}
                            />
                            <Text>{t("projects__surveys_progress_manual_asynchronous_hint")}</Text>
                          </Paper>
                          <Paper customStyles={styles.contentWrapper}>
                            <RadioButton
                              labelLevel={HeadingLevel.h3}
                              selected={!isManualAsynchronous}
                              onChange={() => isManualAsynchronousOnChange(false)}
                              label={t("projects__surveys_progress_manual_synchronous_label")}
                            />
                            <Text>{t("projects__surveys_progress_manual_synchronous_hint")}</Text>
                          </Paper>
                        </div>
                      )
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }}
      />
    </div>
  )
}

const Size = {
  progressHint: 36
}

const styles = {
  container: css({
    marginTop: spacingMedium
  }),
  contentWrapper: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  inputWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: spacingMedium
  }),
  periodSelectionCardHeader: css({
    height: "initial",
    marginBottom: spacingTiny
  }),
  periodSelectionProgressHint: css({
    minHeight: Size.progressHint
  }),
  triggerLabel: css({
    marginTop: spacingMedium,
    marginBottom: spacingTiny
  }),
  datePicker: (hasError: boolean) =>
    css({
      marginBottom: spacingMedium,
      ".react-daterange-picker": {
        width: "100%"
      },
      ".react-daterange-picker__wrapper": css({
        boxSizing: "border-box",
        border: `1px solid ${hasError ? errorColor : backgroundColorBright}`
      })
    }),
  manualSelectionWrapper: css({
    display: "grid",
    gridTemplateRows: "repeat(2, minmax(min-content, max-content))",
    gridRowGap: spacingSmall
  })
}
