import {css} from "@emotion/react"
import * as React from "react"
import {Text} from "shared/components"
import {borderColor, spacingCard, spacingTiny} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {CreationStatus as CreationStatusEnum} from "../../enums"

interface Props {
  readonly status: CreationStatusEnum
}

export const CreationStatus: React.FC<Props> = ({status}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.wrapper}>
      <Text customStyles={styles.status}>
        {t("creation_status")}: <span css={styles.text}>{getStatusText(status, t)}</span>
      </Text>
      <div css={styles.circles}>
        <div css={styles.circle(status === CreationStatusEnum.NotCreated)} />
        <div css={styles.circle(status === CreationStatusEnum.Created)} />
        <div css={styles.circle(status === CreationStatusEnum.Unpublished)} />
        <div css={styles.circle(status === CreationStatusEnum.Published)} />
      </div>
    </div>
  )
}

const getStatusText = (status: CreationStatusEnum, t: LucaTFunction) => {
  switch (status) {
    case CreationStatusEnum.Unpublished:
      return t("creation_status__unpublished")
    case CreationStatusEnum.NotCreated:
      return t("creation_status__not_created")
    case CreationStatusEnum.Published:
      return t("creation_status__published")
    case CreationStatusEnum.Created:
      return t("creation_status__created")
  }
}

const styles = {
  wrapper: css({
    display: "flex",
    alignItems: "center",
    width: 200
  }),
  status: css({
    fontWeight: "bold",
    flex: 3
  }),
  text: css({
    fontWeight: "normal"
  }),
  circles: css({display: "flex", alignItems: "center", marginLeft: spacingCard, flex: 1}),
  circle: (active: boolean) =>
    css({
      borderRadius: "50%",
      background: active ? "linear-gradient(-180deg, rgb(231, 112, 112) 0%, rgb(207, 79, 127) 100%)" : borderColor,
      height: 8,
      width: 8,
      marginRight: spacingTiny
    })
}
