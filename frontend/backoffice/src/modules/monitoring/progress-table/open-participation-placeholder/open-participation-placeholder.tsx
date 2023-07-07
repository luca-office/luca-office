import {css} from "@emotion/react"
import React from "react"
import {Heading, Icon, ReadonlyActionField, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {Flex, FontWeight, spacingSmall, textEllipsis, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

interface Props {
  readonly openParticipationPlayerUrl: string | undefined
  readonly copy: (text?: any) => void
}

export const OpenParticipationPlaceholder: React.FC<Props> = ({openParticipationPlayerUrl, copy}) => {
  const {t} = useLucaTranslation()
  return (
    <div>
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("dashboard__project_table_placeholder_title_manual_synchron")}
      </Heading>
      <Text>{t("dashboard__project_table_placeholder_hint_manual_synchron")}</Text>
      {openParticipationPlayerUrl && (
        <ReadonlyActionField
          renderValue={() => (
            <Text customStyles={[Flex.row, styles.actionFieldInvitation]} size={TextSize.Medium}>
              <Icon name={IconName.Link} customStyles={styles.actionFieldIcon} />
              <span>{openParticipationPlayerUrl}</span>
            </Text>
          )}
          buttonLabel={t("copy")}
          customStyles={styles.participationWrapper}
          onClick={() => copy(openParticipationPlayerUrl)}
        />
      )}
    </div>
  )
}

const styles = {
  actionFieldIcon: css({
    marginRight: spacingSmall
  }),
  actionFieldInvitation: css({
    minWidth: 0,
    "> span": css(textEllipsis)
  }),
  placeholder: css(Flex.column, {
    alignItems: "center",
    justifyContent: "center"
  }),
  participationWrapper: css({
    minWidth: 0,
    minHeight: 0,
    marginTop: spacingSmall,
    "div.content": {
      minWidth: 0
    }
  })
}
