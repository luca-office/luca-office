import {css} from "@emotion/react"
import * as React from "react"
import {Button, Card, CardHeader, Heading, Icon} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {spacingSmall} from "shared/styles"

interface Props {
  readonly disabled?: boolean
  readonly onCreate: () => void
  readonly title: string
}

export const CreationBar: React.FC<Props> = ({disabled = false, onCreate, title}) => (
  <Card onClick={!disabled ? onCreate : undefined} customStyles={styles.wrapper(disabled)} hasShadow>
    <CardHeader customStyles={styles.bar}>
      <div css={styles.title}>
        <Icon customStyles={styles.icon} name={IconName.Add} />
        <Heading level={HeadingLevel.h3}>{title}</Heading>
      </div>
      <Button disabled={disabled} onClick={onCreate} variant={ButtonVariant.IconOnly} icon={IconName.Add} />
    </CardHeader>
  </Card>
)

const styles = {
  wrapper: (disabled: boolean) =>
    css({
      width: "100%",
      cursor: disabled ? "not-allowed" : "pointer"
    }),
  title: css({
    display: "flex",
    alignItems: "center"
  }),
  bar: css({
    display: "flex",
    justifyContent: "space-between"
  }),
  icon: css({
    marginRight: spacingSmall
  })
}
