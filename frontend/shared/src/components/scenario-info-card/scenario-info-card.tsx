import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Text} from "../../components"
import {IconName} from "../../enums"
import {Flex, spacingLarge, spacingSmall, textEllipsis, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {InfoTag} from "./info-tag"

export interface ScenarioInfoCardProps {
  readonly projectName: string
  readonly surveyTitle: string
  readonly scenarioName: string
}

export const ScenarioInfoCard: React.FC<ScenarioInfoCardProps> = ({projectName, surveyTitle, scenarioName}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={styles.tagBreadcrumbs}>
      <InfoTag
        label={t("reporting_result__breadcrumb_project_label")}
        content={projectName}
        customStyles={styles.tag}
      />
      <InfoTag label={t("reporting_result__breadcrumb_survey_label")} content={surveyTitle} customStyles={styles.tag} />
      <InfoTag
        label={t("reporting_result__breadcrumb_module_label")}
        content={
          <div css={styles.scenarioName}>
            <Icon css={{marginRight: spacingSmall}} name={IconName.Monitor} />
            <Text size={TextSize.Medium} customStyles={textEllipsis}>
              {scenarioName}
            </Text>
          </div>
        }
        customStyles={styles.tag}
      />
    </div>
  )
}

const styles = {
  tagBreadcrumbs: css(Flex.row, {
    gap: spacingSmall,
    marginBottom: spacingLarge
  }),
  scenarioName: css(Flex.row),
  tag: css({
    minWidth: 0,
    flexBasis: 0,
    flexGrow: 1
  })
}
