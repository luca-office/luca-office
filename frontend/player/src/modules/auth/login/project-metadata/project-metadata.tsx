import {css} from "@emotion/react"
import * as React from "react"
import {Columns, Heading, Paper} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {FontWeight, spacingSmall} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {convertSecondsToMinutes, formatDate} from "shared/utils"
import {MetadataColumn} from "../metadata-column/metadata-column"

interface MetaDataConfig {
  readonly projectName: string
  readonly startsAt: string | null
  readonly endsAt: string | null
  readonly maxDurationInSeconds: number
}
interface Props {
  readonly t: LucaTFunction
  readonly metadata: MetaDataConfig
}

export const ProjectMetadata: React.FC<Props> = ({t, metadata}) => (
  <>
    <Heading level={HeadingLevel.h3} customStyles={styles.label} fontWeight={FontWeight.Bold}>
      {t("project")}
    </Heading>

    <Paper>
      <Columns>
        <MetadataColumn heading={t("title")} value={metadata.projectName} />
        {metadata.startsAt !== null && metadata.endsAt && (
          <MetadataColumn
            heading={t("auth__project_metadata_period")}
            value={`${formatDate(new Date(metadata.startsAt))} - ${formatDate(new Date(metadata.endsAt))}`}
          />
        )}

        <MetadataColumn
          heading={t("auth__project_metadata_processing_time")}
          value={`${convertSecondsToMinutes(metadata.maxDurationInSeconds)} ${t("minutes")}`}
        />
      </Columns>
    </Paper>
  </>
)

const styles = {
  label: css({
    marginBottom: spacingSmall
  })
}
