// @ts-check

import {addDecorator, addParameters} from "@storybook/react"
import {initLucaI18n} from "../../shared/src/translations"
import {withProvider} from "./decorators"

addParameters({
  backgrounds: {
    default: "light_blue",
    values: [{name: "light_blue", value: "#eff3fa", default: true}]
  }
})

addDecorator(storyFn => {
  initLucaI18n()
  return storyFn()
})

addDecorator(withProvider)