// @ts-check

import {addParameters, addDecorator} from "@storybook/react"
import {initLucaI18n} from "../src/translations"

addParameters({
  backgrounds: [{name: "light_blue", value: "#eff3fa", default: true}]
})

addDecorator(storyFn => {
  initLucaI18n()
  return storyFn()
})
