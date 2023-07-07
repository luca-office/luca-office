import {css} from "@emotion/react"
import * as React from "react"
import {Heading} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {Children, CustomStyle, Flex, FontWeight, spacingTiny} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"

export interface BinaryEntryProps extends CustomStyle, Children {
  readonly className?: string
  readonly headerKey: LucaI18nLangKey
}

export const BinaryEntry: React.FC<BinaryEntryProps> = ({children, className, customStyles, headerKey}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={[styles.entry, customStyles]} className={className}>
      <Heading
        customStyles={styles.heading}
        fontWeight={FontWeight.Bold}
        level={HeadingLevel.h3}
        className={"binary-entry-header"}>
        {t(headerKey)}
      </Heading>
      <div className={"binary-entry-content"}>{children}</div>
    </div>
  )
}

const styles = {
  entry: css(Flex.column),
  heading: css({
    marginBottom: spacingTiny
  })
}
