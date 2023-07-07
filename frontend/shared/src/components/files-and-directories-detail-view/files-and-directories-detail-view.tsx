import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {CustomStyle, Flex, spacingSmall, textEllipsis} from "../../styles"
import {Card, CardContent, CardHeader, Heading, Icon} from ".."

interface FilesAndDirectoriesDetailViewProps extends CustomStyle {
  readonly additionalButton?: React.ReactNode
  readonly customCardContentStyles?: CSSInterpolation
  readonly headerIcon: IconName
  readonly headerTitle: string
  readonly children?: React.ReactElement
}

export const FilesAndDirectoriesDetailView: React.FC<FilesAndDirectoriesDetailViewProps> = ({
  additionalButton,
  children,
  customCardContentStyles,
  headerIcon,
  headerTitle,
  customStyles
}) => (
  <Card customStyles={[styles.card, customStyles]}>
    <CardHeader customStyles={styles.header} hasShadow={true} hasGreyBackground={true}>
      <div css={styles.title}>
        <Icon customStyles={styles.icon} name={headerIcon} />
        <Heading customStyles={textEllipsis} level={HeadingLevel.h3}>
          {headerTitle}
        </Heading>
      </div>
      <div css={styles.additionalButtonWrapper}>{additionalButton}</div>
    </CardHeader>
    <CardContent customStyles={customCardContentStyles}>{children}</CardContent>
  </Card>
)

const styles = {
  card: css(Flex.column, {
    overflow: "hidden"
  }),
  header: css({
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "space-between"
  }),
  title: css({
    display: "flex",
    alignItems: "center",
    marginRight: spacingSmall,
    overflow: "hidden"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  additionalButtonWrapper: css(Flex.row, {
    flex: "0 0 auto"
  })
}
