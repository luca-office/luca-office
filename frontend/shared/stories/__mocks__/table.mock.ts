import {ColumnProps} from "../../src/components"
import {ErpTableColumn, ErpTableColumnType, ErpTableContentType, ErpTableRowData} from "../../src/office-tools/erp"
import {createUUID} from "../../src/utils"

interface SampleTableEntity {
  readonly name: string
  readonly number: number
  readonly person: string
}

export const tableColumnsStoryMock: ColumnProps<SampleTableEntity>[] = [
  {
    key: "id",
    header: "#",
    content: entity => entity.number,
    sortConfig: {
      isSortable: true,
      toolTipText: "tool tip for sorting by #",
      key: "number"
    }
  },
  {
    key: "name",
    header: "name",
    content: entity => entity.name,
    sortConfig: {
      isSortable: true,
      toolTipText: "tool tip for sorting by name",
      key: "name"
    }
  },
  {
    key: "person",
    header: "person",
    content: entity => entity.person,
    sortConfig: {
      isSortable: true,
      toolTipText: "tool tip for sorting by person",
      key: "person"
    }
  }
]

export const tableEntitiesStoryMock: SampleTableEntity[] = [
  {
    number: 1,
    name: "test",
    person: "john Smith"
  },
  {
    number: 2,
    name: "some name",
    person: "Eliza Smith"
  },
  {
    number: 3,
    name: "some other name",
    person: "Eliza Smith"
  }
]

export const erpTableColumns: Array<ErpTableColumn> = [
  {
    propertyKey: "id",
    label: "Komponenten-Id",
    type: ErpTableColumnType.PrimaryKey,
    contentType: ErpTableContentType.Number
  },
  {
    propertyKey: "amount",
    label: "Menge",
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Number
  },
  {
    propertyKey: "price",
    label: "Preis",
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Currency
  },
  {
    propertyKey: "artNo",
    label: "Artikelnummer",
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Number
  },
  {
    propertyKey: "responsible",
    label: "Verantwortlicher",
    type: ErpTableColumnType.ForeignKey,
    contentType: ErpTableContentType.Text
  },
  {
    propertyKey: "creationDate",
    label: "Erstellungszeitpunkt",
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Date
  }
]

const randomValueByContentType = (type: ErpTableContentType) => {
  switch (type) {
    case ErpTableContentType.Text:
      return `mock${Math.ceil(Math.random() * 100)}text${Math.ceil(Math.random() * 100)}data`
    case ErpTableContentType.Number:
      return Math.ceil(Math.random() * 100000)
    case ErpTableContentType.Date:
      return new Date(2020, 12, 1, 5, 2, 1, 12).toISOString()
    default:
      return "default value"
  }
}

export const createRandomErpRows = (columns: Array<ErpTableColumn>, count: number): Array<ErpTableRowData> =>
  new Array(count).fill(undefined).map((_, index) =>
    columns.reduce(
      (entity, column) =>
        column.propertyKey
          ? {
              ...entity,
              entity: {...entity.entity, [column.propertyKey]: randomValueByContentType(column.contentType)}
            }
          : entity,
      {id: createUUID(), index, entityId: index + 1, entity: {}} as ErpTableRowData
    )
  )
