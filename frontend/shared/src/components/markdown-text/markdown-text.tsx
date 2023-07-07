import {css} from "@emotion/react"
import * as React from "react"
import {borderRadius, fontColorLight, spacingSmall, spacingTiny, TextSize} from "../../styles"
import {MarkdownRenderer, Text} from ".."

interface Props {
  readonly markdown: string
  readonly className?: string
  readonly onClick?: () => void
  readonly placeholder?: string
}

export const MarkdownText: React.FC<Props> = ({markdown, onClick, placeholder}) => {
  return markdown ? (
    <div onClick={onClick} css={styles.container} className="markdown-text">
      <MarkdownRenderer content={markdown} />
    </div>
  ) : (
    <div onClick={onClick} css={styles.container} className="markdown-text placeholder">
      <Text customStyles={styles.placeholder}>{placeholder}</Text>
    </div>
  )
}

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
