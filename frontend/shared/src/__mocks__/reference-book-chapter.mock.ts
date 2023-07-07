import {ReferenceBookChapter} from "../models"
import {MimeType, ReferenceBookContentType} from "../graphql/generated/globalTypes"

export const referenceBookChapterMock = (
  id = "2dbdae38-581a-430c-b635-c56b3ce4defa",
  publishedAt: null | string = null
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
          id: "sdgqwe.sdfoi",
          text: "sfdfdf",
          imageUrl:
            "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          position: 1,
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
          pdfBinaryFile: null,
          pdfBinaryFileId: null
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
          referenceBookArticleId: "fdspof-sdfpgofjds-sdf-sdfsd",
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
          pdfBinaryFile: null,
          pdfBinaryFileId: null
        },
        {
          __typename: "ReferenceBookContent",
          contentType: ReferenceBookContentType.ImageContent,
          id: "dsffd-sdfsdf-sdfsdf",
          text: "sfdfdf",
          imageUrl:
            "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          position: 3,
          createdAt: new Date(2020, 10, 5).toISOString(),
          modifiedAt: new Date(2020, 10, 15).toISOString(),
          imageBinaryFileId: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
          videoBinaryFileId: null,
          referenceBookArticleId: "fdspof-sdfpgofjds-sdf-sdfsd",
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
          pdfBinaryFile: null,
          pdfBinaryFileId: null
        },
        {
          __typename: "ReferenceBookContent",
          contentType: ReferenceBookContentType.ImageContent,
          id: "sdfs dsf-dsf",
          text: "sfdfdf",
          imageUrl:
            "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          position: 4,
          createdAt: new Date(2020, 10, 5).toISOString(),
          modifiedAt: new Date(2020, 10, 15).toISOString(),
          imageBinaryFileId: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
          videoBinaryFileId: null,
          referenceBookArticleId: "fdspof-sdfpgofjds-sdf-sdfsd",
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
          pdfBinaryFile: null,
          pdfBinaryFileId: null
        },
        {
          __typename: "ReferenceBookContent",
          contentType: ReferenceBookContentType.ImageContent,
          id: "sdfs dsf-dsf",
          text: "sfdfdf",
          imageUrl: "",
          position: 5,
          createdAt: new Date(2020, 10, 5).toISOString(),
          modifiedAt: new Date(2020, 10, 15).toISOString(),
          imageBinaryFileId: null,
          videoBinaryFileId: null,
          pdfBinaryFileId: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
          referenceBookArticleId: "fdspof-sdfpgofjds-sdf-sdfsd",
          videoUrl: null,
          pdfBinaryFile: {
            __typename: "BinaryFile",
            id: "1c6d505e-06db-4ab2-ac0b-34f3b69e7626",
            createdAt: new Date(2020, 10, 5).toISOString(),
            modifiedAt: new Date(2020, 10, 15).toISOString(),
            filename: "test.pdf",
            fileSize: 1,
            mimeType: MimeType.ApplicationPdf,
            url: ""
          },
          imageBinaryFile: null,
          videoBinaryFile: null
        }
      ]
    }
  ]
})
