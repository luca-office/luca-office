import {NodeType} from "../../../../enums"
import {BaseNode} from "../../../../models"

export const childrenMock: BaseNode[] = [
  {
    id: "Child_Test_Id_1",
    parentId: "Test_Id",
    name: "Child_Test_Node_1",
    type: NodeType.Article
  },
  {
    id: "Child_Test_Id_2",
    parentId: "Test_Id",
    name: "Child_Test_Node_2",
    type: NodeType.Article
  }
]
