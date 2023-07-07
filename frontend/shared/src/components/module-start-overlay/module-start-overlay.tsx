import {css} from "@emotion/react"
import React from "react"
import {IconName} from "../../enums"
import {
  backgroundColorBright,
  borderRadiusLarge,
  Flex,
  flex1,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  TextSize
} from "../../styles"
import {Button, Icon, Overlay, Text} from ".."

export interface ModuleStartOverlayProps {
  title: string
  description: string
  buttonTitle: string
  onStartModule: () => void
}

export const ModuleStartOverlay: React.FC<ModuleStartOverlayProps> = ({
  title,
  description,
  buttonTitle,
  onStartModule: onStartModule
}) => {
  return (
    <Overlay>
      <div css={styles.container}>
        <div css={styles.header}>
          <Icon customStyles={styles.icon} name={IconName.Questionnaire} />
          <Text size={TextSize.Medium}>{title}</Text>
        </div>
        <div css={styles.description}>
          <Text size={TextSize.Smaller}>{description}</Text>
        </div>
        <div css={styles.buttonContainer}>
          <Button customStyles={styles.button} onClick={onStartModule}>
            {buttonTitle}
          </Button>
        </div>
      </div>
    </Overlay>
  )
}

const styles = {
  container: css(Flex.column, {
    width: 600,
    minHeight: 220,
    maxHeight: "90vh",
    backgroundColor: backgroundColorBright,
    borderRadius: borderRadiusLarge,
    padding: spacing(spacingMedium, spacingLarge)
  }),
  header: css(Flex.row, {
    marginBottom: spacingMedium
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  description: css({
    marginBottom: spacingMedium,
    flex: flex1,
    overflowY: "auto"
  }),
  buttonContainer: css(Flex.row, {
    justifyContent: "center"
  }),
  button: css({
    width: 240
  })
}
