import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel, IconName} from "../../../enums"
import {CustomStyle, FontWeight, spacing, spacingSmall, spacingSmaller, spacingTiny, TextSize} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {Icon} from "../../icon/icon"
import {LoadingIndicator} from "../../loading-indicator/loading-indicator"
import {Paper} from "../../paper/paper"
import {Heading, Text} from "../../typography/typography"

export interface ScoringMetadataProps {
  readonly dataLoading: boolean
  readonly projectName: string
  readonly surveyName: string
  readonly projectModuleName: string
  readonly projectModuleIcon: IconName
}

export const ScoringMetadata: React.FC<ScoringMetadataProps & CustomStyle> = props => {
  const {t} = useLucaTranslation()
  const {dataLoading, projectName, surveyName, projectModuleName, projectModuleIcon, customStyles} = props

  return (
    <div css={[styles.metadata, customStyles]}>
      <Paper customStyles={styles.metadataPaper}>
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("reporting_scoring__overlay_metadata_project")}
        </Heading>
        {dataLoading ? (
          <LoadingIndicator customStyles={styles.loadingIndicator} />
        ) : (
          <div css={styles.metadataValue(false)}>
            <Text size={TextSize.Medium}>{projectName}</Text>
          </div>
        )}
      </Paper>
      <Paper customStyles={styles.metadataPaper}>
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("reporting_scoring__overlay_metadata_survey")}
        </Heading>
        {dataLoading ? (
          <LoadingIndicator customStyles={styles.loadingIndicator} />
        ) : (
          <div css={styles.metadataValue(false)}>
            <Text size={TextSize.Medium}>{surveyName}</Text>
          </div>
        )}
      </Paper>
      <Paper customStyles={styles.metadataPaper}>
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("reporting_scoring__overlay_metadata_project_module")}
        </Heading>
        {dataLoading ? (
          <LoadingIndicator customStyles={styles.loadingIndicator} />
        ) : (
          <div css={styles.metadataValue(true)}>
            <Icon name={projectModuleIcon} />
            <Text size={TextSize.Medium}>{projectModuleName}</Text>
          </div>
        )}
      </Paper>
    </div>
  )
}

const styles = {
  metadata: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(min-content, max-content))",
    gridColumnGap: spacingSmall
  }),
  metadataPaper: css({
    padding: spacing(spacingSmaller, spacingSmall),
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(min-content, max-content))",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  metadataValue: (hasIcon: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: `repeat(${hasIcon ? 2 : 1}, minmax(min-content, max-content))`,
      gridColumnGap: spacingTiny,
      alignItems: "center"
    }),
  loadingIndicator: css({
    width: Icon.defaultProps?.width,
    height: Icon.defaultProps?.height
  })
}
