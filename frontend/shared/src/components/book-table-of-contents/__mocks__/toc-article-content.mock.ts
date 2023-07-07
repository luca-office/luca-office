import {BookArticleContentType} from "../../../enums"
import {TocArticleContent} from "../../../models"

export const tocArticleContentMocks: TocArticleContent[] = [
  {
    id: "1175af57-e491-4172-9dd4-c8fa8378855c",
    title: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    position: 1,
    type: BookArticleContentType.Text
  },
  {
    id: "a0487e90-2b11-4a95-a1f3-58af791ae6b1",
    title: "Grafikblock",
    position: 2,
    type: BookArticleContentType.Image
  },
  {
    id: "75622b3d-e7da-403f-971e-40120a019f02",
    title: "Videoblock",
    position: 3,
    type: BookArticleContentType.Video
  }
]
