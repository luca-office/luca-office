import {isPlacedHorizontal} from "../popper"

describe("popper", () => {
  describe("isPlacedHorizontal", () => {
    it("correctly checks that placement is horizontal", () => {
      expect(isPlacedHorizontal("left")).toEqual(true)
      expect(isPlacedHorizontal("right")).toEqual(true)
      expect(isPlacedHorizontal("right-start")).toEqual(true)
      expect(isPlacedHorizontal("right-end")).toEqual(true)
      expect(isPlacedHorizontal("left-start")).toEqual(true)
      expect(isPlacedHorizontal("left-end")).toEqual(true)
    })
    it("correctly checks that placement is vertical", () => {
      expect(isPlacedHorizontal("top")).toEqual(false)
      expect(isPlacedHorizontal("bottom")).toEqual(false)
      expect(isPlacedHorizontal("top-start")).toEqual(false)
      expect(isPlacedHorizontal("top-end")).toEqual(false)
      expect(isPlacedHorizontal("bottom-start")).toEqual(false)
      expect(isPlacedHorizontal("bottom-end")).toEqual(false)
    })
  })
})
