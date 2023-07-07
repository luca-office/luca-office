import {BinaryType, NodeType} from "../../../enums"
import {DirectoryNode, RootNode, TreeNodeType} from "../../../models/node"

export const treeMock: RootNode = {
  children: [
    {
      id: "b6897871-96be-4927-894d-ee99b4a8f30a",
      parentId: null,
      name: "Bilder",
      type: NodeType.Directory,
      children: [
        {
          id: "6b183a2e-0af6-4006-95b5-e2daca778616",
          parentId: "b6897871-96be-4927-894d-ee99b4a8f30a",
          name: "Urlaub",
          type: NodeType.Directory,
          children: [
            {
              type: NodeType.File,
              id: "92bbaaa0-c6a8-4d04-a545-76f669fd0d9e",
              parentId: "6b183a2e-0af6-4006-95b5-e2daca778616",
              name: "strand.png",
              tags: [],
              binaryType: BinaryType.Image,
              binaryFileId: "2af6deab-4888-422a-9516-4fe40479d5e3",
              binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3"
            },
            {
              type: NodeType.File,
              id: "e1523252-f245-457d-a4dc-669423530c09",
              parentId: "6b183a2e-0af6-4006-95b5-e2daca778616",
              name: "strand2.png",
              tags: [],
              binaryType: BinaryType.Image,
              binaryFileId: "2af6deab-4888-422a-9516-4fe40479d5e3",
              binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3"
            },
            {
              type: NodeType.File,
              id: "b4e7cfac-8a06-4608-9327-5755f04d7d57",
              parentId: "6b183a2e-0af6-4006-95b5-e2daca778616",
              name: "strand3.png",
              tags: [],
              binaryType: BinaryType.Image,
              binaryFileId: "2af6deab-4888-422a-9516-4fe40479d5e3",
              binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3"
            }
          ]
        },
        {
          id: "51cb5f14-19c2-45e7-a7e0-01501aec1f59",
          parentId: "b6897871-96be-4927-894d-ee99b4a8f30a",
          name: "Arbeit",
          type: NodeType.Directory,
          children: []
        }
      ]
    },
    {
      id: "814c5305-3b5c-463c-8012-e6bf1b5a1581",
      parentId: null,
      name: "Rechnungen",
      type: NodeType.Directory,
      children: [
        {
          id: "a7fad23d-28ed-442a-8ff2-89b1a11addeb",
          parentId: "814c5305-3b5c-463c-8012-e6bf1b5a1581",
          name: "November",
          type: NodeType.Directory,
          children: [
            {
              type: NodeType.File,
              id: "9a03812f-29fd-487b-b008-6e4e3b24a73c",
              parentId: "a7fad23d-28ed-442a-8ff2-89b1a11addeb",
              name: "rechnungxyz.pdf",
              tags: [],
              binaryType: BinaryType.PDF,
              binaryFileId: "41ee6ddf-e6ae-4889-9ded-bdd74dea1787",
              binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/41ee6ddf-e6ae-4889-9ded-bdd74dea1787"
            }
          ]
        },
        {
          id: "6ea48be2-1e65-44d5-be6a-cde64c2bd874",
          parentId: "814c5305-3b5c-463c-8012-e6bf1b5a1581",
          name: "Dezember",
          type: NodeType.Directory,
          children: [
            {
              type: NodeType.File,
              id: "4ecc7731-2bf9-480d-ae0b-02f38bb53c1d",
              parentId: "6ea48be2-1e65-44d5-be6a-cde64c2bd874",
              name: "rechnungxyz.pdf",
              tags: [],
              binaryType: BinaryType.PDF,
              binaryFileId: "41ee6ddf-e6ae-4889-9ded-bdd74dea1787",
              binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/41ee6ddf-e6ae-4889-9ded-bdd74dea1787"
            },
            {
              type: NodeType.File,
              id: "c3c6ef49-1766-4d63-a401-bd862575e57c",
              parentId: "6ea48be2-1e65-44d5-be6a-cde64c2bd874",
              name: "rechnungxyz.pdf",
              tags: [],
              binaryType: BinaryType.PDF,
              binaryFileId: "41ee6ddf-e6ae-4889-9ded-bdd74dea1787",
              binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/41ee6ddf-e6ae-4889-9ded-bdd74dea1787"
            }
          ]
        }
      ]
    },
    {
      id: "a90f0a95-1e7f-4486-becf-0d8ea02a1378",
      parentId: null,
      name: "Sonstiges",
      type: NodeType.Directory,
      children: []
    }
  ]
}

export const treeNodeTypeMock: TreeNodeType = {
  type: NodeType.Directory,
  name: "Directory1",
  children: [{id: "sfsfdsfsdf", type: NodeType.Directory, children: [], name: "dir2", parentId: "sdfs-qweqpork"}],
  id: "sdfs-qweqpork",
  parentId: null,
  isLocked: false
}

export const treeNodeWithFiles: DirectoryNode = {
  id: "6b183a2e-0af6-4006-95b5-e2daca778616",
  parentId: "b6897871-96be-4927-894d-ee99b4a8f30a",
  name: "Urlaub",
  type: NodeType.Directory,
  children: [
    {
      type: NodeType.File,
      id: "92bbaaa0-c6a8-4d04-a545-76f669fd0d9e",
      parentId: "6b183a2e-0af6-4006-95b5-e2daca778616",
      name: "strand.png",
      tags: [],
      binaryType: BinaryType.Image,
      binaryFileId: "2af6deab-4888-422a-9516-4fe40479d5e3",
      binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3"
    },
    {
      type: NodeType.File,
      id: "e1523252-f245-457d-a4dc-669423530c09",
      parentId: "6b183a2e-0af6-4006-95b5-e2daca778616",
      name: "strand2.png",
      tags: [],
      binaryType: BinaryType.Image,
      binaryFileId: "2af6deab-4888-422a-9516-4fe40479d5e3",
      binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3"
    },
    {
      type: NodeType.File,
      id: "b4e7cfac-8a06-4608-9327-5755f04d7d57",
      parentId: "6b183a2e-0af6-4006-95b5-e2daca778616",
      name: "strand3.png",
      tags: [],
      binaryType: BinaryType.Image,
      binaryFileId: "2af6deab-4888-422a-9516-4fe40479d5e3",
      binaryFileUrl: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3"
    }
  ]
}
