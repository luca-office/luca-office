import {css} from "@emotion/react"
import * as React from "react"
import {Columns, Heading, Paper} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {ParticipantData} from "shared/models"
import {FontWeight, spacingHuge, spacingSmall} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {salutationToLanguageKey} from "shared/utils"
import {MetadataColumn} from "../metadata-column/metadata-column"

interface Props {
  readonly t: LucaTFunction
  readonly participantData: ParticipantData
}

export const UserMetadata: React.FC<Props> = ({t, participantData}) => (
  <div css={styles.userMetadata}>
    <Heading level={HeadingLevel.h3} customStyles={styles.label} fontWeight={FontWeight.Bold}>
      {t("auth__user_information_registered")}
    </Heading>

    <Paper>
      <Columns>
        <MetadataColumn heading={t("first_name")} value={participantData.firstName} />
        <MetadataColumn heading={t("last_name")} value={participantData.lastName} />
        <MetadataColumn
          heading={t("auth__salutation")}
          value={t(salutationToLanguageKey(participantData.salutation))}
        />
      </Columns>
    </Paper>
  </div>
)

const styles = {
  label: css({
    marginBottom: spacingSmall
  }),
  userMetadata: css({
    marginTop: spacingHuge
  })
}
