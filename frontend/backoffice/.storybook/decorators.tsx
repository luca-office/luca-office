import {ProviderWrapper} from "./provider"
import {createReduxStore} from "../src"
import * as React from "react"
import {initialAppState} from "../src/redux/state/app-state"
import {fakeStore} from "sharedTests/redux/fake-store"

export const withProvider = (story: () => React.ReactNode) => (
  <ProviderWrapper store={fakeStore(initialAppState)}>{story()}</ProviderWrapper>
)
