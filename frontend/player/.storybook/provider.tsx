import {Provider} from "react-redux"
import * as React from "react"
import {PropsWithChildren} from "react"
import {Store} from "redux"

export const ProviderWrapper = ({children, store}: PropsWithChildren<{store: Store}>) => (
  <Provider store={store}>{children}</Provider>
)
