import {ProviderWrapper} from "./provider"
import * as React from "react"
import {fakeStore} from "sharedTests/redux/fake-store"
import {initialAppState} from "../src/redux/state/app-state"

export const withProvider = (story: () => any) => (
  <ProviderWrapper store={fakeStore(initialAppState(null))}>{story()}</ProviderWrapper>
)
