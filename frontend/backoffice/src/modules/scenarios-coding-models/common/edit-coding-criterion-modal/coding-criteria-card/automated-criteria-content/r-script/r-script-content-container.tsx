import * as React from "react"
import {RScript, RScriptScenarioCodingAutomatedCriterion} from "shared/models"
import {RScriptContent} from "./r-script-content"

interface Props {
  readonly rScript: RScript
  readonly codingItemId: UUID
  readonly codingModelId: UUID
  readonly criterion: RScriptScenarioCodingAutomatedCriterion
}

export const RScriptContentContainer: React.FC<Props> = ({...rest}) => {
  const [isSelectRScriptModalVisible, setIsSelectRScriptModalVisible] = React.useState(false)

  return (
    <RScriptContent
      isSelectRScriptModalVisible={isSelectRScriptModalVisible}
      setIsSelectRScriptModalVisible={setIsSelectRScriptModalVisible}
      {...rest}
    />
  )
}
