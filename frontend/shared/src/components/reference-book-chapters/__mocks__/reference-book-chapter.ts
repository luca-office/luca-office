import {ReferenceBookContentType} from "../../../enums"
import {MimeType} from "../../../graphql/generated/globalTypes"
import {ReferenceBookChapter} from "../../../models"

export const referenceBookChapterMock = (
  id = "2dbdae38-581a-430c-b635-c56b3ce4defa",
  publishedAt = ""
): ReferenceBookChapter => ({
  __typename: "ReferenceBookChapter",
  id: id,
  title: "Venture-Capital",
  createdAt: "2020-07-21T12:15:48.373Z",
  publishedAt: publishedAt,
  description:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  author: {
    __typename: "UserAccount",
    id: "2dbdae38-581a-430c-b635-c56b3ce4defa",
    firstName: "First",
    lastName: "Last"
  },
  articles: [
    {
      __typename: "ReferenceBookArticle",
      id: "fdspof-sdfpgofjds-sdf",
      title: "Begriff",
      position: 1,
      referenceBookChapterId: "2dbdae38-581a-430c-b635-c56b3ce4defa",
      contents: [
        {
          __typename: "ReferenceBookContent",
          contentType: ReferenceBookContentType.ImageContent,
          id: "sdgqwesdfpisdf",
          text: "sfdfdf",
          imageUrl:
            "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          position: 2,
          createdAt: new Date(2020, 10, 5).toISOString(),
          modifiedAt: new Date(2020, 10, 15).toISOString(),
          imageBinaryFileId: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
          videoBinaryFileId: null,
          referenceBookArticleId: "fdspof-sdfpgofjds-sdf",
          videoUrl: null,
          imageBinaryFile: {
            __typename: "BinaryFile",
            id: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
            createdAt: new Date(2020, 10, 5).toISOString(),
            modifiedAt: new Date(2020, 10, 15).toISOString(),
            filename: "photo-1593642703055-4b72c180d9b5",
            fileSize: 1,
            mimeType: MimeType.ImagePng,
            url:
              "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          },
          videoBinaryFile: null,
          pdfBinaryFileId: null,
          pdfBinaryFile: null
        }
      ]
    },
    {
      __typename: "ReferenceBookArticle",
      id: "fdspof-sdfpgofjds-sdf-sdfsd",
      title: "ertragspotenziale und Risiken von Venture-Capital-Finanzierungen",
      position: 2,
      referenceBookChapterId: "2dbdae38-581a-430c-b635-c56b3ce4defa",
      contents: [
        {
          __typename: "ReferenceBookContent",
          contentType: ReferenceBookContentType.ImageContent,
          id: "sdgqwesdfpisdf",
          text: "sfdfdf",
          imageUrl:
            "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          position: 2,
          createdAt: new Date(2020, 10, 5).toISOString(),
          modifiedAt: new Date(2020, 10, 15).toISOString(),
          imageBinaryFileId: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
          videoBinaryFileId: null,
          referenceBookArticleId: "fdspof-sdfpgofjds-sdf",
          videoUrl: null,
          imageBinaryFile: {
            __typename: "BinaryFile",
            id: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
            createdAt: new Date(2020, 10, 5).toISOString(),
            modifiedAt: new Date(2020, 10, 15).toISOString(),
            filename: "photo-1593642703055-4b72c180d9b5",
            fileSize: 1,
            mimeType: MimeType.ImagePng,
            url:
              "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          },
          videoBinaryFile: null,
          pdfBinaryFileId: null,
          pdfBinaryFile: null
        },
        {
          __typename: "ReferenceBookContent",
          contentType: ReferenceBookContentType.ImageContent,
          id: "sdgqwesdfpisdf",
          text: "sfdfdf",
          imageUrl:
            "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          position: 2,
          createdAt: new Date(2020, 10, 5).toISOString(),
          modifiedAt: new Date(2020, 10, 15).toISOString(),
          imageBinaryFileId: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
          videoBinaryFileId: null,
          referenceBookArticleId: "fdspof-sdfpgofjds-sdf",
          videoUrl: null,
          imageBinaryFile: {
            __typename: "BinaryFile",
            id: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
            createdAt: new Date(2020, 10, 5).toISOString(),
            modifiedAt: new Date(2020, 10, 15).toISOString(),
            filename: "photo-1593642703055-4b72c180d9b5",
            fileSize: 1,
            mimeType: MimeType.ImagePng,
            url:
              "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          },
          videoBinaryFile: null,
          pdfBinaryFileId: null,
          pdfBinaryFile: null
        }
      ]
    }
  ]
})
