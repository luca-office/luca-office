// TODO: use official adapter: https://github.com/enzymejs/enzyme/issues/2429#issuecomment-679265564
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import {configure} from "enzyme"
// eslint-disable-next-line no-unused-vars
import * as React from "react"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {initialAppState} from "../src/redux/state/app-state"

configure({adapter: new Adapter()})

function mockI18nReact() {
  // eslint-disable-next-line no-undef
  const original = jest.requireActual("react-i18next")
  return {
    ...original,
    withTranslation: () => Component => {
      Component.defaultProps = {...Component.defaultProps, t: fakeTranslate, i18n: {}}
      return Component
    },
    useTranslation: () => ({
      t: fakeTranslate,
      i18n: {}
    })
  }
}

function mockLodash() {
  return {
    ...jest.requireActual("lodash-es"),
    debounce: cb => cb
  }
}

function mockReactRedux() {
  return {
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(selector => selector(initialAppState(null)))
  }
}

function mockDateUtils() {
  return {
    ...jest.requireActual("shared/utils"),
    now: () => new Date(2020, 10, 13, 15, 0, 0)
  }
}

function mockDhxSpreadsheet() {
  return {
    DhxSpreadsheet: () => <div>mockedSheet</div>
  }
}

function mockV4() {
  const original = jest.requireActual("shared/utils/uuid")
  return {
    ...original,
    createUUID: () => "42"
  }
}

function mockUseWebsocket() {
  return jest.fn(() => ({
    sendMessage: jest.fn(),
    sendJsonMessage: jest.fn(),
    lastMessage: null,
    lastJsonMessage: null,
    readyState: 1,
    getWebSocket: jest.fn()
  }))
}

// eslint-disable-next-line no-undef
jest
  .mock("react-i18next", () => mockI18nReact())
  .mock("lodash-es", () => mockLodash())
  .mock("react-redux", () => mockReactRedux())
  .mock("shared/utils", () => mockDateUtils())
  .mock("shared/components/spreadsheet/dhx-spreadsheet/dhx-spreadsheet", () => mockDhxSpreadsheet())
  .mock("shared/utils/uuid", () => mockV4())
  .mock("react-use-websocket", () => mockUseWebsocket())
