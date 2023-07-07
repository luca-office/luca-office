import {css} from "@emotion/react"
import * as React from "react"
import {Card, CardContent, CardFooter, CardHeader, Text} from "shared/components"
import {
  boxHeightMediumLarge,
  Children,
  CustomStyle,
  Flex,
  FontWeight,
  primaryColor,
  spacing,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"

export interface CardTab extends CustomStyle {
  readonly content: React.ReactNode
  readonly label: string
}

export interface TabbedCardProps extends CustomStyle, Children {
  readonly tabs: CardTab[]
  readonly defaultActiveIndex?: number
  readonly onSelectTab?: (selectedIndex: number) => void
  readonly renderCardFooter?: (activeIndex: number) => React.ReactNode
  readonly renderCardHeader?: (activeIndex: number) => React.ReactNode
}

export const TabbedCard: React.FunctionComponent<TabbedCardProps> = ({
  customStyles,
  defaultActiveIndex = 0,
  renderCardFooter,
  renderCardHeader,
  onSelectTab,
  tabs
}) => {
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex)
  const handleSelectTab = (index: number) => {
    setActiveIndex(index)
    if (onSelectTab) {
      onSelectTab(index)
    }
  }

  React.useEffect(() => {
    if (defaultActiveIndex !== activeIndex) {
      setActiveIndex(defaultActiveIndex)
    }
  }, [defaultActiveIndex])

  return (
    <Card customStyles={customStyles}>
      <CardHeader hasGreyBackground={true} hasShadow={true} customStyles={styles.cardHeader}>
        <div css={Flex.row}>
          {tabs.map((tab, index) => (
            <Text
              key={index}
              customStyles={[styles.cardTab, index === activeIndex && styles.cardTabActive]}
              onClick={() => handleSelectTab(index)}
              size={TextSize.Medium}
              className="card-tab">
              {tab.label}
            </Text>
          ))}
        </div>
        {renderCardHeader && renderCardHeader(activeIndex)}
      </CardHeader>
      <CardContent>
        {tabs.map((tab, index) => (
          <div
            key={index}
            css={[styles.cardTabContent, index === activeIndex && styles.cardTabContentActive]}
            className="card-tab-content">
            {tab.content}
          </div>
        ))}
      </CardContent>
      {renderCardFooter && <CardFooter>{renderCardFooter(activeIndex)}</CardFooter>}
    </Card>
  )
}

const styles = {
  cardHeader: css(Flex.row, {
    justifyContent: "space-between"
  }),
  cardTab: css({
    cursor: "pointer",
    display: "flex",
    height: boxHeightMediumLarge,
    boxSizing: "border-box",
    alignItems: "center",
    padding: spacing(0, spacingMedium),
    marginRight: spacingSmall,
    justifyContent: "center",
    borderBottom: "2px solid transparent",
    fontWeight: FontWeight.Bold,
    userSelect: "none"
  }),
  cardTabActive: css({
    cursor: "default",
    borderColor: primaryColor,
    color: primaryColor
  }),
  cardTabContent: css({
    flex: 1,
    width: "100%",
    display: "none",
    flexDirection: "column"
  }),
  cardTabContentActive: css({
    display: "flex"
  })
}
