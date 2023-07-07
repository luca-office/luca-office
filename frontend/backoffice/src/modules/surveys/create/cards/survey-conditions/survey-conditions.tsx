import {css} from "@emotion/react"
import * as React from "react"
import {Controller, UseFormMethods} from "react-hook-form"
import {Card, CardContent, CardHeader, Icon, Label, RadioButton, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {spacingMedium, spacingSmall, successColor} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SurveyForm} from "../../../models"
import {createSurveyStyles} from "../../survey-form-modal.style"

export interface SurveyConditionsProps {
  readonly formMethods: UseFormMethods<SurveyForm>
}

export const SurveyConditions: React.FC<SurveyConditionsProps> = ({formMethods}) => {
  const {t} = useLucaTranslation()
  const {control} = formMethods

  return (
    <React.Fragment>
      <Label label={t("projects__surveys_table_condition")} customStyles={styles.inputGroupLabel} />
      <Controller
        control={control}
        name="isOpenParticipationEnabled"
        render={({onChange, value}) => {
          const isOpen = value === true
          return (
            <div css={styles.inputGroupWrapper}>
              <Card isSelected={isOpen} onClick={() => onChange(true)} hasShadow>
                <CardHeader customStyles={createSurveyStyles.cardHeader}>
                  <div>
                    <RadioButton
                      labelLevel={HeadingLevel.h3}
                      selected={isOpen}
                      label={t("projects__surveys_table_open_participation")}
                    />
                    <Text customStyles={createSurveyStyles.progressHint}>
                      {t("projects__surveys_table_open_participation_text")}
                    </Text>
                  </div>
                  {isOpen && <Icon name={IconName.Check} color={successColor} />}
                </CardHeader>
                <CardContent customStyles={createSurveyStyles.cardContent} />
              </Card>

              <Card isSelected={!isOpen} onClick={() => onChange(false)} hasShadow>
                <CardHeader customStyles={createSurveyStyles.cardHeader}>
                  <div>
                    <RadioButton
                      labelLevel={HeadingLevel.h3}
                      selected={!isOpen}
                      label={t("projects__surveys_table_closed_participation")}
                    />
                    <Text customStyles={createSurveyStyles.progressHint}>
                      {t("projects__surveys_table_closed_participation_text")}
                    </Text>
                  </div>
                  {!isOpen && <Icon name={IconName.Check} color={successColor} />}
                </CardHeader>
                <CardContent customStyles={createSurveyStyles.cardContent} />
              </Card>
            </div>
          )
        }}
      />
    </React.Fragment>
  )
}

const styles = {
  inputGroupLabel: css({
    marginTop: spacingSmall
  }),
  inputGroupWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: spacingMedium
  })
}
