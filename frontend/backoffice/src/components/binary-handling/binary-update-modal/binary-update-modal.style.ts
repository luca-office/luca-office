import {css} from "@emotion/react"
import {
  backgroundColorDarker,
  backgroundColorLight,
  borderRadius,
  Flex,
  primaryColor,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium
} from "shared/styles"

const Size = {
  modal: "70vw",
  preview: 448,
  dropZone: 89
}

export const binaryUpdateModalStyle = {
  modal: css({
    width: Size.modal
  }),
  binarySwap: css({
    margin: spacing(spacingLarge, 0, spacingHuge, 0)
  }),
  binaryPreview: css({
    height: Size.preview,
    borderRadius: borderRadius,
    border: `1px solid ${primaryColor}`
  }),
  image: (src: string) =>
    css({
      backgroundImage: `url(${src})`,
      backgroundColor: backgroundColorDarker,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain"
    }),
  videoWrapper: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColorDarker
  }),
  video: css({
    maxWidth: "100%",
    maxHeight: "100%"
  }),
  pdfView: css({
    backgroundColor: backgroundColorDarker,
    overflow: "auto"
  }),
  fileDropZone: css({
    height: Size.dropZone,
    boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)",
    padding: spacingMedium,
    borderRadius: borderRadius,
    backgroundColor: backgroundColorLight
  })
}
