import {ErpNavigationEntryId, ErpType, InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {NavigationConfig} from "shared/models"
import {Route} from "../../../routes"
import {ErpInterventionConfig} from "../detail/intervention-group-entity/intervention-group-entity-detail-view"
import {NOTES_CONTENT_INTERVENTION_REPLACEMENT_GROUP_ID} from "./const"
import {BaseTypeGroupEntity} from "./tree"

export const routingConfigForInterventionGroupEntity = (
  groupEntity: BaseTypeGroupEntity,
  interventionGroupType: InterventionGroupType,
  config: {
    scenarioId: UUID
    emailDirectory?: EmailDirectory
    erpConfig?: ErpInterventionConfig
    sampleCompanyId?: UUID
  }
): NavigationConfig<Route> => {
  if (config.erpConfig) {
    return config.erpConfig.rowId
      .map<NavigationConfig<Route>>(rowId => ({
        route: Route.ScenarioAssignedSampleCompanyDetailErpTableSelectedDataset,
        payload: {
          scenarioId: config.scenarioId,
          sampleCompanyId: config.sampleCompanyId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          erpType: erpTypeToErpNavigationEntryId(config.erpConfig!.erpType),
          entityId: rowId
        }
      }))
      .getOrElse({
        route: Route.ScenarioAssignedSampleCompanyDetailErpTable,
        payload: {
          scenarioId: config.scenarioId,
          sampleCompanyId: config.sampleCompanyId,
          erpType: erpTypeToErpNavigationEntryId(config.erpConfig.erpType)
        }
      })
  }

  switch (interventionGroupType) {
    case InterventionGroupType.File:
    case InterventionGroupType.Spreadsheet:
      return {route: Route.ScenarioFilesDetail, payload: {scenarioId: config.scenarioId, fileId: groupEntity.id}}
    case InterventionGroupType.Email:
      return {
        route: Route.ScenarioEmails,
        payload: {scenarioId: config.scenarioId, directory: config.emailDirectory, emailId: groupEntity.id}
      }
    case InterventionGroupType.Event:
      return {
        route: Route.ScenarioQuestionnaireDetail,
        payload: {scenarioId: config.scenarioId, questionnaireId: groupEntity.id}
      }
    case InterventionGroupType.Notes:
      return {
        route: Route.ScenarioQuestionnaireDetail,
        payload: {
          scenarioId: config.scenarioId,
          headerGroupType: InterventionHeaderGroupType.Notes,
          groupType: InterventionGroupType.Notes,
          groupEntityId: NOTES_CONTENT_INTERVENTION_REPLACEMENT_GROUP_ID
        }
      }
    default:
      return {route: Route.ScenarioFilesDetail, payload: {scenarioId: config.scenarioId, fileId: groupEntity.id}}
  }
}

export const erpTypeToErpNavigationEntryId = (erpType: ErpType): ErpNavigationEntryId => {
  switch (erpType) {
    case ErpType.Employee:
      return ErpNavigationEntryId.StaffTable
    case ErpType.Customer:
      return ErpNavigationEntryId.Customers
    case ErpType.Invoice:
      return ErpNavigationEntryId.Invoices
    case ErpType.Order:
      return ErpNavigationEntryId.Offers
    case ErpType.OrderItem:
      return ErpNavigationEntryId.OrderItems
    case ErpType.Product:
      return ErpNavigationEntryId.Products
    case ErpType.Supplier:
      return ErpNavigationEntryId.Suppliers
    case ErpType.Component:
      return ErpNavigationEntryId.Components
    case ErpType.ComponentProduct:
      return ErpNavigationEntryId.ComponentsForProducts
  }
}
