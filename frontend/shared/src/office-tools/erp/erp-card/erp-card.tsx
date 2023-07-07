import {css} from "@emotion/react"
import * as React from "react"
import {Card, CardContent, CardFooter, CardHeader, Icon, Text, TextInput} from "../../../components"
import {IconName, InputType} from "../../../enums"
import {
  backgroundColorBright,
  boxSizeLarge,
  Children,
  Flex,
  flex1,
  fontColor,
  spacingSmall,
  TextSize,
  zIndex4
} from "../../../styles"

export interface ErpCardProps extends Children {
  readonly title: string
  readonly onChangeSearch: (query: string) => void
  readonly footerContent?: React.ReactNode
  readonly searchQuery?: string
}

export const ErpCard: React.FC<ErpCardProps> = ({title, onChangeSearch, searchQuery, children, footerContent}) => {
  return (
    <Card customStyles={styles.card}>
      <CardHeader customStyles={styles.header} hasGreyBackground={true} hasShadow={true}>
        <div css={styles.headerLeftSlot}>
          <Icon css={styles.icon} name={IconName.Table} />
          <Text size={TextSize.Medium}>{title}</Text>
        </div>
        <TextInput
          customStyles={styles.search}
          type={InputType.text}
          icon={IconName.Search}
          iconColor={fontColor}
          placeholderKey={"erp__table_search_placeholder"}
          onChange={onChangeSearch}
          value={searchQuery}
        />
      </CardHeader>
      <CardContent customStyles={styles.content(footerContent !== undefined)}>{children}</CardContent>
      <CardFooter>{footerContent}</CardFooter>
    </Card>
  )
}

const Sizes = {
  cardFooterWithContentHeight: 56,
  cardFooterHeight: 24
}

const styles = {
  card: css({
    flex: flex1,
    height: "100%",
    overflow: "hidden"
  }),
  content: (hasFooterContent: boolean) =>
    css({
      backgroundColor: backgroundColorBright,
      height: `calc(100% - ${
        hasFooterContent ? Sizes.cardFooterWithContentHeight : Sizes.cardFooterWithContentHeight
      }px - ${boxSizeLarge}px)`,
      overflow: "hidden"
    }),
  icon: css({
    marginRight: spacingSmall
  }),
  header: css({
    justifyContent: "space-between",
    zIndex: zIndex4
  }),
  headerLeftSlot: css(Flex.row, {
    flex: flex1
  }),
  search: css({
    flex: "2 1 auto",
    maxWidth: 600,
    backgroundColor: backgroundColorBright
  })
}
