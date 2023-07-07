import {configure} from "enzyme"
// TODO: use official adapter: https://github.com/enzymejs/enzyme/issues/2429#issuecomment-679265564
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
// eslint-disable-next-line no-unused-vars
import * as React from "react"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {initialAppState} from "../src/redux/state/app-state"

configure({adapter: new Adapter()})

// prevent useLayoutEffect errors
React.useLayoutEffect = React.useEffect

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

function mockReduxHooks() {
  const original = jest.requireActual("react-redux")
  return {
    ...original,
    useDispatch: jest.fn(() => jest.fn()),
    useSelector: jest.fn(selector => selector(initialAppState))
  }
}

function mockV4() {
  const original = jest.requireActual("shared/utils/uuid")
  return {
    ...original,
    createUUID: () => "42"
  }
}

jest
  .mock("react-i18next", () => mockI18nReact())
  .mock("react-redux", () => mockReduxHooks())
  .mock("react-date-picker", () => () => <div>Mocked Date Picker</div>)
  .mock("@wojtekmaj/react-daterange-picker", () => () => <div>Mocked Date Range Picker</div>)
  .mock("../../shared/src/components/spreadsheet/dhx-spreadsheet/dhx-spreadsheet", () => ({
    DhxSpreadsheet: () => <div>mockedSheet</div>
  }))
  .mock("shared/utils/uuid", () => mockV4())
