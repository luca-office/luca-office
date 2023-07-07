import {IconName} from "../../../../enums"
import {CalculatorKey} from "../../enums/calculator-key"
import {keyToIcon, keyToOperation} from "../calculator-utils"

describe("calculator-utils", () => {
  it("keyToIcon", () => {
    expect(keyToIcon(CalculatorKey.Divide).orNull()).toEqual(IconName.Divide)
    expect(keyToIcon(CalculatorKey.Multiply).orNull()).toEqual(IconName.Close)
    expect(keyToIcon(CalculatorKey.Nine).orNull()).toBeNull()
  })
  it("keyToOperation", () => {
    expect(keyToOperation(CalculatorKey.Divide)).toEqual("/")
    expect(keyToOperation(CalculatorKey.Multiply)).toEqual("*")
    expect(keyToOperation(CalculatorKey.Nine)).toEqual("9")
  })
})
