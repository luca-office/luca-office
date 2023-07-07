// TODO: use official adapter: https://github.com/enzymejs/enzyme/issues/2429#issuecomment-679265564
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import {configure} from "enzyme"
// eslint-disable-next-line no-unused-vars
import * as React from "react"
import {fakeTranslate} from "./utils/translate-mock"

// prevent useLayoutEffect errors
React.useLayoutEffect = React.useEffect

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

function mockV4() {
  const original = jest.requireActual("../src/utils/uuid")
  return {
    ...original,
    createUUID: () => "42"
  }
}

function mockDateUtils() {
  return {
    ...jest.requireActual("../src/utils/date"),
    now: () => new Date(2020, 10, 13, 15, 0, 0)
  }
}

function mockClipboardCopy() {
  const original = jest.requireActual("../src/hooks/use-luca-clipboard")
  return {
    ...original,
    copy: jest.fn()
  }
}

jest
  .mock("react-i18next", () => mockI18nReact())
  .mock("react-select", () => () => <div className={"custom-select"}>MockedSelect</div>)
  .mock("react-date-picker", () => () => <div>Mocked Date Picker</div>)
  .mock("../src/components/spreadsheet/dhx-spreadsheet/dhx-spreadsheet", () => ({
    DhxSpreadsheet: () => <div>mockedSheet</div>
  }))
  .mock("../src/utils/uuid", () => mockV4())
  .mock("../src/utils/date", () => mockDateUtils())
  .mock("../src/hooks/use-luca-clipboard", () => mockClipboardCopy())
