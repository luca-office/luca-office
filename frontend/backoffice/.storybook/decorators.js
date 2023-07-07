import {ProviderWrapper} from "./provider"
import {createReduxStore} from "../src/index"
import * as React from "react"

const store = createReduxStore()

export const withProvider = story => <ProviderWrapper store={store}>{story()}</ProviderWrapper>
