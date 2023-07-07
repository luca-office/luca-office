import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export interface Props {
  readonly content: string
}

export const MarkdownRenderer: React.FC<Props> = ({content}) => (
  <ReactMarkdown disallowedElements={["a"]} remarkPlugins={[remarkGfm]} unwrapDisallowed={true} skipHtml={true}>
    {content}
  </ReactMarkdown>
)
