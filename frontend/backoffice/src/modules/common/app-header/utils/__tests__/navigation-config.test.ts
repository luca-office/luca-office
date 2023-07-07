import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {AppMode} from "../../../../../enums"
import {getHeaderNavigationItems} from "../navigation-config"

describe("navigation-config", () => {
  it("can getHeaderNavigationItems", () => {
    expect(getHeaderNavigationItems(AppMode.EDITOR, fakeTranslate, false)).toBeDefined()
    expect(getHeaderNavigationItems(AppMode.EDITOR, fakeTranslate, false).length).toBeGreaterThanOrEqual(1)
    expect(getHeaderNavigationItems(AppMode.MANAGER, fakeTranslate, false)).toBeDefined()
    expect(getHeaderNavigationItems(AppMode.MANAGER, fakeTranslate, false).length).toBeGreaterThanOrEqual(0)
    expect(getHeaderNavigationItems(null as any, fakeTranslate, false)).toBeDefined()
  })
})
