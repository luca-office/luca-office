import {getScore} from "../answer"

describe("answer", () => {
  it("getScore", () => {
    expect(getScore("-1")).toEqual(0)
    expect(getScore("100")).toEqual(99)
    expect(getScore("50")).toEqual(50)
  })
})
