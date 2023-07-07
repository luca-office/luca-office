import "shared/utils/console-warnings"
import * as React from "react"
import {useBeforeUnload} from "../../../hooks/use-before-unload"
import {ContentContainer} from "../content/content-container"

export const App: React.FC = () => {
  useBeforeUnload()

  return <ContentContainer />
}
