import {imageBinariesMock, videoBinariesMock} from "shared/components/binary-viewer/__mocks__/binaries.mock"
import {BinaryType, IconName} from "shared/enums"
import {ResortableEntity} from "../../../models"

export const resortableEntitiesMock: ResortableEntity[] = [
  {
    binarySrc: imageBinariesMock[0].path,
    binaryType: BinaryType.Image,
    icon: IconName.Image,
    id: "4b8b26e5-90d1-4dba-ab8c-6c88b9e7ddeb",
    title: "ImageFileName.png"
  },
  {
    binarySrc: videoBinariesMock[0].path,
    binaryType: BinaryType.Video,
    icon: IconName.Play,
    id: "d243419d-ed86-46fe-a352-cf976f89131a",
    title: "video_file_name.mp4"
  },
  {
    icon: IconName.PaperSheet,
    id: "4709c1cf-8df3-4a80-8135-6df9b301440e",
    title: "text_block_with_a_long_name"
  }
]
