import {css} from "@emotion/react"
import * as React from "react"
import {MarkdownRenderer, Text} from "shared/components"
import {borderRadius, fontColorLight, spacingSmall, spacingTiny, TextSize} from "shared/styles"

interface Props {
  readonly markdown: string
  readonly onClick?: () => void
  readonly placeholder?: React.ReactElement | string
  readonly scrollId?: string
}

export const MarkdownText = React.forwardRef<HTMLDivElement, Props>(
  ({markdown, onClick, placeholder, scrollId}, ref) => {
    return markdown ? (
      <div ref={ref} onClick={onClick} data-scroll={scrollId}>
        <MarkdownRenderer content={markdown} />
      </div>
    ) : placeholder && typeof placeholder !== "string" ? (
      placeholder
    ) : (
      <div
        ref={ref}
        onClick={onClick}
        css={styles.container}
        className="markdown-text placeholder"
        {...{...(scrollId && {"data-scroll": scrollId})}}>
        <Text customStyles={styles.placeholder}>{placeholder}</Text>
      </div>
    )
  }
)

const styles = {
  container: css({
    marginBottom: spacingSmall,
    padding: spacingTiny,
    borderRadius: borderRadius
  }),
  placeholder: css({
    color: fontColorLight,
    fontSize: TextSize.Medium
  })
}
