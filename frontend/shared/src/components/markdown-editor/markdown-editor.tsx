import "react-mde/lib/styles/css/react-mde-all.css"
import {css} from "@emotion/react"
import * as React from "react"
import ReactMde, {getDefaultToolbarCommands} from "react-mde"
import {MarkdownRenderer} from ".."

// No Enum possible, cause of lib-types
type SelectedTab = "write" | "preview"

interface Props {
  readonly defaultValue: string
  readonly onChange: (markdown: string) => void
  readonly autoFocus?: boolean
}

export const MarkdownEditor: React.FC<Props> = ({defaultValue, onChange, autoFocus = false}) => {
  React.useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  const [value, setValue] = React.useState(defaultValue)
  const [selectedTab, setSelectedTab] = React.useState<SelectedTab>("write")

  const handleChange = (text: string) => {
    setValue(text)
    onChange(text)
  }

  return (
    <ReactMde
      value={value}
      onChange={handleChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      minEditorHeight={Sizes.height}
      minPreviewHeight={Sizes.previewHeight}
      maxEditorHeight={Sizes.maxHeight}
      toolbarCommands={getDefaultToolbarCommands().map(cmdGroup => cmdGroup.filter(cmd => cmd !== "link"))}
      generateMarkdownPreview={markdown => Promise.resolve(<MarkdownRenderer content={markdown} />)}
      childProps={{textArea: {autoFocus: autoFocus}}}
    />
  )
}

const Sizes = {
  height: 220,
  previewHeight: 210,
  maxHeight: 500
}
