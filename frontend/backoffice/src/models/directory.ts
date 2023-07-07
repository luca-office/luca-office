import {DirectoryFragment} from "../graphql/generated/DirectoryFragment"

export type Directory = Omit<DirectoryFragment, "__typename">
